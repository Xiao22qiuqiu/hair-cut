import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class {
    //��������
    static orderLists(params) {
        return Request({
            url: "qiuming/beauty/member/get/detail",
            type: "GET",
            data: params
        })
    }
};