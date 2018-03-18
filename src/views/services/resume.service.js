import axios from 'axios'
export default {
  getHorseResume(pageIndex, pageRecorders,horseName) {
    return axios({
      url: '/equestrianismApi/horseResume/list',
      method: 'get',
      params: {pageIndex, pageRecorders,horseName}
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.msg) {
          err.msg = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  getResumeDetail(horseId) {
    return axios({
      url: '/equestrianismApi/horseResume/detail',
      method: 'get',
      params: {horseId}
    }).then(
        resp => {
          if (resp.data.code === 10200) {
            return Promise.resolve(resp.data)
          } else {
            return Promise.reject(resp.data)
          }
        },
        err => {
          if (!err.msg) {
            err.msg = '网络故障'
          }
          return Promise.reject(err)
        }
      )
  }
}
