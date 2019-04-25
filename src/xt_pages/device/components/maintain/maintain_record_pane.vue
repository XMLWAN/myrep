<template>
    <div class="main">
        <!-- 第一行 -->
        <el-row>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="7">
                        <span class="item_label_span"><span class="required_span">*</span>报修日期:</span>
                    </el-col>
                    <el-col :span="16">
                        <el-date-picker v-model="form.repairs_date" value-format="timestamp" size="small"></el-date-picker>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="7">
                        <span class="item_label_span">出发时间:</span>
                    </el-col>
                    <el-col :span="16">
                        <el-date-picker v-model="form.departure_time" type="datetime" value-format="timestamp" size="small"></el-date-picker>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div" style="text-align: right;">
                    <el-button @click="show_record_list">历史记录</el-button>
                </div>
            </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="7">
                        <span class="item_label_span">到达时间:</span>
                    </el-col>
                    <el-col :span="16">
                        <el-date-picker v-model="form.arrival_time" type="datetime" value-format="timestamp" size="small"></el-date-picker>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="7">
                        <span class="item_label_span">完成时间:</span>
                    </el-col>
                    <el-col :span="16">
                        <el-date-picker v-model="form.completion_time" type="datetime" value-format="timestamp" size="small"></el-date-picker>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row>
            <el-col :span="24">
                <div class="col_div">
                    <el-col :span="4">
                        <span class="item_label_span">故障发生阶段:</span>
                    </el-col>
                    <el-col :span="20">
                        <div style="margin-top: 6px;"></div>
                        <el-radio-group v-model="form.stage">
                            <el-radio label="开机启动">开机启动</el-radio>
                            <el-radio label="自检">自检</el-radio>
                            <el-radio label="准备">准备</el-radio>
                            <el-radio label="治疗">治疗</el-radio>
                            <el-radio label="消毒">消毒</el-radio>
                        </el-radio-group>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row>
            <el-col :span="24">
                <div class="col_div">
                    <el-col :span="5">
                        <span class="item_label_span">故障提示信息及代码:</span>
                    </el-col>
                    <el-col :span="19">
                        <el-input></el-input>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row>
            <el-col :span="8">
                <div style="padding-right: 12px;">
                    <span class="item_label_span"><span class="required_span">*</span>故障描述:</span>
                    <el-input type="textarea" :rows="4" resize="none"></el-input>

                    <div class="upload_pic_pane">
                        <el-upload action="" :file-list="uploaded_pics">
                            <el-button size="small">上传照片</el-button>
                        </el-upload>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div style="padding-right: 12px;">
                    <span class="item_label_span">原因分析:</span>
                    <el-input type="textarea" :rows="9" resize="none"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div>
                    <span class="item_label_span">处理过程:</span>
                    <el-input type="textarea" :rows="9" resize="none"></el-input>
                </div>
            </el-col>
        </el-row>
        <!-- 第六行 -->
        <el-row>
            <el-col :span="24">
                <div class="col_div">
                    <el-col :span="4">
                        <span class="item_label_span">故障是否排除:</span>
                    </el-col>
                    <el-col :span="20">
                        <div style="margin-top: 6px;"></div>
                        <el-radio-group v-model="form.result">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">待观察</el-radio>
                            <el-radio :label="3">未解决</el-radio>
                        </el-radio-group>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <!-- 第七行 -->
        <el-row>
            <el-col :span="24">
                <div class="col_div">
                    <el-col :span="2">
                        <span class="item_label_span">原因:</span>
                    </el-col>
                    <el-col :span="16">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="6">
                        <div style="text-align: right;">
                            <el-button type="primary">确定</el-button>
                        </div>
                    </el-col>
                </div>
            </el-col>
        </el-row>

        <maintain-record-list-dialog ref="record_list"></maintain-record-list-dialog>
    </div>
</template>

<script>
import MaintainRecordListDialog from './maintain_record_list_dialog'

export default {
    name: "MaintainRecordPane",
    components: {
        MaintainRecordListDialog,
    },
    data() {
        return {
            form: {
                repairs_date: '', // 报修时间
                departure_time: '', // 出发时间
                arrival_time: '', // 到达时间
                completion_time: '', // 完成时间
                stage: '',
                result: '',
            },
            uploaded_pics: [
                { name: "图片1.jpg", url: "" },
                { name: "图片2.jpg", url: "" },
                { name: "图片3.jpg", url: "" }
            ]
        }
    },
    methods: {
        show_record_list: function() {
            this.$refs.record_list.show()
        }
    }
}
</script>

<style scoped>
.main {
    padding: 10px 15px 10px 15px;
}
.main .el-row {
    padding-top: 5px;
    padding-bottom: 8px;
}
.col_div {
    width: 100%;
}
.item_label_span {
    font-size: 14px;
    line-height: 32px;
}
.required_span {
    color: red;
}
.el-date-editor.el-input {
    width: 100%;
}
.upload_pic_pane {
    margin-top: 10px;
    padding: 8px 5px;
    width: 100%;
    background-color: whitesmoke;
}
</style>

