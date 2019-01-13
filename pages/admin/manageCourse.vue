<template>
    <div>
        <SectionTitle title="课程管理" />
        <div class="course-manage-panel">
            <Table border
                class='course-table'
                :columns="columns"
                :data="cousesDatas"></Table>
        </div>

    </div>
</template>

<script>
import dateUtils from 'vue-dateutils';
import SectionTitle from '@components/SectionTitle.vue'

export default {
    components: {
        SectionTitle
    },
    props: {
        id: ''
    },
    data() {
        return {
            columns: [
                {
                    title: '课程名称',
                    key: 'title',
                    align: 'center'
                },
                {
                    title: '所属专题',
                    key: 'series',
                    align: 'center',
                    render: (h, params) => {
                        return h('p', params.row.series.title)
                    }
                },
                {
                    title: '上传时间',
                    key: 'ctime',
                    align: 'center',
                    width: 160,
                    render: (h, params) => {
                        return h('p', dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.row.ctime)))
                    }
                },
                {
                    title: '操作',
                    key: 'name4',
                    align: 'center',
                    width: 160,
                    className: 'col col-operation',
                    render: (h, params) => {

                        return h('div', [
                            h('span', {
                                'class': 'btn edit',
                                on: {
                                    click: this.jumpCourseEdit.bind(this, params.row._id)
                                }
                            }, '编辑'),
                            // h('span', {
                            //     'class': 'btn delete'
                            // }, '删除'),
                            h('span', {
                                'class': 'btn manage-member',
                                on: {
                                    click: this.jumpManageMember.bind(this, params.row._id)
                                }
                            }, '学员管理'),
                        ])
                    }
                }
            ],
            cousesDatas: []
        }
    },
    mounted() {
        this.getAllCourse();
    },
    methods: {
        getAllCourse() {
            this.$http.get('find-all-course', '').then(r => {
                this.cousesDatas = r.data;
            }).catch(e => {
                this.$Message.error(e.message);
            })
        },
        jumpCourseEdit(id) {
            console.log(id)
            this.$store.commit('changeCurrentView', { view: 'upload', id: id })
        },
        jumpManageMember(id) {
            // console.log(id)
            // this.$store.commit('changeCurrentView', { view: 'upload', id: id })
        }
    },
}
</script>

<style lang="less">
.course-manage-panel {
    margin-top: 20px;
    padding: 20px;
    .course-table {
        .col-operation {
            .ivu-table-cell {
                padding-left: 5px;
                padding-right: 5px;
                .btn {
                    margin: 0 5px;
                    cursor: pointer;
                    color: rgb(63, 78, 252);
                }
            }
        }
    }
}
</style>
