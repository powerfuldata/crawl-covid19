# sql常用框架对比
nodejs常用的数据库框架主要分为3大类
- 第一类：底层数据库驱动框架，例如`mysql.js`,pg.js.这一类框架只是简单的将sql语句提交给数据库，然后获取执行结果。使用起来不方便
- 第二类：中层数据库。例如`knex`,这些框架集成了各种数据库驱动，并且允许你执行一些动态的查询语句
- 第三类：高级的ORM框架。例如：`sequelize`,`bookshelf`,`waterline`,`objection`。这类数据库完全支持动态sql查询，并且隐藏了原始的sql语句。


大部分人喜爱第三类框架，因为这类框架可以跨平台支持不同的数据库类型，你可以不用考虑mysql与oracel的语法区别，但是ORM框架的学习成本比较高，庞大的内容和复杂的API让人望而却步。

- [参考文献-为什么要表面使用ORM框架(以nodejs为例)](https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/)