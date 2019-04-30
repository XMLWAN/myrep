<!-- 使用登记 水处理机） -->
<template>
  <div class="app-container"> 
    <el-form ref="form" :model="form" label-width="130px">
        <el-row :gutter="20">
            <el-col :span="18">
              <el-form-item label="日期 : " class="is-required" style="width:314px;">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
              </el-form-item>  
            </el-col>
            <el-col :span="6" align="right" >
                <el-button type="primary" icon="el-icon-refresh"  @click="dialogTableVisible = true" >历史记录</el-button>              
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="8"  >
               <el-form-item label="系统运行正常 : "  >
                   <el-checkbox-group v-model="form.system">
                      <el-checkbox  name="type"></el-checkbox>
                    </el-checkbox-group>
               </el-form-item> 
            </el-col>
            <el-col :span="8"  >
               <el-form-item label="反渗膜消毒 : "    >
                    <el-checkbox-group v-model="form.reverse" size="medium">
                      <el-checkbox  name="type"></el-checkbox>
                    </el-checkbox-group>
               </el-form-item> 
            </el-col>
            <el-col :span="8"  >
               <el-form-item label="空气滤网清洁 : "   >
                   <el-checkbox-group v-model="form.clean">
                      <el-checkbox  name="type"></el-checkbox>
                    </el-checkbox-group>
               </el-form-item> 
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="8"  >
               <el-form-item label="预处理 原水压力 : "  style="float:left" >
                   <el-input v-model="form.pressure"></el-input>
               </el-form-item> 
               <span class="unit" >Mpa</span>
            </el-col>
            <el-col :span="8"  >
               <el-form-item label="过滤器更换 : "  style="float:left" >
                   <el-input v-model="form.filter"></el-input>
               </el-form-item> 
               <span class="unit" >只</span>
            </el-col>
            <el-col :span="8"  >
               <el-form-item label="软水硬度 : "   >
                   <el-input v-model="form.hardness"></el-input>
               </el-form-item> 
            </el-col>
        </el-row>

        <el-row :gutter="20">
            
            <el-col :span="8"  >
               <el-form-item label="再生盐桶加盐 : "  style="float:left" >
                   <el-input v-model="form.added"></el-input>
               </el-form-item> 
               <span class="unit" >袋</span>
            </el-col>
            <el-col :span="8"  >
               <el-form-item label="游离氯 : "   >
                   <el-input v-model="form.chlorine"></el-input>
               </el-form-item> 
            </el-col>
             <el-col :span="8"  >
               <el-form-item label="主机 水源电导度 : "   >
                   <el-input v-model="form.host "></el-input>
               </el-form-item> 
            </el-col>
        </el-row>

        <el-row :gutter="20">
           
            <el-col :span="8"  >
               <el-form-item label="一级电导度 : "   >
                   <el-input v-model="form.first"></el-input>
               </el-form-item> 
            </el-col>
            <el-col :span="8"  >
               <el-form-item label="二级电导度 : "   >
                   <el-input v-model="form.secondary"></el-input>
               </el-form-item> 
            </el-col>
            <el-col :span="8"  >
               <el-form-item label="供水压力 : "   >
                   <el-input v-model="form.supply"></el-input>
               </el-form-item> 
            </el-col>
        </el-row>

        <el-row :gutter="20">
           
            <el-col :span="8"  >
               <el-form-item label="供水温度 : "   >
                   <el-input v-model="form.temperature"></el-input>
               </el-form-item> 
            </el-col>
            <el-col :span="8"  >
               <el-form-item label="产水量 : "   >
                   <el-input v-model="form.rate"></el-input>
               </el-form-item> 
            </el-col>
            <el-col :span="8"  >
               <el-form-item label="回水量 : "  >
                   <el-input v-model="form.back"></el-input>
               </el-form-item> 
            </el-col>
        </el-row>
        
        

        <el-row :gutter="20">
            <el-col :span="24"  >
               <el-form-item label="备注 : " style="width:500px;" >
                   <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="form.textarea">
                    </el-input>
               </el-form-item> 
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="12"  >
               <el-form-item label="签名 : " class="is-required" >
                    <el-select v-model="form.sign" >
                    <el-option v-for="item in signOptions"  :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
               </el-form-item>
            </el-col>
            <el-col :span="12" align="right" >
               <el-form-item  class="is-required" >
                   <el-button type="primary" icon="el-icon-check"  >确定</el-button>
               </el-form-item>
            </el-col>
        </el-row>
    </el-form>

    <el-dialog title="(2)设备使用记录" :visible.sync="dialogTableVisible" width="90%" >
            <el-form  :model="layerForm" label-width="76px" :inline="true" class="layerForm" >
                <el-row :gutter="20">
                       <el-form-item label="日期 : " style="float:left;">
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="layerForm.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">到</el-col>
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="layerForm.date2" style="width: 100%;"></el-date-picker>                            
                            </el-col>
                         </el-form-item>
                         <el-form-item style="float:left;" >
                            <el-button type="primary" icon="el-icon-zoom-in" >查询</el-button>
                         </el-form-item>
                </el-row> 
            </el-form>  
            <el-table
                :data="tableData"   
                style="width: 100%">
                <el-table-column  prop="date" label="日期" min-width="40px;" align="center" > </el-table-column>
                <el-table-column label="预处理" align="center"  >
                    <el-table-column prop="pressure" label="原水压力" align="center" min-width="30px;" > </el-table-column>
                    <el-table-column prop="replacement" label="过滤器更换" align="center" min-width="40px;" > </el-table-column>
                    <el-table-column prop="hardness" label="软水硬度	" align="center" min-width="30px;" > </el-table-column>
                    <el-table-column prop="add" label="再生盐桶加盐" align="center" min-width="40px;" > </el-table-column>
                    <el-table-column prop="chlorine" label="游离氯" align="center" min-width="30px;" > </el-table-column>
                </el-table-column>    
                <el-table-column label="主机" align="center"  >
                    <el-table-column prop="source" label="源水电导度" align="center" min-width="40px;" > </el-table-column>
                    <el-table-column prop="order" label="一级电导度" align="center" min-width="40px;" > </el-table-column>
                    <el-table-column prop="conductance" label="二级电导度" align="center" min-width="40px;" > </el-table-column>
                    <el-table-column prop="Supply" label="供水压力" align="center" min-width="30px;" > </el-table-column>
                    <el-table-column prop="emperature" label="供水温度" align="center" min-width="30px;" > </el-table-column>
                    <el-table-column prop="rate" label="产水量" align="center" min-width="30px;" > </el-table-column>
                    <el-table-column prop="back" label="回水量" align="center" min-width="30px;" > </el-table-column>
                </el-table-column>
                <el-table-column  prop="system" label="系统运行（正常）" min-width="30px;" align="center" > </el-table-column>
                <el-table-column  prop="membrane" label="反渗膜（消毒）" min-width="30px;" align="center" > </el-table-column>
                <el-table-column  prop="air" label="空气滤网（清洁）" min-width="30px;" align="center" > </el-table-column>
                <el-table-column  prop="sign" label="签名" min-width="30px;" align="center" > </el-table-column>
                <el-table-column  prop="operation" label="操作" min-width="70px;" align="center" > 
                  <template  slot-scope="scope">
                    <el-button type="primary"   icon="el-icon-edit" size="mini"  ></el-button>
                    <!-- <el-button type="danger" slot="reference"  icon="el-icon-delete" size="mini" ></el-button> -->
                    <el-popover
                                placement="top"
                                width="160"
                                v-model="scope.row.visible">
                                <p>确定要删除吗？</p>
                                <div style="text-align: right; margin: 0">                       
                                    <el-button size="mini" type="text" @click="scope.row.visible = false;">取消</el-button>
                                    <el-button type="primary" size="mini" @click="scope.row.visible = false;">确定</el-button>     
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
    name:'waterPane',
    data() {
      return {
        layerForm:{
          date1: '',
          date2: '' 
        },
        tableData:[{
          date: '2018-09-03',
          pressure: '1',
          replacement: '1',
          hardness: '1',
          add: '1',
          chlorine: '1',
          source: '1',
          order: '1',
          conductance: '1',
          Supply: '1',
          emperature: '1',
          rate: '1',
          back: '1',
          system: '1',
          membrane: 'OK',
          air: 'OK',
          sign: 'OK',
          operation: '1'
        },
        {
          date: '2018-09-03',
          pressure: '1',
          replacement: '1',
          hardness: '1',
          add: '1',
          chlorine: '1',
          source: '1',
          order: '1',
          conductance: '1',
          Supply: '1',
          emperature: '1',
          rate: '1',
          back: '1',
          system: '1',
          membrane: 'OK',
          air: 'OK',
          sign: 'OK',
          operation: '1'
        }
        ],
        form: {
          date: '',
          pressure:'',
          filter:'',
          hardness:'',
          added:'',
          chlorine:'',
          host:'',
          first:'',
          secondary:'',
          supply:'',
          temperature:'',
          rate:'',
          back:'',
          rate:'',
          system:'',
          reverse:'',
          clean:'',
          textarea:'',
          sign:''
        },
        signOptions:[
            {value:'1',label:'张医生'},
            {value:'2',label:'王医生'},
            {value:'3',label:'李医生'},
            {value:'4',label:'柳医生'}
        ],
        dialogTableVisible: false,
      }
    }
}
</script>

<style  scoped>
.unit{
    height:36px;
    line-height: 36px;
    margin-left: 6px;
    font-size: 12px;
    display: inline-block;
}
</style>

