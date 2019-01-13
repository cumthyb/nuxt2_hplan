<!--  -->
<template>
  <div class='customer-info-center-panel'>
    <Menu :active-name="currentMenuItem"
      class='menu'
      mode="vertical"
      width='160px'
      @on-select='onMenuChange'>
      <MenuItem name="create">
      <Icon type="md-add-circle"></Icon>
      新建课程
      </MenuItem>
      <MenuItem name="upload">
      <Icon type="ios-cloud-upload"></Icon>
      上传课程
      </MenuItem>
      <MenuItem name="manage">
      <Icon type="ios-construct"></Icon>
      管理课程
      </MenuItem>
      <MenuItem name="order">
      <Icon type="ios-reorder" />
      订单管理
      </MenuItem>

      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-create"></Icon>
          作业管理
        </template>
        <MenuItem name="task">布置作业</MenuItem>
        <MenuItem name="homework">批改作业</MenuItem>
      </Submenu>

    </Menu>
    <div class='content'>
      <transition>
        <keep-alive include="create,upload,manage,task,homework">
          <component :is="view"
            :id="eidtCourseId"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import createSeries from './createSeries.vue'
import uploadCourse from './uploadCourse.vue'
import manageCourse from './manageCourse.vue'
import createOrder from './createOrder.vue'
import manageTask from './manageTask.vue'
import correctHomework from './correctHomework.vue'
export default {
  name: 'personalcenter-customer',
  components: {
    'create': createSeries,
    'upload': uploadCourse,
    'manage': manageCourse,
    'order': createOrder,
    'task': manageTask,
    'homework': correctHomework
  },
  data() {
    return {
      id: '',
      currentMenuItem: 'create',
      username: '',
      view: 'create',
      formItem: {
        username: '',
        aliasname: '',
        email: '',
        tel: '',
        password: ''
      }
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'currentView',
      'eidtCourseId'
    ])
  },
  watch: {
    currentView(val) {
      if (val) {
        this.currentMenuItem = val
        this.view = val
      }
    },
    eidtCourseId(val) {
      this.id = val
    },
  },
  mounted() {
    this.username = this.$route.params.username

    this.viewPersonalInfo(this.username)
  },
  methods: {
    viewPersonalInfo(username) {
      this.$http
        .post('member-info', { username: username })
        .then(r => {
          this.formItem = r.data
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          })
        })
    },
    onMenuChange(name) {
      this.view = name
      this.$store.commit('changeCurrentView', { view: name, id: '' })
    }
  }
}
</script>
<style lang='less'>
.customer-info-center-panel {
    display: flex;
    height: ~'calc(100% - 130px)';
    .menu {
        width: 240px;
    }
    .content {
        flex: 1;
    }
}
</style>