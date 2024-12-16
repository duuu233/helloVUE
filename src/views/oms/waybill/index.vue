<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small">
          <!-- <el-form-item label="商品名称">
            <el-input
              v-model="listQuery.keyword"
              class="input-width"
              placeholder="请输入商品名称"
              clearable
            ></el-input>
          </el-form-item> -->
          <el-form-item label="收货人信息">
            <el-input
              v-model="listQuery.receive"
              style="width: 311px"
              placeholder="请输入收货人信息"
              maxlength="20"
              show-word-limit
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="流水号">
            <el-input
              v-model="listQuery.shopSequence"
              class="input-width"
              placeholder="请输入流水号"
              maxlength="10"
              show-word-limit
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="运单来源">
            <el-select
              v-model="listQuery.terminal"
              clearable
              placeholder="请选择运单来源"
            >
              <el-option
                v-for="(item, index) in terminalList"
                :key="index"
                :label="item"
                v-show="item !== 'IOS' && item !== '支付宝'"
                :value="index + 1"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="业务类型">
            <el-select
              v-model="listQuery.orderSource"
              clearable
              placeholder="选择业务类型"
            >
              <el-option key="1" label="买菜" :value="1"> </el-option>
              <el-option key="2" label="外卖" :value="2"> </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="订单类型">
            <el-select
              v-model="listQuery.orderType"
              clearable
              placeholder="请选择订单类型"
            >
              <el-option
                v-for="(item, index) in orderTypeList"
                :key="index"
                :label="item"
                :value="index + 1"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属区域">
            <el-select
              v-model="listQuery.regionalId"
              clearable
              placeholder="请选择所属区域"
            >
              <el-option
                v-for="(item, index) in regionalIdList"
                :key="index"
                :label="item.keyText"
                :value="item.keyId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序方式">
            <el-select
              v-model="listQuery.orderByType"
              clearable
              placeholder="请选择排序方式"
            >
              <el-option
                v-for="(item, index) in sortOrderList"
                :key="index"
                :label="item"
                :value="index + 1"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="运单建议送达时间">
            <el-date-picker
              style="width: 311px"
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
          <el-form-item class="fr">
            <el-button
              type="primary"
              @click="handleSearchList()"
              size="small"
              icon="el-icon-search"
            >
              查询
            </el-button>
            <el-button
              @click="handleResetSearch()"
              size="small"
              icon="el-icon-refresh"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <div class="table-btns-box">
        <el-tabs
          v-model="activeName"
          style="width: 40vw"
          @tab-click="handleClick"
          :stretch="true"
        >
          <el-tab-pane
            :label="'待取货' + '(' + listObj.wayBillNum1 + ')'"
            name="1"
          ></el-tab-pane>
          <el-tab-pane
            :label="'配送中' + '(' + listObj.wayBillNum2 + ')'"
            name="2"
          ></el-tab-pane>
          <el-tab-pane
            :label="'已送达' + '(' + listObj.wayBillNum3 + ')'"
            name="3"
          ></el-tab-pane>
          <el-tab-pane
            :label="'已转出' + '(' + listObj.wayBillNum4 + ')'"
            name="4"
          ></el-tab-pane>
          <el-tab-pane
            :label="'已取消' + '(' + listObj.wayBillNum5 + ')'"
            name="5"
          ></el-tab-pane>
        </el-tabs>
        <div>
          <el-button
            type="primary"
            size="small"
            style="margin-left: 10px"
            @click="handleExport"
            v-permission="['get_Waybill_getWayBillListExcel']"
            icon="el-icon-document"
            >导出运单</el-button
          >
        </div>
      </div>
      <el-table
        ref="roleTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
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
        <el-table-column label="订单编号" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.orderNo }}</template>
        </el-table-column>
        <el-table-column label="订单流水号" align="center">
          <template slot-scope="scope">{{ scope.row.shopSequence }}</template>
        </el-table-column>
        <el-table-column label="订单类型" align="center">
          <template slot-scope="scope">{{ scope.row.orderTypeMsg }}</template>
        </el-table-column>
        <el-table-column label="运单编号" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.waybillNo }}</template>
        </el-table-column>
        <el-table-column label="运单状态" align="center">
          <template slot-scope="scope">{{ scope.row.billStateMsg }}</template>
        </el-table-column>
        <el-table-column label="运单类型" align="center">
          <template slot-scope="scope">{{
            scope.row.dispatchTypeMsg
          }}</template>
        </el-table-column>

        <el-table-column label="所属区域" align="center">
          <template slot-scope="scope">
            {{ scope.row.regionalName }}
          </template>
        </el-table-column>
        <el-table-column label="取货点名称" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.dname }}
          </template>
        </el-table-column>
        <el-table-column label="取货地址" align="center" width="120">
          <template slot-scope="scope">{{ scope.row.daddress }}</template>
        </el-table-column>
        <!-- <el-table-column label="收货人" align="center">
          <template slot-scope="scope">{{ scope.row.receiveName }}</template>
        </el-table-column> -->
        <el-table-column label="收货人信息" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.receiveName }}, {{ scope.row.receiveMobile }}
          </template>
        </el-table-column>
        <el-table-column label="收货地址" align="center" width="200">
          <template slot-scope="scope">{{ scope.row.receiveAddress }}</template>
        </el-table-column>

        <el-table-column label="骑手名称" align="center">
          <template slot-scope="scope">{{ scope.row.guyName }}</template>
        </el-table-column>
        <el-table-column label="骑手联系方式" align="center">
          <template slot-scope="scope">{{ scope.row.guyPhone }}</template>
        </el-table-column>

        <el-table-column label="建议送达时间" width="140" align="center">
          <template slot-scope="scope">{{
            scope.row.deliveryTime | formatDateTime
          }}</template>
        </el-table-column>

        <el-table-column label="操作" width="60" align="center">
          <template slot-scope="scope">
            <el-row class="handle-table-box">
              <!-- <el-button
                size="mini"
                type="text"
                @click="handleUpdate(scope.$index, scope.row)"
              >
                编辑
              </el-button> -->

              <el-button
                size="mini"
                type="primary"
                v-permission="['get_Waybill_getWayBillRecordList']"
                @click="handleDetails(scope.$index, scope.row)"
                >查看
              </el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
  </div>
</template>
<script>
import { getWayBillList, getWayBillListExcel } from '@/api/waybill'
import { getQueryDcName } from '@/api/dispatchWork'
import { formatDate } from '@/utils/date'
const defaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  billState: '1',
  keyword: null
}

export default {
  name: 'waybill',

  data() {
    const _classifyName = (rule, value, callback) => {
      setTimeout(() => {
        if (!this.form.classifyName && this.dialogVisible) {
          return callback(new Error('请选择分类'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      terminalList: ['安卓客户端', 'IOS', '微信小程序', '支付宝'],
      orderTypeList: ['配送订单', '退货订单'],
      sortOrderList: ['建议送达时间近到远', '建议送达时间远到近'],
      regionalIdList: [],
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
      activeName: '1',
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      id: null,
      listLoading: false,
      dialogVisible: false,
      classifyDialog: false,
      basicClassifyDialog: false,
      form: {
        parentId: null
      },
      defaultProps: {
        children: 'childs',
        label: 'text'
      },
      isEdit: false,
      listObj: {},
      dateList: [],
      rules: {
        grade: [
          { required: true, message: '权重不能为空' },
          { type: 'number', message: '年龄必须为数字值' }
        ],
        brandId: [{ required: true, message: '请选择品牌', trigger: 'change' }],
        basicName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }
        ],
        productNo: [
          { required: true, message: '请输入商品货号', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }
        ],
        calUnitId: [
          { required: true, message: '请选择单位', trigger: 'change' }
        ],
        classifyName: [
          { required: true, validator: _classifyName, trigger: 'blur' }
        ],
        supplierId: [
          { required: true, message: '请选择供应商', trigger: 'change' }
        ],
        rate: [
          { required: true, message: '换算比率不能为空' },
          { type: 'number', message: '换算比率必须为数字值' }
        ]
      },
      isCreated: false
    }
  },
  activated() {
    if (!this.isCreated) {
      if (this.$route.query.orderState) {
        this.listQuery.billState = this.$route.query.orderState * 1
        setTimeout(() => {
          this.activeName = this.$route.query.orderState
        }, 300)
      }
      this.getList()
      this.getQueryDcName()
    }
    this.isCreated = false
  },
  created() {
    this.isCreated = true

    if (this.$route.query.orderState) {
      this.listQuery.billState = this.$route.query.orderState * 1
      setTimeout(() => {
        this.activeName = this.$route.query.orderState
      }, 300)
    }
    this.getList()
    this.getQueryDcName()
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatBillState(v) {
      if (v === '1') {
        return '待取货'
      } else if (v === '2') {
        return '配送中'
      } else if (v === '3') {
        return '已送达'
      } else if (v === '4') {
        return '已转出'
      } else if (v === '5') {
        return '已取消'
      }
    }
  },
  methods: {
    handleExport() {
      getWayBillListExcel(this.listQuery).then(res => {
        if (res.retCode === 200) {
          if (res.retData) {
            window.location.href = res.retData
          } else {
            this.$message({
              type: 'warning',
              message: '数据为空，无法导出!'
            })
          }
        } else {
          this.$message({
            type: 'success',
            message: '导出失败!'
          })
        }
      })
    },

    handleClick() {
      this.listQuery.billState = this.activeName * 1
      this.listQuery.pageIndex = 1
      this.getList()
    },
    close() {
      this.form = {}
      this.$refs.roleForm.resetFields()
      this.$refs.classifTree.setCheckedKeys([])
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
      this.listQuery.billState = this.activeName * 1
      this.dateList = []
      delete this.listQuery.deliveryBeginTime
      delete this.listQuery.deliveryEndTime
      this.getList()
    },
    handleSearchList() {
      this.listQuery.pageIndex = 1
      if (this.dateList) {
        this.listQuery.deliveryBeginTime = this.dateList[0]
        this.listQuery.deliveryEndTime = this.dateList[1]
      }
      for (let key in this.listQuery) {
        if (!this.listQuery[key]) {
          delete this.listQuery[key]
        }
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

    handleAdd() {
      // this.dialogVisible = true;
      this.isEdit = false
      this.$router.push({
        path: '/pms/addProduct'
        // query: { roleId: row.id },
      })
    },
    handleDetails(index, row) {
      this.$router.push({
        path: 'waybillDetail',
        query: { id: row.wayBillId }
      })
    },
    handleUpdate(index, row) {
      this.isEdit = true
      this.$router.push({
        path: '/pms/updateProduct',
        query: { productId: row.id }
      })
    },
    handleDialogConfirm() {},

    getList() {
      this.listLoading = true
      delete this.listQuery.classifyName
      getWayBillList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.retData.waybillSearchApiOutList.pageData
        this.listObj = response.retData
        this.total = response.retData.waybillSearchApiOutList.recordCount
      })
    },
    getQueryDcName() {
      let listQuery = {
        pageIndex: 1,
        pageSize: 9999
      }
      getQueryDcName(listQuery).then(response => {
        if (response.retCode === 200) {
          this.regionalIdList = response.retData
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.table-btns-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
  box-shadow: 0px 4px 81px 0px rgba(241, 242, 247, 0.82);
  border-radius: 5px;
  padding-right: 20px;
}
::v-deep .el-tabs__nav-wrap:after {
  background-color: #fff;
}
::v-deep .el-tabs__header {
  margin: 0;
}
.operate-container,
.table-container {
  margin-top: 10px;
}
::v-deep .el-tabs__item {
  height: 60px;
  line-height: 60px;
}
.enabled {
  color: #67c23a;
}
.goodsInfo {
  display: flex;
  align-items: center;
  font-size: 12px;

  img {
    width: 46px;
    height: 46px;
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 4px;
    // justify-content: space-between;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
