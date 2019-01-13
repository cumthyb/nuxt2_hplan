<template>
    <div class='formRegister'>
        <Form ref="formRegister"
            :model="formRegister"
            :rules="ruleRegister"
            :label-width="80">
            <FormItem label="用户名"
                prop="name">
                <Input v-model="formRegister.name"
                    placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="昵称"
                prop="alias">
                <Input v-model="formRegister.alias"
                    placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="性别"
                prop="sex">
                <RadioGroup v-model="formRegister.sex">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="QQ"
                prop="qq">
                <Input v-model="formRegister.qq"
                    placeholder="Enter your qq"></Input>
            </FormItem>
            <FormItem label="邮箱"
                prop="email">
                <Input v-model="formRegister.email"
                    placeholder="Enter your e-email"></Input>
            </FormItem>
            <FormItem label="手机"
                prop="tel">
                <Input v-model="formRegister.tel"
                    placeholder="Enter your tel"></Input>
            </FormItem>
            <FormItem label="密码"
                prop="pwd">
                <Input v-model="formRegister.pwd"
                    type='password'
                    placeholder="Enter your pwd"></Input>
            </FormItem>
            <FormItem label="确认密码"
                prop="pwd">
                <Input v-model="formRegister.pwd"
                    type='password'
                    placeholder="Enter your pwd"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary"
                    @click="handleRegister('formRegister')">注册</Button>
                <Button @click="handleReset('formRegister')"
                    style="margin-left: 8px">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import Mock from 'mockjs'
export default {
    components: {

    },
    data() {
        return {
            formRegister: {
                name: '1',
                alias: '',
                email: 'email@server.com',
                tel: '18513040628',
                pwd: '2',
                sex: '男',
                qq: '787'
            },
            ruleRegister: {
                name: [
                    {
                        required: true,
                        message: 'The name cannot be empty',
                        trigger: 'blur'
                    }
                ],
                alias: [
                    {
                        required: true,
                        message: 'The alias cannot be empty',
                        trigger: 'blur'
                    }
                ],
                qq: [
                    {
                        required: true,
                        message: 'The qq cannot be empty',
                        trigger: 'blur'
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: 'The sex cannot be empty',
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: true,
                        message: 'Mailbox cannot be empty',
                        trigger: 'blur'
                    },
                    { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                ],

                tel: [
                    {
                        required: true,
                        message: 'Please enter a personal tel',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        max: 11,
                        message: 'Introduce no more than 11 words',
                        trigger: 'blur'
                    }
                ],
                pwd: [
                    {
                        required: true,
                        message: 'Please enter a personal pwd',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        max: 20,
                        message: 'Introduce no more than 20 words',
                        trigger: 'blur'
                    }
                ]
            },
        }
    },
    mounted() {
        this.formRegister.name = Mock.Random.first()
        this.formRegister.alias = Mock.Random.cname()
        this.formRegister.qq = '' + Mock.Random.integer(10000)
    },
    methods: {
        handleRegister(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$http
                        .post('member-register', this.formRegister)
                        .then(response => {
                            this.$Notice.info({
                                title: '注册成功'
                            })
                            setTimeout(() => {
                                this.$emit('register-success')
                            }, 1000)
                        })
                        .catch(error => {
                            this.$Notice.error({
                                title: error.message
                            })
                            this.$emit('register-fail')
                        })
                } else {
                    this.$Message.error('表单填写不完整')
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields()
        }
    },
}
</script>

<style lang="less">
.formRegister {
    padding-right: 20px;
}
</style>
