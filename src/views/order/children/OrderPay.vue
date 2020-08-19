<template>
    <div class="order-pay">
        <order-header title="订单支付">
            <span slot="tip">请谨防钓鱼链接或诈骗电话，了解更多</span>
        </order-header>

        <div class="pay-content">
            <div class="container">
                <div class="order-wrapper">
                    <div class="order-item">
                        <div class="icon-succ"></div>
                        <div class="order-info">
                            <h2>订单提交成功！去付款咯～</h2>
                            <p>
                                请在
                                <span>30分</span>内完成支付, 超时后将取消订单
                            </p>
                            <p>收货信息：{{addressInfo}}</p>
                        </div>
                        <div class="order-total">
                            <div>
                                应付总额：
                                <span>{{payment}}</span>元
                            </div>
                            <div>
                                订单详情
                                <i
                                    class="icon-down"
                                    @click="showDetail=!showDetail"
                                    :class="{'up':showDetail}"
                                ></i>
                            </div>
                        </div>
                    </div>

                    <div class="item-detail" v-if="showDetail">
                        <div class="item">
                            <div class="detail-title">订单号：</div>
                            <div class="theme-color">{{orderId}}</div>
                        </div>
                        <div class="item">
                            <div class="detail-title">收货信息：</div>
                            <div>{{addressInfo}}</div>
                        </div>
                        <div class="item">
                            <div class="detail-title">商品名称：</div>
                            <div>
                                <ul>
                                    <li v-for="(item,index) in orderDetail" :key="index">
                                        <img v-lazy="item.productImage" />
                                        {{item.productName}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="item">
                            <div class="detail-title">发票信息:</div>
                            <div>电子发票 个人</div>
                        </div>
                    </div>
                </div>

                <div class="item-pay">
                    <h2>选择以下支付方式付款</h2>
                    <div class="pay-way">
                        <p>支付平台</p>
                        <div
                            class="pay pay-ali"
                            :class="{'checked':payType==1}"
                            @click="paySubmit(1)"
                        ></div>
                        <div
                            class="pay pay-wechat"
                            :class="{'checked':payType==2}"
                            @click="paySubmit(2)"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
        <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>
        <custom-modal
            :showModal="showPayModal"
            title="支付确认"
            ok="查看订单"
            cancel="未支付"
            @cancel="showPayModal=false"
            @ok="goOrderList"
        >
            <p slot="content">您确认是否完成支付？</p>
        </custom-modal>
    </div>
</template>
<script>
import QRCode from "qrcode";

import OrderHeader from "components/order-header/OrderHeader";
import CustomModal from "components/custom-modal/CustomModal";
import ScanPayCode from "./ScanPayCode";

import { getOrder, pay } from "api";
export default {
    name: "order-pay",
    data() {
        return {
            orderId: this.$route.query.orderNo, // 订单ID
            addressInfo: "", // 收货人地址信息
            payment: 0, // 订单总金额
            orderDetail: [], //订单详情，包含商品列表
            showDetail: false, //是否显示订单详情
            payType: "", //支付类型
            payImg: "", //微信支付的二维码地址
            showPay: false, //是否显示微信支付弹框
            showPayModal: false, //是否显示二次支付确认弹框
        };
    },
    components: {
        OrderHeader,
        ScanPayCode,
        CustomModal,
    },
    methods: {
        // 获取订单详情
        async _getOrder() {
            const res = await getOrder(this.orderId);
            let item = res.shippingVo;
            this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverAddress}`;
            this.payment = res.payment;
            this.orderDetail = res.orderItemVoList;
        },
        async paySubmit(payType) {
            if (payType == 1) {
                window.open(
                    "/#/order/alipay?orderId=" + this.orderId,
                    "_blank"
                );
            } else {
                const res = await pay({
                    orderId: this.orderId,
                    orderName: "Vue高仿小米商城",
                    amount: 0.01, //单位元
                    payType: 2, //1支付宝，2微信
                });
                try {
                    const url = await QRCode.toDataURL(res.content);
                    this.showPay = true;
                    this.payImg = url;
                } catch (error) {
                    this.$message.error("微信二维码生成失败，请稍后重试");
                }
            }
        },
        // 关闭微信弹框
        closePayModal() {
            this.showPay = false;
            this.showPayModal = true;
        },
        // 前往订单列表
        goOrderList() {
            this.$router.push("/order/list");
        },
    },
    mounted() {
        this._getOrder();
    },
};
</script>

<style lang="scss" scoped>
.order-pay {
    .pay-content {
        padding-top: 30px;
        padding-bottom: 130px;
        background-color: #f5f5f5;
        .order-wrapper {
            padding: 60px 50px;
            background-color: #fff;
            margin-bottom: 30px;
            .order-item {
                display: flex;
                align-items: center;
                margin-bottom: 45px;
                .icon-succ {
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    background: url("/imgs/icon-gou.png") #80c58a no-repeat
                        center;
                    background-size: 45px;
                    margin-right: 40px;
                }
                .order-info {
                    margin-right: 328px;
                    h2 {
                        font-size: 24px;
                        color: #333333;
                        margin-bottom: 20px;
                    }
                    p {
                        color: #666666;
                        font-size: 14px;
                        span {
                            color: #ff6700;
                        }
                    }
                }
                .order-total {
                    text-align: right;
                    & > div:first-child {
                        margin-bottom: 20px;
                    }
                    span {
                        font-size: 28px;
                        color: #ff6700;
                    }
                    .icon-down {
                        display: inline-block;
                        width: 14px;
                        height: 10px;
                        background: url("/imgs/icon-down.png") no-repeat center;
                        background-size: cover;
                        margin-left: 9px;
                        transition: all 0.5s;
                        cursor: pointer;
                        &.up {
                            transform: rotate(180deg);
                        }
                    }
                }
            }
            .item-detail {
                font-size: 14px;
                border-top: 1px solid #d7d7d7;
                padding-top: 47px;
                padding-left: 130px;
                .item {
                    display: flex;
                    margin-bottom: 19px;
                    .detail-title {
                        width: 100px;
                    }
                    img {
                        width: 30px;
                        vertical-align: middle;
                    }
                    .theme-color {
                        color: #ff6700;
                    }
                }
            }
        }
        .item-pay {
            padding: 26px 50px 72px;
            background-color: #fff;
            h2 {
                font-size: 20px;
                color: #333333;
                padding-bottom: 24px;
                font-weight: 700;
                border-bottom: 1px solid #d7d7d7;
            }
            .pay-way {
                p {
                    font-weight: 700;
                    font-size: 18px;
                    padding: 25px 0;
                }
                .pay {
                    display: inline-block;
                    width: 188px;
                    height: 64px;
                    border: 1px solid #d7d7d7;
                    cursor: pointer;
                    &:last-child {
                        margin-left: 20px;
                    }
                    &.checked {
                        border: 1px solid #ff6700;
                    }
                }
                .pay-ali {
                    background: url("/imgs/pay/icon-ali.png") no-repeat center;
                    background-size: 103px 38px;
                    margin-top: 19px;
                }
                .pay-wechat {
                    background: url("/imgs/pay/icon-wechat.png") no-repeat
                        center;
                    background-size: 103px 38px;
                }
            }
        }
    }
}
</style>