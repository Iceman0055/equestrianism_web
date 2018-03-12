import axios from "axios";
export default {
  assetsList(pageIndex, pageRecorders) {
    return axios({
      url: "",
      method: "get",
      params: { pageIndex, pageRecorders }
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
  addAssets(addInfo) {
    return axios({
      url: " ",
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
  updateAssets(updateInfo) {
    return axios({
      url: "",
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
  deleteAssets(deleteInfo) {
    return axios({
      url: "",
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
  getAssetsDetail(assetsId) {
    return axios({
      url: "",
      method: "get",
      params: {assetsId}
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
