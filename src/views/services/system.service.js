import axios from 'axios'

export default {
  // 用户列表
  userList(
    pageIndex,
    realname,
    jobNumber,
    status,
    departmentName,
    roleName,
    pageRecorders
  ) {
    return axios({
      url: '/equestrianismApi/userInfo/list',
      method: 'get',
      params: {
        pageIndex,
        pageRecorders,
        realname,
        jobNumber,
        status,
        departmentName,
        roleName
      }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  addUser(addInfo) {
    return axios({
      url: '/equestrianismApi/userInfo/add',
      method: 'post',
      data: addInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  deleteUser(deleteInfo) {
    return axios({
      url: '/equestrianismApi/userInfo/delete',
      method: 'post',
      data: deleteInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  updateUser(updateUser) {
    return axios({
      url: '/equestrianismApi/userInfo/update',
      method: 'post',
      data: updateUser
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  userDetail(userId) {
    return axios({
      url: '/equestrianismApi/userInfo/detail',
      method: 'get',
      params: {
        userId
      }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  // 角色列表
  roleList(pageIndex, pageRecorders) {
    return axios({
      url: '/equestrianismApi/roleInfo/list',
      method: 'get',
      params: {
        pageIndex,
        pageRecorders
      }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  // 获取角色的下拉框
  getRole() {
    return axios({
      url: '/equestrianismApi/roleInfo/comboBox',
      method: 'get',
      params: {}
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  addRole(addInfo) {
    return axios({
      url: '/equestrianismApi/roleInfo/add',
      method: 'post',
      data: addInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  updateRole(updateRole) {
    return axios({
      url: '/equestrianismApi/roleInfo/update',
      method: 'post',
      data: updateRole
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  deleteRole(deleteInfo) {
    return axios({
      url: '/equestrianismApi/roleInfo/delete',
      method: 'post',
      data: deleteInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  roleDetail(roleId) {
    return axios({
      url: '/equestrianismApi/roleInfo/detail',
      method: 'get',
      params: { roleId }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  // 部门列表
  departList(pageIndex, pageRecorders, departmentName) {
    return axios({
      url: '/equestrianismApi/departmentInfo/list',
      method: 'get',
      params: {
        pageIndex,
        pageRecorders,
        departmentName
      }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  addDepart(addInfo) {
    return axios({
      url: '/equestrianismApi/departmentInfo/add',
      method: 'post',
      data: addInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  updateDepart(updateInfo) {
    return axios({
      url: '/equestrianismApi/departmentInfo/update',
      method: 'post',
      data: updateInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  deleteDepart(deleteInfo) {
    return axios({
      url: '/equestrianismApi/departmentInfo/delete',
      method: 'post',
      data: deleteInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  // 部门下拉
  getDepart() {
    return axios({
      url: '/equestrianismApi/departmentInfo/comboBox',
      method: 'get',
      params: {}
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  },
  departDetail(departmentId) {
    return axios({
      url: '/equestrianismApi/departmentInfo/detail',
      method: 'get',
      params: { departmentId }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data)
        } else {
          return Promise.reject(resp.data)
        }
      },
      err => {
        if (!err.note) {
          err.note = '网络故障'
        }
        return Promise.reject(err)
      }
    )
  }
}
