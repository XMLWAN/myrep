<template>
    <div>
        <el-dialog title="透析分区" width="840px" :visible.sync="visible" :before-close="_close">
            <el-button type="primary" icon="el-icon-plus" class="addBtn" size="mini" @click="addAction">新增</el-button>

            <el-tabs ref="tabs">
                <el-tab-pane label="分区列表">
                    <span slot="label"><i class="el-icon-menu"></i> 分区列表</span>
                    <el-table :data="zones" border>
                        <el-table-column prop="name" label="分区名称" align="center"></el-table-column>
                        <el-table-column prop="type" label="分区类型" align="center"></el-table-column>
                        <!-- <el-table-column prop="amount" label="机号数量" align="center"></el-table-column> -->
                        <el-table-column label="操作" align="center"> 
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" size="mini" @click="modifyZoneAt(scope.row)">编辑</el-button>

                                <!-- <el-popover placement="top" width="160" v-model="scope.row.willDelete">
                                    <el-button type="danger" slot="reference" icon="el-icon-delete" size="mini">删除</el-button>
                                    <p>确定要删除吗？</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button type="primary" size="mini" @click="scope.row.willDelete = true">确定</el-button>
                                        <el-button size="mini" @click="scope.row.willDelete = false">取消</el-button>
                                    </div>
                                </el-popover> -->
                            </template>  
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="机号列表">
                    <span slot="label"><i class="el-icon-document"></i> 机号列表</span>
                    <el-table :data="device_numbers" border>
                        <el-table-column prop="number" label="机号" align="center"> </el-table-column>
                        <el-table-column prop="zone_name" label="所属分区" align="center"></el-table-column>
                        <el-table-column prop="group_name" label="所属分组" align="center"></el-table-column>
                        <!-- <el-table-column prop="amount" label="机号数量" align="center"></el-table-column> -->
                        <el-table-column label="操作" align="center"> 
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" size="mini" @click="modifyDeviceNumberAt(scope.row)">编辑</el-button>

                                <!-- <el-popover placement="top" width="160" v-model="scope.row.visible">
                                    <p>确定要删除吗？</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button type="primary" size="mini" @click="scope.row.visible = false;">确定</el-button>
                                        <el-button size="mini" type="text" @click="scope.row.visible = false;">取消</el-button>
                                    </div>
                                    <el-button type="danger" slot="reference"  icon="el-icon-delete" size="mini">删除</el-button>
                                </el-popover> -->
                            </template>  
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="分组列表" >
                    <span slot="label"><i class="el-icon-setting"></i> 分组列表</span>
                    <el-table :data="groups" border>
                        <el-table-column prop="name" label="分组名称" align="center"></el-table-column>
                        <!-- <el-table-column prop="amount" label="机号数量" align="center"></el-table-column> -->
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" size="mini" @click="modifyGroupAt(scope.row)">编辑</el-button>

                                <!-- <el-popover placement="top" width="160" v-model="scope.row.visible">
                                    <p>确定要删除吗？</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button type="primary" size="mini" @click="scope.row.visible = false;">确定</el-button>
                                        <el-button size="mini" type="text" @click="scope.row.visible = false;">取消</el-button>
                                    </div>
                                    <el-button type="danger" slot="reference" icon="el-icon-delete" size="mini">删除</el-button>
                                </el-popover> -->
                            </template>  
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            
            <!-- <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="visible = false">确 定</el-button>            
                <el-button @click="visible = false">取 消</el-button>
            </span> -->
        </el-dialog>

        <!-- 子弹框 -->
        <div>
            <!-- 分区列表编辑弹窗 -->
            <el-dialog width="400px" :title="zone_form.id === 0 ? '新增分区' : '修改分区'" :visible.sync="showEditZone" append-to-body>
                <el-form :model="zone_form" ref="form_zone" :label-width="formLabelWidth">
                    <el-form-item label="分区名称 : " prop="name" :rules="[{required: true, message: '请输入分区名', trigger: 'blur'}]">
                        <el-input v-model="zone_form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="分区类型 : " prop="type" :rules="[{required: true, message: '请选择分区类型', trigger: 'blur'}]">
                        <el-select v-model="zone_form.type">
                            <el-option v-for="item in typeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="cancelModifyZone">取 消</el-button>
                        <el-button type="primary" @click="editZoneSubmitAction">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 分组列表编辑弹窗 -->
            <el-dialog width="400px" :title="group_form.id == 0 ? '新增分组' : '修改分组'" :visible.sync="showEditGroup" append-to-body>
                <el-form :model="group_form" ref="form_group" :label-width="formLabelWidth">
                    <el-form-item label="分组名称 : " prop="name" :rules="[{required: true, message: '请输入分组名', trigger: 'blur'}]">
                        <el-input v-model="group_form.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="editGroupSubmitAction">确 定</el-button>
                        <el-button @click="cancelModifyGroup">取 消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 机号列表编辑弹窗 -->
            <el-dialog width="400px" :title="number_form.id === 0 ? '新增机号' : '修改机号'" :visible.sync="showEditDeviceNumber" append-to-body>
                <el-form :model="number_form" ref="form_number" :label-width="formLabelWidth">
                    <el-form-item label="机号 : " prop="number" :rules="[{required: true, message: '请输入机号', trigger: 'blur'}]">
                        <el-input v-model="number_form.number"></el-input>
                    </el-form-item>
                    <el-form-item label="所属分区 : " prop="zone" :rules="[{required: true, message: '请选择分区', trigger: 'blur'}]">
                        <el-select v-model="number_form.zone">
                            <el-option v-for="item in zones" :label="item.name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属分组 : " prop="group" :rules="[{required: true, message: '请输入分组', trigger: 'blur'}]">
                        <el-select v-model="number_form.group">
                            <el-option v-for="item in groups" :label="item.name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="editDeviceNumberSubmitAction">确 定</el-button>
                        <el-button @click="cancelModifyDeviceNumber">取 消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {createZone, modifyZone, createGroup, modifyGroup, createDeviceNumber, modifyDeviceNumber} from '@/api/device/device'

export default {
    name:'PartitionDialog',
    data() {
        return {
            zone_form:{
                id: 0,
                name: '',
                type: ''
            },
            group_form:{
                id: 0,
                name: '',
            },
            number_form:{
                id: 0,
                number: '',
                zone: '',
                group: '',
            },
            typeOptions:[
                { value:1, label:'普通' },
                { value:2, label:'乙肝' }
            ],
            visible: false,
            formLabelWidth: '90px',

            showEditZone: false,
            showEditGroup: false,
            showEditDeviceNumber: false,
        }
    },
    props: {
        zones: {
            type: Array,
            require: true,
        },
        groups: {
            type: Array,
            require: true,
        },
        device_numbers: {
            type: Array,
            require: true,
        },
    },
    methods:{
        _close: function(done) {
            done()
        },
        show() {
            this.visible = true
        },
        hide() {
            this.visible = false
        },

        addAction() {
            var selectIndex = this.$refs.tabs.currentName
            if (selectIndex == 0) {
                this.addZoneAction()
            } else if (selectIndex == 1) {
                this.addDeviceNumberAction()
            } else if (selectIndex == 2) {
                this.addGroupAction()
            }
        },
        addZoneAction() {
            this.showEditZone = true
        },
        addGroupAction() {
            this.showEditGroup = true
        },
        addDeviceNumberAction() {
            this.showEditDeviceNumber = true
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
        modifyGroupAt(row) {
            this.group_form.id = row.id
            this.group_form.name = row.name
            this.showEditGroup = true
        },
        cancelModifyGroup() {
            this.group_form.id = 0
            this.group_form.name = ''
            this.$refs.form_group.clearValidate()
            this.showEditGroup = false
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
        editGroupSubmitAction() {
            this.$refs.form_group.validate(valid => {
                if (valid) {
                    if (this.group_form.id === 0) {
                        createGroup(this.group_form.name).then(rs => {
                            var resp = rs.data
                            if (resp.state === 1) {
                                var newGroup = resp.data.group
                                this.groups.push(newGroup)
                                this.cancelModifyGroup()

                            } else {
                                this.$message.error(resp.msg)
                            }
                        })
                        
                    } else {
                        modifyGroup(this.group_form.id, this.group_form.name).then(rs => {
                            var resp = rs.data
                            if (resp.state === 1) {
                                for (let index = 0; index < this.groups.length; index++) {
                                    const group = this.groups[index];
                                    if (group.id == this.group_form.id) {
                                        group.name = this.group_form.name
                                        break
                                    }
                                }
                                this.cancelModifyGroup()

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
                            if (resp.state === 1) {
                                for (let index = 0; index < this.device_numbers.length; index++) {
                                    const number = this.device_numbers[index];
                                    if (number.id == this.number_form.id) {
                                        number.number = this.number_form.number
                                        number.zone_id = this.number_form.zone
                                        number.group_id = this.number_form.group
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
        }
    }
}
</script>


<style scoped>
.addBtn{
    position: absolute;
    right:20px;
    top:90px;
    z-index: 999;
    cursor: pointer;
}

</style>
