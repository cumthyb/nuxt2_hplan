<template>
  <div class="create-order-panel">
    <div class="cmd-panel">
      <Button @click="handleOpenDraw"
        type="primary">新建订单</Button>
    </div>
    <div>
      <Drawer title="新建订单"
        v-model="drwaOpen"
        width="900"
        :mask-closable="false"
        :styles="styles">
        <Form :label-width="100"
          ref="formData"
          class='create-panel'
          :rules="ruleValidate"
          :model="formData">
          <Row>
            <Col span="20">
            <FormItem label="会员"
              prop="member"
              label-position="top">
              <Transfer :data="memberArr"
                class="member-transfer"
                :titles="titles"
                :target-keys="formData.member"
                :list-style="listStyle"
                :render-format="renderTransfer"
                :operations="['To left','To right']"
                filterable
                @on-change="handleTransferChange">
                <div style="{float: 'right', margin: '5px'}">
                  <Button size="small"
                    @click="getMemberArr">重新加载</Button>
                </div>
              </Transfer>
            </FormItem>
            </Col>
            <Col span="20">
            <FormItem label="课程"
              prop="course"
              label-position="top">
              <Select v-model="formData.course"
                style="width:600px">
                <Option v-for="item in courseArr"
                  :value="item._id"
                  :key="item._id">{{ item.title }}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="6">
            <FormItem label="付款金额"
              prop="amount"
              label-position="top">
              <InputNumber :min="0"
                v-model="formData.amount"></InputNumber>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="付款渠道"
              prop="paychannel"
              label-position="top">
              <Select v-model="formData.paychannel"
                placeholder="请选择付款渠道">
                <Option value="zfb">支付宝</Option>
                <Option value="wx">微信</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="付款时间"
              prop="paytime"
              label-position="top">
              <DatePicker v-model="formData.paytime"
                type="datetime"
                placeholder="请选择支付时间"
                style="width: 160px"></DatePicker>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="有效期"
              prop="validityPeriod"
              label-position="top">
              <DatePicker type="daterange"
                split-panels
                placeholder="请选择有效期间"
                style="width: 200px"
                v-model="formData.validityPeriod"></DatePicker>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <div class="demo-drawer-footer">
          <Button style="margin-right: 8px"
            @click="drwaOpen = false">关闭</Button>
          <Button type="primary"
            @click="handleCreateOrder">提交</Button>
        </div>
      </Drawer>
    </div>
    <div class="table-panel">
      <Table border
        class='course-table'
        :columns="columns"
        :data="orderDatas"></Table>
    </div>
  </div>
</template>

<script>
import dateUtils from 'vue-dateutils';

export default {
  components: {

  },
  props: {
    id: ''
  },
  data() {
    return {
      drwaOpen: false,
      courseArr: [],
      memberArr: [],
      member: [],
      titles: ['所有会员', '目标会员'],
      listStyle: {
        width: '250px',
        height: '300px'
      },
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formData: {
        id: '',
        member: [],
        course: '',
        amount: 0,
        paytime: '',
        paychannel: '',
        validityPeriod: ''
      },
      orderDatas: [],
      columns: [
        {
          title: '序号',
          key: 'title',
          align: 'center',
          width: 80,
          render: (h, params) => {
            return h('p', params.row._index + 1)
          }
        },
        {
          title: '会员',
          key: 'member',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('p', params.row.member.alias)
          }
        },
        {
          title: '课程',
          key: 'course',
          align: 'center',
          width: 160,
          render: (h, params) => {
            return h('p', params.row.course.title)
          }
        },
        {
          title: '金额',
          key: 'amount',
          align: 'center',
          width: 100,
          render: (h, params) => {
            return h('p', params.row.amount)
          }
        },
        {
          title: '支付时间',
          key: 'paytime',
          align: 'center',
          render: (h, params) => {
            return h('p', dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.row.paytime)))
          }
        },
        {
          title: '支付渠道',
          key: 'paychannel',
          align: 'center',
          width: 90,
          render: (h, params) => {
            return h('p', params.row.paychannel)
          }
        },
        {
          title: '有效期间',
          key: 'series',
          align: 'center',
          render: (h, params) => {
            return h('p', dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.startdate)) + ' 至 ' + dateUtils.dateToStr("YYYY-MM-DD", new Date(params.row.enddate)))
          }
        },
      ],
      ruleValidate: {
        member: [
          { required: true, type: 'array', message: '请选择会员', trigger: 'change' }
        ],
        course: [
          { required: true, type: 'string', message: '请选择课程', trigger: 'change' }
        ],
        amount: [
          { required: true, type: 'number', message: '请填写支付金额', trigger: 'change' }
        ],
        paychannel: [
          { required: true, type: 'string', message: '请选择付款渠道', trigger: 'change' }
        ],
        paytime: [
          { required: true, type:'date', message: '请选择支付时间', trigger: 'change' }
        ],
        validityPeriod: [
          { required: true, type: 'array', message: '请选择订单有效期', trigger: 'change' }
        ],
      }
    }
  },
  mounted() {
    this.getAllOrders();
  },
  methods: {
    handleOpenDraw() {
      this.drwaOpen = true;
      this.getAllCourse();
      this.getMemberArr();
    },
    handleCreateOrder() {
      console.log(this.formData)

      this.$refs["formData"].validate((valid) => {
        if (valid) {
          let obj = Object.assign({}, this.formData)
          this.formData.member.map(item => {
            let o = Object.assign({}, obj)
            o.member = item;
            this.$http.post('create-order', o).then(r => {
              this.$Message.success('操作成功');
            }).catch(e => {
              this.$Message.error(e.message);
            })
          })
          this.getAllOrders();
          this.drwaOpen = false
        } else {
          this.$Message.error('表单填写不完整');
        }
      })
    },
    renderTransfer(item) {
      return item.label + ' - ' + item.description;
    },
    handleTransferChange(newTargetKeys) {
      this.formData.member = newTargetKeys;
    },
    getMemberArr() {
      this.$http
        .post('member-findAll', '')
        .then(r => {
          let arr = []
          r.data.map(item => arr.push({
            key: item.id,
            description: item.name,
            label: item.alias,
            disabled: item.name == 'admin'
          }))
          console.log(arr)
          this.memberArr = arr
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          })
        })
    },
    getAllCourse() {
      this.$http.get('find-all-course', '').then(r => {
        this.courseArr = r.data;
      }).catch(e => {
        this.$Message.error(e.message);
      })
    },
    getAllOrders() {
      this.$http.get('find-all-order', '').then(r => {
        this.orderDatas = r.data;
      }).catch(e => {
        this.$Message.error(e.message);
      })
    }
  },
}
</script>

<style lang="less">
.create-order-panel {
    margin-top: 20px;
    padding: 20px;
    .course-table {
        margin-top: 20px;
    }
}
.create-panel {
    .member-transfer {
        .ivu-transfer-list-footer {
            bottom: 12px;
        }
    }
    .demo-drawer-footer {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
}
.demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
}
</style>
