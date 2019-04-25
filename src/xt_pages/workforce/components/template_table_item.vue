<template>
    <div>
        <el-tooltip placement="right" :disabled="info.name.length == 0" >
            <div slot="content">
                {{info.name}}
                <br/>
                <span v-if="info.treat_mode.length > 0">({{info.treat_mode}})</span>
            </div>
            <div>
                <span>{{info.name}}</span>
                <br/>
                <span v-if="info.treat_mode.length > 0">({{info.treat_mode}})</span>
            </div>
            <!-- <div slot="content">
                {{name}}
                <br/>
                <span v-if="treat_mode.length > 0">({{treat_mode}})</span>
            </div>
            <div>
                <span>{{name}}</span>
                <br/>
                <span v-if="treat_mode.length > 0">({{treat_mode}})</span>
            </div> -->
        </el-tooltip>
    </div>
</template>

<script>
export default {
    name: "TemplateTableItem",
    props: {
        name: {
            type: String,
            default: "",
        },
        treat_mode: {
            type: String,
            default: "",
        },
        info: {
            type: Object,
            default: function() {
                return {
                    name: "",
                    treat_mode: ""
                }
            }
        }
    },
}
</script>

<style scoped>
/* .label {
    width: 100%;
    font-size: 12px;
} */
</style>
