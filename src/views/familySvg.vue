<!-- eslint-disable semi -->
<template>
  <div id="treeSvg">
    <div id="treeRoot"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import * as d3 from 'd3'
import api from '@/api'
export default defineComponent({
  data () {
    return {
      nodes: '',
      zoom: '',
      treeData: null,
      container: null, // 容器svg>g
      duration: 750, // 动画持续时间
      scaleRange: [1 / 8, 8], // container缩放范围
      nodeSize: [100, 200], // 节点间距(高/水平)
      boxWidth: 70,
      boxHeight: 100
    }
  },
  created () {
    this.getTreeData()
  },
  mounted () {
    this.createSvg()
  },
  computed: {
    treeMap () {
      // 树布局
      return d3
        .tree()
        .nodeSize(this.nodeSize)
        .separation((a, b) => {
          // 根据是否为同一父节点设置节点距离比例
          return a.parent === b.parent ? 1 : 2
        })
    }
  },
  methods: {
    ...mapMutations(['setLoading']),
    // 创建画布
    createSvg () {
      const rootDom = document.getElementById('treeSvg')
      const width = rootDom.clientWidth
      const height = rootDom.clientHeight

      // svg标签
      const svg = d3
        .select('#treeRoot')
        .append('svg')
        .attr('class', 'tree-svg')
        .attr('width', width)
        .attr('height', height)
        .attr('font-size', this.fontSize)
        .attr('fill', '#555')

      // g标签
      this.container = svg
        .append('g')
        .attr('class', 'container')
        .attr('transform', `translate(${width / 2}, 140) scale(1)`)

      // 指定缩放范围
      const zoom = d3
        .zoom()
        .scaleExtent(this.scaleRange)
        .on('zoom', this.zoomFn)
      const transform = d3.zoomIdentity.translate(width / 2, 140).scale(1)
      svg
        .transition()
        .duration(this.duration)
        .call(zoom.transform, transform)
      svg.call(zoom)

      // 数据处理
      // this.dealData()
    },
    // 初始化缩放方法
    zoomFn (e) {
      const zoom = e.transform
      return this.container.attr('transform', zoom)
    },
    // 开始绘图
    update () {
      // 数据处理
      const hierarchyData = d3.hierarchy(this.treeData)
      const tree = this.treeMap(hierarchyData)
      const nodes = tree.descendants()// 返回后代节点数组，第一个节点为自身，然后依次为所有子节点的拓扑排序
      const links = tree.links()// 返回当前 node 的 links 数组, 其中每个 link 定义了 source父节点, target 子节点属性。
      this.drawLine(links)
      this.drawNode(nodes)
    },
    // 绘制线条
    drawLine (links) {
      const link = this.container.selectAll('.links').data(links)
      link.enter()
        .append('path') // 用path画线
        .attr('fill', 'none')
        .attr('stroke', '#ffba3b')
        .attr('stroke-width', 2)
        .attr('class', 'link')
        .attr('d', (d) => {
          // 通过三次贝塞尔曲线设置连线的弯曲程度。M：move to，即到控制点 C后设置两个控制点及终点
          const sourceX = d.source.x
          const sourceY = d.source.y + this.boxWidth
          const targetX = d.target.x
          const targetY = d.target.y

          return (
            'M' +
            sourceX +
            ',' +
            sourceY +
            'V' +
            ((targetY - sourceY) / 2 + sourceY) +
            'H' +
            targetX +
            'V' +
            targetY
          )
        })
    },
    // 绘制节点
    drawNode (nodes) {
      const treeNodes = this.container.selectAll('.node').data(nodes)
        .enter()
        .append('g')
        .attr('transform', (d) => {
          return `translate(${d.x}, ${d.y})` // 位移
        })

      const g1 = treeNodes
        .append('g')
        .attr('class', 'node')
        .attr('fill', 'none')
        .attr('width', this.boxWidth)
        .attr('height', this.boxHeight)
        .attr('y', 0)
        .attr('x', -(this.boxWidth / 2))
      g1
        .append('rect')
        .attr('class', 'node')
        .attr('fill', '#f7f8fa')
        .attr('width', this.boxWidth)
        .attr('height', this.boxHeight)
        .attr('y', 0)
        .attr('x', -(this.boxWidth / 2))

      g1.append('image')
        .attr('xlink:href', 'img/border.de66acbe.png')
        .attr('preserveAspectRatio', 'none')
        .attr('width', this.boxWidth)
        .attr('height', this.boxHeight)
        .attr('y', 0)
        .attr('x', -(this.boxWidth / 2))

      g1.append('image')
        .attr('xlink:href', (d) => {
          return d.data.avatarUrl
        })
        .attr('preserveAspectRatio', 'none')
        .attr('width', 56)
        .attr('height', 72)
        .attr('y', 10)
        .attr('x', -(this.boxWidth / 2) + 7)

      const g2 = treeNodes
        .append('g')
        .attr('class', 'node')
        .attr('fill', 'none')
        .attr('width', 56)
        .attr('height', 16.6)
        .attr('y', 65.5)
        .attr('x', -(this.boxWidth / 2) + 7)

      g2
        .append('rect')
        .attr('class', 'node')
        .attr('fill', 'rgba(22,20,20,.2)')
        .attr('width', 56)
        .attr('height', 16.6)
        .attr('y', 65.5)
        .attr('x', -(this.boxWidth / 2) + 7)

      // 插入文字
      treeNodes
        .append('text')
        .attr('dy', this.boxHeight + 20)
        .attr('dx', -this.boxWidth / 4)
        .text((d) => {
          return d.data.name
        })
    },
    async getTreeData () {
      this.setLoading(true)
      const root = await api.getMemberList({
        genealogyId: 1,
        parentId: -1
      })
      if (root.length) {
        this.treeData = await api.getMemberTree({ id: root[0].id })
      }
      this.setLoading(false)
      this.update()
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
  // position: relative;
  .node{
    fill:  url("~@/assets/border.png") no-repeat transparent;
  }
}
</style>
