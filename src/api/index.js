import request from './request.js';

// 1.获取手机列表
export function reqProducts() {
    return request({
        url: '/products',
        params: {
            category: 100012,
            pageSize: 10
        }
    })
}

// 2.登录
export function reqLogin(username, password) {
    return request({
        url: "/user/login",
        method: "POST",
        data: {
            username,
            password
        }
    })
}

// 3.用户注册
export function reqRegiset(username, password, email) {
    return request({
        url: "/user/register",
        method: "POST",
        data: {
            username,
            password,
            email
        }
    })
}

// 4.获取登录用户信息
export function getUser() {
    return request({
        url: "/user"
    })
}

// 5.退出登录
export function logout() {
    return request({
        url: '/user/logout',
        method: "POST"
    })
}

// 6.获取购物中所有商品数量总和
export function getCartCount() {
    return request({
        url: '/carts/products/sum'
    })
}

// 7.根据id获取产品详情
export function getProductInfo(id) {
    return request({
        url: "/products/" + id
    })
}

// 8.购物车添加商品
export function addCart(id) {
    return request({
        url: '/carts',
        method: "POST",
        data: {
            productId: id,
            selected: true
        }
    })
}

// 9.获取购物车List列表
export function getCartsList() {
    return request({
        url: '/carts'
    })
}

// 10.更新购物车某个产品数量
export function updateCart(id, quantity, selected) {
    return request({
        url: '/carts/' + id,
        method: 'PUT',
        data: {
            quantity,
            selected
        }
    })
}

// 11.全选、全不选
export function toggleAll(url) {
    return request({
        url: '/carts/' + url,
        method: "PUT"
    })
}

// 12.移除购物车某个产品
export function delProduct(id) {
    return request({
        url: '/carts/' + id,
        method: "DELETE"
    })
}

// 13.获取地址列表
export function getAddressList() {
    return request({
        url: "/shippings"
    })
}

// 14.添加新地址
export function addAddress(params) {
    return request({
        url: '/shippings',
        method: "POST",
        data: params
    })
}

// 15.删除地址
export function deleteAddress(id) {
    return request({
        url: '/shippings/' + id,
        method: "DELETE"
    })
}

// 16.编辑地址
export function editAddress(id, params) {
    return request({
        url: '/shippings/' + id,
        method: "PUT",
        data: params
    })
}

// 17.创建订单
export function createOrder(shippingId) {
    return request({
        url: "/orders",
        method: "POST",
        data: {
            shippingId
        }
    })
}

// 18.订单详情
export function getOrder(orderNo) {
    return request({
        url: "/orders/" + orderNo,
    })
}

// 19.支付
export function pay(params) {
    return request({
        url: '/pay',
        method: "POST",
        data: params
    })
}

// 20.订单列表
export function getOrderList(pageSize, pageNum) {
    return request({
        url: '/orders',
        params: {
            pageSize,
            pageNum
        }
    })
}