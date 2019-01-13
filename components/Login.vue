<template>
    <div class='formLogin'>
        <Form ref="formLogin"
            :model="formLogin"
            :rules="ruleLogin"
            :label-width="80">
            <FormItem label="用户名"
                prop="name">
                <Input v-model="formLogin.name"
                    placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="密码"
                prop="pwd">
                <Input v-model="formLogin.pwd"
                    type='password'
                    placeholder="Enter your pwd"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary"
                    @click="handleLogin('formLogin')">登陆</Button>
                <Button @click="cancelLogin"
                    style="margin-left: 8px">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    components: {

    },
    data() {
        return {
            formLogin: {
                name: '',
                pwd: '2'
            },
            ruleLogin: {
                name: [
                    {
                        required: true,
                        message: 'The name cannot be empty',
                        trigger: 'blur'
                    }
                ],

                pwd: [
                    {
                        required: true,
                        message: 'Please enter a personal pwd',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    mounted(){
        this.formLogin.name=Cookies.get('name')
    },
    methods: {
        handleLogin(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$http
                        .post('member-login', this.formLogin)
                        .then(response => {
                            this.$Notice.info({
                                title: '登陆成功'
                            })
                            setTimeout(() => {
                                this.$store.commit('login', response.data)
                                
                                this.$emit('login-success', response.data)
                            }, 200)
                        })
                        .catch(error => {
                            this.$Notice.error({
                                title: error.message
                            })
                            this.$emit('login-fail')
                        })
                } else {
                    this.$Message.error('表单填写不完整')
                }
            })
        },
        cancelLogin() {
            this.$emit('login-cancel')
        }
    },
}
</script>

<style lang="less">
.formLogin {
    padding-right: 20px;
}
</style>
