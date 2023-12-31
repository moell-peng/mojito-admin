<template>
  <el-card style="margin:10px;">
    <el-form :inline="false" :model="table.queryParams">
      <div class="search">
        <div class="search-item">
          <guard-select v-model="table.queryParams.guard_name" :placeholder="$t('guardName')"></guard-select>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="requestData">{{ $t('search') }}</el-button>
        </div>
      </div>
    </el-form>
  </el-card>
  <el-card style="margin:10px;">
    <table-action :title="$t('meta.title.menu')">
      <template #action>
        <el-button type="primary" v-if="hasAddPermission"  @click="handleAdd">{{ $t('add') }}</el-button>
      </template>
    </table-action>
    <el-table
            :data="table.data"
            v-loading="table.loading"
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            border stripe
            class="init_table">
      <el-table-column
              :label="$t('name')"
              min-width="200"
              prop="name"
              show-overflow-tooltip
              align="left">
      </el-table-column>
      <el-table-column
              prop="uri"
              label="Router">
      </el-table-column>
      <el-table-column
              prop="permission_name"
              :label="$t('permission')">
      </el-table-column>
      <el-table-column
              prop="sequence"
              :label="$t('sequence')">
      </el-table-column>
      <el-table-column
              align="center"
              :label="$t('icon')">
        <template #default="scope">
          <el-icon v-if="scope.row.icon"><component  :is="icon(scope.row.icon)" /></el-icon>
        </template>
      </el-table-column>
      <el-table-column
              align="center"
              :label="$t('actions')">
        <template #default="scope">
          <el-button
                  v-if="hasUpdatePermission"
                  type="primary"
                  :link="true"
                  @click="handleEdit(scope.row)">{{ $t('edit') }}</el-button>
          <el-popconfirm v-if="hasDeletePermission" :title="$t('confirmDelete')" @confirm="handleDelete(scope.$index, scope.row)">
            <template #reference>
              <el-button type="danger" :link="true">{{ $t('delete') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <menu-form-drawer :row="updateRow" v-model="showFormDrawer" :action="formAction"></menu-form-drawer>
</template>

<script setup name="menuIndex">
import GuardSelect from '@/components/Select/GuardSelect.vue'
import { getMenuList, deleteMenu } from '@/api/menu'
import TableAction from '@/components/Table/TableAction.vue'
import MenuFormDrawer from './MenuFormDrawer.vue'
import { ref, computed } from 'vue'
import { tableDefaultData } from '@/utils/table'
import notice from '@/utils/notice'
import { usePermissionStore } from "@/store/permission"

const showFormDrawer = ref(false)
const permissionStore = usePermissionStore()
const table = tableDefaultData()

const requestData = () => {
  table.loading = true
  getMenuList(table.queryParams).then( response => {
    table.data = response.data.data
    table.loading = false
  })
}

requestData()

const handleDelete = (index, row) => {
  deleteMenu(row.id).then( () => {
    notice.deleteSuccess()
    table.data.splice(index, 1)
  })
}

const formAction = ref('add')
const updateRow = ref(null)
const handleEdit = (row) => {
  showFormDrawer.value = true
  formAction.value = 'edit'
  updateRow.value = row
}

const handleAdd = () => {
  showFormDrawer.value = true
  formAction.value = 'add'
}

const hasAddPermission = computed(() => permissionStore.hasPermission("menu.store"))
const hasUpdatePermission = computed(() => permissionStore.hasPermission("menu.update"))
const hasDeletePermission = computed(() => permissionStore.hasPermission("menu.destroy"))
const icon = computed(() => (name) => name)

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
