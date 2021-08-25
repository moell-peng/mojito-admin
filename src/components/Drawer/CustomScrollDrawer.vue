<template>
  <el-drawer
    :title="title"
    v-model="drawer"
    custom-class="custom-scroll-drawer"
    :direction="direction"
    :size="size"
    destroy-on-close>
      <div :class="cotnentClass">
        <el-scrollbar>
          <div :style="paddingStyle">
            <slot></slot>
          </div>
        </el-scrollbar>
      </div>
      <div class="footer" v-if="!fullContent">
        <slot name="footer"></slot>
      </div>
  </el-drawer>
</template>
<script>
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  name: 'CustomScrollDrawer',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    direction: {
      type: String,
      default: 'rtl'
    },
    size: {
      type: [String, Number],
      default: '30%',
    },
    padding: {
      type: String,
      default: '20px'
    },
    fullContent: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { emit }) {
    const drawer = ref(false)

    watch(() => props.modelValue, (v) => {
      drawer.value = v
    })

    watch(drawer, (d) => {
      emit("update:modelValue", d)
    })

    return {
      drawer,
      cotnentClass: props.fullContent ? 'full-content' : 'content',
      paddingStyle: `padding:${props.padding}`
    }
  }
})
</script>
<style lang="scss" scoped>
  .content {
    border-top: 1px solid #ebeef5;
    height: calc(100% - 60px);
    position: relative;
  }
  .full-content {
    border-top: 1px solid #ebeef5;
    height: 100%;
    position: relative;
  }
  .footer {
    height:60px;
    width:100%;
    position: absolute;
    line-height:60px;
    bottom: 0;
    text-align: right;
    padding-right: 20px;
    border-top: 1px solid #ebeef5;
  }
</style>