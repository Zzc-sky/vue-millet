<template>
    <div class="footer">
        <div class="footer-logo">
            <img src="/imgs/logo-footer.png" alt />
            <p>小米商城</p>
        </div>
        <div class="footer-link">
            <a href="javascript:;">Vue</a>
            <span class="line"></span>
            <a href="javascript:;">React</a>
            <span class="line"></span>
            <a href="javascript:;">微信小程序</a>
            <span class="line"></span>
            <a href="javascript:;">Flutter</a>
        </div>
        <div class="copyright">
            Copyright ©2019
            <span class="domain">mi.futurefe.com</span> All Rights Reserved.
        </div>
    </div>
</template>
<script>
export default {
    name: "NavFooter",
};
</script>

<style lang="scss" scoped>
.footer {
    height: 234px;
    background-color: #333333;
    font-size: 16px;
    color: #999999;
    text-align: center;
    border-top: 4px solid #ff6600;
    .footer-logo {
        margin-top: 46px;
        img {
            width: 53px;
            height: 36px;
        }
        p {
            margin-top: 13px;
        }
    }
    .footer-link {
        display: flex;
        align-items: center;
        justify-content: center;
        .line {
            display: inline-block;
            width: 1px;
            height: 20px;
            background-color: #999999;
            margin: 0 10px;
        }
        a {
            color: #999999;
            &:hover {
                color: #ff6600;
            }
        }
    }
    .copyright {
        margin-top: 10px;
        .domain {
            color: #ff6600;
        }
    }
}
</style>
