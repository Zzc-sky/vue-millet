<template>
    <div class="register">
        <div class="reg-form">
            <div class="reg-logo">
                <img src="/imgs/logo-mi.png" />
            </div>
            <h2>注册小米账号</h2>
            <div class="reg-container">
                <div class="reg-username">
                    <input type="text" placeholder="用户名" v-model="username" />
                </div>
                <div class="reg-password">
                    <input type="password" placeholder="密码" v-model="password" />
                </div>
                <div class="reg-email">
                    <input type="text" placeholder="邮箱" v-model="email" />
                </div>
                <div class="reg-button">
                    <button @click="regisetClick">立即注册</button>
                </div>
            </div>
            <div class="privacy">
                注册账号即代表您同意并愿意遵守小米
                <span>用户协议</span> 和
                <span>隐私政策</span>
            </div>
        </div>
    </div>
</template>
<script>
import { reqRegiset } from "api";

export default {
    name: "register",
    data() {
        return {
            username: "",
            password: "",
            email: "",
        };
    },
    methods: {
        async regisetClick() {
            const { username, password, email } = this;
            await reqRegiset(username, password, email);
            this.$message.success("注册成功");
            this.username = "";
            this.password = "";
            this.email = "";
            this.$router.push("/login");
        },
    },
};
</script>

<style lang='scss' scoped>
.register {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    padding-top: 100px;
    .reg-form {
        width: 850px;
        height: 565px;
        margin: 0 auto;
        background-color: #fff;
        text-align: center;
        .reg-logo {
            img {
                width: 50px;
                height: 50px;
            }
        }
        h2 {
            color: #333333;
            font-size: 30px;
            margin-top: 46px;
        }
        .reg-container {
            margin-top: 50px;
            .reg-username,
            .reg-password,
            .reg-email {
                margin-bottom: 15px;
                input {
                    width: 332px;
                    height: 42px;
                    border: 1px solid #e5e5e5;
                    padding-left: 15px;
                }
            }
            .reg-button {
                margin-top: 30px;
                button {
                    width: 332px;
                    height: 42px;
                    color: #fff;
                    background-color: #ff6700;
                    cursor: pointer;
                }
            }
        }
        .privacy {
            color: #999999;
            margin-top: 50px;
            span {
                color: #333333;
            }
        }
    }
}
</style>