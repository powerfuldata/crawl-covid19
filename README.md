# crawl-covid19
新冠肺炎每日数据爬取，数据来自于https://apify.com/covid-19。

使用技术：typescript + iui9jopl--0puppetteer + jQuery + nodejs

# 运行
`yarn run start`

# 待解决的问题
- [ ] 1.使用装饰器处理Promise的异常错误，统一拦截异常，打印信息
- [ ] 2.增加redis中间接，每天执行完定时任务后，将数据添加到redis中，保证前端调用总是先经过redis
- [ ] 3.开发一个脚手架（node Cli），自动生成nodejs基础代码和目录结构
- [x] 4.把snowFlake改为class类

# 待处理任务
- [ ] 1.apify网站上的国家英文名称与`covid19_countries`表不一致。做一个定时更新该表的定时任务。
    - 1.每天早晨6：00爬取疫情网站，获取国家英文名称列表
    - 2.对照更新到`covid19_countries`中
- [ ] 2.每日3次爬取疫情网站，更新当天数据
    - 爬取时间为每日6/14/22点

# 更多
- 1.[开发中出现的问题汇总](./doc/issue.md)
- 2.[nodejs中常见数据库框架对比](./doc/learn.md)

# 面试知识整理
- [ ] 1.实现一个单例模式，在全局中生成唯一的实例

