<template>
    <div class="order-list">
        <order-header :title="title">
            <span slot="tip">请谨慎钓鱼链接或诈骗电话，了解更多></span>
        </order-header>

        <div class="list-wrapper">
            <div class="container">
                <div class="list-box">
                    <div class="list-item" v-for="(order,index) in orderList" :key="index">
                        <div class="item-header">
                            <div class="header-left">
                                {{order.createTime}}
                                <span>|</span>
                                {{order.receiverName}}
                                <span>|</span>
                                订单号：{{order.orderNo}}
                                <span>|</span>
                                {{order.paymentTypeDesc}}
                            </div>
                            <div class="header-right">
                                应付金额：
                                <span>{{order.payment}}</span>元
                            </div>
                        </div>
                        <div class="item-content">
                            <div v-for="(item,i) in order.orderItemVoList" :key="i" class="item">
                                <div class="content-left">
                                    <div class="good-img">
                                        <img v-lazy="item.productImage" alt />
                                    </div>
                                    <div class="good-name">
                                        <div class="p-name">Redmi Note 8 4GB+64GB 皓月白 64GB</div>
                                        <div class="p-money">999元 X 2</div>
                                    </div>
                                </div>
                                <div class="content-right">
                                    <div class="good-stats" @click="goPay(order.orderNo)">
                                        <a href="javascript:;">{{order.statusDesc}}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import OrderHeader from "components/order-header/OrderHeader";

import { getOrderList } from "api";
export default {
    name: "order-list",
    data() {
        return {
            title: "列单列表",
            orderList: [], // 订单列表
            pageSize: 10,
            pageNum: 1,
        };
    },
    components: {
        OrderHeader,
    },
    methods: {
        // 获取订单列表
        async _getOrderList() {
            const { pageSize, pageNum } = this;
            const res = await getOrderList(pageSize, pageNum);
            console.log(res);
            this.orderList = this.orderList.concat(res.list);
        },
        goPay(orderNo) {
            this.$router.push({
                path: "/order/pay",
                query: {
                    orderNo,
                },
            });
        },
    },
    mounted() {
        this._getOrderList();
    },
};
</script>

<style lang="scss" scoped>
.list-wrapper {
    background-color: #f5f5f5;
    .list-box {
        padding-top: 33px;
        padding-bottom: 110px;

        .list-item {
            margin-bottom: 30px;
            .item-header {
                display: flex;
                justify-content: space-between;
                background-color: #fffaf7;
                padding: 30px 44px;
                .header-left {
                    color: #656565;
                }
                .header-right {
                    span {
                        font-size: 16px;
                    }
                }
            }
            .item-content {
                background-color: #fff;
                padding: 24px 44px;
                .item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .content-left {
                        display: flex;
                        align-items: center;
                        .good-img {
                            width: 112px;
                            img {
                                width: 100%;
                            }
                        }
                        .good-name {
                            font-size: 20px;
                        }
                    }
                    .content-right {
                        .good-stats {
                            a {
                                font-size: 20px;
                                color: #ff6500;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>