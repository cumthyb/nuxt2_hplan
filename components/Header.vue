<template>
  <div class='header-container'>
    <div class="left">
      <div class="h-logo">
        <img src="https://static1.51cto.com/edu/center/images/home/logo.png"
          width="157"
          height="34">
      </div>
      <div class="h-slogan">
        <img src="https://static1.51cto.com/edu/center/images/home/logo2.png"
          width="157"
          height="34">
      </div>
    </div>
    <nav class="middle">
      <Menu mode="horizontal"
        active-name="1">
        <MenuItem name="1"
          :to="{name:'home',params:{ 'username': 222}}">
        首页
        </MenuItem>
        <MenuItem name="2"
          :to="{name:'member',params:{ 'username': 222}}">
        所有课程
        </MenuItem>
        <MenuItem name="3"
          v-if='loginState'
          :to="{name:'member-courselist',params:{ 'username': 222}}">
        我的课程
        </MenuItem>
        <MenuItem name="4"
          v-if='loginState'
          :to="{name:'member-papers',params:{ 'username': 222}}">
        我的作业
        </MenuItem>
      </Menu>
    </nav>
    <div class='right'>
      <span v-if='loginState'
        class='user'>欢迎用户&nbsp;{{user.alias}}</span>
      <span v-if='!loginState'
        class='user canclick'
        @click="onLogin">登陆</span>
      <span v-if='!loginState'
        class='user canclick'
        @click="onRegister">注册</span>

      <Dropdown class='user user-menu'
        v-if='loginState'>
        <a href="javascript:void(0)">
          <Avatar src="https://www.easyicon.net/api/resizeApi.php?id=1167486&size=24" />
          <!-- <Icon type="ios-arrow-down"></Icon> -->
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>
            <nuxt-link :to="{name:'member-psnInfo',params:{ 'name': user.name }}">个人中心</nuxt-link>
          </DropdownItem>
          <DropdownItem> <span @click="onLogout">退出</span></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <Modal v-model="modalRegister"
      width='350'
      title="会员注册">
      <MemberRegister v-if='modalRegister'
        @register-success='onRegisterSuccess'
        @register-fail='onRegisterFail' />
      <div slot='footer'> </div>
    </Modal>
    <Modal v-model="modalLogin"
      title="会员登陆"
      width='350'>
      <MemberLogin v-if='modalLogin'
        @login-cancel='onLoginCancel'
        @login-success='onLoginSuccess'
        @login-fail='onLoginFail' />
      <div slot='footer'> </div>
    </Modal>
  </div>
</template>
<script>
import MemberRegister from './Register.vue'
import MemberLogin from './Login.vue'

export default {
  components: {
    MemberRegister,
    MemberLogin
  },
  data() {
    return {
      user: {
        name: '',
        alias: ''
      },
      loginState: false,
      modalLogin: false,
      modalRegister: false,
    }
  },
  mounted() {
    // let img=new Image(AvatarPic)
  },
  methods: {
    onLogin() {
      this.modalLogin = true
    },
    onLoginCancel() {
      this.modalLogin = false
    },
    onLoginSuccess(data) {
      this.loginState = true
      this.modalLogin = false
      this.user = Object.assign({}, data)
    },
    onLoginFail() {
      this.modalLogin = false
    },
    onLogout() {
      this.loginState = false
      this.$emit('logout', this.user.alias)
      this.$store.commit('logout')
    },
    onRegister() {
      this.modalRegister = true
    },
    onRegisterSuccess() {
      this.modalRegister = false
    },
    onRegisterFail() {
      this.modalRegister = false
    }
  }
}
</script>
<style lang="less">
.header-container {
    width: 1200px;
    height: 62px;
    margin: 0 auto;
    .left {
        height: 100%;
        display: inline-block;
        .h-logo,
        .h-slogan {
            height: 100%;
            display: inline-block;
            margin-right: 20px;
            position: relative;
            img {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .h-logo {
            width: 160px;
        }
        .h-slogan {
            width: 160px;
        }
    }
    .middle {
        display: inline-block;
        padding-left: 50px;
        .ivu-menu-item {
            width: 150px;
            text-align: center
        }
    }
    .right {
        float: right;
        right: 10px;
        line-height: 62px;
        text-align: center;
        padding-right: 20px;
        .user {
            margin: 0 5px;
        }
        .canclick {
            background: #fff;
            color: #00baf2;
            cursor: pointer;
        }
        .user-menu {
            float: right;
            z-index: 901;
            ul {
            }
        }
    }
}
</style>
