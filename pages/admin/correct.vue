<template>

  <div class="correct-panel">
    <div class="cmd">
      <Button class="btn"
        type="primary"
        @click="saveCorrect">保存</Button>
      <Button class="btn"
        type="primary"
        @click="closeWindown">关闭</Button>
    </div>
    <QuillEditor :value="paper.content"
      @editor-blur='onEditorBlur' />

    <div class="comment">
      <h3>老师评语：</h3>
      <Input v-model="paper.comment"
        type="textarea"
        :autosize="{minRows: 2,maxRows: 5}"
        placeholder="Enter something..." />
      <br/>
      <h3>量化评分：</h3>
      <Slider v-model="paper.score"
        show-input></Slider>
    </div>

  </div>
</template>

<script>
import Mock from 'mockjs'
import QuillEditor from '@components/QuillEditorAnnotate.vue'

export default {
  components: {
    QuillEditor
  },
  props: {
    paperId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      correctState: true,
      paper: {
        content: '',
        comment: '',
        score: 100,
      }
    }
  },
  mounted() {
    // this.taskContent = '<h1 class="ql-align-center"><span style="font-size: 30px;">	关于氪空间</span></h1><p class="ql-align-justify"><br></p><p class="ql-align-justify"><span style="font-size: 18px;">		氪空间是以联合办公为载体，社群为纽带的企业服务平台。氪空间诞生的初心是解决小微团队办公难的问题，使命是“让办公更美好”，以空间产品构建线上线下社群，在提供联合办公空间的基础上，从用户需求出发推出更多围绕办公生态的服务，实现“赋能一亿人的快乐办公生活”的愿景。&nbsp;&nbsp;&nbsp;</span></p><p class="ql-align-justify"><span style="font-size: 18px;">		截至2018年6月，氪空间在中国覆盖北京、上海、香港、广州、杭州、南京、武汉、天津、苏州、厦门、合肥等11个城市，运营60多个联合办公社区，管理面积超过30万平方米，工位数量超过42000个，服务企业数量超过3000家。</span></p><p class="ql-align-justify"><span style="font-size: 18px;">		目前，氪空间已经开始布局亚太市场，目标是2019年底在以中国为主的亚洲范围内实现管理面积超过150万平方米，实时服务22万会员，“让联合办公成为城市商业的标配”。</span></p><h2 class="ql-align-center"><br></h2><p><br></p><p><br></p>'
    //  this.getPaper()
    this.getPaper(this.$route.query.id)
  },

  methods: {
    getPaper(id) {
      this.$http.get('get-paper', { id: id }).then(r => {
        console.log(r.data)
        this.paper = r.data
      }).catch(e => {
        this.$Notice.error({
          desc: e.message
        })
      })
    },
    onEditorBlur(content) {
      this.paper.correctcontent = content
    },
    saveCorrect() {
      console.log(this.paper)
      let { _id, correctcontent, comment, score } = this.paper
      let parmas = { _id, correctcontent, comment, score }
      this.$http.post('correct-paper', parmas).then(r => {
        this.$Notice.success({
          desc: '保存成功'
        })
        window.opener.location.reload()
        window.close();
      }).catch(e => {
        this.$Notice.error({
          desc: e.message
        })
      })
    },
    closeWindown() {
      window.close();
    }
  },
}
</script>

<style lang="less">
.correct-panel {
    .cmd {
        width: 1066px;
        margin: 20px auto;
        .btn {
            margin-right: 20px;
        }
    }
    .comment {
        width: 1066px;
        margin: 20px auto;
    }
}
</style>
