import {
  i19name,
  i19price,
  i19sales
  // i19stock
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney,
  inStock as checkInStock,
  price as getPrice
} from '@ecomplus/utils'

import ecomAuth from '@ecomplus/auth'
import EcomSearch from '@ecomplus/search-engine'
import { BPagination } from 'bootstrap-vue'

export default {
  name: 'EcProductsList',

  components: {
    BPagination
  },

  props: {
    ecomAuth: {
      type: Object,
      default () {
        return ecomAuth
      }
    },
    ecomSearch: {
      type: Object,
      default () {
        return new EcomSearch()
      }
    }
  },

  data () {
    return {
      items: [],
      currentPage: 1
    }
  },

  computed: {
    i19name: () => i18n(i19name),
    i19price: () => i18n(i19price),
    i19sales: () => i18n(i19sales),
    i19stock: () => 'Estoque',
    pageSize: () => 5,

    pageItems () {
      const { items, pageSize, currentPage } = this
      return items.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
  },

  methods: {
    formatMoney,
    checkInStock,
    getPrice
  },

  created () {
    return this.ecomSearch.setSortOrder('sales').fetch()
      .then(() => {
        this.items = this.ecomSearch.getItems()
      })
      .catch(console.error)
      .finally(() => {
        this.$emit('load', this.items)
      })
  }
}
