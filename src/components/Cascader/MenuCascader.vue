<template>
  <el-cascader
          v-model="optionValue"
          placeholder="Please choose"
          change-on-select
          clearable
          :options="options"
          :props = "defaultProps">
  </el-cascader>
</template>
<script>
import { getNodeParentPath } from '@/utils/helper'
import { getMenuList } from '@/api/menu'
import { ref, watch } from 'vue'

export default {
  name: 'MenuCascader',
  props: {
    menuId: {
      type: Number,
      default: 0,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    guardName: String,
  },
  setup(props, { emit }) {
    const menuId = ref(props.modelValue)
    const options = ref([])
    const optionValue = ref([])
    const defaultProps = ref({
      children: 'children',
      label: 'name',
      value: "id"
    })

    const setDefault = (menuId) => {
      let path = {}
      getNodeParentPath(menuId, options.value, path)
      optionValue.value = [...path.ids, menuId]
    }

    const requestData = () => {
      if (props.guardName) {
        getMenuList({'guard_name': props.guardName}).then( response => {
          options.value = response.data.data
        })
      } else {
        options.value = []
      }
    }

    requestData()

    watch(optionValue, (ids) => {
      let id = ids[ids.length - 1]
      let menuId = id > 0 ? id : 0

      emit("update:modelValue", menuId);
    })

    watch(() => props.modelValue, (val) => {
      if (val > 0) {
        setDefault(props.modelValue)
      }
    })

    watch(options, () => {
      if (props.modelValue) {
        setDefault(props.modelValue)
      }
    })

    watch(() => props.guardName, () => {
      requestData()
      optionValue.value = []
    })

    return {
      menuId,
      options,
      optionValue,
      defaultProps,
    }
  },
}
</script>