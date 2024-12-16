<template>
   
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small">
          <el-form-item label="客户端">
            <el-select
              v-model="listQuery.terminal"
              clearable
              placeholder="请选择客户端"
            >
              <el-option
                v-show="item.value < 3 && item.value > 0"
                v-for="item in clientList"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="APP">
            <el-select
              v-model="listQuery.appTypeId"
              clearable
              placeholder="请选择APP"
            >
              <el-option
                v-show="item.text !== '全部'"
                v-for="item in appTypeList"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="关键词">
            <el-input v-model="listQuery.keyword" clearable placeholder="请输入关键词"></el-input>
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
    <el-card class="operate-container" shadow="never">
      <div>
        <i class="el-icon-tickets"></i>
        <span>应用商店列表</span>
      </div>

      <el-button
        size="small"
        class="btn-add"
        style="margin-left: 20px"
        type="primary"
        icon="el-icon-plus"
        v-permission="['Post_Content_SetAppMarketEdit']"
        @click="addFreight('add')"
        >新增应用商店</el-button
      >
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
        <el-table-column label="APP名称" align="center">
          <template slot-scope="scope">{{ scope.row.appTypeName }}</template>
        </el-table-column>

        <el-table-column label="客户端" align="center">
          <template slot-scope="scope">{{ scope.row.terminalMsg }}</template>
        </el-table-column>

        <el-table-column label="应用商店" align="center">
          <template slot-scope="scope">{{ scope.row.marketTypeMsg }}</template>
        </el-table-column>

        <el-table-column label="应用商店地址" align="center">
          <template slot-scope="scope">{{ scope.row.marketUrl }}</template>
        </el-table-column>

        <el-table-column label="状态" width="160" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.verify ? 'enabled' : ''">{{
              scope.row.verify ? "启用" : "禁用"
            }}</span></template
          >
        </el-table-column>

        <el-table-column
          label="是否显示"
          width="140"
          align="center"
          v-permission="['Post_Content_SetAppMarketVerify']"
        >
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange($event, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.verify"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-row class="handle-table-box">
              <el-button
                size="mini"
                type="primary"
                @click="addFreight('edit', scope.row)"
                v-permission="['Post_Content_SetAppMarketEdit']"
              >
                编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                v-permission="['Post_Content_SetAppMarketDelete']"
                @click="handleDelete(scope.$index, scope.row)"
              >
                删除
              </el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加模板弹窗 -->
    <el-dialog
      :title="applicationType == 'edit' ? '编辑应用商店' : '新增应用商店'"
      :visible.sync="freightDialogVisible"
      width="600px"
      @close="close()"
       :close-on-click-modal='false'
    >
      <el-form
        :model="applicationForm"
        ref="refApplicationForm"
        :rules="rules"
        label-width="100px"
        size="small"
      >
        <el-form-item label="APP名称" prop="appTypeId">
          <el-select
            class="input-width"
            v-model="applicationForm.appTypeId"
            clearable
            placeholder="请选择App名称"
          >
            <el-option
              v-show="item.value > 0"
              v-for="item in appTypeList"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户端" prop="terminal">
          <el-select
            class="input-width"
            v-model="applicationForm.terminal"
            clearable
            placeholder="请选择客户端"
          >
            <el-option
              v-show="item.value > 0 && item.value < 3"
              v-for="item in clientList"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用商店" prop="marketTypeId">
          <el-select
            class="input-width"
            v-model="applicationForm.marketTypeId"
            clearable
            placeholder="请选择应用商店"
          >
            <el-option
              v-show="item.value > 0"
              v-for="item in marketList"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用商店地址" prop="marketUrl">
          <el-input
            placeholder="请输入应用商店地址"
            v-model="applicationForm.marketUrl"
            class="input-width"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="freightDialogVisible = false" size="small"
          >取 消</el-button
        >
        <el-button type="primary" @click="submitFreightForm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>

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
import { getUsers } from "@/api/member";
import {
  getAppMarketList,
  setAppMarketEdit,
  setAppMarketVerify,
  setAppMarketDelete,
} from "@/api/applicationStore";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageIndex: 1,
  pageSize: 10,
  appTypeId: null,
  terminal: null,
  keyword: null,
};
const applicationForm = {
  id: null,
  appTypeId: null,
  marketTypeId: null,
  terminal: null,
  marketUrl: null,
};

export default {
  name: "resLogs",
  data() {
    const _freightAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入属性值"));
      } else if (value <= 0) {
        return callback(new Error("输入的运费金额不能小于0"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        appTypeId: [
          { required: true, message: "请选择APP名称", trigger: "change" },
        ],
        marketTypeId: [
          { required: true, message: "请选择应用商店", trigger: "change" },
        ],
        terminal: [
          { required: true, message: "请选择客户端", trigger: "change" },
        ],
        marketUrl: [
          { required: true, message: "请输入应用商店地址", trigger: "blur" },
        ],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      listQuery: Object.assign({}, defaultListQuery),
      applicationForm: Object.assign({}, applicationForm),
      list: null,
      total: null,
      id: null,
      applicationType: null,
      listLoading: false,
      dialogVisible: false,
      form: {},
      freightDialogVisible: false,
      clientList: [],
      dateList: [],
      appTypeList: [],
      marketList: [],
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
    let allKeyValues = JSON.parse(sessionStorage.getItem("allKeyValues"));
    this.clientList = allKeyValues[0].childs;
    this.appTypeList = allKeyValues[2].childs;
    this.marketList = allKeyValues[3].childs;
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
    handleStatusChange(status, row) {
      row.verify = status === 1 ? 0 : 1;
      this.$confirm("是否要修改该状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.SetProductCateGoryVerifyFn(status, row.id, row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        });
    },
    SetProductCateGoryVerifyFn(status, ids, row) {
      let isSingle = true;
      if (Array.isArray(ids)) {
        isSingle = false;
        ids = ids.join();
      } else {
        ids = ids + "";
      }
      setAppMarketVerify({
        verify: status,
        commonIds: ids,
      }).then((response) => {
        if (response.retCode === 200) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          if (isSingle) {
            row.verify = status;
          }
        } else {
          let oldStatus = status === 1 ? 0 : 1;
          row.verify = oldStatus;
          this.$message({
            type: "error",
            message: "修改失败!",
          });
        }
      });
    },
    handleDetail(index, row) {
      this.$router.push({
        name: "memberDetail",
        query: { userId: row.userId },
      });
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      this.listQuery.pageIndex = 1;
      if (!this.listQuery.terminal) {
        delete this.listQuery.terminal;
      }
      if (!this.listQuery.appTypeId) {
        delete this.listQuery.appTypeId;
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
    addFreight(type, data) {
      this.applicationType = type;
      this.freightDialogVisible = true;
      this.applicationForm = Object.assign({}, data);
    },
    close() {
      this.attrValueForm = {};
      this.$refs.refApplicationForm.resetFields();
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该应用商店?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        setAppMarketDelete({ commonIds: row.id }).then((response) => {
          if (response.retCode === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          }
        });
      });
    },
    submitFreightForm() {
      this.$refs.refApplicationForm.validate((valid) => {
        if (valid) {
          let form = Object.assign({}, this.applicationForm);
          setAppMarketEdit(form).then((response) => {
            if (response.retCode === 200) {
              this.freightDialogVisible = false;
              this.form = {};
              this.$refs.refApplicationForm.resetFields();
              let message =
                this.applicationType == "edit" ? "编辑成功" : "新增成功";
              this.$message({
                message: message,
                type: "success",
                duration: 1000,
              });
              this.getList();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getList() {
      this.listLoading = true;
      getAppMarketList(this.listQuery).then((response) => {
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


