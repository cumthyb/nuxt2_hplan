<template>
  <section class="quill-editor-container">
    <div
      class="quill-editor"
      :content="content"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      v-quill:quill="editorOption"
      ref="quill"
    ></div>
    <Upload @upload-success="onFileUpload" ref="upload"/>
  </section>
</template>

<script>
import Upload from './Upload.vue'

export default {
  components: {
    Upload
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
    }

  },
  data() {
    return {
      content: '',
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['link', 'image', 'video'],
              ['clean']
            ],
            handlers: {
              // handlers object will be merged with default handlers object
              link: function (value) {
                if (value) {
                  var href = prompt('Enter the URL')
                  this.quill.format('link', href)
                } else {
                  this.quill.format('link', false)
                }
              },
              image: () => {
                this.$refs['upload'].click()
              },
              video: () => {
                this.$refs['upload'].click()
              },
            }
          }
        }
      },

    }
  },
  watch: {
    editable(val){
      this.quill.enable(val)
    },
    value(val) {
      this.content = val
      if (val != this.content) {
        debugger
        this.content = val
      }
    }
  },
  mounted() {
    // console.log('app init, my quill insrance object is:', this.myQuillEditor)
    // setTimeout(() => {
    //   this.content = ''
    // }, 3000)
  },
  methods: {
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
      this.$emit('editor-blur', this.content)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
      this.$emit('input', this.content)
    },
    onFileUpload(currentFileClassification, fileUrl) {
      let length = this.quill.getLength();
      this.quill.insertEmbed(length, currentFileClassification, fileUrl)
      this.quill.setSelection(length + 1) //调整光标到最后
    }
  }
}
</script>

<style lang="less">
.quill-editor-container {
  width: 95%;
  margin: 0 auto;
  padding: 50px 0;
  // text-align: left;
  height: 100%;
  .quill-editor {
    height: 100%;
    min-height: 500px;
    max-height: 750px;
    overflow-y: auto;
  }
}
</style>
