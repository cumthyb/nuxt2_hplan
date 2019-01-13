<template>
    <div class="new-course-panel">
        <SectionTitle title="新建课程系列" />

        <Form ref="formItem"
            class="series-course-form"
            :model="formItem"
            :rules="ruleValidate"
            label-position='right'
            :label-width="100">
            <FormItem label="系列课名称"
                prop="title">
                <Input v-model="formItem.title"
                    placeholder="系列课名称"></Input>
            </FormItem>

            <FormItem label="简介"
                prop="desc">
                <Input v-model="formItem.desc"
                    type="textarea"
                    :autosize="{minRows: 10,maxRows:50}"
                    placeholder="简介"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary"
                    @click="handleSubmit('formItem')">提交</Button>
                <Button @click="handleReset('formItem')"
                    style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>

</template>
<script>
import Mock from 'mockjs'
import SectionTitle from '@components/SectionTitle.vue'

export default {
    components: {
        SectionTitle
    },
    props: {
        id: ''
    },
    data() {
        return {
            formItem: {
                title: '',
                desc: ''
            },
            ruleValidate: {
                title: [
                    { required: true, message: '请输入课程类名称', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '请输入课程简介', trigger: 'blur' },
                    { type: 'string', min: 20, message: '简介不应少于20字符', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.formItem.title = Mock.Random.csentence(10, 20);
        this.formItem.desc = Mock.Random.cparagraph(10, 20);
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let params = this.formItem
                    this.doSubmit(params).then(data => {
                        this.$Message.success('操作成功!');
                        this.handleReset(name)
                    }).catch(e => {
                        this.$Message.error(e);
                    })

                } else {
                    this.$Message.error('表单填写不完整');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        doSubmit(params) {
            return new Promise((reslove, reject) => {
                this.$http.post('create-course-series', params).then(r => {
                    reslove(r)
                }).catch(error => {
                    reject(error)
                })
            })

        }

    }
}
</script>


<style lang="less">
.new-course-panel {
    .series-course-form {
        margin-top: 20px;
        margin-right: 40px;
    }
}
</style>
