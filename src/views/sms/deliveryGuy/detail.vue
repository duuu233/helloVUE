<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>用户信息</span>
        <el-button size="small" @click="goList">返回</el-button>
      </div>
      <div class="userInfo-box">
        <div class="head">
          <!--    -->
          <img
            :src="
              dataObj.headImg
                ? dataObj.headImg
                : '../../../assets/images/no-login-avater.png'
            "
            alt="用户头像"
            style="width: 100px; height: 100px; margin-top: 10px"
          />
          <span
            >{{ dataObj.phone }}
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              v-permission="['post_deliveryGuy_setEditDeliveryGuy']"
              @click="open"
              >修改状态</el-button
            ></span
          >
        </div>
        <div class="item-box">
          <div class="item">用户名称：{{ dataObj.name }}</div>
          <div class="item">绑定手机：{{ dataObj.phone }}</div>
          <div class="item">账户启用状态：{{ dataObj.verifyMsg }}</div>
          <div class="item">实名认证：{{ dataObj.authStatusMsg }}</div>
        </div>
        <div class="item-box">
          <div class="item">工作类型：{{ dataObj.jobType }}</div>
          <div class="item">注册时间：{{ dataObj.joinTime }}</div>
          <div class="item">工作状态：{{ dataObj.jobStatusMsg }}</div>
          <div class="item">实名认证时间：{{ dataObj.lastAuthTime }}</div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>实名认证信息</span>
      </div>
      <div class="userInfo-box idCard-box">
        <div class="item-box">
          <div class="item bl-none">配送员姓名：{{ dataObj.name }}</div>
          <div class="item bl-none">手机号：{{ dataObj.phone }}</div>
          <div class="item bl-none">性别：{{ dataObj.sexMsg }}</div>
          <div>
            <el-image
              style="width: 200px; height: 200px"
              :src="dataObj.idCardFacadeImg"
              :preview-src-list="[dataObj.idCardFacadeImg]"
            >
            </el-image>
          </div>
        </div>
        <div class="item-box">
          <div class="item">身份证地址：{{ dataObj.idCardAddress }}</div>
          <div class="item">身份证号：{{ dataObj.idCard }}</div>
          <div class="item">身份证到期时间：{{ dataObj.idCardExpireTime }}</div>
          <el-image
            style="width: 200px; height: 200px"
            :src="dataObj.idCardBackImg"
            :preview-src-list="[dataObj.idCardBackImg]"
          >
          </el-image>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>统计信息</span>
      </div>

      <el-table
        ref="roleTable"
        :data="statsList"
        style="width: 100%"
        border
        :header-cell-style="{
          background: '#F2F6FA',
          color: '#555555',
          'text-align': 'center'
        }"
      >
        <el-table-column label="历史总接运单" align="center">
          <template slot-scope="scope">{{
            scope.row.allWaybillCount
          }}</template>
        </el-table-column>

        <el-table-column label="今日运单" align="center" prop="realMoney">
          <template slot-scope="scope">{{
            scope.row.todayWaybillCount
          }}</template>
        </el-table-column>
        <el-table-column label="正在派送" align="center" prop="realMoney">
          <template slot-scope="scope">{{
            scope.row.deliveryWaybillCount
          }}</template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>正在派送运单列表</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small">
          <el-form-item label="输入搜索：">
            <el-input
              v-model="listQuery.keyword"
              class="input-width"
              placeholder="输入关键词"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="建议送达时间：">
            <el-date-picker
              style="width: 500px"
              v-model="dateList"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <div class="btns fr">
            <el-button
              type="primary"
              @click="handleSearchList()"
              size="small"
              icon="el-icon-search"
            >
              查询
            </el-button>
            <el-button
              style="margin-right: 15px"
              @click="handleResetSearch()"
              size="small"
              icon="el-icon-refresh"
            >
              重置
            </el-button>
          </div>
        </el-form>
      </div>
      <el-table
        ref="roleTable"
        :data="list"
        style="width: 100%"
        border
        :header-cell-style="{
          background: '#F2F6FA',
          color: '#555555',
          'text-align': 'center'
        }"
      >
        <!-- <el-table-column label="业务类型" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.orderSourceMsg }}</template>
        </el-table-column> -->
        <el-table-column label="订单编号" align="center">
          <template slot-scope="scope">{{ scope.row.orderNo }}</template>
        </el-table-column>
        <el-table-column label="运单编号" align="center" prop="number">
          <template slot-scope="scope">{{ scope.row.waybillNo }}</template>
        </el-table-column>
        <el-table-column label="所属区域" align="center" prop="number">
          <template slot-scope="scope">{{ scope.row.dcName }}</template>
        </el-table-column>
        <el-table-column label="取货点名称" align="center" prop="discount">
          <template slot-scope="scope">{{ scope.row.dName }}</template>
        </el-table-column>
        <el-table-column label="取货地址" align="center" prop="realMoney">
          <template slot-scope="scope">{{ scope.row.dAddress }}</template>
        </el-table-column>
        <el-table-column label="收货人" align="center" prop="realMoney">
          <template slot-scope="scope">{{ scope.row.receiveName }}</template>
        </el-table-column>
        <el-table-column label="收货地址" align="center" prop="realMoney">
          <template slot-scope="scope">{{ scope.row.receiveAddress }}</template>
        </el-table-column>
        <!-- <el-table-column label="订单状态" align="center" prop="realMoney">
          <template slot-scope="scope">{{ scope.row.billState }}</template>
        </el-table-column> -->
        <el-table-column
          label="运单建议送达时间"
          align="center"
          prop="realMoney"
        >
          <template slot-scope="scope">{{ scope.row.deliveryTime }}</template>
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :current-page.sync="listQuery.pageIndex"
            :page-size="listQuery.pageSize"
            :page-sizes="[10, 20, 30]"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>历史运单列表</span>
      </div>
      <div style="margin-top: 15px">
        <!-- <el-form :inline="true" :model="historyListQuery" size="small">
          <el-form-item label="输入搜索：">
            <el-input
              v-model="historyListQuery.keyword"
              class="input-width"
              placeholder="输入关键词"
              clearable
            ></el-input>
          </el-form-item>

          <div class="btns fr">
            <el-button
              type="primary"
              @click="handleHistorySearchList()"
              size="small"
              icon="el-icon-search"
            >
              查询
            </el-button>
            <el-button
              style="margin-right: 15px"
              @click="handleHistoryResetSearch()"
              size="small"
              icon="el-icon-refresh"
            >
              重置
            </el-button>
          </div>
        </el-form> -->
      </div>
      <el-table
        ref="roleTable"
        :data="historyList"
        style="width: 100%"
        border
        :header-cell-style="{
          background: '#F2F6FA',
          color: '#555555',
          'text-align': 'center'
        }"
      >
        <el-table-column label="编号" type="index" width="60" align="center">
        </el-table-column>
        <!-- <el-table-column label="业务类型" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.orderSourceMsg }}</template>
        </el-table-column> -->
        <el-table-column label="运单编号" align="center" prop="number">
          <template slot-scope="scope">{{ scope.row.waybillNo }}</template>
        </el-table-column>
        <el-table-column label="预计送达时间" align="center" prop="realMoney">
          <template slot-scope="scope">{{ scope.row.deliveryTime }}</template>
        </el-table-column>
        <el-table-column label="运单来源" align="center" prop="number">
          <template slot-scope="scope">{{ scope.row.terminal }}</template>
        </el-table-column>
        <el-table-column label="运单状态" align="center" prop="discount">
          <template slot-scope="scope">{{ scope.row.billState }}</template>
        </el-table-column>
        <el-table-column label="运单送达时间" align="center" prop="realMoney">
          <template slot-scope="scope">{{ scope.row.arriveTime }}</template>
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="handleHistorySizeChange"
            @current-change="handleHistoryCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :current-page.sync="historyListQuery.pageIndex"
            :page-size="historyListQuery.pageSize"
            :page-sizes="[10, 20, 30]"
            :total="historyTotal"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog
      title="修改状态"
      :visible.sync="dialogVisible"
      @close="close"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="refForm"
        @submit.native.prevent
        :rules="rules"
        size="small"
        label-width="120px"
      >
        <el-form-item label="账户审核状态" prop="authStatus">
          <el-select v-model="form.authStatus">
            <el-option :key="0" label="未认证" value="0" disabled> </el-option>
            <el-option :key="1" label="认证通过" value="1" disabled>
            </el-option>
            <el-option :key="2" label="认证中" value="2" disabled> </el-option>
            <el-option :key="3" label="认证失败" value="3" disabled>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户工作状态" prop="jobStatus">
          <el-select v-model="form.jobStatus">
            <el-option
              v-for="item in jobStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户启用状态" prop="verify">
          <el-select v-model="form.verify">
            <el-option :key="0" label="在岗" value="1"> </el-option>
            <el-option :key="1" label="离岗" value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排班时间">
          <el-input
            disabled
            class="input-width"
            placeholder="(暂未开放)"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getDeliveryGuyAllList,
  getDeliveryGuyWaybillList,
  setEditDeliveryGuy
} from '@/api/deliveryGuy'
import { formatDate } from '@/utils/date'
const defaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null
}
const defaultHistoryListQuery = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null
}
export default {
  name: 'deliveryGuyDetail',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: [],
      total: null,
      dialogVisible: false,
      form: {},

      rules: {
        reasonMsg: [
          { required: true, message: '请输入取消订单原因', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur'
          }
        ]
      },
      historyListQuery: Object.assign({}, defaultHistoryListQuery),
      historyList: [],
      historyTotal: null,
      dataObj: {},
      statsList: [],
      dateList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      isCreated: false,
      jobStatusList: [
        // { label: "未开工", value: "0", disabled: true },
        { label: '开工中', value: '1', disabled: true },
        { label: '忙碌中', value: '2', disabled: true },
        { label: '已收工', value: '3' }
      ]
    }
  },
  activated() {
    if (!this.isCreated) {
      this.getData()
      this.getList()
    }
    this.isCreated = false
  },
  deactivated() {
    this.isCreated = false
  },
  created() {
    this.isCreated = true
    this.getData()
    this.getList()
    // console.log(this.$route)
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  methods: {
    handleCancel() {
      this.form = {}
      this.dialogVisible = false
    },
    handleDialogConfirm() {
      this.form.id = this.$route.query.id

      setEditDeliveryGuy(this.form).then(response => {
        if (response.retCode === 200) {
          this.dialogVisible = false
          this.form = {}
          this.$message({
            message: '编辑成功！',
            type: 'success',
            duration: 1000
          })

          this.getData()
        }
      })
    },
    close() {},
    open() {
      let authStatus, jobStatus, verify
      if (this.dataObj.authStatusMsg === '未认证') {
        authStatus = '0'
      } else if (this.dataObj.authStatusMsg === '认证通过') {
        authStatus = '1'
      } else if (this.dataObj.authStatusMsg === '认证中') {
        authStatus = '2'
      } else if (this.dataObj.authStatusMsg === '认证失败') {
        authStatus = '3'
      }

      if (this.dataObj.jobStatusMsg === '未开工') {
        jobStatus = '0'
      } else if (this.dataObj.jobStatusMsg === '开工') {
        jobStatus = '1'
      } else if (this.dataObj.jobStatusMsg === '忙碌') {
        jobStatus = '2'
      } else if (this.dataObj.jobStatusMsg === '收工') {
        jobStatus = '3'
      }
      if (this.dataObj.verifyMsg === '在岗') {
        verify = '1'
      } else if (this.dataObj.verifyMsg === '离岗') {
        verify = '0'
      }
      this.$set(this.form, 'authStatus', authStatus)
      this.$set(this.form, 'jobStatus', jobStatus)
      this.$set(this.form, 'verify', verify)
      console.log(this.form)
      this.dialogVisible = true
    },
    handleDetail(index, row) {
      this.$router.push({
        name: 'orderDetail',
        params: { orderId: row.orderId },
        query: { orderId: row.orderId }
      })
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
      this.listQuery.id = this.$route.query.id
      this.dateList = []
      delete this.listQuery.startDate
      delete this.listQuery.endDate
      this.getList()
    },
    handleSearchList() {
      this.listQuery.pageIndex = 1
      if (this.dateList) {
        this.listQuery.startDate = this.dateList[0]
        this.listQuery.endDate = this.dateList[1]
      }
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageIndex = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getList()
    },

    getData() {
      this.historyListQuery.id = this.$route.query.id
      getDeliveryGuyAllList(this.historyListQuery).then(response => {
        if (response.retCode === 200) {
          this.statsList = []
          let data = response.retData
          this.dataObj = data
          this.statsList = [
            {
              todayWaybillCount: data.todayWaybillCount,
              allWaybillCount: data.allWaybillCount,
              deliveryWaybillCount: data.deliveryWaybillCount
            }
          ]
          this.historyList = [...data.deliveryGuyAllWaybillApiOut.pageData]
          this.historyTotal = data.deliveryGuyAllWaybillApiOut.recordCount
        }
      })
    },
    handleHistoryResetSearch() {
      this.historyListQuery = Object.assign({}, defaultHistoryListQuery)
      this.historyListQuery.id = this.$route.query.id
      this.getData()
    },
    handleHistorySearchList() {
      this.historyListQuery.pageIndex = 1

      this.getData()
    },
    handleHistorySizeChange(val) {
      this.historyListQuery.pageIndex = 1
      this.historyListQuery.pageSize = val
      this.getData()
    },
    handleHistoryCurrentChange(val) {
      this.historyListQuery.pageIndex = val
      this.getData()
    },
    goList() {
      this.$router.push({
        name: 'deliveryGuy'
      })
    },
    getList() {
      this.listQuery.id = this.$route.query.id
      getDeliveryGuyWaybillList(this.listQuery).then(response => {
        if (response.retCode === 200) {
          this.list = response.retData.pageData
          this.total = response.retData.recordCount
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.userInfo-box {
  display: flex;
  border: 1px solid #ebeef5;
  margin-bottom: 20px;

  .head {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    img {
      border-radius: 50%;
    }
    span {
      padding: 10px 0;
    }
  }
  .item-box {
    flex: 2;

    .item {
      border-left: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      // height: 40px;
      // line-height: 40px;
      height: 25%;
      display: flex;
      align-items: center;

      padding-left: 6px;
    }
    .bl-none {
      border-left: none;
    }
    img {
      width: 200px;
      height: 200px;
    }
    .item:last-child {
      border-bottom: none;
    }
  }
}
.idCard-box {
  .item-box {
    .item {
      height: 40px;
      line-height: 40px;
    }
  }
}
.box-card {
  margin-bottom: 20px;
}
::v-deep .el-image {
  display: block;
}
</style>
