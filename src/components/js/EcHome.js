import {
  i19apps,
  i19attention,
  i19comparedPreviousPeriodMsg,
  i19domain,
  i19editStorefront,
  // i19firstSteps,
  i19goToStore,
  i19invalidDomainName,
  i19newOrders,
  i19noNewOrdersMsg,
  i19paymentConfirmed,
  i19share,
  i19pressEnterToSave,
  // i19registerProduct,
  i19setDomainMsg,
  i19setStoreDomain
  // i19settings,
  // i19totalAmount,
  // i19uploadLogo
} from '@ecomplus/i18n'

import { i18n, formatMoney } from '@ecomplus/utils'
import ecomAuth from '@ecomplus/auth'
import { toast, handleApiError, uploadPictures } from '@ecomplus/admin-helpers'
import { BSkeleton } from 'bootstrap-vue'
import { FadeTransition, SlideYUpTransition } from 'vue2-transitions'
import { ShareNetwork } from 'vue-social-sharing'
import EcDatesPicker from '../EcDatesPicker.vue'
import EcOrdersGraphs from '../EcOrdersGraphs.vue'
import EcHomeCards from '../EcHomeCards.vue'
import EcOnboarding from '../EcOnboarding.vue'

const i19totalAmount = 'Montante total'

const formatDiffPercent = (diffVal, compareVal) => {
  return compareVal &&
    Math.abs(diffVal * 100 / compareVal).toFixed(2).replace('.', ',') + '%'
}

export default {
  name: 'EcHome',

  components: {
    BSkeleton,
    FadeTransition,
    SlideYUpTransition,
    ShareNetwork,
    EcDatesPicker,
    EcOrdersGraphs,
    EcHomeCards,
    EcOnboarding
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
      ordersMetrics: {
        countCreated: 0,
        totalAmount: 0,
        paidAmount: 0
      },
      compareOrdersMetrics: {},
      isLoadingMetrics: false,
      hasLoadedAllMetrics: false,
      hasLoadedOrdersGraphs: false,
      hasLoadedOnce: false,
      hasNoOrders: false,
      canShowOnboarding: false
    }
  },

  computed: {
    i19apps: () => i18n(i19apps),
    i19attention: () => i18n(i19attention),
    i19comparedPreviousPeriodMsg: () => i18n(i19comparedPreviousPeriodMsg),
    i19domain: () => i18n(i19domain),
    i19editStorefront: () => i18n(i19editStorefront),
    i19firstSteps: () => 'Primeiros passos',
    i19goToStore: () => i18n(i19goToStore),
    i19invalidDomainName: () => i18n(i19invalidDomainName),
    i19newOrders: () => i18n(i19newOrders),
    i19noNewOrdersMsg: () => i18n(i19noNewOrdersMsg),
    i19pressEnterToSave: () => i18n(i19pressEnterToSave),
    i19registerProduct: () => 'Cadastrar produto',
    i19setDomainMsg: () => i18n(i19setDomainMsg),
    i19setStoreDomain: () => i18n(i19setStoreDomain),
    i19share: () => i18n(i19share),
    i19settings: () => 'Configurações',
    i19uploadLogo: () => 'Carregar logo',

    isMobile: () => {
      const { userAgent } = navigator
      return (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) ||
        /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    },

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

    ordersMetricsDiff () {
      const diffs = {}
      for (const field in this.ordersMetrics) {
        const currentVal = this.ordersMetrics[field]
        if (typeof currentVal === 'number') {
          const compareVal = this.compareOrdersMetrics[field]
          if (typeof compareVal === 'number') {
            diffs[field] = currentVal - compareVal
            continue
          }
        }
        diffs[field] = null
      }
      return diffs
    },

    countOrdersDiff () {
      return this.ordersMetricsDiff.countCreated
    },

    countOrdersDiffPercent () {
      return formatDiffPercent(this.countOrdersDiff, this.compareOrdersMetrics.countCreated)
    },

    amountMetrics () {
      return [{
        field: 'totalAmount',
        label: i18n(i19totalAmount)
      }, {
        field: 'paidAmount',
        label: i18n(i19paymentConfirmed)
      }].map(({ field, label }) => {
        const diffValue = this.ordersMetricsDiff[field]
        return {
          label,
          value: this.ordersMetrics[field],
          diffValue,
          diffPercent: formatDiffPercent(diffValue, this.compareOrdersMetrics[field])
        }
      })
    }
  },

  methods: {
    formatMoney,

    updateStore (data) {
      return this.ecomAuth.requestApi('stores/me', 'patch', data || this.store)
        .catch(handleApiError)
    },

    setDomain () {
      if (this.isLocalDomainValid) {
        this.store.domain = this.localDomain
        this.isEditingDomain = false
        this.updateStore({
          domain: this.localDomain
        })
      } else {
        toast(this.i19invalidDomainName)
      }
    },

    uploadLogo () {
      uploadPictures()
        .then(pictures => {
          if (pictures.length) {
            const logo = pictures[0].zoom
            this.updateStore({ logo }).then(() => {
              this.store.logo = logo
            })
          }
        })
        .catch(console.error)
    },

    fetchOrderMetrics (isCompare) {
      const dateRangeIso = isCompare ? this.compareDateRangeIso : this.dateRangeIso
      if (!dateRangeIso) {
        return Promise.resolve()
      }
      const ordersMetrics = isCompare ? this.compareOrdersMetrics : this.ordersMetrics
      const { start, end } = dateRangeIso
      const pipeline = []
      if (start) {
        pipeline.push({
          $match: { created_at: { $gte: start } }
        })
      }
      if (end) {
        pipeline.push({
          $match: { created_at: { $lte: end } }
        })
      }
      pipeline.push(
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            amount: { $sum: '$amount.total' },
            paid: { $sum: { $cond: [{ $eq: ['$financial_status.current', 'paid'] }, '$amount.total', 0] } }
          }
        }
      )
      return this.ecomAuth.requestApi('$aggregate', 'post', {
        resource: 'orders',
        pipeline
      })
        .then(({ data }) => {
          const group = data.result[0] || {}
          ordersMetrics.countCreated = group.count || 0
          ordersMetrics.totalAmount = group.amount || 0
          ordersMetrics.paidAmount = group.paid || 0
        })
        .catch(handleApiError)
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

    dateRange () {
      this.compareOrdersMetrics = {
        countCreated: null,
        totalAmount: null,
        paidAmount: null
      }
      this.isLoadingMetrics = true
      this.hasLoadedOrdersGraphs = this.hasLoadedAllMetrics = false
      this.fetchOrderMetrics()
        .then(() => {
          this.fetchOrderMetrics(true).finally(() => {
            this.hasLoadedAllMetrics = true
            if (this.isMobile || !this.ordersMetrics.countCreated) {
              this.hasLoadedOnce = true
            }
          })
        })
        .finally(() => {
          this.isLoadingMetrics = false
        })
    },

    hasLoadedOnce () {
      if (!this.ordersMetrics.countCreated) {
        this.ecomAuth.requestApi('$count', 'post', {
          resource: 'orders'
        })
          .then(({ data }) => {
            this.canShowOnboarding = this.hasNoOrders = data.count === 0
          })
          .catch(handleApiError)
      }
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
