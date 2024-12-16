<template>
  <div class="app-container">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>系统设置</span>
      </div>
      <el-form
        :model="form"
        ref="refForm"
        :rules="rules"
        label-width="160px"
        size="small"
      >
        <template v-for="(item, index) in form.configList">
          <el-form-item
            v-if="[5, 6, 7, 8, 9, 10, 11, 14].indexOf(item.configType) !== -1"
            :key="index"
            :label="item.configKey"
            :prop="'configList.' + index + '.configValue'"
            class="basic-classify-item"
            :rules="rules.configList"
          >
            <el-input-number
              :min="[1].indexOf(item.configType) !== -1 ? 0 : 1"
              v-show="[6, 7, 8, 9, 10, 11, 14].indexOf(item.configType) !== -1"
              :max="item.configType === 11 ? 99999999999 : 10000"
              :precision="0"
              :controls="false"
              v-model="item.configValue"
              type="number"
              class="input-width"
              :placeholder="'请输入' + item.configKey"
            >
            </el-input-number>
            <!-- <el-input
              v-show="[11].indexOf(item.configType) !== -1"
              placeholder="请输入骑手短信接收人"
              v-model="item.configValue"
              style="width: 311px"
              maxlength="11"
              show-word-limit
            ></el-input> -->

            <i
              style="padding-left: 6px; font-size: 12px"
              v-show="[1].indexOf(item.configType) !== -1"
              >分钟</i
            >
            <i
              style="padding-left: 6px; font-size: 12px"
              v-show="[2].indexOf(item.configType) !== -1"
              >天</i
            >
            <i
              style="padding-left: 6px; font-size: 12px"
              v-show="[4].indexOf(item.configType) !== -1"
              >个</i
            >
            <i
              style="padding-left: 6px; font-size: 12px"
              v-show="[6].indexOf(item.configType) !== -1"
              >单</i
            >
            <i
              style="padding-left: 6px; font-size: 12px"
              v-show="[7].indexOf(item.configType) !== -1"
              >分钟，提醒调度员人工调度</i
            >
            <i
              style="padding-left: 6px; font-size: 12px"
              v-show="[8].indexOf(item.configType) !== -1"
              >米(半径)</i
            >
            <i
              style="padding-left: 6px; font-size: 12px"
              v-show="[9].indexOf(item.configType) !== -1"
              >米范围内可点击“确认取货”</i
            >
            <i
              style="padding-left: 6px; font-size: 12px"
              v-show="[10].indexOf(item.configType) !== -1"
              >米范围内可点击“确认送达”</i
            >
            <el-cascader
              v-show="[3].indexOf(item.configType) !== -1"
              v-model="item.configValue"
              :options="AreaList"
              :placeholder="'请输入' + item.configKey"
              class="input-width"
              :props="{
                children: 'childs',
                label: 'areaName',
                value: 'areaId',
                checkStrictly: false,
                emitPath: false
              }"
              disabled
              clearable
              filterable
            ></el-cascader>
            <el-time-picker
              v-show="[5].indexOf(item.configType) !== -1"
              is-range
              v-model="timeList"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="HH:mm"
              format="HH:mm"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-form-item>
        </template>
      </el-form>
      <div class="btn-box">
        <el-button
          type="primary"
          @click="handleDialogConfirm()"
          size="small"
          v-permission="['Post_Common_SetConfigDataEdit']"
          >保 存</el-button
        >
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  getConfigDataList,
  getAreaDataList,
  setConfigDataEdit
} from '@/api/config'
import { valiNumber } from '@/utils/validate'

export default {
  name: 'config',
  data() {
    const RegExp_Phone = /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/
    const _configList = (rule, value, callback) => {
      setTimeout(() => {
        let index = rule.field.split('.')[1] //index 就是页面的从上到下的顺序
        let str = ''
        if (index === '0') {
          str = '骑手配送时间'
        }
        if (index === '1') {
          str = '骑手单程配送最大接单量'
        }
        if (index === '2') {
          str = '骑手调度提醒'
        }
        if (index === '3') {
          str = '骑手上班打卡范围'
        }
        if (index === '4') {
          str = '骑手可取货范围'
        }
        if (index === '5') {
          str = '骑手可送达范围'
        }
        if (index === '7') {
          str = '骑手最大转单次数'
        }

        if (['0'].indexOf(index) !== -1) {
          if (!this.timeList || !this.timeList.length) {
            callback(new Error(`请选择${str}`))
          } else {
            callback()
          }
        }
        if (['6'].indexOf(index) !== -1) {
          if (!value) {
            return callback(new Error('联系电话不能为空'))
          } else if (!RegExp_Phone.test(value)) {
            callback(new Error('请输入正确手机号码'))
          } else {
            callback()
          }
        }

        if (['1', '2', '3', '4', '5', '7'].indexOf(index) !== -1) {
          if (!value && value !== 0) {
            callback(new Error(`请输入${str}`))
          } else if (!valiNumber(value)) {
            callback(new Error('请输入数字值'))
          } else if (value * 1 > 2147483647) {
            callback(new Error('最大值为2147483647'))
          } else {
            callback()
          }
        }
      }, 200)
    }
    return {
      form: {
        configList: []
      },
      loading: true,
      rules: {
        configList: [
          { required: true, validator: _configList, trigger: 'blur' }
        ]
      },
      timeList: [],
      AreaList: [],
      workList: [],
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
    // this.getAreaDataList();
    this.getData()
  },
  filters: {},
  methods: {
    handleDialogConfirm() {
      this.$refs.refForm.validate((valid, error) => {
        if (valid) {
          let configList = [...this.form.configList]
          configList.forEach((v, i) => {
            if (v.configType === 5) {
              v.configValue = this.timeList.join('-')
            }
          })

          let form = {
            listConfigTypeValue: configList
          }
          setConfigDataEdit(form).then(res => {
            if (res.retCode === 200) {
              this.$message({
                message: '保存成功！',
                type: 'success',
                duration: 1000
              })
            }
            this.getData()
          })
        }
      })
    },
    getAreaDataList() {
      getAreaDataList().then(response => {
        if (response.retCode === 200) {
          this.AreaList = response.retData
          this.AreaList.forEach((v, i) => {
            if (v.childs.length) {
              v.childs.forEach((value, index) => {
                if (value.childs.length) {
                  value.childs.forEach((j, k) => {
                    delete j.childs
                  })
                }
              })
            }
          })
        }
      })
    },
    getData() {
      getConfigDataList().then(response => {
        if (response.retCode === 200) {
          this.form.configList = response.retData
          if (this.form.configList.length) {
            this.form.configList.forEach((v, i) => {
              if (v.configType === 3) {
                v.configValue = v.configValue * 1
              }
              if (v.configType === 5) {
                const timeList = v.configValue.split('-')
                if (timeList.length !== 2) {
                  this.timeList = ['08:00', '18:00']
                } else {
                  this.timeList = timeList
                }
              }
              if (v.configType === 8) {
                this.workList = v.configValue.split('-')
              }
            })
          }
          this.loading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-box {
  text-align: center;
}
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
.el-card {
  //   min-height: 80vh;
}
</style>
