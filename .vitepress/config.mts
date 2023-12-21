import { defineConfig } from 'vitepress'
import { generateSidebar } from './utils/genSidebar.mjs'

export default defineConfig({
  // 站点配置
  title: '莫记',
  description: '莫记 - 淡笑莫言的随记小站',
  head: [ [ 'link', { rel: 'icon', href: '/favicon.svg' } ] ],
  lang: 'zh-cn',
  srcDir: 'src',

  // 主题配置
  themeConfig: {
    logo: '/favicon.svg',

    // 搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '在莫记中搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除查询条件',
                noResultsText: '未找到相关结果',
                footer: {
                  navigateText: '切换',
                  selectText: '选择',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    // 导航栏
    nav: [
      { text: '主页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '笔记', link: '/note/' },
      { text: '杂谈', link: '/other/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/DanXiaoMoYan' }
    ],

    // 侧边栏
    sidebar: {
      '/blog/': generateSidebar('src/blog'),
      '/note/': generateSidebar('src/note'),
      '/other/': generateSidebar('src/other')
    },

    // 本地化
    outline: {
      label: '章节速览'
    },
    lastUpdated: {
      text: '最后编辑'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部'
  },

  vite: {
    server: {
      host: '0.0.0.0',
      port: 80
    }
  },

  transformHead({ assets }) {
    return assets
      .filter(asset => /\.woff2$/.test(asset))
      .map(fontFile => (
        [
          'link',
          {
            rel: 'preload',
            href: fontFile,
            as: 'font',
            type: 'font/woff2'
          }
        ]
      ))
  }
})
