module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'api': '@/api',
            }
        }
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: "http://mall-pre.springboot.cn",
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
}