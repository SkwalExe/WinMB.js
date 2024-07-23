import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'WinMB.js',
    description:
        'Non-serious library allowing you to effortlessly bring windows dialogue boxes to your webpages!',
    srcDir: 'src',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Getting Started', link: '/getting-started' }
        ],
        outline: 'deep',
        footer: {
            message: 'Released under the GNU General Public License (GPLv3).',
            copyright: 'Copyright © 2021-present Léopold Koprivnik'
        },
        search: {
            provider: 'local'
        },
        editLink: {
            pattern: 'https://github.com/skwalexe/WinMB.js/edit/main/docs/src/:path'
        },
        sidebar: [
            {
                text: 'Introduction',
                items: [{ text: '📥 Getting Started', link: '/getting-started' }]
            }
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/skwalexe/WinMB.js' }]
    },
    head: [
        [
            'script',
            {
                src: 'https://cdn.jsdelivr.net/npm/@skwalexe/winmb@0.1.4/dist/winmb.umd.js'
            }
        ]
    ]
})
