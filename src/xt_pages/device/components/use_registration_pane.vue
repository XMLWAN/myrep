<!-- 使用登记 （透析机） -->
<template>
    <div class="app-container">
        <el-form :model="form" label-width="90px">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="日期 : " class="is-required">
                        <el-date-picker type="date" v-model="form.date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="治疗方式 : " >
                        <el-select v-model="form.method" style="width:100%;" >
                            <el-option  v-for="item in methodOptions"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="实际超滤量 : ">
                        <el-input v-model="form.volume"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <div class="clearfix" style="width:100%;" >
                        <el-form-item label="班次 : " style="float:left;width:51%;" label-width="60px">
                            <el-select v-model="form.shift" >
                                <el-option v-for="item in shiftOptions"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="患者 : " style="float:left;width:47%;margin-left:2%;" label-width="50px">
                            <el-input v-model="form.patient"></el-input>
                        </el-form-item>
                    </div >
                    <el-form-item label="透析时长 : ">
                        <el-input v-model="form.duration"></el-input>
                    </el-form-item>
                    <el-form-item label="体重减少 : ">
                        <el-input v-model="form.weight"></el-input>
                    </el-form-item>
                </el-col>
             <el-col :span="6">
                 <el-form-item label="传染病 : ">
                    <el-input v-model="form.diseases"></el-input>
                </el-form-item>
                <el-form-item label="使用次数 : ">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                <el-form-item label="预警值 : ">
                    <el-input v-model="form.warning"></el-input>
                </el-form-item>
             </el-col  >
             <el-col :span="5" align="right" >
                 <el-button type="primary" icon="el-icon-refresh"  @click="dialogTableVisible = true" >历史记录</el-button>
             </el-col>
           </el-row>
           
           <el-row :gutter="20">
              <el-col :span="6">
                 <el-form-item label="运行 : ">
                    <el-radio-group v-model="form.run">
                      <el-radio v-for="item in runOptions"  :label="item.label" :value="item.value" :key="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                  <el-form-item label="故障发生阶段 : " label-width="104px" >
                    <el-radio-group v-model="form.stage">
                      <el-radio v-for="item in stageOptions"  :label="item.label" :value="item.value" :key="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
              </el-col>
           </el-row>

           <el-row :gutter="20">
             <el-col :span="10">
                <el-form-item label="故障描述 : ">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
             </el-col>  
             <el-col :span="12">
                <el-form-item label="故障提示信息及代码 : "  style=""   label-width="150px" >
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
             </el-col>
           </el-row>

           <span class="title">机器消毒 :</span>

           <el-row :gutter="20">
             <el-col :span="6">
                <el-form-item label="①机表: 消毒方式 : " label-width="126px">
                    <el-select v-model="form.way" >
                        <el-option v-for="item in wayOptions1"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="②液路: 消毒方式 : " label-width="126px" >
                    <el-select v-model="form.shift" >
                        <el-option v-for="item in wayOptions2"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="透析机消毒液 :" label-width="126px" prop="dialyzer">
                    <el-checkbox-group v-model="form.dialyzer" >
                      <el-checkbox label="更换" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="细菌过滤器 :" label-width="126px" prop="filter">
                    <el-checkbox-group v-model="form.filter">
                      <el-checkbox label="更换" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="空气滤网清洁 :" label-width="126px" prop="clean">
                    <el-checkbox-group v-model="form.clean">
                      <el-checkbox label="清洁" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                
             </el-col>
             <el-col :span="6">
                <el-form-item label="消毒液 : " >
                    <el-select v-model="form.disinfect1" >
                        <el-option v-for="item in disinfectOptions1"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消毒液 : "  >
                    <el-select v-model="form.disinfect2" >
                        <el-option v-for="item in disinfectOptions2"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称 : "  >
                    <el-select v-model="form.name1" >
                        <el-option v-for="item in nameOptions1"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="名称 : "  >
                    <el-select v-model="form.name2" >
                        <el-option v-for="item in nameOptions2"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item> 
             </el-col>
             <el-col :span="6">
                <el-form-item label="消毒状态 : "  >
                    <el-select v-model="form.xdzt1" >
                        <el-option v-for="item in xdztOptions1"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消毒状态 : "  >
                    <el-select v-model="form.xdzt2" >
                        <el-option v-for="item in xdztOptions2"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规格（L） : "  >
                    <el-input v-model="form.specification"></el-input>
                </el-form-item>
                <el-form-item label="数量 " >
                    <el-input v-model="form.amount"></el-input>
                </el-form-item>    
             </el-col>
             <el-col :span="6">
                <el-form-item label="消毒液浓度 : " >
                    <el-radio-group v-model="form.concentra">
                      <el-radio v-for="item in concentraOptions"  :label="item.label" :value="item.value" :key="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="消毒液残留 : " >
                    <el-radio-group v-model="form.residue">
                      <el-radio v-for="item in residueOptions"  :label="item.label" :value="item.value" :key="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="浓度 : " >
                    <el-radio-group v-model="form.nd">
                      <el-radio v-for="item in ndOptions"  :label="item.label" :value="item.value" :key="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
             </el-col>     
           </el-row>

           <el-row :gutter="20" align="right">
             <el-col :span="18">
                 <el-form-item label="签名 : " class="is-required" label-width="126px" >
                    <el-select v-model="form.sign" >
                        <el-option v-for="item in signOptions"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
             </el-col>
             <el-col :span="6" align="center">
                 <el-button type="primary" icon="el-icon-check"  >确定</el-button>
                 <el-button type="primary" plain icon="el-icon-plus" >新增</el-button>
             </el-col>
           </el-row>
        </el-form>


        <el-dialog title="(2)设备使用记录" :visible.sync="dialogTableVisible" width="90%" >
            <el-form  :model="layerForm" label-width="76px" :inline="true" class="layerForm" >
                <el-row :gutter="20">
                       <el-form-item label="机号 : "  style="float:left;">
                          <el-select v-model="form.cut" placeholder="请选择活动区域"  >
                            <el-option v-for="item in cutOptions"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                          </el-select>
                       </el-form-item>
                       <el-form-item label="日期 : " style="float:left;">
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">到</el-col>
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>                            
                            </el-col>
                         </el-form-item>
                         <el-form-item label="使用记录 : " style="float:left;" >
                            <el-select v-model="form.record" placeholder="请选择活动区域">
                              <el-option v-for="item in recordOptions"  :label="item.label" :value="item.value" :key="item.value"></el-option>                              
                            </el-select>
                         </el-form-item>
                         <el-form-item style="float:left;" >
                            <el-button type="primary" icon="el-icon-zoom-in" >查询</el-button>
                         </el-form-item>
                </el-row> 
            </el-form>  
            <el-table
                :data="tableData"   
                style="width: 100%">
                <el-table-column  prop="device" label="机号" min-width="20px;" align="center" > </el-table-column>
                <el-table-column  prop="data" label="日期" min-width="40px;" align="center" > </el-table-column>
                <el-table-column  prop="shift" label="班次" min-width="25px;" align="center" > </el-table-column>
                <el-table-column  prop="name" label="患者" min-width="25px;" align="center" > </el-table-column>
                <el-table-column  prop="use" label="使用次数" min-width="30px;" align="center" > </el-table-column>
                <el-table-column  prop="use" label="运行" min-width="30px;" align="center" > </el-table-column>
                <el-table-column label="机表消毒" align="center" min-width="70px;" >
                    <el-table-column prop="method1" label="消毒方式" align="center" min-width="33%;" > </el-table-column>
                    <el-table-column prop="juice1" label="消毒液" align="center" min-width="26%;" > </el-table-column>
                    <el-table-column prop="state1" label="消毒状态" align="center" min-width="33%;" > </el-table-column>
                    <el-table-column prop="concentration1" label="消毒液浓度" align="center" min-width="40%;" > </el-table-column>
                </el-table-column>
                <el-table-column label="液路消毒" align="center" min-width="70px;" >
                    <el-table-column prop="method2" label="消毒方式" align="center" min-width="33%;" > </el-table-column>
                    <el-table-column prop="juice2" label="消毒液" align="center" min-width="26%;" > </el-table-column>
                    <el-table-column prop="state2" label="消毒状态" align="center" min-width="33%;" > </el-table-column>
                    <el-table-column prop="concentration2" label="消毒液残留" align="center" min-width="40%;" > </el-table-column>
                </el-table-column>
                <el-table-column  prop="replacement" label="透析机消毒液（更换）" min-width="42px;" align="center" > </el-table-column>
                <el-table-column  prop="filter" label="细菌过滤器（更换）" min-width="40px;" align="center" > </el-table-column>
                <el-table-column  prop="cleaning" label="空气滤网（清洁）" min-width="30px;" align="center" > </el-table-column>
                <el-table-column  prop="sign" label="签名" min-width="30px;" align="center" > </el-table-column>
                <el-table-column  prop="operation" label="操作" min-width="60px;" align="center" > 
                  <template  slot-scope="scope">
                    <el-button type="primary"   icon="el-icon-edit" size="mini"></el-button>
                    <!-- <el-button type="danger" slot="reference"  icon="el-icon-delete" size="mini" ></el-button> -->
                     <el-popover
                                placement="top"
                                width="160"
                                v-model="scope.row.visible">
                                <p>确定要删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button type="primary" size="mini" @click="scope.row.visible = false;">确定</el-button>                            
                                    <el-button size="mini" type="text" @click="scope.row.visible = false;">取消</el-button>
                                </div>
                           <el-button type="danger" slot="reference"  icon="el-icon-delete" size="mini" ></el-button>
                     </el-popover>
                  </template> 
                </el-table-column>
                
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'UseRegistrationPane',
    
     data() {
      return {
        layerForm:[{
          cut:'',
          data1:'',
          data2:'',

        }],
        tableData:[{
          device: '1',
          data: '2018-10-20',
          shift: '上午',
          name: '翠花',
          use: '2',
          run:'正常',
          method1: '',
          juice1: '',
          state1: '已消毒',
          concentration1: '达标',
          method2: '/',
          juice2: '/',
          state2: '已消毒',
          state2: '无残留',
          concentration2: '',
          replacement: '',
          filter: '',
          cleaning: '',
          sign: '',
          operation: '',
        },
        {
          device: '2',
          data: '2018-10-20',
          shift: '上午',
          name: '翠花',
          use: '2',
          run:'正常',
          method1: '',
          juice1: '',
          state1: '已消毒',
          concentration1: '达标',
          method2: '/',
          juice2: '/',
          state2: '已消毒',
          state2: '无残留',
          concentration2: '',
          replacement: '',
          filter: '',
          cleaning: '',
          sign: '',
          operation: '',
        }
        ],
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        visible2: false,
        form: {
          date: '', 
          region: '',
          volume:'',
          run:'正常',
          shift:'',
          patient:'',
          duration:'',
          weight:'',
          diseases:'',
          number:'',
          warning:'',
          stage:'',
          description:'',
          code:'',
          dialyzer:'',
          filter:'',
          clean:'',
          sign:'',
          way:'',
          disinfect1:'',
          disinfect2:'',
          name1:'',
          name2:'',
          xdzt1:'',
          xdzt2:'',
          specification:'',
          amount:'',
          concentra:'达标',
          residue:'有',
          nd:''

        },
        methodOptions:[
            {value:'1',label:'HD'},
            {value:'2',label:'HDF'}
        ],
        runOptions:[
            {value:'1',label:'正常'},
            {value:'2',label:'故障'}
        ],
        shiftOptions:[
            {value:'1',label:'上午'},
            {value:'2',label:'下午'},
            {value:'3',label:'晚上'}
        ],
        stageOptions:[
            {value:'1',label:'开机启动'},
            {value:'2',label:'自检'},
            {value:'3',label:'准备'},
            {value:'4',label:'治疗'},
            {value:'5',label:'消毒'}
        ],
        wayOptions1:[
            {value:'1',label:'化学消毒'},
            {value:'2',label:'物理'}
        ],
         wayOptions2:[
            {value:'1',label:'热化学'},
            {value:'2',label:'清洗'}
        ],
        disinfectOptions1:[
            {value:'1',label:'0.22%季铵盐'},
            {value:'2',label:'500mg/l含氯消毒剂'},
            {value:'3',label:'1000mg/l含氯消毒剂'},
            {value:'4',label:'1500mg/l含氯消毒剂'}
        ],
        disinfectOptions2:[
            {value:'1',label:'0.22%季铵盐'},
            {value:'2',label:'500mg/l含氯消毒剂'},
            {value:'3',label:'1000mg/l含氯消毒剂'},
            {value:'4',label:'1500mg/l含氯消毒剂'}
        ],
        nameOptions1:[
            {value:'1',label:'不知是啥'}
        ],
        nameOptions2:[
            {value:'1',label:'不知是啥'}
        ],
        concentraOptions:[
            {value:'1',label:'达标'},
            {value:'2',label:'未达标'}
        ],
        residueOptions:[
            {value:'1',label:'有'},
            {value:'2',label:'无'}
        ],
        ndOptions:[
            {value:'1',label:'达标'},
            {value:'2',label:'未达标'}
        ],
        signOptions:[
            {value:'1',label:'张三'},
            {value:'2',label:'李四'}
        ],
        xdztOptions1:[
            {value:'1',label:'已消毒'},
            {value:'2',label:'正在消毒'}
        ],
        xdztOptions2:[
            {value:'1',label:'已消毒'},
            {value:'2',label:'正在消毒'}
        ],
        cutOptions:[
            {value:'1',label:'1'},
            {value:'2',label:'2'},
            {value:'2',label:'3'},
            {value:'2',label:'4'}
        ],
        recordOptions:[
            {value:'1',label:'全部'},
            {value:'2',label:'更换透析'},
            {value:'2',label:'更换'},
            {value:'2',label:'清洁空气'}
        ]
      };
    }
}
</script>

<style rel="stylesheet/css" lang="scss" scoped>
.app-container{
    .title{
        font-size: 16px;
        margin: 0 0 22px 0;
        display: block; 
    }
    .el-dialog{
    .el-dialog__body{
        padding: 10px;
      }
    } 
}

</style>


