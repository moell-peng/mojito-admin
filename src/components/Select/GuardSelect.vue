<template>
  <el-select v-model="guard" clearable>
    <el-option v-for="item in items" :label="item.label" :value="item.value" :key="item.label"></el-option>
  </el-select>
</template>
<script setup>
import config from '@/config'
import { watch, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
  }
})

const emit = defineEmits(['update:modelValue'])

const guard = ref(props.modelValue)

watch(() => props.modelValue, (v) => {
  guard.value = v
})

watch(guard, (v) => {
  emit("update:modelValue", v)
})

const items = config.guardNames
</script>