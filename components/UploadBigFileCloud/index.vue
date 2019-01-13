<template>
    <div class='file-upload-plupload'>
        <Button type="primary"
            :id='"load_"+_uid'
            :disabled='load_disabled'
            class="btn load">加载</Button>

        <Table ref="myTable"
            :columns="columns"
            :data="uploadFiles"
            v-show='uploadFiles.length>0'>
            <!-- 进度 -->
            <template slot="percent"
                slot-scope="props">
                <Progress :stroke-width="20"
                    class="progress"
                    :percent="props.row.percent"
                    status="active" />
            </template>

            <!-- 操作 -->
            <template slot="action"
                slot-scope="props">
                <Button type="primary"
                    :id='"upload_"+_uid'
                    class="btn"
                    @click="onUpload(props.idx)">上传</button>
                <Button :id='"upload_cancle"+_uid'
                    class="btn"
                    @click="onCancelUpload(props.idx)">取消上传</Button>
            </template>
        </Table>
    </div>
</template>

<script >

import qiniuconfig from '@config/index.js'
// import qiniu from 'qiniu-js/dist/qiniu.min.js'

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
            load_disabled: false,
            token: '',
            uploader: null,
            percent: 0,
            chunk_size: 4 * 1024 * 1024,
            blockSize: 0,
            key: '',
            spinShow: false,
            file: null,
            uptoken: '',
            uploadFiles: [],
            fileIndex: 0,
            columns: [
                {
                    title: '文件名',
                    key: 'fileName',
                    width: 200,
                },
                {
                    title: '大小',
                    key: 'fileSize',
                    width: 100,
                },
                {
                    title: '进度',
                    key: 'percent',
                    render: (h, params) => {
                        this.uploadFiles[params.index] = params.row
                        return h(
                            'div',
                            this.$refs.myTable.$scopedSlots.percent({
                                row: params.row,
                                idx: params.row._index
                            })
                        )
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
                    render: (h, params) => {
                        return h(
                            'div',
                            this.$refs.myTable.$scopedSlots.action({
                                idx: params.row._index
                            })
                        )
                    }
                },

            ]
        }
    },
    watch: {
        value(val) {
            this.uploadFiles = [].concat(val)
        }
    },
    mounted() {
        this.getUptoken().then(({ token, putExtra, config, domain }) => {
            this.initQiniu(token, putExtra, config, domain, qiniuconfig.qiniuZone)
        })
    },
    methods: {
        getUptoken() {
            return new Promise((reslove, reject) => {
                this.$http.get('upload-token', '').then(r => {
                    var token = r.uptoken;
                    var domain = r.domain;
                    var config = {
                        useCdnDomain: true,
                        disableStatisticsReport: false,
                        retryCount: 6,
                        region: qiniuconfig.region.z1
                    };
                    var putExtra = {
                        fname: "",
                        params: {},
                        mimeType: null
                    };
                    reslove({ token, putExtra, config, domain })
                }).catch(error => {
                    reject(error)
                })
            })
        },

        initQiniu(token, putExtra, config, domain, uploadUrl) {
            let _this = this;
            this.putExtra = putExtra
            this.token = token
            var uploadUrl = uploadUrl
            var board = {};
            var indexCount = 0;
            var resume = false;
            var chunk_size;
            var uploader = new plupload.Uploader({
                runtimes: "html5,flash,silverlight,html4",
                url: uploadUrl,
                browse_button: "load_" + this._uid, // 触发文件选择对话框的按钮，为那个元素id
                flash_swf_url: "../../static/Moxie.swf", // swf文件，当需要使用swf方式进行上传时需要配置该参数
                silverlight_xap_url: "../../static/Moxie.xap",
                chunk_size: 4 * 1024 * 1024,
                max_retries: 3,
                multipart_params: {
                    // token从服务端获取，没有token无法上传
                    token: token
                },
                init: {
                    PostInit: function () {
                        console.log("upload init");
                    },
                    FilesAdded: function (up, files) {
                        resume = false;
                        let obj = {
                            fileName: files[0].name,
                            type: files[0].type,
                            fileSize: Math.round(files[0].size / 1024 / 1024 * 100) / 100 + ' MB',
                            percent: 0
                        }
                        _this.uploadFiles.push(obj)
                        // console.log('FilesAdded', up, files)
                    },
                    FileUploaded: function (up, file, info) {
                        // console.log('FileUploaded', up, file, info);
                    },
                    UploadComplete: function (up, files) {
                        // Called when all files are either uploaded or failed
                        // console.log("UploadComplete", up, files);
                    },
                    Error: function (up, err) {
                        console.log('Error', up, err);
                    }
                }
            });
            uploader.init();
            uploader.bind('Error', function (err) {
                console.log(err)
                _this.load_disabled = false
            })
            uploader.bind('FilesAdded', function (err) {
                _this.load_disabled = true
            })
            uploader.bind("BeforeUpload", function (uploader, file) {
                _this.key = file.name;
                putExtra.params["x:name"] = _this.key.split(".")[0];
                var id = file.id;
                chunk_size = uploader.getOption("chunk_size");
                _this.chunk_size = uploader.getOption("chunk_size");
                var directUpload = function () {
                    var multipart_params_obj = {};
                    multipart_params_obj.token = token;
                    // filterParams 返回符合自定义变量格式的数组，每个值为也为一个数组，包含变量名及变量值
                    var customVarList = qiniu.filterParams(putExtra.params);
                    for (var i = 0; i < customVarList.length; i++) {
                        var k = customVarList[i];
                        multipart_params_obj[k[0]] = k[1];
                    }
                    multipart_params_obj.key = _this.key;
                    uploader.setOption({
                        url: uploadUrl,
                        multipart: true,
                        multipart_params: multipart_params_obj
                    });
                };

                var resumeUpload = function () {
                    _this.blockSize = chunk_size
                    _this.initFileInfo(file);
                    if (_this.blockSize === 0) {
                        _this.mkFileRequest(file)
                        uploader.stop()
                        return
                    }
                    resume = true;
                    var multipart_params_obj = {};
                    // 计算已上传的chunk数量
                    var index = Math.floor(file.loaded / chunk_size);

                    var headers = qiniu.getHeadersForChunkUpload(token)
                    uploader.setOption({
                        url: uploadUrl + "/mkblk/" + _this.blockSize,
                        multipart: false,
                        required_features: "chunks",
                        headers: {
                            Authorization: "UpToken " + token
                        },
                        multipart_params: multipart_params_obj
                    });
                };
                // 判断是否采取分片上传
                if (
                    (uploader.runtime === "html5" || uploader.runtime === "flash") &&
                    chunk_size
                ) {
                    if (file.size < chunk_size) {
                        directUpload();
                    } else {
                        resumeUpload();
                    }
                } else {
                    console.log(
                        "directUpload because file.size < chunk_size || is_android_weixin_or_qq()"
                    );
                    directUpload();
                }
            });

            uploader.bind("ChunkUploaded", function (up, file, info) {
                var res = JSON.parse(info.response);
                var leftSize = info.total - info.offset;
                var chunk_size = uploader.getOption && uploader.getOption("chunk_size");
                if (leftSize < chunk_size) {
                    up.setOption({
                        url: uploadUrl + "/mkblk/" + leftSize
                    });
                }
                up.setOption({
                    headers: {
                        Authorization: "UpToken " + token
                    }
                });
                // 更新本地存储状态
                var localFileInfo = JSON.parse(localStorage.getItem(file.name)) || [];
                localFileInfo[indexCount] = {
                    ctx: res.ctx,
                    time: new Date().getTime(),
                    offset: info.offset,
                    percent: file.percent
                };
                indexCount++;
                debugger
                localStorage.setItem(file.name, JSON.stringify(localFileInfo));
            });

            // 每个事件监听函数都会传入一些很有用的参数，
            // 我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
            uploader.bind("UploadProgress", function (uploader, file) {
                // console.log('UploadProgress', uploader, file)
                var id = file.id;
                // 更新进度条进度信息;
                _this.percent = file.percent
                _this.uploadFiles[_this.fileIndex].percent = file.percent
                var fileUploaded = file.loaded || 0;
                var count = Math.ceil(file.size / uploader.getOption("chunk_size"));
                if (file.size > chunk_size) {
                    _this.updateChunkProgress(file, board[id], chunk_size, count);
                }
            });

            uploader.bind("FileUploaded", function (uploader, file, info) {
                var id = file.id; 
                indexCount=0;
                if (resume) {
                    _this.mkFileRequest(file)
                } else {
                    _this.uploadFinish(JSON.parse(info.response), file.name, board[id]);
                }
            });
           
            this.uploader = uploader;
        },
        updateChunkProgress(file, board, chunk_size, count) {
            var index = Math.ceil(file.loaded / chunk_size);
            var leftSize = file.loaded - chunk_size * (index - 1);
            if (index == count) {
                chunk_size = file.size - chunk_size * (index - 1);
            }
        },
        uploadFinish(res, name) {
            // console.log('uploadFinish', res, name)
            this.uploadFiles[this.fileIndex].url = `http://${qiniuconfig.qiniuDomain}/${name}`
            // console.log('uploadFiles_url', this.uploadFiles)
            this.$emit('uploadFinish',this.uploadFiles)
            localStorage.removeItem(name)
            this.load_disabled = false
        },
        initFileInfo(file) {
            var localFileInfo = JSON.parse(localStorage.getItem(file.name)) || [];
            let indexCount = 0;
            var length = localFileInfo.length
            if (length) {
                var clearStatus = false
                for (var i = 0; i < localFileInfo.length; i++) {
                    indexCount++
                    if (this.isExpired(localFileInfo[i].time)) {
                        clearStatus = true
                        localStorage.removeItem(file.name);
                        break;
                    }
                }
                if (clearStatus) {
                    indexCount = 0;
                    return
                }
                file.loaded = localFileInfo[length - 1].offset;
                var leftSize = file.size - file.loaded;
                if (leftSize < this.chunk_size) {
                    this.blockSize = leftSize
                }
                file.percent = localFileInfo[length - 1].percent;
                return
            } else {
                indexCount = 0
            }
        },
        mkFileRequest(file) {
            // 调用sdk的url构建函数
            var requestUrl = qiniu.createMkFileUrl(
                qiniuconfig.qiniuZone,
                file.size,
                this.key,
                this.putExtra
            );
            let _this = this
            var ctx = []
            var id = file.id
            var local = JSON.parse(localStorage.getItem(file.name))
            debugger
            for (var i = 0; i < local.length; i++) {
                ctx.push(local[i].ctx)
            }
            // 设置上传的header信息
            var headers = qiniu.getHeadersForMkFile(this.token)
            var xhr = new XMLHttpRequest();
            xhr.timeout = 600000;

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    var res = xhr.response;
                    if (xhr.status === 200) {
                        _this.uploadFinish(res, file.name);
                    } else {
                        _this.$Notice.error({
                            title: '上传失败请稍后重试'
                        });
                    }
                    _this.spinShow = false
                }
            };
            xhr.open('POST', requestUrl, true);
            xhr.setRequestHeader("Content-Type", headers['content-type'])
            xhr.setRequestHeader("Authorization", headers['Authorization']);
            xhr.responseType = 'json';
            xhr.send(ctx.join(","));
        },

        isExpired(time) {
            let expireAt = time + 3600 * 24 * 1000;
            return new Date().getTime() > expireAt;
        },

        onUpload(idx) {
            this.fileIndex = idx
            this.uploader.start();
        },
        onCancelUpload(idx) {
            this.uploader.stop();
            let fileName=this.uploadFiles[idx].fileName
            this.uploadFiles.splice(idx, 1);
            localStorage.removeItem(name)
            this.load_disabled=false
        },

        delete_img(item) {
            this.uploadFiles.splice(item, 1);
        },
    },
}

</script>
<style  lang="less">
.file-upload-plupload {
    .btn {
        margin: 0 5px;
    }
    .load {
        margin: 5px 5px;
    }
    .progress {
    }
}
</style>