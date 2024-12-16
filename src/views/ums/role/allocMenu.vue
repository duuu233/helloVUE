<template>
  <el-card class="app-container" shadow="never">
    <div slot="header" class="clearfix">
      <span>绑定权限</span>
    </div>
    <el-tree
      :data="menuTreeList"
      show-checkbox
      :key="treeKey"
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :default-checked-keys="checkedIds"
      :props="defaultProps"
    >
      <span class="custom-tree-node show-hide" slot-scope="{ node }">
        <span>
          <!-- <i class="el-icon-s-home" v-if="data.childs.length"></i>
          <i class="el-icon-s-order" v-if="!data.childs.length"></i> -->
          <span> {{ node.data.appName }} ({{ node.data.appCode }}) </span>
        </span>
      </span>
    </el-tree>
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保 存</el-button>
      <el-button @click="goBack()">返回</el-button>
    </div>
  </el-card>
</template>

<script>
import {
  getAdminAppliByRole,
  setAdminAppliByRole,
  listMenuByRole,
  allocMenu
} from '@/api/role'
import { isArr, getUrlKey } from '@/utils/index'
export default {
  name: 'allocMenu',
  data() {
    return {
      menuTreeList: [],
      // 该数组是选中的节点(半选的节点和全选的节点全都存储在这个数组)
      multipleSelection: [],
      // 该数组回显数据根据所对应的ID  进行默认勾选
      checkedIds: [],
      defaultProps: {
        children: 'childs',
        label: 'appName'
      },
      roleId: null,
      isCreated: false,
      treeKey: -1
    }
  },
  activated() {
    if (!this.isCreated) {
      this.treeList()
    }
    this.isCreated = false
  },
  created() {
    this.isCreated = true
    this.treeList()
  },
  methods: {
    // 遍历找出所有子节点
    findAllCheckedChildren(data, arr) {
      data.forEach((item, index) => {
        if (item.childs.length !== 0) {
          this.findAllCheckedChildren(item.childs, arr)
        } else if (item.isChecked === 1) {
          arr.push(item.id)
        }
      })
    },
    treeList() {
      let id = getUrlKey('roleId', window.location.href)
      getAdminAppliByRole({ id }).then(response => {
        if (response.retCode === 200) {
          this.checkedIds = []
          this.menuTreeList = response.retData

          this.findAllCheckedChildren(this.menuTreeList, this.checkedIds)
          // this.treeKey= Math.floor(Math.random() * 10);
        }
      })
    },
    handleSave() {
      let id = getUrlKey('roleId', window.location.href)
      let submitIds = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys())
      let index = submitIds.indexOf(0)
      submitIds.splice(index, 1)
      if (!isArr(submitIds, this.checkedIds)) {
        this.$confirm('是否修改绑定权限？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            appIds: submitIds.join(),
            id
          }
          setAdminAppliByRole(params).then(response => {
            if (response.retCode === 200) {
              this.$message({
                message: '修改成功',
                type: 'success',
                duration: 1000
              })
            }
          })
        })
      } else {
        this.$message({
          message: '您还没做任何修改呢',
          type: 'warning',
          duration: 1000
        })
      }
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-tree {
  max-height: 70vh;
  overflow: auto;
}
.show-hide:hover :nth-child(2) {
  display: inline-block !important;
}
</style>
