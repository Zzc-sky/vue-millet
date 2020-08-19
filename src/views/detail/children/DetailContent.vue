<template>
    <div class="detail-content">
        <div class="container clearfix">
            <!-- 左侧轮播 -->
            <div class="swiper-wrapper">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in swiperList" :key="index">
                        <img :src="item" alt />
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <!-- 右侧内容 -->
            <div class="content">
                <h2 class="goods-title">小米9</h2>
                <p class="goods-info">
                    相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红
                    <br />外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
                </p>
                <div class="delivery">小米自营</div>
                <div class="goods-price">
                    <span class="new-price">2599元</span>
                    <span class="old-price">2999元</span>
                </div>
                <div class="line"></div>
                <div class="user-address">
                    <i class="user-icon"></i>
                    <div class="address">北京 北京市 朝阳区 安定门街道</div>
                    <div class="stock">有现货</div>
                </div>
                <div class="version clearfix">
                    <h2>选择版本</h2>
                    <div
                        class="version-item fl"
                        :class="{checked: version==1}"
                        @click="version=1"
                    >6GB+64GB 全网通</div>
                    <div
                        class="version-item fr"
                        :class="{checked: version==2}"
                        @click="version=2"
                    >4GB+64GB 移动4G</div>
                </div>
                <div class="version-color">
                    <h2>选择颜色</h2>
                    <div class="version-item checked">
                        <span class="color"></span>
                        深空灰
                    </div>
                </div>
                <div class="total">
                    <div class="total-info clearfix">
                        <span class="fl">小米8 6GB+64GB 全网通 深灰色</span>
                        <span class="fr">1099元</span>
                    </div>
                    <div class="goods-total">总计：1099元</div>
                </div>
                <div class="add-cart" @click="_addCart">加入购物车</div>
            </div>
        </div>
        <div class="price-desc">
            <div class="container">
                <h2>价格说明</h2>
                <div class="desc">
                    <img src="/imgs/detail/item-price.jpeg" alt />
                </div>
            </div>
        </div>
        <custom-modal ok="查看购物车" :showModal="showModal" @cancel="cancel" title="提示" @ok="ok" cancel="取消">
            <p slot="content">添加购物车成功</p>
        </custom-modal>
    </div>
</template>
<script>
import CustomModal from "components/custom-modal/CustomModal";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

import { addCart } from "api";
export default {
    name: "detail-content",
    data() {
        return {
            // 版本切换
            version: 1,
            id: this.$route.params.id,
            showModal: false,
            swiperList: [
                "/imgs/detail/phone-1.jpg",
                "/imgs/detail/phone-2.jpg",
                "/imgs/detail/phone-3.jpg",
                "/imgs/detail/phone-4.jpg",
            ],
            swiperOption: {
                autoplay: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                loop: true,
            },
        };
    },
    components: {
        Swiper,
        SwiperSlide,
        CustomModal,
    },
    methods: {
        // 加入购物车
        async _addCart() {
            try {
                const res = await addCart(this.id);
                this.$store.dispatch("saveCartCount", res.cartTotalQuantity);
                this.showModal = true;
            } catch (error) {
                this.$message.error("请先登录!");
            }
        },
        cancel() {
            this.showModal = false;
        },
        ok() {
            this.$router.push("/cart");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~assets/css/mixin.scss";

.detail-content {
    .swiper-wrapper {
        float: left;
        width: 600px;
        height: 617px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .content {
        float: right;
        .goods-title {
            font-size: 28px;
            color: #333333;
            padding-top: 30px;
            padding-bottom: 16px;
        }
        .goods-info {
            font-size: 14px;
            color: #999999;
        }
        .delivery {
            font-size: 16px;
            color: #ff6700;
            margin-top: 26px;
            margin-bottom: 14px;
        }
        .goods-price {
            .new-price {
                font-size: 20px;
                color: #ff6700;
            }
            .old-price {
                font-size: 14px;
                color: #999999;
                text-decoration: line-through;
                margin-left: 10px;
            }
        }
        .line {
            height: 0;
            margin-top: 25px;
            margin-bottom: 28px;
            border-top: 1px solid #e5e5e5;
        }
        .user-address {
            position: relative;
            font-size: 14px;
            padding: 31px 0 34px 64px;
            background-color: #fafafa;
            border: 1px solid rgba(229, 229, 229, 1);
            .user-icon {
                position: absolute;
                top: 27px;
                left: 34px;
                @include bgImg(20px, 22px, "/imgs/detail/icon-loc.png");
            }
            .address {
                color: #666666;
            }
            .stock {
                margin-top: 15px;
                color: #ff6700;
            }
        }
        .version,
        .version-color {
            margin-top: 30px;
            h2 {
                font-size: 18px;
                color: #333333;
                margin-bottom: 20px;
            }
            .version-item {
                font-size: 16px;
                color: #333333;
                width: 260px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                border: 1px solid #e5e5e5;
                cursor: pointer;
            }
            .checked {
                border: 1px solid #ff6600;
                color: #ff6600;
            }
            .color {
                display: inline-block;
                width: 14px;
                height: 14px;
                background-color: #666666;
                vertical-align: middle;
            }
        }
        .total {
            padding: 24px 30px 29px;
            background-color: #fafafa;
            margin-top: 50px;
            span {
                font-size: 14px;
            }
            .goods-total {
                font-size: 24px;
                color: #ff6600;
                margin-top: 10px;
            }
        }
        .add-cart {
            font-size: 16px;
            width: 260px;
            height: 50px;
            line-height: 50px;
            color: #fff;
            text-align: center;
            background-color: #ff6600;
            margin-top: 30px;
            margin-bottom: 50px;
            cursor: pointer;
        }
    }
    .price-desc {
        padding: 38px 0 60px;
        background-color: #f3f3f3;
        h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 30px;
        }
        .desc {
            width: 100%;
        }
    }
}
</style>