import { verifyToken, modifyAdminInfo } from '@/api/login/login'
// import { mapGetters } from 'vuex'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { getAdminUserInfoCache, cacheAdminUserInfo, removeAdminUserInfoCache } from '@/utils/admin_info_cache'

const xt_user = {
  state: {
    org_id: 0,
    app_id: 0,
    user: {
      id: 0,
      mobile: '',
      avatar: '',
      user_name: '',
      intro: '',
      user_type: 0, // 用户类型（1.管理员；2.医生；3.护士；4.运营）
      user_title: 0 // 用户职称（1.医士；2.医师；3.住院医师；4.主治医师；5.副主任医师；6.主任医师；7.护士；8.护师；9.主管护师；10.副主任护师；11.主任护师；12.运营专员；13.运营主管）
    },

    org: {
      id: 0,
      org_name: '',
      org_short_name: '',
      org_intro: '',
      org_logo: '',
      province: 0,
      city: 0,
      district: 0,
      address: ''
    },
    subscibe: {
      id: 0,
      period_start: 0,
      period_end: 0,
      state: 2, // 1正版（标准） 2试用（免费） 3过期(或其他无效状态) 8 专业 9 永久，
      patients:20, //患者数
    },

    // 示例: ['', '',]
    urlfors: []
  },

  mutations: {
    // cur_info: { user, cur_org_id, cur_app_id }
    SET_CURRENT_INFO: (state, cur_info) => {
      state.user.id = cur_info.user.id
      state.user.mobile = cur_info.user.mobile
      state.user.avatar = cur_info.user.avatar
      state.user.user_name = cur_info.user.user_name
      state.user.intro = cur_info.user.intro
      state.user.user_type = cur_info.user.user_type
      state.user.user_title = cur_info.user.user_title

      state.org_id = cur_info.cur_org_id
      state.app_id = cur_info.cur_app_id

      state.org.id = cur_info.org.id
      state.org.org_name = cur_info.org.org_name
      state.org.org_short_name = cur_info.org.org_short_name
      state.org.org_logo = cur_info.org.org_logo
      state.org.org_intro = cur_info.org.org_intro
      state.org.province = cur_info.org.province
      state.org.city = cur_info.org.city
      state.org.district = cur_info.org.district
      state.org.address = cur_info.org.address

      state.subscibe.id = cur_info.subscibe.id
      state.subscibe.period_start = cur_info.subscibe.period_start
      state.subscibe.period_end = cur_info.subscibe.period_end
      state.subscibe.state = cur_info.subscibe.state
    },

    SET_URLFORS: (state, payload) => {
      state.urlfors = payload.urlfors
    },

    MODIFY_USER_INFO: (state, payload) => {
      state.user.user_name = payload.user_name
      state.user.avatar = payload.avatar
    },

    SET_SUBSCIBE_PATIENT:(state)=>{
      state.subscibe.patients += 1;
    },
    CLEAR_USER_INFO: (state) => {
      state.org_id = 0
      state.app_id = 0

      state.user.id = 0
      state.user.mobile = ''
      state.user.avatar = ''
      state.user.user_name = ''
      state.user.intro = ''
      state.user_type = ''
      state.user_title = ''

      state.org.id = 0
      state.org.org_name = ''
      state.org.org_short_name = ''
      state.org.org_logo = ''
      state.org.org_intro = ''
      state.org.province = 0
      state.org.city = 0
      state.org.district = 0
      state.org.address = ''

      state.subscibe.id = 0
      state.subscibe.period_start = 0
      state.subscibe.period_end = 0
      state.subscibe.state = 3
      state.subscibe.patients = 0

      state.urlfors = []
    }
  },

  getters: {
    current_role_urls: state => {
      return state.urlfors
    }
  },

  actions: {
    SetSubscibePatients({ commit, state }) {
      commit('SET_SUBSCIBE_PATIENT');
    },

    VerifyToken({ commit, state }, token) {
      // console.log('验证 token 之前：token = ' + token)
      return new Promise((resolve, reject) => {
        var cacheInfo = getAdminUserInfoCache()
        // console.log('登录信息缓存：', cacheInfo)
        if (cacheInfo != null && cacheInfo.length > 0) {
          var infoJSON = JSON.parse(cacheInfo)
          // console.log('用户信息缓存：', infoJSON)
          commit('SET_CURRENT_INFO', {
            user: infoJSON.user,
            cur_org_id: infoJSON.current_org_id,
            cur_app_id: infoJSON.current_app_id,
            org: infoJSON.org,
            subscibe: infoJSON.subscibe,
          })

          commit('SET_URLFORS', {
            urlfors: infoJSON.urlfors
          })
          resolve(infoJSON.user.user_id)
        } else {
          verifyToken(token).then(response => {
            if (response.data.state === 1) {
              // alert('验证通过')
              console.log('验证通过')
              var data = response.data.data
              this.commit('SET_CURRENT_INFO', {
                user: data.user,
                cur_org_id: data.current_org_id,
                cur_app_id: data.current_app_id,
                org: data.org,
                subscibe: data.subscibe
              })

              this.commit('SET_URLFORS', {
                urlfors: data.urlfors
              })

              cacheAdminUserInfo(JSON.stringify(data))

              resolve(data.user.id)
            } else {
              alert('请求失败：' + response.data.msg)
              reject({ msg: response.data.msg, code: response.data.code })
            }
          })
        }
      })
    },
    ModifyAdminUserInfo({ commit, state }, params) {
      commit('MODIFY_USER_INFO', { user_name: params.user_name, avatar: params.avatar })
      cacheAdminUserInfo(
        JSON.stringify({ 
          user: state.user, 
          org: state.org, 
          current_org_id: state.org_id, 
          current_app_id: state.app_id, 
          urlfors: state.urlfors,
          subscibe: state.subscibe,
        })
      )
    },

    // InitAdminUserInfo( {commit, state} ) {
    //   var cacheInfo = getAdminUserInfoCache()
    //   console.log("登录信息缓存：", cacheInfo)
    //   if (cacheInfo != null && cacheInfo.length > 0) {
    //     var infoJSON = JSON.parse(cacheInfo)
    //     console.log(infoJSON)
    //     commit('SET_CURRENT_INFO', {
    //       user: infoJSON.user,
    //       cur_org_id: infoJSON.current_org_id,
    //       cur_app_id: infoJSON.current_app_id,
    //       org: infoJSON.org,
    //     })

    //     commit('SET_URLFORS', {
    //       urlfors: infoJSON.urlfors
    //     })
    //   }
    // }
    // 登出
    FrontendLogout({ commit }) {
      commit('CLEAR_USER_INFO')
      removeAdminUserInfoCache()
    }
  }
}

export default xt_user
