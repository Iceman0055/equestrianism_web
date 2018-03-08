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


};
