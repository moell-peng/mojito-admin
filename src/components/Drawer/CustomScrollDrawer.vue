<template>
  <el-drawer
      :title="title"
      v-model="drawer"
      custom-class="custom-scroll-drawer"
      :direction="direction"
      :size="size"
      destroy-on-close>
    <div :class="contentClass">
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
<script setup>
import { watch, ref } from 'vue'

const props = defineProps({
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
})

const emit = defineEmits(['update:modelValue'])

const drawer = ref(false)

watch(() => props.modelValue, (v) => {
  drawer.value = v
})

watch(drawer, (d) => {
  emit("update:modelValue", d)
})

const contentClass = props.fullContent ? 'full-content' : 'content'
const paddingStyle = `padding:${props.padding}`
</script>
<style lang="scss" scoped>
.content {
  height: calc(100% - 60px);
  position: relative;
  border-top: 1px solid #ebeef5;
}
.full-content {
  border-top: 1px solid #ebeef5;
  height: 100%;
  position: relative;
}
.footer {
  height:60px;
  width: calc(100% - 40px);
  position: absolute;
  line-height:60px;
  bottom: 0;
  text-align: right;
  border-top: 1px solid #ebeef5;
}
</style>