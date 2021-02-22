import {
  // i19average,
  // i19averageTicket,
  i19cancelled,
  i19newOrders,
  i19open,
  i19orders,
  i19paid,
  i19total
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

import ecomAuth from '@ecomplus/auth'
import Chart from 'chart.js'
import 'chartjs-plugin-annotation'

const dayMs = 1000 * 3600 * 24
const formatDay = day => day.toString().padStart(2, '0')

export default {
  name: 'EcOrdersGraphs',

  props: {
    dateRange: {
      type: Object,
      required: true
    },
    ecomAuth: {
      type: Object,
      default () {
        return ecomAuth
      }
    }
  },

  data () {
    return {
      isLoaded: false
    }
  },

  computed: {
    i19average: () => 'Média',
    i19averageTicket: () => 'Ticket médio',
    i19cancelled: () => i18n(i19cancelled),
    i19newOrders: () => i18n(i19newOrders),
    i19open: () => i18n(i19open),
    i19orders: () => i18n(i19orders).toLowerCase(),
    i19paid: () => i18n(i19paid),
    i19total: () => i18n(i19total)
  },

  methods: {
    setupChart (ordersAggr, labels) {
      const findData = id => ordersAggr.find(({ _id }) => _id === id)
      let avgTicket, countOrders, totalAmount, paidAmount, canceledAmount
      avgTicket = countOrders = totalAmount = paidAmount = canceledAmount = 0
      const chartConfig = {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            type: 'line',
            yAxisID: 'num',
            label: this.i19newOrders,
            data: labels.map(id => {
              const data = findData(id)
              if (data && data.count) {
                countOrders += data.count
                totalAmount += data.amount
                if (data.paid) {
                  paidAmount += data.paid
                }
                if (data.canceled) {
                  canceledAmount += data.canceled
                }
                avgTicket = totalAmount / countOrders
                return data.count
              }
              return 0
            }),
            fill: false,
            borderColor: 'rgba(55, 0, 60, 0.7)',
            lineTension: 0
          }, {
            label: this.i19total,
            data: labels.map(id => {
              const data = findData(id)
              return (data && data.amount) || 0
            }),
            backgroundColor: 'rgba(3, 169, 179, 0.45)',
            hoverBackgroundColor: 'rgba(3, 169, 179, 0.7)'
          }, {
            label: this.i19paid,
            data: labels.map(id => {
              const data = findData(id)
              return (data && data.paid) || 0
            }),
            backgroundColor: 'rgba(0, 230, 121, 0.45)',
            hoverBackgroundColor: 'rgba(0, 230, 121, 0.7)'
          }]
        },
        options: {
          tooltips: {
            callbacks: {
              label: ({ yLabel, datasetIndex }) => {
                if (datasetIndex) {
                  return formatMoney(yLabel)
                }
                return `${yLabel} ${this.i19orders}`
              }
            }
          },
          scales: {
            yAxes: [{
              id: 'money',
              position: 'left',
              ticks: {
                callback (val) {
                  return formatMoney(val)
                }
              }
            }, {
              id: 'num',
              position: 'right',
              gridLines: {
                display: false,
                drawBorder: false
              }
            }]
          }
        }
      }
      if (totalAmount) {
        chartConfig.options.annotation = {
          annotations: [{
            value: totalAmount / labels.length,
            rgb: '3, 169, 179',
            label: this.i19average
          }, {
            value: avgTicket,
            rgb: '255, 1, 91',
            label: this.i19averageTicket
          }].map(({ value, rgb, label }) => ({
            type: 'line',
            mode: 'horizontal',
            scaleID: 'money',
            value,
            borderColor: `rgba(${rgb}, 0.6)`,
            borderWidth: 2,
            label: {
              enabled: true,
              content: `${label}: ${formatMoney(value)}`,
              backgroundColor: `rgba(${rgb}, 0.8)`
            }
          }))
        }
        setTimeout(() => this.setupPieChart(totalAmount, paidAmount, canceledAmount), 200)
      }
      return new Chart(this.$refs.canva, chartConfig)
    },

    setupPieChart (totalAmount, paidAmount, canceledAmount) {
      const data = [
        totalAmount - paidAmount - canceledAmount,
        paidAmount,
        canceledAmount
      ]
      const percents = data.map(amount => `${(amount * 100 / totalAmount).toFixed(2)}%`)
      return new Chart(this.$refs['canva-pie'], {
        type: 'pie',
        data: {
          labels: [
            `${this.i19open}: ${percents[0]}`,
            `${this.i19paid}: ${percents[1]}`,
            `${this.i19cancelled}: ${percents[2]}`
          ],
          datasets: [{
            data,
            backgroundColor: ['#b9b8bc', '#00e679', '#fe0002']
          }]
        },
        options: {
          tooltips: {
            callbacks: {
              label: ({ index }) => {
                const amount = data[index]
                return `${formatMoney(amount)} (${percents[index]})`
              }
            }
          }
        }
      })
    }
  },

  watch: {
    dateRange: {
      handler ({ startDate, endDate }) {
        this.isLoaded = false
        const today = new Date()
        if (!startDate) {
          startDate = new Date(today.getFullYear(), -23, 1)
        }
        const pipeline = [{ $match: { created_at: { $gte: startDate.toISOString() } } }]
        if (!endDate || endDate.getTime() > today.getTime()) {
          endDate = today
          endDate.setHours(23, 59, 59, 999)
        } else {
          pipeline.push({ $match: { created_at: { $lte: endDate.toISOString() } } })
        }
        const numDays = Math.ceil(((endDate || today).getTime() - startDate.getTime()) / dayMs)
        const maxTimestamp = endDate.getTime()
        let getLabel, setNextDate
        if (numDays >= 365) {
          startDate.setDate(1)
          getLabel = d => `${formatDay(d.getMonth() + 1)}/${d.getFullYear()}`
          setNextDate = d => d.setMonth(d.getMonth() + 1)
        } else if (numDays > 3) {
          const getDayLabel = d => `${formatDay(d.getDate())}/${formatDay(d.getMonth() + 1)}`
          let daysInterval
          if (numDays <= 31) {
            daysInterval = 1
            getLabel = getDayLabel
          } else {
            daysInterval = numDays > 120 ? 30 : 7
            getLabel = d => {
              const end = new Date(d.getTime())
              end.setDate(d.getDate() + daysInterval - 1)
              return end.getTime() < maxTimestamp
                ? getDayLabel(d) + ' - ' + getDayLabel(end)
                : getDayLabel(d) + ' - ' + getDayLabel(endDate)
            }
          }
          setNextDate = d => d.setDate(d.getDate() + daysInterval)
        } else {
          if (numDays === 1) {
            getLabel = d => `${formatDay(d.getHours())}h`
          } else {
            getLabel = d => `${formatDay(d.getDate())} ${formatDay(d.getHours())}h`
          }
          setNextDate = d => d.setHours(d.getHours() + numDays)
        }
        const intervals = []
        while (startDate.getTime() < maxTimestamp) {
          const label = getLabel(startDate)
          setNextDate(startDate)
          if (startDate.getTime() < maxTimestamp) {
            intervals.push({
              dateIso: startDate.toISOString(),
              label
            })
          } else {
            intervals.push({ label })
          }
        }
        if (!intervals.length) {
          return
        }
        if (intervals[intervals.length - 1].dateIso) {
          intervals.push({
            label: getLabel(endDate)
          })
        }
        const $group = {
          _id: { $cond: [] },
          count: { $sum: 1 },
          amount: { $sum: '$amount.total' },
          paid: {
            $sum: {
              $cond: [{ $eq: ['$financial_status.current', 'paid'] }, '$amount.total', 0]
            }
          },
          canceled: {
            $sum: {
              $cond: [{
                $in: ['$financial_status.current', ['voided', 'unauthorized', 'in_dispute', 'refunded']]
              }, '$amount.total', 0]
            }
          }
        }
        pipeline.push({ $group })
        let { $cond } = $group._id
        const labels = []
        intervals.forEach(({ dateIso, label }, i) => {
          labels.push(label)
          if (i < intervals.length - 1) {
            $cond.push({ $lt: ['$created_at', dateIso] }, label)
            if (i < intervals.length - 2) {
              const $nextCond = []
              $cond.push({ $cond: $nextCond })
              $cond = $nextCond
            }
          } else {
            $cond.push(label)
          }
        })
        return this.ecomAuth.requestApi('$aggregate', 'post', {
          resource: 'orders',
          pipeline
        })
          .then(({ data }) => {
            this.$nextTick(() => {
              this.setupChart(data.result, labels)
            })
          })
          .catch(console.error)
          .finally(() => {
            this.isLoaded = true
            this.$emit('load', this.aggregation)
          })
      },
      immediate: true
    }
  }
}
