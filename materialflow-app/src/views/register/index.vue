<template>
  <div class="container">
    <div class="form">
      <div class="detail">
        <p>REGISTER</p>
      </div>
      <div class="main">
        <div class="inpbox">
          <input type="text" v-model="registerInfo.username" placeholder="请输入姓名" />
        </div>
        <div class="inpbox">
          <input type="password" v-model="registerInfo.password" placeholder="请输入密码"  />
        </div>
        <div class="inpbox">
          <input type="password" v-model="registerInfo.confirmPassword" placeholder="请再次输入密码"  />
        </div>
      </div>
      <div class="action" @click="submit">
        <div class="btn">注册</div>
      </div>
      <div class="tips" @click="goToLogin">
        <p>已有账号，立即登录</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { showSuccessToast, showToast } from 'vant';
import 'vant/es/toast/style';
import { register } from "@/api/user";
const router = useRouter();

const registerInfo = reactive( {
  username: '',
  password: '',
  confirmPassword: ''
})

const submit = async() => {
  if(registerInfo.username === '') {
    showToast('账号不能为空！')
  } else if(registerInfo.password === '' || registerInfo.confirmPassword === '' || registerInfo.password !== registerInfo.confirmPassword) {
    showToast('请保证两次密码不为空且相等！')
  } else {
    await register({
      username: registerInfo.username,
      password: registerInfo.password,
      confirmPassword: registerInfo.confirmPassword
    }).then((res:any) => {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    })
  }
}
const goToLogin = () => {
  router.replace('/login');
}

</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  box-sizing: border-box;
  .form {
    width: 80%;
    height: 20rem;
    background-color: rgba(205,234,247,0.3);
    color: #fff;
    padding: 5rem 2rem;
    border-radius: 1rem;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.4);
    .detail {
      p {
        text-align: center;
        font-size: 1.8rem;
        color: #0e92b3;
      }
    }
    .main {
      .inpbox {
        background: linear-gradient(90deg, #03a9f4, #f441a5,#ffeb3b, #03a9f4);
        background-size: 400%;
        width: 100%;
        height: 3rem;
        margin-top: 1.2rem;
        border-radius: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 1s;
        input {
          background-color: rgb(205,234,247);
          border: 0;
          width: 100%;
          text-align: center;
          font-size: 1rem;
          color: #fff;
          outline: none;
          height: calc(100% - 0.3rem);
          width: calc(100% - 0.4rem);
          border-radius: 2rem;
        }
      }
      .inpbox:has(input:focus) {
        animation: animate 5s linear infinite;
        transform: scale(1.2);
      }
      @keyframes animate {
        0% {
          background-position: 0,0;
        }
        100% {
          background-position: 400% 0;
        }
      }
    }
    .action {
      margin-top: 1.5rem;
      display: flex;
      justify-content: center;
      .btn {
        width: 100%;
        text-transform: uppercase;
        border: 2px solid #0e92b3;
        background: rgb(147, 214, 226);
        color: #eee;
        text-align: center;
        line-height: 3rem;
        border-radius: 2rem;
        cursor: pointer;
        transition: all 1s;
      }
      .btn:hover {
        transform: scale(1.2);
        background-color: #0e92b3;
      }
    }
    .tips {
      margin-top: 1rem;
      text-align: right;
      color: #6cb5c7;
      cursor: pointer;
    }
  }
}
</style>
