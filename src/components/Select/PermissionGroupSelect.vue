<template>
  <el-select v-model="groupId" clearable  :placeholder="$t('permissionGroup')">
    <el-option v-for="group in groups" :label="group.name" :value="group.id" :key="group.id"></el-option>
  </el-select>
</template>
<script setup>
import { getPermissionGroupAll } from '@/api/permissionGroup'
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number
  }
})

const emit = defineEmits(['update:modelValue'])

const groupId = ref(props.modelValue)
const groups = ref([])

getPermissionGroupAll().then( response  => {
  groups.value = response.data.data
})

watch(() => props.modelValue, (v) => {
  groupId.value = v
})

watch(groupId, (v) => {
  emit("update:modelValue", v)
})
</script>