/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <table>
    <tr>
      <td :colspan="childLength ? childLength * 2 : 4" :class="{extend: isExtend, left: true}">
        <div :class="{ node: true}">
          <div class="node_person">
            <div class="person" @click="handleClick(treeData)">
              <div class="avat">
                <img v-if="treeData.avatar" :src="treeData.avatarUrl" />
                <img v-else :src="defaultImg[treeData.sex || 0]" />
                <div class="msg">{{treeData.identity}}</div>
              </div>
              <div class="name">{{ treeData.name }}</div>
            </div>
            <div v-if="hasMate" class="extend_mate_handle" @click="toggleMateExtend(treeData)">
              <van-icon v-if="mateIsExtend" name="user-o" />
              <van-icon v-else name="friends-o"/>
            </div>
            <transition name="slide-x">
               <div v-if="mateIsExtend">
                  <div
                    class="person"
                    v-for="(mate, mateIndex) in [treeData.mateInfo]"
                    :key="treeData.name + mateIndex"
                    :class="Array.isArray(mate.class) ? mate.class : []"
                    @click="handleClick(treeData, 'mate')"
                  >
                    <div class="avat">
                      <img v-if="mate.avatar" :src="mate.avatarUrl" />
                      <img v-else :src="defaultImg[mate.sex || 0]" />
                      <div class="msg">{{mate.identity}}</div>
                    </div>
                    <div class="name">{{ mate.name }}</div>
                  </div>
                </div>
            </transition>

          </div>
          <div class="genera">
            <span>第{{genera}}世</span>
          </div>
          <div
            :class="{extend_handle: true, extend_handle_mate: mateIsExtend}"
            v-if="childLength"
            @click="toggleExtend(treeData)"
          >
            <van-icon v-if="!isExtend" name="plus" />
            <van-icon v-else name="minus" />
          </div>
        </div>
      </td>
    </tr>
    <transition name="slide-y">
      <tr v-if="isExtend">
        <td
          v-for="(children, index) in treeData.children"
          :key="index"
          colspan="2"
          class="childLevel"
        >
          <TreeChart :json="children" :genera="genera+1" @click-node="handleClick"/>
        </td>
      </tr>
    </transition>

  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TreeChart',
  props: {
    json: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    },
    genera: {
      default: 1
    }
  },
  data () {
    return {
      // treeData: {},
      defaultImg: {
        0: require('@/assets/111.jpeg'),
        1: require('@/assets/222.jpeg')
      }

    }
  },
  created () {
    // this.treeData = this.extendKey(this.json)
  },
  computed: {
    treeData () {
      return this.extendKey(this.json)
    },
    // 孩子的数量
    childLength () {
      return Array.isArray(this.treeData.children)
        ? this.treeData.children.length
        : 0
    },
    // 是否展开
    isExtend () {
      return this.childLength && this.treeData.extend
    },
    hasMate () {
      return this.treeData.mateInfo
    },
    mateIsExtend () {
      return this.hasMate && this.treeData.mateExtend
    }
  },
  methods: {
    extendKey (item) {
      item.extend = true
      item.mateExtend = true
      if (this.genera <= 3) {
        item.extend = true
        item.mateExtend = true
      }
      if (item.main) {
        item.extend = true
        item.mateExtend = true
        item.children.forEach(i => {
          i.main = true
        })
      }
      item.genera = this.genera
      return item
    },
    toggleExtend: function (treeData: { extend: boolean }) {
      treeData.extend = !treeData.extend
      this.$forceUpdate()
    },
    toggleMateExtend: function (treeData: { mateExtend: boolean }) {
      treeData.mateExtend = !treeData.mateExtend
      this.$forceUpdate()
    },
    handleClick (item, type) {
      this.$emit('click-node', item, type)
    }
  }
})
</script>

<style scoped lang="less">
@person_width: 4.5em;
@person_height: @person_width/5*7;
@td_padding: 25px;
@border_color: #ffba3b;

.slide-y-enter-active, .slide-y-leave-active, .slide-x-enter-active, .slide-x-leave-active{
  transition: all 0.2s ease-out;
}

.slide-y-enter-from, .slide-y-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-x-enter-from, .slide-x-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

table {
  // width: 100%;
  border-collapse: separate !important;
  border-spacing: 0 !important;
}

td {
  position: relative;
  vertical-align: top;
  // padding-bottom: @td_padding;
  // border: 1px solid #ccc;
  // text-align: center;
}

.node {
  position: relative;
  margin: 0 1em;
  margin-bottom: 20px;
  display: inline-block;
  text-align: center;

  .node_person {
    display: flex;

    .person {
      position: relative;
      display: inline-block;
      z-index: 0;
      width: @person_width;
      height: @person_height;
      overflow: hidden;
      /* border: 1px solid #ffba3b; */
      background: url("~@/assets/border.png") no-repeat transparent;
      background-size: 100% 100%;

      .avat {
        display: block;
        position: relative;
        width: @person_width - 1em;
        height: @person_height/7*5;
        margin: auto;
        overflow: hidden;
        background: #fff;
        /* border:1px solid #ccc */
        box-sizing: border-box;
        top: 8px;

        img {
          width: 100%;
          height: 100%;
        }

        .msg {
          font-size: 12px;
          display: inline-block;
          position: absolute;
          width: 100%;
          bottom: 0;
          right: 0;
          left: 0;
          color: #fff;
          background: rgba(22, 20, 20, 0.19);
        }
      }

      .name {
        font-size: 13px;
        height: @person_height/7*2;
        line-height: @person_height/7*2;
        overflow: hidden;
        width: 100%;
        margin-top: 4px;
      }
    }
  }

  .extend_handle {
    width: @person_width;
    text-align: center;
    cursor: pointer;
    // i{
    //   left: @person_width/2 ;
    // }

  }
  .genera{
    width: @person_width + 1em;
    text-align: center;
    font-size: 12px;

    span{
      display: inline-block;
    }
  }
  .extend_handle_mate{
    // width: @person_width*2;

  }
  .extend_mate_handle{
    position: absolute;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    right: -30px;
    top:5px;
    cursor: pointer;
  }
}

.extend::after {
  content: "";
  position: absolute;
  left:50%;

  bottom: @td_padding/5;
  height: @td_padding/3*2;
  border-left: 2px solid @border_color;
  transform: translate3d(-1px, 0, 0);
}

.left::after{
left: @person_width/2 + 1em;
}

.childLevel::before {
  content: "";
  position: absolute;
  // left: 50%;
  left: @person_width/2 + 1em;
  bottom: 100%;
  height: @td_padding/3;
  border-left: 2px solid @border_color;
  transform: translate3d(-1px, 0, 0);
}

.childLevel::after {
  content: "";
  position: absolute;
  left: -4px;
  right: -4px;
  top: -@td_padding/3;
  border-top: 2px solid @border_color;
}

.childLevel:first-child:before,
.childLevel:last-child:before {
  display: none;
}

.childLevel:first-child:after {
  // left: 50%;
  left: @person_width/2 + 1em;
  height: @td_padding/3;
  border: 2px solid;
  border-color: @border_color transparent transparent @border_color;
  border-radius: 6px 0 0 0;
  transform: translate3d(-1px, 0, 0);
}

.childLevel:last-child:after {
  // right: 50%;
  right: calc(100% - @person_width/2 - 1em);
  height: @td_padding/3;
  border: 2px solid;
  border-color: @border_color @border_color transparent transparent;
  border-radius: 0 6px 0 0;
  transform: translate3d(1px, 0, 0);
}

.childLevel:first-child.childLevel:last-child::after {
  left: auto;
  border-radius: 0;
  border-color: transparent @border_color transparent transparent;
  // transform: translate3d(1px, 0, 0);
}
</style>
