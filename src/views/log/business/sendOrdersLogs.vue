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
              maxlength="20"
              show-word-limit
              placeholder="输入关键词"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="操作人员">
            <el-select
              v-model="listQuery.operator"
              class="input-width"
              clearable
              placeholder="请选择操作人员类型"
            >
              <el-option :key="1" label="系统" value="0"> </el-option>
              <el-option :key="2" label="人工" value="1"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作时间">
            <el-select
              v-model="listQuery.sortOrder"
              class="input-width"
              clearable
              placeholder="请选择操作时间类型"
            >
              <el-option :key="1" label="由近到远" value="0"> </el-option>
              <el-option :key="2" label="由远到近" value="1"> </el-option>
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
    <el-card class="operate-container" shadow="never">
      <div>
        <i class="el-icon-tickets"></i>
        <span>骑手派单日志列表</span>
      </div>
      <div>
        <el-button
          size="small"
          style="margin-left: 10px"
          icon="el-icon-document"
          type="primary"
          @click="handleExport"
          >导出订单</el-button
        >
      </div>
    </el-card>
    <div class="table-container">
      <el-table
        ref="roleTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
        :header-cell-style="{
          background: '#F2F6FA',
          color: '#555555',
          'text-align': 'center',
        }"
      >
        <el-table-column type="index" align="center"> </el-table-column>
        <el-table-column label="配送员名称" align="center">
          <template slot-scope="scope">{{ scope.row.guyName }}</template>
        </el-table-column>
        <el-table-column label="IP地址" align="center">
          <template slot-scope="scope">{{ scope.row.ip }}</template>
        </el-table-column>
        <el-table-column label="配送信息" align="center" min-width="400px">
          <template slot-scope="scope">{{ scope.row.note }}</template>
        </el-table-column>
        <el-table-column label="运单号" align="center">
          <template slot-scope="scope">{{ scope.row.waybillno }}</template>
        </el-table-column>
        <el-table-column label="操作员" align="center">
          <template slot-scope="scope">{{ scope.row.operator }}</template>
        </el-table-column>

        <el-table-column label="操作时间" width="160" align="center">
          <template slot-scope="scope">{{
            scope.row.joinTime | formatDateTime
          }}</template>
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
import { getWaybillDispatchLogs, getWaybillDispatchExcel } from "@/api/log";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
};

export default {
  name: "sendOrdersLogs",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      id: null,
      listLoading: false,
      dialogVisible: false,
      form: {},
      isEdit: false,
      isCreated: false,
    };
  },
  activated() {
    if (!this.isCreated) {
      this.getList();
    }
    this.isCreated = false;
  },
  created() {
    this.isCreated = true;
    this.getList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    handleExport() {
      getWaybillDispatchExcel(this.listQuery).then((res) => {
        if (res.retCode === 200) {
               if (res.retData) {
            window.location.href = res.retData;
          } else {
            this.$message({
              type: "warning",
              message: "数据为空，无法导出!",
            });
          }
        } else {
          this.$message({
            type: "success",
            message: "导出失败!",
          });
        }
      });
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      this.listQuery.pageIndex = 1;
      for (let key in this.listQuery) {
        if (
          !this.listQuery[key] &&
          this.listQuery[key] !== 0 &&
          this.listQuery[key] !== "0"
        ) {
          delete this.listQuery[key];
        }
      }
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageIndex = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },

    getList() {
      this.listLoading = true;
      getWaybillDispatchLogs(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.retData.pageData;
        this.total = response.retData.recordCount;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.enabled {
  color: #67c23a;
}
</style>


