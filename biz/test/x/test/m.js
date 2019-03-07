import React, { PropTypes, Component } from 'react';
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import T from './s';
/**
 * mod层
 */
useStrict(true)
class Test {
    @observable state = {
        a: {
            aa: 11111,
            bb: 22222
        }
    };
    //如果需要修改observable的值，必须在action里面,如果设定了useStrict严格模式，那么所有值的修改必须在action定义的方法内，否则可以直接修改
    @action
    text() {
        //setTimeout(()=> {
            //如果是异步，必须在runInAction
            runInAction(()=> {

                console.log(T.a());

                //监控数据变化的回调
                autorun((e, b) => {
                    console.log("Tasks left: ", e)
                })
            })
        //}, 5000)
    }
    @action
    b(str,cbk) {
        this.state.a.aa = str;
        (cbk)();
    }
}
export default Test;