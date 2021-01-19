import ecomAuth from '@ecomplus/auth'

export default {
  name: 'EcHome',

  created () {
    const fetchStore = () => {
      ecomAuth.fetchStore().then(store => {
        console.log(store._id)
      })
    }
    if (ecomAuth.checkLogin()) {
      fetchStore()
    } else {
      ecomAuth.on('login', fetchStore)
    }
  }
}
