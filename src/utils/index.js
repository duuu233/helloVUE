export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}
//判断2个数组里面的值是否相等
export function isArr(arr1, arr2) {
  return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort())
}

export function getUrlKey(name, url) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null

}


//通过ID查找当前项及其所有父级项（除去顶级项）
export function getCheckedClassifyParentId(data, id, arr, originalData) {
  data.forEach((item, index) => {
    if (item.value === id) {
      arr.push({
        parentId: item.parentId,
        id: item.value,
        text: item.text,
      });
      if (item.parentId !== 0) {
        let _id = item.parentId;
        let _data = originalData;
        getCheckedClassifyParentId(_data, _id, arr, _data);
      }
    } else if (item.childs && item.childs.length) {
      getCheckedClassifyParentId(item.childs, id, arr, originalData);
    }
  });
}
//父子级分类名称 拼接
export function getClassifyName(arr, _this) {
  let str = "";
  arr.forEach((v, i) => {
    if (str) {
      str = v.text + "→" + str;
    } else {
      str = v.text;
    }
  });
  _this.classifyName = str;
}
//判断为第3级分类时  禁用 （主要用于后台分类的编辑）
export function disabledThreeChilds(data) {
  // data.forEach((item, index) => {
  //   if (item.layerId === 3) {
  //     item.disabled = true;
  //   } else if (item.childs.length) {
  //     disabledThreeChilds(item.childs);
  //   }
  // });
  // 没有标识 先这样写吧= =
  if (data.length) {
    data.forEach((v, i) => {
      if (v.childs.length) {
        v.childs.forEach((value, index) => {
          if (value.childs.length) {
            value.childs.forEach((j, k) => {
              if (j.childs.length) {
                j.childs.forEach((item, key) => {
                  item.disabled = true;
                })
              }
            })
          }

        })
      }
    })
  }
}

//判断除第3级分类  所有上级分类禁用 （主要用于后台分类的编辑）
export function disabledSuperiorClassify(data) {
  if (data.length) {
    data.forEach((v, i) => {
      if (v.childs.length) {
        v.childs.forEach((value, index) => {
          value.disabled = true;
          if (value.childs.length) {
            value.childs.forEach((j, k) => {
              j.disabled = true;
              if (j.childs.length) {
                j.childs.forEach((item, key) => {
                  // item.disabled = true;
                })
              }
            })
          }

        })
      }

    })
  }
}
//判断为后台第3级分类时 删除空字段childs
export function delBasicClassifyThreeChilds(data) {
  if (data.length) {
    data.forEach((v, i) => {
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
}
// 获取省-市 删除区
export function getCity(data) {
  if (data.length) {
    data.forEach((v, i) => {
      if (v.childs.length) {
        v.childs.forEach((value, index) => {
          delete value.childs
        })
      }
    })
  }
}
// 执行组合排列的函数
export function doExchange(arr) {
  var len = arr.length;
  // 当数组大于等于2个的时候
  if (len >= 2) {
    // 第一个数组的长度
    var len1 = arr[0].length;
    // 第二个数组的长度
    var len2 = arr[1].length;
    // 2个数组产生的组合数
    var lenBoth = len1 * len2;
    //  申明一个新数组,做数据暂存
    var items = new Array(lenBoth);
    // 申明新数组的索引
    var index = 0;
    // 2层嵌套循环,将组合放到新数组中
    for (var i = 0; i < len1; i++) {
      for (var j = 0; j < len2; j++) {
        items[index] = arr[0][i] + "|" + arr[1][j];
        index++;
      }
    }
    // 将新组合的数组并到原数组中
    var newArr = new Array(len - 1);
    for (var i = 2; i < arr.length; i++) {
      newArr[i - 1] = arr[i];
    }
    newArr[0] = items;
    // 执行回调
    return this.doExchange(newArr);
  } else {
    return arr[0];
  }
}


