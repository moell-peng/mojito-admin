<template>
  <custom-scroll-drawer :title="$t('meta.title.permissionGroup')" :full-content="true" v-model="drawer" direction="rtl" :size="800">
    <table-action>
      <template #action> 
        <el-button type="primary" v-if="hasAddBtn" plain  @click="handleAdd" :icon="Plus"></el-button>
        <el-button type="primary" plain  @click="requestData" :icon="Refresh"></el-button>
      </template>
    </table-action>
    <el-table
            :data="table.data"
            v-loading="table.loading"
            border
           
            style="width: 100%">
      <el-table-column
              prop="name"
              :label="$t('name')">
      </el-table-column>
      <el-table-column
              prop="created_at"
              :label="$t('createdAt')">
      </el-table-column>
      <el-table-column
              prop="updated_at"
              :label="$t('updatedAt')">
      </el-table-column>
      <el-table-column
              width="100px"
              :label="$t('actions')">
        <template #default="scope">
          <el-button
                  v-if="hasEditBtn"
                  type="text"
                  @click="handleEdit(scope.row)">{{ $t('edit') }}</el-button>
          <el-popconfirm v-if="hasDeleteBtn" :title="$t('confirmDelete')" @confirm="handleDelete(scope.$index, scope.row)">
            <template #reference>
              <el-button type="text">{{ $t('delete') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination-right"
                   @current-change="requestData"
                   v-model:currentPage="table.pagination.currentPage"
                   :page-size="table.pagination.pageSize"
                   layout="total, prev, pager, next, jumper"
                   :total="table.pagination.total">
    </el-pagination>
    <el-dialog :title="dialogAction === 'add' ? $t('add') : $t('edit')" v-model="dialogVisible" width="500px">
    <el-form :model="form" :rules="rules" label-width="100px" ref="formRef">
      <el-form-item :label="$t('name')" prop="name" >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="storePermissionGroup" v-if="dialogAction === 'add'">{{ $t('confirm') }}</el-button>
      <el-button type="primary" @click="updatePermissionGroup" v-if="dialogAction === 'edit'">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
  </custom-scroll-drawer>
</template>
<script setup>
import CustomScrollDrawer from '@/components/Drawer/CustomScrollDrawer.vue'
import { defineComponent, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { tableDefaultData, tableDataFormat } from '@/utils/table'
import { getPermissionGroupList, editPermissionGroup, addPermissionGroup, deletePermissionGroup } from '@/api/permissionGroup'
import notice from '@/utils/notice'
import TableAction from '@/components/Table/TableAction.vue'
import { Refresh, Plus} from "@element-plus/icons-vue"

const props = defineProps({
  modelValue: false,
})

const emit = defineEmits(["update:modelValue"])

const drawer = ref(props.modelValue)
const store = useStore()
const table = tableDefaultData()
const dialogVisible = ref(false)
const formRef = ref(null)
const form = ref({
  name: null,
})

watch(() => props.modelValue, (v) => {
  drawer.value = v
})

watch(drawer, (d) => {
  emit("update:modelValue", d)
})

const requestData = () => {
  table.loading = true
  getPermissionGroupList({page: table.pagination.currentPage}).then( response => {
    tableDataFormat(response, table)
  })
}
requestData()

const updateRow = ref(null)

const dialogAction = ref('add')

const handleEdit = (row) => {
  dialogVisible.value = true
  form.value.name = row.name
  updateRow.value = row
  dialogAction.value = 'edit'
}

const handleAdd = () => {
  form.value.name = null
  dialogAction.value = 'add'
  dialogVisible.value = true
}

const updatePermissionGroup = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }

    editPermissionGroup(updateRow.value.id, form.value).then( () => {
      updateRow.value.name = form.value.name
      notice.editSuccess()
      dialogVisible.value = false
    })
  })
}

const storePermissionGroup = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    addPermissionGroup(form.value).then(() => {
      notice.addSuccess()
      dialogVisible.value = false
    })
  })
}

const handleDelete = (index, row) => {
  deletePermissionGroup(row.id).then(() => {
    notice.deleteSuccess()
    table.data.splice(index, 1)
  })
}

const hasAddBtn = computed(() => store.getters.hasPermission("permission-group.store"))
const hasEditBtn = computed(() => store.getters.hasPermission("permission-group.update"))
const hasDeleteBtn = computed(() => store.getters.hasPermission("permission-group.destroy"))
const rules = {
  name: [
    { required: true },
    { min: 1, max: 255 }
  ]
}
</script>
<style lang="scss" scoped>

</style>