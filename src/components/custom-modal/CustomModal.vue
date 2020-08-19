<template>
    <div class="modal" v-show="showModal">
        <div class="modal-dialog">
            <div class="modal-top clearfix">
                <span class="title fl">{{title}}</span>
                <span class="close fr" @click="onCancel"></span>
            </div>
            <div class="modal-content">
                <slot name="content"></slot>
            </div>
            <div class="modal-bottom">
                <span class="cancel" @click="onCancel">{{cancel}}</span>
                <span class="ok" @click="onOk">{{ok}}</span>
            </div>
        </div>
        <div class="mask"></div>
    </div>
</template>
<script>
export default {
    name: "custom-modal",
    props: {
        title: String,
        ok: String,
        cancel: String,
        showModal: Boolean,
    },
    methods: {
        onCancel() {
            this.$emit("cancel");
        },
        onOk() {
            this.$emit("ok");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~assets/css/mixin.scss";

.modal {
    width: 100%;
    height: 100%;
    .modal-dialog {
        position: fixed;
        width: 600px;
        z-index: 20;
        border-radius: 5px;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        .modal-top {
            font-size: 14px;
            padding: 10px;
            background-color: #f5f5f5;
            .close {
                display: inline-block;
                @include bgImg(12px, 12px, "/imgs/icon-close.png");
                cursor: pointer;
                transition: all 0.5s;
                &:hover {
                    transform: scale(1.5);
                }
            }
        }
        .modal-content {
            padding: 30px;
            background-color: #fff;
            .item {
                display: flex;
                margin-bottom: 10px;
                input {
                    flex: 1;
                    font-size: 12px;
                    padding: 5px;
                    border: 1px solid #ccc;
                    margin-right: 20px;
                }
            }
        }
        .modal-bottom {
            padding: 15px 30px;
            background-color: #f5f5f5;
            text-align: right;
            .cancel,
            .ok {
                display: inline-block;
                padding: 5px 20px;
                font-size: 14px;
                cursor: pointer;
            }
            .cancel {
                background-color: #ccc;
            }
            .ok {
                color: #fff;
                background-color: #ff6600;
                margin-left: 20px;
            }
        }
    }
    .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: 0.5;
        z-index: 15;
    }
}
</style>