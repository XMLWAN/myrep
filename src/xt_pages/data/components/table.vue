<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
    </div> -->

    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row @current-change="handleRowChange"
      style="width: 100%;min-height:500px;">
      <!-- <el-table-column align="center" :label="$t('table.id')" width="65" @click="handleUpdate(scope.row)">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column> -->
      <el-table-column  align="center" label="名称">
        <template slot-scope="scope">
          <!-- <span @click="handleUpdate(scope.row)">{{scope.row.name}}</span> -->
          <span >{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="字段名">
        <template slot-scope="scope">
          <span>{{scope.row.field_name}}</span>
        </template>
      </el-table-column>

    </el-table>

    <!-- <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div> -->

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 500px; margin-left:50px;'>
        <el-form-item :label="$t('data_config.config_name')"  prop="config_name">
          <el-input v-model="temp.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item :label="$t('data_config.config_field')" prop="config_field">
          <el-input v-model="temp.field_name" placeholder="请输入字段名称"></el-input>
        </el-form-item>
        <el-form-item :label="$t('data_config.remark')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入备注" v-model="temp.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"> </el-table-column>
        <el-table-column prop="pv" label="Pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { createConfig,createChildConfig } from '@/api/data'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import store from '@/store'
import bus from '@/assets/eventBus'
import {getDataConfig} from '@/utils/data'

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  props: {
    type: {
      type: String,
      default: 'patient'
    }
  },
  data() {
    return {
      currentId: undefined,
      tableKey: 0,
      // list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: this.type,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      // calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        parent_id: 0,
        module: this.type,
        org_id:0,
        name: '',
        field_name: undefined,
        value: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        field_name: [{ required: true, message: '请输入字段名', trigger: 'blur' }],
        config_value: [{ required: false, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  watch: {
    'temp.config_field':function(){
        this.temp.config_field =  this.temp.config_field.replace(/[^A-Za-z]/g,'');
    }
  },
  computed:{
    list: function() {
      // const list = store.getters.configlist[this.type]
      // this.total = list.length
      return store.getters.configlist[this.type]
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    fieldChange:function(newValue){
      this.temp.config_field = newValue.replace(/[^A-Za-z]/g,'');
    },
    handleRowChange(currentRow, oldCurrentRow){
      if(currentRow != undefined){
        this.currentId = currentRow.id
        bus.$emit('parentChangeId',currentRow)
      }
    },
    getList() {
      // debugger
      // var test = getConfig('patient','blood_types')
      this.listLoading = true
      setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        parent_id: 0,
        module: this.type,
        org_id:0,
        name: '',
        field_name: undefined,
        value: '',
        remark: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createConfig(this.temp).then(response => {
            if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
                reject('error')
            }
            if (response.data.state === 0) {
              this.$message.error(response.data.msg);
            }
            const result = response.data.data.dataconfig
            // 更新store
            store.dispatch('updateConfigList',result).then(() => {
           
            })

            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
