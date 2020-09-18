# crawl-covid19
新冠肺炎每日数据爬取，数据来自于https://apify.com/covid-19。

使用技术：typescript + iui9jopl--0puppetteer + jQuery + nodejs

# 带解决的问题
- [ ] 1.使用装饰器处理Promise的异常错误，统一拦截异常，打印信息
- [ ] 2.增加redis中间接，每天执行完定时任务后，将数据添加到redis中，保证前端调用总是先经过redis
- [ ] 3.开发一个脚手架（node Cli），自动生成nodejs基础代码和目录结构