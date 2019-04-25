const global_config = {
    state:{
        patient_types:[//患者类型
            {id:1,name:"血透患者",type:1},
            {id:2,name:"腹透患者",type:2},
        ],
        partitions:[//病区
            {id:1, name:"A区"},
            {id:2, name:"B区"},
            {id:3, name:"C区"},
        ],
        marital_options:[//婚姻状况
            {id:1, name:"未婚"},
            {id:2, name:"已婚"},
            {id:3, name:"离异"},
        ],
        reimbursement_ways:[//报销方式
            {id:1, name:"职工医保"},
            {id:2, name:"居民医保"},
            {id:3, name:"离休医保"},
            {id:4, name:"杭州医保"},
            {id:5, name:"退休医保"},
            {id:6, name:"其他"},
            {id:7, name:"异地市域"},
            {id:8, name:"异地省域"},
        ],
        blood_types:[//血型
            {id:1, name:"A"},
            {id:2, name:"B"},
            {id:3, name:"AB"},
            {id:4, name:"O"},
            {id:5, name:"不详"},
        ],
        rh:[
            {id:1, name:"阴性"},
            {id:2, name:"阳性"},
            {id:3, name:"不详"},
            {id:4, name:"未查"},
        ],
        education_types:[//文化程度
            { id: 1, name: "小学毕业" },
            { id: 2, name: "初中毕业" },
            { id: 3, name: "高中毕业" },
            { id: 4, name: "中等技术学校,职业学校毕业" },
            { id: 5, name: "大专或大学毕业" },
            { id: 6, name: "硕士以上" }
        ],
        profession_options:[//职业
            { id: 1, name: "在家" },
            { id: 2, name: "国家,党群组织,企事业人员" },
            { id: 3, name: "专业技术人员" },
            { id: 4, name: "非技术工作或普通工人" },
            { id: 5, name: "商业,服务业人员" },
            { id: 6, name: "农业,牧渔,水利生产人员" },
            { id: 7, name: "生产,运输设备操作人员及有关人员" },
            { id: 8, name: "军人" },
            { id: 9, name: "不便分类的其他人员" },
            { id: 10, name: "无业" }
        ],
        induction_options:[//诱导期
            { id: 1, name: "无" },
            { id: 2, name: "一周" },
            { id: 3, name: "两周" },
            { id: 4, name: "三周" },
            { id: 5, name: "四周" },
            { id: 6, name: "五周" },
            { id: 7, name: "六周" },
            { id: 8, name: "七周" },
            { id: 9, name: "八周" }
        ],
        contagions:[//传染病
            { id: 1, name: "普通",type:1 },
            { id: 2, name: "乙肝",type:2 },
            { id: 3, name: "丙肝",type:2 },
            { id: 4, name: "艾滋病",type:2 },
            { id: 5, name: "肺结核",type:2 },
            { id: 6, name: "梅毒",type:2 },
        ],
        disease:[//慢性病
            { id: 1, name: "慢性病" },
            { id: 2, name: "神经病" },
            { id: 3, name: "抑郁症" },
        ],
        treatment_mode: {//治疗模式
            1:{id:1, name:"HD",dialysis_duration:1, replacement_way:2,hemodialysis_machine:1,blood_filter:2,perfusion_apparatus:2,blood_flow_volume:1,dialysate_flow:1,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            2:{id:2, name:"HDF",dialysis_duration:1, replacement_way:1,hemodialysis_machine:2,blood_filter:1,perfusion_apparatus:2,blood_flow_volume:1,dialysate_flow:1,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            3:{id:3, name:"HD+HP",dialysis_duration:1, replacement_way:2,hemodialysis_machine:1,blood_filter:2,perfusion_apparatus:1,blood_flow_volume:1,dialysate_flow:1,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            4:{id:4, name:"HP",dialysis_duration:1, replacement_way:2,hemodialysis_machine:2,blood_filter:2,perfusion_apparatus:1,blood_flow_volume:1,dialysate_flow:2,kalium:2,sodium:2,calcium:2,bicarbonate:2},
            5:{id:5, name:"HF",dialysis_duration:1, replacement_way:1,hemodialysis_machine:2,blood_filter:1,perfusion_apparatus:2,blood_flow_volume:1,dialysate_flow:2,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            6:{id:6, name:"SCUF",dialysis_duration:1, replacement_way:2,hemodialysis_machine:1,blood_filter:2,perfusion_apparatus:2,blood_flow_volume:1,dialysate_flow:2,kalium:2,sodium:2,calcium:2,bicarbonate:2},
            7:{id:7, name:"IUF",dialysis_duration:1, replacement_way:2,hemodialysis_machine:1,blood_filter:2,perfusion_apparatus:2,blood_flow_volume:2,dialysate_flow:2,kalium:2,sodium:2,calcium:2,bicarbonate:2},
            8:{id:8, name:"HFHD",dialysis_duration:1, replacement_way:2,hemodialysis_machine:1,blood_filter:2,perfusion_apparatus:2,blood_flow_volume:1,dialysate_flow:1,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            9:{id:9, name:"HFHD+HP",dialysis_duration:1, replacement_way:2,hemodialysis_machine:1,blood_filter:2,perfusion_apparatus:1,blood_flow_volume:1,dialysate_flow:1,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            10:{id:10, name:"PHF",dialysis_duration:1, replacement_way:1,hemodialysis_machine:2,blood_filter:1,perfusion_apparatus:2,blood_flow_volume:1,dialysate_flow:1,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            11:{id:11, name:"HFR",dialysis_duration:1, replacement_way:2,hemodialysis_machine:2,blood_filter:1,perfusion_apparatus:1,blood_flow_volume:1,dialysate_flow:1,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            12:{id:12, name:"HDF+HP",dialysis_duration:1, replacement_way:1,hemodialysis_machine:2,blood_filter:1,perfusion_apparatus:1,blood_flow_volume:1,dialysate_flow:1,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            13:{id:13, name:"CRRT",dialysis_duration:1, replacement_way:1,hemodialysis_machine:2,blood_filter:1,perfusion_apparatus:2,blood_flow_volume:1,dialysate_flow:2,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            14:{id:14, name:"腹水回输",dialysis_duration:1, replacement_way:2,hemodialysis_machine:1,blood_filter:2,perfusion_apparatus:2,blood_flow_volume:2,dialysate_flow:2,kalium:2,sodium:2,calcium:2,bicarbonate:2},
            15:{id:15, name:"HD前置换",dialysis_duration:1, replacement_way:2,hemodialysis_machine:1,blood_filter:2,perfusion_apparatus:2,blood_flow_volume:1,dialysate_flow:1,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            16:{id:16, name:"HD后置换",dialysis_duration:1, replacement_way:2,hemodialysis_machine:1,blood_filter:2,perfusion_apparatus:2,blood_flow_volume:1,dialysate_flow:1,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            17:{id:17, name:"HDF前置换",dialysis_duration:1, replacement_way:1,hemodialysis_machine:2,blood_filter:1,perfusion_apparatus:2,blood_flow_volume:1,dialysate_flow:1,kalium:1,sodium:1,calcium:1,bicarbonate:1},
            18:{id:18, name:"HDF后置换",dialysis_duration:1, replacement_way:1,hemodialysis_machine:2,blood_filter:1,perfusion_apparatus:2,blood_flow_volume:1,dialysate_flow:1,kalium:1,sodium:1,calcium:1,bicarbonate:1},

        },
        anticoagulants_confit:{//抗凝剂
            1:{id:1, name:"无肝素",    type:1, shouji:2, weichi:2, zongliang:2, gaimingcheng:-1, gaijiliang:-1, shouji_unit:"mg", weichi_unit:"mg/h", zongliang_unit:"mg", gaimingcheng_unit:"", gaijiliang_unit:""},
            2:{id:2, name:"普通肝素",  type:1, shouji:1, weichi:1, zongliang:1, gaimingcheng:-1, gaijiliang:-1, shouji_unit:"mg", weichi_unit:"mg/h", zongliang_unit:"mg", gaimingcheng_unit:"", gaijiliang_unit:""},
            3:{id:3, name:"低分子肝素",type:1, shouji:-1, weichi:-1, zongliang:1,  gaimingcheng:-1, gaijiliang:-1, shouji_unit:"lu", weichi_unit:"lu", zongliang_unit:"lu", gaimingcheng_unit:"", gaijiliang_unit:""},
            4:{id:4, name:"阿加曲班", type:1, shouji:1, weichi:1, zongliang:1, gaimingcheng:-1, gaijiliang:-1, shouji_unit:"mg", weichi_unit:"mg/h", zongliang_unit:"mg", gaimingcheng_unit:"", gaijiliang_unit:""},
            5:{id:5, name:"枸橼酸钠", type:1, shouji:-1, weichi:1, zongliang:-1, gaimingcheng:1, gaijiliang:1, shouji_unit:"", weichi_unit:"ml/h", zongliang_unit:"", gaimingcheng_unit:"ml/h", gaijiliang_unit:""},
        },
        anticoagulants_set:{
            type:2,
        },
        replacement_ways:[
            {id:1, name:"前置换"},
            {id:2, name:"后置换"},
            {id:3, name:"中置换"},
            {id:4, name:"混合置换"},
        ],
        blood_filters:[
            {id:1, name:"血滤器1"},
            {id:2, name:"血滤器2"},
            {id:3, name:"血滤器3"},
            {id:4, name:"血滤器4"},
        ],
        perfusion_apparatus:[
            {id:1, name:"灌流器1"},
            {id:2, name:"灌流器2"},
            {id:3, name:"灌流器3"},
            {id:4, name:"灌流4"},
        ],
        hemodialysis_machines:[
            {id:1, name:"血透器1"},
            {id:2, name:"血透器2"},
            {id:3, name:"血透器3"},
            {id:4, name:"血透器4"},
        ],
        vascular_access:{
            1:{id:1, name:'左侧'},
            2:{id:2, name:'右侧'},
            3:{id:3, name:'左鼻咽窝'},
            4:{id:4, name:'右鼻咽窝'},
            5:{id:5, name:'左前臂腕部'},
            6:{id:6, name:'右前臂腕部'},
            7:{id:7, name:'左前臂'},
            8:{id:8, name:'右前臂'},
            9:{id:9, name:'左上臂'},
            10:{id:10, name:'右上臂'},
            11:{id:11, name:'左下肢'},
            12:{id:12, name:'右下肢'},
        },
        vascular_access_desc:{
            1:{id: 1, name: '自体内瘘'},
            2:{id: 2, name: '人造血管'},
            3:{id: 3, name: '直穿'},
            4:{id: 4, name: '颈内静脉'},
            5:{id: 5, name: '股静脉'},
            6:{id: 6, name:'动脉直穿'},
            7:{id: 7, name:'动静脉直穿'},
            8:{id: 8, name:'带隧道带绦纶套股静脉导管'},
            9:{id: 9, name:'带隧道带绦纶套锁骨下静脉导管'},
            10:{id: 10, name:'带隧道带绦纶套颈内静脉导管'},
            11:{id: 11, name:'无绦纶套股静脉导管'},
            12:{id: 12, name:'无绦纶套锁骨下静脉导管'},
            13:{id: 13, name:'无绦纶套颈内静脉导管'},
            14:{id: 14, name:'直线型移植血管动静脉内瘘'},
            15:{id: 15, name:'自体动静脉内瘘'},
            16:{id: 16, name:'袢型移植血管动静脉内瘘'},
            17:{id: 17, name:'静脉直穿'},
        },

        // 透析液配方
        dialysate_formulation: [
            {id: 1, value:"常规", name:"常规"},
            {id: 2, value:"低钙(1.25mmol/L)", name:"低钙(1.25mmol/L)"},
            {id: 3, value:"高钙(1.75mmol/L)", name:"高钙(1.75mmol/L)"},
            {id: 4, value:"低钠(135mmol/L)", name:"低钠(135mmol/L)"},
            {id: 5, value:"高钠(145mmol/L)", name:"高钠(145mmol/L)"},
        ],


      symptoms:[
        {id:1, name:'血压下降'},
        {id:2, name:'恶心呕吐'},
        {id:3, name:'肌肉痉挛'},
        {id:4, name:'血压增高'},
        {id:5, name:'头痛'},
        {id:6, name:'胸痛，背痛'},
        {id:7, name:'休克'},
        {id:8, name:'低血糖'},
        {id:9, name:'皮肤瘙痒'},
        {id:10, name:'静脉压高'},
        {id:11, name:'静脉压低'},
        {id:12, name:'血流量不足'},
        {id:13, name:'透析中体外循环凝血'},
        {id:14, name:'胃寒发热'},
        {id:15, name:'无肝素透析'},
        {id:16, name:'穿刺部位渗血'},
        {id:17, name:'A端穿刺点脓性分泌物，更换穿刺点'},
        {id:18, name:'A端穿失败至血肿'},
        {id:19, name:'穿刺针脱落'},
        {id:20, name:'导管相关血流感染'},
        {id:21, name:'导管出口处感染:红肿热痛，有异味'},
        {id:22, name:'首次使用综合症'},
        {id:23, name:'失衡综合症'},
        {id:24, name:'意识障碍'},
        {id:25, name:'空气栓塞'},
        {id:26, name:'透析器破膜'},
        {id:27, name:'透析器反应'},
        {id:28, name:'下机拔针动脉渗血'},
        {id:29, name:'下机拔针京脉渗血'},
      ],


      deals:[
        {id:1, name:'立即汇报医生'},
        {id:2, name:'遵医嘱'},
        {id:3, name:'暂停超滤'},
        {id:4, name:'降低血流量'},
        {id:5, name:'头低足高位'},
        {id:6, name:'0.9%NS100ml输注'},
        {id:7, name:'密切观察病情变化'},
        {id:8, name:'提前结束透析'},
        {id:9, name:'透析平卧，头偏向一侧'},
        {id:10, name:'保持呼吸道通畅'},
        {id:11, name:'挤压按摩痉挛肌肉'},
        {id:12, name:'按医嘱用药'},
        {id:13, name:'指测血糖'},
        {id:14, name:'进食糖块'},
        {id:15, name:'安抚患者，减轻患者紧张情绪'},
        {id:16, name:'停止透析，丢弃透析器及管路内的血液'},
      ],


      results:[
        {id:1, name:'症状好转'},
        {id:2, name:'症状好转,继续脱水'},
        {id:3, name:'低血糖纠正'},
        {id:4, name:'症状消失'},
        {id:5, name:'回血后症状好转'},
        {id:6, name:'其他'},
        {id:7, name:'血糖mmol/l'},
        {id:8, name:'家属要求结束透析'},
        {id:9, name:'内瘘穿刺不顺利'},
        {id:10, name:'内瘘穿刺不顺利-静脉端'},
        {id:11, name:'局部血肿瘀血'},
        {id:12, name:'瘢痕'},
        {id:13, name:'血管条件差'},
        {id:14, name:'血流量不足'},
        {id:15, name:'血肿：无'},
        {id:16, name:'血肿：有，5x5cm'},
        {id:17, name:'动脉穿刺2针'},
        {id:18, name:'静脉穿刺2针'},
        {id:19, name:'下针拔针不顺利'},
        {id:20, name:'血肿：有，5x5cm'}
      ],


      dialysis_duration:[
        {id:1, name:'无症状'},
        {id:2, name:'耳鸣'},
        {id:3, name:'出汗'},
        {id:4, name:'食欲差'},
        {id:5, name:'血压偏高'},
        {id:6, name:'四肢无力，口周发麻'},
        {id:7, name:'腹泻'},
        {id:8, name:'肢体偏瘫活动'},
        {id:9, name:'胸闷'},
        {id:10, name:'黑便'},
        {id:11, name:'咳嗽'},
      ],

      last_dialysis_after:[
        {id:1, name:'无症状'},
        {id:2, name:'耳鸣'},
        {id:3, name:'出汗'},
        {id:4, name:'乏力'},
        {id:5, name:'呕吐'},
        {id:6, name:'胸闷'},
        {id:7, name:'出血'},
        {id:8, name:'深昏迷'},
        {id:9, name:'腹泻'},
        {id:10, name:'痉挛'},
        {id:11, name:'头晕'},
        {id:12, name:'出血'},
        {id:13, name:'恶心'},
        {id:14, name:'头痛'},
        {id:15, name:'发热'},
      ],

     dialysis_before:[
        {id:1, name:'无症状'},
        {id:2, name:'耳鸣'},
        {id:3, name:'出汗'},
        {id:4, name:'乏力'},
        {id:5, name:'呕吐'},
        {id:6, name:'胸闷'},
        {id:7, name:'出血'},
        {id:8, name:'深昏迷'},
        {id:9, name:'腹泻'},
        {id:10, name:'痉挛'},
        {id:11, name:'头晕'},
        {id:12, name:'出血'},
        {id:13, name:'恶心'},
        {id:14, name:'头痛'},
        {id:15, name:'发热'},
      ],

      internal_fistula:[
        {id:1, name:'震颤-存在'},
        {id:2, name:'震颤-减弱'},
        {id:3, name:'震颤-无'},
        {id:4, name:'内瘘皮肤-正常'},
        {id:5, name:'内瘘皮肤-瘀斑'},
        {id:6, name:'内瘘皮肤-红'},
        {id:7, name:'内瘘皮肤-肿'},
        {id:8, name:'无搏动'},
        {id:9, name:'皮下瘀血'},
        {id:10, name:'内瘘术后待成熟，可及震颤'},
        {id:11, name:'内瘘PTA术后一天，震颤强'},
        {id:12, name:'内瘘首次使用穿刺顺利'},
        {id:13, name:'血管狭窄'},
        {id:14, name:'肿胀手综合征'},
        {id:15, name:'正常'},
        {id:16, name:'血管震颤减弱'},
        {id:17, name:'穿刺部位肿胀'},
        {id:18, name:'手指发冷、苍白、发绀'},
        {id:19, name:'内瘘原血管重建术后，切口干燥'},
        {id:20, name:'血栓'},
        {id:21, name:'血管瘤样扩张'},
        {id:22, name:'内瘘感染'},
      ],

      catheter:[
        {id:1, name:'穿刺口-干洁'},
        {id:2, name:'穿刺口-红肿'},
        {id:3, name:'穿刺口-分泌物'},
        {id:4, name:'穿刺口-渗血'},
        {id:5, name:'导管打折'},
        {id:6, name:'导管堵塞'},
        {id:7, name:'皮导管出口处感染：红肿热痛、有异味下瘀血'},
        {id:8, name:'缝线脱落'},
        {id:9, name:'导管同侧肢体肿胀'},
        {id:10, name:'内瘘首次使用穿刺顺利'},
        {id:11, name:'导管破损'},
        {id:12, name:'正常'},
        {id:13, name:'导管相关血流感染'},
        {id:14, name:'导管出口处渗血'},
        {id:15, name:'导管脱落'},
        {id:16, name:'头面部肿胀'},
      ],

      complication:[
        {id:1, name:'低血压'},
        {id:2, name:'高血压'},
        {id:3, name:'心律失常'},
        {id:4, name:'头晕'},
        {id:5, name:'头痛'},
        {id:6, name:'呕吐'},
        {id:7, name:'抽搐'},
        {id:8, name:'出血'},
        {id:9, name:'心衰'},
        {id:10, name:'腹痛'},
        {id:11, name:'痔疮出血'},
        {id:12, name:'鼻腔出血'},
        {id:13, name:'脑梗塞'},
        {id:14, name:'外伤'},
        {id:15, name:'呼吸道感染'},
        {id:16, name:'其他'},
        {id:17, name:'右耻骨下支骨折'},
        {id:18, name:'上消化道出血'},
        {id:19, name:'牙龈出血'},
        {id:20, name:'出血-其他'},
        {id:21, name:'手术后一周'},
        {id:22, name:'肿瘤'},
        {id:23, name:'肠道感染'},
      ],

      cruor:[
        {id:1, name:'透析器-0度'},
        {id:2, name:'透析器-Ⅰ度'},
        {id:3, name:'透析起-Ⅱ度'},
        {id:4, name:'透析起-Ⅲ度'},
        {id:5, name:'动脉壶凝血块'},
        {id:6, name:'静脉壶凝血块'},
        {id:7, name:'体外循环完全凝血'},
        {id:8, name:'更换透析器'},
        {id:9, name:'更换管路'},
      ],


       summary : [
        {id: 1, value: '嘱少食含钾高的食物，告知含钾高的代表食物及降低钾摄入的烹调方法', text: '高钾'},
        {id: 2, value: '告知内瘘术后注意事项', text: '内瘘术后'},
        {id: 3, value: '告知内瘘自我护理要点', text: '内瘘护理'},
        {id: 4, value: '嘱做好个人卫生', text: '卫生'},
        {id: 5, value: '嘱控制水分摄入，饮食清淡，保持透析间期体重增加在合理范围。', text: '控水摄入'},
        {id: 6, value: '告知中心静脉置管注意事项。', text: '导管护理'},
        {id: 7, value: '中心静脉导管新置入，予以妥善固定，防止牵扯，注意观察有无渗血，及时告知医护人员。', text: '新置导管'},
        {id: 8, value: '告知人造血管自我护理要点', text: '人造血管护理'},
        {id: 9, value: '血压偏高，请按医嘱规律服药，透析间期监测血压并记录，有不适随诊。', text: '血压管理'},
        {id: 10, value: '结束后血压低，嘱休息半小时测血压平稳后离院，途中注意安会，出现头昏、出汗等低血压症状立即平卧并与医生联系，同时监测内瘘功能。', text: '内瘘低血压'},
        {id: 11, value: '导管口轻压可见分泌物，红、痛不明显，百多邦药膏外用，嘱注意个人卫生。', text: '导管口感染'},
      ],


      good_unit:[
        {id:1, name:'支'},
        {id:2, name:'条'},
        {id:3, name:'盒'},
        {id:4, name:'包'},
        {id:5, name:'件'},
        {id:6, name:'个'},
        {id:7, name:'套'},
        {id:8, name:'袋'},
        {id:9, name:'箱'},
        {id:10, name:'瓶'},
        {id:11, name:'付'},
        {id:12, name:'颗'},
        {id:13, name:'根'},
        {id:14, name:'桶'},
        {id:15, name:'台'},
        {id:16, name:'张'},
        {id:17, name:'把'},
        {id:18, name:'卷'},
        {id:19, name:'块'},
        {id:20, name:'双'},
        {id:21, name:'人份'},
      ]

    },
    mutations:{
        SET_PATIENT_TYPE:(state, patientTypes)=>{
            state.patient_types = patientTypes
        }
    },
    action:{

    }
}


export default global_config
