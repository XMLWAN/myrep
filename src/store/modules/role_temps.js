const xt_role_temps = {
    state: {
        did_admins_changed: false
    },
    mutations: {
        UPDATE_ADMINS_STATE: (state, did_change) => {
            state.did_admins_changed = did_change
        }
    },
    actions: {
        DidChangeAdmins: ({commit}) => {
            commit('UPDATE_ADMINS_STATE', true)
        },
        RecoverAdminsChangeState: ({commit}) => {
            commit('UPDATE_ADMINS_STATE', false)
        }
    }
}

export default xt_role_temps