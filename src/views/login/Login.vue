<template>
    <div class="login">
        <div class="login-logo container">
            <a href="/#/home">
                <img src="/imgs/login-logo.png" alt />
            </a>
        </div>
        <div class="login-content">
            <div class="container">
                <div class="login-box">
                    <!-- 登录类型 账号或扫码 -->
                    <div class="login-type">
                        <a
                            :class="{active:loginToggle==true}"
                            href="javascript:;"
                            @click="loginToggle=true"
                        >账号登录</a>
                        <span class="line"></span>
                        <a
                            href="javascript:;"
                            @click="loginToggle=false"
                            :class="{active:loginToggle==false}"
                        >扫码登录</a>
                    </div>
                    <!-- 账号密码登录 -->
                    <div class="login-form" v-if="loginToggle">
                        <div class="username">
                            <input type="text" placeholder="邮箱/手机号码/小米ID" v-model="username" />
                        </div>
                        <div class="password">
                            <input type="password" placeholder="密码" v-model="password" />
                        </div>
                        <button @click="login">登录</button>
                        <div class="order">
                            <div class="left-order">
                                <a href="/#/register">手机短信登录/注册</a>
                            </div>
                            <div class="right-order">
                                <a href="javascript:;">立即注册</a>
                                <span>|</span>
                                <a href="javascript:;">忘记密码？</a>
                            </div>
                        </div>
                    </div>
                    <div class="erweima" v-else>
                        <img src="/imgs/erweima.png" alt />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reqLogin } from "api";

export default {
    name: "login",
    data() {
        return {
            loginToggle: true,
            username: "admin",
            password: "admin",
        };
    },
    methods: {
        // 登录
        login() {
            let { username, password } = this;
            reqLogin(username, password).then((res) => {
                this.$cookie.set("userId", res.id, { expires: "Session" });
                this.$store.dispatch("saveUserName", res.username);
                this.$message.success("登录成功");
                this.$router.push("/home");
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.login {
    .login-logo {
        height: 112px;
        line-height: 112px;
        a {
            display: inline-block;
            img {
                width: 200px;
                height: 98px;
            }
        }
    }
    .login-content {
        height: 576px;
        background: url("/imgs/login-bg.jpg") no-repeat center;
        .container {
            position: relative;
            .login-box {
                width: 410px;
                height: 510px;
                background-color: #fff;
                position: absolute;
                top: 37px;
                right: 0;
                padding: 40px 30px;
                text-align: center;
                .login-type {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    a {
                        font-size: 24px;
                        color: #656565;
                        &:hover {
                            color: #f56600;
                        }
                    }
                    .line {
                        width: 1px;
                        height: 24px;
                        margin: 0 35px;
                        background-color: #e0e0e0;
                    }
                    .active {
                        color: #f56600;
                    }
                }
                .login-form {
                    margin-top: 50px;
                    input {
                        height: 50px;
                        width: 100%;
                        border: 1px solid #e5e5e5;
                        margin-bottom: 20px;
                        padding-left: 18px;
                    }
                    button {
                        height: 50px;
                        width: 100%;
                        background-color: #f56600;
                        color: #fff;
                        margin-top: 10px;
                        font-size: 16px;
                        cursor: pointer;
                    }
                    .order {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10px;
                        .left-order {
                            a {
                                font-size: 14px;
                                color: #f56600;
                            }
                        }
                        .right-order {
                            color: #999;
                            span {
                                margin: 0 10px;
                            }
                            a {
                                color: #999;
                                &:hover {
                                    color: #f56600;
                                }
                            }
                        }
                    }
                }
                .erweima {
                    img {
                        width: 100%;
                        margin-top: 40px;
                    }
                }
            }
        }
    }
}
</style>