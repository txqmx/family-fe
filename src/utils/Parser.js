import api from '@/api'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const lvDataParser = async (oriData, prop) => {
  const data = {}
  for (const i in oriData) {
    const propConfig = prop[i]
    if (propConfig) {
      if (propConfig.dataSource) {
        const dataSource = propConfig.dataSource
        if (dataSource.type === 'axios') {
          data[i] = await api.axios(dataSource)
        } else {
          data[i] = ''
        }
      } else {
        data[i] = propConfig.value
      }
    }
  }
  return data
}
