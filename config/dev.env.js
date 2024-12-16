'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://zoneadmin.hippo-bot.com/ZoneAdmin/"', //请求接口地址
  BASE_PAY: '"http://39.108.153.239:8813"', //支付相关接口地址
  BASE_UPLOAD:
    '"http://39.108.153.239:8817/Upload/setFileUpload?sign=5c912b5905d59b085dd297e64bedf47b&randomString=20216244&device=1&terminal=1&platForm=12"', //图片（小）上传接口地址
  BASE_BIGUPLOAD:
    '"http://39.108.153.239:8817/Upload/setBigFileUpload?sign=5c912b5905d59b085dd297e64bedf47b&randomString=20216244&device=1&terminal=1&platForm=12"' //（大文件）文件上传接口地址
})
