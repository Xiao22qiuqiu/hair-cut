import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    static testServ(params) {
        return Request({
            url: "qiuming/beauty/member/register",//members/info
            type: "POST",
            headers: {
                "Content-type": "application/json",//''
            },
            data: params
        })
    }
    static loginServ(params) {
        return Request({
            url: "login",//members/info
            type: "POST",
            headers: {
                "Content-type": "application/json",//''
            },
            data: params
        })
    }
};