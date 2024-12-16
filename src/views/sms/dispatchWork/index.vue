<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small">
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
              placeholder="输入流水号"
              maxlength="10"
              show-word-limit
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="运单来源">
            <el-select
              v-model="listQuery.terminal"
              clearable
              placeholder="选择运单来源"
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
          <el-form-item label="订单类型">
            <el-select
              v-model="listQuery.orderType"
              clearable
              placeholder="选择订单类型"
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
              v-model="listQuery.sortOrder"
              clearable
              placeholder="请选择排序方式"
            >
              <el-option
                v-for="(item, index) in sortOrderList"
                :key="index"
                :label="item"
                :value="index"
              >
              </el-option>
            </el-select>
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
          <!-- <el-tab-pane
            :label="'待出货' + '(' + listObj.shipmentCount + ')'"
            name="5"
          ></el-tab-pane> -->
          <el-tab-pane
            :label="'待调度' + '(' + listObj.dispatchedCount + ')'"
            name="1"
          ></el-tab-pane>
          <el-tab-pane
            :label="'已取消' + '(' + listObj.cancelCount + ')'"
            name="3"
          ></el-tab-pane>
          <el-tab-pane
            :label="'中转调度' + '(' + listObj.transferCount + ')'"
            name="4"
          ></el-tab-pane>
        </el-tabs>
        <div>
          <el-button
            v-show="activeName !== '3' && activeName !== '5'"
            type="primary"
            size="small"
            style="margin-left: 10px"
            @click="sendOrder('batch')"
            icon="el-icon-document"
            v-permission="['post_dispatchWork_setManualWaybill']"
            >批量派单</el-button
          >
          <el-button
            type="primary"
            size="small"
            style="margin-left: 10px"
            @click="handleExport"
            icon="el-icon-document"
            v-permission="['get_dispatchWork_getDispatchWorkbenchExcel']"
            >导出</el-button
          >
        </div>
      </div>
      <el-table
        ref="table"
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
        <el-table-column type="selection" width="60" align="center">
        </el-table-column>
        <!-- <el-table-column label="业务类型" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.orderSourceMsg }}</template>
        </el-table-column> -->
        <el-table-column label="订单编号" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.orderNo }}</template>
        </el-table-column>

        <el-table-column label="流水号" width="70" align="center">
          <template slot-scope="scope">{{ scope.row.shopSequence }}</template>
        </el-table-column>

        <el-table-column label="退货单编号" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.refundNo }}</template>
        </el-table-column>
        <el-table-column label="所属配送区域" align="center">
          <template slot-scope="scope">{{ scope.row.dcName }}</template>
        </el-table-column>
        <el-table-column label="取货点名称" align="center">
          <template slot-scope="scope">{{ scope.row.dName }}</template>
        </el-table-column>
        <el-table-column label="取货地址" align="center">
          <template slot-scope="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="订单状态" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.orderStateMsg }}
          </template>
        </el-table-column> -->
        <el-table-column label="历史骑手" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.deliveryGuyNames | formatDeliveryGuyNames }}
          </template>
        </el-table-column>
        <el-table-column label="收货人信息" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.receiveName }}, {{ scope.row.receiveMobile }}
          </template>
        </el-table-column>
        <el-table-column label="收货地址" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.receiveAddress }}
          </template>
        </el-table-column>
        <el-table-column label="下单时间" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.payTime }}
          </template>
        </el-table-column>
        <el-table-column label="运单建议送达时间" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.deliveryTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-row class="handle-table-box">
              <el-button
                v-show="activeName === '5'"
                size="mini"
                type="primary"
                v-permission="['post_dispatchWork_setTaskOrderState']"
                @click="shipment(scope.row)"
                >出货
              </el-button>
              <el-button
                v-show="activeName !== '3' && activeName !== '5'"
                size="mini"
                type="primary"
                v-permission="['post_dispatchWork_setManualWaybill']"
                @click="sendOrder('', scope.row)"
                >派单
              </el-button>
              <el-button
                size="mini"
                type="primary"
                v-permission="['get_dispatchWork_getDispatchWorkbenchDetails']"
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
    <el-dialog
      title="骑手列表"
      :visible.sync="riderDialog"
      width="1200px"
      @close="riderDialogClose"
      :close-on-click-modal="false"
    >
      <div class="table-container">
        <!-- <el-card class="filter-container" shadow="never">
          <div>
            <i class="el-icon-search"></i>
            <span>筛选搜索</span>
          </div>
          <div style="margin-top: 15px">
            <el-form :inline="true" :model="riderListQuery" size="small">
              <el-form-item label="商品关键词">
                <el-input
                  v-model="riderListQuery.keyword"
                  class="input-width"
                  placeholder="请输入商品关键词"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item class="fr">
                <el-button
                  type="primary"
                  @click="handleRiderSearchList"
                  size="small"
                >
                  查询
                </el-button>

                <el-button @click="handleRiderResetSearch" size="small">
                  重置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card> -->
        <div>
          <span style="vertical-align: text-top"
            >此列表只包含“已开工”的骑手</span
          >
        </div>
        <div class="table-container">
          <el-table
            ref="riderTable"
            :data="riderList"
            style="width: 100%"
            border
            :header-cell-style="{
              background: '#F2F6FA',
              color: '#555555',
              'text-align': 'center'
            }"
            @select="selectRiderTable"
            header-cell-class-name="riderTable-header"
          >
            <!--      :selectable="checkAble" -->
            <el-table-column type="selection" width="60" align="center">
            </el-table-column>
            <el-table-column label="配送员账号" align="center">
              <template slot-scope="scope">{{ scope.row.phone }}</template>
            </el-table-column>
            <!-- <el-table-column label="联系方式" width="150" align="center">
              <template slot-scope="scope">{{ scope.row.phone }}</template>
            </el-table-column> -->
            <el-table-column label="配送员姓名" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <!-- <el-table-column label="配送员昵称" align="center">
              <template slot-scope="scope">{{ scope.row.nickName }}</template>
            </el-table-column> -->
            <el-table-column label="当前运单量" align="center">
              <template slot-scope="scope">
                {{ scope.row.billCount }}
              </template>
            </el-table-column>
            <el-table-column label="今日运单量" align="center">
              <template slot-scope="scope">
                {{ scope.row.todayWaybillCount }}
              </template>
            </el-table-column>
            <el-table-column label="总运单量" align="center">
              <template slot-scope="scope">
                {{ scope.row.allWaybillCount }}
              </template>
            </el-table-column>

            <!-- <el-table-column label="现已运单" align="center" width="150">
          <template slot-scope="scope">{{ scope.row.daddress }}</template>
        </el-table-column> -->
            <!-- <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <el-row>
                  <span v-if="scope.row.disabled" class="disable_txt">
                    无法添加
                  </span>
                  <el-button
                    v-else
                    size="mini"
                    type="text"
                    @click="handleAddGoods(scope.$index, scope.row)"
                  >
                    添加
                  </el-button>
                </el-row>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
      <div class="clearfix">
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="handleRiderSizeChange"
            @current-change="handleRiderCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :current-page.sync="riderListQuery.pageIndex"
            :page-size="riderListQuery.pageSize"
            :page-sizes="[10, 20, 30]"
            :total="riderTotal"
          >
          </el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="handleCancel" size="small">取 消</el-button> -->
        <el-button type="primary" @click="handleDialogConfirm" size="small"
          >派 单</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getDispatchWorkbenchList,
  getDispatchWorkbenchExcel,
  getQueryDcName,
  setManualWaybill,
  setTaskOrderState
} from '@/api/dispatchWork'
import { getDeliverGuyList } from '@/api/deliveryGuy'
import { formatDate } from '@/utils/date'
const defaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
  orderState: '1'
}
const defaultRiderListQuery = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
  verify: 1,
  jobStatus: '1,2',
  authStatus: 1
}
export default {
  name: 'dispatchWork',

  data() {
    return {
      terminalList: ['安卓客户端', 'IOS', '微信小程序', '支付宝'],
      orderTypeList: ['销售订单', '售后订单'],
      sortOrderList: [
        '订单提交时间由近到远(默认)',
        '订单提交时间由远到近',
        '订单金额由高到低',
        '订单金额由低到高'
      ],
      regionalIdList: [],
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

      isCreated: false,
      riderDialog: false,
      riderList: [],
      riderTotal: 0,
      riderListQuery: Object.assign({}, defaultRiderListQuery),
      disabledIds: [], //禁止选择的骑手（当勾选运单中含有该骑手就禁用）
      selectionOrderList: [] //选中的运单
    }
  },
  activated() {
    if (!this.isCreated) {
      this.getList()
      this.getQueryDcName()
    }
    this.isCreated = false
  },
  created() {
    this.isCreated = true
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
    },
    formatDeliveryGuyNames(v) {
      if (v) {
        return v.split(',').join(' ')
      } else {
        return '/'
      }
    }
  },
  methods: {
    riderDialogClose() {
      this.riderListQuery = Object.assign({}, defaultRiderListQuery)
    },
    handleDialogConfirm() {
      if (!this.$refs.riderTable.selection.length) {
        this.$message({
          message: '请选择需要派单的骑手',
          type: 'warning',
          duration: 1500
        })
        return
      }
      let form = {}
      form.deliveryGuyId = this.$refs.riderTable.selection[0].id
      form.deliveryGuyName = this.$refs.riderTable.selection[0].name

      let ids = []
      this.selectionOrderList.forEach((v, i) => {
        ids.push(v.id)
      })
      form.ids = [...ids].join()
      setManualWaybill(form).then(response => {
        if (response.retCode === 200) {
          this.riderDialog = false
          this.$message({
            message: '手动派单成功！',
            type: 'success',
            duration: 1000
          })
          this.getList()
        }
      })
    },
    selectRiderTable(selection, row) {
      this.$refs.riderTable.clearSelection()
      this.$refs.riderTable.toggleRowSelection(row, true)
    },
    checkAble(row) {
      // let id = row.id + "";
      // if (this.disabledIds.length && this.disabledIds.indexOf(id) !== -1) {
      //   return false;
      // } else {
      //   return true;
      // }
    },
    shipment(row) {
      this.$confirm('是否已备好货，准备派送?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = { id: row.id, orderState: 1 }
          setTaskOrderState(params).then(response => {
            if (response.retCode === 200) {
              this.$message({
                message: '出货成功！',
                type: 'success',
                duration: 1000
              })
              this.getList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
    },
    sendOrder(type, row) {
      //批量派单
      if (type === 'batch') {
        let selection = this.$refs.table.selection
        let disabledIds = []
        if (!selection.length) {
          this.$message({
            message: '请先勾选运单',
            type: 'warning',
            duration: 1500
          })
        } else {
          this.selectionOrderList = [...selection]
          selection.forEach((v, i) => {
            if (v.deliveryGuyIds) {
              let list = v.deliveryGuyIds.split(',')
              disabledIds = disabledIds.concat(list)
            }
          })
          this.disabledIds = [...new Set(disabledIds)]
          this.getRiderList()
          this.riderDialog = true
        }
      } else {
        //单个派单
        let disabledIds = []
        this.selectionOrderList = [row]
        if (row.deliveryGuyIds) {
          let list = row.deliveryGuyIds.split(',')
          disabledIds = disabledIds.concat(list)
        }
        this.disabledIds = [...new Set(disabledIds)]
        this.getRiderList()
        this.riderDialog = true
      }
    },
    handleRiderSearchList() {
      this.riderListQuery.pageIndex = 1
      this.getRiderList()
    },
    handleRiderResetSearch() {
      this.riderListQuery = Object.assign({}, defaultRiderListQuery)
      this.getRiderList()
    },
    handleRiderSizeChange(val) {
      this.riderListQuery.pageIndex = 1
      this.riderListQuery.pageSize = val
      this.getRiderList()
    },
    handleRiderCurrentChange(val) {
      this.riderListQuery.pageIndex = val
      this.getRiderList()
    },
    handleExport() {
      getDispatchWorkbenchExcel(this.listQuery).then(res => {
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
      this.listQuery.pageIndex = 1
      this.listQuery.orderState = this.activeName * 1
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
      this.activeName = '1'
      this.listQuery.auditStatus = this.activeName * 1

      this.getList()
    },
    handleSearchList() {
      this.listQuery.pageIndex = 1
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
        name: 'dispatchWorkDetail',
        query: { wayBillId: row.id }
      })
    },
    handleUpdate(index, row) {
      this.isEdit = true
      this.$router.push({
        path: '/pms/updateProduct',
        query: { productId: row.id }
      })
    },

    getList() {
      this.listLoading = true
      getDispatchWorkbenchList(this.listQuery).then(response => {
        if (response.retCode === 200) {
          this.listLoading = false
          this.list = response.retData.dispatchWorkInfos.pageData
          this.listObj = response.retData
          this.total = response.retData.dispatchWorkInfos.recordCount
        }
      })
    },

    getRiderList() {
      getDeliverGuyList(this.riderListQuery).then(response => {
        if (response.retCode === 200) {
          this.riderList = response.retData.deliveryGuyInfos.pageData
          if (this.riderList.length) {
            this.riderList.forEach((v, i) => {
              let id = v.id + ''

              if (id.indexOf(this.disabledIds) !== -1) {
                v.disabled = true
              }
            })
          }
          this.riderTotal = response.retData.deliveryGuyInfos.recordCount
        }
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
::v-deep .riderTable-header:first-child {
  .cell {
    display: none;
  }
}
::v-deep .el-dialog__footer {
  background-color: #fff;
}
.pagination-container {
  box-shadow: none;
}
</style>
