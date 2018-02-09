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
        if (!err.note) {
          err.note = "网络故障";
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
        if (!err.note) {
          err.note = "网络故障";
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
        if (!err.note) {
          err.note = "网络故障";
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
        if (!err.note) {
          err.note = "网络故障";
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
        if (!err.note) {
          err.note = "网络故障";
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
        if (!err.note) {
          err.note = "网络故障";
        }
        return Promise.reject(err);
      }
    );
  }
};
