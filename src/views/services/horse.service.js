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

  masterList(pageIndex, pageRecorders, hostName,contactWay) {
    return axios({
      url: "/equestrianismApi/hostInfo/list",
      method: "get",
      params: {
        pageIndex,
        pageRecorders,
        hostName,
        contactWay
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
  feederList(pageIndex, pageRecorders, feederName) {
    return axios({
      url: "/equestrianismApi/feederInfo/list",
      method: "get",
      params: {
        pageIndex,
        pageRecorders,
        feederName
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
  addFeeder(feederInfo) {
    return axios({
      url: "/equestrianismApi/feederInfo/add",
      method: "post",
      data: feederInfo
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
  updateFeeder(feederInfo) {
    return axios({
      url: "/equestrianismApi/feederInfo/update",
      method: "post",
      data: feederInfo
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
  deleteFeeder(deleteInfo) {
    return axios({
      url: "/equestrianismApi/feederInfo/delete",
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
  getFeederDetail(feederId) {
    return axios({
      url: "/equestrianismApi/feederInfo/detail",
      method: "get",
      params: { feederId }
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
  awardsList(pageIndex, pageRecorders,horseId,eventName,eventDate) {
    return axios({
      url: "/equestrianismApi/horsePrizeInfo/list",
      method: "get",
      params: {
        pageIndex,
        pageRecorders,
        horseId,
        eventName,
        eventDate
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
      url: "/equestrianismApi/horsePrizeInfo/add",
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
      url: "/equestrianismApi/horsePrizeInfo/update",
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
      url: "/equestrianismApi/horsePrizeInfo/delete",
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
  getAwardsDetail(horsePrizeId) {
    return axios({
      url: "/equestrianismApi/horsePrizeInfo/detail",
      method: "get",
      params: { horsePrizeId }
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
