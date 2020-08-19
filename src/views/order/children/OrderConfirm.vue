<template>
    <div class="order-confirm">
        <order-header :title="title">
            <span slot="tip">请认真填写收货地址！</span>
        </order-header>

        <div class="confirm-wrapper">
            <div class="container">
                <div class="contant-box">
                    <div class="item-address">
                        <h2 class="addr-title">收货地址</h2>
                        <div class="addr-list clearfix">
                            <div
                                class="addr-item"
                                v-for="(item,index) in list"
                                :key="index"
                                :class="{'checked':index == checkIndex}"
                                @click="checkIndex=index"
                            >
                                <h2>{{item.receiverName}}</h2>
                                <div class="phone">{{item.receiverMobile}}</div>
                                <div
                                    class="street"
                                >{{item.receiverProvince + ' ' + item.receiverCity + ' ' + item.receiverDistrict + ' ' + item.receiverAddress}}</div>
                                <div class="action">
                                    <a
                                        href="javascript:;"
                                        class="iconfont icon-lajixiang fl"
                                        @click="_delAddress(item)"
                                    ></a>
                                    <a
                                        href="javascript:;"
                                        class="iconfont icon-bianji fr"
                                        @click="_editAddress(item)"
                                    ></a>
                                </div>
                            </div>
                            <div class="addr-add" @click="addShippings">
                                <div class="icon-add"></div>
                                <div>添加新地址</div>
                            </div>
                        </div>
                    </div>
                    <div class="item-goods">
                        <h2>商品</h2>
                        <ul>
                            <li v-for="(item,index) in cartList" :key="index">
                                <div class="good-name">
                                    <img :src="item.productMainImage" alt />
                                    <span>{{item.productName + ' ' + item.productSubtitle}}</span>
                                </div>
                                <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                                <div class="good-total">{{item.productTotalPrice}}元</div>
                            </li>
                        </ul>
                    </div>
                    <div class="item-shipping">
                        <h2>配送方式</h2>
                        <span>包邮</span>
                    </div>
                    <div class="item-invoice">
                        <h2>发票</h2>
                        <span>电子发票</span>
                        <span>个人</span>
                    </div>
                    <div class="detail">
                        <div class="item">
                            <span class="item-name">商品件数：</span>
                            <span class="item-val">{{count}}件</span>
                        </div>
                        <div class="item">
                            <span class="item-name">商品总价：</span>
                            <span class="item-val">{{cartTotalPrice}}</span>
                        </div>
                        <div class="item">
                            <span class="item-name">优惠活动：</span>
                            <span class="item-val">0元</span>
                        </div>
                        <div class="item">
                            <span class="item-name">运费：</span>
                            <span class="item-val">0元</span>
                        </div>
                        <div class="item-total">
                            <span class="item-name">应付总额：</span>
                            <span class="item-val">{{cartTotalPrice}}元</span>
                        </div>
                    </div>
                    <div class="btn">
                        <a href="/#/cart" class="left-btn">返回购物车</a>
                        <a href="javascript:;" class="right-btn" @click="orderSubmit">去结算</a>
                    </div>
                </div>
            </div>
        </div>

        <custom-modal
            title="添加收货地址"
            ok="添加"
            cancel="取消"
            :showModal="showAddModal"
            @cancel="cancel"
            @ok="submitAddress"
        >
            <div slot="content">
                <div class="item">
                    <input type="text" placeholder="姓名" v-model="checkedItem.receiverName" />
                    <input
                        type="text"
                        placeholder="手机号"
                        maxlength="11"
                        v-model="checkedItem.receiverMobile"
                    />
                </div>
                <div class="item">
                    <input type="text" placeholder="省/市" v-model="checkedItem.receiverProvince" />
                    <input type="text" placeholder="区" v-model="checkedItem.receiverCity" />
                    <input type="text" placeholder="街道" v-model="checkedItem.receiverDistrict" />
                </div>
                <div class="item">
                    <input type="text" placeholder="详细地址" v-model="checkedItem.receiverAddress" />
                </div>
                <div class="item">
                    <input
                        type="text"
                        placeholder="邮政编码"
                        class="mail"
                        maxlength="6"
                        v-model="checkedItem.receiverZip"
                    />
                </div>
            </div>
        </custom-modal>
    </div>
</template>
<script>
import OrderHeader from "components/order-header/OrderHeader";
import CustomModal from "components/custom-modal/CustomModal";

import {
    getCartsList,
    getAddressList,
    addAddress,
    deleteAddress,
    editAddress,
    createOrder,
} from "api";

export default {
    name: "order-confirm",
    data() {
        return {
            title: "订单确认",
            cartList: [], // 购物车列表
            cartTotalPrice: 0, // 商品总金额
            count: 0, // 商品总数量
            list: [], // 收货地址列表
            showAddModal: false, // 是否显示新增编辑弹框
            checkedItem: {}, // 被选中的地址对象
            userAction: "", // 用户行为 0:添加 1:编辑
            checkIndex: 0, //当前收货地址选中索引
        };
    },
    components: {
        OrderHeader,
        CustomModal,
    },
    methods: {
        // 获取购物车列表
        async _getCartsList() {
            const res = await getCartsList();
            this.cartList = res.cartProductVoList;
            this.cartTotalPrice = res.cartTotalPrice;
            res.cartProductVoList.map((item) => {
                this.count += item.quantity;
            });
        },
        // 获取地址列表
        async _getAddressList() {
            const res = await getAddressList();
            this.list = res.list;
        },
        // 添加地址模态框显示
        addShippings() {
            this.showAddModal = true;
            this.userAction = 0;
            this.checkedItem = {};
        },
        // 删除选中地址
        _delAddress(item) {
            deleteAddress(item.id);
            this._getAddressList();
            this.$message.success("删除地址成功");
        },
        // 编辑地址
        _editAddress(item) {
            this.showAddModal = true;
            this.userAction = 1;
            this.checkedItem = item;
        },
        submitAddress() {
            let { userAction, checkedItem } = this;
            let params = {};
            if (userAction == 0 || userAction == 1) {
                let {
                    receiverName,
                    receiverMobile,
                    receiverProvince,
                    receiverCity,
                    receiverDistrict,
                    receiverAddress,
                    receiverZip,
                } = checkedItem;
                let errMsg = "";
                if (!receiverName) {
                    errMsg = "请输入收货人名称";
                } else if (!receiverMobile || !/\d{11}/.test(receiverMobile)) {
                    errMsg = "请输入正确格式的手机号";
                } else if (!receiverProvince) {
                    errMsg = "请选择省份";
                } else if (!receiverCity) {
                    errMsg = "请选择对应的城市";
                } else if (!receiverAddress || !receiverDistrict) {
                    errMsg = "请输入收货地址";
                } else if (!/\d{6}/.test(receiverZip)) {
                    errMsg = "请输入六位邮编";
                }
                if (errMsg) {
                    this.$message.error(errMsg);
                    return;
                }
                params = {
                    receiverName,
                    receiverMobile,
                    receiverProvince,
                    receiverCity,
                    receiverDistrict,
                    receiverAddress,
                    receiverZip,
                };
            }
            if (userAction == 0) {
                addAddress(params).then(() => {
                    this.cancel();
                    this._getAddressList();
                    this.$message.success("添加地址成功");
                });
            } else {
                editAddress(checkedItem.id, params).then(() => {
                    this.cancel();
                    this._getAddressList();
                    this.$message.success("更新地址成功");
                });
            }
        },
        // 去结算
        orderSubmit() {
            let item = this.list[this.checkIndex];
            if (!item) {
                return this.$message.error("请选择一个收货地址");
            }
            createOrder(item.id).then((res) => {
                this.$router.push({
                    path: "/order/pay",
                    query: {
                        orderNo: res.orderNo,
                    },
                });
            });
        },
        // 关闭模态框，隐藏并且清空内容
        cancel() {
            this.showAddModal = false;
            this.userAction = "";
            this.checkedItem = {};
        },
    },
    mounted() {
        this._getCartsList();
        this._getAddressList();
    },
};
</script>

<style lang="scss" scoped>
.confirm-wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 200px;
    .contant-box {
        padding: 38px 0 90px 63px;
        background-color: #fff;
        .item-address {
            .addr-title {
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 21px;
            }
            .addr-list {
                .addr-item {
                    float: left;
                    width: 271px;
                    height: 180px;
                    border: 1px solid #e5e5e5;
                    margin-right: 10px;
                    padding: 20px;
                    &.checked {
                        border: 1px solid #ff6700;
                    }
                    cursor: pointer;
                    h2 {
                        font-size: 18px;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    .street {
                        height: 50px;
                    }
                    .action {
                        .icon-lajixiang,
                        .icon-bianji {
                            font-size: 25px;
                            color: #666666;
                            display: inline-block;
                            &:hover {
                                color: #ff6700;
                            }
                        }
                    }
                }
                .addr-add {
                    float: left;
                    width: 271px;
                    height: 180px;
                    border: 1px solid #e5e5e5;
                    text-align: center;
                    color: #999999;
                    cursor: pointer;
                    &:hover {
                        color: #ff6700;
                        border: 1px solid #ff6700;
                        .icon-add {
                            background-color: #ff6700;
                        }
                    }
                    .icon-add {
                        width: 30px;
                        height: 30px;
                        background: url("/imgs/icon-add.png") #e0e0e0 no-repeat
                            center;
                        background-size: 14px;
                        border-radius: 50%;
                        margin: 0 auto;
                        margin-top: 45px;
                        margin-bottom: 10px;
                    }
                }
            }
        }
        .item-goods {
            margin-top: 34px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e5e5e5;
            h2 {
                font-weight: 700;
                padding-bottom: 5px;
                border-bottom: 1px solid #e5e5e5;
            }
            li {
                display: flex;
                margin-top: 10px;
                height: 40px;
                line-height: 40px;
                .good-name {
                    flex: 5;
                    img {
                        width: 30px;
                        height: 30px;
                    }
                }
                .good-price {
                    flex: 2;
                }
                .good-total {
                    padding-right: 44px;
                    color: #ff6600;
                }
            }
        }
        .item-shipping,
        .item-invoice {
            margin-top: 31px;
            h2 {
                width: 80px;
                display: inline-block;
                font-weight: 700;
                margin-right: 70px;
            }
            span {
                font-size: 16px;
                color: #ff6700;
                margin-right: 23px;
            }
        }
        .detail {
            font-size: 16px;
            text-align: right;
            padding: 50px 67px 33px 0;
            border-bottom: 1px solid #f5f5f5;
            color: #666666;
            .item {
                margin-bottom: 12px;
                .item-val {
                    color: #ff6700;
                }
            }
            .item-total {
                .item-val {
                    font-size: 28px;
                    color: #ff6700;
                }
            }
            .item-val {
                display: inline-block;
                width: 110px;
            }
        }
        .btn {
            margin-top: 37px;
            text-align: right;
            a {
                display: inline-block;
                width: 200px;
                height: 50px;
                line-height: 50px;
                font-size: 18px;
                text-align: center;
            }
            .left-btn {
                color: #9a9a9a;
                border: 1px solid #d8d8d8;
            }
            .right-btn {
                color: #fff;
                border: 1px solid #ff6600;
                background-color: #ff6600;
                margin-left: 30px;
            }
        }
    }
}
</style>