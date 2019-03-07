import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import Request from "../../util/Request"
import {observer} from 'mobx-react';
import Posts from './mobxTest'
/**
 * 临时各页面的连接
 */
@observer
class TestIndex extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {

        }
        this.linkes = [
            {to: '/', title: '--==模块列表=--'},
            {to: '/template', title: '--==模版=--'},
        ];
        this.posts = new Posts();
        this.posts.text();
    }

    async cc(){
        try{
            let data = await Request({
                url:"http://192.168.33.11:8004/mocking/nuskin/api/v1/yundt/mgmt/item/list-by-page",
                type:"POST",
                data:{xx:1,bb:2}
            })
        }catch (e){
            console.log(e)
        }
    }

    render() {
        setTimeout(()=>{
            this.posts.b(22222);
        },2000)
        return (
            <div className="row">
                {this.posts.list.a}
                {this.posts.list.b}
                <ul>

                    {
                        this.linkes.map(function (item, index) {
                            return <li style={{fontSize:'.35rem'}}key={new Date().getTime()+index}><Link style={{color:'#f00'}}
                                                                              to={item.to}>{item.title}</Link></li>;
                        })
                    }
                </ul>
            </div>
        );
    }
}
//export default TestIndex;
module.exports = TestIndex;
