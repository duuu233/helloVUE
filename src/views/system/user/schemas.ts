import { FormSchema } from '@/components/Form/index';
import { FormItemRule } from 'naive-ui'
export const formSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'NInput',
    label: '用户姓名',
    // labelMessage: '这是一个提示',
    giProps: {
      span: 1,
    },
    componentProps: {
      placeholder: '请输入用户姓名',
      // onInput: (e: any) => {
      //   console.log(e);
      // },
    },
    rules: [{ required: true, message: '请输入用户姓名', trigger: ['blur'] }],
  },
  {
    field: 'mobile',
    component: 'NInputNumber',
    label: '手机',
    componentProps: {
      placeholder: '请输入手机号码',
      showButton: false,

      // onInput: (e: any) => {
      //   console.log(e);
      // },
    },
    rules: [{
      required: true, trigger: ['blur'],
      validator: (rule: FormItemRule, value: string) => {
        return new Promise<void>((resolve, reject) => {
          if (!/^1\d{10}$/.test(value)) {
            reject(Error('手机号码有误')) // reject with error message
          } else {
            resolve()
          }
        })
      }


    }],
  },

  {
    field: 'wwwwww',
    component: 'NCheckbox',
    label: '角色',
    giProps: {
      //span: 24,
    },
    componentProps: {
      placeholder: '请选择所属角色',
      options: [
        {
          label: '种牙',
          value: 1,
        },
        {
          label: '补牙',
          value: 2,
        },
        {
          label: '根管',
          value: 3,
        },
      ],

      // onUpdateChecked: (e: any) => {
      //   console.log(e);
      // },
    },
    rules: [{
      type: 'array',
      required: true,
      trigger: 'change',
      message: '请选择 checkboxGroupValue'

    }],
  },
  {
    field: 'namrere',
    component: 'NSwitch',
    label: '状态',
    // labelMessage: '这是一个提示',
    // giProps: {
    //   span: 1,
    // },
    componentProps: {
      placeholder: '请选择启用状态',
      // onInput: (e: any) => {
      //   console.log(e);
      // },
    },
    rules: [{
      required: true, message: '请选择启用状态', validator: (rule: FormItemRule, value: boolean) => {
        return new Promise<void>((resolve, reject) => {
          resolve()
        })
      }
    }],
  },
  {
    field: 'aaaaa',
    component: 'NUpload',
    label: '上传图片',

    componentProps: {
      placeholder: '请选择启用状态',
      // onInput: (e: any) => {
      //   console.log(e);
      // },
    },
    rules: [{
      required: true, message: '请传入图片', trigger: ['change'], }],

  }
];