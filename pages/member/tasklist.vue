<template>
    <div class="my-course-panel">
        <div class="split-container">
            <Split v-model="split1">
                <div slot="left"
                    class="split-pane">
                    <div>
                        <div v-for='(item,index) in courseList'
                            :key='item._id'
                            class="course"
                            :class="{ active: index==currentCourseIndex }"
                            @click="onSelectCourse(index)">{{'课程'+(index+1)+':'+item.title}}</div>
                    </div>
                </div>
                <div slot="right"
                    class="split-pane course-detail">
                    <div class="cmd">
                        <Button @click="onDoTask">写作业</Button>
                    </div>
                    <div class="name">
                        <h1> {{currentCourse.title}}</h1>
                    </div>
                    <div class="desc">{{currentCourse.desc}}</div>
                    <div class="video">
                        <VedioPlayer v-if='currentCourse.videourl'
                            :src='currentCourse.videourl[0]' />
                    </div>
                </div>
            </Split>
        </div>
        <Drawer title="写作业"
            v-model="drawerShow"
            width="80%"
            :mask-closable="false"
            class="task-right-drawer"
            :styles="styles">
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px"
                    :disabled='quitDisable'
                    @click="drawerShow = false">离开草稿</Button>
                <Button type="primary"
                    v-if='modifyDisable'
                    @click="onModifyTask">修改作业</Button>
                <Button type="primary"
                    :disabled='submitDisable'
                    @click="onSubmitTask">提交作业</Button>
            </div>
            <QuillEditor v-show='taskContentEdit'
                :value="taskContent"
                @editor-blur='onEditorBlur' />
            <div v-if='!taskContentEdit'
                v-html="taskContent"></div>
        </Drawer>
    </div>
</template>

<script>
import Mock from 'mockjs'
import { mapState } from 'vuex'
import VedioPlayer from '@components/VideoPlayer.vue'
import QuillEditor from '@components/QuillEditor.vue'

export default {
    components: {
        QuillEditor,
        VedioPlayer
    },
    data() {
        return {
            split1: 0.3,
            courseList: [],
            currentCourse: {},
            currentCourseIndex: -1,
            drawerShow: false,
            taskContent: '',
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            modifyDisable: true,
            submitDisable: false,
            quitDisable: false,
            taskContentEdit: false,
        }
    },
    watch: {
        taskContent(val) {
            console.log(val)
        }
    },
    computed: {
        ...mapState([
            'user'
        ])
    },
    mounted() {
        this.getMyCourses()
    },
    methods: {
        onSelectCourse(index) {
            this.currentCourseIndex = index;
            this.currentCourse = this.courseList[index]
        },
        getMyCourses() {
            this.$http.post('post-my-course', '').then(r => {
                console.log(r.data)
                this.courseList = r.data
                this.onSelectCourse(0)
            }).catch(e => {
                this.$Notice.error({
                    desc: e.message
                })
            })
        },
        onDoTask(memberId, taskId) {
            this.drawerShow = true
            let taskContent = this.getTaskContent(memberId, taskId);
        },
        //获取已提交的作业内容
        getTaskContent(memberId, taskId) {
            let content = 'shjkdllsjkjljkljlldk';



            return content;
        },

        onEditorBlur(content) {
            this.taskContent = content
        },
        onModifyTask() {
            this.taskContentEdit = true;
            this.modifyDisable = false
            this.taskContent = '"<p><br></p><h2 class="ql-align-center"><span class="ql-size-huge">Drawer 抽屉概述</span></h2><ol><li>抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。</li></ol><p><br></p><p><br></p><p class="ql-align-center"><img src="http://pe3q7604z.bkt.clouddn.com/1537285956672"></p><p class="ql-align-center"><br></p>"'
        },

        onSubmitTask() {
            this.drawerShow = false
        }
    },
}
</script>

<style lang="less">
.my-course-panel {
    height: 100%;
    .split-container {
        height: 100%;
        border: 1px solid #dcdee2;
        .split-pane {
            padding: 10px;
            .course {
                padding: 0 4px;
                height: 40px;
                line-height: 40px;
                &:hover {
                    background-color: lightgrey;
                    cursor: pointer;
                }
            }
            .active {
                background-color: lightgrey;
            }
        }
        .course-detail {
            height: 100%;
            display: flex;
            flex-direction: column;
            .name {
                height: 30px;
                text-align: center;
                margin: 20px;
            }
            .desc {
                height: 60px;
                margin: 20px;
                text-indent: 2em;
                font-size: 14px;
            }
            .do-task {
                flex: 1;
            }
        }
    }
}
.task-right-drawer {
    .demo-drawer-footer {
        width: 95%;
        margin: 0 auto;
    }
    .quill-editor-container {
        padding-top: 10px;
    }
}
</style>
