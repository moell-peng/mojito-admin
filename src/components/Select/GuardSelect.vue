<template>
  <el-select v-model="guard" clearable>
    <el-option v-for="item in items" :label="item.label" :value="item.value" :key="item.label"></el-option>
  </el-select>
</template>
<script>
import config from '@/config'
import { watch, ref } from 'vue'

export default {
  name: 'GuardSelect',
  props: {
    modelValue: {
      type: String,
    }
  },
  setup(props, { emit }) {
    const guard = ref(props.modelValue)

    watch(() => props.modelValue, (v) => {
      guard.value = v
    })

    watch(guard, (v) => {
      emit("update:modelValue", v)
    })

    return {
      guard,
      items: config.guardNames,
    }
  },
}
</script>