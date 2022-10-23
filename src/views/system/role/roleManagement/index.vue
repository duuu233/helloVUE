<template>
  <div>
    <ddd :origin-data="originData" ref="tableRef" showCheckbox></ddd>
    <n-button type="info" @click="d">
      获取选中ID
    </n-button>
  </div>


</template>
  
<script lang="ts" setup>
// import { getdList } from '@/api/system/menu';
import { ref, reactive } from 'vue';
import ddd from './components/TableTree/index.vue'
const tableRef = ref()
let originData = reactive<any>([])
originData = [
  {
    id: 'body1',
    nodeLevel: 1,
    nodeName: '节点1',
    step: 1,
    parentId: null,
    isChecked: false,
    editable: false,
    chidrenList: [
      {
        id: 'body1-1',
        nodeLevel: 2,
        nodeName: '节点1-1',
        step: 1,
        parentId: 'body1',
        isChecked: false,
        editable: false,
        chidrenList: [
          {
            id: 'body1-1-1',
            nodeLevel: 3,
            nodeName: '节点1-1-1',
            step: 1,
            parentId: 'body1-1',
            isChecked: false,
            editable: false,
            chidrenList: [
              {
                id: 'body1-1-1-1',
                nodeLevel: 4,
                nodeName: '节点1-1-1-1',
                step: 1,
                parentId: 'body1-1-1',
                isChecked: false,
                editable: false,
                chidrenList: [
                  {
                    id: 'body1-1-1-1-1',
                    nodeLevel: 5,
                    nodeName: '节点1-1-1-1-1',
                    step: 1,
                    parentId: 'body1-1-1-1',
                    isChecked: false,
                    editable: false,
                    chidrenList: [
                      {
                        id: 'body1-1-1-1-1-1',
                        nodeLevel: 6,
                        nodeName: '节点1-1-1-1-1-1',
                        step: 1,
                        parentId: 'body1-1-1-1-1',
                        isChecked: false,
                        editable: false,
                        chidrenList: [

                        ]
                      },
                      {
                        id: 'body1-1-1-1-1-2',
                        nodeLevel: 6,
                        nodeName: '节点1-1-1-1-1-2',
                        step: 1,
                        parentId: 'body1-1-1-1-1',
                        isChecked: false,
                        editable: false,
                        chidrenList: [

                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id: 'body1-1-1-2',
                nodeLevel: 4,
                nodeName: '节点1-1-1-2',
                step: 1,
                parentId: 'body1-1-1',
                isChecked: false,
                editable: false,
                chidrenList: []
              },
              {
                id: 'body1-1-1-3',
                nodeLevel: 4,
                nodeName: '节点1-1-1-3',
                step: 1,
                parentId: 'body1-1-1',
                isChecked: false,
                editable: false,
                chidrenList: [
                  {
                    id: 'body1-1-1-3-1',
                    nodeLevel: 5,
                    nodeName: '节点1-1-1-3-1',
                    step: 1,
                    parentId: 'body1-1-1-3',
                    isChecked: false,
                    editable: false,
                    chidrenList: []
                  },
                  {
                    id: 'body1-1-1-3-2',
                    nodeLevel: 5,
                    nodeName: '节点1-1-1-3-2',
                    step: 2,
                    parentId: 'body1-1-1-3',
                    isChecked: false,
                    editable: false,
                    chidrenList: []
                  }
                ]
              }
            ]
          },
          {
            id: 'body1-1-2',
            nodeLevel: 3,
            nodeName: '节点1-1-2',
            step: 1,
            parentId: 'body1-1',
            isChecked: false,
            editable: false,
            chidrenList: [
              {
                id: 'body1-1-2-1',
                nodeLevel: 4,
                nodeName: '节点1-1-2-1',
                step: 1,
                parentId: 'body1-1-2',
                isChecked: false,
                editable: false,
                chidrenList: [
                  {
                    id: 'body1-1-2-1-1',
                    nodeLevel: 5,
                    nodeName: '节点1-1-2-1-1',
                    step: 1,
                    parentId: 'body1-1-2-1',
                    isChecked: false,
                    editable: false,
                    chidrenList: [
                      {
                        id: 'body1-1-2-1-1-1',
                        nodeLevel: 6,
                        nodeName: '节点1-1-2-1-1-1',
                        step: 1,
                        parentId: 'body1-1-2-1-1',
                        isChecked: false,
                        editable: false,
                        chidrenList: [

                        ]
                      },
                      {
                        id: 'body1-1-2-1-1-2',
                        nodeLevel: 6,
                        nodeName: '节点1-1-2-1-1-2',
                        step: 1,
                        parentId: 'body1-1-2-1-1',
                        isChecked: false,
                        editable: false,
                        chidrenList: [

                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'body2',
    nodeLevel: 1,
    nodeName: '节点2',
    step: 1,
    parentId: null,
    isChecked: false,
    editable: false,
    chidrenList: [
      {
        id: 'body2-1',
        nodeLevel: 2,
        nodeName: '节点2-1',
        step: 1,
        parentId: 'body2',
        isChecked: false,
        editable: false,
        chidrenList: [
          {
            id: 'body2-1-1',
            nodeLevel: 3,
            nodeName: '节点2-1-1',
            step: 1,
            parentId: 'body2-1',
            isChecked: false,
            editable: false,
            chidrenList: [

            ]
          },
          {
            id: 'body2-1-2',
            nodeLevel: 3,
            nodeName: '节点2-1-2',
            step: 1,
            parentId: 'body2-1',
            isChecked: false,
            editable: false,
            chidrenList: [
              {
                id: 'body2-1-2-1',
                nodeLevel: 4,
                nodeName: '节点2-1-2-1',
                step: 1,
                parentId: 'body2-1-2',
                isChecked: false,
                editable: false,
                chidrenList: [
                  {
                    id: 'body2-1-2-1-1',
                    nodeLevel: 5,
                    nodeName: '节点2-1-2-1-1',
                    step: 1,
                    parentId: 'body2-1-2-1',
                    isChecked: false,
                    editable: false,
                    chidrenList: [
                      {
                        id: 'body2-1-2-1-1-1',
                        nodeLevel: 6,
                        nodeName: '节点2-1-2-1-1-1',
                        step: 1,
                        parentId: 'body2-1-2-1-1',
                        isChecked: false,
                        editable: false,
                        chidrenList: [

                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'body3',
    nodeLevel: 1,
    nodeName: '节点3',
    step: 1,
    parentId: null,
    isChecked: false,
    editable: false,
    chidrenList: []
  },
  {
    id: 'body4',
    nodeLevel: 1,
    nodeName: '节点4',
    step: 1,
    parentId: null,
    isChecked: false,
    editable: false,
    chidrenList: [
      {
        id: 'body4-1',
        nodeLevel: 2,
        nodeName: '节点4-1',
        step: 1,
        parentId: 'body4',
        isChecked: false,
        editable: false,
        chidrenList: []
      }
    ]
  }
]
const d = (): void => {
  console.log(tableRef.value.getCheckedNodeList())

}
</script>
  
<style lang="less" scoped>

</style>
  