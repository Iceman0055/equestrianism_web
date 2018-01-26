import axios from "axios";
export default {
  login() {
    return axios({
      url: "",
      method: "post",
      data: {}
    }).then(
      resp => {
        if (resp.data.code == 10200) {
          window.sessionStorage.setItem("sessionId", resp.data.sessionId);
          axios.defaults.headers.common["sessionId"] = resp.data.sessionId;
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
