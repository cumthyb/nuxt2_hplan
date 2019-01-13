<template>
    <div class="upload-panel">
        <input type="file"
            name="file"
            style='display:none'
            ref='file'
            @change="fileChange">
        <Spin size="large"
            fix
            v-if="spinShow"></Spin>
    </div>

</template>

<script>
import config from '@config/index.js'
export default {
    components: {

    },
    data() {
        return {
            spinShow: false,
            file: null,
            uptoken: '',
            fileType: {
                image: ['png', 'jpeg', 'jpg', 'bmp', 'gif', 'ico'],
                video: ['mp4', 'webm', 'ogg', 'mpeg4'],
            },
            currentFileClassification: ''
        }
    },
    methods: {
        click() {
            this.$refs['file'].click()
        },

        //判断是否支持上传
        //获取上传token
        fileChange(event) {
            let file = event.target.files[0];
            let fileType = file.type.toLowerCase().split('/')
            let fileClassification = fileType[0];
            let codeType = fileType[1];
            if (this.fileType[fileClassification] && this.fileType[fileClassification].includes(codeType)) {
                this.currentFileClassification = fileClassification
                this.spinShow = true
                this.$http
                    .get('upload-token', '').then(r => {
                        this.uptoken = r.uptoken
                        this.getUpFileUrl(file)
                    }).catch(error => {
                        this.spinShow = false

                        this.$Notice.error({
                            title: '上传凭证请求失败'
                        })
                    })
            }
            else {
                this.$Notice.error({
                    title: '暂不支持上传此文件'
                })
            }

        },

        //获取上传的接口
        getUpFileUrl(files) {
            let file = files;
            var fileName = files.name;
            var form = new FormData();
            form.append("token", this.uptoken);
            form.append('fname', files.name);
            form.append('file', files);
            form.append("key", (new Date()).getTime());
            this.upfile(form, config.qiniuZone, files.name)
        },

        //执行上传
        upfile(form, serverUrl, fileName) {
            var that = this;
            var xhrfile = new XMLHttpRequest();
            xhrfile.timeout = 600000;
            xhrfile.onreadystatechange = function () {
                if (xhrfile.readyState === 4) {
                    var fileResponse = xhrfile.response;
                    if (xhrfile.status === 200) {
                        let fileUrl = `//${config.qiniuDomain}/${fileResponse.key}`
                        that.$emit('upload-success', that.currentFileClassification, fileUrl)

                    } else {
                        that.$Notice.error({
                            title: '上传失败请稍后重试'
                        });
                    }
                    that.spinShow = false
                }
            };
            xhrfile.open('POST', serverUrl, true);
            xhrfile.responseType = 'json';
            xhrfile.send(form);
        },
    },
}
</script>

<style lang="less">
.upload-panel {
    display: none;
}
</style>
