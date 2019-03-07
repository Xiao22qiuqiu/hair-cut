//最佳实践：将ErrorBoundary抽象为一个公用的组件类

import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {hasError: false}
    }

    componentDidCatch(err, info) {
        this.setState({hasError: true})
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong!</div>
        }
        return this.props.children
    }
}