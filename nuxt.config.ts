// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ['@nuxt/content'],
    content: {
        documentDriven: true,
    },
    plugins: [{ src: '~/plugins/marked.js', mode: 'client' }],
    app: {
        // 配置应用的head标签
        head: {
            title: '仿掘金',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content:
                        'width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover',
                },
                { name: 'referrer', content: 'never' },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '掘金,稀土,Vue.js,微信小程序,Kotlin,RxJava,React Native,Wireshark,敏捷开发,Bootstrap,OKHttp,正则表达式,WebGL,Webpack,Docker,MVVM',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        '掘金是面向全球中文开发者的技术内容分享与交流平台。我们通过技术文章、沸点、课程、直播等产品和服务，打造一个激发开发者创作灵感，激励开发者沉淀分享，陪伴开发者成长的综合类技术社区。',
                },
            ],
        },
    },
    // 全局css
    css: ['~/assets/css/reset.css', '~/assets/scss/markdown.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@import "assets/scss/mixin.scss";@import "assets/scss/variable.scss";',
                },
            },
        },
    },
});
