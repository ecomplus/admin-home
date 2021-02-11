import {
  // i19disfavor,
  // i19favor,
  // i19latestOrders,
  i19load
} from '@ecomplus/i18n'

import {
  i18n,
  randomObjectId
} from '@ecomplus/utils'

import ecomAuth from '@ecomplus/auth'
import Vue from 'vue'
import { SlideYUpTransition } from 'vue2-transitions'

const i19latestOrders = 'Últimos pedidos'

export default {
  name: 'EcHomeCards',

  components: {
    SlideYUpTransition
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
      cards: [],
      availableCards: [{
        id: 'orders_list',
        title: i18n(i19latestOrders),
        load: id => this.renderCard(import('../cards/EcOrdersList.vue'), id)
      }],
      loadingCards: [],
      loadedCards: [],
      isUpdateSheduled: false
    }
  },

  computed: {
    i19disfavor: () => 'Desfavoritar',
    i19favor: () => 'Favoritar',
    i19load: () => i18n(i19load)
  },

  methods: {
    renderCard (importPromise, id) {
      const index = this.loadingCards.push(id) - 1
      importPromise
        .then(component => {
          this.$nextTick(() => {
            setTimeout(() => {
              new Vue({
                render: h => h(component.default, {
                  on: {
                    load: () => {
                      this.loadingCards.splice(index, 1)
                      this.loadedCards.push(id)
                    }
                  }
                })
              }).$mount(this.$refs[id][0])
            }, 300)
          })
        })
        .catch(console.error)
    },

    switchCard (id) {
      const index = this.cards.findIndex(card => card.card_id === id)
      if (index > -1) {
        this.cards.splice(index, 1)
      } else {
        this.cards.push({
          _id: randomObjectId(),
          card_id: id
        })
      }
      if (!this.isUpdateSheduled) {
        this.isUpdateSheduled = true
        setTimeout(() => {
          this.isUpdateSheduled = false
          this.ecomAuth.requestApi('authentications/me', 'patch', {
            panel_cards: this.cards
          }).catch(console.error)
        }, 500)
      }
    }
  },

  created () {
    ecomAuth.fetchAuthentication()
      .then(authentication => {
        this.cards = authentication.panel_cards || []
      })
      .finally(() => {
        if (!this.cards.length) {
          this.cards = [{
            _id: randomObjectId(),
            card_id: 'orders_list'
          }]
        }
        this.$nextTick(() => {
          for (let i = 0; i < this.cards.length && i < 2; i++) {
            const availableCard = this.availableCards.find(({ id }) => {
              return this.cards[i].card_id === id
            })
            if (availableCard) {
              availableCard.load(availableCard.id)
            }
          }
        })
      })
      .catch(console.error)
  }
}
