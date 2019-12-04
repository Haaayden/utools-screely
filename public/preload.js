const clipboard = require('electron').clipboard
const nativeImage = require('electron').nativeImage
window.clipboard = clipboard
window.nativeImage = nativeImage

utools.onPluginReady(() => {
  console.log('插件初始化完成 preload.js')
  utools.onPluginEnter(({code, type, payload}) => {
    console.log('用户进入插件 reload.js', code, type, payload)
  })
  // utools.onPluginEnter(({ code, payload, type }) => {
  //   console.log('=== plugin enter ===', data)
  //   // 图片加阴影
  //   if (code === 'default') {
  //     // 上传的是图片文件  文件路径
  //     if (type === 'files') {
  //       const imgPath = payload[0].path
  //       const imgName = path.name
  //     } else if (type === 'img') {
  //       // 粘贴板图片   base64
  //       const imgBase64 = payload
  //     }
  //   }
  // })
})

// utools.onPluginReady(({ code, payload, type }) => {
//   console.log('=== plugin enter ===', data)
//   // 图片加阴影
//   if (code === 'default') {
//     // 上传的是图片文件  文件路径
//     if (type === 'files') {
//       const imgPath = payload[0].path
//       const imgName = path.name
//     } else if (type === 'img') {
//       // 粘贴板图片   base64
//       const imgBase64 = payload
//     }
//   }
// })
