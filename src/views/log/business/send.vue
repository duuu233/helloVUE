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
        <span>业务发送日志列表</span>
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
        <el-table-column
          label="内容"
          align="center"
          min-width="400"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{ scope.row.note }}</template>
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
import { getBusinessLogs } from "@/api/log";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
  logBusinessType: "send",
};

export default {
  name: "sendLogs",
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
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      this.listQuery.pageIndex = 1;
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
      getBusinessLogs(this.listQuery).then((response) => {
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


