<template>
    <div class="home-product">
        <div class="container">
            <h2>手机</h2>
            <div class="product-box">
                <div class="left-product">
                    <a href="javascript:;">
                        <img src="/imgs/mix-alpha.jpg" alt />
                    </a>
                </div>
                <div class="right-product">
                    <ul>
                        <li
                            class="product-item"
                            v-for="(item,index) in phoneList"
                            :key="index"
                            @click="itemClick(item.id)"
                        >
                            <img v-lazy="item.mainImage" />
                            <p class="pro-name">{{item.name}}</p>
                            <p class="pro-config">{{item.subtitle}}</p>
                            <span class="pro-price">{{item.price}}元</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reqProducts } from "api";

export default {
    name: "product",
    data() {
        return {
            phoneList: [],
        };
    },
    methods: {
        itemClick(id) {
            this.$router.push("/product/" + id);
        },
    },
    async mounted() {
        const result = await reqProducts();
        this.phoneList = result.list.slice(4, 10);
    },
};
</script>

<style lang="scss" scoped>
.home-product {
    padding: 30px 0 50px;
    margin-top: 50px;
    background-color: #f5f5f5;
    h2 {
        font-size: 22px;
        color: #333333;
        margin-bottom: 20px;
    }
    .product-box {
        display: flex;
        .left-product {
            margin-right: 15px;
            transition: all 0.5s;
            &:hover {
                transform: translateY(-10px);
            }
            img {
                width: 224px;
                height: 619px;
            }
        }
        .right-product {
            ul {
                display: flex;
                flex-wrap: wrap;
                .product-item {
                    width: 236px;
                    height: 302px;
                    background-color: #fff;
                    text-align: center;
                    margin-bottom: 15px;
                    margin-right: 10px;
                    transition: all 0.5s;
                    &:hover {
                        transform: translateY(-10px);
                        box-shadow: 2px 0 10px #888888;
                        cursor: pointer;
                    }
                    img {
                        width: 100%;
                        margin-top: 35px;
                        margin-bottom: 20px;
                    }
                    .pro-name {
                        color: #333333;
                        font-size: 14px;
                    }
                    .pro-config {
                        color: #999999;
                        font-size: 12px;
                        margin-bottom: 10px;
                    }
                    .pro-price {
                        color: #f20a0a;
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
</style>