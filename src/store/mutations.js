export default {
    // 1.保存用户名
    saveUserName(state, username) {
        state.username = username
    },
    // 2.保存购物车数量
    saveCartCount(state, cartCount) {
        state.cartCount = cartCount
    },
    // 3.保存product-nav距离顶部的位置
    saveOffsetTop(state, top) {
        state.offsetTop = top
    }
}