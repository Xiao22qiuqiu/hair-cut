import React, {PropTypes, Component} from 'react'

class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {}
    }

    componentWillMount() {//完成：插入真实 DOM前
        window.app.router = this.props.router;
        if('/' === '' + this.props.location.pathname) {
            window.app.routerRedirect('/login');

        }
        let search = location.search;
        if(search.indexOf('auth=') > -1 ) {
            let auth = search.match(/\d+/);
            if(auth.length>0) {
                localStorage.setItem('auth', auth[0])
            }
        }
    }

    componentDidMount() {//插入完成真实 DOM
        // console.log('App>>componentDidMount')
    }

    componentWillReceiveProps(nextProps) {
        // console.log('App>>componentWillReceiveProps')
    }

    render() {
        return (this.props.children);
    }
}
module.exports = App;