// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)

// /* Layout */
// import Layout from '@/views/layout/Layout'

// /** note: submenu only apppear when children.length>=1
// *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
// **/

// /**
// * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
// * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
// *                                if not set alwaysShow, only more than one route under the children
// *                                it will becomes nested mode, otherwise not show the root menu
// * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
// * name:'router-name'             the name is used by <keep-alive> (must set!!!)
// * meta : {
//     roles: ['admin','editor']     will control the page roles (you can set multiple roles)
//     title: 'title'               the name show in submenu and breadcrumb (recommend set)
//     icon: 'svg-name'             the icon show in the sidebar,
//     noCache: true                if true ,the page will no be cached(default is false)
//   }
// **/
// export const xt_constantRouterMap = [
//   // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
//   { path: '/token/verify', component: () => import('@/xt_pages/index/verify_token'), hidden: true },
//   { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
//   { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
//   {
//     path: '',
//     component: Layout,
//     redirect: '/home',
//     children: [{
//       path: '/home',
//       component: () => import('@/xt_pages/home/index'),
//       name: 'home',
//       meta: { title: 'home', icon: 'dashboard', noCache: true }
//     }]
//   },
//   // //////////////////////////////////////////////////////////
//   {
//     path: '/sign',
//     component: Layout,
//     redirect: '/sign/index',
//     name: 'sign',
//     alwaysShow: true,
//     meta: { title: 'signWeight', icon: 'table' },
//     children: [
//       { path: '/sign/index', component: () => import('@/xt_pages/sign/index'), name: 'signWeight', meta: { title: 'signWeight' }}
//     ]
//   },
//   {
//     path: '/patients',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'User',
//     meta: {
//       title: 'user',
//       icon: 'chart'
//     },
//     children: [
//       {
//         path: '/patients/patients',
//         component: () => import('@/xt_pages/user/patients'),
//         name: 'Patient',
//         meta: { title: 'patient', noCache: true }
//       },
//       {
//         path: '/patients/create',
//         component: () => import('@/xt_pages/user/createPatient'),
//         name: 'createPatient',
//         meta: { title: 'createPatient', noCache: true }
//       },
//       {
//         path: '/patients/patient/:id',
//         component: () => import('@/xt_pages/user/patientInfo'),
//         hidden: true,
//         name: 'patient Page',
//         meta: { title: 'patientPage', noCache: true }
//       },
//       {
//         path: '/patients/patient/:id/edit',
//         component: () => import('@/xt_pages/user/editPatient'),
//         hidden: true,
//         name: 'Edit Patient',
//         meta: { title: 'editPatient', noCache: true }
//       },
//       {
//         path: '/patients/patient/:id/dialysisSolution',
//         component: () => import('@/xt_pages/user/dialysisSolution'),
//         hidden: true,
//         name: 'dialysisSolution',
//         meta: { title: 'dialysisSolution', noCache: true }
//       },
//       {
//         path: '/patients/patient/:id/weight',
//         component: () => import('@/xt_pages/user/weight'),
//         hidden: true,
//         name: 'weight',
//         meta: { title: 'weight', noCache: true }
//       },
//       {
//         path: '/patients/dialysisRecord',
//         component: () => import('@/xt_pages/user/dialysisRecord'),
//         name: 'dialysisRecord',
//         meta: { title: 'dialysisRecord', noCache: true }
//       },
//       {
//         path: '/patients/patient/:id/scheduling',
//         component: () => import('@/xt_pages/user/scheduling'),
//         hidden: true,
//         name: 'scheduling',
//         meta: { title: 'scheduling', noCache: true }
//       },
//       {
//         path: '/patients/patient/:id/doctorAdvice',
//         component: () => import('@/xt_pages/user/doctorAdvice'),
//         hidden: true,
//         name: 'doctorAdvice',
//         meta: { title: 'doctorAdvice', noCache: true }
//       },
//       {
//         path: '/patients/inspection',
//         component: () => import('@/xt_pages/user/inspection'),
//         hidden: true,
//         name: 'Inspection',
//         meta: { title: 'inspection', noCache: true }
//       }
//     ]
//   },
//   {
//     path: '/workforce',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'workforce',
//     meta: {
//       title: 'workforce',
//       icon: 'chart'
//     },
//     children: [
//       {
//         path: 'appointment',
//         component: () => import('@/xt_pages/workforce/appointment'),
//         name: 'appointment',
//         meta: { title: 'appointment', noCache: true }
//       },
//       {
//         path: 'sign',
//         component: () => import('@/xt_pages/workforce/sign'),
//         name: 'sign',
//         meta: { title: 'sign', noCache: true }
//       },
//       {
//         path: 'remind',
//         component: () => import('@/xt_pages/workforce/remind'),
//         name: 'remind',
//         meta: { title: 'remind', noCache: true }
//       }
//     ]
//   },
//   {
//     path: '/dialysis/',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'dialysis',
//     meta: {
//       title: 'dialysis',
//       icon: 'component'
//     },
//     children: [
//       { path: 'paper', component: () => import('@/xt_pages/dialysis/dialysisPage'), name: 'paper', meta: { title: 'paper' }},
//       { path: 'advice', component: () => import('@/xt_pages/dialysis/doctorAdvice'), name: 'advice', meta: { title: 'advice' }},
//       { path: 'prepare', component: () => import('@/xt_pages/dialysis/dialysisPrepare'), name: 'prepare', meta: { title: 'prepare' }},
//       { path: 'watch', component: () => import('@/xt_pages/dialysis/bloodPresssWatch'), name: 'watch', meta: { title: 'watch' }}
//     ]
//   },
//   {
//     path: '/device',
//     component: Layout,
//     redirect: '/device/main',
//     name: 'device',
//     alwaysShow: true,
//     meta: { title: 'deviceManage', icon: 'table' },
//     children: [
//       { path: '/device/main', component: () => import('@/xt_pages/device/main'), name: 'deviceManage', meta: { title: 'deviceManage' }}
//     ]
//   }
// ]

// export default new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({ y: 0 }),
//   routes: xt_constantRouterMap
// })

// export const xt_asyncRouterMap = [
//   {
//     path: '/role',
//     component: Layout,
//     redirect: '/role/admin/manage',
//     name: 'role',
//     alwaysShow: true,
//     meta: { title: 'permissionManage', icon: 'table' },
//     children: [
//       { path: '/role/admin/manage', component: () => import('@/xt_pages/role/admin'), name: 'adminManage', meta: { title: 'adminManage' }},
//       { path: '/role/manage', component: () => import('@/xt_pages/role/role'), name: 'roleManage', meta: { title: 'roleManage' }},
//       { path: '/role/admin/create', component: () => import('@/xt_pages/role/CreateAdmin'), name: 'addAdmin', meta: { title: 'addAdmin', noCache: true }, hidden: true, is_menu: false },
//       { path: '/role/admin/edit', component: () => import('@/xt_pages/role/EditAdmin'), name: 'editAdmin', meta: { title: 'editAdmin', noCache: true }, hidden: true, is_menu: false },
//       { path: '/role/perview', component: () => import('@/xt_pages/role/EditPerview'), name: 'setupPerview', meta: { title: 'setupPerview', noCache: true }, hidden: true, is_menu: false }
//     ]
//   }
// ]
