/**
 * Created by chen.qiuming on 2018/3/26.
 */

import Request from "util/Request";
import Config from 'config/Config';
import Util from 'util';

export default class {
    static getMemberInfo() {
        return Request({
            url: "qiuming/beauty/member/get/detail",
            type: "GET"
        })
    }
}