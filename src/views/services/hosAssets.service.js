import axios from "axios";
export default {
  assetsList(pageIndex, pageRecorders, typeId, typeDetailId, assetName) {
    return axios({
      url: "/equestrianismApi/hospitalAssetInfo/list",
      method: "get",
      params: { pageIndex, pageRecorders, typeId, typeDetailId, assetName }
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
      url: "/equestrianismApi/hospitalAssetInfo/add",
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
      url: "/equestrianismApi/hospitalAssetInfo/update",
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
      url: "/equestrianismApi/hospitalAssetInfo/delete",
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
  getAssetsDetail(assetId) {
    return axios({
      url: "/equestrianismApi/hospitalAssetInfo/detail",
      method: "get",
      params: { assetId }
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
  getAssetsInfo(barCode) {
    return axios({
      url: "/equestrianismApi/hospitalAssetInfo/assetName",
      method: "get",
      params: { barCode }
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
  addAssetsInventory(inventoryList){
    return axios({
      url: "/equestrianismApi/hospitalAssetInfo/inventory",
      method: "post",
      data: {inventoryList}
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
  addConsumeInventory(inventoryList){
    return axios({
      url: "/equestrianismApi/consumableAssetInfo/inventory",
      method: "post",
      data: {inventoryList}
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
  consumeList(pageIndex, pageRecorders, typeId, typeDetailId, assetName) {
    return axios({
      url: "/equestrianismApi/consumableAssetInfo/list",
      method: "get",
      params: { pageIndex, pageRecorders, typeId, typeDetailId, assetName }
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
  addConsume(addInfo) {
    return axios({
      url: "/equestrianismApi/consumableAssetInfo/add",
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
  updateConsume(updateInfo) {
    return axios({
      url: "/equestrianismApi/consumableAssetInfo/update",
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
  deleteConsume(deleteInfo) {
    return axios({
      url: "/equestrianismApi/consumableAssetInfo/delete",
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
  getConsumeDetail(assetId) {
    return axios({
      url: "/equestrianismApi/consumableAssetInfo/detail",
      method: "get",
      params: { assetId }
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
  getConsumeInfo(barCode) {
    return axios({
      url: "/equestrianismApi/consumableAssetInfo/assetName",
      method: "get",
      params: { barCode }
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
