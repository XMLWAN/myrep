<template>
    <label class="option_panel">
        <span class="check_box_panel">
            <span class="check_box" :class="{ 'did_checked': checked, }"></span>
        </span>
        <span>{{ text }}</span>
    </label>
</template>

<script>
export default {
    name: "OptionCheckBox",
    props: {
        text: {
            type: String,
        },
        checked: {
            type: Boolean,
            default: false,
        }
    }
}
</script>


<style scoped>
.option_panel {
    margin: 0 5px 0 0;
    /* font-size: 16px; */
}
.option_panel .check_box_panel {
    white-space: nowrap; 
    outline: none; 
    display: inline-block; 
    line-height: 1; 
    position: relative; 
    vertical-align: middle;
}
.option_panel .check_box_panel .check_box {
    display: inline-block; 
    position: relative; 
    border: 1px solid #000; 
    box-sizing: border-box; 
    width: 14px; 
    height: 14px; 
    background-color: #fff;
}
.check_box_panel .did_checked::after {
    content: "√";
    font-size: 15px;
}
</style>
