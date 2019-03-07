import React from 'react';
import { Icon } from 'antd-mobile';
const { Component } = React
import styles from './qqMap.less'
 class QQMap extends Component {
    // 构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            center: this.props.center || { lat: 39.916527, lng: 116.397128 } //初始化的点
        }
    }

    mapInit() {
        let THIS = this
        let map = new qq.maps.Map(this.refs.qqMapDom, {
            center: new qq.maps.LatLng(this.state.center.lat, this.state.center.lng),
            zoom: 10
        });
        let marker = new qq.maps.Marker({
            position: new qq.maps.LatLng(this.state.center.lat, this.state.center.lng),
            map: map,
        });
        THIS.props.getSpot(this.state.center.lat,this.state.center.lng)
        qq.maps.event.addListener(map, 'click', function (event) {
            marker.setPosition(new qq.maps.LatLng(event.latLng.lat,event.latLng.lng))
            //对指定经纬度进行解析
            // geocoder.getAddress(new qq.maps.LatLng(event.latLng.lat,event.latLng.lng));
            THIS.props.getSpot(event.latLng.lat,event.latLng.lng)
        });
    }

    // 已加载组件，收到新属性时调用
    componentWillReceiveProps(nextProps) {
        this.setState({center:nextProps.center})
    }

    // 插入真实 DOM
    componentDidMount() {
        this.mapInit()
    }

    render() {
        return (
            <div ref='qqMapDom' style={this.props.style}></div>
        )
    }

}
module.exports = QQMap;