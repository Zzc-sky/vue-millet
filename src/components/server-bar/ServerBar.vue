<template>
    <div class="server-bar">
        <div class="container">
            <div class="server-item">
                <i class="icon-setting"></i>
                <span>预约维修服务</span>
            </div>
            <div class="server-item">
                <i class="icon-7day"></i>
                <span>7天无理由退货</span>
            </div>
            <div class="server-item">
                <i class="icon-15day"></i>
                <span>15天免费换货</span>
            </div>
            <div class="server-item">
                <i class="icon-post"></i>
                <span>满150元包邮</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ServerBar",
};
</script>

<style lang="scss" scoped>
@import "~assets/css/mixin.scss";

.server-bar {
    padding: 30px 0;
    .container {
        display: flex;
        .server-item {
            flex: 1;
            text-align: center;
            border-right: 1px solid #ccc;
            &:last-child {
                border-right: 0;
            }
            span {
                font-size: 16px;
            }
            .icon-setting,
            .icon-7day,
            .icon-15day,
            .icon-post {
                position: relative;
                top: 5px;
                margin-right: 5px;
            }
            .icon-setting {
                @include bgImg(20px, 20px, "/imgs/icon-setting.png");
            }
            .icon-7day {
                @include bgImg(20px, 20px, "/imgs/icon-7day.png");
            }
            .icon-15day {
                @include bgImg(20px, 20px, "/imgs/icon-15day.png");
            }
            .icon-post {
                @include bgImg(20px, 20px, "/imgs/icon-post.png");
            }
        }
    }
}
</style>