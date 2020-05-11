<template>
    <a-row type="flex">
        <!--    中间倒计时-->
        <a-col style="width: 50%;" :span="6" :pull="-5">
            <a-card style="min-width: 480px;height: 100%">
                <a-row :gutter="16">
                    <div style="width: 100%;height: 100%"><h1 style="align: center">湘信软件，追求卓越</h1></div>
                </a-row>
            </a-card>
        </a-col>
        <!--    右侧提示-->
        <a-col style="width: 50%;" :span="6" :push="0">
            <a-card style="min-width: 410px;height: 100%">
                <img
                        slot="cover"
                        alt="example"
                        style="height: 200px"
                        src="@/assets/img/university.jpg"
                >
                    <a-card-meta title="校训" description="自强不息，敢为人先。" />
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
export default {
}
</script>

<style scoped>
    .tt{
        width:100%;
        height:100%;
        text-align:center;
        background-color:#F69;
        display: table-cell;
        vertical-align:middle
    }
</style>
