import React, { PropTypes, Component } from 'react';
import Request from "../../../util/Request";

//export async function resourceTree(params) {
//    return request({
//        url: '/sys/resource/tree',
//        method: 'GET',
//        data: params
//    });
//};
//async cc(){
//    try{
//        let data = await Request({
//            url:"http://192.168.33.11:8004/mocking/nuskin/api/v1/yundt/mgmt/item/list-by-page",
//            type:"POST",
//            data:{xx:1,bb:2}
//        })
//    }catch (e){
//        console.log(e)
//    }
//}

export default class {
    static async a() {
        try {
            let data = await Request({
                url: "http://192.168.33.11:8004/mocking/nuskin/api/v1/yundt/mgmt/item/list-by-page",
                type: "GET",
                data: {xx: 1, bb: 2}
            })
            console.log(data,11111111111111111111111);
            return data;
        } catch (e) {
            console.log(e)
        }
    }
};