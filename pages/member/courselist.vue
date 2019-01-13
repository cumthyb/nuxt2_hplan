<template>
	<div class="my-course-panel">
		<div class="split-container"
		 v-if='courseList.length'>
			<Split v-model="split1">
				<div slot="left"
				 class="split-pane">
					<div>
						<div v-for="(item,index) in courseList"
						 :key="item._id"
						 class="course"
						 :class="{ active: index==currentCourseIndex }"
						 @click="onSelectCourse(index)">{{'课程'+(index+1)+':'+item.title}}</div>
					</div>
				</div>
				<div slot="right"
				 class="split-pane course-detail">
					<div class="cmd">
						<Button @click="onDoTask(currentCourse)">写作业</Button>
					</div>
					<div class="name">
						<h1>{{currentCourse.title}}</h1>
					</div>
					<div class="desc">{{currentCourse.desc}}</div>
					<div class="video">
						<VedioPlayer v-if="currentCourse.videourl"
						 :src="currentCourse.videourl[0]" />
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
			<div class="dotask-drawer-cmd">
				<Button style="margin-right: 8px"
				 :disabled="quitDisable"
				 @click="drawerShow = false">离开草稿</Button>
				<Button type="primary"
				 v-if="modifyDisable"
				 @click="onModifyTask">修改作业</Button>
				<Button type="primary"
				 :disabled="submitDisable"
				 @click="onSubmitTask">提交作业</Button>
			</div>
			<div class="dotask-drawer-task">
				<div class="task-title">{{currentTask.title}}</div>
				<div class="task-content">{{currentTask.desc}}</div>
			</div>
			<QuillEditor :editable="taskContentEdit"
			 :value="taskContent"
			 @editor-blur="onEditorBlur" />
			<!-- <div v-if="!taskContentEdit"
			 v-html="taskContent"></div> -->
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
			currentTask: {},
			currentPaper: {},
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
			this.getTask(this.currentCourse._id)
				.then(task => {
					this.getPaperInfo(task._id)
				});

		},
		//获取课程任务
		getTask(courseId) {
			return new Promise((reslove, reject) => {
				this.$http.get('find-task-ByCourse', { course: courseId }).then(r => {
					this.currentTask = r.data[0]
					reslove(this.currentTask)
				}).catch(e => {
					this.$Notice.error({
						desc: e.message
					})
					reject(e)
				})
			})

		},

		//获取该学院该课程已提交的作业
		getPaperInfo(taskId) {
			this.$http.get('get-paper-ByTask', { task: taskId }).then(r => {
				this.currentPaper = r.data
				this.taskContent = r.data.content
			})
		},

		onEditorBlur(content) {
			this.taskContent = content
		},
		onModifyTask() {
			this.taskContentEdit = true;
			this.modifyDisable = false
		},

		onSubmitTask() {
			let parmas = {
				task: this.currentTask._id,
				content: this.taskContent,
				_id:this.currentPaper._id
			}
			this.currentPaper.content = this.taskContent
			this.$http.post('post-paper', parmas).then(r => {
				this.$Notice.success({
					title: '操作成功'
				})
				this.drawerShow = false
			}).catch(e => {
				this.$Notice.error({
					desc: e.message
				})
			})

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
    .dotask-drawer-cmd {
        width: 95%;
        margin: 0 auto;
    }
    .dotask-drawer-task {
        .task-title {
        }
        .task-content {
        }
    }
    .quill-editor-container {
        padding-top: 10px;
    }
}
</style>
