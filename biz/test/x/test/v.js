import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {observer} from 'mobx-react';
import M from './m'
/**
 * 临时各页面的连接
 */
@observer
class Texx extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {}
        this.s = new M();
    }

    render() {
        return (
            <div className="row">
                {this.s.state.a.aa}
                <a onClick={e=>{this.s.b(2,function(){window.app.routerGoTo("/gongxiang")});}}>aaaaaaaaaaaaa</a>
            </div>
        );
    }
}
//export default TestIndex;
module.exports = Texx;
