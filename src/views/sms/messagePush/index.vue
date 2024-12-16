<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small">
          <el-form-item label="输入搜索">
            <el-input
              v-model="listQuery.keyword"
              style="width: 350px"
              placeholder="输入关键词"
              clearable
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="URL类型">
            <el-select
              v-model="listQuery.urlType"
              class="input-width"
              clearable
              placeholder="请选择URL类型"
            >
              <el-option :key="0" label="无跳转" value="0"> </el-option>
              <el-option :key="1" label="指定商品" value="1"> </el-option>
              <el-option :key="2" label="指定活动" value="3"> </el-option>
            </el-select>
          </el-form-item> -->
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
    <!-- <el-card class="operate-container" shadow="never">
      <div>
        <i class="el-icon-tickets"></i>
        <span>消息推送列表</span>
      </div>
      <div>
        <el-button
          size="small"
          class="btn-add"
          @click="handleAdd()"
          icon="el-icon-plus"
          type="primary"
          v-permission="['post_productbasic_setproductbasicunitedit']"
          >添加</el-button
        >
      </div>
    </el-card> -->
    <div class="table-container">
      <div class="table-btns-box">
        <el-tabs
          v-model="activeName"
          style="width: 40vw"
          @tab-click="handleClick"
          :stretch="true"
        >
          <!-- <el-tab-pane label="商品通知" name="1"></el-tab-pane> -->
          <el-tab-pane label="订单通知" name="2"></el-tab-pane>
          <!-- <el-tab-pane label="活动通知" name="3"></el-tab-pane> -->
          <!-- <el-tab-pane label="店铺通知" name="4"></el-tab-pane> -->
          <el-tab-pane label="服务通知" name="5"></el-tab-pane>
        </el-tabs>
        <div>
          <el-button
            size="small"
            class="btn-add"
            @click="handleAdd()"
            icon="el-icon-plus"
            v-permission="['Post_Content_SetMessagePushEdit']"
            type="primary"
            >添加</el-button
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
        <el-table-column label="编号" type="index" width="60" align="center">
        </el-table-column>
        <el-table-column label="推送类型" align="center">
          <template slot-scope="scope">{{ scope.row.pushTypeMsg }}</template>
        </el-table-column>
        <el-table-column label="推送标题" align="center">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="推送详细内容" align="center">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column label="权重" align="center">
          <template slot-scope="scope">{{ scope.row.grade }}</template>
        </el-table-column>
        <el-table-column label="推送图片" align="center">
          <template slot-scope="scope">
            <img
              :src="scope.row.image"
              style="width: 60px; height: 60px"
              alt="推送图片"
            />
          </template>
        </el-table-column>
        <!-- <el-table-column label="简介描述" align="center">
          <template slot-scope="scope">{{ scope.row.introduction }}</template>
        </el-table-column> -->
        <!-- <el-table-column label="是否推送" align="center">
          <template slot-scope="scope">{{ scope.row.isPushMsg }}</template>
        </el-table-column> -->
        <el-table-column label="加入时间" align="center">
          <template slot-scope="scope">{{ scope.row.joinTime }}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{ scope.row.remarks }}</template>
        </el-table-column>

        <el-table-column label="最后一次更新时间" align="center" width="120">
          <template slot-scope="scope">{{ scope.row.upTime }}</template>
        </el-table-column>
        <el-table-column label="URL类型" align="center">
          <template slot-scope="scope">{{ scope.row.urlTypeMsg }}</template>
        </el-table-column>

        <el-table-column label="状态" width="160" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.verify ? 'enable_txt' : 'disable_txt'">{{
              scope.row.verify ? '启用' : '禁用'
            }}</span></template
          >
        </el-table-column>

        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              v-permission="['post_content_setMessagePushVerify']"
              @change="handleStatusChange($event, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.verify"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-row class="handle-table-box">
              <el-button
                v-if="scope.row.verify"
                size="mini"
                type="primary"
                v-permission="['post_content_setMessagePushSend']"
                @click="handleUpdate(scope.$index, scope.row, 'send')"
              >
                推送
              </el-button>
              <el-button
                size="mini"
                type="primary"
                v-permission="['Post_Content_SetMessagePushEdit']"
                @click="handleUpdate(scope.$index, scope.row)"
              >
                编辑
              </el-button>

              <el-button
                size="mini"
                type="danger"
                v-permission="['Post_Content_SetMessagePushDelete']"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
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
    <!--     isSend ? (isEdit ? '编辑消息推送' : '添加消息推送') : '发送消息推送' -->
    <el-dialog
      :title="
        isSend
          ? `发送消息推送(${sendTypeText})`
          : isEdit
          ? '编辑消息推送'
          : '添加消息推送'
      "
      :visible.sync="dialogVisible"
      width="800px"
      @close="dialogClose()"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="refForm"
        label-width="100px"
        :rules="rules"
        size="small"
      >
        <el-form-item label="推送标题" prop="title">
          <el-input
            v-model="form.title"
            maxlength="20"
            show-word-limit
            style="width: 350px"
            :disabled="isSend"
            placeholder="请输入推送标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送详细内容" prop="content">
          <el-input
            :rows="4"
            type="textarea"
            class="input-width"
            maxlength="100"
            placeholder="请输入推送详细内容"
            show-word-limit
            :disabled="isSend"
            v-model="form.content"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送图片" prop="image">
          <single-upload v-model="form.image" :isLook="isSend"></single-upload>
        </el-form-item>
        <el-form-item label="推送类型" prop="pushType" class="form-item-radio">
          <el-radio-group v-model="form.pushType" :disabled="isSend">
            <!-- <el-radio :label="1" :disabled="[3].indexOf(form.urlType) !== -1"
              >商品通知</el-radio
            > -->
            <el-radio :label="2">订单通知</el-radio>
            <!-- <el-radio :label="3" :disabled="[1].indexOf(form.urlType) !== -1"
              >活动通知</el-radio
            > -->
            <!-- <el-radio :label="4">店铺通知</el-radio> -->
            <el-radio :label="5">服务通知</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="URL类型" prop="urlType" class="form-item-radio">
          <el-radio-group
            v-model="form.urlType"
            :disabled="isSend"
            @change="changeRadio"
          >
            <el-radio :label="0">无跳转</el-radio>
            <!-- <el-radio :label="1" :disabled="[3].indexOf(form.pushType) !== -1"
              >指定商品</el-radio
            >
            <el-radio :label="3" :disabled="[1].indexOf(form.pushType) !== -1"
              >指定活动</el-radio
            > -->
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.urlType === 1" label="关联商品">
          <div class="goodsList">
            <div class="content">
              <div class="handle-btns" v-show="selectedGoodsList.length === 0">
                <el-button
                  size="small"
                  @click="showGoodsListDialog"
                  type="primary"
                  icon="el-icon-plus"
                  >添加商品</el-button
                >
              </div>
              <el-table
                ref="goodsTable"
                :data="selectedGoodsList"
                style="width: 600px; margin-top: 20px"
                border
              >
                <!-- <el-table-column
                  type="selection"
                  width="60"
                  align="center"
                
                >
                </el-table-column> -->
                <!-- <el-table-column label="商品图片" align="center">
              <template slot-scope="scope">
                <img
                  :src="scope.row.productImage"
                  style="width: 60px; height: 60px"
                  alt="商品图片"
                />
              </template>
            </el-table-column> -->

                <el-table-column label="商品名称" align="center">
                  <template slot-scope="scope">{{
                    scope.row.productName
                  }}</template>
                </el-table-column>
                <el-table-column label="后台类目" align="center">
                  <template slot-scope="scope">{{
                    scope.row.productBasicCateGoryName
                  }}</template>
                </el-table-column>
                <!-- <el-table-column label="商品价格" align="center">
              <template slot-scope="scope">{{
                scope.row.productPrice
              }}</template>
            </el-table-column> -->
                <el-table-column label="所属商家" align="center">
                  <template slot-scope="scope">{{
                    scope.row.shopName
                  }}</template>
                </el-table-column>
                <el-table-column label="商品状态" align="center">
                  <template slot-scope="scope">{{
                    scope.row.verifyMsg
                  }}</template>
                </el-table-column>
                <el-table-column label="操作" width="80" align="center">
                  <template slot-scope="scope">
                    <el-row v-if="!isSend">
                      <el-button
                        size="mini"
                        type="text"
                        @click="delSelectedGoodsList(scope.$index, scope.row)"
                      >
                        删除
                      </el-button>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="指定活动"
          v-if="form.urlType === 3"
          prop="topicIdList"
        >
          <el-select
            v-model="form.topicIdList"
            class="input-width"
            clearable
            :disabled="isSend"
            placeholder="请选择活动"
          >
            <el-option
              v-for="item in activityList"
              :key="item.id"
              :disabled="item.verify !== 1"
              :label="`${item.topicName}-(${item.typeMsg})-[${item.verifyMsg}]`"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否推送" prop="isPush" class="form-item-radio">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="form.isPush"
          >
          </el-switch>
        </el-form-item> -->
        <el-form-item label="权重" prop="grade">
          <el-input-number
            :min="0"
            :max="10000"
            :precision="0"
            :controls="false"
            :disabled="isSend"
            v-model="form.grade"
            type="number"
            class="input-width"
            placeholder="请输入权重值"
          >
          </el-input-number>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            :rows="4"
            type="textarea"
            class="input-width"
            maxlength="100"
            placeholder="请输入备注"
            show-word-limit
            v-model="form.remarks"
            :disabled="isSend"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="发送类型"
          prop="isPush"
          v-if="isSend"
          class="form-item-radio"
        >
          <el-radio-group v-model="form.isPush">
            <el-radio :label="1">推送+站内信</el-radio>
            <el-radio :label="0">站内信</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="接收对象类型"
          prop="receiveType"
          v-if="isSend"
          class="form-item-radio"
        >
          <el-radio-group
            v-model="form.receiveType"
            @change="changeReceiveType"
          >
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">指定骑手</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label=" " v-if="form.receiveType === 1">
          <div>
            <el-transfer
              v-model="form.sendUserIdsList"
              filterable
              :filter-method="filterMethod"
              :props="{
                key: 'id',
                label: 'nickName'
              }"
              :titles="['所有骑手列表', '指定骑手列表']"
              :data="usersList"
              :render-content="renderFunc"
            ></el-transfer>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="商品列表"
      :visible.sync="goodsDialog"
      @close="goodsDialogClose"
      width="1200px"
      :close-on-click-modal="false"
    >
      <div class="table-container">
        <el-card class="filter-container" shadow="never">
          <div>
            <i class="el-icon-search"></i>
            <span>筛选搜索</span>
          </div>
          <div style="margin-top: 15px">
            <el-form :inline="true" :model="goodsListQuery" size="small">
              <el-form-item label="商品关键词">
                <el-input
                  v-model="goodsListQuery.keyword"
                  class="input-width"
                  placeholder="请输入商品关键词"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item class="fr">
                <el-button
                  type="primary"
                  @click="handleGoodsSearchList()"
                  size="small"
                >
                  查询
                </el-button>

                <el-button @click="handleGoodsResetSearch()" size="small">
                  重置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="operate-container" shadow="never">
          <div>
            <!-- <el-button
              size="small"
              @click="batchAdd"
              class="batchAdd"
              type="primary"
              >批量添加</el-button
            > -->
            <span style="vertical-align: text-top"
              >此列表只包含“在售中”的商品</span
            >
          </div>
        </el-card>
        <div class="table-container">
          <el-table
            ref="goodsTable"
            :data="goodsList"
            style="width: 100%"
            border
          >
            <!-- <el-table-column
              type="selection"
              width="60"
              align="center"
              :selectable="checkAble"
            >
            </el-table-column> -->
            <!-- <el-table-column label="商品图片" align="center">
              <template slot-scope="scope">
                <img
                  :src="scope.row.productImage"
                  style="width: 60px; height: 60px"
                  alt="商品图片"
                />
              </template>
            </el-table-column> -->

            <el-table-column label="商品名称" align="center">
              <template slot-scope="scope">{{
                scope.row.productName
              }}</template>
            </el-table-column>
            <el-table-column label="后台类目" align="center">
              <template slot-scope="scope">{{
                scope.row.productBasicCateGoryName
              }}</template>
            </el-table-column>
            <!-- <el-table-column label="商品价格" align="center">
              <template slot-scope="scope">{{
                scope.row.productPrice
              }}</template>
            </el-table-column> -->
            <el-table-column label="所属商家" align="center">
              <template slot-scope="scope">{{ scope.row.shopName }}</template>
            </el-table-column>
            <el-table-column label="商品状态" align="center">
              <template slot-scope="scope">{{ scope.row.verifyMsg }}</template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <el-row>
                  <span v-if="scope.row.isAdd" class="enable_txt">
                    已添加
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
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="clearfix">
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="handleGoodsSizeChange"
            @current-change="handleGoodsCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :current-page.sync="goodsListQuery.pageIndex"
            :page-size="goodsListQuery.pageSize"
            :page-sizes="[10, 20, 30]"
            :total="goodsTotal"
          >
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getMessagePushList,
  setMessagePushVerify,
  setMessagePushEdit,
  getMessagePushDetail,
  setMessagePushDelete,
  setMessagePushSend
} from '@/api/messagePush'
import { getDeliverGuyList } from '@/api/deliveryGuy'
import SingleUpload from '@/components/Upload/singleUpload'
import { formatDate } from '@/utils/date'
const defaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
  pushType: 2
}
const defaultGoodsListQuery = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
  listTypeId: 2
  // listTypeId:1,
}
export default {
  name: 'messagePush',
  components: { SingleUpload },
  data() {
    const _urlType = (rule, value, callback) => {
      setTimeout(() => {
        if (!value && value !== 0) {
          callback(new Error('请选择URL类型'))
        } else if (value && value === 1 && !this.selectedGoodsList.length) {
          callback(new Error('请选择指定商品'))
        } else {
          callback()
        }
      }, 100)
    }
    const _topicIdList = (rule, value, callback) => {
      setTimeout(() => {
        if (this.form.urlType === 3 && !value) {
          callback(new Error('请选择指定活动'))
        } else {
          callback()
        }
      }, 100)
    }

    const _receiveType = (rule, value, callback) => {
      setTimeout(() => {
        if (!value && value !== 0) {
          callback(new Error('请选择接收对象类型'))
        } else if (
          value &&
          value === 1 &&
          (!this.form.sendUserIdsList || !this.form.sendUserIdsList.length)
        ) {
          callback(new Error('请选择指定用户'))
        } else {
          callback()
        }
      }, 100)
    }
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      id: null,
      listLoading: false,
      dialogVisible: false,
      form: {},
      isEdit: false,
      rules: {
        title: [{ required: true, message: '请输入推送标题', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入推送详细内容', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请选择推送图片', trigger: 'change' }
        ],
        pushType: [
          { required: true, message: '请选择推送类型', trigger: 'change' }
        ],
        isPush: [
          { required: true, message: '请选择发送类型', trigger: 'change' }
        ],

        urlType: [{ required: true, validator: _urlType }],
        topicIdList: [
          { required: true, validator: _topicIdList, trigger: 'change' }
        ],
        receiveType: [
          { required: true, validator: _receiveType, trigger: 'change' }
        ]
      },
      goodsDialog: false,
      goodsListQuery: Object.assign({}, defaultGoodsListQuery),
      goodsList: [],
      goodsTotal: 0,
      selectedGoodsList: [],
      activityList: [],
      isCreated: false,
      isSend: false,
      usersList: [],
      renderFunc(h, option) {
        return (
          <span>
            {option.name}({option.phone})
          </span>
        )
      },
      filterMethod(query, item) {
        if (
          (item.name && item.name.indexOf(query) > -1) ||
          (item.phone && item.phone.indexOf(query) > -1)
        ) {
          return true
        } else {
          return false
        }
      },
      activeName: '2',
      sendTypeText: '订单通知'
    }
  },
  activated() {
    if (!this.isCreated) {
      this.getList()
      // this.getActivityList();
    }
    this.isCreated = false
  },

  created() {
    this.isCreated = true
    this.getList()
    // this.getActivityList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    changeReceiveType(v) {
      setTimeout(() => {
        this.$refs.refForm.clearValidate(['receiveType'])
      }, 100)
      if (v === 1) {
        this.getUsers()
      }
    },
    handleClick() {
      this.listQuery.pageIndex = 1
      this.listQuery.pushType = this.activeName * 1
      let list = ['订单通知', '活动通知', '服务通知']
      this.sendTypeText = list[this.listQuery.pushType - 1]
      this.getList()
    },
    delSelectedGoodsList(index, row) {
      this.selectedGoodsList.splice(index, 1)
    },
    handleAddGoods(index, row) {
      this.selectedGoodsList = []
      this.$set(this.goodsList[index], 'isAdd', true)
      this.selectedGoodsList.push(row)
      this.goodsDialog = false
    },
    showGoodsListDialog() {
      this.getGoodsList()
      this.goodsDialog = true
    },
    goodsDialogClose() {
      this.goodsListQuery = Object.assign({}, defaultGoodsListQuery)
    },
    changeRadio(v) {
      this.selectedGoodsList = []
      setTimeout(() => {
        this.$refs.refForm.clearValidate(['urlType'])
      }, 100)
      // if (v === 3) {
      //   this.getActivityList();
      // }
    },
    dialogClose() {
      this.form = {}
      this.$refs.refForm.resetFields()
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
      this.listQuery.pushType = this.activeName * 1
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

    handleStatusChange(status, row) {
      row.verify = status === 1 ? 0 : 1
      this.$confirm('是否要修改该状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setMessagePushVerify({
            verify: status,
            commonIds: row.id
          }).then(response => {
            if (response.retCode === 200) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              row.verify = status
              // this.getList();
            } else {
              this.$message({
                type: 'info',
                message: '修改失败'
              })
            }
          })
        })
        .catch(() => {
          let oldStatus = status === 1 ? 0 : 1
          row.verify = oldStatus
          this.$message({
            type: 'info',
            message: '取消修改'
          })
          // this.getList();
        })
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该消息推送?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setMessagePushDelete({ commonIds: row.id }).then(response => {
          if (response.retCode === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          }
        })
      })
    },
    handleAdd() {
      this.isEdit = false
      this.isSend = false
      this.dialogVisible = true
    },
    handleUpdate(index, row, type) {
      if (type && type === 'send') {
        this.isSend = true
        this.isEdit = false
      } else {
        this.isSend = false
        this.isEdit = true
      }
      this.dialogVisible = true

      getMessagePushDetail({ id: row.id }).then(response => {
        if (response.retCode === 200) {
          this.form = Object.assign({}, response.retData)

          //获取上次选中商品
          if (response.retData.urlType === 1) {
            let goodsListQuery = {
              pageIndex: 1,
              pageSize: 10,
              keyword: null,
              listTypeId: 0,
              productIds: response.retData.urlId * 1
            }
            getProductDataList(goodsListQuery).then(response => {
              this.selectedGoodsList = [
                ...response.retData.productDataList.pageData
              ]
            })
          }
          if (this.form.urlType === 3) {
            this.$set(this.form, 'topicIdList', this.form.urlId * 1)
          }
        }
      })
    },
    // 处理 指定商品 和 指定活动
    mergeData(form) {
      if (form.urlType === 1) {
        form.urlId = this.selectedGoodsList[0].id + ''
      }
      if (form.urlType === 3) {
        form.urlId = form.topicIdList
      }
    },
    handleDialogConfirm() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          if (this.isSend) {
            let form = {}
            form.pushImage = this.form.image
            form.pushMessage = this.form.content
            form.pushTitle = this.form.title
            form.urlType = this.form.urlType
            form.pushType = this.form.pushType
            form.isPush = this.form.isPush
            if (this.form.urlType === 1) {
              form.urlId = this.selectedGoodsList[0].id + ''
            }
            if (this.form.urlType === 3) {
              form.urlId = this.form.topicIdList
            }
            if (this.form.receiveType === 0) {
              form.pushAlias = ''
              form.pushAudience = 'All'
            }

            if (this.form.receiveType === 1) {
              form.pushAlias = this.form.sendUserIdsList.join()
              form.pushAudience = ''
            }
            setMessagePushSend(form).then(response => {
              if (response.retCode === 200) {
                this.dialogVisible = false
                this.form = {}
                this.$refs.refForm.resetFields()
                this.$message({
                  message: '发送成功！',
                  type: 'success',
                  duration: 1000
                })
                this.getList()
              }
            })
          } else if (this.isEdit) {
            let form = Object.assign({}, this.form)
            this.mergeData(form)
            setMessagePushEdit(form).then(response => {
              if (response.retCode === 200) {
                this.dialogVisible = false
                this.form = {}
                this.$refs.refForm.resetFields()
                this.$message({
                  message: '编辑成功！',
                  type: 'success',
                  duration: 1000
                })
                this.getList()
              }
            })
          } else {
            let form = Object.assign({}, this.form)
            form.verify = 1
            this.mergeData(form)
            setMessagePushEdit(form).then(response => {
              if (response.retCode === 200) {
                this.dialogVisible = false
                this.form = {}
                this.$refs.refForm.resetFields()
                this.$message({
                  message: '新增成功！',
                  type: 'success',
                  duration: 1000
                })
                this.getList()
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getList() {
      this.listLoading = true
      getMessagePushList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.retData.pageData
        this.total = response.retData.recordCount
      })
    },
    getGoodsList() {
      getProductDataList(this.goodsListQuery).then(response => {
        this.goodsList = response.retData.productDataList.pageData
        this.goodsTotal = response.retData.productDataList.recordCount
        let selectedIds = []
        if (this.selectedGoodsList.length) {
          this.selectedGoodsList.forEach((v, i) => {
            selectedIds.push(v.id)
          })
          this.goodsList.forEach((v, i) => {
            if (selectedIds.indexOf(v.id) !== -1) {
              this.$set(this.goodsList[i], 'isAdd', true)
            }
          })
        }
      })
    },
    getActivityList() {
      let listQuery = {
        pageIndex: 1,
        pageSize: 99999
        // verify: 1,
      }
      getSaleTopicSeckillList(listQuery).then(response => {
        if (response.retCode === 200) {
          this.activityList = response.retData.pageData
        }
      })
    },
    getUsers() {
      getDeliverGuyList({ pageIndex: 1, pageSize: 9999 }).then(response => {
        if (response.retCode === 200) {
          this.usersList = response.retData.deliveryGuyInfos.pageData
        }
      })
    },
    handleGoodsSearchList() {
      for (let key in this.goodsListQuery) {
        if (!this.goodsListQuery[key]) {
          delete this.goodsListQuery[key]
        }
      }
      this.goodsListQuery.pageIndex = 1
      this.getGoodsList()
    },
    handleGoodsResetSearch() {
      this.goodsListQuery = Object.assign({}, defaultGoodsListQuery)
      this.getGoodsList()
    },
    handleGoodsSizeChange(val) {
      this.goodsListQuery.pageIndex = 1
      this.goodsListQuery.pageSize = val
      this.getGoodsList()
    },
    handleGoodsCurrentChange(val) {
      this.goodsListQuery.pageIndex = val
      this.getGoodsList()
    }
  }
}
</script>
<style lang="scss" scoped>
// 初始化 tab 下面划线的颜色
::v-deep .el-tabs__nav-wrap:after {
  background-color: #fff;
}

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
</style>
