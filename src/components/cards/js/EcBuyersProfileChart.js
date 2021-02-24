import {
  // i19aboveOf
  i19Gender,
  // i19notConfigured,
  i19upTo
  // i19years
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'
import ecomAuth from '@ecomplus/auth'
import Chart from 'chart.js'

export default {
  name: 'EcBuyersProfileChart',

  props: {
    ecomAuth: {
      type: Object,
      default () {
        return ecomAuth
      }
    }
  },

  computed: {
    i19aboveOf: () => 'Acima de',
    i19notConfigured: () => 'Não configurado',
    i19upTo: () => i18n(i19upTo),
    i19years: () => 'anos'
  },

  methods: {
    i19Gender (prop) {
      return i18n(i19Gender)[prop] || this.i19notConfigured
    },

    setupCharts (aggregation) {
      const year = new Date().getFullYear()
      const ageRanges = [{
        label: `${this.i19upTo} 25`,
        minYear: year - 25
      }, {
        label: '26 - 40',
        minYear: year - 40
      }, {
        label: '41 - 60',
        minYear: year - 60
      }, {
        label: `${this.i19aboveOf} 60`,
        minYear: null
      }]
      const rgbByGender = {
        f: '223, 242, 0',
        m: '3, 169, 179',
        x: '255, 86, 0',
        _: '214, 214, 219'
      }
      const ordersByGender = {
        f: 0,
        m: 0,
        x: 0,
        _: 0
      }
      const genders = Object.keys(rgbByGender)
      const aggByAge = ageRanges.map(({ label, minYear }) => {
        return {
          label: `${label} ${this.i19years}`,
          minYear,
          orders: 0
        }
      })
      const aggAgeGender = ageRanges.reduce((aggAgeGender, { minYear }) => {
        genders.forEach(gender => {
          aggAgeGender.push({
            minYear,
            gender,
            orders: 0
          })
        })
        return aggAgeGender
      }, [])
      let totalOrders = 0
      aggregation.forEach(({ _id, orders }) => {
        let { birth, gender } = _id
        if (!gender) {
          gender = '_'
        }
        ;[aggByAge, aggAgeGender].forEach(groups => {
          for (let i = 0; i < groups.length; i++) {
            const group = groups[i]
            if (!(group.minYear > birth)) {
              if (group.gender && gender !== group.gender) {
                continue
              }
              group.orders += orders
              break
            }
          }
        })
        ordersByGender[gender] += orders
        totalOrders += orders
      })
      const radar = new Chart(this.$refs['canva-radar'], {
        type: 'radar',
        data: {
          labels: aggByAge.map(({ label }) => label),
          datasets: genders.map(gender => {
            return {
              data: aggByAge.map(({ minYear }) => {
                const data = aggAgeGender.find(group => {
                  return group.gender === gender && minYear === group.minYear
                })
                if (data) {
                  return parseInt(data.orders * 10000 / totalOrders, 10) / 100
                }
                return 0
              }),
              label: `${this.i19Gender(gender)}: ` +
                `${(ordersByGender[gender] * 100 / totalOrders).toFixed(2)}%`,
              backgroundColor: `rgba(${rgbByGender[gender]}, 0.5)`,
              borderColor: `rgba(${rgbByGender[gender]}, 0.85)`,
              borderWidth: 1
            }
          })
        },
        options: {
          tooltips: {
            callbacks: {
              title: ([{ value }]) => {
                return `${value}%`
              },
              label: ({ index, datasetIndex }, { labels }) => {
                return `${this.i19Gender(genders[datasetIndex])} & ${labels[index]}`
              }
            }
          }
        }
      })
      if (radar) {
        return new Chart(this.$refs['canva-doughnut'], {
          type: 'doughnut',
          data: {
            labels: aggByAge.map(({ label }) => label),
            datasets: [{
              data: aggByAge.map(({ orders }) => orders),
              backgroundColor: aggByAge.map((group, index) => `hsl(295, 100%, ${(32 - index * 7)}%)`)
            }]
          },
          options: {
            tooltips: {
              callbacks: {
                label: ({ index }) => {
                  const { orders } = aggByAge[index]
                  return `${(orders * 100 / totalOrders).toFixed(2)}%`
                },
                beforeLabel: ({ index }) => {
                  return aggByAge[index].label
                }
              }
            }
          }
        })
      }
    }
  },

  created () {
    return this.ecomAuth.requestApi('$aggregate', 'post', {
      resource: 'customers',
      pipeline: [
        { $match: { orders_count: { $gt: 0 } } },
        {
          $group: {
            _id: {
              birth: '$birth_date.year',
              gender: '$gender'
            },
            orders: { $sum: '$orders_count' }
          }
        }
      ]
    })
      .then(({ data }) => {
        this.$nextTick(() => {
          this.setupCharts(data.result)
        })
      })
      .catch(console.error)
      .finally(() => {
        this.$emit('load')
      })
  }
}
