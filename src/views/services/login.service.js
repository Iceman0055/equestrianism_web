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
          console.log(resp.data.data.sessionId)
          window.sessionStorage.setItem('sessionId', resp.data.data.sessionId)
          axios.defaults.headers.common['sessionId'] = resp.data.data.sessionId
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
