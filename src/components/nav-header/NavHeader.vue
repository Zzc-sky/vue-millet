<template>
    <div class="header" :class="{margin_bottom: offsetY>=offsetTop}">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">松果出行</a>
                    <a href="javascript:;">MIUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="/#/login" v-if="!username">登录</a>
                    <a href="javascript:;" v-if="username" @click="loginLogout">退出</a>
                    <a href="/#/register" v-if="!username">注册</a>
                    <a href="/#/order/list" v-if="username">我的订单</a>
                    <a href="/#/cart" class="shopping-cart">
                        <i class="iconfont icon-cart"></i>
                        购物车({{cartCount || 0}})
                    </a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <!-- logo部分 -->
                <div class="header-logo">
                    <a href="#/home"></a>
                </div>
                <!-- 菜单 -->
                <div class="header-menu">
                    <div class="menu-item">
                        <span>小米手机</span>
                        <div class="children">
                            <ul>
                                <li
                                    class="product"
                                    v-for="(item,index) in phoneList"
                                    :key="index"
                                    @click="itemClick(item.id)"
                                >
                                    <a :href="'#/product/'+item.id">
                                        <div class="pro-img">
                                            <img v-lazy="item.mainImage" />
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price}}元</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="menu-item">
                        <span>Redmi红米</span>
                        <div class="children"></div>
                    </div>
                    <div class="menu-item">
                        <span>电视</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item,index) in tvList" :key="index">
                                    <a href="javascript:;">
                                        <div class="pro-img">
                                            <img v-lazy="item.img" />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- 搜索框 -->
                <div class="header-search">
                    <input class="search" type="text" />
                    <button>
                        <i class="iconfont icon-fangdajing"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { getCartCount, reqProducts, logout } from "api";

export default {
    name: "NavHeader",
    props: {
        offsetY: Number,
    },
    data() {
        return {
            phoneList: [],
            tvList: [
                {
                    id: "",
                    img: "/imgs/nav-img/nav-3-1.jpg",
                },
                {
                    id: "",
                    img: "/imgs/nav-img/nav-3-2.jpg",
                },
                {
                    id: "",
                    img: "/imgs/nav-img/nav-3-3.png",
                },
                {
                    id: "",
                    img: "/imgs/nav-img/nav-3-4.jpg",
                },
                {
                    id: "",
                    img: "/imgs/nav-img/nav-3-5.jpg",
                },
                {
                    id: "",
                    img: "/imgs/nav-img/nav-3-6.png",
                },
            ],
        };
    },
    methods: {
        loginLogout() {
            logout().then(() => {
                this.$message.success("退出成功");
                this.$cookie.set("userId", "", { expires: "-1" });
                this.$store.dispatch("saveUserName", "");
                this.$store.dispatch("saveCartCount", 0);
            });
        },
        itemClick(id) {
            this.$router.push("/product" + id);
        },
        async _getCartCount() {
            const res = await getCartCount();
            this.$store.dispatch("saveCartCount", res);
        },
        async _reqProducts() {
            const res = await reqProducts();
            this.phoneList = res.list.slice(4, 10);
        },
    },
    computed: {
        ...mapState(["username", "cartCount", "offsetTop"]),
    },
    mounted() {
        this._reqProducts();
        // 当用户登录时才获取购物车数量
        if (this.$cookie.get("userId")) {
            this._getCartCount();
        }
    },
};
</script>

<style lang="scss" scoped>
.header {
    &.margin_bottom {
        margin-bottom: 69px;
    }
    .nav-topbar {
        height: 40px;
        line-height: 40px;
        background-color: #333333;
        .container {
            display: flex;
            width: 1226px;
            margin: 0 auto;
            justify-content: space-between;
            .topbar-menu,
            .topbar-user {
                display: flex;
                a {
                    font-size: 12px;
                    display: inline-block;
                    color: #b0b0b0;
                    margin-right: 15px;
                    &:hover {
                        color: #ff6600;
                    }
                }
                .shopping-cart {
                    width: 110px;
                    height: 40px;
                    margin-right: 0;
                    background-color: #666666;
                    text-align: center;
                }
            }
        }
    }
    .nav-header {
        display: flex;
        height: 112px;
        align-items: center;
        .container {
            position: relative;
            display: flex;
            width: 1226px;
            height: 112px;
            margin: 0 auto;
            align-items: center;
            justify-content: space-between;
            .header-logo {
                width: 55px;
                height: 55px;
                background-color: #ff6600;
                overflow: hidden;
                a {
                    display: inline-block;
                    width: 110px;
                    height: 55px;
                    &:before,
                    &:after {
                        content: "";
                        display: inline-block;
                        width: 55px;
                        height: 55px;
                        background: url("/imgs/mi-logo.png") no-repeat center;
                        background-size: 55px 55px;
                        transition: all 0.5s;
                    }
                    &:after {
                        background: url("/imgs/mi-home.png") no-repeat center;
                    }
                    &:hover:before {
                        margin-left: -55px;
                        transition: all 0.5s;
                    }
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .header-menu {
                display: flex;
                .menu-item {
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    color: #333333;
                    cursor: pointer;
                    span {
                        font-weight: bold;
                        cursor: pointer;
                    }
                    &:hover {
                        color: #ff6600;
                        .children {
                            height: 220px;
                            opacity: 1;
                            background-color: #fff;
                        }
                    }
                    .children {
                        width: 1226px;
                        height: 0;
                        opacity: 0;
                        position: absolute;
                        top: 112px;
                        left: 0;
                        box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                        border-top: 1px solid #e5e5e5;
                        overflow: hidden;
                        transition: all 0.5s;
                        z-index: 11;
                        ul {
                            display: flex;
                            .product {
                                flex: 1;
                                font-size: 12px;
                                text-align: center;
                                a {
                                    display: inline-block;
                                }
                                .pro-img {
                                    img {
                                        margin-top: 20px;
                                    }
                                }
                                .pro-name {
                                    color: #333333;
                                    font-weight: bold;
                                    margin-top: 5px;
                                }
                                .pro-price {
                                    color: #ff6600;
                                }
                            }
                        }
                    }
                }
            }
            .header-search {
                display: flex;
                width: 317px;
                height: 50px;
                box-sizing: border-box;
                border: 1px solid #e0e0e0;
                .search {
                    width: 264px;
                    height: 48px;
                    border: 0;
                    padding-left: 20px;
                }
                button {
                    width: 51px;
                    height: 48px;
                    background-color: #fff;
                    border: 0;
                    border-left: 1px solid #e0e0e0;
                    cursor: pointer;
                    .icon-fangdajing {
                        font-size: 20px;
                    }
                    &:hover {
                        background-color: #ff6600;
                        color: #fff;
                    }
                }
                &:hover {
                    border-color: #ccc;
                }
            }
        }
    }
}
</style>