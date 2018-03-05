import axios from "axios";
let dictionary;
export default {
  formatDic() {
    var dict = dictionary.data.dictionaryInfoList;
    var object = {};
    dict.map((value, index) => {
      object.typeCode = value.typeCode;
      var newArr = value.dictionaryDetailList;
      newArr.map((value, index) => {});
    });
    let dics = {};
    dictionaryInfoList.map((value, index) => {
      let map = {};
      let dictionaryDetailList = value.dictionaryDetailList;
      dictionaryDetailList.map((value, index) => {
        map[value.itemCode] = value.itemValue;
      });

      dics[value.typeCode] = map;
    });
    console.log(dics);
  },
  dictionary() {
    if (dictionary) {
      return Promise.resolve(dictionary);
    }
    return axios({
      url: "/equestrianismApi/dictionaryInfo/all",
      method: "get",
      params: {}
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          dictionary = resp.data;
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
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
      url: "/equestrianismApi/userInfo/list",
      method: "get",
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
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  addUser(addInfo) {
    return axios({
      url: "/equestrianismApi/userInfo/add",
      method: "post",
      data: addInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  deleteUser(deleteInfo) {
    return axios({
      url: "/equestrianismApi/userInfo/delete",
      method: "post",
      data: deleteInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  updateUser(updateUser) {
    return axios({
      url: "/equestrianismApi/userInfo/update",
      method: "post",
      data: updateUser
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  userDetail(userId) {
    return axios({
      url: "/equestrianismApi/userInfo/detail",
      method: "get",
      params: {
        userId
      }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  // 角色列表
  roleList(pageIndex, pageRecorders) {
    return axios({
      url: "/equestrianismApi/roleInfo/list",
      method: "get",
      params: {
        pageIndex,
        pageRecorders
      }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  // 获取角色的下拉框
  getRole() {
    return axios({
      url: "/equestrianismApi/roleInfo/comboBox",
      method: "get",
      params: {}
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  addRole(addInfo) {
    return axios({
      url: "/equestrianismApi/roleInfo/add",
      method: "post",
      data: addInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  updateRole(updateRole) {
    return axios({
      url: "/equestrianismApi/roleInfo/update",
      method: "post",
      data: updateRole
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  deleteRole(deleteInfo) {
    return axios({
      url: "/equestrianismApi/roleInfo/delete",
      method: "post",
      data: deleteInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  roleDetail(roleId) {
    return axios({
      url: "/equestrianismApi/roleInfo/detail",
      method: "get",
      params: { roleId }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  // 部门列表
  departList(pageIndex, pageRecorders, departmentName, status) {
    return axios({
      url: "/equestrianismApi/departmentInfo/list",
      method: "get",
      params: {
        pageIndex,
        pageRecorders,
        departmentName,
        status
      }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  addDepart(addInfo) {
    return axios({
      url: "/equestrianismApi/departmentInfo/add",
      method: "post",
      data: addInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  updateDepart(updateInfo) {
    return axios({
      url: "/equestrianismApi/departmentInfo/update",
      method: "post",
      data: updateInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  deleteDepart(deleteInfo) {
    return axios({
      url: "/equestrianismApi/departmentInfo/delete",
      method: "post",
      data: deleteInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  // 部门下拉
  getDepart() {
    return axios({
      url: "/equestrianismApi/departmentInfo/comboBox",
      method: "get",
      params: {}
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  departDetail(departmentId) {
    return axios({
      url: "/equestrianismApi/departmentInfo/detail",
      method: "get",
      params: { departmentId }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  dictionaryList(pageIndex, pageRecorders, typeName, typeCode) {
    return axios({
      url: "/equestrianismApi/dictionaryInfo/list",
      method: "get",
      params: {
        pageIndex,
        pageRecorders,
        typeName,
        typeCode
      }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  addDict(addInfo) {
    return axios({
      url: "/equestrianismApi/dictionaryInfo/add",
      method: "post",
      data: addInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          dictionary = undefined;
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  updateDict(updateInfo) {
    return axios({
      url: "/equestrianismApi/dictionaryInfo/update",
      method: "post",
      data: updateInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          dictionary = undefined;
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  deleteDict(deleteInfo) {
    return axios({
      url: "/equestrianismApi/dictionaryInfo/delete",
      method: "post",
      data: deleteInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  getDict(dictionaryId) {
    return axios({
      url: "/equestrianismApi/dictionaryInfo/detail",
      method: "get",
      params: { dictionaryId }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  dicDetailList(dictionaryId) {
    return axios({
      url: "/equestrianismApi/dictionaryDetail/list",
      method: "get",
      params: { dictionaryId }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  addDicDetail(addInfo) {
    return axios({
      url: "/equestrianismApi/dictionaryDetail/add",
      method: "post",
      data: addInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          dictionary = undefined;
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  updateDicDetail(updateInfo) {
    return axios({
      url: "/equestrianismApi/dictionaryDetail/update",
      method: "post",
      data: updateInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          dictionary = undefined;
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  deleteDicDetail(deleteInfo) {
    return axios({
      url: "/equestrianismApi/dictionaryDetail/delete",
      method: "post",
      data: deleteInfo
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  getDicDetail(dictionaryDetailId) {
    return axios({
      url: "/equestrianismApi/dictionaryDetail/detail",
      method: "get",
      params: { dictionaryDetailId }
    }).then(
      resp => {
        if (resp.data.code === 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.msg) {
          err.msg = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  }
};
