const temp_params = {
    state: {
        batch_print_dialysis_record_ids: [],
    },
    mutations: {
        SET_BATCH_PRINT_DIALYSIS_RECORD_IDS: (state, record_ids) => {
            state.batch_print_dialysis_record_ids = record_ids == null || record_ids == undefined ? [] : record_ids;
        }
    },
    actions: {
        SetBatchPrintDialysisRecordIDs({commit, state}, record_ids) {
            return new Promise((resolve, reject) => {
                commit("SET_BATCH_PRINT_DIALYSIS_RECORD_IDS", record_ids)
                resolve()
            })
        },
        ClearBatchPrintDialysisRecordIDs({commit, state}) {
            return new Promise((resolve, reject) => {
                commit("SET_BATCH_PRINT_DIALYSIS_RECORD_IDS", null)
                resolve()
            })
        }
    },
}

export default temp_params