/**
 * Created by yike on 2018/3/29.
 * 用法
 * <StarRange
 *     number={3.5}      表示选中的星星数，4.5-四颗半  4-四颗
 *     max={5}           表示最大星星数，默认是5
 *     className="xxx"   样式
 * />
 *
 */

import React, { PropTypes, Component } from 'react';
import './index.less';

function starRange({ number = 0, max = 5, className=''}) {

    let starArr = [];
    let num = Math.floor(number);
    for(let i = 0; i < num; i++) {
        starArr.push(<div className="star-icon" key={'star'+i}></div>);
    }
    if (number % 1 > 0) {
        starArr.push(<div className="half-star-icon" key={'star'+num}></div>);
    }
    let length = starArr.length;
    for(let i = 0; i < max - length; i++) {
        starArr.push(<div className="grey-star-icon" key={'star'+ (length + i)}></div>);
    }

    return (
        <div className={`star-range-widget ${className}`}>
            {starArr}
        </div>
    )
}

module.exports = starRange;