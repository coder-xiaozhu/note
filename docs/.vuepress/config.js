const dsalg = require('../dsalg')

module.exports = {
    title: '数据结构与算法',
    base: '/note/',
    // base: '.',  
    dest: 'build/.vuepress/dist',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        sidebar: 'auto',
        logo: '/hero.jpg',
        lastUpdated: 'Last Updated',
        editLinkText: '帮助我们改善此页面！',   
        // smoothScroll: true,
        sidebar: {
            '/dsalg/': dsalg()
        }
    },
    head: [
        ['link', { rel: 'icon', href: '/hero.jpg' }],
    ],
    plugins: [
        ['@vuepress/last-updated', {
            transformer: (timestamp, lang) => {
                const moment = require('moment')
                return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
            }
        }],
        ['vuepress-plugin-baidu-autopush', true],
        ['vuepress-plugin-tags'],
        ['@vuepress/medium-zoom', {
            selector: '.theme-default-content img'
        }],
    ]
}   