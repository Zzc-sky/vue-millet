<template>
    <div class="content">
        <div class="item-bg-1">
            <h2>{{productInfo.name}}</h2>
            <h3>{{productInfo.subtitle}}</h3>
            <p>
                <span>全球首款双频 GPS</span>
                <span class="line">|</span>
                <span>骁龙845</span>
                <span class="line">|</span>
                <span>AI 变焦双摄</span>
                <span class="line">|</span>
                <span>红外人脸识别</span>
            </p>
            <div class="price">
                <span>¥{{productInfo.price}}</span>
            </div>
        </div>
        <div class="item-bg-2"></div>
        <div class="item-bg-3"></div>
        <div class="item-swiper">
            <swiper :options="swiperOptions">
                <swiper-slide>
                    <img src="/imgs/product/gallery-2.png" alt />
                </swiper-slide>
                <swiper-slide>
                    <img src="/imgs/product/gallery-3.png" alt />
                </swiper-slide>
                <swiper-slide>
                    <img src="/imgs/product/gallery-4.png" alt />
                </swiper-slide>
                <swiper-slide>
                    <img src="/imgs/product/gallery-5.jpg" alt />
                </swiper-slide>
                <swiper-slide>
                    <img src="/imgs/product/gallery-6.jpg" alt />
                </swiper-slide>
            </swiper>
            <p class="desc">小米8 AI变焦双摄拍摄</p>
        </div>
        <div class="item-video">
            <h2>
                60帧超慢动作摄影
                <br />慢慢回味每一瞬间的精彩
            </h2>
            <p>
                后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！
                <br />更能AI 精准分析视频内容，15个场景智能匹配背景音效。
            </p>
            <div class="video-bg" @click="showSlide=true"></div>

            <div class="video-box" v-if="showSlide">
                <div class="overlay" v-if="showSlide"></div>
                <div class="video" :class="{slide:showSlide}">
                    <span class="icon-close" @click="closeVideo"></span>
                    <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
    name: "pro-content",
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        productInfo: Object,
    },
    data() {
        return {
            showSlide: false, //控制动画效果
            swiperOptions: {
                slidesPerView: 3,
                spaceBetween: 30,
                freeMode: true,
                loop: true,
                autoplay: {
                    disableOnInteraction: false,
                },
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        };
    },
    methods: {
        closeVideo() {
            this.showSlide = false;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "assets/css/mixin.scss";
.content {
    margin-bottom: 40px;
    .item-bg-1 {
        height: 718px;
        background: url("/imgs/product/product-bg-1.png") no-repeat center;
        text-align: center;
        h2 {
            font-size: 80px;
            font-weight: bold;
            padding-top: 55px;
        }
        h3 {
            font-size: 24px;
            letter-spacing: 10px;
        }
        p {
            margin-top: 10px;
            .line {
                margin: 0 5px;
            }
        }
        .price {
            margin-top: 10px;
            font-size: 38px;
        }
    }
    .item-bg-2 {
        height: 480px;
        background: url("/imgs/product/product-bg-2.png") no-repeat center;
        background-size: 1226px 397px;
    }
    .item-bg-3 {
        background: url("/imgs/product/product-bg-3.png") no-repeat center;
        height: 638px;
        background-size: contain;
    }
    .item-swiper {
        margin: 36px auto 52px;
        .desc {
            font-size: 18px;
            color: #333333;
            text-align: center;
        }
        img {
            width: 100%;
        }
    }
    .item-video {
        height: 1044px;
        background-color: #070708;

        text-align: center;
        h2 {
            color: #ffffff;
            font-size: 60px;
            padding-top: 82px;
            margin-bottom: 47px;
        }
        p {
            color: #ffffff;
            font-size: 24px;
            margin-bottom: 58px;
        }
        .video-bg {
            background: url("/imgs/product/gallery-1.png") no-repeat center;
            background-size: cover;
            width: 1226px;
            height: 540px;
            margin: 0 auto 120px;
            cursor: pointer;
        }

        .video-box {
            .overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #333;
                opacity: 0.4;
            }
            .video {
                position: fixed;
                top: -50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 1000px;
                height: 536px;
                z-index: 10;
                &.slide {
                    top: 50%;
                    opacity: 1;
                }
                video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .icon-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    @include bgImg(20px, 20px, "/imgs/icon-close.png");
                    cursor: pointer;
                    z-index: 11;
                }
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>