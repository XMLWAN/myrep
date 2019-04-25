<template>
    <div class="main">
        <div style="position:absolute; right: 25px; top: 15px; z-index: 99;">
            <el-button :style="{ paddingTop: '6px', paddingBottom: '6px', paddingLeft: '10px', paddingRight: '10px' }" @click="show_records">历史记录</el-button>
        </div>
        <div>
            <div class="item_row">
                <bacterial-det-edit-pane></bacterial-det-edit-pane>
            </div>
            <div class="item_row">
                <endotoxin-det-edit-pane></endotoxin-det-edit-pane>
            </div>
            <div class="item_row">
                <dislysate-det-edit-pane></dislysate-det-edit-pane>
            </div>
        </div>
        <quality-record-list-dialog ref="record_dialog"></quality-record-list-dialog>
    </div>
</template>

<script>
import BacterialDetEditPane from './bacterial_detection_edit_pane'
import EndotoxinDetEditPane from './endotoxin_detection_edit_pane'
import DislysateDetEditPane from './dislysate_detection_edit_pane'
import QualityRecordListDialog from './quality_record_list_dialog'

export default {
    name: "QualityControlPane",
    components: {
        BacterialDetEditPane,
        EndotoxinDetEditPane,
        DislysateDetEditPane,
        QualityRecordListDialog,
    },
    methods: {
        show_records: function() {
            this.$refs.record_dialog.show()
        }
    }
}
</script>

<style scoped>
.main {
    padding: 10px 10px;
    position: relative;
}
.item_row {
    border-bottom-color: rgb(200, 200, 200);
    border-bottom-width: 1px;
    border-bottom-style: solid;
    margin-bottom: 5px;
}
.item_row:last-child {
    border: none;
}
</style>