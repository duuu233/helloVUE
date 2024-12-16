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
          <!-- <el-form-item label="url类型">
            <el-select
              v-model="listQuery.urlType"
              class="input-width"
              clearable
              placeholder="请选择url类型"
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
        <!-- <el-table-column label="用户Id" align="center">
          <template slot-scope="scope">{{ scope.row.urlId }}</template>
        </el-table-column> -->
        <el-table-column label="用户昵称" align="center">
          <template slot-scope="scope">{{ scope.row.nickname }}</template>
        </el-table-column>
        <el-table-column label="用户手机号" align="center">
          <template slot-scope="scope">{{ scope.row.mobile }}</template>
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
        <el-table-column label="推送图片" align="center">
          <template slot-scope="scope">
            <img
              v-if="scope.row.image"
              :src="scope.row.image"
              style="width: 60px; height: 60px"
              alt="推送图片"
            />
            <span v-else>/</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="简介描述" align="center">
          <template slot-scope="scope">{{ scope.row.introduction }}</template>
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
        <el-table-column label="url类型" align="center">
          <template slot-scope="scope">{{ scope.row.urlTypeMsg }}</template>
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
import { getUserMessageList } from '@/api/messageUser'
const defaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
  pushType: 2
}

export default {
  name: 'messageUser',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      activeName: '2',
      sendTypeText: '订单通知'
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
    }
  },
  methods: {
    handleClick() {
      this.listQuery.pageIndex = 1
      this.listQuery.pushType = this.activeName * 1
      let list = ['订单通知', '服务通知']
      this.sendTypeText = list[this.listQuery.pushType - 1]
      this.getList()
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

    getList() {
      this.listLoading = true
      getUserMessageList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.retData.pageData
        this.total = response.retData.recordCount
      })
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
