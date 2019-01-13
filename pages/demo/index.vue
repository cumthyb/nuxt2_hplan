<template>
    <div>
        <QuillEditor :value="taskContent"
            @editor-blur='onEditorBlur' />
    </div>
</template>

<script>
import Mock from 'mockjs'
import QuillEditor from '@components/QuillEditorAnnotate.vue'

export default {
    components: {
        QuillEditor
    },
    data() {
        return {
            taskContent: '',
        }
    },
    mounted() {
        this.taskContent ='<h1 class="ql-align-center"><span style="font-size: 30px;">	关于氪空间</span></h1><p class="ql-align-justify"><br></p><p class="ql-align-justify"><span style="font-size: 18px;">		氪空间是以联合办公为载体，社群为纽带的企业服务平台。氪空间诞生的初心是解决小微团队办公难的问题，使命是“让办公更美好”，以空间产品构建线上线下社群，在提供联合办公空间的基础上，从用户需求出发推出更多围绕办公生态的服务，实现“赋能一亿人的快乐办公生活”的愿景。&nbsp;&nbsp;&nbsp;</span></p><p class="ql-align-justify"><span style="font-size: 18px;">		截至2018年6月，氪空间在中国覆盖北京、上海、香港、广州、杭州、南京、武汉、天津、苏州、厦门、合肥等11个城市，运营60多个联合办公社区，管理面积超过30万平方米，工位数量超过42000个，服务企业数量超过3000家。</span></p><p class="ql-align-justify"><span style="font-size: 18px;">		目前，氪空间已经开始布局亚太市场，目标是2019年底在以中国为主的亚洲范围内实现管理面积超过150万平方米，实时服务22万会员，“让联合办公成为城市商业的标配”。</span></p><h2 class="ql-align-center"><br></h2><p><br></p><p><br></p>'
    },

    methods: {
        onEditorBlur(content) {
            this.taskContent = content
        },
    },
}
</script>

<style lang="less">
</style>
