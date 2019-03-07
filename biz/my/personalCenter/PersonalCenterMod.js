/**
 * Created by chen.qiuming on 2018/3/26.
 */

import {observable,action,runInAction,useStrict,autorun, computed} from 'mobx';
import Serv from './PersonalCenterServ';

class PersonalCenter {

    @observable state = {
        info: {}
    }

    @action
    async getMemberInfo() {
        let { data, resultCode, resultMsg } = await Serv.getMemberInfo();
        runInAction(() => {
            this.state.info = data;
        })
        console.log('个人中心',data)

    }
}

const personalCenter = new PersonalCenter();
export default personalCenter;