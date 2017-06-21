<template>
<div>
    <!-- 路径导航 -->
    <ol class="breadcrumb">
        <li><a href="#">百度地图保险</a></li>
        <li class="active">成单库</li>
    </ol>
    <!-- 正文 -->
    <div class="iod-main">
        <div class="mis-panel">
            <div class="panel panel-default" v-if=detailData.orderInfo>
                <div class="panel-heading">订单相关信息</div>
                <div class="panel-body">
                    <table class="table table-striped">
                        <tr>
                            <td>订单id</td>
                            <td>{{ detailData.orderInfo.id }}</td>
                        </tr>
                        <tr>
                            <td>保险公司id</td>
                            <td>{{ detailData.orderInfo.partner_id }}</td>
                        </tr>
                        <tr>
                            <td>来源（包括地图，糯米，线下）</td>
                            <td>{{ detailData.orderInfo.channel }}</td>
                        </tr>
                        <tr>
                            <td>运营活动id</td>
                            <td>{{ detailData.orderInfo.activity_id }}</td>
                        </tr>
                        <tr>
                            <td>支付状态</td>
                            <td>{{ detailData.orderInfo.pay_status }}</td>
                        </tr>
                        <tr>
                            <td>支付时间</td>
                            <td>{{ detailData.orderInfo.pay_time }}</td>
                        </tr>
                        <tr>
                            <td>订单种类（合作订单，自主订单，送单）</td>
                            <td>{{ detailData.orderInfo.type }}</td>
                        </tr>
                        <tr>
                            <td>是否新车</td>
                            <td>{{ detailData.orderInfo.is_newcar }}</td>
                        </tr>
                        <tr>
                            <td>总金额</td>
                            <td>{{ detailData.orderInfo.total_price }}</td>
                        </tr>
                        <tr>
                            <td>返现基数</td>
                            <td>{{ detailData.orderInfo.rebate_price }}</td>
                        </tr>
                        <tr>
                            <td>实际返现金额</td>
                            <td>{{ detailData.orderInfo.real_rebate }}</td>
                        </tr>
                        <tr>
                            <td>退保金额</td>
                            <td>{{ detailData.orderInfo.total_refund }}</td>
                        </tr>
                        <tr>
                            <td>佣金</td>
                            <td>{{ detailData.orderInfo.total_commission }}</td>
                        </tr>
                        <tr>
                            <td>城市id</td>
                            <td>{{ detailData.orderInfo.city_id }}</td>
                        </tr>
                        <tr>
                            <td>创建时间</td>
                            <td>{{ detailData.orderInfo.ctime }}</td>
                        </tr>
                        <tr>
                            <td>修改时间</td>
                            <td>{{ detailData.orderInfo.mtime }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="panel panel-default" v-if=detailData.syInfo>
                <div class="panel-heading">商业险信息</div>
                <div class="panel-body">
                    <table class="table table-striped">
                        <tr>
                            <td>保单号</td>
                            <td>{{ detailData.syInfo.policy_num }}</td>
                        </tr>
                        <tr>
                            <td>名称</td>
                            <td>{{ detailData.syInfo.name }}</td>
                        </tr>
                        <tr>
                            <td>保单生效日期</td>
                            <td>{{ detailData.syInfo.start_time }}</td>
                        </tr>
                        <tr>
                            <td>保单结束日期</td>
                            <td>{{ detailData.syInfo.end_time }}</td>
                        </tr>
                        <tr>
                            <td>金额</td>
                            <td>{{ detailData.syInfo.price }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="panel panel-default" v-if=detailData.jqInfo>
                <div class="panel-heading">交强险信息</div>
                <div class="panel-body">
                    <table class="table table-striped">
                        <tr>
                            <td>保单号</td>
                            <td>{{ detailData.jqInfo.policy_num }}</td>
                        </tr>
                        <tr>
                            <td>名称</td>
                            <td>{{ detailData.jqInfo.name }}</td>
                        </tr>
                        <tr>
                            <td>保单生效日期</td>
                            <td>{{ detailData.jqInfo.start_time }}</td>
                        </tr>
                        <tr>
                            <td>保单结束日期</td>
                            <td>{{ detailData.jqInfo.end_time }}</td>
                        </tr>
                        <tr>
                            <td>车架号</td>
                            <td>{{ detailData.jqInfo.status }}</td>
                        </tr> 
                        <tr>
                            <td>发票开具金额</td>
                            <td>{{ detailData.jqInfo.price }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="panel panel-default" v-if=detailData.taxInfo>
                <div class="panel-heading">车船税信息</div>
                <div class="panel-body">
                    <table class="table table-striped">
                        <tr>
                            <td>保单号</td>
                            <td>{{ detailData.taxInfo.policy_num }}</td>
                        </tr>
                        <tr>
                            <td>名称</td>
                            <td>{{ detailData.taxInfo.name }}</td>
                        </tr>
                        <tr>
                            <td>保单生效日期</td>
                            <td>{{ detailData.taxInfo.start_time }}</td>
                        </tr>
                        <tr>
                            <td>保单结束日期</td>
                            <td>{{ detailData.taxInfo.end_time }}</td>
                        </tr>
                        <tr>
                            <td>车架号</td>
                            <td>{{ detailData.taxInfo.status }}</td>
                        </tr> 
                        <tr>
                            <td>发票开具金额</td>
                            <td>{{ detailData.taxInfo.price }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="mis-panel">
            <div class="panel panel-default" v-if=detailData.tbUserInfo>
                <div class="panel-heading">投保人信息</div>
                <div class="panel-body">
                    <table class="table table-striped">
                        <tr>
                            <td>名称</td>
                            <td>{{ detailData.tbUserInfo.name }}</td>
                        </tr>
                        <tr>
                            <td>百度帐号用户名</td>
                            <td>{{ detailData.tbUserInfo.username }}</td>
                        </tr>
                        <tr>
                            <td>身份证号</td>
                            <td>{{ detailData.tbUserInfo.idno }}</td>
                        </tr>
                        <tr>
                            <td>性别</td>
                            <td>{{ detailData.tbUserInfo.gender }}</td>
                        </tr>
                        <tr>
                            <td>电话</td>
                            <td>{{ detailData.tbUserInfo.phone }}</td>
                        </tr>
                        <tr>
                            <td>邮箱</td>
                            <td>{{ detailData.tbUserInfo.mail }}</td>
                        </tr>
                        <tr>
                            <td>uid</td>
                            <td>{{ detailData.tbUserInfo.uid }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="panel panel-default" v-if=detailData.bbUserInfo>
                <div class="panel-heading">被保人信息</div>
                <div class="panel-body">
                    <table class="table table-striped">
                        <tr>
                            <td>名称</td>
                            <td>{{ detailData.bbUserInfo.name }}</td>
                        </tr>
                        <tr>
                            <td>身份证号</td>
                            <td>{{ detailData.bbUserInfo.idno }}</td>
                        </tr>
                        <tr>
                            <td>性别</td>
                            <td>{{ detailData.bbUserInfo.gender }}</td>
                        </tr>
                        <tr>
                            <td>电话</td>
                            <td>{{ detailData.bbUserInfo.phone }}</td>
                        </tr>
                        <tr>
                            <td>邮箱</td>
                            <td>{{ detailData.bbUserInfo.mail }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="panel panel-default" v-if=detailData.carOwnerInfo>
                <div class="panel-heading">车主信息</div>
                <div class="panel-body">
                    <table class="table table-striped">
                        <tr>
                            <td>名称</td>
                            <td>{{ detailData.carOwnerInfo.name }}</td>
                        </tr>
                        <tr>
                            <td>身份证号</td>
                            <td>{{ detailData.carOwnerInfo.idno }}</td>
                        </tr>
                        <tr>
                            <td>性别</td>
                            <td>{{ detailData.carOwnerInfo.gender }}</td>
                        </tr>
                        <tr>
                            <td>电话</td>
                            <td>{{ detailData.carOwnerInfo.phone }}</td>
                        </tr>
                        <tr>
                            <td>邮箱</td>
                            <td>{{ detailData.carOwnerInfo.mail }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="mis-panel">
            <div class="panel panel-default" v-if=detailData.carInfo>
                <div class="panel-heading">车辆信息</div>
                <div class="panel-body">
                    <table class="table table-striped">
                        <tr>
                            <td>车辆识别代码</td>
                            <td>{{ detailData.carInfo.vin }}</td>
                        </tr>
                        <tr>
                            <td>发动机号</td>
                            <td>{{ detailData.carInfo.enginenum }}</td>
                        </tr>
                        <tr>
                            <td>注册日期</td>
                            <td>{{ detailData.carInfo.regdate }}</td>
                        </tr>
                        <tr>
                            <td>车辆品牌</td>
                            <td>{{ detailData.carInfo.carbrand }}</td>
                        </tr>
                        <tr>
                            <td>车牌号</td>
                            <td>{{ detailData.carInfo.platenum }}</td>
                        </tr>
                        <tr>
                            <td>是否过户车</td>
                            <td>{{ detailData.carInfo.specialcarflag }}</td>
                        </tr>
                        <tr>
                            <td>过户日期</td>
                            <td>{{ detailData.carInfo.specialcardate }}</td>
                        </tr>
                        <tr>
                            <td>车架号</td>
                            <td>{{ detailData.carInfo.vehicleframeno }}</td>
                        </tr>
                        <tr>
                            <td>发票开具日期</td>
                            <td>{{ detailData.carInfo.vehicle_invoice_date }}</td>
                        </tr>
                        <tr>
                            <td>新车购置发票号</td>
                            <td>{{ detailData.carInfo.vehicle_invoice_no }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
.iod-main {
    margin: 30px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
}
.iod-main .panel-body {
    padding: 15px 0;
}
.iod-main .mis-panel {
    width: 30%;
}
</style>

<script>

import { urlJson } from '../tools/url-config';
import {Jsonp} from '../tools/tool';
import {parseUrl} from '../tools/tool';

let Url = urlJson.iod.MainUrl;
export default {
    data() {
        return {
            'detailData': ''
        }
    },
    components: {
    },
    methods: {},
    ready() {
    },
    route: {
        data(transition) {
            console.log('为什么进不到这个页面');
            let param = parseUrl(this.$route.params.something.split('$')[1]);
            let _Url = Url + 'order_id=' + param.order_id;
            let me = this;
            Jsonp(_Url, (err, res) => {
                if (res.code == 0) {
                    console.log(res.data);
                    me.detailData = res.data;
                } if (res.code == 1003) {
                    console.log('请登录');
                } if (res.code == 1004) {
                    router.go({ name: 'error' });
                } else {
                    console.log('error')
                }
                transition.next();
            })
        },
        deactivate() {
            console.log('this is end');
        }
    }
}
</script>

