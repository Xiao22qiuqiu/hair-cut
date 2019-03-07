/**
 * Created by lao.jianfeng on 2017/2/21.
 */
import React, {PropTypes, Component} from 'react'
import {ImagePicker} from 'antd-mobile';
/**
 * 上传组件
 */
class UploadImage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            images: [],//图片数组
        }
    }

    onChange(files, type, index) {
        this.setState({
            images: files
        });
    }
    onFileChange(files,type,index){
        console.log('onFileChange>>', files, type, index);
    }
    onImageClick(index,file){
        console.log('onImageClick>>', file, index);
    }


    render() {
        return (
            <ImagePicker
                files={this.state.images}
                onChange={this.onChange.bind(this)}
                onImageClick={this.onImageClick.bind(this)}
                selectable={this.state.images.length < 6}
                onFileChange={this.onFileChange.bind(this)}
            />
        );
    }

    componentWillMount() {
    }//准备：插入真实 DOM
    componentDidMount() {
    }//完成：插入真实 DOM
    componentWillUnmount() {
    }//已移出真实 DOM
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
module.exports = UploadImage;