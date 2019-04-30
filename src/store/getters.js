const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  // permission_routers: state => state.permission.routers,
  permission_routers: state => state.xt_permission.routers,
  addRouters: state => state.xt_permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  data: state => state.data,
  configlist: state => state.data.configlist,

  xt_permission: state => state.xt_permission,
  xt_user: state => state.xt_user,

  xt_role_temps: state => state.xt_role_temps,

  patient_types: state => state.global_config.patient_types,
  partitions: state => state.global_config.partitions,
  marital_options: state => state.global_config.marital_options,
  reimbursement_ways: state => state.global_config.reimbursement_ways,
  blood_types: state => state.global_config.blood_types,
  rh: state => state.global_config.rh,
  education_types: state => state.global_config.education_types,
  profession_options: state => state.global_config.profession_options,
  induction_options: state => state.global_config.induction_options,
  contagions: state => state.global_config.contagions,
  disease: state => state.global_config.disease,
  treatment_mode: state => state.global_config.treatment_mode,
  anticoagulants_confit: state => state.global_config.anticoagulants_confit,
  anticoagulants_set: state => state.global_config.anticoagulants_set,
  replacement_ways: state => state.global_config.replacement_ways,
  blood_filters: state => state.global_config.blood_filters,
  perfusion_apparatus: state => state.global_config.perfusion_apparatus,
  hemodialysis_machines: state => state.global_config.hemodialysis_machines,

  vascular_access: state => state.global_config.vascular_access,
  vascular_access_desc: state => state.global_config.vascular_access_desc,
  dialysis_duration: state => state.global_config.dialysis_duration,
  last_dialysis_after: state => state.global_config.last_dialysis_after,
  dialysis_before: state => state.global_config.dialysis_before,
  internal_fistula: state => state.global_config.internal_fistula,
  catheter: state => state.global_config.catheter,
  complication: state => state.global_config.complication,
  cruor: state => state.global_config.cruor,
  symptoms: state => state.global_config.symptoms,
  deals: state => state.global_config.deals,
  results: state => state.global_config.results,
  summary: state => state.global_config.summary,
  dialysate_formulation: state => state.global_config.dialysate_formulation,
  hemorrhage: state => state.global_config.hemorrhage,
  internal_fistula_tremor_ac: state => state.global_config.internal_fistula_tremor_ac,
  patient_gose: state => state.global_config.patient_gose,
  observation_content: state => state.global_config.observation_content,
  units: state => state.global_config.units,
  good_unit:state => state.global_config.good_unit,

  temp_params: state => state.temp_params
}
export default getters
