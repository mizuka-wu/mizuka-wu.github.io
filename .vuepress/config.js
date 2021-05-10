module.exports = {
    title: '水华的博客', // Title for the site. This will be displayed in the navbar.
    theme: '@vuepress/theme-blog',
    themeConfig: {
        sitemap: {
            hostname: 'https://www.mizuka.top',
        },
        smoothScroll: true,
        comment: {
            service: "disqus",
            shortname: "水华的博客",
        },
        dateFormat: 'YYYY-MM-DD',
        globalPagination: {
            prevText:'上一页', // Text for previous links.
            nextText:'下一页', // Text for next links.
            lengthPerPage:'20', // Maximum number of posts per page.
            layout:'Pagination', // Layout for pagination page
          },
        footer: {
            copyright: [
                {
                    text: '感谢您的访问'
                }
            ],
            concat: [
                {
                    type: 'github',
                    link: 'https://github.com/mizuka-wu'
                }
            ]
        }
    }
  }