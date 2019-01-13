<template>
    <div class='finish_room'>
        <div class='finish_room2'>
            <Spin size="large"
                fix
                v-if="spinShow"></Spin>
            <div v-for='(item ,index ) in uploadFiles'
                class='room_img'>
                <img v-if="item.mimeType.startsWith('image')"
                    :src="item.url">
                <span v-else="item.mimeType.startsWith('image')"
                    class="file-name">{{item.name.substring(0,10) }}</span>
                <span class="delete-btn"
                    @click='delete_img(index)'><img src="../static/delete.png"></span>
            </div>
            <div class='room_add_img'
                v-if='multiple||uploadFiles.length!=1'>
                <span><img src="../static/add.png"></span>
                <span>加载文件</span>
                <input @change='add_img'
                    type="file">
            </div>
        </div>
    </div>

</template>

<script >
import config from '@config/index.js'


export default {
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array,
            default: () => []
        }
    },
    data: function () {
        return {
            spinShow: false,
            file: null,
            uptoken: '',
            fileType: {
                image: ['png', 'jpeg', 'jpg', 'bmp', 'gif', 'ico'],
                video: ['mp4', 'webm', 'ogg', 'mpeg4'],
            },
            currentFileClassification: '',
            uploadFiles: [],
        }
    },
    watch: {
        value(val) {
            this.uploadFiles = [].concat(val)
        }
    },
    methods: {
        delete_img(item) {
            this.uploadFiles.splice(item, 1);
        },
        add_img(event) {
            var reader = new FileReader();
            var file0 = event.target.files[0];
            reader.readAsDataURL(file0);
            reader.onloadend = () => {
                this.spinShow = true
                this.$http
                    .get('upload-token', '').then(r => {
                        this.uptoken = r.uptoken
                        this.getUpFileUrl(file0)
                    }).catch(error => {
                        this.spinShow = false
                        this.$Notice.error({
                            title: '上传凭证请求失败'
                        })
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

                        let fileUrl = `http://${config.qiniuDomain}/${fileResponse.key}`
                        let file = {
                            fname: fileResponse.fname,
                            mimeType: fileResponse.mimeType,
                            url: fileUrl
                        }

                        that.uploadFiles.push(file);
                        that.$emit('input', that.uploadFiles)
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
    }


}

</script>
<style  lang="less">
.finish_room {
    width: 430px;
    height: auto;
    .finish_room2 {
        width: 100%;
        height: auto;
        padding-top: 15px;
        padding-bottom: 15px;
        display: flex;
        align-items: center;
        // border-bottom: 2px solid #e1e1e1;
        .room_img {
            width: 150px;
            height: 100px;
            margin-right: 10px;
            border: 1px solid #e1e1e1;
            position: relative;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
            .file-name {
                position: absolute;
                display: inline-block;
                max-width: 110px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            .delete-btn {
                position: absolute;
                width: auto;
                height: auto;
                right: 5px;
                bottom: 3px;
                cursor: pointer;
            }
        }
    }
    .room_add_img {
        width: 148px;
        height: 98px;
        border: 1px solid #e1e1e1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        position: relative;
        span:nth-child(1) {
            margin-top: 20px;
            width: 40px;
            height: 40px;
            overflow: hidden;
        }
        span:nth-child(2) {
            margin-bottom: 10px;
        }
        input {
            cursor: pointer;
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            z-index: 99999;
            opacity: 0;
        }
    }
}
</style>