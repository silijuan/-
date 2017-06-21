<template>
<div>
    <!-- 路径导航 -->
    <ol class="breadcrumb">
        <li><a href="#">百度地图保险</a></li>
        <li class="active">成单导入</li>
    </ol>
    <div class="ioi-main">
        <div class="bs-example">
            <form class="form-inline">
                <div class="form-group">
                    <label for="chooseType">导入类型</label>
                    <v-select :value.sync="single" :options="fruitOptions" placeholder="全部" close-on-select="true">
                    </v-select>
                </div>
                <div class="form-group">
                    <div id="uploader" class="wu-example">
                        <!--用来存放文件信息-->
                        <div id="thelist" class="uploader-list"></div>
                        <div class="btns">
                            <div id="picker">选择文件</div>
                            <div id="btnsList"></div>
                        </div>
                    </div>
                </div>
                <div id="fileBtn" class="btn btn-success">保存</div>
            </form>
        </div>
        <div class="mis-panel panel panel-default">
             <table class="table table-striped">
                <tr>
                    <th>id</th>
                    <th>保险公司</th>
                    <th>文件类型</th>
                    <th>文件名</th>
                    <th>上传者</th>
                    <th>处理结果</th>
                    <th>上传时间</th>
                    <th>处理完成时间</th>
                </tr>
                <tr v-for="(index, item) in importData">
                    <td>{{ item.id }}</td>
                    <td>{{ item.partner_id }}</td>
                    <td>{{ item.type }}</td>
                    <td>{{ item.filename }}</td>
                    <td>{{ item.operator }}</td>
                    <td>{{ item.result }}</td>
                    <td>{{ item.ctime }}</td>
                    <td>{{ item.mtime }}</td>
                </tr>
             </table>
        </div>



    </div>
</div>
</template>

<style>
.ioi-main {
    margin: 30px;
}
.ioi-main .mis-panel{
    margin-top: 20px;
}
.ioi-main .form-inline {
    line-height: 100px;
    height: 100px;
}
.ioi-main .dropdown-menu {
    margin-top: -20px;
}
.ioi-main .btns {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;  
    justify-content: center;
    margin: 0 40px;
    height: 60px;
    line-height: 15px;
}
#uploader {
    margin-top: 25px;
}
#btnsList {
    margin-top: -10px;
    margin-left: 10px;
    color: gray;
    font-size: 14px;
}
</style>

<script>
import { Jsonp } from '../tools/tool';
import { select } from 'vue-strap';
import { option } from 'vue-strap';
import { urlJson } from '../tools/url-config';

let Url = urlJson.ioi.MainUrl;
let UploadUrl = urlJson.ioi.UploadUrl;
export default {
    data() {
        return {
            importData: '',
            fruitOptions: [
                {value:'1', label:'普通订单数据文件'},
                {value:'2', label:'含百度帐号信息文件'}
            ],
            single: ['1']
        }
    },
    components: {
        'vSelect': select,
        'vOption': option
    },
    methods: {
        initUploader() {
            let me = this;
            let _server = UploadUrl + 'type=' + me.single[0];
            let uploader = WebUploader.create({
                server: _server,
                pick: '#picker',
                resize: false,
                withCredentials: true
            });

            let $list = $('#btnsList');
            let f;

            uploader.on( 'fileQueued', function (file) {
                $list.append( '<div id="' + file.id + '" class="item">' +
                    '<h4 class="info">' + file.name + '</h4>' +
                    '<p class="state">等待上传...</p>' +
                '</div>' );
                f = file;
            });

            $('#fileBtn').click(function () {
                let _server = UploadUrl + 'type=' + me.single[0];
                uploader.options.server = _server;
                uploader.upload(f);
            });

            uploader.on('uploadAccept', function (obj, ret) {
                if(ret.code == 0) {
                    alert('上传成功');
                    window.location.reload();
                } if (ret.code == 1003) {
                    console.log('请登录');
                } if (ret.code == 1004) {
                    router.go({ name: 'error' });
                } if (ret.code == 1001 ) {
                    window.alert('上传文件格式错误')
                } if (ret.code == 1002 ) {
                    window.alert('上传文件命名规则错误')
                } else {
                    console.log('error')
                }
            });
        }
    },
    ready() {
        let me = this;
        console.log('it happend!');
        me.initUploader();
    },
    route: {
        data(transition) {
            let me = this;
            let para = 'size=20';
            let _url = Url + para
            Jsonp(_url, (err, res) => {
                if (res.code == 0) {
                    me.importData = res.data;
                } if (res.code == 1003) {
                    console.log('请登录');
                } if (res.code == 1004) {
                    router.go({ name: 'error' });
                } else {
                    console.log('error')
                }
                transition.next();
            });
        },
        deactivate() {
            console.log('this is next')
        }
    }
}
</script>

