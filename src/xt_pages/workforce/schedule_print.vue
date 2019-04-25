<template>
    <div class="app-container" style="background-color: white;">
        <el-row style="padding-bottom: 15px;">
            <el-col :span="24">
                <el-button type="primary" @click="printAction">打印</el-button>
            </el-col>
        </el-row>
        <div id="print_content">
            <div class="print_main_content">
                <div class="order_title_panl">
                    <span class="main_title">一周透析排班表 {{ month }}月</span>
                </div>
                <div class="table_panel">
                    <table class="table">
                        <thead>
                            <tr>
                                <td :width="td_1_width">日期</td>
                                <td :width="td_2_width">星期</td>
                                <td :width="td_3_width">病人姓名</td>
                                <td :width="td_4_width">血滤病人</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(main_collection, index) in schedules" :key="index">
                                <td :width="td_1_width">{{ main_collection.day }}</td>
                                <td :width="td_2_width">{{ main_collection.weekday }}</td>
                                <td :width="td_3_width" valign="top">
                                    <div style="min-height: 80px;">
                                        <div class="proj" v-if="Object.keys(main_collection.all.am).length > 0">
                                            <div class="proj_title">上午:</div>
                                            <div class="proj_item" v-for="(zone_schs, zone_name) in main_collection.all.am" :key="zone_name">
                                                <span class="zone_name">{{ zone_name }}: </span>
                                                {{ patient_names(zone_schs) }}
                                            </div>
                                        </div>
                                        <div class="proj" v-if="Object.keys(main_collection.all.pm).length > 0">
                                            <div class="proj_title">下午:</div>
                                            <div class="proj_item" v-for="(zone_schs, zone_name) in main_collection.all.pm" :key="zone_name">
                                                <span class="zone_name">{{ zone_name }}: </span>
                                                {{ patient_names(zone_schs) }}
                                            </div>
                                        </div>
                                        <div class="proj" v-if="Object.keys(main_collection.all.evening).length > 0">
                                            <div class="proj_title">晚上:</div>
                                            <div class="proj_item" v-for="(zone_schs, zone_name) in main_collection.all.evening" :key="zone_name">
                                                <span class="zone_name">{{ zone_name }}: </span>
                                                {{ patient_names(zone_schs) }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td :width="td_4_width" valign="top">
                                    <div class="proj" v-if="Object.keys(main_collection.hdf).length > 0">
                                        <div class="proj_title">血滤:</div>
                                        <div class="proj_item">
                                            {{ patient_names(main_collection.hdf) }}
                                        </div>
                                    </div>
                                    <div class="proj" v-if="Object.keys(main_collection.hd_hp).length > 0">
                                        <div class="proj_title">灌流:</div>
                                        <div class="proj_item">
                                            {{ patient_names(main_collection.hd_hp) }}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GetWeekSchedulePrintInitData } from "@/api/schedule"
import { parseTime } from "@/utils"
import print from "print-js"

export default {
    name: "SchedulePrint",
    data() {
        return {
            td_1_width: "8%",
            td_2_width: "8%",
            td_3_width: "64%",
            td_4_width: "20%",

            month: 1,
            begin_day: 1,

            schedules: [
                { 
                    day: 1,
                    weekday: "星期一",
                    all: { 
                        am: { /* zone_name: [ schedule, ... ] */ },
                        pm: { /* zone_name: [ schedule, ... ] */ },
                        evening: { /* zone_name: [ schedule, ... ] */ },  
                    }, 
                    hdf: [ /* schedule, ... */ ], 
                    hd_hp: [ /* schedule, ... */ ],
                },
                { 
                    day: 2,
                    weekday: "星期二",
                    all: { 
                        am: { /* zone_name: [ schedule, ... ] */ },
                        pm: { /* zone_name: [ schedule, ... ] */ },
                        evening: { /* zone_name: [ schedule, ... ] */ },  
                    }, 
                    hdf: [ /* schedule, ... */ ], 
                    hd_hp: [ /* schedule, ... */ ],
                },
                { 
                    day: 3,
                    weekday: "星期三",
                    all: { 
                        am: { /* zone_name: [ schedule, ... ] */ },
                        pm: { /* zone_name: [ schedule, ... ] */ },
                        evening: { /* zone_name: [ schedule, ... ] */ },  
                    }, 
                    hdf: [ /* schedule, ... */ ], 
                    hd_hp: [ /* schedule, ... */ ],
                },
                { 
                    day: 4,
                    weekday: "星期四",
                    all: { 
                        am: { /* zone_name: [ schedule, ... ] */ },
                        pm: { /* zone_name: [ schedule, ... ] */ },
                        evening: { /* zone_name: [ schedule, ... ] */ },  
                    }, 
                    hdf: [ /* schedule, ... */ ], 
                    hd_hp: [ /* schedule, ... */ ],
                },
                { 
                    day: 5,
                    weekday: "星期五",
                    all: { 
                        am: { /* zone_name: [ schedule, ... ] */ },
                        pm: { /* zone_name: [ schedule, ... ] */ },
                        evening: { /* zone_name: [ schedule, ... ] */ },  
                    }, 
                    hdf: [ /* schedule, ... */ ], 
                    hd_hp: [ /* schedule, ... */ ],
                },
                { 
                    day: 6,
                    weekday: "星期六",
                    all: { 
                        am: { /* zone_name: [ schedule, ... ] */ },
                        pm: { /* zone_name: [ schedule, ... ] */ },
                        evening: { /* zone_name: [ schedule, ... ] */ },  
                    }, 
                    hdf: [ /* schedule, ... */ ], 
                    hd_hp: [ /* schedule, ... */ ],
                },
                { 
                    day: 7,
                    weekday: "星期日",
                    all: { 
                        am: { /* zone_name: [ schedule, ... ] */ },
                        pm: { /* zone_name: [ schedule, ... ] */ },
                        evening: { /* zone_name: [ schedule, ... ] */ },  
                    }, 
                    hdf: [ /* schedule, ... */ ], 
                    hd_hp: [ /* schedule, ... */ ],
                },
            ],
        }
    },
    created() {
        var date = new Date().getTime()
        if (this.$route.query.date) {
            date = this.$route.query.date
        }
        var date_str = parseTime(date, "{y}-{m}-{d}")

        this.month = parseInt(parseTime(date, "{m}"))

        GetWeekSchedulePrintInitData(date_str).then(rs => {
            var resp = rs.data
            if (resp.state == 1) {
                var begin_day = parseInt(parseTime(resp.data.monday * 1000, "{d}"))
                for (let index = 0; index < this.schedules.length; index++) {
                    const collection = this.schedules[index];
                    collection.day = begin_day + index
                }

                var schedules = resp.data.schedules
                for (let index = 0; index < schedules.length; index++) {
                    const schedule = schedules[index];
                    if (schedule.patient == null || schedule.zone == null) {
                        continue
                    }

                    var weekday = schedule.schedule_week
                    var time_type = schedule.schedule_type

                    var main_collection = this.schedules[weekday - 1]
                    var time_type_schedules
                    if (time_type == 1) {
                        time_type_schedules = main_collection.all.am
                    } else if (time_type == 2) {
                        time_type_schedules = main_collection.all.pm
                    } else {
                        time_type_schedules = main_collection.all.evening
                    }

                    var zone_schedules = time_type_schedules[schedule.zone.name] ? time_type_schedules[schedule.zone.name] : []

                    zone_schedules.push(schedule)

                    time_type_schedules[schedule.zone.name] = zone_schedules

                    if (schedule.mode.id == 2) { // HDF
                        main_collection.hdf.push(schedule)
                    } else if (schedule.mode.id == 3) { // HD+HF
                        main_collection.hd_hp.push(schedule)
                    }
                }

            } else {
                this.$message.error(resp.msg)
            }
        }).catch(err => {
            this.$message.error(err)
        })
    },
    methods: {
        patient_names: function(schedules) {
            var names = []
            for (let index = 0; index < schedules.length; index++) {
                const schedule = schedules[index];
                names.push(schedule.patient.name)
            }
            return names.join("、")
        },
        printAction: function() {
            const style = '@media print { .print_main_content { background-color: white; width:960px;  margin:0 auto; padding: 0 0 20px 0; } .order_title_panl { text-align: center; } .main_title { font-size: 18px; line-height: 40px; font-weight: 500; } .table_panel { } .table { width: 100%; border: 1px solid; border-collapse: collapse; padding: 2px; } thead tr td { border: 1px solid; text-align: center; font-size: 20px; padding: 15px 5px; } tbody tr td { border: 1px solid; text-align: center; font-size: 18px; padding: 10px 5px; } .proj { padding: 5px 0; text-align: left; } .proj_title { font-size: 16px; font-weight: 500; line-height: 25px; } .proj_item { font-size: 15px; line-height: 20px; } .zone_name { font-weight: 500; } }';

            printJS({
                printable: "print_content",
                type: "html",
                documentTitle: "  ",
                style: style,
                scanStyles: false,
            });
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.print_main_content {
    background-color: white;
    width:960px; 
    margin:0 auto;
    padding: 0 0 20px 0;

    .order_title_panl {
        text-align: center;
        .main_title {
            font-size: 18px;
            line-height: 40px;
            font-weight: 500;
        }
    }
    .table_panel {
        .table {
            width: 100%;
            border: 1px solid;
            border-collapse: collapse;
            padding: 2px;

            thead {
                tr {
                    td {
                        border: 1px solid;
                        text-align: center;
                        font-size: 20px;
                        padding: 15px 5px;
                    }
                }
            }
            tbody {
                tr {
                    td {
                        border: 1px solid;
                        text-align: center;
                        font-size: 18px;
                        padding: 10px 5px;

                        .proj {
                            padding: 5px 0;
                            text-align: left;

                            .proj_title {
                                font-size: 16px;
                                font-weight: 500;
                                line-height: 25px;
                            }
                            .proj_item {
                                font-size: 15px;
                                line-height: 20px;
                                .zone_name {
                                    font-weight: 500;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

