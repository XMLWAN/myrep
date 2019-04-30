<template>
    <div class="app-container" v-loading="loading">
        <el-row>
            <el-col :span="24">
                <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="addDeviceNumberAction">新增床位</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-table :data="device_numbers" border>
                    <el-table-column prop="number" label="床位号" align="center"> </el-table-column>
                    <el-table-column prop="zone_name" label="所属分区" align="center"></el-table-column>
                    <el-table-column prop="group_name" label="所属分组" align="center"></el-table-column>
                    <el-table-column label="操作" align="center"> 
                        <template slot-scope="scope">
                            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" icon="el-icon-edit" size="mini" @click="modifyDeviceNumberAt(scope.row)">编辑</el-button>
                            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="danger" icon="el-icon-delete" size="mini" @click="deleteDeviceNumberAt(scope.row)">删除</el-button>
                        </template>  
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-dialog width="400px" :title="number_form.id === 0 ? '新增床位号/机号' : '修改床位号/机号'" :visible.sync="showEditDeviceNumber">
            <el-form :model="number_form" ref="form_number" :label-width="formLabelWidth">
                <el-form-item label="床位号/机号 : " prop="number" :rules="[{required: true, message: '请输入床位号/机号', trigger: 'blur'}]">
                    <el-input v-model="number_form.number" style="width: 220px"></el-input>
                </el-form-item>
                <el-form-item label="所属分区 : " prop="zone" :rules="[{required: true, message: '请选择分区', trigger: 'blur'}]">
                    <el-select v-model="number_form.zone" style="width: 220px">
                        <el-option v-for="item in zones" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属分组 : " prop="group" :rules="[{required: true, message: '请输入分组', trigger: 'blur'}]">
                    <el-select v-model="number_form.group" style="width: 220px">
                        <el-option v-for="item in groups" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="cancelModifyDeviceNumber">取 消</el-button>
                    <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="editDeviceNumberSubmitAction">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {getDeviceInitData, createDeviceNumber, modifyDeviceNumber, disableDeviceNumber} from '@/api/device/device'

export default {
    name: "DeviceNumberMain",
    data() {
        return {
            loading: false,
            number_form:{
                id: 0,
                number: '',
                zone: '',
                group: '',
            },
            formLabelWidth: '110px',
            showEditDeviceNumber: false,
            zones: [],
            groups: [],
            device_numbers: [],
        }
    },
    created() {
        this.loading = true
        getDeviceInitData().then(rs => {
            this.loading = false
            var resp = rs.data
            if (resp.state === 1) {
                // console.log(resp)
                this.zones.push(...resp.data.zones)
                this.groups.push(...resp.data.groups)
                this.device_numbers.push(...resp.data.numbers)
                
            } else {
                this.$message.error(resp.msg)
            }
        })
    },
    methods:{
        addDeviceNumberAction() {
            this.showEditDeviceNumber = true
        },
        modifyDeviceNumberAt(row) {
            this.number_form.id = row.id
            this.number_form.number = row.number
            this.number_form.zone = row.zone_id
            this.number_form.group = row.group_id
            this.showEditDeviceNumber = true
        },
        cancelModifyDeviceNumber() {
            this.number_form.id = 0
            this.number_form.number = ''
            this.number_form.zone = ''
            this.number_form.group = ''
            this.$refs.form_number.clearValidate()
            this.showEditDeviceNumber = false
        },
        editDeviceNumberSubmitAction() {
            this.$refs.form_number.validate(valid => {
                if (valid) {
                    if (this.number_form.id === 0) {
                        createDeviceNumber(this.number_form.number, this.number_form.zone, this.number_form.group).then(rs => {
                            var resp = rs.data
                            if (resp.state === 1) {
                                var newNumber = resp.data.number
                                this.device_numbers.push(newNumber)
                                this.cancelModifyDeviceNumber()

                            } else {
                                this.$message.error(resp.msg)
                            }
                        })
                        
                    } else {
                        modifyDeviceNumber(this.number_form.id, this.number_form.number, this.number_form.zone, this.number_form.group).then(rs => {
                            var resp = rs.data
                            // console.log(resp.data)
                            if (resp.state === 1) {
                                for (let index = 0; index < this.device_numbers.length; index++) {
                                    const number = this.device_numbers[index];
                                    if (number.id == this.number_form.id) {
                                        number.number = resp.data.number.number
                                        number.zone_id = resp.data.number.zone_id
                                        number.group_id = resp.data.number.group_id
                                        number.zone_name = resp.data.number.zone_name
                                        number.group_name = resp.data.number.group_name
                                        break
                                    }
                                }
                                this.cancelModifyDeviceNumber()

                            } else {
                                this.$message.error(resp.msg)
                            }
                        })
                    }
                    
                } else {
                    return false
                }
            })
        },
        deleteDeviceNumberAt: function(row) {
            this.$confirm("删除后将无法恢复，确定继续删除吗", '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
            .then(() => {
                this.loading = true
                disableDeviceNumber(row.id).then(rs => {
                    this.loading = false
                    var resp = rs.data
                    if (resp.state == 1) {
                        var index = this.device_numbers.indexOf(row)
                        if (index > -1) {
                            this.device_numbers.splice(index, 1)
                        }
                        
                    } else {
                        this.$message.error(resp.msg)
                    }
                })
            })
        },
    }
}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}
</style>
