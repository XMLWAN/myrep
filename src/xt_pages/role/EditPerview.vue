<template>
    <div class="app-container">
        <template v-if="purviews.length > 0">
            <el-row>
                <el-col :span="24">
                    <div style="margin-bottom: 20px;">
                        <el-tree :props="treeProps" :data="purviews" :default-checked-keys="default_checkeds" node-key="id" ref="tree" default-expand-all show-checkbox>
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span>{{ data.name }}</span>
                            </span>
                        </el-tree>
                    </div>
                </el-col>
                <el-col :span="24">
                    <router-link :to="{ path:'/role/manage' }">
                        <el-button>取消</el-button>
                    </router-link>
                    <el-button type="primary" @click="submitAction()">确定</el-button>
                </el-col>
            </el-row>
        </template>
    </div>
</template>

<script>
import {getEditPurviewInitData, editPurview} from '@/api/role/role'

export default {
    name: 'EditPerview',
    data() {
        return {
            role_id: 0,
            purviews: [], // [{id, pid, name, childs}]
            treeProps: {
                label: "name",
                children: "childs"
            },
            // role_purview_ids: '',
            default_checkeds: []
        }
    },
    created() {
        var id = parseInt(this.$route.query.id)
        if (id <= 0) {
            this.$message.error("参数错误")
            return
        }
        this.role_id = id
        getEditPurviewInitData(this.role_id).then(rs => {
            var resp = rs.data
            if (resp.state === 1) {
                this.purviews.push(...resp.data.purviews)

                // 初始化默认选中项
                var role_purview_ids = resp.data.role_purview_ids
                // role_purview_ids = '48,49,50'
                var checkeds = []
                if (role_purview_ids.length > 0) {
                    var ids = role_purview_ids.split(",")
                    this.purviews.forEach(purview => {
                        if (purview.childs != null && purview.childs.length > 0) {
                            purview.childs.forEach(child => {
                                if (ids.indexOf(child.id+"") != -1) {
                                    checkeds.push(child.id)
                                }
                            });
                            
                        } else {
                            if (ids.indexOf(purview.id+"") != -1) {
                                checkeds.push(purview.id)
                            }
                        }
                    });
                }
                this.default_checkeds = checkeds
                
            } else {
                this.$message.error(resp.msg)
            }

        }).catch(err => {
            this.$message.error(err)
        })
    },
    methods: {
        submitAction: function() {
            if (this.role_id <= 0) {
                return
            }

            var checkeds = this.$refs.tree.getCheckedKeys(true)
            var ids = []
            if (checkeds.length > 0) {
                this.purviews.forEach(purview => {
                    if (purview.childs != null && purview.childs.length > 0) {
                        purview.childs.forEach(child => {
                            if (checkeds.indexOf(child.id) != -1) {
                                if (ids.indexOf(purview.id) == -1) {
                                    ids.push(purview.id)
                                }
                                ids.push(child.id)
                            }
                        })
                        
                    } else {
                        if (checkeds.indexOf(purview.id) != -1) {
                            ids.push(purview.id)
                        }
                    }
                });
            }
            var idsStr = ""
            if (ids.length > 0) {
                idsStr = ids.join(",")
            }
            
            editPurview(this.role_id, idsStr).then(rs => {
                var resp = rs.data
                if (resp.state === 1) {
                    this.$router.back(-1)
                    
                } else {
                    this.$message.error(resp.msg)
                }
            }).catch(err => {
                this.$message.error(err)
            })
        }
    }
}
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 17px;
    padding-left: 10px;
  }
  .el-tree-node__content {
      height: 40px;
  }
</style>