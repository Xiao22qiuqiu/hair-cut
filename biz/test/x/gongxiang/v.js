import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import {observer,inject} from 'mobx-react';
import M from '../test/m'
/**
 * 临时各页面的连接
 */
@observer
class TestIndex extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {}
        this.s = new M();
        //this.s.text();
    }

    render() {
        return (
            <div className="row">
                {this.s.state.a.aa}
            </div>
        );
    }
}
//export default TestIndex;
module.exports = TestIndex;
