import React, { PropTypes, Component } from 'react';
import Request from "util/Request";
export default class {
    static onLoginFun(params) {
        return Request({
            url: "qiuming/beauty/auth/login",
            skipAuth: true,
            type: "POST",
            headers: {
                "Content-type": "application/json",
            },
            data: params
        })
    }
};