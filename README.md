## 前言

因工作需要需要画一个仪表板，效果如下图。对于我这只拿canvas画过时钟的人来说，有点复杂。正好赶上周末，时间比较充裕，就自己话时间研究了一下。开发的时候是用Vue开发的，这里就用HTML+JS简单的实现下，便于查看效果。

![效果图](http://p1hywzeee.bkt.clouddn.com/canvas-dashbord/dashbord.png)

## 思路

整体开发思路是把整个效果分成一个个小组件，然后根据角度计算位置。幸好数学还没都还给老师，不然就坑了。

1. 最外层半圆的话可以写一个画圆的函数，然后通过不同的颜色和角度在同一位置画两次；

2. 外层起始和终点位置的border-radius可以通过画两个圆来实现；

3. 内层的刻度表同理；

4. 外层结果的圆点，通过分数算出相对起始点旋转的角度，算出圆点圆心的位置，然后画出一个圆即可；

5. 内层指针型的图形比较麻烦一点，可以分三步来实现：

   5.1 shadow的效果可以通过不同颜色来画个大一点的圆；

   5.2 内层指针型可以是一体的，不过有点麻烦，做的时候偷了下懒，分成一个圆和一个三角形，圆的半径需要根据三角形的角度来计算。

6. 填充文字的话就比较简单了。


## 总结

第一眼看的时候会觉得有点麻烦，但其实分解成一个个小模块后就会发现都是套路了。
