<template>
  <div>
    <n-card :bordered="false" class="mt-4 proCard">
      <BasicForm @register="searchRegister" @submit="searchSubmit" @reset="searchReset" :showAdvancedButton="false">
        <template #statusSlot="{ model, field }">
          <n-input v-model:value="model[field]" />
        </template>
      </BasicForm>
      <BasicTable :columns="columns" :request="loadDataTable" :row-key="(row) => row.id" ref="actionRef"
        :actionColumn="actionColumn" @update:checked-row-keys="onCheckedRow">
        <template #toolbar>
          <n-button type="primary" @click="isEdit = false; showModal = true">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            添加用户
          </n-button>
        </template>
        <template #action>
          <TableAction />
        </template>
      </BasicTable>
    </n-card>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" :title="isEdit?'编辑用户':'新增用户'">
        <div class="BasicForm">
          <BasicForm @register="formRegister" @submit="formSubmit" @reset="formReset">
            <template #statusSlot="{ model, field }">
              <n-input v-model:value="model[field]" />
            </template>
          </BasicForm>
        </div>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, unref, h, onMounted } from 'vue';
import { useMessage } from 'naive-ui';
import { BasicTable, TableAction } from '@/components/Table';
import { getUserList } from '@/api/system/user';
import { columns } from './columns';
import { formSchemas } from './schemas';
import { PlusOutlined } from '@vicons/antd';
import { useRouter } from 'vue-router';
import { BasicForm, FormSchema, useForm } from '@/components/Form/index';

const router = useRouter();
const message = useMessage();
const actionRef = ref();
const showModal = ref(false);
const isEdit = ref(false);
const editRoleTitle = ref('');
const treeData = ref([]);
const expandedKeys = ref([]);
const checkedKeys = ref(['console', 'step-form']);

const params = reactive({
  pageSize: 5,
  name: 'xiaoMa',
});

const actionColumn = reactive({
  width: 250,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record) {
    return h(TableAction, {
      style: 'button',
      actions: [
        {
          label: '菜单权限',
          onClick: handleMenuAuth.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ['basic_list'],
        },
        {
          label: '编辑',
          onClick: handleEdit.bind(null, record),
          ifShow: () => {
            return true;
          },
          auth: ['basic_list'],
        },
        {
          label: '删除',
          icon: 'ic:outline-delete-outline',
          onClick: handleDelete.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ['basic_list'],
        },
      ],
    });
  },
});

const loadDataTable = async (res: any) => {
  let _params = {
    ...unref(params),
    ...res,
  };
  return await getUserList(_params);
};
const searchSchemas: FormSchema[] = [
  {
    field: 'name',
    // labelMessage: '这是一个提示',
    component: 'NInput',
    label: '用户名',
    componentProps: {
      placeholder: '请输入用户名',
      onInput: (e: any) => {
        console.log(e);
      },
    },
  },

  {
    field: 'type',
    component: 'NSelect',
    label: '启用状态',
    componentProps: {
      placeholder: '请选择启用状态',
      options: [
        {
          label: '舒适性',
          value: 1,
        },
        {
          label: '经济性',
          value: 2,
        },
      ],
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
];
const [searchRegister, { }] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:8 2xl:4' },
  labelWidth: 80,
  schemas: searchSchemas,
});
const [formRegister, { }] = useForm({
  gridProps: { cols: 1 },
  collapsedRows: 3,
  labelWidth: 120,
  layout: 'horizontal',
  submitButtonText: '提 交',
  schemas: formSchemas,
});
function searchSubmit(values: Recordable) {
  console.log(values);
  reloadTable();
}

function searchReset(values: Recordable) {
  console.log(values);
}
function formSubmit(values: Recordable) {
  console.log(values);
  // reloadTable();
}

function formReset(values: Recordable) {
  console.log(values);
}

function onCheckedRow(rowKeys: any[]) {
  console.log(rowKeys);
}

function reloadTable() {
  actionRef.value.reload();
}



function handleEdit(record: Recordable) {
  console.log('点击了编辑', record);
  router.push({ name: 'basic-info', params: { id: record.id } });
}

function handleDelete(record: Recordable) {
  console.log('点击了删除', record);
  message.info('点击了删除');
}

function handleMenuAuth(record: Recordable) {
  editRoleTitle.value = `分配 ${record.name} 的菜单权限`;
  checkedKeys.value = record.menu_keys;
  showModal.value = true;
}



</script>

<style lang="less" scoped>
  .BasicForm{
    padding: 20px 80px;
   width: 600px;
  }
</style>
