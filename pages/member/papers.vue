<!-- 作业总览 -->
<template>
  <div class="papers-panel">
    <SectionTitle :title="title"/>
    <Table border="" class="papers-table" :columns="columns1" :data="tableData"></Table>
  </div>
</template>

<script>
import SectionTitle from '@components/SectionTitle.vue'
export default {
  name: 'task',
  components: {
    SectionTitle
  },
  data() {
    return {
      userName: '蜗牛',
      wordsCount: 56562,
      columns1: [
        {
          title: '作业名称',
          key: 'title',
          align: 'center',
          render: (h, params) => {
            if (params.row.task) {
              return h('p', params.row.task.title)
            }

          }
        },
        {
          title: '作业状态',
          key: 'score',
          align: 'center',
          className: 'score',
          render: (h, params) => {
            let score = params.row.score
            let str = '优秀'
            if (score >= 90) {
              str = '优秀'
            } else if (score >= 80 && score < 90) {
              str = '良好'
            } else if (score >= 60 && score < 80) {
              str = '合格'
            } else if (score >= 0 && score < 60) {
              str = '不合格'
            } else {
              str = '未批改'
            }
            return h('p', str)
          }
        },
        {
          title: '批改状态',
          key: 'name3',
          align: 'center',
          render: (h, params) => {
            let color = ''
            let text = ''
            if (params.row.name3 == '已批改') {
              color = '#3F4EFC'
              text = '已批改'
            }
            else {
              color = '#c3e5a0',
                text = '未批改'
            }

            return h(
              'p',
              {
                style: {
                  color: color,
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.jump2PaperDetail( params.row._id)
                  }
                }
              },
              text
            )
          }
        },
        {
          title: '提交次数',
          key: 'submittimes',
          align: 'center'
        }
      ],
      tableData: []
    }
  },

  computed: {
    title: {
      get() {
        return `亲爱的${this.userName}同学，你已经在花生写作上累计写了${this.wordsCount}字`
      }
    }
  },

  mounted() {
    this.getMyPapers()
  },

  methods: {
    getMyPapers() {
      this.$http.get('get-my-papers', '').then(r => {
        this.tableData = r.data
      }).catch(e => {
        this.$Message.error(e.message);
      })
    },
    jump2PaperDetail(id) {
      this.$router.push({ path: '/member/paperView', query: { 'id': id } });
    }
  }
}
</script>
<style lang='less'>
.papers-panel {
  padding: 20px;
  .papers-table {
    margin-top: 10px;
  }
}
</style>