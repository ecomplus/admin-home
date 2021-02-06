import {
  i19attention,
  i19domain,
  // i19editStorefront,
  i19goToStore,
  // i19invalidDomainName,
  // i19newOrders,
  // i19noNewOrdersMsg,
  i19paymentConfirmed,
  i19share
  // i19pressEnterToSave,
  // i19setStoreDomain,
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

import ecomAuth from '@ecomplus/auth'
import { BOverlay } from 'bootstrap-vue'
import { FadeTransition, SlideYUpTransition } from 'vue2-transitions'
import { ShareNetwork } from 'vue-social-sharing'
import EcDatesPicker from '../EcDatesPicker.vue'

export default {
  name: 'EcHome',

  components: {
    BOverlay,
    FadeTransition,
    SlideYUpTransition,
    ShareNetwork,
    EcDatesPicker
  },

  props: {
    ecomAuth: {
      type: Object,
      default () {
        return ecomAuth
      }
    }
  },

  data () {
    return {
      isLoading: true,
      storeId: this.ecomAuth.storeId,
      store: {
        name: null,
        homepage: null,
        domain: null,
        logo: null,
        financial_email: null
      },
      localDomain: '',
      isEditingDomain: false,
      dateRange: {},
      orderMetrics: {
        countCreated: 0,
        paidAmount: 0
      },
      isLoadingMetrics: false
    }
  },

  computed: {
    i19attention: () => i18n(i19attention),
    i19domain: () => i18n(i19domain),
    i19editStorefront: () => 'Editar frente de loja',
    i19goToStore: () => i18n(i19goToStore),
    i19invalidDomainName: () => 'Nome de domínio inválido',
    i19newOrders: () => 'Novos pedidos',
    i19noNewOrdersMsg: () => 'Sem novos pedidos por enquanto.',
    i19paymentConfirmed: () => i18n(i19paymentConfirmed),
    i19pressEnterToSave: () => 'Aperte ENTER para salvar',
    i19setDomainMsg: () => 'Você deve ser o prorietário do domínio e apontá-lo para a loja.',
    i19setStoreDomain: () => 'Defina o domínio da loja',
    i19share: () => i18n(i19share),

    shopLink () {
      return this.store.homepage || `https://${this.store.domain}/`
    },

    isLocalDomainValid () {
      return /^([\w-]+\.){1,4}[\w]{2,}$/.test(this.localDomain)
    },

    domainInputHelpText () {
      return this.isEditingDomain && this.isLocalDomainValid
        ? this.i19pressEnterToSave
        : this.i19setDomainMsg
    }
  },

  methods: {
    formatMoney,

    updateStore (data) {
      return this.ecomAuth.requestApi('stores/me', 'patch', data || this.store)
    },

    setDomain () {
      if (this.isLocalDomainValid) {
        this.store.domain = this.localDomain
        this.isEditingDomain = false
        this.updateStore({
          domain: this.localDomain
        })
      } else {
        this.$bvToast.toast(this.i19invalidDomainName, {
          variant: 'warning',
          title: this.i19attention
        })
      }
    },

    fetchOrderMetrics () {
      const d = new Date()
      const minDateIso = new Date(d.getFullYear(), d.getMonth(), 1).toISOString()
      this.isLoadingMetrics = true
      this.ecomAuth.requestApi('$count', 'post', {
        resource: 'orders'
      }, {
        params: {
          'created_at>': minDateIso
        }
      })
        .then(({ data }) => {
          this.orderMetrics.countCreated = data.count
          return this.ecomAuth.requestApi('$aggregate', 'post', {
            resource: 'orders',
            pipeline: [
              { $match: { 'financial_status.updated_at': { $gte: minDateIso } } },
              { $match: { 'financial_status.current': 'paid' } },
              { $group: { _id: null, total: { $sum: '$amount.total' } } }
            ]
          })
        })
        .then(({ data }) => {
          this.orderMetrics.paidAmount = (data.result[0] && data.result[0].total) || 0
        })
        .catch(console.error)
        .finally(() => {
          this.isLoadingMetrics = false
        })
    }
  },

  watch: {
    isEditingDomain (isEditing) {
      if (isEditing) {
        this.$nextTick(() => {
          this.$refs['input-domain'].focus()
        })
        this.localDomain = this.store.domain
      }
    },

    dateRange ({ startDate, endDate }) {
    }
  },

  created () {
    const { ecomAuth } = this
    let hasStarted = false
    const fetchStore = () => {
      ecomAuth.fetchStore()
        .then(store => {
          this.storeId = store.store_id
          for (const field in this.store) {
            const val = store[field] || store.$main[field]
            if (this.store[field] !== undefined && val) {
              this.store[field] = val
            }
          }
          if (!hasStarted) {
            this.fetchOrderMetrics()
            ecomAuth.on('updateStore', fetchStore)
            hasStarted = true
          }
        })
        .catch(console.error)
        .finally(() => {
          this.isLoading = false
        })
    }
    if (ecomAuth.checkLogin()) {
      fetchStore()
    } else {
      ecomAuth.on('login', fetchStore)
    }
  }
}
