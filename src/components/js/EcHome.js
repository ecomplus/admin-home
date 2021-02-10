import {
  i19attention,
  i19comparedPreviousPeriodMsg,
  i19domain,
  i19editStorefront,
  i19goToStore,
  i19invalidDomainName,
  i19newOrders,
  i19noNewOrdersMsg,
  i19paymentConfirmed,
  i19share,
  i19pressEnterToSave,
  i19setDomainMsg,
  i19setStoreDomain
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

import ecomAuth from '@ecomplus/auth'
import { FadeTransition, SlideYUpTransition } from 'vue2-transitions'
import { ShareNetwork } from 'vue-social-sharing'
import EcDatesPicker from '../EcDatesPicker.vue'
import EcOrdersGraphs from '../EcOrdersGraphs.vue'
import EcHomeCards from '../EcHomeCards.vue'

const formatDiffPercent = (diffVal, compareVal) => {
  return compareVal &&
    Math.abs(diffVal * 100 / compareVal).toFixed(2).replace('.', ',') + '%'
}

export default {
  name: 'EcHome',

  components: {
    FadeTransition,
    SlideYUpTransition,
    ShareNetwork,
    EcDatesPicker,
    EcOrdersGraphs,
    EcHomeCards
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
      compareOrderMetrics: {
        countCreated: null,
        paidAmount: null
      },
      isLoadingMetrics: false,
      hasLoadedAllMetrics: false,
      hasLoadedOrdersGraphs: false
    }
  },

  computed: {
    i19attention: () => i18n(i19attention),
    i19comparedPreviousPeriodMsg: () => i18n(i19comparedPreviousPeriodMsg),
    i19domain: () => i18n(i19domain),
    i19editStorefront: () => i18n(i19editStorefront),
    i19goToStore: () => i18n(i19goToStore),
    i19invalidDomainName: () => i18n(i19invalidDomainName),
    i19newOrders: () => i18n(i19newOrders),
    i19noNewOrdersMsg: () => i18n(i19noNewOrdersMsg),
    i19paymentConfirmed: () => i18n(i19paymentConfirmed),
    i19pressEnterToSave: () => i18n(i19pressEnterToSave),
    i19setDomainMsg: () => i18n(i19setDomainMsg),
    i19setStoreDomain: () => i18n(i19setStoreDomain),
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
    },

    fixedDateRange () {
      let { startDate, endDate } = this.dateRange
      if (startDate) {
        startDate = new Date(startDate.getTime())
        startDate.setHours(0, 0, 0, 0)
      }
      if (endDate) {
        endDate = new Date(endDate.getTime())
        endDate.setHours(23, 59, 59, 999)
      }
      return { startDate, endDate }
    },

    dateRangeIso () {
      const { startDate, endDate } = this.fixedDateRange
      let start, end
      if (startDate) {
        start = startDate.toISOString()
      }
      const d = new Date()
      d.setHours(0, 0, 0, 0)
      if (endDate && endDate.getTime() < d.getTime()) {
        end = endDate.toISOString()
      }
      return { start, end }
    },

    compareDateRangeIso () {
      const { startDate, endDate } = this.fixedDateRange
      if (!startDate || !endDate) {
        return null
      }
      const timeDiff = endDate.getTime() - startDate.getTime()
      let d = new Date(startDate.getTime() - timeDiff)
      const start = d.toISOString()
      d = new Date(startDate.getTime() - 1)
      return {
        start,
        end: d.toISOString()
      }
    },

    countOrdersDiff () {
      const { countCreated } = this.compareOrderMetrics
      if (countCreated !== null) {
        return this.orderMetrics.countCreated - countCreated
      }
      return null
    },

    countOrdersDiffPercent () {
      return formatDiffPercent(this.countOrdersDiff, this.compareOrderMetrics.countCreated)
    },

    paidAmountDiff () {
      const { paidAmount } = this.compareOrderMetrics
      if (paidAmount !== null) {
        return this.orderMetrics.paidAmount - paidAmount
      }
      return null
    },

    paidAmountDiffPercent () {
      return formatDiffPercent(this.paidAmountDiff, this.compareOrderMetrics.paidAmount)
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

    fetchOrderMetrics (isCompare) {
      const dateRangeIso = isCompare ? this.compareDateRangeIso : this.dateRangeIso
      if (!dateRangeIso) {
        return
      }
      const orderMetrics = isCompare ? this.compareOrderMetrics : this.orderMetrics
      const { start, end } = dateRangeIso
      return this.ecomAuth.requestApi('$count', 'post', {
        resource: 'orders'
      }, {
        params: {
          'created_at>': start,
          'created_at<': end
        }
      })
        .then(({ data }) => {
          orderMetrics.countCreated = data.count
          const pipeline = []
          if (start) {
            pipeline.push({
              $match: { 'financial_status.updated_at': { $gte: start } }
            })
          }
          if (end) {
            pipeline.push({
              $match: { 'financial_status.updated_at': { $lte: end } }
            })
          }
          pipeline.push(
            { $match: { 'financial_status.current': 'paid' } },
            { $group: { _id: null, total: { $sum: '$amount.total' } } }
          )
          return this.ecomAuth.requestApi('$aggregate', 'post', {
            resource: 'orders',
            pipeline
          })
        })
        .then(({ data }) => {
          orderMetrics.paidAmount = (data.result[0] && data.result[0].total) || 0
        })
        .catch(console.error)
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
      this.compareOrderMetrics = {
        countCreated: null,
        paidAmount: null
      }
      this.isLoadingMetrics = true
      this.hasLoadedAllMetrics = false
      this.fetchOrderMetrics()
        .then(() => {
          this.fetchOrderMetrics(true).finally(() => {
            this.hasLoadedAllMetrics = true
          })
        })
        .finally(() => {
          this.isLoadingMetrics = false
        })
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
