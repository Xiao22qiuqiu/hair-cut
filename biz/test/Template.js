import React, { PropTypes, Component } from 'react';
import {observer} from 'mobx-react';
/**
 * 这是一个模板文件
 */
@observer
 class Template extends Component {
   constructor(props, context) {
    super(props, context);
    this.state = {
    }
  }
  render () {
    return (
      <div>
        <div>hi~Template</div>
        <p>准备：插入真实</p>
      </div>
    );
  }
  componentWillMount(){}//准备：插入真实 DOM
  componentDidMount(){}//完成：插入真实 DOM
  componentWillUpdate(nextProps, nextState){}//准备：正在被重新渲染
  componentDidUpdate(prevProps,prevState){}//完成：正在被重新渲染
  componentWillUnmount(){}//已移出真实 DOM
  componentWillReceiveProps(nextProps){}//已加载组件收到新的参数时调用
  shouldComponentUpdate(nextProps,nextState){}//组件判断是否重新渲染时调用
}
/*
//属性验证
 Template.propTypes={
  stringProp: React.PropTypes.string.isRequired, //必须是字符串
  boolProp:React.PropTypes.bool.isRequired,//必须是布尔
  arrayProp:React.PropTypes.array.isRequired,//必须是数组
  funcProp:React.PropTypes.func.isRequired,//必须是函数
  numberProp:React.PropTypes.number.isRequired,//必须是数字
  objectProp:React.PropTypes.object.isRequired,//必须是对象
}
*/
module.exports = Template;