<template>
  <div style='height:100%'>
    <Card class="com-login-card">
      <Avatar icon="ios-person"
        size="large" />
      <div class="btns"
        v-if='!loginState'>
        <Button type="primary"
          class="btn"
          @click="onLogin">登陆</Button>
        <Button class="btn"
          @click="onRegister">注册</Button>
      </div>
      <div v-else
        style='tex'
        class='info'>
        <p>欢迎{{formLogin.alisename}}</p>
        <p class='psn-center'>
          <nuxt-link :to="{name:'personal-center-customer',params:{ 'username': formLogin.username }}">个人中心</nuxt-link>
        </p>
        <p class='logout'
          @click="onLogout">退出</p>
      </div>
    </Card>
    <Modal v-model="modalRegister"
      width='350'
      title="会员注册">
      <div class='formRegister'>
        <Form ref="formRegister"
          v-if='modalRegister'
          :model="formRegister"
          :rules="ruleRegister"
          :label-width="80">
          <FormItem label="用户名"
            prop="username">
            <Input v-model="formRegister.username"
              placeholder="Enter your username"></Input>
          </FormItem>
          <FormItem label="昵称"
            prop="aliasname">
            <Input v-model="formRegister.aliasname"
              placeholder="Enter your username"></Input>
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
            prop="password">
            <Input v-model="formRegister.password"
              type='password'
              placeholder="Enter your password"></Input>
          </FormItem>
          <FormItem label="确认密码"
            prop="password">
            <Input v-model="formRegister.password"
              type='password'
              placeholder="Enter your password"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary"
              @click="handleRegister('formRegister')">注册</Button>
            <Button @click="handleReset('formRegister')"
              style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
      <div slot='footer'> </div>
    </Modal>
    <Modal v-model="modalLogin"
      title="会员登陆"
      width='350'>
      <div class='formLogin'>
        <Form ref="formLogin"
          v-if='modalLogin'
          :model="formLogin"
          :rules="ruleLogin"
          :label-width="80">
          <FormItem label="用户名"
            prop="username">
            <Input v-model="formLogin.username"
              placeholder="Enter your username"></Input>
          </FormItem>
          <FormItem label="密码"
            prop="password">
            <Input v-model="formLogin.password"
              type='password'
              placeholder="Enter your password"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary"
              @click="handleLogin('formLogin')">登陆</Button>
            <Button @click="modalLogin=false"
              style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
      <div slot='footer'> </div>
    </Modal>
  </div>

</template>

<script>
import Mock from 'mockjs'

export default {
  props: {
    showLogin: '',
    showLogout: ''
  },
  data() {
    return {
      loginState: false,
      modalLogin: false,
      modalRegister: false,
      formRegister: {
        username: '1',
        aliasname: '',
        email: 'email@server.com',
        tel: '18513040628',
        password: '2'
      },
      ruleRegister: {
        username: [
          {
            required: true,
            message: 'The username cannot be empty',
            trigger: 'blur'
          }
        ],
        aliasname: [
          {
            required: true,
            message: 'The aliasname cannot be empty',
            trigger: 'blur'
          }
        ],
        qq: [
          {
            required: true,
            message: 'The aliasname cannot be empty',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: 'The aliasname cannot be empty',
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
            message: 'Please enter a personal introduction',
            trigger: 'blur'
          },
          {
            type: 'string',
            max: 11,
            message: 'Introduce no more than 11 words',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please enter a personal introduction',
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
      formLogin: {
        username: 'Daniel',
        password: '2'
      },
      ruleLogin: {
        username: [
          {
            required: true,
            message: 'The username cannot be empty',
            trigger: 'blur'
          }
        ],

        password: [
          {
            required: true,
            message: 'Please enter a personal introduction',
            trigger: 'blur'
          },
          {
            type: 'string',
            max: 20,
            message: 'Introduce no less than 20 words',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  watch: {
    showLogin(val) {
      this.modalLogin = true
    },
    showLogout() {
      this.onLogout()
    }
  },
  methods: {
    onLogin() {
      this.modalLogin = true
    },
    onLogout() {
      this.loginState = false
      this.$emit('logout', this.formLogin.aliasname)
    },
    onRegister() {
      this.modalRegister = true
      this.formRegister.username = Mock.Random.first()
      this.formRegister.aliasname = Mock.Random.cname()
    },

    handleLogin(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          let _this = this
          this.$http
            .post('member-login', this.formLogin)
            .then(response => {
              _this.$Notice.info({
                title: '登陆成功'
              })
              _this.loginState = true
              setTimeout(() => {
                _this.modalLogin = false
                _this.formLogin.alisename = response.data.alisename
                _this.$emit('login', response.data.alisename)
              }, 1000)
            })
            .catch(error => {
              this.$Notice.error({
                title: error.message
              })
            })
        } else {
          this.$Message.error('表单填写不完整')
        }
      })
    },
    handleRegister(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.$http
            .post('member-register', this.formRegister)
            .then(response => {
              this.$Notice.info({
                title: '注册成功'
              })
              setTimeout(() => {
                this.modalRegister = false
              }, 1000)
            })
            .catch(error => {
              this.$Notice.error({
                title: error.message
              })
            })
        } else {
          this.$Message.error('表单填写不完整')
        }
      })
    },
    handleReset(username) {
      this.$refs[username].resetFields()
    }
  }
}
</script>
<style lang="less">
.com-login-card {
    text-align: center;
    height: 100%;
    .ivu-card-body {
        height: 100%;
        .ivu-avatar-large {
            width: 120px;
            height: 120px;
            line-height: 120px;
            border-radius: 60px;
            font-size: 80px;
            margin: 20px;
        }
    }
    .btns {
        padding-top: 20px;
        .btn {
            margin: 0 15px;
        }
    }
    .info {
        p {
            margin-bottom: 10px;
        }
        .psn-center,
        .logout {
            color: coral;
            cursor: pointer;
        }
    }
}
.formRegister,
.formLogin {
    width: 300px;
}
</style>
