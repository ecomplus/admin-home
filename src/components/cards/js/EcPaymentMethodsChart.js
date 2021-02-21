// import { i19PaymentMethod } from '@ecomplus/i18n'

import {
  // i18n,
  formatMoney
} from '@ecomplus/utils'

import ecomAuth from '@ecomplus/auth'
import Chart from 'chart.js'

const i19PaymentMethodCodes = {
  credit_card: 'Cartão de crédito',
  banking_billet: 'Boleto bancário',
  online_debit: 'Débito online',
  account_deposit: 'Depósito em conta',
  debit_card: 'Cartão de débito',
  balance_on_intermediary: 'Créditos no intermediador',
  loyalty_points: 'Pontos de fidelidade',
  other: 'Outros'
}

export default {
  name: 'EcPaymentMethodsChart',

  props: {
    ecomAuth: {
      type: Object,
      default () {
        return ecomAuth
      }
    }
  },

  methods: {
    setupCharts (aggregation) {
      let totalAmount = 0
      const aggByCode = [{
        _id: 'credit_card',
        amount: 0,
        color: '#00e679'
      }, {
        _id: 'banking_billet',
        amount: 0,
        color: '#03a9b3'
      }, {
        _id: 'online_debit',
        amount: 0,
        color: '#dff200'
      }, {
        _id: 'account_deposit',
        amount: 0,
        color: '#ff5600'
      }, {
        _id: 'balance_on_intermediary',
        amount: 0,
        color: '#fe0002'
      }, {
        _id: 'other',
        amount: 0,
        color: '#37003c'
      }]
      aggregation.forEach(group => {
        const { amount, codes } = group
        let groupByCode
        if (codes && codes[0]) {
          groupByCode = aggByCode.find(({ _id }) => _id === codes[0])
        }
        if (!groupByCode) {
          groupByCode = aggByCode[aggByCode.length - 1]
        }
        group.color = groupByCode.color
        groupByCode.amount += amount
        totalAmount += amount
      })
      ;[
        ['canva-small', aggByCode],
        ['canva-big', aggregation]
      ].forEach(([ref, aggregation], i) => {
        return new Chart(this.$refs[ref], {
          type: i ? 'doughnut' : 'pie',
          data: {
            labels: aggregation.map(({ _id }) => _id),
            datasets: [{
              data: aggregation.map(({ amount }) => amount),
              backgroundColor: aggregation.map(({ color }) => color)
            }]
          },
          options: {
            legend: false,
            tooltips: {
              callbacks: {
                label: ({ index }) => {
                  const { _id } = aggregation[index]
                  return i ? _id : i19PaymentMethodCodes[_id]
                },
                afterLabel: ({ index }) => {
                  const { amount } = aggregation[index]
                  return `${formatMoney(amount)} (${(amount * 100 / totalAmount).toFixed(2)}%)`
                }
              }
            }
          }
        })
      })
    }
  },

  created () {
    return this.ecomAuth.requestApi('$aggregate', 'post', {
      resource: 'orders',
      pipeline: [
        { $match: { 'financial_status.current': 'paid' } },
        {
          $group: {
            _id: '$payment_method_label',
            amount: { $sum: '$amount.total' },
            codes: { $last: '$transactions.payment_method.code' }
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
