<template>
  <div id="h-paln-container">
    <div class="content">
      <Advantage class="content-advantage-panel"
        :data='advantageList' />
      <Comments/>
      <ButtonGroup vertical
        class="fixed">
        <Button icon="ios-phone-portrait">咨询</Button>
        <Button icon="ios-cart-outline">购买</Button>
      </ButtonGroup>
      <div class="content-members">
        <Table border
          :columns="columns1"
          :data="data1"></Table>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import HeaderSearch from './HeaderSearch'
import CourseCarousel from './CourseCarousel'
import Advantage from './Advantage'
import Comments from './Comments'
import LoginCard from './LoginCard'
export default {
  components: {
    HeaderSearch,
    CourseCarousel,
    Advantage,
    Comments,
    LoginCard
  },
  data() {
    return {
      showLogout: '',
      showLogin: '',
      userAliasName: '',
      loginState: '登陆',
      columns1: [
        {
          title: '会员类型',
          key: 'memberTypeName',
          align: 'center'
        },
        {
          title: '服务',
          key: 'serviceTypeName',
          align: 'center'
        },
        {
          title: '期限',
          key: 'servicePeroid',
          align: 'center'
        },
        {
          title: '价格',
          key: 'price',
          align: 'center'
        }
      ],
      data1: [
        {
          memberTypeName: '普通会员',
          serviceTypeName: '试学',
          servicePeroid: '无限期',
          price: '0'
        },
        {
          memberTypeName: '课程会员',
          serviceTypeName: '听课',
          servicePeroid: '课程期限',
          price: '课程价格'
        },
        {
          memberTypeName: '练习会员',
          serviceTypeName: '练习',
          servicePeroid: '课程期限',
          price: '课程价格'
        }
      ],
      advantageList: [
        {
          value: 'AD_1',
          label: '特色一',
          desc: '特色一特色一特色一'
        },
        {
          value: 'AD_2',
          label: '特色二',
          desc: '特色二特色二特色二'
        },
        {
          value: 'AD_3',
          label: '特色三',
          desc: '特色三特色三特色三特色三'
        },
        {
          value: 'AD_4',
          label: '特色四',
          desc: '特色四特色四特色四特色四特色四'
        }
      ]
    }
  },

  methods: {
    onLogin(name) {
      this.loginState = '退出'
      this.userAliasName = name
    },
    onLogout() {
      this.loginState = '登陆'
    },
    onLoginClick() {
      if (this.loginState == '登陆') {
        this.showLogin = new Date().getTime()
      } else {
        this.showLogout = new Date().getTime()
      }
    }
  }
}
</script>
<style lang="less">
#h-paln-container {
    .user-info {
        margin: 5px 0;
        span {
            margin: 0 10px;
        }
        .psn-center,
        .login {
            color: coral;
            cursor: pointer;
        }
    }
    .content {
        .content-advantage-panel {
            margin-top: 25px;
            margin-bottom: 25px;
            background-color: #f5f4f3;
        }
        .fixed {
            position: fixed;
            bottom: 400px;
            right: 256px;
            text-align: center;
            padding: 10px;
            margin: 10px;
            z-index: 99;
        }
        .content-members {
            margin: 20px 0;
            text-align: center;
        }
    }
}
</style>
