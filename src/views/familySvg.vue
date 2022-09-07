<!-- eslint-disable semi -->
<template>
  <div id="treeSvg">
    <div id="treeRoot"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as d3 from 'd3'
export default defineComponent({
  data () {
    return {
      nodes: '',
      zoom: '',
      data: {
        name: 'root',
        children: [
          {
            name: '二级节点1',
            children: [
              {
                name: 'A',
                value: '叶子节点'
              },
              {
                name: 'B',
                value: '叶子节点'
              }
            ]
          },
          {
            name: '二级节点2',
            children: [
              {
                name: 'C',
                value: '叶子节点'
              },
              {
                name: 'D',
                value: '叶子节点'
              }
            ]
          }
        ]
      },
      container: null, // 容器svg>g
      duration: 750, // 动画持续时间
      scaleRange: [1 / 8, 8], // container缩放范围
      centralPoint: [0, 0], // 画布中心点坐标x,y
      nodeSize: [100, 200], // 节点间距(高/水平)
      boxWidth: 70,
      boxHeight: 100

    }
  },
  mounted () {
    this.createSvg()
    this.getData()
  },
  computed: {
    treeMap () { // 树布局
      return d3.tree()
        .nodeSize(this.nodeSize)
        .separation((a, b) => { // 根据是否为同一父节点设置节点距离比例
          return a.parent === b.parent ? 1 : 2
        })
    }
  },
  methods: {
    // 创建画布
    createSvg () {
      const margin = { top: 0, right: 0, bottom: 0, left: 0 }
      const rootDom = document.getElementById('treeSvg')
      const width = rootDom.clientWidth
      const height = rootDom.clientHeight
      const centralY = width / 2 + margin.left
      const centralX = height / 2 + margin.top
      this.centralPoint = [centralX, centralY]// 中心点坐标
      // svg标签
      const svg = d3.select('#treeRoot').append('svg')
        .attr('class', 'tree-svg')
        .attr('width', width)
        .attr('height', height)
        .attr('font-size', this.fontSize)
        .attr('fill', '#555')

      // g标签
      this.container = svg.append('g')
        .attr('class', 'container')
        .attr('transform', 'translate(100, 0) scale(1)')
        // .attr('transform', 'translate(40,40)')

      // 指定缩放范围
      const zoom = d3.zoom().scaleExtent([1 / 8, 8]).on('zoom', this.zoomFn)
      this.container.transition().duration(this.duration).call(zoom.transform, d3.zoomIdentity)
      svg.call(zoom)

      // 数据处理
      // this.dealData()
    },
    // 初始化缩放方法
    zoomFn (e) {
      const zoom = e.transform
      return this.container.attr('transform', zoom)
    },
    // 获取数据
    getData () {
      const hierarchyData = d3.hierarchy(this.data)
      const treeLayout = this.treeMap

      var nodesData = treeLayout(hierarchyData)
      // var links = treeLayout.links()
      const g = d3.select('.container')
      const links = g.selectAll('.links')
        .data(nodesData.links()) // nodesData.descendants()返回所有节点的数据，利于我们绑定数据，slcie(1)截取root后的全部节点，防止重绘
        .enter().append('path') // 用path画线
        .attr('fill', 'none')
        .attr('stroke', '#313131')
        .attr('stroke-width', 2)
        .attr('class', 'link')
        .attr('d', (d) => { // 通过三次贝塞尔曲线设置连线的弯曲程度。M：move to，即到控制点 C后设置两个控制点及终点
          const sourceX = d.source.x
          const sourceY = d.source.y + this.boxWidth
          const targetX = d.target.x
          const targetY = d.target.y

          return 'M' + sourceX + ',' + sourceY +
                    'V' + ((targetY - sourceY) / 2 + sourceY) +
                    'H' + targetX +
                    'V' + targetY
        })
      const nodes = g.selectAll('.node')
        .data(nodesData.descendants()) // 同样是获得所有节点，便于数据绑定
        .enter().append('g')
        .attr('transform', (d) => {
          return `translate(${d.x}, ${d.y})`// 位移
        })
        // 画圆
      nodes.append('rect')
        .attr('y', 0)
        .attr('x', (d) => {
          return -(this.boxWidth / 2)
        })
        .attr('width', (d) => {
          return this.boxWidth
        })
        .attr('height', (d) => {
          return this.boxHeight
        })
      // 插入文字
      nodes.append('text')
        .attr('dx', '.9em')
        .text((d) => {
          return d.data.name
        })
    }
  }
})
</script>

<style lang="less">
#treeSvg {
  // background: #ff98000a;
  overflow: hidden;
  height: calc(100% - 51px);
  width: 100%;
  padding-top: 5px;
  position: relative;
}
</style>
