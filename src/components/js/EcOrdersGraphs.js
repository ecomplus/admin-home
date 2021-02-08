import ecomAuth from '@ecomplus/auth'

const formatDay = day => day.toString().padStart(2, '0')

export default {
  name: 'EcOrdersGraphs',

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
      aggregation: []
    }
  },

  created () {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() - 30)
    const $group = {
      _id: { $cond: [] },
      count: { $sum: 1 },
      amount: { $sum: '$amount.total' }
    }
    const pipeline = [
      { $match: { created_at: { $gte: d.toISOString() } } },
      { $group }
    ]
    let { $cond } = $group._id
    for (let i = 0; i <= 30; i++) {
      d.setDate(d.getDate() + 1)
      const id = `${formatDay(d.getDate())}/${formatDay(d.getMonth() + 1)}`
      if (i < 30) {
        $cond.push({ $lt: ['$created_at', d.toISOString()] }, id)
        if (i < 29) {
          const $nextCond = []
          $cond.push({ $cond: $nextCond })
          $cond = $nextCond
        }
      } else {
        $cond.push(id)
      }
    }
    return this.ecomAuth.requestApi('$aggregate', 'post', {
      resource: 'orders',
      pipeline
    })
      .then(({ data }) => {
        this.aggregation = data.result
      })
      .catch(console.error)
      .finally(() => {
        this.$emit('load', this.aggregation)
      })
  }
}
