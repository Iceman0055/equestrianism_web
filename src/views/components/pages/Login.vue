<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group mb-0">
            <form class="card p-4" name="loginForm" novalidate>
              <div class="card-block">
                <h1>登录</h1>
                <!-- <p :class="{'login-info-error animated shake':login_err}" v-show="login_err">{{info}}</p> -->
                <div class="input-group mb-3">
                  <span class="input-group-addon">
                    <i class="icon-user"></i>
                  </span>
                  <input type="text" v-model="username" class="form-control" placeholder="请输入用户名">
                </div>
                <div class="input-group mb-4">
                  <span class="input-group-addon">
                    <i class="icon-lock"></i>
                  </span>
                  <input type="password" v-model="password" class="form-control" placeholder="请输入密码">
                </div>
                <div class="text-center">
                  <button type="button" class="btn btn-primary px-4" @click="login">登录</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5';
import { Message } from 'element-ui'
import loginSrv from '../../services/login.service.js'
/* eslint-disable */
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      if (!(this.username && this.password)) {
        this.$message.error('请输入用户信息')
        return;
      } else {
        loginSrv.login(this.username, md5(this.password)).then(resp => {
          window.localStorage.setItem('menuList', resp.data.menuList)
          let menuEnableMap = {};
          resp.data.menuList.map((value) => {
            menuEnableMap[value] = true;
          });
          window.localStorage.setItem('menuEnableMap', JSON.stringify(menuEnableMap))
          this.$router.push("/dashboard")
        }, err => {
          this.$message.error(err.msg)
        })

      }
    }
  }
}
</script>

<style scoped>
h1 {
  color: #fff;
}

form {
  background: rgba(0, 0, 0, 0.3);
}

input {
  border-radius: 5px;
  height: 40px;
}

.login-info-error {
  background: #F2DEDE;
  text-align: center;
  font-size: 16px;
  color: red;
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
}

.card {
  border-radius: 8px;
}
</style>