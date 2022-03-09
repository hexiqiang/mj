module.exports = {
    //其余配置...
    // publicPath: '/',
    devServer: {
        port: 8080,
        open: false, //项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
        //是否跨域
        proxy: {
            "/api/": {
                //真实转换成的后台请求地址，别忘了加http(https)
                target: "http://yii.cc",
                changeOrigin: true,
                ws:true,
                pathRewrite: {//重定向
                    "^/api": "/api",//和上面一样，将请求地址中前面的替换为后面的内容
                }
            }
        }
    }
};