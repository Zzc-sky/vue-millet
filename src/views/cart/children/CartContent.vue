<template>
    <div class="cart-content">
        <div class="container">
            <div class="cart-box">
                <ul class="box-head">
                    <li class="col-1">
                        <span class="checkbox" :class="{'checked':allChecked}" @click="_toggleAll"></span>全选
                    </li>
                    <li class="col-3">商品名称</li>
                    <li class="col-1">单价</li>
                    <li class="col-2">数量</li>
                    <li class="col-1">小计</li>
                    <li class="col-1">操作</li>
                </ul>

                <ul class="box-list">
                    <li class="list-item" v-for="(item,index) in list" :key="index">
                        <div class="item-check">
                            <span
                                class="checkbox"
                                :class="{'checked':item.productSelected}"
                                @click="_updateCart(item)"
                            ></span>
                        </div>
                        <div class="item-name">
                            <img v-lazy="item.productMainImage" />
                            <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
                        </div>
                        <div class="item-price">{{item.productPrice}}元</div>
                        <div class="item-num">
                            <div class="num-box">
                                <a href="javascript:;" @click="_updateCart(item,'decre')">-</a>
                                <span>{{item.quantity}}</span>
                                <a href="javascript:;" @click="_updateCart(item,'incre')">+</a>
                            </div>
                        </div>
                        <div class="item-total">{{item.productTotalPrice}}元</div>
                        <div class="item-del" @click="_delProduct(item)"></div>
                    </li>
                </ul>
            </div>

            <div class="other">
                <div class="left">
                    <a href="/#/home">继续购物</a>
                    共
                    <span>{{list.length}}</span>件商品，
                    已选择
                    <span>{{checkedNum}}</span>件
                </div>
                <div class="right">
                    合计：
                    <span>{{cartTotalPrice}}</span>元
                    <a href="javascript:;" @click="order">去结算</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getCartsList, updateCart, toggleAll, delProduct } from "api";

export default {
    name: "cart-content",
    data() {
        return {
            list: [], //商品列表
            cartTotalPrice: 0, //商品总金额
            allChecked: false, //是否全选
            checkedNum: 0, //选中商品数量
        };
    },
    methods: {
        // 获取购物车列表
        async _getCartsList() {
            const res = await getCartsList();
            this._renderData(res);
        },
        // 控制全选功能
        async _toggleAll() {
            let url = this.allChecked ? "unSelectAll" : "selectAll";
            const res = await toggleAll(url);
            this._renderData(res);
        },
        // 更新购物车数量和购物车单选状态
        async _updateCart(item, type) {
            let quantity = item.quantity,
                selected = item.productSelected,
                productId = item.productId;
            if (type == "incre") {
                if (quantity > item.productStock) {
                    return this.$message.warning("购买数量不能超过库存数量");
                }
                ++quantity;
            } else if (type == "decre") {
                if (quantity == 1) {
                    return this.$message.error("商品至少保留一件");
                }
                --quantity;
            } else {
                selected = !item.productSelected;
            }
            const res = await updateCart(productId, quantity, selected);
            this._renderData(res);
        },
        // 删除购物车商品
        _delProduct(item) {
            this.$confirm({
                title: "提示信息",
                content: "是否要删除该商品?",
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk: async () => {
                    const res = await delProduct(item.productId);
                    this.$message.success("删除成功");
                    this._renderData(res);
                },
            });
        },
        order() {
            let isCheck = this.list.every((item) => {
                return !item.productSelected;
            });
            if (isCheck) {
                this.$message.destroy();
                this.$message.error("请选择一件商品");
            } else {
                this.$router.push("/order/confirm");
            }
        },
        // 公共赋值
        _renderData(res) {
            this.list = res.cartProductVoList || [];
            this.allChecked = res.selectedAll;
            this.cartTotalPrice = res.cartTotalPrice;
            this.checkedNum = this.list.filter((item) => {
                return item.productSelected;
            }).length;
        },
    },
    mounted() {
        this._getCartsList();
    },
};
</script>

<style lang="scss" >
.cart-content {
    padding-top: 32px;
    padding-bottom: 114px;
    background-color: #f5f5f5;
    .cart-box {
        font-size: 14px;
        background-color: #fff;
        color: #999999;
        text-align: center;
        .box-head {
            display: flex;
            align-items: center;
            height: 79px;

            .col-1 {
                flex: 1;
            }
            .col-2 {
                flex: 2;
            }
            .col-3 {
                flex: 3;
            }
        }
        .box-list {
            .list-item {
                display: flex;
                font-size: 16px;
                align-items: center;
                height: 125px;
                border-top: 1px solid #e5e5e5;
                .item-check {
                    flex: 1;
                }
                .item-name {
                    flex: 3;
                    font-size: 18px;
                    color: #333333;
                    display: flex;
                    align-items: center;
                    img {
                        width: 80px;
                        height: 80px;
                        vertical-align: middle;
                    }
                    span {
                        margin-left: 30px;
                    }
                }
                .item-price {
                    flex: 1;
                    color: #343434;
                }
                .item-num {
                    flex: 2;
                    .num-box {
                        display: inline-flex;
                        width: 150px;
                        height: 40px;
                        line-height: 40px;
                        border: 1px solid #e5e5e5;
                        font-size: 14px;
                        a {
                            display: inline-block;
                            width: 50px;
                            color: #333333;
                        }
                        span {
                            display: inline-block;
                            width: 50px;
                            color: #333333;
                        }
                    }
                }
                .item-total {
                    flex: 1;
                    color: #ff6600;
                }
                .item-del {
                    flex: 1;
                    width: 14px;
                    height: 12px;
                    background: url("/imgs/icon-close.png") no-repeat center;
                    background-size: contain;
                    cursor: pointer;
                }
            }
        }
        .checkbox {
            display: inline-block;
            width: 22px;
            height: 22px;
            border: 1px solid #e5e5e5;
            vertical-align: middle;
            margin-right: 17px;
            cursor: pointer;
            &.checked {
                background: url("/imgs/icon-gou.png") #ff6600 no-repeat center;
                background-size: 16px 12px;
                border: none;
            }
        }
    }
    .other {
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        margin-top: 20px;
        .left {
            a {
                color: #666666;
                margin-right: 37px;
                &:hover {
                    color: #ff6600;
                }
            }
            & span {
                color: #ff6600;
                margin: 0 5px;
            }
        }
        .right {
            font-size: 14px;
            color: #ff6600;
            span {
                font-size: 24px;
            }
            a {
                display: inline-block;
                width: 202px;
                height: 50px;
                line-height: 50px;
                font-size: 18px;
                margin-left: 37px;
                text-align: center;
                color: #fff;
                background-color: #ff6600;
            }
        }
    }
}
</style>


增量
   async _increment(item) {
       let { quantity, productStock, selected } = item;
       if (quantity > productStock) {
           return this.$message.warning("购买数量不能超过库存数量");
       }
       ++quantity;
       const res = await updateCart(item.productId, quantity, selected);
       this._renderData(res);
   },
减量
   async _decrement(item) {
       let { quantity, selected } = item;
       if (quantity == 1) {
           return this.$message.error("商品至少保留一件");
       }
       --quantity;
       const res = await updateCart(item.productId, quantity, selected);
       this._renderData(res);
   },
控制item选中切换
   async _toggleItem(item) {
       const { productId, productSelected, quantity } = item;
       let selected = !productSelected;
       const res = await updateCart(productId, quantity, selected);
       this._renderData(res);
   }