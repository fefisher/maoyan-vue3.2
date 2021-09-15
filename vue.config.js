const path = require('path')
const resolve = (dir) => {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    assertsDir: 'static',
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