<template>
  <div class="home">
    xxxx
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
export default defineComponent({
  components: { },
  name: 'MemberDetail',
  data () {
    return {

    }
  },

  methods: {
    ...mapMutations(['setLoading'])

  }

})
</script>

<style scoped lang="less">
.home{
  overflow: auto;
  height: calc(100% - 46px);
  padding-bottom: 20px;
  & > div{
    margin-bottom: 16px;
  }
}

</style>
