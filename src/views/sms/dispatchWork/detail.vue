<template>
  <div class="app-container">
    <div class="title-box" ref="body_box">
      <div class="left">
        <span>订单编号：{{ orderDetailObj.orderNo }}</span>
        <span
          >下单渠道：{{
            orderDetailObj.terminalMsg === '安卓客户端'
              ? 'Android'
              : orderDetailObj.terminalMsg
          }}</span
        >
        <!-- <span>业务类型：{{ orderDetailObj.orderSourceMsg }}</span> -->
      </div>
    </div>
    <div class="status-box">
      <div
        class="status"
        :style="'color:' + orderStateStyle(orderDetailObj.orderState)"
      >
        {{ orderDetailObj.orderState | formatBillState }}
      </div>

      <div class="step-box">
        <!-- 待调度 -->
        <el-steps
          v-if="
            orderDetailObj.orderState === '1' ||
              orderDetailObj.orderState === '4'
          "
          :active="0"
          align-center
        >
          <el-step
            title="待调度"
            icon="el-icon-document-checked"
            :description="orderDetailObj.toBeDispatchedTime"
          ></el-step>
          <el-step title="待取货" icon="el-icon-shopping-cart-2"></el-step>
          <el-step title="配送中" icon="el-icon-truck"></el-step>
          <el-step title="已送达" icon="el-icon-success"></el-step>
        </el-steps>
        <!-- 已取消 -->
        <el-steps
          v-if="orderDetailObj.orderState === '3'"
          :active="2"
          align-center
        >
          <el-step
            title="待调度"
            icon="el-icon-document-checked"
            :description="orderDetailObj.toBeDispatchedTime"
          ></el-step>
          <el-step
            title="已取消"
            icon="el-icon-circle-close"
            :description="orderDetailObj.cancelTime"
          ></el-step>
        </el-steps>
      </div>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>调度单信息</span>
      </div>
      <div class="order-box">
        <div class="item">
          <span>订单编号：{{ orderDetailObj.orderNo }}</span>

          <span>收货人名称：{{ orderDetailObj.receiveName }}</span>
          <span>收货地址：{{ orderDetailObj.receiveAddress }}</span>
          <span>收货人联系电话：{{ orderDetailObj.receiveMobile }}</span>
          <!-- <span>商家名称：{{ orderDetailObj.shopName }}</span>
          <span>商家地址：{{ orderDetailObj.shopAddress }}</span>
          <span>商家联系方式：{{ orderDetailObj.shopMobile }}</span> -->
        </div>
        <div class="item">
          <!-- <span
            >订单状态：{{ orderDetailObj.orderState | formatBillState }}</span
          > -->
          <!-- <span>订单支付时间：{{ orderDetailObj.payTime }}</span> -->
          <span>建议送达时间：{{ orderDetailObj.deliveryTime }}</span>
          <span>所属区域：{{ orderDetailObj.dcName }}</span>
          <span>取货地联系方式：{{ orderDetailObj.contactPhone }}</span>
          <span>取货地址：{{ orderDetailObj.address }}</span>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品信息</span>
      </div>

      <el-table
        ref="roleTable"
        :data="orderDetailObj.waybillDetailList"
        style="width: 100%"
        border
        :header-cell-style="{
          background: '#F2F6FA',
          color: '#555555',
          'text-align': 'center'
        }"
      >
        <el-table-column label="商品图片" align="center">
          <template slot-scope="scope">
            <img
              :src="scope.row.productImage"
              style="width: 60px; height: 60px"
              alt="商品图片"
            />
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.productName }}
          </template>
        </el-table-column>
        <el-table-column label="规格" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.productAttribute }}
          </template>
        </el-table-column>
        <el-table-column label="单价(¥)" align="center">
          <template slot-scope="scope">{{
            scope.row.unitPrice | filterPrice
          }}</template>
        </el-table-column>

        <el-table-column label="数量" align="center" prop="number">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column label="原价(¥)" align="center">
          <template slot-scope="scope">{{
            scope.row.oldMoney | filterPrice
          }}</template>
        </el-table-column>
        <!-- <el-table-column label="小计(¥)" align="center" prop="money">
          <template slot-scope="scope">{{ scope.row.money }}</template>
        </el-table-column> -->
        <!-- <el-table-column label="优惠金额(¥)" align="center" prop="discount">
          <template slot-scope="scope">{{
            scope.row.discount | filterPrice
          }}</template>
        </el-table-column> -->
        <el-table-column label="实付款(¥)" align="center" prop="realMoney">
          <template slot-scope="scope">{{
            scope.row.realMoney | filterPrice
          }}</template>
        </el-table-column>
        <el-table-column
          label="应退金额(¥)"
          align="center"
          prop="realMoney"
          v-if="orderDetailObj.refundMoney"
        >
          <template slot-scope="scope">{{
            scope.row.refundMoney | filterPrice
          }}</template>
        </el-table-column>
      </el-table>
      <!-- <div class="refundRemarks-box" v-if="orderDetailObj.reasonMsg">
        退款原因：{{ orderDetailObj.reasonMsg }}
      </div> -->
      <div class="summary-box">
        <div class="summary">
          <div class="item">
            <span class="label">合计</span>
            <span class="content"></span>
          </div>
          <div class="item">
            <span class="label">商品小计：</span>
            <span class="content"
              >¥ {{ orderDetailObj.productMoney | filterPrice }}</span
            >
          </div>
          <div class="item">
            <span class="label">运费：</span>
            <span class="content"
              >¥ {{ orderDetailObj.freight | filterPrice }}</span
            >
          </div>
          <div class="item">
            <span class="label">秒杀优惠：</span>
            <span class="content"
              >¥ {{ orderDetailObj.sumdiscount | filterPrice }}</span
            >
          </div>
          <!-- <div class="item">
            <span class="label">实付款：</span>
            <span class="content"
              >¥ {{ orderDetailObj.realMoney | filterPrice }}</span
            >
          </div> -->
          <div class="item" v-if="!orderDetailObj.refundMoney">
            <span class="label">实付款：</span>
            <span class="content"
              >¥ {{ orderDetailObj.realMoney | filterPrice }}</span
            >
          </div>
          <div class="item" v-if="orderDetailObj.refundMoney">
            <span class="label">应退金额：</span>
            <span class="content"
              >¥ {{ orderDetailObj.refundMoney | filterPrice }}</span
            >
          </div>
          <div class="item" v-if="orderDetailObj.remarks">
            <span class="label">备注：</span>
            <span class="content">{{ orderDetailObj.remarks }}</span>
          </div>
        </div>
      </div>
    </el-card>
    <div
      class="submit-box"
      :style="'width:' + body_width + 'px;'"
      v-if="orderDetailObj.isCanOutGoods || orderDetailObj.isCanCancel"
    >
      <el-button
        v-show="orderDetailObj.isCanOutGoods"
        type="primary"
        size="small"
        @click="shipments"
        >确认发货</el-button
      >
      <el-button
        type="danger"
        size="small"
        @click="cancel"
        v-show="orderDetailObj.isCanCancel"
        >取消订单</el-button
      >
    </div>
    <el-dialog
      title="取消订单"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      @close="dialogClose()"
    >
      <el-form
        :model="form"
        ref="refForm"
        :rules="rules"
        label-width="100px"
        size="small"
        @submit.native.prevent
      >
        <el-form-item label="取消订单原因" prop="reasonMsg">
          <el-select
            v-model="form.reasonMsg"
            style="width: 250px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in orderReasonsList"
              :key="item.id"
              :label="item.reasonMsg"
              :value="item.reasonMsg"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="备注信息：" prop="auditMsg">
          <el-input
            v-model="form.reasonMsg"
            type="textarea"
            :rows="4"
            style="width: 250px"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="确认发货"
      :visible.sync="shipmentsVisible"
      width="30%"
      :close-on-click-modal="false"
      custom-class="shipmentsVisible"
    >
      <div class="order-box">
        <div class="item">
          <div class="title">收货人信息</div>
          <span>收货人：{{ orderDetailObj.receiveName }}</span>
          <span>收货地址：{{ orderDetailObj.receiveAllAddress }}</span>
          <span>手机号码：{{ orderDetailObj.receiveMobile }}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shipmentsVisible = false" size="small"
          >取 消</el-button
        >
        <el-button type="primary" @click="handleShipments()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getWayBillRecordList,
  getDispatchWorkbenchDetails
} from '@/api/waybill'

import { formatDate } from '@/utils/date'

const defaultReasonsQuery = {
  pageIndex: 1,
  pageSize: 1000
}

export default {
  name: 'dispatchWorkDetail',
  data() {
    return {
      tabViewObj: {
        path: '/oms/orderDetail',
        name: 'orderDetail',
        fullPath: '/oms/order'
      },
      body_width: 0,
      orderDetailObj: {},
      dialogVisible: false,
      shipmentsVisible: false,
      ReasonsQuery: Object.assign({}, defaultReasonsQuery),
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
      orderReasonsList: [],
      isCreated: false
    }
  },
  activated() {
    if (!this.isCreated) {
      this.getData()
    }
    this.isCreated = false
  },
  created() {
    this.isCreated = true
    this.getData()
  },
  mounted() {
    setTimeout(() => {
      this.body_width = this.$refs.body_box.clientWidth
    }, 300)
  },
  filters: {
    formatBillState(v) {
      if (v === '1') {
        return '待调度'
      } else if (v === '2') {
        return '已调度'
      } else if (v === '3') {
        return '已取消'
      } else if (v === '4') {
        return '中转调度'
      } else if (v === '0') {
        return '全部'
      }
    },
    formatOrderState(v) {
      if (v === 1) {
        return '待调度'
      } else if (v === 2) {
        return '已调度'
      } else if (v === 3) {
        return '已取消'
      } else if (v === 4) {
        return '中转调度'
      } else if (v === 5) {
        return '已取消'
      }
    },
    filterPrice(v) {
      if (v) {
        return v.toFixed(2)
      } else {
        return '0.00'
      }
    },
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    toLastView(visitedViews, view) {
      // const latestView = visitedViews.slice(-1)[0];
      const latestView = this.tabViewObj
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    getOrderReasonsList() {
      getOrderReasons(this.ReasonsQuery).then(response => {
        this.orderReasonsList = response.retData.pageData
      })
    },
    orderStateStyle(v) {
      if (v === '4') {
        return '#67C23A'
      } else if (v === '3') {
        return '#909399'
      } else if (v === '1') {
        return '#E6A23C'
      }
    },
    dialogClose() {
      this.form = {}
      this.$refs.refForm.resetFields()
    },
    handleDialogConfirm() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          let form = Object.assign({}, this.form)
          form.id = this.$route.query.orderId

          setOrderCancel(form).then(response => {
            if (response.retCode === 200) {
              this.dialogVisible = false
              this.form = {}
              this.$refs.refForm.resetFields()
              this.$message({
                message: '订单已取消！',
                type: 'success',
                duration: 1000
              })
              this.$store
                .dispatch('tagsView/delView', this.tabViewObj)
                .then(({ visitedViews }) => {
                  this.toLastView(visitedViews, this.tabViewObj)
                })
              // this.getData();
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleShipments() {
      setOrderShip({
        id: this.$route.query.orderId
      }).then(response => {
        if (response.retCode === 200) {
          this.$message({
            type: 'success',
            message: '发货成功!'
          })
          // this.getData();
          this.shipmentsVisible = false
          this.$store
            .dispatch('tagsView/delView', this.tabViewObj)
            .then(({ visitedViews }) => {
              this.toLastView(visitedViews, this.tabViewObj)
            })
        } else {
          this.$message({
            type: 'info',
            message: '操作失败'
          })
        }
      })
    },
    shipments() {
      this.shipmentsVisible = true
    },
    cancel() {
      this.ReasonsQuery.reasonType = 1
      this.getOrderReasonsList()
      this.dialogVisible = true
    },
    getData() {
      if (this.$route.query.wayBillId || this.$route.query.wayBillId == 0) {
        getDispatchWorkbenchDetails({
          id: this.$route.query.wayBillId
        }).then(response => {
          if (response.retCode === 200) {
            this.orderDetailObj = response.retData
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  background-color: #edf5fb;
  padding: 0;
  margin-bottom: 100px;
}
.title-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  span {
    padding-right: 70px;
  }
}
.status-box {
  background-color: #fff;
  padding: 20px 10px;
  border-radius: 6px;
  .status {
    font-size: 24px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #eee;
    flex-direction: column;
    p {
      padding-top: 10px;
    }
  }

  width: 100%;
  display: flex;
  .step-box {
    flex: 9;
  }
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
.box-card {
  margin-top: 10px;
}
.order-box {
  display: flex;
  background-color: #fff;
  border-radius: 6px;

  span {
    display: block;
    padding-bottom: 10px;
  }
  .item {
    flex: 1;
    padding: 0 20px;
    border-right: 1px solid #eee;
    .title {
      padding-bottom: 20px;
      font-size: 18px;
    }
    .refund-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }

  .item:last-of-type {
    border-right: none;
  }
}
.bottom-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 20px 10px;
  border-radius: 6px;
}

::v-deep .shipmentsVisible {
  .el-dialog__header {
    border-bottom: 1px solid #eee;
  }
  .el-dialog__body {
    padding: 0;
  }

  .order-box {
    padding: 0;
  }
}
.submit-box {
  position: fixed;
  bottom: 0;
  height: 88px;
  display: flex;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 33px 0px rgba(223, 224, 228, 0.6);
  border-radius: 3px;
  z-index: 998;
  .el-button {
    width: 92px;
    height: 36px;
  }
}
.summary-box {
  text-align: right;
  padding-top: 20px;
  .item {
    .label {
      width: 60px;
      display: inline-block;
      text-align: left;
    }
    .content {
      width: 100px;
      display: inline-block;
      text-align: left;
    }
  }
}
.refundRemarks-box {
  border-right: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  height: 53px;
  line-height: 53px;
  border-radius: 0 0 5px 5px;
  padding-left: 20px;
}
</style>
