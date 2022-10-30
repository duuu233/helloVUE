import type { PropType } from 'vue';
import { NUpload } from 'naive-ui';

export const basicProps = {
  ...NUpload.props,
  accept: {
    type: String,
    default: '.jpg,.png,.jpeg,.svg,.gif',
  },
  maxSize: {
    type: Number as PropType<number>,
    default: 2,
  },
  maxNumber: {
    type: Number as PropType<number>,
    default: Infinity,
  },
  value: {
    type: String as PropType<string>,
    default: '',
  }
 
};
