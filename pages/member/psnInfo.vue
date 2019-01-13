<!-- 个人信息 -->
<template>
  <div class='person-info-panel'>
    <Card>
      <p slot="title">个人资料</p>
      <div class='info-content'>
        <Row class='row row-pic'>
          <Col class='col col1'
            span="6">图像</Col>
          <Col class='col col2'
            span="18">
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2102344391,1872452718&fm=200&gp=0.jpg"
            width="80"
            height="80"
            alt=""
            srcset=""
            class='pic'>

          <Upload ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            multiple
            type="drag"
            :data="uptoken"
            :action="actionUrl"
            style="display: inline-block;width:58px;"
            class='upload'>
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera"
                size="40">
              </Icon>
            </div>
          </Upload>
          <span class='desc'>点击重新上传</span>
          </Col>
        </Row>
        <Row class='row'>
          <Col class='col col1'
            span="6">用户名</Col>
          <Col class='col col2'
            span="18">
          <EditInput v-model="formItem.userName"></EditInput>
          </Col>
        </Row>
        <Row class='row'>
          <Col class='col col1'
            span="6">昵称</Col>
          <Col class='col col2'
            span="18">
          <EditInput v-model="formItem.aliasname"></EditInput>
          </Col>
        </Row>
        <Row class='row'>
          <Col class='col col1'
            span="6">邮箱</Col>
          <Col class='col col2'
            span="18">
          <EditInput v-model="formItem.email"></EditInput>
          </Col>
        </Row>
        <Row class='row'>
          <Col class='col col1'
            span="6">手机</Col>
          <Col class='col col2'
            span="18">
          <EditInput v-model="formItem.tel"></EditInput>
          </Col>
        </Row>
        <Row class='row'>
          <Col class='col col1'
            span="6">QQ</Col>
          <Col class='col col2'
            span="18">
          <EditInput v-model="formItem.qq"></EditInput>
          </Col>
        </Row>
        <Row class='row'>
          <Col class='col col1'
            span="6">职业</Col>
          <Col class='col col2'
            span="18">
          <EditInput v-model="formItem.job"></EditInput>
          </Col>
        </Row>
        <Row class='row'>
          <Col class='col col1'
            span="6">个人介绍</Col>
          <Col class='col col2'
            span="18">
          <EditInput v-model="formItem.desc"></EditInput>
          </Col>
        </Row>
      </div>
    </Card>
  </div>
</template>

<script>
import EditInput from '@components/EditInput.vue'
export default {
  name: 'psninfo',
  components: {
    EditInput
  },
  data() {
    return {
      uptoken: {},
      AccessKey: "Qu1MhLVW2pajQNEdLUaQvshbL7Gc_BjG2TlqPTty",
      SecretKey: "rNACt02t9bCfd9XZycX8llhvoQcyW41xUEl1f7bE",
      Bucket: "cumthyb",
      actionUrl: 'pe3q7604z.bkt.clouddn.com',
      formItem: {
        userName: '张杰'
      }
    }
  },

  mounted() {

  },

  methods: {

    handleSuccess(res, file) {
      file.url =
        'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc:
          'File format of ' +
          file.name +
          ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
  }
}
</script>
<style lang='less'>
.person-info-panel {
    width: 600px;
    margin: 20px auto;
    .row {
        .col {
            padding: 1rem 0;
            border-top: 1px solid #f1f1f1;
            height: 65px;
            line-height: 32px;
        }
        .col1 {
            text-align: center;
        }
    }
    .row-pic {
        .col {
            height: 100px;
            line-height: 67px;
            .pic {
                margin-right: 20px;
            }
            .upload {
                position: relative;
                top: -14px;
            }
            .desc {
                position: relative;
                top: -36px;
                padding: 20px;
            }
        }
    }
}
</style>