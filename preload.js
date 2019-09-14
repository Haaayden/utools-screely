console.log('=== utools Object ===', utools)

utools.onPluginEnter(({ code, payload, type }) => {
  console.log('=== plugin enter ===', data)
  // 图片加阴影
  if (code === 'default') {
    // 上传的是图片文件  文件路径
    if (type === 'files') {
      const imgPath = payload[0].path
      const imgName = path.name
    } else if (type === 'img') {
      // 粘贴板图片   base64
      const imgBase64 = payload
    }
  }
})
