<template>
    <div class="app-container" v-loading="loading">
        <el-row>
            <el-col :span="24">
                <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="addZoneAction">新增分区</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-table :data="zones" border>
                    <el-table-column prop="name" label="分区名称" align="center"></el-table-column>
                    <el-table-column label="分区类型" align="center">
                        <template slot-scope="scope">
                            <span>{{ getZoneTypeLabel(scope.row.type) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center"> 
                        <template slot-scope="scope">
                            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" icon="el-icon-edit" size="mini" @click="modifyZoneAt(scope.row)">编辑</el-button>
                            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="danger" icon="el-icon-delete" size="mini" @click="deleteZoneAt(scope.row)">删除</el-button>
                        </template>  
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-dialog width="400px" :title="zone_form.id === 0 ? '新增分区' : '修改分区'" :visible.sync="showEditZone">
            <el-form :model="zone_form" ref="form_zone" :label-width="formLabelWidth">
                <el-form-item label="分区名称 : " prop="name" :rules="[{required: true, message: '请输入分区名', trigger: 'blur'}]">
                    <el-input v-model="zone_form.name" style="width: 220px"></el-input>
                </el-form-item>
                <el-form-item label="分区类型 : " prop="type" :rules="[{required: true, message: '请选择分区类型', trigger: 'blur'}]">
                    <el-select v-model="zone_form.type" style="width: 220px">
                        <el-option v-for="item in typeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="cancelModifyZone">取 消</el-button>
                    <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="editZoneSubmitAction">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {getZones, createZone, modifyZone, disableZone} from '@/api/device/device'

export default {
    name: "DeviceZoneMain",
    data() {
        return {
            loading: false,
            zones: [],
            zone_form:{
                id: 0,
                name: '',
                type: ''
            },
            showEditZone: false,
            formLabelWidth: '90px',
            typeOptions:[
                { value:1, label:'普通' },
                { value:2, label:'乙肝' },
                { value:3, label:'丙肝' },
                { value:4, label:'艾滋病' },
                { value:5, label:'肺结核' },
                { value:6, label:'梅毒' },
            ],
        }
    },
    created() {
        this.loading = true
        getZones().then(rs => {
            this.loading = false
            var resp = rs.data
            if (resp.state === 1) {
                this.zones.push(...resp.data.zones)
            } else {
                this.$message.error(resp.msg)
            }
        })
    },
    methods: {
        getZoneTypeLabel(type) {
            for (let index = 0; index < this.typeOptions.length; index++) {
                const typeOption = this.typeOptions[index];
                if (typeOption.value == type) {
                    return typeOption.label
                }
            }
            return ""
        },

        addZoneAction() {
            this.showEditZone = true
        },
        modifyZoneAt(row) {
            this.zone_form.id = row.id
            this.zone_form.name = row.name
            this.zone_form.type = row.type
            this.showEditZone = true
        },
        cancelModifyZone() {
            this.zone_form.id = 0
            this.zone_form.name = ''
            this.zone_form.type = ''
            this.$refs.form_zone.clearValidate()
            this.showEditZone = false
        },
        editZoneSubmitAction() {
            this.$refs.form_zone.validate(valid => {
                if (valid) {
                    if (this.zone_form.id === 0) {
                        createZone(this.zone_form.name, this.zone_form.type).then(rs => {
                            var resp = rs.data
                            if (resp.state === 1) {
                                var newZone = resp.data.zone
                                this.zones.push(newZone)
                                this.cancelModifyZone()

                            } else {
                                this.$message.error(resp.msg)
                            }
                        })
                        
                    } else {
                        modifyZone(this.zone_form.id, this.zone_form.name, this.zone_form.type).then(rs => {
                            var resp = rs.data
                            if (resp.state === 1) {
                                for (let index = 0; index < this.zones.length; index++) {
                                    const zone = this.zones[index];
                                    if (zone.id == this.zone_form.id) {
                                        zone.name = this.zone_form.name
                                        zone.type = this.zone_form.type
                                        break
                                    }
                                }
                                this.cancelModifyZone()

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
        deleteZoneAt: function(row) {
            this.$confirm("删除后将无法恢复，确定继续删除吗", '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
            .then(() => {
                this.loading = true
                disableZone(row.id).then(rs => {
                    this.loading = false
                    var resp = rs.data
                    if (resp.state == 1) {
                        var index = this.zones.indexOf(row)
                        if (index > -1) {
                            this.zones.splice(index, 1)
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
