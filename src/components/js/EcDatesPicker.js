import { $ecomConfig } from '@ecomplus/utils'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

const createNormalizedDate = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

const storageKey = 'EcDatesPicker_range'

export default {
  name: 'EcDatesPicker',

  props: {
    value: Object
  },

  components: {
    DateRangePicker
  },

  computed: {
    isPt: () => $ecomConfig.get('lang').startsWith('pt'),
    today: () => createNormalizedDate(),

    yesterday () {
      const { today } = this
      const d = createNormalizedDate()
      d.setDate(today.getDate() - 1)
      return d
    },

    weekFirstDay () {
      const { today } = this
      const d = createNormalizedDate()
      d.setDate(today.getDate() - today.getDay())
      return d
    },

    past7days () {
      const { today } = this
      const d = createNormalizedDate()
      d.setDate(today.getDate() - 7)
      return d
    },

    past30days () {
      const { today } = this
      const d = createNormalizedDate()
      d.setDate(today.getDate() - 30)
      return d
    },

    monthFirstDay () {
      const { today } = this
      return new Date(today.getFullYear(), today.getMonth(), 1)
    },

    pastMonthFirstDay () {
      const { today } = this
      return new Date(today.getFullYear(), today.getMonth() - 1, 1)
    },

    pastMonthLastDay () {
      const { today } = this
      return new Date(today.getFullYear(), today.getMonth(), 0)
    },

    yearFirstDay () {
      const { today } = this
      return new Date(today.getFullYear(), 0, 1)
    },

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
      const {
        isPt,
        today,
        yesterday,
        weekFirstDay,
        past7days,
        past30days,
        monthFirstDay,
        pastMonthFirstDay,
        pastMonthLastDay,
        yearFirstDay
      } = this
      return {
        [isPt ? 'Hoje' : 'Today']: [today, today],
        [isPt ? 'Ontem' : 'Yesterday']: [yesterday, yesterday],
        [isPt ? 'Esta semana' : 'This week']: [weekFirstDay, today],
        [isPt ? '7 dias atrás' : 'Past 7 days']: [past7days, yesterday],
        [isPt ? 'Este mês' : 'This month']: [monthFirstDay, today],
        [isPt ? '30 dias atrás' : 'Past 30 days']: [past30days, yesterday],
        [isPt ? 'Mês passado' : 'Last month']: [pastMonthFirstDay, pastMonthLastDay],
        [isPt ? 'Este ano' : 'This year']: [yearFirstDay, today],
        [isPt ? 'Todo o período' : 'All period']: [null, null]
      }
    }
  },

  methods: {
    saveDateRange (dateRange) {
      const { ranges } = this
      for (const rangeName in ranges) {
        const range = ranges[rangeName]
        if (
          range &&
          range[0] &&
          range[0].getTime() === dateRange.startDate.getTime() &&
          range[1].getTime() === dateRange.endDate.getTime()
        ) {
          window.localStorage.setItem(storageKey, rangeName)
          return
        }
      }
      window.localStorage.setItem(storageKey, JSON.stringify(dateRange))
    }
  },

  created () {
    const storedRange = window.localStorage.getItem(storageKey)
    if (storedRange) {
      if (storedRange.charAt(0) === '{') {
        try {
          this.dateRange = JSON.parse(storedRange)
          return
        } catch (e) {
        }
      } else {
        const { ranges } = this
        for (const rangeName in ranges) {
          if (rangeName === storedRange) {
            const range = ranges[rangeName]
            this.dateRange = {
              startDate: range[0],
              endDate: range[1]
            }
            return
          }
        }
      }
    }
    let start, end
    const { today, monthFirstDay, dateRange } = this
    if (!dateRange.startDate) {
      start = monthFirstDay
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
