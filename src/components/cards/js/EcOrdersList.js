import {
  i19FinancialStatus,
  i19FulfillmentStatus
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney,
  nickname as getNickname
} from '@ecomplus/utils'

import ecomAuth from '@ecomplus/auth'
import { BPagination } from 'bootstrap-vue'

const formatDay = day => day.toString().padStart(2, '0')

export default {
  name: 'EcOrdersList',

  components: {
    BPagination
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
      orders: [],
      currentPage: 1
    }
  },

  computed: {
    pageSize: () => 6,

    pageOrders () {
      const { orders, pageSize, currentPage } = this
      return orders.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
  },

  methods: {
    i19FinancialStatus: prop => i18n(i19FinancialStatus)[prop],
    i19FulfillmentStatus: prop => i18n(i19FulfillmentStatus)[prop],
    formatMoney,
    getNickname,

    formatDate (dateIso) {
      const d = new Date(dateIso)
      return formatDay(d.getDate()) + '/' + formatDay(d.getMonth() + 1)
    },

    getStatusColor (status) {
      switch (status) {
        case 'open':
        case 'authorized':
        case 'shipped':
          return 'info'
        case 'closed':
        case 'paid':
        case 'delivered':
          return 'success'
        case 'cancelled':
        case 'voided':
          return 'danger'
        case 'under_analysis':
          return 'warning'
        case 'dispute':
        case 'refunded':
        case 'returned':
          return 'dark'
      }
      return 'muted'
    }
  },

  created () {
    const fields = 'created_at,number,status,' +
      'amount.total,financial_status.current,fulfillment_status.current,' +
      'buyers._id,buyers.display_name,buyers.name'
    return this.ecomAuth.requestApi(`orders?sort=-created_at&limit=30&fields=${fields}`)
      .then(({ data }) => {
        this.orders = data.result
      })
      .catch(console.error)
      .finally(() => {
        this.$emit('load', this.orders)
      })
  }
}
