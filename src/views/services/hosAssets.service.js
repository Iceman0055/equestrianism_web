import axios from "axios";
export default {
  assetsList() {
    return axios({
      url: "",
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
        if (!err.note) {
          err.note = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  },
  addAssets() {
    return axios({
      url: " ",
      method: "post",
      data: {}
    }).then(
      resp => {
        if (resp.data.code === 10200) {
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
  updateAssets() {
    return axios({
      url: "",
      method: "post",
      data: {}
    }).then(
      resp => {
        if (resp.data.code === 10200) {
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
  deleteAssets() {
    return axios({
      url: "",
      method: "post",
      data: {}
    }).then(
      resp => {
        if (resp.data.code === 10200) {
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
  }
};
