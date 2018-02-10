window.onload = function () {
  var canvasOption = {
    width: 160,
    height: 160,
    axisOriginX: 0,
    axisOriginY: 0,
    angleWidth: 3, // 刻度宽度
    angleHeight: 1, // 刻度高度
    angleTotal: 60, // 刻度条数
    innerRadius: 60, // 内环半径
    outerRadius: 75, // 外环半径
    outerWidth: 3, // 外环宽度
    dotRadius: 3, // 结果圆点的半径
    startDeg: -30, // 开始角度，与结束角度相对称
    showDeg: 0 // 结果显示角度
  }
  var score = 4.5
  var canvasDashbord = document.getElementById('canvas-dashbord');
  var ctx = canvasDashbord.getContext('2d');

  (function initCanvasDashbord () {
    canvasDashbord.width = canvasOption.width
    canvasDashbord.height = canvasOption.height
    canvasOption.deg = (180 - 2 * canvasOption.startDeg) / canvasOption.angleTotal
    canvasOption.showDeg = score / 10 * (180 - 2 * canvasOption.startDeg)
    canvasOption.axisOriginX = canvasOption.width / 2
    canvasOption.axisOriginY = canvasOption.height / 2 + 20
    ctx.save()

    // 外圆环
    drawRing(canvasOption.outerRadius, (180 - 2 * canvasOption.startDeg), '#f0f0f0')
    drawRing(canvasOption.outerRadius, canvasOption.showDeg, '#6496fa')
    drawDot(0, canvasOption.outerRadius, '#6496fa', canvasOption.outerWidth / 2)
    drawDot((180 - 2 * canvasOption.startDeg), canvasOption.outerRadius, '#f0f0f0', canvasOption.outerWidth / 2)
    drawDot(canvasOption.showDeg, canvasOption.outerRadius, '#6496fa', canvasOption.dotRadius)

    // 内刻度盘
    for (let i = 0; i < canvasOption.angleTotal + 1; i++) { // 灰色刻度线
      drawDial(i, canvasOption.innerRadius, '#dadada')
    }
    let showAngel = parseInt(score / 10 * canvasOption.angleTotal)
    for (let i = 0; i < showAngel + 1; i++) { // 结果刻度线
      drawDial(i, canvasOption.innerRadius, '#6496fa')
    }
    drawDot(canvasOption.showDeg, canvasOption.innerRadius, 'rgba(122,165,251, 0.2)', canvasOption.dotRadius + 2)
    drawDot(canvasOption.showDeg, canvasOption.innerRadius, '#6496fa', canvasOption.dotRadius - 1)
    drawTriangle(canvasOption.innerRadius, '#6496fa', 12)

    // 填充文字
    fillText()
  })()

  // 画出环形刻度线
  function drawDial (angle, radius, color) {
    ctx.save()
    let deg = Math.PI / 180 * (canvasOption.startDeg + canvasOption.deg * angle) // 角度换算弧度
    let offsetY = -(Math.sin(deg) * radius) // 计算刻度Y轴位置
    let offsetX = -(Math.cos(deg) * radius) // 计算刻度X轴位置
    ctx.fillStyle = color
    ctx.translate(canvasOption.axisOriginX + offsetX, canvasOption.axisOriginY + offsetY) // 修改画布坐标原点
    ctx.rotate(deg) // 旋转刻度
    ctx.fillRect(0, 0, canvasOption.angleWidth, canvasOption.angleHeight) // 画出刻度
    ctx.restore()
  }
  // 换出外圆
  function drawRing(radius, drawDeg, color) {
    let deg = 180 + canvasOption.startDeg
    let endDeg = (deg + drawDeg) >= 360 ? (deg + drawDeg - 360) : (deg + drawDeg)
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = canvasOption.outerWidth
    ctx.arc(canvasOption.axisOriginX, canvasOption.axisOriginY, radius, deg * Math.PI / 180, endDeg * Math.PI / 180, false)
    ctx.stroke()
    ctx.restore()
  }
  // 画出圆点
  function drawDot (deg, radius, color, dotRadius) {
    let endDeg = deg + canvasOption.startDeg - 180
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(canvasOption.axisOriginX + radius * Math.cos(endDeg * Math.PI / 180), canvasOption.axisOriginY + radius * Math.sin(endDeg * Math.PI / 180), dotRadius, 0, 2 * Math.PI, false)
    ctx.fill()
    ctx.restore()
  }
  // 画出三角形
  function drawTriangle (radius, color, triangleRadius) {
    let deg = 180 + canvasOption.startDeg
    let processDeg = canvasOption.showDeg + canvasOption.startDeg
    let endDeg = (deg + canvasOption.showDeg) >= 360 ? (deg + canvasOption.showDeg - 360) : (deg + canvasOption.showDeg)
    ctx.beginPath()
    ctx.fillStyle = '#6496fa'
    ctx.lineWidth = 0.1
    ctx.moveTo(canvasOption.axisOriginX + (radius - triangleRadius) * Math.cos(endDeg * Math.PI / 180), canvasOption.axisOriginY + (radius - triangleRadius) * Math.sin(endDeg * Math.PI / 180))
    ctx.lineTo(canvasOption.axisOriginX + (radius - triangleRadius) * Math.cos(endDeg * Math.PI / 180) - triangleRadius * Math.cos((processDeg - 10) * Math.PI / 180), canvasOption.axisOriginY + (radius - triangleRadius) * Math.sin(endDeg * Math.PI / 180) - triangleRadius * Math.sin((processDeg - 10) * Math.PI / 180))
    ctx.lineTo(canvasOption.axisOriginX + (radius - triangleRadius) * Math.cos(endDeg * Math.PI / 180) - triangleRadius * Math.cos((processDeg + 10) * Math.PI / 180), canvasOption.axisOriginY + (radius - triangleRadius) * Math.sin(endDeg * Math.PI / 180) - triangleRadius * Math.sin((processDeg + 10) * Math.PI / 180))
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
  // 填充文字
  function fillText () {
    // 显示结果文字
    ctx.font = '13px PingFangSC-Regular'
    ctx.fillStyle = '#4a4a4a'
    ctx.textAlign = 'center'
    ctx.fillText(score < 5 ? '较差' : '较好', canvasOption.axisOriginX, canvasOption.axisOriginY - 20)
    ctx.restore()

    // 显示结果分数
    ctx.font = '36px Roboto-Medium'
    ctx.fillStyle = '#4a4a4a'
    ctx.textAlign = 'center'
    ctx.fillText(score, canvasOption.axisOriginX, canvasOption.axisOriginY + 15)
    ctx.restore()
  }
}