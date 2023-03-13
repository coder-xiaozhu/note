const dsalg = require('../dsalg')
const path = require('path')

module.exports = {
    title: '数据结构与算法',
    base: '/note/',
    dest: 'build/.vuepress/dist',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        sidebar: 'auto',
        logo: '/hero.jpg',
        lastUpdated: 'Last Updated',
        editLinkText: '帮助我们改善此页面！',
        sidebar: {
            '/dsalg/': dsalg()
        }
    },
    configureWebpack:() => {
        const NODE_ENV = process.env.NODE_ENV
        //判断是否是生产环境
        if(NODE_ENV === 'production'){
          return {
            output: {
              publicPath: 'https://cdn.jsdelivr.net/gh/coder-xiaozhu/note@gh-pages/'
            },
            resolve: {
              //配置路径别名
              alias: {
                'public': path.resolve(__dirname, './') 
              }
            }
          }
        }else{
          return {
            resolve: {
              //配置路径别名
              alias: {
                'public': path.resolve(__dirname, './') 
              }
            }
          }
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