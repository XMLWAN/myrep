import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const xt_constantRouterMap = [
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/token/verify', component: () => import('@/xt_pages/index/verify_token'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      component: () => import('@/xt_pages/home/index'),
      name: 'home',
      meta: { title: 'home', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/service',
    component: Layout,
    // redirect: '/service',
    hidden: true,
    is_menu: false,

    meta: { title: 'service', icon: 'shebei' },
    children: [{
        path: '/service',
        component: () => import('@/xt_pages/service/index'),
        hidden: true,
        is_menu: false,
        name: 'service',
        meta: { title: 'service', icon: 'shebei', noCache: true }
      }, {
        path: '/service/invoice',
        component: () => import('@/xt_pages/service/invoice'),
        hidden: true,
        is_menu: false,
        name: 'invoice',
        meta: { title: 'invoice', icon: 'shebei', noCache: true }
      }, {
        path: '/service/invoice/apply',
        component: () => import('@/xt_pages/service/invoiceApply'),
        hidden: true,
        is_menu: false,
        name: 'invoiceApply',
        meta: { title: 'invoiceApply', icon: 'shebei', noCache: true }
      },
      {
        path: '/servicePay',
        component: () => import('@/xt_pages/service/servicePay'),
        hidden: true,
        name: 'servicePay',
        meta: { title: 'servicePay' }
      },
      {
        path: '/payType',
        component: () => import('@/xt_pages/service/payType'),
        hidden: true,
        name: 'payType',
        meta: { title: 'payType' }
      },
      {
        path: '/weChatPay',
        component: () => import('@/xt_pages/service/weChatPay'),
        hidden: true,
        name: 'weChatPay',
        meta: { title: 'weChatPay' }
      },
      {
        path: '/service/completeOrder',
        component: () => import('@/xt_pages/service/completeOrder'),
        hidden: true,
        name: 'completeOrder',
        meta: { title: 'completeOrder' }
      },{
        path: '/service/buy',
        component: () => import('@/xt_pages/service/serviceOrder'),
        hidden: true,
        is_menu: false,
        name: 'serviceOrder',
        meta: { title: 'serviceOrder', icon: 'shebei', noCache: true }
      },{
        path: '/order',
        component: () => import('@/xt_pages/service/orderRecord'),
        hidden: true,
        is_menu: false,
        name: 'orderRecord',
        meta: { title: 'orderRecord', icon: 'shebei', noCache: true }
      },{
        path: '/service/recordList',
        component: () => import('@/xt_pages/service/serviceRecord'),
        hidden: true,
        is_menu: false,
        name: 'recordList',
        meta: { title: 'recordList', icon: 'shebei', noCache: true }
      }
    ]
  },

  // ////////////////////////////本地开始
  {
    path: 'statistics',
    component: Layout,
    redirect: '/statistics/index',
    children: [{
      path: '/statistics',
      component: () => import('@/xt_pages/statistics/index'),
      name: 'statistics',
      meta: { title: 'statistics', icon: 'chart', noCache: true }
    }]
  },
  {
    path: '/sign',
    component: Layout,
    redirect: '/sign/index',
    name: 'sign',
    alwaysShow: true,
    meta: { title: 'signWeight', icon: 'table' },
    children: [
      { path: '/sign/index', component: () => import('@/xt_pages/sign/index'), name: 'signWeight', meta: { title: 'signWeight' }}
    ]
  },
  {
    path: '/patients',
    component: Layout,
    redirect: 'noredirect',
    name: 'User',
    meta: {
      title: 'user',
      icon: 'bingren'
    },
    children: [
      {
        path: '/patients/patients',
        component: () => import('@/xt_pages/user/patients'),
        name: 'Patient',
        meta: { title: 'patient', noCache: true }
      },
      {
        path: '/patients/create',
        component: () => import('@/xt_pages/user/createPatient'),
        name: 'createPatient',
        meta: { title: 'createPatient', noCache: true }
      },
      {
        path: '/patients/patient/:id',
        component: () => import('@/xt_pages/user/patientInfo'),
        hidden: true,
        is_menu: false,
        name: 'patient Page',
        meta: { title: 'patientPage', noCache: true }
      },
      {
        path: '/patients/patient/:id/edit',
        component: () => import('@/xt_pages/user/editPatient'),
        hidden: true,
        is_menu: false,
        name: 'Edit Patient',
        meta: { title: 'editPatient', noCache: true }
      },
      {
        path: '/patients/patient/:id/dialysisSolution',
        component: () => import('@/xt_pages/user/dialysisSolution'),
        hidden: true,
        is_menu: false,
        name: 'dialysisSolution',
        meta: { title: 'dialysisSolution', noCache: true }
      },
      {
        path: '/patients/patient/:id/weight',
        component: () => import('@/xt_pages/user/weight'),
        hidden: true,
        is_menu: false,
        name: 'weight',
        meta: { title: 'weight', noCache: true }
      },
      {
        path: '/patients/patient/:id/dialysisRecord',
        component: () => import('@/xt_pages/user/dialysisRecord'),
        hidden: true,
        is_menu: false,
        name: 'dialysisRecord',
        meta: { title: 'dialysisRecord', noCache: true }
      },
      {
        path: '/patients/patient/:id/scheduling',
        component: () => import('@/xt_pages/user/scheduling'),
        hidden: true,
        is_menu: false,
        name: 'scheduling',
        meta: { title: 'scheduling', noCache: true }
      },
      {
        path: '/patients/patient/:id/doctorAdvice',
        component: () => import('@/xt_pages/user/doctorAdvice'),
        hidden: true,
        is_menu: false,
        name: 'doctorAdvice',
        meta: { title: 'doctorAdvice', noCache: true }
      },
      {
        path: '/patients/inspection',
        component: () => import('@/xt_pages/user/inspection'),
        hidden: true,
        is_menu: false,
        name: 'Inspection',
        meta: { title: 'inspection', noCache: true }
      },
      {
        path: '/patients/course',
        component: () => import('@/xt_pages/user/courseOfDisease'),
        hidden: true,
        is_menu: false,
        name: 'CourseOfDiseaseManage',
        meta: { title: 'CourseOfDiseaseManage', noCache: true }
      },
      {
        path: '/patients/rescue',
        component: () => import('@/xt_pages/user/rescueRecord'),
        hidden: true,
        is_menu: false,
        name: 'RescueRecord',
        meta: { title: 'RescueRecord', noCache: true }
      },
      {
        path: '/patients/patient/:id/proeducation',
        component: () => import('@/xt_pages/user/proeducation'),
        hidden: true,
        is_menu: false,
        name: 'proeducation',
        meta: { title: 'proeducation', noCache: true }
      }
    ]
  },
  {
    path: '/workforce',
    component: Layout,
    redirect: 'noredirect',
    name: 'workforce',
    meta: {
      title: 'workforce',
      icon: 'paiban'
    },
    children: [
      {
        path: '/workforce/appointment',
        component: () => import('@/xt_pages/workforce/appointment'),
        name: 'appointment',
        meta: { title: 'appointment', noCache: true }
      },
      {
        path: '/workforce/sign',
        component: () => import('@/xt_pages/workforce/sign'),
        hidden: true,
        is_menu: false,
        name: 'sign',
        meta: { title: 'sign', noCache: true }
      },
      {
        path: '/workforce/remind',
        component: () => import('@/xt_pages/workforce/remind'),
        name: 'remind',
        meta: { title: 'remind', noCache: true }
      },
      {
        path: "/workforce/template",
        component: () => import("@/xt_pages/workforce/template"),
        name: "workforce_template",
        hidden: true,
        is_menu: false,
        meta: { title: 'workforce_template', noCache: true }
      },
      {
        path: "/workforce/schedule/print",
        component: () => import("@/xt_pages/workforce/schedule_print"),
        name: "schedule_print",
        hidden: true,
        is_menu: false,
        meta: { title: 'schedule_print', noCache: true }
      },
    ]
  },
  {
    path: '/dialysis/',
    component: Layout,
    redirect: 'noredirect',
    name: 'dialysis',
    meta: {
      title: 'dialysis',
      icon: 'touxi'
    },
    children: [
      { path: '/dialysis/dialysisrecord', component: () => import('@/xt_pages/dialysis/schedualPatient'), name: '透析记录', meta: { title: '透析记录' }},
      {
        path: '/dialysis/record/:id',
        component: () => import('@/xt_pages/dialysis/dialysisPage'),
        hidden: true,
        is_menu: false,
        name: 'paper',
        meta: { title: 'paper', noCache: true }
      },
      {
        path: '/dialysis/print',
        component: () => import('@/xt_pages/dialysis/dialysisPrintOrder'),
        hidden: true,
        is_menu: false,
        name: 'dialysisPrintOrder',
        meta: { title: 'dialysisPrintOrder', noCache: true }
      },

      // { path: 'advice', component: () => import('@/xt_pages/dialysis/doctorAdvice'), name: 'advice', meta: { title: 'advice' }},
      // { path: 'prepare', component: () => import('@/xt_pages/dialysis/dialysisPrepare'), name: 'prepare', meta: { title: 'prepare' }},
      { path: '/dialysis/watch', component: () => import('@/xt_pages/dialysis/bloodPresssWatch'), name: 'watch', meta: { title: 'watch' }},
      { path: '/dialysis/details', component: () => import('@/xt_pages/dialysis/details'), name: 'details', meta: { title: 'details' }, is_menu: false,},
      {
        path: '/dialysis/print/batch',
        component: () => import('@/xt_pages/dialysis/batch_print/batch_print_order'),
        hidden: true,
        is_menu: false,
        name: 'dialysis_batch_print',
        meta: { title: 'dialysis_batch_print', noCache: true }
      },
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: '/device/main',
    name: 'device',
    alwaysShow: true,
    meta: { title: 'deviceManage', icon: 'shebei' },
    children: [
      { path: '/device/zones', component: () => import('@/xt_pages/device/zone_main'), name: 'deviceZoneManage', meta: { title: 'deviceZoneManage' }},
      { path: '/device/groups', component: () => import('@/xt_pages/device/group_main'), name: 'deviceGroupManage', meta: { title: 'deviceGroupManage' }},
      { path: '/device/numbers', component: () => import('@/xt_pages/device/number_main'), name: 'deviceNumberManage', meta: { title: 'deviceNumberManage' }},
      { path: '/device/main', component: () => import('@/xt_pages/device/main'), name: 'dialysisMachineManage', meta: { title: 'dialysisMachineManage' }}
    ]
  },{
    path: '/stock/',
    component: Layout,
    redirect: 'noredirect',
    name: 'stockManage',
    meta: {title: 'stockManage', icon: 'excel'},
    children: [
      {
        path: '/stock/config',
        component: () => import('@/xt_pages/stock/index'),
        name: 'config',
        meta: {title: 'config'},
        children:[

          {
            path: 'manufacturer',
            component: () => import('@/xt_pages/stock/config/manufacturer'),
            name: 'manufacturer',
            meta: {title: 'manufacturer'}
          },
          {
            path: 'dealer',
            component: () => import('@/xt_pages/stock/config/dealer'),
            name: 'dealer',
            meta: {title: 'dealer'}
          },
          {
            path: 'type',
            component: () => import('@/xt_pages/stock/config/goodType'),
            name: 'goodType',
            meta: {title: 'goodType'}
          },

          {
            path: 'info',
            component: () => import('@/xt_pages/stock/config/goodInfo'),
            name: 'goodInfo',
            meta: {title: 'goodInfo'}
          },
        ]
      },

      {
        path: '/stock/in',
        component: () => import('@/xt_pages/stock/stockIn'),
        name: 'stockIn',
        meta: {title: 'stockIn',noCache: true }

      },

       {
        path: '/stock/out',
        component: () => import('@/xt_pages/stock/stockOut'),
        name: 'stockOut',
        meta: {title: 'stockOut'}
      },{
        path: '/stock/query',
        component: () => import('@/xt_pages/stock/stockQuery'),
        name: 'stockQuery',
        meta: {title: 'stockQuery'}
      },{
        path: '/stock/in/add',
        component: () => import('@/xt_pages/stock/addStockIn'),
        name: 'addStockIn',
        hidden: true,
        is_menu: false,
        meta: {title: 'addStockIn',noCache: true}
      }, {
        path: '/stock/out/add',
        component: () => import('@/xt_pages/stock/addStockOut'),
        name: 'addStockOut',
        hidden: true,
        is_menu: false,
        meta: {title: 'addStockOut',noCache: true }
      },{
        path: '/stock/return',
        component: () => import('@/xt_pages/stock/salesReturn'),
        name: 'salesReturn',
        hidden: true,
        is_menu: false,
        meta: {title: 'salesReturn'}
      },{
        path: '/stock/return/record',
        component: () => import('@/xt_pages/stock/salesReutrnRecord'),
        name: 'salesReutrnRecord',
        hidden: true,
        is_menu: false,
        meta: {title: 'salesReutrnRecord'}
      },{
        path: '/stock/warehouse/record',
        component: () => import('@/xt_pages/stock/warehouseRecord'),
        name: 'warehouseRecord',
        hidden: true,
        is_menu: false,
        meta: {title: 'warehouseRecord'}
      },{
        path: '/stock/cancel/',
        component: () => import('@/xt_pages/stock/cancelStock'),
        name: 'cancelStock',
        hidden: true,
        is_menu: false,
        meta: {title: 'cancelStock'}
      }, {
        path: '/stock/cancel/record',
        component: () => import('@/xt_pages/stock/cancelStockRecord'),
        name: 'cancelStockRecord',
        hidden: true,
        is_menu: false,
        meta: {title: 'cancelStockRecord'}
      }, {
        path: '/stock/out/record',
        component: () => import('@/xt_pages/stock/stockOutRecord'),
        name: 'stockOutRecord',
        hidden: true,
        is_menu: false,
        meta: {title: 'stockOutRecord'}
      },
    ]
  },
  {
    path: '/data/',
    component: Layout,
    redirect: 'noredirect',
    name: 'data',
    meta: { title: 'data_dictionary', icon: 'excel' },
    children: [
      { path: '/data/dictionary', component: () => import('@/xt_pages/data/index'), name: 'dictionary', meta: { title: 'field_config' }},
      { path: '/data/template', component: () => import('@/xt_pages/data/template'), name: 'template', meta: { title: 'template' }},
      { path: '/data/druguse', component: () => import('@/xt_pages/data/druguseTemplate'), name: 'druguse', meta: { title: 'druguse' }}
    ]
  }
  // /////////////本地要end/
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: xt_constantRouterMap
})

export const xt_asyncRouterMap = [
// //////////////////////////////////线在开始
  // {
  //   path: '/patients',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'User',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'user',
  //     icon: 'bingren'
  //   },
  //   children: [
  //     {
  //       path: '/patients/patients',
  //       component: () => import('@/xt_pages/user/patients'),
  //       name: 'Patient',
  //       meta: { title: 'patient', noCache: true }
  //     },
  //     {
  //       path: '/patients/create',
  //       component: () => import('@/xt_pages/user/createPatient'),
  //       name: 'createPatient',
  //       meta: { title: 'createPatient', noCache: true }
  //     },
  //     {
  //       path: '/patients/patient/:id',
  //       component: () => import('@/xt_pages/user/patientInfo'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'patient Page',
  //       meta: { title: 'patientPage', noCache: true }
  //     },
  //     {
  //       path: '/patients/patient/:id/edit',
  //       component: () => import('@/xt_pages/user/editPatient'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'Edit Patient',
  //       meta: { title: 'editPatient', noCache: true }
  //     },
  //     {
  //       path: '/patients/patient/:id/dialysisSolution',
  //       component: () => import('@/xt_pages/user/dialysisSolution'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'dialysisSolution',
  //       meta: { title: 'dialysisSolution', noCache: true }
  //     },
  //     {
  //       path: '/patients/patient/:id/weight',
  //       component: () => import('@/xt_pages/user/weight'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'weight',
  //       meta: { title: 'weight', noCache: true }
  //     },
  //     {
  //       path: '/patients/patient/:id/dialysisRecord',
  //       component: () => import('@/xt_pages/user/dialysisRecord'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'dialysisRecord',
  //       meta: { title: 'dialysisRecord', noCache: true }
  //     },
  //     {
  //       path: '/patients/patient/:id/scheduling',
  //       component: () => import('@/xt_pages/user/scheduling'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'scheduling',
  //       meta: { title: 'scheduling', noCache: true }
  //     },
  //     {
  //       path: '/patients/patient/:id/doctorAdvice',
  //       component: () => import('@/xt_pages/user/doctorAdvice'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'doctorAdvice',
  //       meta: { title: 'doctorAdvice', noCache: true }
  //     },
  //     {
  //       path: '/patients/inspection',
  //       component: () => import('@/xt_pages/user/inspection'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'Inspection',
  //       meta: { title: 'inspection', noCache: true }
  //     },
  //     {
  //       path: '/patients/course',
  //       component: () => import('@/xt_pages/user/courseOfDisease'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'CourseOfDiseaseManage',
  //       meta: { title: 'CourseOfDiseaseManage', noCache: true }
  //     },
  //     {
  //       path: '/patients/rescue',
  //       component: () => import('@/xt_pages/user/rescueRecord'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'RescueRecord',
  //       meta: { title: 'RescueRecord', noCache: true }
  //     },
  //     {
  //       path: '/patients/patient/:id/proeducation',
  //       component: () => import('@/xt_pages/user/proeducation'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'proeducation',
  //       meta: { title: 'proeducation', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/workforce',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'workforce',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'workforce',
  //     icon: 'paiban'
  //   },
  //   children: [
  //     {
  //       path: '/workforce/appointment',
  //       component: () => import('@/xt_pages/workforce/appointment'),
  //       name: 'appointment',
  //       meta: { title: 'appointment', noCache: true }
  //     },
  //     {
  //       path: '/workforce/sign',
  //       component: () => import('@/xt_pages/workforce/sign'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'sign',
  //       meta: { title: 'sign', noCache: true }
  //     },
  //     {
  //       path: '/workforce/remind',
  //       component: () => import('@/xt_pages/workforce/remind'),
  //       name: 'remind',
  //       meta: { title: 'remind', noCache: true }
  //     },
  //     {
  //       path: "/workforce/template",
  //       component: () => import("@/xt_pages/workforce/template"),
  //       name: "workforce_template",
  //       hidden: true,
  //       is_menu: false,
  //       meta: { title: 'workforce_template', noCache: true }
  //     },
  //     {
  //       path: "/workforce/schedule/print",
  //       component: () => import("@/xt_pages/workforce/schedule_print"),
  //       name: "schedule_print",
  //       hidden: true,
  //       is_menu: false,
  //       meta: { title: 'schedule_print', noCache: true }
  //     },
  //   ]
  // },
  // {
  //   path: '/dialysis/',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'dialysis',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'dialysis',
  //     icon: 'touxi'
  //   },
  //   children: [
  //     { path: '/dialysis/dialysisrecord', component: () => import('@/xt_pages/dialysis/schedualPatient'), name: '透析记录', meta: { title: '透析记录' }},
  //     {
  //       path: '/dialysis/record/:id',
  //       component: () => import('@/xt_pages/dialysis/dialysisPage'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'paper',
  //       meta: { title: 'paper', noCache: true }
  //     },
  //     {
  //       path: '/dialysis/print',
  //       component: () => import('@/xt_pages/dialysis/dialysisPrintOrder'),
  //       hidden: true,
  //       is_menu: false,
  //       name: 'dialysisPrintOrder',
  //       meta: { title: 'dialysisPrintOrder', noCache: true }
  //     },

  //     // { path: 'advice', component: () => import('@/xt_pages/dialysis/doctorAdvice'), name: 'advice', meta: { title: 'advice' }},
  //     // { path: 'prepare', component: () => import('@/xt_pages/dialysis/dialysisPrepare'), name: 'prepare', meta: { title: 'prepare' }},
  //     { path: '/dialysis/watch', component: () => import('@/xt_pages/dialysis/bloodPresssWatch'), name: 'watch', meta: { title: 'watch' }},
  //     { path: '/dialysis/details', component: () => import('@/xt_pages/dialysis/details'), name: 'details', meta: { title: 'details' }, is_menu: false,}
  //   ]
  // },
  // {
  //   path: '/device',
  //   component: Layout,
  //   redirect: '/device/main',
  //   name: 'device',
  //   alwaysShow: true,
  //   meta: { title: 'deviceManage', icon: 'shebei' },
  //   children: [
  //     { path: '/device/zones', component: () => import('@/xt_pages/device/zone_main'), name: 'deviceZoneManage', meta: { title: 'deviceZoneManage' }},
  //     { path: '/device/groups', component: () => import('@/xt_pages/device/group_main'), name: 'deviceGroupManage', meta: { title: 'deviceGroupManage' }},
  //     { path: '/device/numbers', component: () => import('@/xt_pages/device/number_main'), name: 'deviceNumberManage', meta: { title: 'deviceNumberManage' }},
  //     { path: '/device/main', component: () => import('@/xt_pages/device/main'), name: 'dialysisMachineManage', meta: { title: 'dialysisMachineManage' }}
  //   ]
  // },{
  //   path: '/stock/',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'stockManage',
  //   meta: {title: 'stockManage', icon: 'nested'},
  //   children: [
  //     {
  //       path: '/stock/in',
  //       component: () => import('@/xt_pages/stock/stockIn'),
  //       name: 'stockIn',
  //       meta: {title: 'stockIn',noCache: true }

  //     },

  //      {
  //       path: '/stock/out',
  //       component: () => import('@/xt_pages/stock/stockOut'),
  //       name: 'stockOut',
  //       meta: {title: 'stockOut',noCache: true}
  //     },{
  //       path: '/stock/query',
  //       component: () => import('@/xt_pages/stock/stockQuery'),
  //       name: 'stockQuery',
  //       meta: {title: 'stockQuery',noCache: true}
  //     },
  //     {
  //       path: '/stock/config',
  //       component: () => import('@/xt_pages/stock/index'),
  //       name: 'config',
  //       meta: {title: 'config'},
  //     },{
  //       path: '/stock/in/add',
  //       component: () => import('@/xt_pages/stock/addStockIn'),
  //       name: 'addStockIn',
  //       hidden: true,
  //       is_menu: false,
  //       meta: {title: 'addStockIn',noCache: true}
  //     }, {
  //       path: '/stock/out/add',
  //       component: () => import('@/xt_pages/stock/addStockOut'),
  //       name: 'addStockOut',
  //       hidden: true,
  //       is_menu: false,
  //       meta: {title: 'addStockOut',noCache: true }
  //     },{
  //       path: '/stock/return',
  //       component: () => import('@/xt_pages/stock/salesReturn'),
  //       name: 'salesReturn',
  //       hidden: true,
  //       is_menu: false,
  //       meta: {title: 'salesReturn'}
  //     },{
  //       path: '/stock/return/record',
  //       component: () => import('@/xt_pages/stock/salesReutrnRecord'),
  //       name: 'salesReutrnRecord',
  //       hidden: true,
  //       is_menu: false,
  //       meta: {title: 'salesReutrnRecord'}
  //     },{
  //       path: '/stock/warehouse/record',
  //       component: () => import('@/xt_pages/stock/warehouseRecord'),
  //       name: 'warehouseRecord',
  //       hidden: true,
  //       is_menu: false,
  //       meta: {title: 'warehouseRecord'}
  //     },{
  //       path: '/stock/cancel/',
  //       component: () => import('@/xt_pages/stock/cancelStock'),
  //       name: 'cancelStock',
  //       hidden: true,
  //       is_menu: false,
  //       meta: {title: 'cancelStock'}
  //     }, {
  //       path: '/stock/cancel/record',
  //       component: () => import('@/xt_pages/stock/cancelStockRecord'),
  //       name: 'cancelStockRecord',
  //       hidden: true,
  //       is_menu: false,
  //       meta: {title: 'cancelStockRecord'}
  //     }, {
  //       path: '/stock/out/record',
  //       component: () => import('@/xt_pages/stock/stockOutRecord'),
  //       name: 'stockOutRecord',
  //       hidden: true,
  //       is_menu: false,
  //       meta: {title: 'stockOutRecord'}
  //     },
  //   ]
  // },
  // {
  //   path: 'statistics',
  //   component: Layout,
  //   redirect: '/statistics/index',
  //   children: [{
  //     path: '/statistics',
  //     component: () => import('@/xt_pages/statistics/index'),
  //     name: 'statistics',
  //     meta: { title: 'statistics', icon: 'chart', noCache: true }
  //   }]
  // },
  // {
  //   path: '/data/',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'data',
  //   meta: { title: 'data_dictionary', icon: 'excel' },
  //   children: [
  //     { path: '/data/dictionary', component: () => import('@/xt_pages/data/index'), name: 'dictionary', meta: { title: 'field_config' }},
  //     { path: '/data/template', component: () => import('@/xt_pages/data/template'), name: 'template', meta: { title: 'template' }},
  //     { path: '/data/druguse', component: () => import('@/xt_pages/data/druguseTemplate'), name: 'druguse', meta: { title: 'druguse' }}
  //   ]
  // },
  // /////////////////////////////////////线在end
  {
    path: '/role',
    component: Layout,
    redirect: '/role/admin/manage',
    name: 'role',
    alwaysShow: true,
    meta: { title: 'permissionManage', icon: 'table' },
    children: [
      { path: '/role/admin/manage', component: () => import('@/xt_pages/role/admin'), name: 'adminManage', meta: { title: 'adminManage' }},
      { path: '/role/manage', component: () => import('@/xt_pages/role/role'), name: 'roleManage', meta: { title: 'roleManage' }},
      { path: '/role/admin/create', component: () => import('@/xt_pages/role/CreateAdmin'), name: 'addAdmin', meta: { title: 'addAdmin', noCache: true }, hidden: true, is_menu: false },
      { path: '/role/admin/edit', component: () => import('@/xt_pages/role/EditAdmin'), name: 'editAdmin', meta: { title: 'editAdmin', noCache: true }, hidden: true, is_menu: false },
      { path: '/role/perview', component: () => import('@/xt_pages/role/EditPerview'), name: 'setupPerview', meta: { title: 'setupPerview', noCache: true }, hidden: true, is_menu: false },
      { path: '/role/admin/specialpermission', component: () => import('@/xt_pages/role/special_permission'), name: 'special_permission_manage', meta: { title: 'special_permission_manage' }},
    ]
  }
]
