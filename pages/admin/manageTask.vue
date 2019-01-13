<template>
  <div>
    <SectionTitle title="作业管理" />
    <Button type="primary"
      @click="onAddTask">
      <Icon type="md-add-circle"
        size="24" />
      发布作业
    </Button>
    <div class="task-panel">
      <Table border
        class='tasks-table'
        :columns="columns"
        :data="dataTable"></Table>
    </div>
    <Drawer title="Create"
      v-model="addTaskDrawer"
      width="720"
      :mask-closable="false"
      :styles="styles">
      <Form :model="formData"
        :rules="ruleValidate"
        label-position='right'
        :label-width="100">

        <FormItem label="所属课程"
          prop="course">
          <Select v-model="formData.course"
            style="width:600px">
            <Option v-for="item in courseList"
              :value="item._id"
              :key="item._id">{{ item.title }}</Option>
          </Select>
        </FormItem>

        <FormItem label="任务标题"
          prop="title">
          <Input type="textarea"
            v-model="formData.title"
            :rows="4"
            placeholder="please enter the description" />
        </FormItem>

        <FormItem label="任务详情"
          prop="desc">
          <Input type="textarea"
            v-model="formData.desc"
            :rows="4"
            placeholder="please enter the description" />
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px"
          @click="addTaskDrawer = false">Cancel</Button>
        <Button type="primary"
          :disabled='createDisable'
          @click="createTask">Submit</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import Mock from 'mockjs'
import SectionTitle from '@components/SectionTitle.vue'
import dateUtils from 'vue-dateutils';

export default {
  components: {
    SectionTitle
  },
  props: {
    id: ''
  },
  data() {
    return {
      createDisable: false,
      addTaskDrawer: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formData: {
        course: '',
        title: '',
        desc: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: '请输入任务标题', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入任务简介', trigger: 'blur' },
          { type: 'string', min: 20, message: '简介不应少于20字符', trigger: 'blur' }
        ],
        course: [
          { required: true, message: '请选择所属课程', trigger: 'change' }
        ]
      },
      courseList: [],
      columns: [
        {
          title: '所属课程',
          key: 'course',
          align: 'center',
          render:(h,params)=>{
            debugger
            return h('span',params.row.course.title)
          }
        },
        {
          title: '任务名',
          key: 'title',
          align: 'center'
        },
        {
          title: '发布时间',
          key: 'utime',
          align: 'center',
          render: (h, params) => {
            return h('span',dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.row.utime))) 
          }
        }
      ],
      columns2: [
        {
          title: '学员昵称',
          key: 'aliasName',
          align: 'center'
        },
        {
          title: '课程分类',
          key: 'courseSeries',
          align: 'center',
          render: (h, params) => {
            let str = params.row.name2
            return h('p', { style: { color: str == '合格' ? 'black' : 'red' } }, str)
          }
        },
        {
          title: '提交时间',
          key: 'submitTime',
          align: 'center',
          render: (h, params) => {
            return dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.row.submitTime))
          }
        },
        {
          title: '批改人',
          key: 'corrector',
          align: 'center'
        },
        {
          title: '学员评价',
          key: 'rate',
          align: 'center'
        },
        {
          title: '操作',
          key: 'aliasName',
          align: 'center'
        }
      ],
      dataTable: []
    }
  },
  watch: {
    addTaskDrawer(val) {
      if (val) {
        this.getCourse()
      }
    }
  },
  mounted() {
    // this.mockdata()
    this.getTasks()
  },
  methods: {
    mockdata() {
      let data = Mock.mock({
        "arr|10-25": [
          {
            'aliasName': () => Mock.Random.cname(),
            'courseSeries': () => Mock.Random.csentence(5),
            'submitTime': () => Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
            'corrector': () => Mock.Random.cname(),
            'rate': () => Mock.Random.integer(0, 5),
          }
        ]
      })
      this.dataTable = data.arr
    },
    onAddTask() {
      this.addTaskDrawer = true
    },
    getCourse() {
      this.$http.get('find-all-course', '').then(r => {
        this.courseList = r.data;
      }).catch(e => {
        this.$Message.error(e.message);
      })
    },
    createTask() {
      this.createDisable = true
      this.$http.post('create-task', this.formData).then(r => {
        this.$Message.success('操作成功');
        this.createDisable = false
      }).catch(e => {
        this.$Message.error(e.message);
        this.createDisable = false
      })
    },
    getTasks() {
      this.$http.get('find-all-task', '').then(r => {
        this.dataTable = r.data;
      }).catch(e => {
        this.$Message.error(e.message);
      })
    }
  },
}
</script>

<style lang="less">
.papers-panel {
    margin-top: 20px;
    padding: 20px;
}
</style>
