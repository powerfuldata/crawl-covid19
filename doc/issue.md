# 常见问题汇总

## 1.执行`Model.findAll()`报错
```
错误提示：UnhandledPromiseRejectionWarning: TypeError: Class constructor Model cannot be invoked without 'new'

解决办法：修改tsCofig.json配置，target改为es6
{
    compilerOptions: {
        "target": "es6"
    }
}
```

