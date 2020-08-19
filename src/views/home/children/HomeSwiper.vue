<template>
    <div class="container" @mouseover="mouseOver" @mouseleave="mouseOut">
        <swiper class="home-swiper" :options="swiperOptions">
            <swiper-slide v-for="(item,index) in slideList" :key="index">
                <a :href="'#/product/'+item.id">
                    <img :src="item.img" alt />
                </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div v-show="show" class="swiper-button-prev" slot="pagination"></div>
            <div v-show="show" class="swiper-button-next" slot="pagination"></div>
        </swiper>

        <div class="left-menu">
            <ul>
                <li class="menu-item">
                    <a href="javascript:;">手机 电话卡</a>
                </li>
                <li class="menu-item">
                    <a href="javascript:;">电视 盒子</a>
                </li>
                <li class="menu-item">
                    <a href="javascript:;">笔记本 平板</a>
                </li>
                <li class="menu-item">
                    <a href="javascript:;">家电 插线板</a>
                </li>
                <li class="menu-item">
                    <a href="javascript:;">出行 穿戴</a>
                </li>
                <li class="menu-item">
                    <a href="javascript:;">耳机 音箱</a>
                </li>
                <li class="menu-item">
                    <a href="javascript:;">电源 配件</a>
                </li>
                <li class="menu-item">
                    <a href="javascript:;">生活 箱包</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
    name: "HomeSwiper",
    data() {
        return {
            // swiper 配置信息
            swiperOptions: {
                loop: true,
                autoplay: {
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                effect: "cube",
                cubeEffect: {
                    slideShadows: true,
                    shadow: true,
                    shadowOffset: 100,
                    shadowScale: 0.6,
                },
            },
            slideList: [
                {
                    id: "42",
                    img: "/imgs/slider/slide-1.jpg",
                },
                {
                    id: "45",
                    img: "/imgs/slider/slide-2.jpg",
                },
                {
                    id: "46",
                    img: "/imgs/slider/slide-3.jpg",
                },
                {
                    id: "",
                    img: "/imgs/slider/slide-4.jpg",
                },
                {
                    id: "",
                    img: "/imgs/slider/slide-5.jpg",
                },
            ],
            show: false, // 显示隐藏前进后退
        };
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    methods: {
        mouseOver() {
            this.show = true;
        },
        mouseOut() {
            this.show = false;
        },
    },
};
</script>

<style lang='scss' scoped>
@import "~assets/css/mixin.scss";

.container {
    position: relative;
    height: 451px;
    margin-bottom: 15px;
    overflow: hidden;
    .home-swiper {
        a {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
        .swiper-button-prev {
            margin-left: 264px;
        }
    }
    .left-menu {
        position: absolute;
        width: 264px;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 10;
        padding: 26px 0;
        background-color: #55585a7a;
        .menu-item {
            height: 50px;
            line-height: 50px;
            a {
                position: relative;
                display: inline-block;
                width: 100%;
                color: #fff;
                padding-left: 30px;
                &:hover {
                    background-color: #ff6600;
                }
                &::after {
                    @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
                    content: "";
                    position: absolute;

                    right: 30px;
                    top: 17px;
                }
            }
        }
    }
}
</style>