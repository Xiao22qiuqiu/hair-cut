import React, { PropTypes, Component } from 'react';
import Request from "util/Request";
export default class {
    //µÍ∆ÃœÍ«È
    static addShop(params) {
        return Request({
            url: "qiuming/beauty/mgmt/system/shop/add",//members/info
            type: "POST",
            headers: {
                "Content-type": "application/json",//''
            },
            data: params
        })
    }
};