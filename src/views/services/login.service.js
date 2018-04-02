import axios from 'axios'
export default {
  login(loginName,loginPassword) {
    return axios({
      url: '/equestrianismApi/auth/login',
      method: 'post',
      data: {loginName,loginPassword}
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          window.sessionStorage.setItem('sessionId', resp.data.sessionId)
          axios.defaults.headers.common['sessionId'] = resp.data.sessionId
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
