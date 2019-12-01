<template>
  <div class="editor__container" ref="editor_container">
    <div class="canvas__container" :style="{transform: `scale(${canvasScale}, ${canvasScale})`}" >
      <canvas id="canvas" ref="canvas" ><p>抱歉,你的浏览器不支持Canvas</p></canvas>
    </div>
    <div class="canvas__container__test"></div>
  </div>
</template>

<script>
export default {
  props: {
    sourceImg: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      canvasScale: 1,
    }
  },
  watch: {
    sourceImg: {
      immediate: true,
      handler: function(val, oldVal) {
        if (val) {
          this.updateCanvas()
        }
      },
    },
  },
  created () {
    this.$bus.$on('update-config', (config) => {
      console.log(`=== [Faiz Console:] 刷新 canvas ===`)
      this.updateCanvas(config)
    })
    this.$bus.$on('copy', () => {
      const imgDataUrl = this.canvasEle.toDataURL()
      const image = window.nativeImage.createFromDataURL(imgDataUrl)
      window.clipboard.writeImage(image)
      console.log(`=== [Faiz Console:] copy ===`, window.clipboard, window.nativeImage, imgDataUrl)
    })
  },
  mounted() {
    //圆角矩形
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
      var min_size = Math.min(w, h)
      if (r > min_size / 2) r = min_size / 2
      // 开始绘制
      this.beginPath()
      this.moveTo(x + r, y)
      this.arcTo(x + w, y, x + w, y + h, r)
      this.arcTo(x + w, y + h, x, y + h, r)
      this.arcTo(x, y + h, x, y, r)
      this.arcTo(x, y, x + w, y, r)
      this.closePath()
      return this
    }
    this.canvasEle = this.$refs.canvas
    this.canvasCtx = this.$refs.canvas && this.$refs.canvas.getContext('2d')

    // 获取编辑区的实际宽高,用于计算 canvas 区域的缩放比例,以保证完整显示图片
    this.containerWidth = this.$refs.editor_container.clientWidth
    this.containerHeight = this.$refs.editor_container.clientHeight
  },
  methods: {
    updateCanvas(config = {}) {
      if (this.canvasCtx) {
        console.log(`=== [Faiz Console:] 清空画布 ===`, config)
        this.canvasCtx.clearRect(0, 0, this.canvasEle.width, this.canvasEle.height)
        // return
      }
      const { paddingX = 60, paddingY = 60, shadowBlur = 40, radius = 10 } = config
      console.log(`=== [Faiz Console:] canvas ===`, this.canvasCtx, this.containerWidth)
      let img = new Image()
      img.src = this.sourceImg
      // img.src = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1944289371,4040188413&fm=26&gp=0.jpg'
      img.onload = () => {
        const imgWidth = img.width
        const imgHeight = img.height

        // 确定缩放比例
        if (imgWidth >= imgHeight) {
          this.canvasScale = (this.containerWidth * 0.9) / (imgWidth + paddingX * 2)
        } else {
          this.canvasScale = this.containerHeight * 0.9 / (imgHeight + paddingY * 2)
        }

        // 确定 canvas 的尺寸
        this.canvasEle.width = imgWidth + paddingX * 2
        this.canvasEle.height = imgHeight + paddingY * 2

        // 阴影
        this.canvasCtx.shadowColor = 'rgba(127,127,127,1)'
        this.canvasCtx.shadowOffsetX = 0
        this.canvasCtx.shadowOffsetY = 16
        this.canvasCtx.shadowBlur = shadowBlur
        this.canvasCtx.roundRect(paddingX, paddingY, imgWidth, imgHeight, radius)

        // 画阴影区, 黑色背景
        this.canvasCtx.fillStyle = 'pattern'
        this.canvasCtx.fill()

        // 画圆角图片,并盖在阴影区上
        this.drawRoundedImage(this.canvasCtx, radius, img, 0, 0, imgWidth, imgHeight, paddingX, paddingY, imgWidth, imgHeight)
      }
    },
    drawRoundedImage(ctx, radius, img, sx, sy, swidth, sheight, x, y, width, height) {
      ctx.save()
      ctx.moveTo(x, y + radius)
      ctx.beginPath()
      if (width === height && radius >= width / 2) {
        ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI)
      } else {
        ctx.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI)
        ctx.arc(
          x + width - radius,
          y + radius,
          radius,
          1.5 * Math.PI,
          2 * Math.PI
        )
        ctx.arc(
          x + width - radius,
          y + height - radius,
          radius,
          0,
          0.5 * Math.PI
        )
        ctx.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI)
      }
      ctx.closePath()
      ctx.clip()

      ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
      ctx.restore()
    },
  },
}
</script>

<style scoped>
.editor__container {
  display: flex;
  flex: 1;
  background: #efefef;
  overflow: hidden;
  align-items: center;
  justify-content: center;
}
.canvas__container {
  /* background: #999; */
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABlBMVEUAAADY2NjnFMi2AAAAAXRSTlMAQObYZgAAABVJREFUGNNjYIQDBgQY0oLDxBsIQQCltADJNa/7sQAAAABJRU5ErkJggg==');
  flex: 0 1 auto;
  align-self: center;
}
</style>
