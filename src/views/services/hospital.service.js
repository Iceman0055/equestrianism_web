import axios from "axios";
export default {
  appointList(pageIndex, pageRecorders, appointDate, userId, appointNumber) {
    return axios({
      url: "/equestrianismApi/appointInfo/list",
      method: "get",
      params: { pageIndex, pageRecorders, appointDate, userId, appointNumber }
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
  addAppoint(appointInfo) {
    return axios({
      url: "/equestrianismApi/appointInfo/add",
      method: "post",
      data: appointInfo
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
  updateAppoint(appointInfo) {
    return axios({
      url: "/equestrianismApi/appointInfo/update",
      method: "post",
      data: appointInfo
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
  deleteAppoint(deleteInfo) {
    return axios({
      url: "/equestrianismApi/appointInfo/delete",
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
  getAppointDetail(hospitalAppointId) {
    return axios({
      url: "/equestrianismApi/appointInfo/detail",
      method: "get",
      params: {hospitalAppointId}
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
  getDoctor() {
    return axios({
      url: "/equestrianismApi/userInfo/veterinarian",
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




  operateRoomList(pageIndex, pageRecorders, name, shortName) {
    return axios({
      url: "/equestrianismApi/consultingRoomInfo/list",
    method: "get",
      params: { pageIndex, pageRecorders, name, shortName}
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
  addOperateRoom(operateInfo) {
    return axios({
      url: "/equestrianismApi/consultingRoomInfo/add",
      method: "post",
      data: operateInfo
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
  updateOperateRoom(operateInfo) {
    return axios({
      url: "/equestrianismApi/consultingRoomInfo/update",
      method: "post",
      data: operateInfo
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
  deleteOperateRoom(deleteInfo) {
    return axios({
      url: "/equestrianismApi/consultingRoomInfo/delete",
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
  operateRoomDetail(consultingRoomId) {
    return axios({
      url: "/equestrianismApi/consultingRoomInfo/detail",
      method: "get",
      params: {consultingRoomId}
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
  getOperateRoomBox() {
    return axios({
      url: "/equestrianismApi/consultingRoomInfo/comboBox",
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

};
