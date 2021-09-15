const path = require('path')
const resolve = (dir) => {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    devServer: {
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/': {
                target: 'https://piaofang.maoyan.com',
                changeOrigin: true
            }
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve('src')
            }
        }
    }
}