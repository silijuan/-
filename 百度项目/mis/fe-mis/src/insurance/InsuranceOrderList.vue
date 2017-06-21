<template>
    <div>
        <!-- 路径导航 -->
        <ol class="breadcrumb">
        <li><a href="#">百度地图保险</a></li>
        <li class="active">成单列表</li>
        </ol>

        <div class="iol-main">
            <div>
                <form class="form-inline">
                    <div class="input-group mis-item">
                        <span class="input-group-addon">下单时间</span>
                        <input type="text" id="config-demo" class="form-control"/>
                    </div>
                    <div class="input-group mis-item">
                        <span class="input-group-addon">保险公司</span>
                        <v-select :value.sync="value.valueName" :options="options.optionName" placeholder="请选择保险公司" close-on-select="true">
                        </v-select>
                    </div>
                    <div class="input-group mis-item">
                        <span class="input-group-addon">订单状态</span>
                        <v-select :value.sync="value.valueStatus" :options="options.optionStatus" placeholder="请选择订单状态" close-on-select="true">
                        </v-select>
                    </div>
                    <div class="input-group mis-item">
                        <span class="input-group-addon">支付状态</span>
                        <v-select :value.sync="value.valueOrderStatus" :options="options.optionOrderStatus" placeholder="请选择支付状态" close-on-select="true">
                        </v-select>
                    </div>
                </form>
                <div class="cut"></div>
                <form class="form-inline">
                    <div class="input-group mis-item">
                        <span  class="input-group-addon">车牌号 </span>
                        <input @keyup.13="onEnter" type="text" class="form-control" placeholder="请输入车牌号" aria-describedby="basic-addon1" v-model="TextValue.valueCar"/>
                    </div>
                    <div class="input-group mis-item">
                        <span  class="input-group-addon">手机号</span>
                        <input @keyup.13="onEnter"class="form-control" placeholder="请输入手机号" aria-describedby="basic-addon1" type="tel" v-model="TextValue.valueMobile"/>
                    </div>
                    <div class="input-group mis-item" style="display:none">
                        <span  class="input-group-addon">保险单号</span>
                        <input @keyup.13="onEnter"class="form-control" placeholder="请输入保险单号" aria-describedby="basic-addon1" type="text" v-model="TextValue.valueInsurance"/>
                    </div>
                    <div class="input-group mis-item" style="display:none">
                        <span  class="input-group-addon">投保人</span>
                        <input @keyup.13="onEnter"class="form-control" placeholder="请输入投保人" aria-describedby="basic-addon1" type="text"  v-model="TextValue.valuePerson"/>
                    </div>
                    <div class="input-group mis-item">
                       <div style="display:none" class="btn btn-success">查询</div>
                    </div>
                    <div class="input-group mis-item">
                        <v-select class="specticalBtn" :value.sync="listValue" :options="options.listOption" placeholder="导出订单列表" close-on-select="true">
                        </v-select>
                    </div>
                </form>
            </div>
            <div class="content-data">
                <div class="panel panel-default">
                     <table class="table table-striped">
                        <tr>
                            <th>id</th>
                            <th>保险公司</th>
                            <th>投保人</th>
                            <th>投保人电话</th>
                            <th>投保城市</th>
                            <th>车牌号</th>
                            <th>总金额</th>
                            <th>返现基数</th>
                            <th>需返金额</th>
                            <th>订单状态</th>
                            <th>创建时间</th>
                            <th>支付时间</th>
                            <th>返现操作</th>
                            <th>是否认证</th>
                        </tr>
                        <tr v-for="(index, item) in listData.results">
                            <td><a v-link="{ name: 'iod', params: {something: '$order_id=' + item.id}}">{{ item.id }}</a></td>
                            <td>{{ item.partner_id }}</td>
                            <td>{{ item.tb_username }}</td>
                            <td>{{ item.tb_phone }}</td>
                            <td>{{ item.city_id }}</td>
                            <td>{{ item.platenum }}</td>
                            <td>{{ item.total_price }}</td>
                            <td>{{ item.rebate_price }}</td>
                            <td>{{ item.total_rebate }}</td>
                            <td>
                                <span class="label label-default"v-if="item.status==1">待录入</span>
                                <span class="label label-info"v-if="item.status==2">已录入</span>
                                <span class="label label-primary"v-if="item.status==3">待返现</span>
                                <span class="label label-info"v-if="item.status==4">已操作</span>
                                <span class="label label-warning"v-if="item.status==5">返现失败</span>
                                <span class="label label-success"v-if="item.status==6">返现成功</span>
                                <span class="label label-success" v-if="item.status==7">完成</span>
                            </td>
                            <td>{{ item.ctime }}</td>
                            <td>{{ item.pay_time }}</td>
                            <td>
                                <span v-if="item.status==3&&item.is_auth==1" class="label label-primary" @click="zoomModal = true, rebate_name = item.partner_id, rebate_id = item.id, rebate_price = item.total_rebate">
                                  返现
                                </span>
                            </td>
                            <td>
                                <span v-if="item.is_auth==1">认证成功</span>
                                <span v-if="item.is_auth==0">未处理</span>
                                <span v-if="item.is_auth==-1">未认证</span>
                            </td>
                        </tr>
                     </table>
                     <modal title="请仔细核对返现" :show.sync="zoomModal" effect="zoom" width="400" ok-text="返现" :callback="rebate">
                      <div slot="modal-body" class="modal-body">
                        <div class="list-group-item">
                            <span>保险公司:&nbsp;</span><span>{{ rebate_name }}</span>
                        </div>
                        <div class="list-group-item">
                            <span>订单id:&nbsp;&nbsp;</span><span>{{ rebate_id }}</span>
                        </div>
                        <div class="input-group mis-item">
                            <span class="input-group-addon">返现金额</span>
                            <span style="display: none;">{{ rebate_price }}</span>
                            <input type="text" class="form-control" v-model="rebate_price"/>
                        </div>
                      </div>
                    </modal>
                </div>
                 <div class="bs-callout bs-callout-info" v-if="listData.calculate">
                    <span>所选时间段 成单量：{{ listData.calculate.order_amount }}， 成单总流水：{{ listData.calculate.total_price }}元， 总车船税：{{ listData.calculate.total_tax }}元， 总返现基数：{{ listData.calculate.total_rebate }}元</span>
                 </div>
                 <v-page v-if="total" :current.sync="TextValue.valuePage" :total="total"></v-page>
            </div>
        </div>
    </div>
</template> 

<style scoped>
.breadcrumb {
    margin-bottom: 8px;
}
.content-data {
    margin-top:10px;
}
.modal.in {
    background-color: rgba(0,0,0,0.2)!important;
}
.iol-main {
    margin: 10px 30px;
}
.iol-main .cut {
    width: 100%;
    heght: 0;
    border-top: 1px solid #dfdfdf;
    margin: 5px 0;
}
.iol-main .specticalBtn .btn{
    background-color: #aa6708!important;
    color: white!important;
}
.iol-main .specticalBtn .dropdown-menu {
    background-color: #aa6708!important;
    color: white!important;
}
.iol-main .specticalBtn .dropdown-menu>li>a {
    color: white
}
.iol-main .specticalBtn .dropdown-menu>li>a:hover {
    color: black;
}
.iol-main .mis-item {
    margin: 10px 2px;
}
.iol-main .btn-group {
    text-align: right;
}
.iol-main .bs-callout+.bs-callout {
    margin-top: -5px;
}
.iol-main .bs-callout-info {
    border-left-color: #1b809e;
}
.iol-main .bs-callout {
    padding: 20px;
    margin: 20px 0;
    border: 1px solid #eee;
    border-left-width: 5px;
    border-radius: 3px;
}
</style>
<script>


import PageList from '../components/PageList.vue'
import { urlJson } from '../tools/url-config';
import { Jsonp } from '../tools/tool';
import { parseToUrl } from '../tools/tool';
import { parseUrl } from '../tools/tool';
import { datepicker } from 'vue-strap';
import { select } from 'vue-strap';
import { option } from 'vue-strap';
import { modal } from 'vue-strap';


let OrderUlr = urlJson.iol.OrderUrl;
let ExcelUrl = urlJson.iol.ExcelUrl;
let Url = urlJson.iol.MainUrl;
export default {
  data () {
    return {
        rebate_name:'',
        rebate_id:'',
        rebate_price:'',
        zoomModal: false,
        listData: '',
        pageList: '',
        total: '',
        value: {
            valueS: '',
            valueE: '',
            valueName: [],
            valueStatus: [],
            valueOrderStatus: [],
            valueIf: [],
        },
        listValue: [],
        TextValue: {
            valueCar: '',
            valueMobile: '',
            valueInsurance: '',
            valuePerson: '',
            valuePage: '1',
            valueSize: '15'
        },
        pageValue:[],
        options: {
            optionName: [
                {value:'ALL', label:'全部'},
                {value:'1', label:'阳光保险'},
                {value:'2', label:'太平洋保险'},
                {value:'3', label:'平安保险'},
                {value:'4', label:'人民保险'},
                {value:'8', label:'大地保险'},
                {value:'5', label:'车车-人保'},
                {value:'6', label:'车车-国寿财'},
                {value:'7', label:'车车-中华联合'}
            ],
            optionStatus: [
                {value:'ALL', label:'全部'},
                {value:'1', label:'待录入'},
                {value:'2', label:'已录入'},
                {value:'3', label:'待返现'},
                {value:'4', label:'已操作'},
                {value:'5', label:'返现失败'},
                {value:'6', label:'返现成功'},
                {value:'7', label:'完成'}
            ],
            optionOrderStatus: [
                {value:'ALL', label:'全部'},
                {value:'1', label:'未支付'},
                {value:'2', label:'已支付'},
                {value:'3', label:'退保'}
            ],
            optionIf: [
                {value:'10', label:'全部'},
                {value:'1', label:'是'},
                {value:'0', label:'否'}
            ],
            listOption: [
                {value:'SINOSIG', label:'阳光保险'},
                {value:'CPIC', label:'太平洋保险'},
                {value:'PINAN', label:'平安保险'},
                {value:'PICC', label:'人民保险'},
                {value:'CCIC', label:'大地保险'},
                {value:'CCCX-10000', label:'车车-人保'},
                {value:'CCCX—40000', label:'车车-国寿财'},
                {value:'CCCX—45000', label:'车车-中华联合'}
            ]
        },
        format: ['MMM/dd/yyyy']
    }
  },
  components: {
    'v-page': PageList,
    'v-select': select,
    'v-option': option,
    modal,
  },
  methods: {
    // 用户操作要看数据
    onEnter() {
        let arr_value = [];
        let arr_name = [];
        for (var i in this.value) {
            if(this.value[i] == 'ALL'){
                continue;
            }
            arr_name.push(i);
            arr_value.push(this.value[i]);
        }
        for (var i in this.TextValue) {
            if (i == 'valueCar') {
                this.TextValue[i] = encodeURIComponent(this.TextValue[i]);
            }
            arr_name.push(i);
            arr_value.push(this.TextValue[i]);
        }
        parseToUrl(arr_name, arr_value);
    },
    // 初始化时间
    initTime() {
        let me = this;
        let Urlparam = parseUrl(window.location.hash.split('$')[1]);
        let options;
        if (Urlparam.valueE && Urlparam.valueS) {
            options = {
                "startDate": moment(Urlparam.valueS),
                "endDate": moment(Urlparam.valueE)
            }
        } else {
            let st = moment().add(-7, 'days');
            let et = moment().add(7, 'days');
            options = {
                "startDate": st.format('L'),
                "endDate": et.format('L')
            };
            me.value.valueS = st.format('YYYY-MM-DD');
            me.value.valueE = et.format('YYYY-MM-DD');
        }
        //me.value.valueS = st.format('YYYY-MM-DD');
        //me.value.valueE = et.format('YYYY-MM-DD');
        $('#config-demo').daterangepicker(options, function (start, end, label) { 
            me.value.valueS = start.format('YYYY-MM-DD');
            me.value.valueE = end.format('YYYY-MM-DD'); 
        });
    },
    // url => html 映射
    initHmlt() {
        let me = this;
        let Urlparam = parseUrl(window.location.hash.split('$')[1]);
        if (Urlparam.valueName) 
            me.value.valueName = [Urlparam.valueName];
        if (Urlparam.valueStatus)
            me.value.valueStatus = [Urlparam.valueStatus];
        if (Urlparam.valueOrderStatus)
            me.value.valueOrderStatus = [Urlparam.valueOrderStatus];
        if (Urlparam.valueMobile)
            me.TextValue.valueMobile = Urlparam.valueMobile;
        if (Urlparam.valueCar)
            me.TextValue.valueCar = decodeURIComponent(Urlparam.valueCar);
        if (Urlparam.valuePage)
            me.TextValue.valuePage = Urlparam.valuePage;
    },
    // url => json 
    initParam() {
        let me = this;
        let Urlparam = parseUrl(window.location.hash.split('$')[1]);
        return Urlparam;
    },
    // Excel导出
    onExcel(val) {
        let me = this;
        let para = this.initParam();
        let _para = {
            'start_date': para.valueS,
            'end_date': para.valueE,
            'status': para.valueStatus,
            'pay_status': para.valueOrderStatus,
            'partner_id': val,
        } 
        let _url = ExcelUrl + $.param(_para);
        Jsonp(_url, (err, res) => {
            if (res.code == 0) {
                window.location = res.data.export_url;
            } if (res.code == 1003) {
                console.log('请登录');
            } if (res.code == 1004) {
                router.go({ name: 'error' });
            } else {
                console.log('error')
            }
        }); 
    },
    rebate() {
        let me = this;
        let _para = {
            'order_id': me.rebate_id,
            'partner_id': me.rebate_name,
            'total_rebate': me.rebate_price
        }
        let _url = OrderUlr + $.param(_para);
        Jsonp(_url, (err, res) => {
            if (res.code == 0) {
                alert('返现成功');
                window.location.reload();
            } if (res.code == 1003) {
                console.log('请登录');
            } if (res.code == 1004) {
                router.go({ name: 'error' });
            } else {
                console.log('error')
            }
        }); 
    },
    // 拉去数据
    getData() {
        let me = this;
        let para = this.initParam();
        // 这里页面重置是考虑到用户可能在url上篡改数据，页面是需要做出响应的
        me.initHmlt();
        me.value.valueS = para.valueS;
        me.value.valueE = para.valueE;
        let _para = {
            'page': para.valuePage,
            'size': para.valueSize,
            'partner_id': para.valueName,
            'start_date': para.valueS,
            'end_date': para.valueE,
            'status': para.valueStatus,
            'pay_status': para.valueOrderStatus,
            'platenum': para.valueCar,
            'phone': para.valueMobile,
            't': Date.now()
        } 
        let _url = Url + $.param(_para);
        Jsonp(_url, (err, res) => {
            if (res.code == 0) {
                me.listData = res.data;
                me.total = Math.ceil(res.data.calculate.order_amount/me.TextValue.valueSize);
            } if (res.code == 1003) {
                console.log('请登录');
            } if (res.code == 1004) {
                router.go({ name: 'error' });
            } else {
                console.log('error')
            }
        }); 
    },
    // url => 拉去数据 这里是之前陷入了误区，其实router会刷新新页面的唉
    initRoute() {
        let me = this;
        window.onhashchange = function() {
            me.getData();
        }
    }
  },
  watch: {
    'value': {
        handler: function (val, oldVal) {
            // 这种查询需要重置页面页数为1
            this.TextValue.valuePage = 1;
            this.onEnter();
        },
        deep: true
    },
    'TextValue.valuePage': {
        handler: function (val, oldVal) {
            this.onEnter();
        },
        deep: true 
    },
    'listValue': {
        handler: function (val, oldVal) {
            //
            if(val == undefined) {
                return;
            }
            this.TextValue.valuePage = 1;
            var me = this;
            if (val.length>=1) {
                console.log(val);
                me.onExcel(val);
                me.listValue = [];
            } 
        },
        deep: true
    }
  },
  ready () {
    let me = this;
    me.initTime();
  },
  route: {
    data(transition) {
        let me = this;
        me.getData();
        transition.next() 
    },
    deactivate(transition) {
        transition.next() 
    }
  }
}
</script>

