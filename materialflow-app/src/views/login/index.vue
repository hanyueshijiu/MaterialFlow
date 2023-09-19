<template>
    <div class="container">
        <div class="form">
            <div class="detail">
                <h1>Hello!</h1>
                <h1>欢迎使用物流平台</h1>
            </div>
            <div class="main">
                <div class="inpbox">
                    <input type="text" v-model="loginInfo.account" placeholder="请输入账号" />
                </div>
                <div class="inpbox">
                    <input type="password" v-model="loginInfo.password" placeholder="请输入密码" />
                </div>
            </div>
            <div class="action">
                <div class="btn" @click="submit">登录</div>
            </div>
            <div class="tips" @click="goToRegister">
                <p>没有账号，立即注册</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { showSuccessToast, showToast, showFailToast } from 'vant'
import 'vant/es/toast/style'
import { login } from '../../api/user'
const router = useRouter()

const loginInfo = reactive({
    account: '',
    password: ''
})

// 登录
const submit = async () => {
    if (loginInfo.account === '') {
        showToast('账号不能为空！')
    } else if (loginInfo.password === '') {
        showToast('请输入密码！')
    } else {
        const res = await login({
            username: loginInfo.account,
            password: loginInfo.password
        })
        if (res.code !== 0) {
            showFailToast(res.message)
        } else {
            showSuccessToast(res.message)
            localStorage.setItem('account', loginInfo.account)
            localStorage.setItem('authority', res.result.authority)
            localStorage.setItem('token', res.result.token)
            router.push('/home/orderList')
        }
    }
}
// 跳转注册
const goToRegister = () => {
    router.replace('/register')
}
</script>

<style lang="less" scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-image: url('../../assets/bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    padding-top: 5rem;
    box-sizing: border-box;
    .form {
        width: 80%;
        height: 17rem;
        background-color: rgba(205, 234, 247, 0.3);
        color: #fff;
        padding: 5rem 2rem;
        border-radius: 1rem;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
        .detail {
            h1 {
                background: linear-gradient(to right, #f00, #00f);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
        .main {
            .inpbox {
                background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
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
                    background-color: rgb(205, 234, 247);
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
                    background-position: 0, 0;
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
