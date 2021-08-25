<template>
  <el-result icon="warning" title="404" :subTitle="$t('notFoundErrorMessage')">
    <template #extra>
      <el-button type="primary" size="small" @click="back">{{ $t("back") }}</el-button>
    </template>
  </el-result>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: "PageNotFound",
  setup() {
    const router = useRouter()

    const back = () => {
      router.back()
    }

    return {
      back,
    }
  }
}
</script>
<style lang="scss" scope>
  
</style>