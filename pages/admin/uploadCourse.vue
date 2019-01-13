<template>
    <div class="upload-course-panel">
        <SectionTitle title="上传课程" />
        <Form ref="formItem"
            class="upload-form"
            :model="formItem"
            :rules="ruleValidate"
            label-position='right'
            :label-width="100">
            <FormItem label="课程标题"
                prop="title">
                <Input v-model="formItem.title"
                    placeholder="课程标题"></Input>
            </FormItem>

            <FormItem label="课程简介"
                prop="desc">
                <Input v-model="formItem.desc"
                    type="textarea"
                    :autosize="{minRows: 5,maxRows:15}"
                    placeholder="课程简介"></Input>
            </FormItem>

            <FormItem label="上传封面"
                prop="coverimg">
                <UploadImgCloud :multiple="true"
                    v-model="formItem.coverimg"></UploadImgCloud>
            </FormItem>
            <FormItem label="上传视频"
                prop="videourl">
                <!-- <input v-model="formItem.video"
                    type="file"
                    style="display:none"></input> -->
                <Button type="dashed"
                    long
                    @click="modal1=true"
                    icon="md-add">
                    上传视频
                </Button>
                <p v-for="(video,index) in formItem.videourl"
                    :key="video"> <span>{{index+1}}:</span><span> {{video}}</span> <span class="delete"
                        @click="onDeleteVideo(index)">×</span> </p>
            </FormItem>
            <FormItem label="课程分类"
                prop="series">
                <Select v-model="formItem.series"
                    style="width:600px">
                    <Option v-for="item in courseSeriesList"
                        :value="item.value"
                        :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <ul class="formitem-ul">
                <li>
                    <FormItem label="价格"
                        prop="price">
                        <InputNumber :min="0"
                            :step="1"
                            v-model="formItem.price"></InputNumber>
                    </FormItem>
                </li>
                <li>
                    <FormItem label="优惠"
                        prop="discount">
                        <InputNumber :max="10"
                            :min="1"
                            :step="0.1"
                            v-model="formItem.discount"></InputNumber>&nbsp;折
                    </FormItem>
                </li>
            </ul>
            <FormItem label="是否发布">
                <RadioGroup v-model="formItem.publish">
                    <Radio label="yes">立即发布</Radio>
                    <Radio label="no">暂不发布</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Button type="primary"
                    @click="handleSubmit('formItem')">提交</Button>
                <Button @click="handleReset('formItem')"
                    style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <Modal v-model="modal1"
            title="视频上传"
            width="800"
            :mask-closable="false"
            @on-ok="modal1=false"
            @on-cancel="modal1=false">
            <UploadBigFileCloud @uploadFinish='onUploadFinish' />
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
import Mock from 'mockjs'
import { mapGetters } from 'vuex'
import SectionTitle from '@components/SectionTitle.vue'
import UploadImgCloud from '@components/UploadImgCloud.vue'
import UploadBigFileCloud from '@components/UploadBigFileCloud'


export default {
    components: {
        SectionTitle,
        UploadImgCloud,
        UploadBigFileCloud
    },
    props: {
        id: ''
    },
    data() {
        return {
            modal1: false,
            courseSeriesList: [],
            formItem: {
                title: '',
                desc: '',
                publish: 'no',
                coverimg: [],
                videourl: [],
                audiourl: [],
                price: 300,
                discount: 10,
            },
            ruleValidate: {
                title: [
                    { required: true, message: '请输入课程类名称', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '请输入课程简介', trigger: 'blur' },
                    { type: 'string', min: 20, message: '简介不应少于20字符', trigger: 'blur' }
                ],
                series: [
                    { required: true, message: '请选择课程系列', trigger: 'change' }
                ],
                price: [
                    { required: true,type: 'number',  message: '请输入课程定价', trigger: 'change' }
                ],
                discount: [
                    { required: true,type: 'number', message: '请输入优惠折扣', trigger: 'change' }
                ],
            }
        }
    },
    computed: {
        ...mapGetters([
            'eidtCourseId',
        ])
    },
    watch: {
        id(val) {
            this.$store.commit('changeCourseId',val)
            if (val) {
                this.getCourseDetail(val).then(data => {
                    this.initCourse(data)
                })
            }
        }
    },
    mounted() {
        this.getSeries().then(series => {
            this.courseSeriesList = series
            if (this.eidtCourseId) {
                this.getCourseDetail(this.eidtCourseId).then(data => {
                    this.initCourse(data)
                })
            } else {
                this.formItem.title = Mock.Random.csentence(10, 20);
                this.formItem.desc = Mock.Random.cparagraph(10, 20);
            }
        }).catch(e => {
            this.$Message.error(e.message);
        });
    },
    methods: {
        getSeries() {
            return new Promise((reslove, reject) => {
                this.$http.get('find-all-course-series', '').then(r => {
                    reslove(r.data)

                }).catch(e => {
                    this.$Message.error(e.message);
                    reject(e)

                })
            })

        },
        getCourseDetail(id) {
            return new Promise((reslove, reject) => {
                this.$http.get('find-course', { 'id': id }).then(r => {
                    reslove(r.data)
                }).catch(e => {
                    this.$Message.error(e.message);
                    reject(e)

                })
            })
        },
        initCourse(data) {
            console.log(data)
            this.formItem = {
                _id: data._id,
                title: data.title,
                desc: data.desc,
                series: data.series,
                publish: data.publish ? 'yes' : 'no',
                coverimg: data.coverimg,
                videourl: data.videourl,
                audiourl: data.audiourl,
                price: data.price,
                discount: data.discount
            }
        },
        onUploadFinish(files) {
            console.log(files)
            let arr = []
            files.map(item => arr.push(item.url))
            this.formItem = Object.assign(this.formItem, { videourl: arr })
        },

        onDeleteVideo(index) {
            this.formItem.videourl.splice(index, 1)
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let params = Object.assign({}, this.formItem, { publish: this.formItem.publish == 'yes' })
                    console.log(this.formItem)
                    this.$http.post('create-course', this.formItem).then(r => {
                        this.courseSeriesList = r.data;
                        this.$Message.success('操作成功!');
                        this.$store.commit('changeCurrentView', { view: '', id: '' })
                        this.handleReset('formItem')
                    }).catch(e => {
                        this.$Message.error(e.message);
                        this.$store.commit('changeCurrentView', { view: '', id: '' })
                    })

                } else {
                    debugger
                    this.$Message.error('请填写完整表单');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>


<style lang="less">
.upload-course-panel {
    .upload-form {
        margin-top: 20px;
        margin-right: 40px;
        .delete {
            float: right;
            font-size: 30px;
            color: red;
            right: 20px;
            cursor: pointer;
        }
        .formitem-ul {
            height: 50px;
            list-style: none;
            li {
                float: left;
                height: 50px;
                width: 200px;
            }
        }
    }
}
</style>
