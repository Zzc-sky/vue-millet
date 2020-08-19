export default {
    saveUserName(context, username) {
        context.commit('saveUserName', username)
    },

    saveCartCount(context, cartCount) {
        context.commit('saveCartCount', cartCount)
    },

    saveOffsetTop(context, top) {
        context.commit('saveOffsetTop', top)
    }
}