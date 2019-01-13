<!-- 作业组件 批改和未批改 -->
<template>
  <div>
    <div class="paper-view-panel">
      <div class="task-info">
        <Card>
          <p slot="title">作业内容</p>
          <!-- <div class="content">{{paperInfo.content}}</div> -->
          <QuillEditor :value="paperInfo.content" v-if="!paperInfo.correctstate"></QuillEditor>
          <QuillEditorAnnotate :value="paperInfo.correctcontent" v-if="paperInfo.correctstate"></QuillEditorAnnotate>
        </Card>
      </div>
      <div class="comment-teacher" v-if="paperInfo.correctstate">
        <Card>
          <p slot="title">老师点评</p>
          <div class="content">{{paperInfo.comment}}</div>
        </Card>
      </div>
      <div class="comment-student" v-if="paperInfo.correctstate">
        <span class="title">评价老师</span>
        <Rate clearable v-model="paperInfo.rate"/>
      </div>
      <div class="cmd-panel">
        <nuxt-link :to="{name:'member-tasklist'}">继续写作业</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Mock from 'mockjs'
import QuillEditor from '@components/QuillEditor.vue'
import QuillEditorAnnotate from '@components/QuillEditorAnnotate.vue'

export default {
  components: {
    QuillEditor,
    QuillEditorAnnotate
  },

  data() {
    return {
      paperId: '',
      rate: 2,
      paperInfo: {
        correctstate: true,
        correctcontent: '',
        comment: '',
        content: ''
      }
    };
  },

  computed: {},

  mounted() {
    this.paperId = this.$route.query.id;
    // let paperInfo = Mock.mock({
    //   "object": {
    //     "content": Mock.Random.cparagraph(80, 100),
    //     "comment": Mock.Random.cparagraph(50, 80),
    //     "rate": Mock.Random.integer(1, 5),
    //   }
    // })
    // this.paperInfo = paperInfo.object
    this.getPaper(this.paperId)
  },

  methods: {
    getPaper(id) {
      this.$http.get('get-paper', { id: id }).then(r => {
        console.log(r.data)
        this.paperInfo = r.data
      }).catch(e => {
        this.$Notice.error({
          desc: e.message
        })
      })
    },
  }
}

</script>
<style lang='less'>
.paper-view-panel {
  overflow-y: inherit;
  .task-info,
  .comment-teacher {
    padding: 10px 0;
    margin-bottom: 10px;
    .content {
      text-indent: 2em;
    }
  }

  .comment-student {
    margin-bottom: 10px;
    .title {
      font-size: 1em;
      margin-right: 10px;
    }
  }
}
</style>