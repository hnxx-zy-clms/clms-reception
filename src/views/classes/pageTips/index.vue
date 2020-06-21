<template>
    <a-row type="flex">
        <a-col style="width: 50%;" :span="6" :pull="-5">
            <a-card style="min-width: 480px;height: 100%">
                <a-row :gutter="16">
                    <div style="width: 100%;height: 100%;text-align:center" ><b>湘信软件，追求卓越</b></div>
                    <hr>
                    <div style="width: 100%;height: 100%;line-height: 24px;font-min-size: 10px;padding: 15px">一、是追求卓越还是甘于平庸，完全取决于自己的选择。​
                        二、立足主业、专注品质、追求卓越，始终敬畏契约和信用，勇于承担肩头的责任，在市场中敢闯敢试、勇搏激流，在发展中实现价值、奉献社会。​
                        三、有时候，在别人看来，你已经做的很好了。但自己心里知道，追求卓越这件事情，是没有止境的。给自己挑刺，不是自找麻烦，而是决心做得更好，不断拉升标准，拉升自己的标准，行业的标准，你的梦想由你来定义。
                        四、使生如夏花之灿烂，死如秋叶之静美。在追求卓越与真知的路上，成功会迟到，但不会缺席。​
                        五、喜欢他对待工作永远兢兢业业，追求卓越；对待观众坦诚纯粹，既暖心又有分寸；肯吃苦又有抱负，有主见，不被任何人和事所左右自己的计划，是我很崇拜的那种人！嗯！而且长得好看！
                     </div>
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
                <b><a-card-meta title="校训:" description="---------自强不息，敢为人先。----------" /></b>
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
