/**
 * 函数节流
 */
export const throttle = function(fn, delay = 400) {
  let now, lastExec, timer

  let execute = function() {
    fn()
    lastExec = now
  }

  return function() {
    now = Date.now()

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    if (lastExec) {
      let diff = delay - (now - lastExec)
      if (diff < 0) {
        execute()
      } else {
        timer = setTimeout(() => {
          execute()
        }, diff)
      }
    } else {
      execute()
    }
  }
}

export default {
  throttle,
}
