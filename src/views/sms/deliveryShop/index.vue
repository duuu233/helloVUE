<template>
  <div class="app-container">
    <div class="map-box">
      <div class="list">
        <div class="list-box">
          <h4>区域列表</h4>
          <div
            class="item"
            v-for="(item, index) in leftTextList"
            :key="index"
            @click.stop="clickList(index)"
          >
            <div class="text">{{ item.dname }}</div>
            <div class="handle">
              <i @click.stop="edit(item)">编辑</i>
              <i @click.stop="look(index)">查看</i>
              <!-- <i
                v-permission="['post_deliveryShop_setDelDeliveryShop']"
                @click.stop="del(item)"
                >删除</i
              > -->
            </div>
          </div>
        </div>
      </div>
      <div id="container">
        <div class="search-box">
          <div class="ipt-box">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
            <input
              id="tipinput"
              placeholder="搜索位置、公交站、地铁站"
              autocomplete="off"
            />
            <i class="el-icon-circle-close icon" @click="resetSearch"></i>
          </div>

          <div class="search-list" v-show="searchResultList.length">
            <h4>搜索结果列表</h4>
            <div
              class="item"
              v-for="(item, index) in searchResultList"
              :key="index"
            >
              <div class="left-box" @click.stop="clickSearch(index)">
                <div class="title">
                  <i>{{ item.index + 1 }}.</i>
                  <i>{{ item.name }}</i>
                </div>
                <div class="text" style="color: #999">
                  地址：{{ item.address }}
                </div>
                <div class="text" style="color: #999">
                  坐标：{{ item.location.lat }},{{ item.location.lng }}
                </div>
                <!-- <el-button
                  type="primary"
                  style="margin: 6px 6px 6px 0; padding: 6px"
                  size="mini"
                  @click.stop="addRadiusCircle(index)"
                  >设置区域</el-button
                > -->
              </div>
              <div class="right-box" v-if="item.photos">
                <el-image
                  style="width: 100px; height: 74px"
                  :src="item.photos[0].url"
                  :preview-src-list="[item.photos[0].url]"
                  fit="contain"
                >
                </el-image>
              </div>
            </div>
          </div>
        </div>
        <div class="info-box">
          <div class="input-item">
            <div class="input-item-prepend">
              <span class="input-item-text">鼠标点击经纬度</span>
            </div>
            <!-- <el-input v-model="LatitudeAndLongitude" class="input-width"></el-input> -->
            <input id="lnglat" type="text" value="" disabled />
          </div>
          <div class="input-item">
            <div class="input-item-prepend">
              <span class="input-item-text">鼠标点击地址</span>
            </div>
            <input id="address" type="text" disabled />
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :title="isEdit ? '编辑区域' : isLook ? '区域信息' : '添加区域'"
      :visible.sync="dialogVisible"
      @close="close"
      width="800px"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="refForm"
        @submit.native.prevent
        :rules="rules"
        size="small"
        label-width="120px"
      >
        <el-form-item label="取货中心名称" prop="dname">
          <el-input
            v-model="form.dname"
            style="width: 350px"
            :disabled="isLook || isEdit"
            maxlength="30"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="区域详细地址" prop="address">
          <el-input
            v-model="form.address"
            :disabled="isLook || isEdit"
            style="width: 350px"
            maxlength="30"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="区域坐标" prop="address">
          <el-input
            :value="form.longitude + ',' + form.latitude"
            :disabled="isLook || isEdit"
            style="width: 350px"
          ></el-input>
        </el-form-item>
        <!--       v-if="isNeedRadius || isLook" -->
        <el-form-item label="区域覆盖半径" prop="radius">
          <el-input-number
            :min="0"
            :max="99999"
            :disabled="isLook"
            :precision="0"
            :controls="false"
            v-model="form.radius"
            type="number"
            class="input-width"
            placeholder="请输入区域覆盖半径"
          >
          </el-input-number>
          <i style="padding-left: 6px; font-size: 12px">米</i>
        </el-form-item>
        <el-form-item label="取货中心联系人" prop="contact">
          <el-input
            v-model="form.contact"
            :disabled="isLook || isEdit"
            class="input-width"
            maxlength="5"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="取货中心联系电话" prop="contactPhone">
          <el-input
            v-model="form.contactPhone"
            class="input-width"
            :disabled="isLook || isEdit"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel" size="small">取 消</el-button>
        <el-button
          type="primary"
          @click="handleDialogConfirm"
          v-permission="['post_deliveryShop_setDeliveryShop']"
          :loading="loading"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDeliveryShopList,
  setDeliveryShop,
  setDelDeliveryShop,
  getErpDeliveryShopList,
  setErpDeliveryShopList
} from '@/api/deliveryShop'
import AMapLoader from '@amap/amap-jsapi-loader'
import { getCookie } from '@/utils/support'
const defaultListQuery = {
  pageIndex: 1,
  pageSize: 9999
}
export default {
  data() {
    return {
      loading: false,
      map: null,
      isCircle: 0,
      listQuery: Object.assign({}, defaultListQuery),
      LatitudeAndLongitude: '', //经纬度，用,拼接的
      textList: [],
      leftTextList: [],
      circleObjList: [],
      dialogVisible: false,
      isEdit: false,
      form: {},
      circleInfo: {},
      rules: {
        radius: [
          { required: true, message: '请输入区域覆盖半径', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入区域详细地址', trigger: 'blur' }
        ],
        contact: [
          {
            required: true,
            message: '请输入配送区域联系人',
            trigger: 'blur'
          }
        ],
        contactPhone: [
          {
            required: true,
            message: '请输入配送区域联系电话',
            trigger: 'blur'
          }
        ]
      },

      marker: null,
      geocoder: null,
      contextMenu: null,
      circleMenu: null,
      markerMenu: null,
      menu: null,
      AMap: null,
      editLnglatList: [], //编辑时圆心的坐标
      circleObj: {}, //新增或者编辑完成时生成的圆对象
      circleObjEditor: {}, //编辑时的圆对象
      rightClickCircleObj: {}, //右键圆对象
      isEdit: false, //是新增还是编辑圆
      editIndex: 0, //点击编辑时的索引
      isValid: true, //判断一次完整的流程是否走完
      placeSearch: {},
      infoWindow: {},
      currentMarkerLnglat: null, //当前点击的marker 坐标，用于生成圆
      currentAddress: '', //当前地址，用于新增圆时，是否给个默认地址
      needDefaultAddress: false,
      autoComplete: null,
      searchResultList: [], //搜索结果列表
      isCreated: false,
      isNeedRadius: false, // 是否需要填写半径
      isLook: false, //是否为查看
      cityName: '' //区域名称，用于地图渲染
    }
  },
  activated() {
    this.cityName = getCookie('cityName')
    if (!this.isCreated) {
      this.getList()
    }
    this.isCreated = false
  },

  mounted() {
    this.cityName = getCookie('cityName')
    setTimeout(() => {
      window.zoomMenu = this.zoomMenu
      window.addCircle = this.addCircle
      window.cancelCircle = this.cancelCircle
      window.finishCircle = this.finishCircle
      window.editorCircle = this.editorCircle
      this.AMapLoader()

      window.needDefaultAddress = 'needDefaultAddress'
    }, 500)
  },
  methods: {
    AMapLoader() {
      //

      AMapLoader.load({
        key: '32602678c4b32a84d40b1e5b78059f21', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          'AMap.MouseTool',
          'AMap.ToolBar',
          'AMap.ControlBar',
          'AMap.DistrictSearch',
          'AMap.Text',
          'AMap.PlaceSearch',
          'AMap.InfoWindow',
          'AMap.Pixel',
          'AMap.Geocoder',
          'AMap.Marker',
          'AMap.ContextMenu',
          'AMap.CircleEditor',
          'AMap.Size',
          'AMap.Icon'
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: '1.1', // AMapUI 缺省 1.1
          plugins: [] // 需要加载的 AMapUI ui插件
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: '2.0' // Loca 版本，缺省 1.3.2
        }
      })
        .then(AMap => {
          var opts = {
            subdistrict: 0,
            extensions: 'all',
            level: 'district'
          }
          //利用行政区查询获取边界构建mask路径
          //也可以直接通过经纬度构建mask路径
          var district = new AMap.DistrictSearch(opts)
          let _this = this
          this.AMap = AMap
          district.search(this.cityName, function(status, result) {
            var bounds = result.districtList[0].boundaries
            var mask = []
            for (var i = 0; i < bounds.length; i += 1) {
              mask.push([bounds[i]])
            }
            _this.map = new AMap.Map('container', {
              rotateEnable: true, //是否可旋转
              pitchEnable: true, //螺旋角
              zoom: 13, //缩放的层级
              pitch: 0, //默认与地平线的夹角
              rotation: -15,
              viewMode: '3D', //开启3D视图,默认为关闭
              zooms: [2, 20], //地图显示的缩放级别，若center与level未赋值，地图初始化默认显示用户所在城市范围3D地图下，zoom值，可以设置为浮点数。（在V1.3.0版本level参数调整为zoom，3D地图修改自V1.4.0开始生效）
              mask: mask,
              showLabel: true,
              labelzIndex: 130,
              features: ['bg', 'road', 'building', 'point']
            })
            _this.map.setCity(_this.cityName)
            //添加描边
            for (var i = 0; i < bounds.length; i += 1) {
              new AMap.Polyline({
                path: bounds[i],
                strokeColor: '#99ffff',
                strokeWeight: 4,
                map: _this.map
              })
            }
            //添加工具
            _this.showTool(_this.map)
            //绘制圆相关
            // 点击获取地图信息相关---------------------------------------------------s
            _this.geocoder = new AMap.Geocoder({
              radius: 1000 //范围，默认：500
            })
            _this.marker = new AMap.Marker()
            console.log(_this.map)
            _this.map.on('click', function(e) {
              document.getElementById('lnglat').value = e.lnglat
              _this.currentMarkerLnglat = e.lnglat
              if (_this.infoWindow.close) {
                _this.infoWindow.close()
              }

              _this.regeoCode()
            })
            // 点击获取地图信息相关---------------------------------------------------e
            //创建右键菜单
            _this.contextMenuFn(AMap)
            // 输入搜索提示
            AMap.plugin('AMap.AutoComplete', () => {
              var autoOptions = {
                city: _this.cityName,
                // city: "深圳市",
                citylimit: true, //是否强制限制在设置的城市内搜索,true：强制限制设定城市，false：不强制限制设定城市
                input: 'tipinput'
              }
              // 实例化AutoComplete
              _this.autoComplete = new AMap.AutoComplete(autoOptions)
            })

            _this.placeSearch = new AMap.PlaceSearch({
              map: _this.map,
              city: _this.cityName,
              // city: "深圳市",
              pageSize: 10,
              citylimit: true
            }) //构造地点查询类
            console.log(AMap.Event)
            setTimeout(() => {
              AMap.Event.addListener(_this.autoComplete, 'select', _this.select) //注册监听，当选中某条记录时会触发
            }, 500)

            // ----------------------初始化完毕-----------开始处理业务------------------
            _this.isCreated = true
            _this.getList()
          })
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleDialogConfirm() {
      if (this.isLook) {
        this.dialogVisible = false
        this.isValid = true
        return
      }

      this.$refs.refForm.validate(valid => {
        if (valid) {
          this.loading = true
          const form = {
            radius: this.form.radius,
            id: this.form.id
          }
          setErpDeliveryShopList(form)
            .then(response => {
              if (response.retCode === 200) {
                this.dialogVisible = false
                this.form = {}
                this.$message({
                  message: '编辑成功！',
                  type: 'success',
                  duration: 1000
                })

                this.getList()
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    edit(data) {
      this.isEdit = true
      this.isLook = false
      this.form = Object.assign({}, data)
      this.dialogVisible = true
    },
    look(index) {
      this.isLook = true
      this.form = Object.assign({}, this.leftTextList[index])
      this.dialogVisible = true
    },
    addRadiusCircle(index) {
      this.isNeedRadius = true
      this.isLook = false
      this.isEdit = false
      this.$set(this.form, 'address', this.searchResultList[index].address)
      this.form.longitude = this.searchResultList[index].location.lng
      this.form.latitude = this.searchResultList[index].location.lat
      this.dialogVisible = true
    },
    clickSearch(index) {
      let positon = this.searchResultList[index].location
      let markerList = []
      let list = this.map.getAllOverlays()

      if (list.length) {
        list.forEach((v, i) => {
          if (v.type === 'AMap.Marker') {
            markerList.push(v)
          }
        })
      }
      if (markerList.length) {
        markerList.forEach((v, i) => {
          if (
            v._opts.position.lat === positon.lat &&
            v._opts.position.lng === positon.lng
          ) {
            this.map.setFitView([v])
          }
        })
      }
    },
    resetSearch() {
      document.getElementById('tipinput').value = ''
      this.searchResultList = []
      let list = this.map.getAllOverlays()
      if (list.length) {
        list.forEach((v, i) => {
          if (v.type === 'AMap.Marker') {
            this.map.remove(v)
          }
        })
      }
      this.isNeedRadius = false
    },
    mouseoverMarker(v) {
      let str = v.target.dom.children[0].classList.value //通过类名获取当前点击的索引

      let index = str.split('marker-')[1]
      v.target.dom.classList.add('hover')
      this.infoWindow = new this.AMap.InfoWindow({
        offset: [0, -40]
      })
      let contentSrt = `${this.searchResultList[index].name}(${this.searchResultList[index].address})`
      this.infoWindow.setContent(contentSrt)
      this.infoWindow.open(this.map, v.target.getPosition())
    },
    mouseoutMarker(v) {
      this.infoWindow.close()
      v.target.dom.classList.remove('hover')
    },
    select(e) {
      this.placeSearch.setCity(e.poi.adcode, (status, result) => {
        console.log(result)
      })
      // 先清空默认生成的marker :默认的只有左点击事件，样式也不统一，所以需要自定义marker
      this.placeSearch.search(e.poi.name, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          let list = this.map.getAllOverlays()
          if (list.length) {
            list.forEach((v, i) => {
              if (v.type === 'AMap.Marker') {
                this.map.remove(v)
              }
            })
          }

          let markerList = result.poiList.pois
          this.searchResultList = [...result.poiList.pois]
          console.log(this.searchResultList)
          for (var i = 0; i < markerList.length; i++) {
            var markerContent = `<div class="custom-content-marker marker-${i}"></div>`

            var marker = new this.AMap.Marker({
              position: markerList[i].location,
              map: this.map,
              zIndex: 40 + i,
              content: markerContent,
              offset: [-12, -40]
            })
            marker.on('mouseover', this.mouseoverMarker)
            marker.on('mouseout', this.mouseoutMarker)
            // 添加右键事件

            // marker.on("rightclick", this.searchRightClickFn);
            // marker.emit("click", { target: marker });
          }
        } else {
          console.log('info')
        }
      }) //关键字查询查询
    },
    close() {
      this.form = {}
      this.isValid = true
      this.dialogVisible = false
      this.getList()
    },
    handleCancel() {
      this.isValid = true
      this.dialogVisible = false
      this.getList()
    },
    del(row) {
      this.$confirm('是否要删除该区域吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // let textList = [...this.textList];
        // this.map.remove(textList[index]);
        // this.textList.splice(index, 1);
        // let circleObjList = [...this.circleObjList];
        // this.map.remove(circleObjList[index]);
        // this.circleObjList.splice(index, 1);
        // this.leftTextList.splice(index, 1);
        setDelDeliveryShop({ id: row.id }).then(response => {
          if (response.retCode === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          }
        })
      })
    },
    clickList(index) {
      this.map.setFitView([this.circleObjList[index]])
    },
    addCircle(isDefault) {
      if (!this.isValid) {
        this.$message({
          message: '请选完成上一步的编辑',
          type: 'warning',
          duration: 2000
        })
        this.contextMenu.close()
        this.map.setFitView([this.rightClickCircleObj])
        return
      }
      if (isDefault === 'needDefaultAddress') {
        this.needDefaultAddress = true
      } else {
        this.needDefaultAddress = false
      }
      this.isEdit = false
      this.isValid = false
      this.isLook = false
      let _this = this
      let AMap = this.AMap
      var circle = new AMap.Circle({
        center: [this.editLnglatList[0], this.editLnglatList[1]],
        radius: 41111, //半径
        borderWeight: 3,
        strokeColor: '#FF33FF',
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,

        strokeStyle: 'dashed',
        strokeDasharray: [10, 10],
        // 线样式还支持 'dashed'
        fillColor: '#1791fc',
        zIndex: 50
      })
      this.map.add(circle)
      this.map.setFitView([circle])
      this.rightClickCircleObj = circle
      var circleEditor = new AMap.CircleEditor(this.map, circle)
      circleEditor.open()
      circleEditor.on('move', function(event) {
        console.log('move')
      })

      circleEditor.on('adjust', function(event) {
        console.log('adjust')
      })

      circleEditor.on('end', function(event) {
        console.log('end')
        _this.circleObj = event.target

        _this.circleObjEditor = {}
        // event.target 即为编辑后的圆形对象
      })
      this.circleObjEditor = circleEditor

      let isEditorStatus = true //标识 当前右键的圆是已经在编辑的还是没有编辑的
      //覆盖物--圆--绑定鼠标右击事件——弹出右键菜单
      circle.on('rightclick', e => {
        if (
          _this.circleObjEditor.list &&
          e.target._amap_id === _this.circleObjEditor.list.circle._amap_id
        ) {
          isEditorStatus = true
        } else {
          if (this.isValid) {
            _this.rightClickCircleObj = e.target
          }
          isEditorStatus = false
        }
        this.circleMenuFn(this.AMap, isEditorStatus)
        this.editLnglatList[0] = e.lnglat.lng
        this.editLnglatList[1] = e.lnglat.lat
        this.circleMenu.open(this.map, e.lnglat)
      })
      this.circleMenuFn(this.AMap, isEditorStatus)
      circle.on('click', e => {
        this.circleMenu.close()
      })
    },

    editorCircle() {
      if (!this.isValid) {
        this.$message({
          message: '请选完成上一步的编辑',
          type: 'warning',
          duration: 2000
        })
        this.contextMenu.close()
        this.map.setFitView([this.rightClickCircleObj])
        return
      }
      this.isValid = false
      this.isEdit = true
      this.isLook = false
      let index = 0 //获取需要编辑的索引
      let _this = this
      for (var i = 0; i < this.circleObjList.length; i++) {
        if (
          this.circleObjList[i]._opts.center[0] ===
            this.rightClickCircleObj._opts.center[0] &&
          this.circleObjList[i]._opts.center[1] ===
            this.rightClickCircleObj._opts.center[1]
        ) {
          index = i
          break
        }
      }
      this.editIndex = index

      this.map.remove(this.textList[index])
      // this.textList.splice(index, 1);
      var circleEditor = new AMap.CircleEditor(
        this.map,
        this.circleObjList[index]
      )
      circleEditor.open()
      circleEditor.on('move', function(event) {
        _this.circleObj = event.target
        console.log('move')
      })

      circleEditor.on('adjust', function(event) {
        _this.circleObj = event.target
        console.log('adjust')
      })

      circleEditor.on('end', function(event) {
        console.log('end')
        _this.circleObj = event.target
        _this.circleObjEditor = {}
        // event.target 即为编辑后的圆形对象
      })
      this.circleObjEditor = circleEditor
      this.circleMenu.close()
    },
    finishCircle() {
      this.circleObjEditor.close()

      this.circleMenu.close()
      if (this.isEdit) {
        //获取id，通过id查询详情接口
        this.form = Object.assign({}, this.leftTextList[this.editIndex])
        // this.$set(this.form, "address", this.leftTextList[this.editIndex]);
      } else {
        this.getAddress(this.circleObj._opts.center)
        // this.$set(this.form, "address", this.currentAddress);
      }
      this.dialogVisible = true
    },
    cancelCircle() {
      this.isValid = true
      this.dialogVisible = false
      this.circleMenu.close()
      this.circleObjEditor.close()
      if (this.isEdit) {
        this.getList()
        // //添加文本标识
        // var text = new AMap.Text({
        //   text: this.leftTextList[this.editIndex],
        //   anchor: "center", // 设置文本标记锚点
        //   draggable: false,
        //   cursor: "pointer",
        //   angle: 10,
        //   style: {
        //     "border-width": 0,
        //     "box-shadow": "0 2px 6px 0 rgba(114, 124, 245, .5)",
        //     "text-align": "center",
        //     "font-size": "20px",
        //     color: "blue",
        //   },
        //   // position: [
        //   //   this.circleObj._opts.center[0],
        //   //   this.circleObj._opts.center[1],
        //   // ],
        //   position: [
        //     this.circleObjList[this.editIndex]._opts.center[0],
        //     this.circleObjList[this.editIndex]._opts.center[1],
        //   ],
        // });
        // this.map.add(text);
        // this.textList[this.editIndex] = text;
      } else {
        this.map.remove(this.rightClickCircleObj)
      }
    },

    circleMenuFn(AMap, isEditorStatus) {
      //右键覆盖物圆---自定义菜单初始化
      var content = []
      if (isEditorStatus) {
        content.push("<div class='info context_menu'>")
        content.push("<p onclick='cancelCircle()'>取消编辑</p>")
        content.push("<p onclick='finishCircle()'>完成编辑</p>")
        content.push('</div>')
      } else {
        content.push("<div class='info context_menu'>")
        content.push("<p onclick='editorCircle()'>编辑</p>")
        content.push('</div>')
      }

      //通过content自定义右键菜单内容
      this.circleMenu = new AMap.ContextMenu({
        isCustom: true,
        content: content.join('')
      })
    },
    contextMenuFn(AMap) {
      //右键自定义菜单初始化
      var contextMenuPositon = null
      var content = []
      content.push("<div class='info context_menu'>")
      content.push(`<p onclick='zoomMenu(0)'>缩小</p>`)
      content.push("  <p class='split_line' onclick='zoomMenu(1)'>放大</p>")
      // content.push("  <p onclick='addCircle()'>已此点为圆心设置范围</p>");
      content.push('</div>')

      //通过content自定义右键菜单内容
      this.contextMenu = new AMap.ContextMenu({
        isCustom: true,
        content: content.join('')
      })

      //地图绑定鼠标右击事件——弹出右键菜单
      this.map.on('rightclick', e => {
        this.editLnglatList[0] = e.lnglat.lng
        this.editLnglatList[1] = e.lnglat.lat
        this.contextMenu.open(this.map, e.lnglat)
        contextMenuPositon = e.lnglat //右键菜单位置
      })
    },
    markerMenuFn() {
      //右键自定义菜单初始化
      var content = []
      content.push("<div class='info context_menu'>")
      // content.push(
      //   "  <p onclick='addCircle(needDefaultAddress)'>已此点为圆心设置范围</p>"
      // );
      content.push('</div>')
      //通过content自定义右键菜单内容
      this.markerMenu = new this.AMap.ContextMenu({
        isCustom: true,
        content: content.join('')
      })
      this.marker.off('rightclick', this.markerRightClick)
      this.marker.on('rightclick', this.markerRightClick)
    },
    markerRightClick(e) {
      this.editLnglatList[0] = this.currentMarkerLnglat.lng
      this.editLnglatList[1] = this.currentMarkerLnglat.lat
      this.markerMenu.open(this.map, e.lnglat)
    },
    searchRightClickFn(e) {
      let str = e.target.dom.children[0].classList.value //通过类名获取当前点击的索引
      let index = str.split('marker-')[1]

      var content = []
      content.push("<div class='info context_menu'>")
      content.push(
        "  <p onclick='addCircle(needDefaultAddress)'>已此点为圆心设置范围</p>"
      )
      content.push('</div>')
      //通过content自定义右键菜单内容
      this.markerMenu = new this.AMap.ContextMenu({
        isCustom: true,
        content: content.join('')
      })

      this.editLnglatList[0] = this.searchResultList[index].location.KL
      this.editLnglatList[1] = this.searchResultList[index].location.lat
      this.markerMenu.open(this.map, e.lnglat)
    },
    zoomMenu(tag) {
      //右键菜单缩放地图
      if (tag === 0) {
        this.map.zoomOut()
      }
      if (tag === 1) {
        this.map.zoomIn()
      }
      this.contextMenu.close()
    },
    regeoCode() {
      var lnglat = document.getElementById('lnglat').value.split(',')
      this.map.add(this.marker)
      this.marker.setPosition(lnglat)
      this.infoWindow = new this.AMap.InfoWindow({
        offset: new this.AMap.Pixel(0, -30)
      })

      this.marker.on('click', this.markerClick)
      this.markerMenuFn()

      this.geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.regeocode) {
          var address = result.regeocode.formattedAddress
          document.getElementById('address').value = address
          this.currentAddress = address
          this.marker.content = address
        } else {
          log.error('根据经纬度查询地址失败')
        }
      })
    },
    getAddress(lnglat) {
      this.geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.regeocode) {
          var address = result.regeocode.formattedAddress
          this.currentAddress = address
          this.$set(this.form, 'address', this.currentAddress)
        } else {
          log.error('根据经纬度查询地址失败')
        }
      })
    },
    markerClick(e) {
      this.infoWindow.setContent(e.target.content)
      this.infoWindow.open(this.map, e.target.getPosition())
    },

    //地图工具
    showTool(map) {
      var controlBar = new AMap.ControlBar({
        position: {
          left: '10px',
          top: '10px'
        }
      })
      controlBar.addTo(map)

      var toolBar = new AMap.ToolBar({
        position: {
          left: '40px',
          top: '110px'
        }
      })
      toolBar.addTo(map)
    },
    draw(type, mouseTool) {
      switch (type) {
        case 'circle': {
          mouseTool.circle({
            fillColor: '#00b0ff',
            strokeColor: '#80d8ff'
            //同Circle的Option设置
          })
          break
        }
      }
    },

    getList() {
      getErpDeliveryShopList(this.listQuery).then(response => {
        if (response.retCode === 200) {
          this.leftTextList = []
          if (response.retData.pageData.length) {
            response.retData.pageData.forEach((v, i) => {
              if (v.verify) {
                this.leftTextList.push(v)
              }
            })
          }

          this.map.clearMap()
          if (this.leftTextList.length) {
            this.circleObjList = []
            this.textList = []
            this.leftTextList.forEach((v, i) => {
              this.getText(v.dname, [v.longitude * 1, v.latitude])
              this.getCircle([v.longitude * 1, v.latitude], v.radius)
              this.setIcon([v.longitude * 1, v.latitude])
            })
          }
        } else {
        }
      })
    },
    setIcon(position) {
      var marker = new this.AMap.Marker({
        position,
        map: this.map,
        size: new this.AMap.Size(100, 100),
        imageSize: new this.AMap.Size(80, 80),
        zIndex: 40,
        icon: 'https://ossxbkj.xbbang.cn/prodFile/202112301155317620.png',
        offset: [-11, -34]
      })
      this.map.add(marker)
    },
    getText(text, position) {
      //添加文本标识
      var text = new this.AMap.Text({
        text,
        anchor: 'center', // 设置文本标记锚点
        draggable: false,
        cursor: 'pointer',
        angle: 10,
        style: {
          'border-width': 0,
          'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
          'text-align': 'center',
          'font-size': '14px',
          color: 'blue'
        },
        position
      })
      this.map.add(text)
      this.textList.push(text)
    },
    getCircle(position, radius) {
      var circle = new AMap.Circle({
        center: position,
        radius, //半径
        borderWeight: 3,
        strokeColor: '#FF33FF',
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        strokeStyle: 'dashed',
        strokeDasharray: [10, 10],
        // 线样式还支持 'dashed'
        fillColor: '#1791fc',
        zIndex: 50
      })
      this.map.add(circle)
      this.circleObjList.push(circle)
      let isEditorStatus = true //标识 当前右键的圆是已经在编辑的还是没有编辑的
      //覆盖物--圆--绑定鼠标右击事件——弹出右键菜单
      // circle.on("rightclick", (e) => {
      //   if (
      //     this.circleObjEditor.list &&
      //     e.target._amap_id === this.circleObjEditor.list.circle._amap_id
      //   ) {
      //     isEditorStatus = true;
      //   } else {
      //     if (this.isValid) {
      //       this.rightClickCircleObj = e.target;
      //     }
      //     isEditorStatus = false;
      //   }
      //   this.circleMenuFn(this.AMap, isEditorStatus);
      //   this.editLnglatList[0] = e.lnglat.lng;
      //   this.editLnglatList[1] = e.lnglat.lat;
      //   this.circleMenu.open(this.map, e.lnglat);
      // });
      // this.circleMenuFn(this.AMap, isEditorStatus);
      // circle.on("click", (e) => {
      //   this.circleMenu.close();
      // });
    }
  }
}
</script>
<style lang="scss" scoped>
input {
  padding-left: 10px;
}
.map-box {
  display: flex;
}
.list {
  width: 250px;
  background-color: #fff;
}
#container {
  width: 100%;
  height: calc(100vh - 125px);
}

.list-box {
  h4 {
    padding: 10px;
    font-weight: 700;
    border-bottom: 1px solid #eaeaea;
    // font-weight: normal;
  }
  .item {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    border-bottom: 1px solid #eaeaea;
    cursor: pointer;
    .text {
      flex: 7;
    }
    .handle {
      flex: 3;
      text-align: right;
    }
  }
  .item:hover {
    background-color: #fbfbfb;
  }
}
.search-box {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 998;
  width: 330px;
  h4 {
    padding: 10px;
    font-weight: 700;
    border-top: 1px solid #eaeaea;
    // font-weight: normal;
  }
  .ipt-box {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding-left: 10px;
    .icon {
      font-size: 20px;
      cursor: pointer;
      margin-right: 10px;
    }
    img {
      width: 34px;
      height: 34px;
    }
  }
  input {
    width: 270px;
    height: 45px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 3px;
    background: none;
    outline: none;
    border: none;
  }
  input:focus {
    border: none;
  }
  .search-list {
    background-color: #fff;
    height: 500px;
    overflow-y: auto;
    .item {
      padding: 10px 0 10px 10px;
      border-top: 1px solid #eaeaea;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left-box {
        flex: 4;
      }
      .right-box {
        flex: 2;
      }
      .text {
        padding-top: 6px;
      }
    }
    .item:hover {
      background-color: #fbfbfb;
    }
  }
}
.info-box {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 998;
  input {
    width: 300px;
    height: 34px;
    line-height: 34px;
  }
}

::v-deep .context_menu {
  position: relative;
  min-width: 100px;
  background-color: #fff;
  padding: 0;
  p {
    cursor: pointer;
    padding: 10px;
  }
  p:hover {
    background-color: #fbfbfb;
  }
}
::v-deep .amap-info-close {
  display: none;
}
::v-deep .custom-content-marker {
  position: absolute;
  width: 25px;
  height: 34px;
  background: url(../../../assets/images/poi-marker.png) no-repeat;
  cursor: pointer;
  background-size: 437px 267px;
  background-position: -8px -48px;
}
::v-deep .marker-0 {
  background-position: -8px -48px;
}
::v-deep .marker-1 {
  background-position: -52px -48px;
}
::v-deep .marker-2 {
  background-position: -96px -48px;
}
::v-deep .marker-3 {
  background-position: -140px -48px;
}
::v-deep .marker-4 {
  background-position: -184px -48px;
}
::v-deep .marker-5 {
  background-position: -228px -48px;
}
::v-deep .marker-6 {
  background-position: -272px -48px;
}
::v-deep .marker-7 {
  background-position: -316px -48px;
}
::v-deep .marker-8 {
  background-position: -360px -48px;
}
::v-deep .marker-9 {
  background-position: -404px -48px;
}

::v-deep .hover .marker-0 {
  background-position: -8px -138px;
}
::v-deep .hover .marker-1 {
  background-position: -52px -138px;
}
::v-deep .hover .marker-2 {
  background-position: -96px -138px;
}
::v-deep .hover .marker-3 {
  background-position: -140px -138px;
}
::v-deep .hover .marker-4 {
  background-position: -184px -138px;
}
::v-deep .hover .marker-5 {
  background-position: -228px -138px;
}
::v-deep .hover .marker-6 {
  background-position: -272px -138px;
}
::v-deep .hover .marker-7 {
  background-position: -316px -138px;
}
::v-deep .hover .marker-8 {
  background-position: -360px -138px;
}
::v-deep .hover .marker-9 {
  background-position: -404px -138px;
}
::v-deep .amap-icon img {
  width: 22px;
  height: 22px;
}
</style>
