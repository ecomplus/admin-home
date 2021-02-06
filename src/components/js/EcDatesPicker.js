import { $ecomConfig } from '@ecomplus/utils'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  name: 'EcDatesPicker',

  props: {
    value: Object
  },

  components: {
    DateRangePicker
  },

  computed: {
    today: () => new Date(),
    isPt: () => $ecomConfig.get('lang').startsWith('pt'),

    dateRange: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },

    locale () {
      return this.isPt
        ? {
            direction: 'ltr',
            format: 'dd/mm/yyyy',
            separator: ' - ',
            applyLabel: 'Aplicar',
            cancelLabel: 'Cancelar',
            weekLabel: 'S',
            customRangeLabel: 'Período customizado',
            daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            monthNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            firstDay: 0
          }
        : null
    },

    ranges () {
      if (this.isPt) {
        const { today } = this
        const yesterday = new Date()
        yesterday.setDate(today.getDate() - 1)
        const weekFirstDay = new Date()
        weekFirstDay.setDate(today.getDate() - today.getDay())
        const past7days = new Date()
        past7days.setDate(today.getDate() - 6)
        const past30days = new Date()
        past30days.setDate(today.getDate() - 29)
        return {
          Hoje: [
            today,
            today
          ],
          Ontem: [
            yesterday,
            yesterday
          ],
          'Esta semana': [
            weekFirstDay,
            today
          ],
          'Últimos 7 dias': [
            past7days,
            today
          ],
          'Este mês': [
            new Date(today.getFullYear(), today.getMonth(), 1),
            today
          ],
          'Últimos 30 dias': [
            past30days,
            today
          ],
          'Mês passado': [
            new Date(today.getFullYear(), today.getMonth() - 1, 1),
            new Date(today.getFullYear(), today.getMonth(), 0)
          ],
          'Este ano': [
            new Date(today.getFullYear(), 0, 1),
            today
          ],
          'Todo o período': [
            null,
            null
          ]
        }
      }
      return null
    }
  },

  created () {
    let start, end
    const { today, dateRange } = this
    if (!dateRange.startDate) {
      start = new Date(today.getFullYear(), today.getMonth(), 1)
    }
    if (!dateRange.endDate) {
      end = today
    }
    if (start || end) {
      this.dateRange = {
        startDate: start || dateRange.startDate,
        endDate: end || dateRange.endDate
      }
    }
  }
}
