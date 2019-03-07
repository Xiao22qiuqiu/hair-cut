import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {inject,observer} from 'mobx-react';
import { List,NavBar,Flex,Icon,TextareaItem,ImagePicker,Button } from 'antd-mobile';
import Config from 'config/Config';
import Util from 'util';
import Style from './commentLess.less';

const Item = List.Item;
const Brief = Item.Brief;
/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
@inject("comment")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class Test extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.comment;
        this.state = {
            starArr : [] , //点赞星星
            num:'5',
            text:'非常好',
        }
    }
    componentDidMount() {
        console.log('history',this.props.location)
        let params={
            orderId:this.props.location.query.id,
            shopId:this.props.location.query.shopId,
            itemImage:this.props.location.query.itemImage,
        }
        this.stores.getData(params);
        this.valueText(5)
    }
    //改变数据
    updateMod=(value,name)=>{
        this.stores.updateModel(value,name);
    }

    //上传照片
    onChange = (files, type, index) => {
        this.stores.onImg(files, type, index)
    }
    //提交
    submitComment = () => {
        this.stores.submit()
    }
    //提交
    submitScore = (score) => {
        this.stores.submitScore(score)
    }

    //点赞星星数
    starRange(number) {
        this.state.starArr=[];
        let a=this.state.starArr;
        for(let i = 1; i <= 5; i++) {
            if(i <= number){
                a.push(<span className="star-icon" onClick={()=>{this.setState({num:i});this.starRange(i);this.submitScore(i)}} key={'star'+i}></span>);
            }else{
                a.push(<span className="half-star-icon" onClick={()=>{this.setState({num:i});this.starRange(i);this.submitScore(i)}} key={'banstar'+i}></span>);
            }
        }
        return (<span>{a}</span>)
    }
    //文字
    valueText = (score) => {
        switch (score){
            case 1:
                return '很差'
            break;
            case 2:
                return '差'
                break;
            case 3:
                return '好'
                break;
            case 4:
                return '比较好'
                break;
            case 5:
                return '非常好'
                break;
        }
    }


    render() {
        let {commentList,introduction,shopImg,imgList,score}=this.stores.state;
        return (
            <div className="comment">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {window.history.back();}}
                    >发表评论
                </NavBar>
                <div className="marginT clearfix">
                    <span className="Img"><img src={'data:image/png;base64,'+commentList.itemImage} alt=""/></span>
                    <span className="start">{this.starRange(this.state.num)}</span>
                    <span className="text">{this.valueText(this.state.num)}</span>
                </div>
                <div className="marginT">
                    <TextareaItem
                        placeholder="这次服务满足你的期待吗？说说它的优点与美中不足的地方吧！"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        autoHeight
                        rows={6}
                        count={500}
                        value={introduction}
                        onChange={(value)=>this.updateMod(value,'introduction')}
                        />
                    <ImagePicker
                        files={imgList}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log('ffffffff',index, fs)}
                        selectable={imgList.length < 3}
                        multiple={false}
                        />

                </div>
                <div className="btn">
                    <Button type="primary" onClick={()=>this.submitComment() }>发 布</Button>
                </div>
            </div>
        );
    }
}

module.exports = Test;
