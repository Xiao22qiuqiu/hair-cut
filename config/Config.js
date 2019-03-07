import Util from 'util';

//存放一些公共数据

let config = {
    //auth名，登陆后得到的令牌缓存的名字
    authName: "Authorization",
    //登录后存放的用户信息的名字
    userName: "userName",
    //环境变量，loc,dev，test，stage
    ENV: ENV,
    //header所存放的常量
    headers: {
        testId: 1,
    },
    //只能在本地生效
    //mock: true,
    // 地图信息
    mapCfg: {
        // web服务Key
        webServkey: '07b509e28fa78924522ad3334a944f2a',
        //webServkey: 'ea16110996969c8eeade5c5a63865090',
        // web端key(js api)
        webJsKey: '9b0c73b9e853433c4e05a54ecb40b127'
        //webJsKey: 'fe3058d01bc55b2acb68783e3f7778b1'
    },
    /*cors : {
        allowMethods: 'GET,HEADE,PUT,POST,DELETE,PATCH,OPTIONS',
        origin: '*',
        credentials: true
    }*/

    //接口所需域名
    host: ()=> {
        let str = {
            loc:"http://localhost:8080/",//本地
            dev: "http://localhost:8080/",//开发
            test: "http://localhost:8080/",//测试
            stage: "http://localhost:8080/"//与生产
        };
        return str[config.ENV];
    },
    //拼接接口所需域名和服务名，只需要输入接口名即可  如 yundt/mgmt/item/list-by-page，也不要加斜杆开始，
    //如果接口以http开头，则不会进拼接，而是保留原样
    //如果是mock，则会去assets/mock请求同名json，但/会被替换为-   如  yundt-mgmt-item-list-by-page.js
    apiAppName: (url)=> {
        if (!url) {
            return;
        } else if (url.indexOf("http") >= 0) {
            return url;
        }
        let str = "";
        if (config.mock && config.ENV == 'loc') {
            return "http://localhost:9090/assets/mock/" + url.replace(/\//g,"-")+'.json';
        } else {
            let apiAppName = {
                "smartsales/trade": "http://localhost:8080/",
                "smartsales/mgmt": "http://localhost:8080/",
                "yundt/mgmt":"http://localhost:8080/"
            };
            for (let i in apiAppName) {
                if (url.indexOf(i) >= 0) {
                    str = apiAppName[i];
                }
            }
            return config.host() + url;
        }
    },
}

export default config