import dayjs from 'dayjs'

export const globalMixin = {
  filters: {
    dateFilter(v) {
      if (!v) return 'n/a'
      return dayjs(v).format('DD/MM/YYYY')
    }
  }
}

export default globalMixin
