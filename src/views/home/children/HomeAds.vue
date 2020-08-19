<template>
    <div class="home-ads">
        <div class="container">
            <div v-for="(item,index) in adsList" :key="index" class="ads-item">
                <a :href="'#/product/'+item.id">
                    <img v-lazy="item.img" alt />
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "HomeAds",
    data() {
        return {
            adsList: [
                {
                    id: 33,
                    img: "imgs/ads/ads-1.png",
                },
                {
                    id: 48,
                    img: "imgs/ads/ads-2.jpg",
                },
                {
                    id: 45,
                    img: "imgs/ads/ads-3.png",
                },
                {
                    id: 47,
                    img: "imgs/ads/ads-4.jpg",
                },
            ],
        };
    },
};
</script>


<style lang="scss" scoped>
@import "~assets/css/mixin.scss";

.home-ads {
    .container {
        @include container();
        display: flex;
        justify-content: space-between;
        .ads-item {
            transition: all 0.5s;
            
            img {
                width: 296px;
                height: 167px;
            }
            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
</style>