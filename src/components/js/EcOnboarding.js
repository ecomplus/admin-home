import {
  i19apps,
  i19brands,
  i19categories
  // i19customPayment,
  // i19customShipping,
  // i19firstSteps,
  // i19registerProduct,
  // i19setUp
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'
import ecomAuth from '@ecomplus/auth'
import { handleApiError } from '@ecomplus/admin-helpers'

export default {
  name: 'EcOnboarding',

  props: {
    youtubeVideo: {
      type: String,
      default: '-PayqoKBs4o'
    },
    youtubePlaylist: {
      type: String,
      default: 'PLye2cV82WMW3advpehZ1ERj0nx3Amkf1h'
    },
    ecomAuth: {
      type: Object,
      default () {
        return ecomAuth
      }
    }
  },

  data () {
    return {
      isStoreConfigured: false,
      hasCategoryOrBrand: false,
      hasProduct: false,
      hasShippingMethod: false,
      hasPaymentMethod: false
    }
  },

  computed: {
    i19apps: () => i18n(i19apps),
    i19brands: () => i18n(i19brands),
    i19categories: () => i18n(i19categories),
    i19customPayment: () => 'Pagamento personalizado',
    i19customShipping: () => 'Frete personalizado',
    i19firstSteps: () => 'Primeiros passos',
    i19registerProduct: () => 'Cadastrar produto',
    i19setUp: () => 'Configurar',

    steps () {
      return [{
        isDone: this.isStoreConfigured,
        icon: 'wrench',
        text: i18n({
          en_us: 'Configure the store info such as name, address, contact, logo, domain and brand colors.',
          pt_br: 'Configure os dados da loja como nome, endereço, contato, logo, domínio e cores da sua marca.'
        }),
        ctas: [
          [this.i19setUp, '/#/settings']
        ]
      }, {
        isDone: this.hasCategoryOrBrand,
        icon: 'bookmark',
        text: i18n({
          en_us: 'Start preparing your catalog with categories and brands.',
          pt_br: 'Comece a preparar seu catálogo com categorias e marcas.'
        }),
        ctas: [
          [this.i19categories, '/#/resources/categories'],
          [this.i19brands, '/#/resources/brands']
        ]
      }, {
        isDone: this.hasProduct,
        icon: 'tags',
        text: i18n({
          en_us: 'Register the store\'s first product.',
          pt_br: 'Cadastre o primeiro produto da loja.'
        }),
        ctas: [
          [this.i19registerProduct, '/#/resources/products/new']
        ]
      }, {
        isDone: this.hasShippingMethod,
        icon: 'truck',
        text: i18n({
          en_us: 'Visit our app store to see carriers and other shipping methods, ' +
            'install and configure at least one shipping app.',
          pt_br: 'Visita nossa loja de aplicativos para conhecer as transportadoras e outras formas de envio, ' +
            'instale e configure pelo menos um app de envio.'
        }),
        ctas: [
          [this.i19apps, '/#/apps'],
          [this.i19customShipping, '/#/apps/edit/1253', true],
          ['Correios', '/#/apps/edit/1248', true],
          ['Melhor Envio', '/#/apps/edit/1236', true]
        ]
      }, {
        isDone: this.hasPaymentMethod,
        icon: 'credit-card',
        text: i18n({
          en_us: 'Check our app store for all integrated payment options, ' +
            'choose and configure at least one for your store.',
          pt_br: 'Verifique em nossa loja de aplicativos todas as opções de pagamento integradas, ' +
            'escolha e configure pelo menos uma para sua loja.'
        }),
        ctas: [
          [this.i19apps, '/#/apps'],
          [this.i19customPayment, '/#/apps/edit/108091', true],
          ['PagHiper', '/#/apps/edit/1251', true],
          ['Pagar.me', '/#/apps/edit/117391', true]
        ]
      }, {
        isDone: false,
        icon: 'inbox',
        text: i18n({
          en_us: 'Close a purchase in your store to test the first order!',
          pt_br: 'Feche uma compra na sua loja para testar o primeiro pedido!'
        })
      }]
    }
  },

  created () {
    ecomAuth.fetchStore()
      .then(store => {
        const fields = ['name', 'domain', 'logo', 'contact_email', 'address']
        for (let i = 0; i < fields.length; i++) {
          if (!store[fields[i]]) {
            return
          }
        }
        this.isStoreConfigured = true
      })
      .then(() => {
        const checkListResult = ({ data }, instanceField = 'hasCategoryOrBrand') => {
          if (data.result.length) {
            this[instanceField] = true
            return true
          }
          return false
        }
        return ecomAuth.requestApi('/categories?limit=1')
          .then(response => {
            if (!checkListResult(response)) {
              return ecomAuth.requestApi('/brands?limit=1').then(checkListResult)
            }
          })
          .then(() => {
            return ecomAuth.requestApi('/$count', 'post', {
              resource: 'products'
            }).then(({ data }) => {
              this.hasProduct = Boolean(data.count)
            })
          })
          .then(() => {
            return ecomAuth.requestApi('/applications?limit=1&modules.calculate_shipping.enabled=true')
              .then(response => checkListResult(response, 'hasShippingMethod'))
          })
          .then(() => {
            return ecomAuth.requestApi('/applications?limit=1&modules.create_transaction.enabled=true')
              .then(response => checkListResult(response, 'hasPaymentMethod'))
          })
      })
      .then(() => this.$emit('load'))
      .catch(handleApiError)
  }
}
