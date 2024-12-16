<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small">
          <el-form-item label="骑手姓名/昵称">
            <el-input
              v-model="listQuery.keyword"
              style="width: 350px"
              placeholder="输入骑手姓名、昵称"
              clearable
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="创建时间">
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
          <!-- <el-form-item label="送达时间">
            <el-date-picker
              style="width: 311px"
              v-model="deliveryTime"
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
    <div class="table-container">
      <div class="table-btns-box">
        <el-tabs
          v-model="activeName"
          style="width: 40vw"
          @tab-click="handleClick"
          :stretch="true"
        >
          <el-tab-pane
            :label="'全部' + '(' + listObj.allCount + ')'"
            name="-1"
          ></el-tab-pane>
          <el-tab-pane
            :label="'开工中' + '(' + listObj.startCount + ')'"
            name="1"
          ></el-tab-pane>
          <el-tab-pane
            :label="'忙碌中' + '(' + listObj.busilyCount + ')'"
            name="2"
          ></el-tab-pane>
          <el-tab-pane
            :label="'已收工' + '(' + listObj.closedCount + ')'"
            name="3"
          ></el-tab-pane>
        </el-tabs>
        <div>
          <el-button
            type="primary"
            size="small"
            style="margin-left: 10px"
            @click="handleExport"
            icon="el-icon-document"
            >导出配送员</el-button
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

        <el-table-column label="加入时间" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.joinTime }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="现已运单" align="center" width="150">
          <template slot-scope="scope">{{ scope.row.daddress }}</template>
        </el-table-column> -->

        <el-table-column label="操作" width="160" align="center">
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
                v-permission="['get_deliveryGuy_getDeliveryGuyAllList']"
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
import { getDeliverGuyList, getDeliverGuyExcel } from '@/api/deliveryGuy'
import { formatDate } from '@/utils/date'
const defaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
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
      activeName: '-1',
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      id: null,
      listLoading: false,
      dialogVisible: false,
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
      deliveryTime: [],
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
      this.getList()
    }
    this.isCreated = false
  },
  created() {
    this.isCreated = true
    this.getList()
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
      getDeliverGuyExcel(this.listQuery).then(res => {
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
      if (this.activeName !== '-1') {
        this.listQuery.jobStatus = this.activeName * 1
      } else {
        delete this.listQuery.jobStatus
      }

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

      if (this.activeName !== '-1') {
        this.listQuery.jobStatus = this.activeName * 1
      } else {
        delete this.listQuery.jobStatus
      }
      this.dateList = []
      this.deliveryTime = []
      this.getList()
    },
    handleSearchList() {
      this.listQuery.pageIndex = 1
      if (this.listQuery.basicClassifyName) {
        delete this.listQuery.basicClassifyName
      }
      if (this.listQuery.classifyName) {
        delete this.listQuery.classifyName
      }

      if (this.dateList && this.dateList.length) {
        this.listQuery.startDate = this.dateList[0]
        this.listQuery.endDate = this.dateList[1]
      } else {
        delete this.listQuery.startDate
        delete this.listQuery.endDate
      }

      if (this.deliveryTime && this.deliveryTime.length) {
        this.listQuery.serviceStartDate = this.deliveryTime[0]
        this.listQuery.serviceEndDate = this.deliveryTime[1]
      } else {
        delete this.listQuery.serviceStartDate
        delete this.listQuery.serviceEndDate
      }

      for (let key in this.listQuery) {
        if (!this.listQuery[key] && this.listQuery[key] !== 0) {
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
        path: 'deliveryGuyDetail',
        query: { id: row.id }
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

      getDeliverGuyList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.retData.deliveryGuyInfos.pageData
        this.listObj = response.retData
        this.total = response.retData.deliveryGuyInfos.recordCount
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
