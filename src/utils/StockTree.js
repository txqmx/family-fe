/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as d3 from 'd3'
import { imgUrlParser } from '@/utils/Parser'
export class StockTree {
  constructor (options) {
    // 树的源数据
    this.originTreeData = options.originTreeData
    // 宿主元素选择器
    this.el = options.el
    this.nodeClickEvent = options.nodeClickEvent || function (e, d) {

    }
    // 一些配置项
    this.config = {
      // 节点的横向距离
      dx: 100,
      // 节点的纵向距离
      dy: 170,
      // svg的viewBox的宽度
      width: 0,
      // svg的viewBox的高度
      height: 0,
      // 节点的矩形框宽度
      rectWidth: 70,
      // 节点的矩形框高度
      rectHeight: 100,
      // 人物头像大小
      avatarWidth: 56,
      avatarHeight: 72,
      textHeight: 17
    }
    this.svg = null
    this.gAll = null
    this.gLinks = null
    this.gNodes = null
    // 给树加坐标点的方法
    this.tree = null
    // 投资公司树的根节点
    this.rootOfDown = null

    this.drawChart({
      type: 'fold'
    })
  }

  // 初始化树结构数据
  drawChart (options) {
    // 宿主元素的d3选择器对象
    const host = d3.select(this.el)
    // 宿主元素的DOM，通过node()获取到其DOM元素对象
    const dom = host.node()
    // 宿主元素的DOMRect
    const domRect = dom.getBoundingClientRect()
    // svg的宽度和高度
    this.config.width = domRect.width
    this.config.height = domRect.height

    const oldSvg = d3.select('svg')
    // 如果宿主元素中包含svg标签了，那么则删除这个标签，再重新生成一个
    if (!oldSvg.empty()) {
      oldSvg.remove()
    }

    const svg = d3
      .create('svg')
      .attr('viewBox', () => {
        // const parentsLength = this.originTreeData.parents ? this.originTreeData.parents.length : 0
        return [
          -this.config.width / 2,
          // 如果有父节点，则根节点居中，否则根节点上浮一段距离
          -55,
          this.config.width,
          this.config.height
        ]
      })
      .style('user-select', 'none')
      .style('cursor', 'move')

    // 包括连接线和节点的总集合
    const gAll = svg.append('g').attr('id', 'all')
    const zoom = d3
      .zoom()
      .scaleExtent([0.2, 5])
      .on('zoom', (e) => {
        gAll.attr('transform', () => {
          return `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`
        })
      })
    zoom.transform(svg, d3.zoomIdentity.translate(0, 0).scale(0.8))
    svg.call(
      zoom
    ).on('dblclick.zoom', null)// 取消默认的双击放大事件

    this.gAll = gAll
    // 连接线集合
    this.gLinks = gAll.append('g').attr('id', 'linkGroup')
    // 节点集合
    this.gNodes = gAll.append('g').attr('id', 'nodeGroup')
    // 设置好节点之间距离的tree方法
    this.tree = d3.tree().nodeSize([this.config.dx, this.config.dy]).separation((a, b) => {
      if (a.data.mateInfo || b.data.mateInfo) {
        return 1.8
      }
      return 1
    })

    this.rootOfDown = d3.hierarchy(this.originTreeData, (d) => d.children)
    this.tree(this.rootOfDown);

    [this.rootOfDown.descendants()].forEach((nodes) => {
      nodes.forEach((node) => {
        node._children = node.children || null
        if (options.type === 'appoint') {
          const nodeId = node.data.id
          if (options.nodes.includes(nodeId)) {
            node.children = node._children
          }
        } else if (options.type === 'all') {
          // 如果是all的话，则表示全部都展开
          node.children = node._children
        } else if (options.type === 'fold') { // 如果是fold则表示除了父节点全都折叠
          // 将非根节点的节点都隐藏掉（其实对于这个组件来说加不加都一样）
          if (node.depth > 2) {
            node.children = null
          }
        }
      })
    })

    this.svg = svg
    this.update()
    // 将svg置入宿主元素中
    host.append(function () {
      return svg.node()
    })
  }

  // 更新数据
  update (source) {
    if (!source) {
      source = {
        x0: 0,
        y0: 0
      }
      // 设置根节点所在的位置（原点）
      this.rootOfDown.x0 = 0
      this.rootOfDown.y0 = 0
    }
    const nodesOfDown = this.rootOfDown.descendants().reverse()
    const linksOfDown = this.rootOfDown.links()

    this.tree(this.rootOfDown)

    const myTransition = this.svg.transition().duration(400)

    const node1 = this.gNodes
      .selectAll('g.nodeOfDownItemGroup')
      .data(nodesOfDown, (d) => {
        return d.data.id
      })
    const node1Enter = node1
      .enter()
      .append('g')
      .attr('id', d => {
        return `item${d.data.id}`
      })
      .attr('class', 'nodeOfDownItemGroup')
      .attr('transform', (d) => {
        return `translate(${source.x0},${source.y0})`
      })
      .attr('width', (d) => {
        if (d.data.mateInfo) {
          return this.config.rectWidth * 2
        }
        return this.config.rectWidth
      })
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .style('cursor', 'pointer')

    // 背景块，与背景色重合
    node1Enter
      .append('rect')
      .attr('width', (d) => {
        if (d.data.mateInfo) {
          return this.config.rectWidth * 2
        }
        return this.config.rectWidth
      })
      .attr('height', (d) => {
        return this.config.rectHeight
      })
      .attr('x', (d) => {
        if (d.data.mateInfo) {
          return -this.config.rectWidth
        }
        return -this.config.rectWidth / 2
      })
      .attr('y', (d) => {
        return -this.config.rectHeight / 2
      })
      .attr('fill', (d) => {
        return '#f2f2f2'
      })

    // 绘制人物块
    // this.drawPerson(node1Enter)
    node1Enter.each(d => {
      if (d.data.mateInfo) {
        this.drawPerson(d, 35, 'meta')
        this.drawPerson(d, -35)
      } else {
        this.drawPerson(d)
      }
    })
    node1Enter.append('text')
      .attr('class', 'name-msg')
      .attr('y', 64)
      .text((d) => {
        return `第${d.data.level}世`
      })

    this.drawBtn(node1Enter)

    const link1 = this.gLinks
      .selectAll('path.linkOfDownItem')
      .data(linksOfDown, (d) => d.target.data.id)

    const link1Enter = link1
      .enter()
      .append('path')
      .attr('class', 'linkOfDownItem')
      .attr('d', (d) => {
        const o = {
          source: {
            x: source.x0,
            y: source.y0
          },
          target: {
            x: source.x0,
            y: source.y0
          }
        }
        return this.drawLink(o)
      })
      .attr('fill', 'none')
      .attr('stroke', '#ffba3b')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#markerOfDown)')

    // 有元素update更新和元素新增enter的时候
    node1
      .merge(node1Enter)
      .transition(myTransition)
      .attr('transform', (d) => {
        return `translate(${d.x},${d.y})`
      })
      .attr('fill-opacity', 1)
      .attr('stroke-opacity', 1)

    // 有元素消失时
    node1
      .exit()
      .transition(myTransition)
      .remove()
      .attr('transform', (d) => {
        return `translate(${source.x0},${source.y0})`
      })
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)

    link1.merge(link1Enter).transition(myTransition).attr('d', this.drawLink)

    link1
      .exit()
      .transition(myTransition)
      .remove()
      .attr('d', (d) => {
        const o = {
          source: {
            x: source.x,
            y: source.y
          },
          target: {
            x: source.x,
            y: source.y
          }
        }
        return this.drawLink(o)
      })

    // node数据改变的时候更改一下加减号
    const expandButtonsSelection = d3.selectAll('g.expandBtn')

    expandButtonsSelection.select('text').transition().text((d) => {
      return d.children ? '—' : '+'
    })

    this.rootOfDown.eachBefore((d) => {
      d.x0 = d.x
      d.y0 = d.y
    })
  }

  // 绘制按钮
  drawBtn (node) {
    // 增加展开按钮
    const expandBtnG = node
      .append('g')
      .attr('class', 'expandBtn')
      .attr('transform', (d) => {
        return `translate(${0},${this.config.rectHeight / 2 + 20})`
      })
      .style('display', (d) => {
        // 如果没有子节点，则不显示
        if (!d._children) {
          return 'none'
        }
      })
      .on('click', (e, d) => {
        if (d.children) {
          d._children = d.children
          d.children = null
        } else {
          d.children = d._children
        }
        this.update(d)
      })

    expandBtnG
      .append('circle')
      .attr('r', 10)
      .attr('fill', '#ffba3b')
      .attr('cy', 10)
      .attr('height', 10)

    expandBtnG
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#ffffff')
      .attr('y', 11)
      .style('font-size', 18)
      // .style('font-family', '微软雅黑')
      .text((d) => {
        return d.children ? '—' : '+'
      })
  }

  // 绘制人物框
  drawPerson (node, x = 0, isMeta) {
    // 人物框
    const p1 = this.gNodes.select(`#item${node.data.id}`).append('g')
      .attr('class', 'personItem')
      .attr('transform', `translate(${x}, 0)`)
      .on('click', (e, d) => {
        this.nodeClickEvent(e, d, isMeta)
      })

    // 边框
    p1.append('image')
      .attr('xlink:href', (d) => {
        return require('@/assets/border.png')
      })
      .attr('preserveAspectRatio', 'none')
      .attr('width', this.config.rectWidth)
      .attr('height', this.config.rectHeight)
      .attr('x', -this.config.rectWidth / 2)
      .attr('y', -this.config.rectHeight / 2)

    p1.append('image')
      .attr('xlink:href', (d) => {
        if (isMeta) {
          return imgUrlParser(d.data.mateInfo.avatar) || require('@/assets/222.jpeg')
        }
        return imgUrlParser(d.data.avatar) || require('@/assets/111.jpeg')
      })
      .attr('preserveAspectRatio', 'none')
      .attr('width', this.config.avatarWidth)
      .attr('height', this.config.avatarHeight)
      .attr('y', -this.config.rectHeight / 2 + 8) // 距离边框8
      .attr('x', -this.config.rectWidth / 2 + 7)

    // 文字框
    const testCon = p1
      .append('g')
      .attr('class', 'text-content')
      .attr('fill', 'none')

    testCon
      .append('rect')
      .attr('class', 'node')
      .attr('fill', 'rgba(22,20,20,.3)')
      .attr('width', this.config.avatarWidth)
      .attr('height', this.config.textHeight)
      .attr('y', this.config.avatarHeight - this.config.textHeight - this.config.rectHeight / 2 + 8)
      .attr('x', -this.config.avatarWidth / 2)

    testCon.append('text')
      .attr('y', 26)
      .attr('class', 'identity-msg')
      .text((d) => {
        if (isMeta) {
          return d.data.mateInfo.identity
        }
        return d.data.identity
      })

    testCon.append('text')
      .attr('class', 'name-msg')
      .attr('y', 43)
      .text((d) => {
        if (isMeta) {
          return d.data.mateInfo.name
        }
        return d.data.name
      })
  }

  // 直角连接线 by wushengyuan
  drawLink ({ source, target }) {
    const halfDistance = (target.y - source.y) / 2
    const halfY = source.y + halfDistance + 13
    return `M${source.x},${source.y + 70} L${source.x},${halfY} ${target.x},${halfY} ${target.x},${target.y}`
  }

  // 展开所有的节点
  expandAllNodes () {
    this.drawChart({
      type: 'all'
    })
  }

  // 将所有节点都折叠
  foldAllNodes () {
    this.drawChart({
      type: 'fold'
    })
  }
}
