import {
  // i19editStorefront,
  i19domain,
  i19goToStore
  // i19invalidDomainName
  // i19pressEnterToSave,
  // i19setStoreDomain,
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'
import ecomAuth from '@ecomplus/auth'

export default {
  name: 'EcHome',

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
      store: {
        store_id: null,
        name: null,
        homepage: null,
        domain: null,
        logo: null,
        financial_email: null
      },
      localDomain: '',
      isEditingDomain: false
    }
  },

  computed: {
    i19domain: () => i18n(i19domain),
    i19editStorefront: () => 'Editar frente de loja',
    i19goToStore: () => i18n(i19goToStore),
    i19invalidDomainName: () => 'Nome de domínio inválido',
    i19pressEnterToSave: () => 'Aperte ENTER para salvar',
    i19setDomainMsg: () => 'Você deve ser o prorietário do domínio e apontá-lo para a loja.',
    i19setStoreDomain: () => 'Defina o domínio da loja',

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
    updateStore () {
      this.ecomAuth.requestApi('/stores/me', 'patch', this.store)
    },

    setDomain () {
      if (this.isLocalDomainValid) {
        window.alert()
      } else {
        // toast i19invalidDomainName
      }
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
    }
  },

  created () {
    const { ecomAuth } = this
    const fetchStore = () => {
      ecomAuth.fetchStore()
        .then(store => {
          for (const field in this.store) {
            const val = store[field] || store.$main[field]
            if (this.store[field] !== undefined && val) {
              this.store[field] = val
            }
          }
        })
        .catch(console.error)
    }
    if (ecomAuth.checkLogin()) {
      fetchStore()
    } else {
      ecomAuth.on('login', fetchStore)
    }
    ecomAuth.on('updateStore', fetchStore)
  }
}
