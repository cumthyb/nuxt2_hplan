<template>
  <div>
    <SectionTitle title="批改作业" />
    <div class="papers-panel">
      <Table border
        class='tasks-table'
        :columns="columns"
        :data="dataTable"></Table>
    </div>
  </div>
</template>

<script>
import Mock from 'mockjs'
import SectionTitle from '@components/SectionTitle.vue'
import QuillEditor from '@components/QuillEditorAnnotate.vue'
import dateUtils from 'vue-dateutils';

export default {
  components: {
    SectionTitle,
    QuillEditor
  },
  props: {
    id: ''
  },
  data() {
    return {
      currentPaper: '',
      columns: [
        {
          title: '学员昵称',
          key: 'alias',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.member.alias)
          }
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
          key: 'submittime',
          align: 'center',
          render: (h, params) => {
            return h('span', dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.row.submittime)))
          }
        },
        {
          title: '批改状态',
          key: 'correctState',
          align: 'center',
          render: (h, params) => {
            let color = ''
            let text = ''
            if (params.row.correctstate) {
              color = '#238EFA'
              text = '已批改'
            }
            else {
              color = '#C01920',
                text = '未批改'
            }

            return h(
              'p',
              {
                style: {
                  color: color,
                  cursor: 'pointer'
                }
              },
              text
            )
          }

        },
        {
          title: '学员评价',
          key: 'rate',
          align: 'center'
        },
        {
          title: '操作',
          key: 'aliasName',
          align: 'center',
          render: (h, params) => {
            return h(
              'p',
              {
                style: {
                  color: '#3F4EFC',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.handleCorrect(params.row._id)
                  }
                }
              },
              '查看'
            )
          }
        }
      ],
      dataTable: []
    }
  },
  mounted() {
    // this.mockdata()
    this.getAllPaper()
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
    getAllPaper() {
      this.$http.get('get-paper', '').then(r => {
        console.log(r.data)
        this.dataTable = r.data
      }).catch(e => {
        this.$Notice.error({
          desc: e.message
        })
      })
    },
    onEditorBlur(content) {
      this.correctContent = content;
      console.log('correctContent', this.correctContent)
    },
    handleCorrect(paperId) {
      this.correctState = true
      this.currentPaper = paperId
      debugger
      window.open('/#/admin/correct?id=' + paperId)
    },
    saveCorrect() {
      console.log('save')
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
