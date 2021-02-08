import ecomAuth from '@ecomplus/auth'

export default {
  name: 'EcHomeCards',

  props: {
    startDate: [String, Object],
    endDate: [String, Object],
    ecomAuth: {
      type: Object,
      default () {
        return ecomAuth
      }
    }
  },

  data () {
    return {
      cards: []
    }
  },

  created () {
    ecomAuth.fetchAuthentication()
      .then(authentication => {
        this.cards = authentication.panel_cards || []
      })
      .catch(console.error)
      .finally(() => {
        if (!this.cards.length) {
          this.cards = [{
            card_id: 'orders_amount_7d'
          }]
        }
      })
  }
}
