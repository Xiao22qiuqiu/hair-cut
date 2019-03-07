import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    //��������
    static orderLists(params) {
        return Request({
            url: "qiuming/beauty/member/update",
            type: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            data: params
        })
    }
};