import * as d3 from 'd3'
export class StockTree {
  constructor (options) {
    // 树的源数据
    this.originTreeData = options.originTreeData
    // 宿主元素选择器
    this.el = options.el
    this.nodeClickEvent = options.nodeClickEvent || function (e, d) {
      alert(d.name)
    }
    // 一些配置项
    this.config = {
      // 节点的横向距离
      dx: 100,
      // 节点的纵向距离
      dy: 150,
      // svg的viewBox的宽度
      width: 0,
      // svg的viewBox的高度
      height: 0,
      // 节点的矩形框宽度
      rectWidth: 70,
      // 节点的矩形框高度
      rectHeight: 100
    }
    this.svg = null
    this.gAll = null
    this.gLinks = null
    this.gNodes = null
    // 给树加坐标点的方法
    this.tree = null
    // 投资公司树的根节点
    this.rootOfDown = null
    // 股东树的根节点
    this.rootOfUp = null

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
        const parentsLength = this.originTreeData.parents ? this.originTreeData.parents.length : 0
        return [
          -this.config.width / 2,
          // 如果有父节点，则根节点居中，否则根节点上浮一段距离
          parentsLength > 0 ? -this.config.height / 2 : -this.config.height / 3,
          this.config.width,
          this.config.height
        ]
      })
      .style('user-select', 'none')
      .style('cursor', 'move')

    // 包括连接线和节点的总集合
    const gAll = svg.append('g').attr('id', 'all')
    svg.call(
      d3
        .zoom()
        .scaleExtent([0.2, 5])
        .on('zoom', (e) => {
          gAll.attr('transform', () => {
            return `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`
          })
        })
    ).on('dblclick.zoom', null)// 取消默认的双击放大事件

    this.gAll = gAll
    // 连接线集合
    this.gLinks = gAll.append('g').attr('id', 'linkGroup')
    // 节点集合
    this.gNodes = gAll.append('g').attr('id', 'nodeGroup')
    // 设置好节点之间距离的tree方法
    this.tree = d3.tree().nodeSize([this.config.dx, this.config.dy])

    this.rootOfDown = d3.hierarchy(this.originTreeData, (d) => d.children)
    this.rootOfUp = d3.hierarchy(this.originTreeData, (d) => d.parents)
    this.tree(this.rootOfDown);

    [this.rootOfDown.descendants(), this.rootOfUp.descendants()].forEach((nodes) => {
      nodes.forEach((node) => {
        node._children = node.children || null
        if (options.type === 'all') {
          // 如果是all的话，则表示全部都展开
          node.children = node._children
        } else if (options.type === 'fold') { // 如果是fold则表示除了父节点全都折叠
          // 将非根节点的节点都隐藏掉（其实对于这个组件来说加不加都一样）
          if (node.depth) {
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
      this.rootOfUp.x0 = 0
      this.rootOfUp.y0 = 0
    }

    const nodesOfDown = this.rootOfDown.descendants().reverse()
    const linksOfDown = this.rootOfDown.links()
    const nodesOfUp = this.rootOfUp.descendants().reverse()
    const linksOfUp = this.rootOfUp.links()

    this.tree(this.rootOfDown)
    this.tree(this.rootOfUp)

    const myTransition = this.svg.transition().duration(500)

    /** *  绘制子公司树  ***/
    const node1 = this.gNodes
      .selectAll('g.nodeOfDownItemGroup')
      .data(nodesOfDown, (d) => {
        return d.data.id
      })

    const node1Enter = node1
      .enter()
      .append('g')
      .attr('class', 'nodeOfDownItemGroup')
      .attr('transform', (d) => {
        return `translate(${source.x0},${source.y0})`
      })
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .style('cursor', 'pointer')
    // 外层的矩形框

    node1Enter
      .append('rect')
      .attr('width', (d) => {
        return this.config.rectWidth
      })
      .attr('height', (d) => {
        return this.config.rectHeight
      })
      .attr('x', (d) => {
        return -this.config.rectWidth / 2
      })
      .attr('y', (d) => {
        return -this.config.rectHeight / 2
      })
      .attr('fill', (d) => {
        return '#f7f8fa'
      })
      .on('click', (e, d) => {
        this.nodeClickEvent(e, d)
      })
    node1Enter.append('image')
      .attr('xlink:href', 'img/border.de66acbe.png')
      .attr('preserveAspectRatio', 'none')
      .attr('width', (d) => {
        return this.config.rectWidth
      })
      .attr('height', (d) => {
        return this.config.rectHeight
      })
      .attr('x', (d) => {
        return -this.config.rectWidth / 2
      })
      .attr('y', (d) => {
        return -this.config.rectHeight / 2
      })
      .on('click', (e, d) => {
        this.nodeClickEvent(e, d)
      })
    node1Enter.append('image')
      .attr('xlink:href', (d) => {
        return d.data.avatarUrl || require('@/assets/11.png')
      })
      .attr('preserveAspectRatio', 'none')
      .attr('width', 56)
      .attr('height', 72)
      .attr('y', -this.config.rectHeight / 2 + 8)
      .attr('x', -(this.config.rectWidth / 2) + 7)

    node1Enter
      .append('text')
      .attr('class', 'name-msg')
      .attr('y', 40)
      .attr('width', 56)
      .text((d) => {
        return d.data.name
      })
      .attr('text-anchor', (d) => {
        return 'middle'
      })
      .style('font-size', (d) => (d.depth === 0 ? 12 : 12))
      .style('font-family', '黑体')
    //   .style('font-weight', 'bold')

    const g2 = node1Enter
      .append('g')
      .attr('class', 'node')
      .attr('fill', 'none')
      .attr('width', (d) => {
        return this.config.rectWidth
      })
      .attr('height', 16.6)
      .attr('y', 65.5)

    g2
      .append('rect')
      .attr('class', 'node')
      .attr('fill', 'rgba(22,20,20,.3)')
      .attr('width', 56)
      .attr('height', 16.6)
      .attr('y', 14)
      .attr('x', -56 / 2)

    g2.append('text')
      .attr('width', 56)
      .attr('height', 16.6)
      .attr('y', 24)
      .attr('class', 'identity-msg')
      .text((d) => {
        return d.data.identity
      })
    // 增加展开按钮
    const expandBtnG = node1Enter
      .append('g')
      .attr('class', 'expandBtn')
      .attr('transform', (d) => {
        return `translate(${0},${this.config.rectHeight / 2})`
      })
      .style('display', (d) => {
        // 如果是根节点，不显示
        if (d.depth === 0) {
          return 'none'
        }
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
      .attr('r', 8)
      .attr('fill', '#ffba3b')
      .attr('cy', 8)

    expandBtnG
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('y', 13)
      .style('font-size', 16)
      .style('font-family', '微软雅黑')
      .text((d) => {
        return d.children ? '-' : '+'
      })

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

    /** *  绘制股东树  ***/

    // node数据改变的时候更改一下加减号
    const expandButtonsSelection = d3.selectAll('g.expandBtn')

    expandButtonsSelection.select('text').transition().text((d) => {
      return d.children ? '-' : '+'
    })

    this.rootOfDown.eachBefore((d) => {
      d.x0 = d.x
      d.y0 = d.y
    })
    this.rootOfUp.eachBefore((d) => {
      d.x0 = d.x
      d.y0 = d.y
    })
  }

  // 直角连接线 by wushengyuan
  drawLink ({ source, target }) {
    const halfDistance = (target.y - source.y) / 2
    const halfY = source.y + halfDistance
    return `M${source.x},${source.y} L${source.x},${halfY} ${target.x},${halfY} ${target.x},${target.y}`
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
