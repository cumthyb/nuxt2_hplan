<template>
    <div class="course-panel">
        <div class="command-panel">
            <span class="btn"
                v-if='!showMask'>
                <nuxt-link :to="{name:'member-courselist',params:{ 'username': 222}}">我的课程</nuxt-link>
            </span>
            <span class="btn"
                v-if='!showMask'>
                <nuxt-link :to="{name:'member-papers',params:{ 'username': 222}}">我的作业</nuxt-link>
            </span>
        </div>
        <div class="split-panel">
            <Split v-model="split1">
                <div slot="left"
                    class="sub-split-pane">
                    <div class="mask"
                        v-if='showMask'>
                        <span class="mask-tip">
                            会员可看
                        </span>
                    </div>
                    <div>
                        <div v-for='(item,index) in courseSeries'
                            :key='item.value'
                            class="course-series-name"
                            :class="{ active: index==currentSeriesIndex }"
                            @click="onSelectCourseSeries(item.value)">{{'课程系列'+(index+1)+':'+item.label}}</div>
                    </div>
                </div>
                <div slot="right"
                    class="sub-split-pane">
                    <div class="mask"
                        v-if='showMask'>
                        <span class="mask-tip">
                            会员可看
                        </span>
                    </div>
                    <div>
                        <div v-for='(item,index) in currentCourses'
                            :key='item._id'
                            class="course-name"
                            :class="{ active: index==currentCourseIndex }"
                            @click="onSelectCourse(item)">{{'课程'+(index+1)+':'+item.title}}</div>
                    </div>

                </div>
            </Split>
        </div>
    </div>
</template>

<script>
import Mock from 'mockjs'
import { mapState } from 'vuex'
import course from './course.vue'
export default {
    components: {
        course
    },
    data() {
        return {
            showMask: false,
            split1: 0.4,
            courseSeries: [],
            currentCourses: [],
            currentCourse: [],
            currentSeriesIndex: -1,
            currentCourseIndex: -1,
        }
    },
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapState([
            'user'
        ])
    },
    watch: {
        user(val) {
            if (val.name) {
                this.showMask = false
            }
            else {
                this.showMask = true
            }
        }
    },
    mounted() {
        // let arr = Mock.mock({
        //     "series|10-20": [
        //         {
        //             // "title": Mock.Random.csentence(10, 20),
        //             "seriseName": () => Mock.Random.csentence(10, 20),

        //             // "courses": function () {
        //             //     // return Mock.Random.cparagraph(3, 5)
        //             //     return Mock.Random.cparagraph(20, 50)
        //             // }

        //             "courses|5-15": [
        //                 {
        //                     'courseName': () => Mock.Random.csentence(10, 20),
        //                     'course': () => Mock.Random.cparagraph(20, 50)
        //                 }
        //             ]

        //         }
        //     ]
        // })
        // this.courseSeries = [].concat(arr.series)
        // this.currentCourses = this.courseSeries[0].courses

        let userName = this.$store.state.user.name;
        if (userName) {
            this.showMask = false
        }
        else {
            this.showMask = true
        }
        this.initSeriesSplit();

    },
    methods: {
        initSeriesSplit() {
            this.getAllSeries().then(data => {
                this.courseSeries = data
            }).then(() => {
                this.onSelectCourseSeries(this.courseSeries[0].value)
            })
        },
        getAllSeries() {
            return new Promise((reslove, reject) => {
                this.$http.get('find-all-course-series', '').then(r => {
                    reslove(r.data)

                }).catch(e => {
                    this.$Message.error(e.message);
                    reject(e)

                })
            })
        },
        getCourse(seriesID) {
            return new Promise((reslove, reject) => {
                this.$http.get('find-course-seriesid', { id: seriesID }).then(r => {
                    reslove(r.data)

                }).catch(e => {
                    this.$Message.error(e.message);
                    reject(e)

                })
            })
        },
        onSelectCourseSeries(seriesID) {
            this.getCourse(seriesID).then(data => {
                this.currentCourses = data
            })
        },
        onSelectCourse(course) {
            this.currentCourseIndex = index;
            this.courseDesc = this.currentCourses[index].course
        },
        onClickCourse(name) {
            // this.$route.push('course')
            // window.open('course', '_blank')
        },
        onClickTask(name) {

        },
    },
}
</script>

<style lang="less">
.course-panel {
    width: 1200px;
    height: 100%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    .command-panel {
        margin: 20px;
        // height: 60px;
        .btn {
            margin-right: 50px;
        }
    }
    .split-panel {
        border: 1px solid #dcdee2;
        flex: 1;
        .sub-split-pane {
            height: 100%;
            padding: 10px;
            overflow: auto;
            position: relative;
            .mask {
                width: 97%;
                height: 98%;
                position: absolute;
                background-color: lightgrey;
                opacity: 0.5;
                .mask-tip {
                    font-size: 40px;
                    text-shadow: 5px 5px 5px black, 0px 0px 2px black; // 没错这里设置了两个 shadow
                    color: white;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    user-select: none;
                }
            }
            .course-series-name,
            .course-name {
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
    }
}
</style>
