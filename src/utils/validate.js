export function isvalidUsername(str) {
  // const valid_map = ['admin', 'test']
  // return valid_map.indexOf(str.trim()) >= 0
  return str.trim().length >= 3
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}
/* 数字*/
export function valiNumber(str) {
  // const reg = /^[0-9]+$/
  const reg = /^\d+(\.\d+)?$/

  return reg.test(str)
}
/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
/* 中英文数字*/
export function validateC_E_N(str) {
  const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
  return reg.test(str)
}
/* 中英文数字*/
export function validateE_N(str) {
  const reg = /^[a-zA-Z0-9_]+$/
  return reg.test(str)
}
/* 中文*/
export function validateC(str) {
  const reg = /^[\u4e00-\u9fa5]+$/
  return reg.test(str)
}
// 电话号码
export function validatePhone(str) {
  const reg =
    /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/;
  return reg.test(str)
}
// 邮箱
export function validateEmail(str) {
  const reg =
    /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return reg.test(str)
}
