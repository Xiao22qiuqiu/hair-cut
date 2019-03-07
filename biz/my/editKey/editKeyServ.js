import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    //��������
    static editKeyServ(params) {
        return Request({
            url: "qiuming/beauty/member/update/password",
            headers: {
                "Content-type": "application/json",
            },
            type: "PUT",
            data: params
        })
    }
};