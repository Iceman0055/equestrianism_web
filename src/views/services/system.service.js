import axios from "axios";

export default {
  //用户列表
  userList(pageIndex, realname, jobNumber, status, departmentName, roleName, pageRecorders) {
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
        if (resp.data.code == 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.note) {
          err.note = "网络故障";
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
        if (resp.data.code == 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.note) {
          err.note = "网络故障";
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
        if (resp.data.code == 10200) {
          return Promise.resolve(resp.data);
        } else {
          return Promise.reject(resp.data);
        }
      },
      err => {
        if (!err.note) {
          err.note = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  updateUser(updateUser){
      return axios({
          url:'/equestrianismApi/userInfo/update',
          method:"post",
          data:updateUser
      }).then((resp)=>{
          if(resp.data.code == 10200){
              return Promise.resolve(resp.data)
          }else{
              return Promise.reject(resp.data)
          }
      },(err)=>{
          if(!err.note){
              err.note = '网络故障'
          }
          return Promise.reject(err)
      })
  }
};
