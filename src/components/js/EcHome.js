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
