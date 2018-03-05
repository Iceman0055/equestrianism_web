import axios from "axios";
export default {
  horseInfoList(pageIndex, pageRecorders, passportNumber, horseName) {
    return axios({
      url: "/equestrianismApi/horseInfo/list",
      method: "get",
      params: {
        pageIndex,
        pageRecorders,
        passportNumber,
        horseName
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
  getHorseName() {
    return axios({
      url: "/equestrianismApi/horseInfo/comboBox",
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
  addHorseInfo(horseInfo) {
    return axios({
      url: "/equestrianismApi/horseInfo/add",
      method: "post",
      data: horseInfo,
      headers: { "Content-Type": "multipart/form-data" }
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
  updateHorseInfo(updateInfo) {
    return axios({
      url: "/equestrianismApi/horseInfo/update",
      method: "post",
      data: updateInfo,
      headers: { "Content-Type": "multipart/form-data" }
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
  getHorseDetail(horseId) {
    return axios({
      url: "/equestrianismApi/horseInfo/detail",
      method: "get",
      params: {
        horseId
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
  deleteHorse(deleteInfo) {
    return axios({
      url: "/equestrianismApi/horseInfo/delete",
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

  masterList(pageIndex, pageRecorders, hostName) {
    return axios({
      url: "/equestrianismApi/hostInfo/list",
      method: "get",
      params: {
        pageIndex,
        pageRecorders,
        hostName
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
  addMaster(masterInfo) {
    return axios({
      url: "/equestrianismApi/hostInfo/add",
      method: "post",
      data: masterInfo
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
  updateMaster(updateInfo) {
    return axios({
      url: "/equestrianismApi/hostInfo/update",
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
  deleteMaster(deleteInfo) {
    return axios({
      url: "/equestrianismApi/hostInfo/delete",
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
  getMasterDetail(hostId) {
    return axios({
      url: "/equestrianismApi/hostInfo/detail",
      method: "get",
      params: { hostId }
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
  awardsList(pageIndex, pageRecorders) {
    return axios({
      url: "",
      method: "get",
      params: {
        pageIndex,
        pageRecorders,
        name,
        contact
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
  addAwards(awardsInfo) {
    return axios({
      url: "",
      method: "post",
      data: awardsInfo,
      headers: { "Content-Type": "multipart/form-data" }
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
  updateAwards(awardsInfo) {
    return axios({
      url: "",
      method: "post",
      data: awardsInfo,
      headers: { "Content-Type": "multipart/form-data" }
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
  deleteAwards(deleteInfo) {
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
  }
};
