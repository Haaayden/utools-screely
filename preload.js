console.log('=== utools Object ===', utools)
console.log('=== 图片路径 ===', utools.getPath('exe'))

utools.onPluginEnter(function(data) {
  console.log('=== plugin enter ===', data)
})
