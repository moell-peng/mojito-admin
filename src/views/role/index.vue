<template>
  <el-card style="margin:10px">
    <el-form :inline="false" :model="table.queryParams">
      <div class="search">
        <div class="search-item">
          <el-input v-model="table.queryParams.name" :placeholder="$t('name')" clearable></el-input>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="requestData">{{ $t('search') }}</el-button>
        </div>
      </div>
    </el-form>
  </el-card>
  <el-card style="margin:10px">
    <table-action :title="$t('meta.title.role')">
      <template #action>
        <el-button type="primary" v-permission="'role.store'"  @click="roleFormDialogRef.open('add')" :icon="Plus">{{ $t('add') }}</el-button>
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
              prop="guard_name"
              :label="$t('guardName')">
      </el-table-column>
      <el-table-column
              prop="description"
              :label="$t('description')">
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
              fixed="right"
              width="220px"
              :label="$t('actions')"
              >
        <template #default="scope">
          <el-button
                  v-permission="'role.update'"
                  type="primary"
                  :link="true"
                  @click="roleFormDialogRef.open('edit', scope.row)">{{ $t('edit') }}</el-button>
          <el-button
                  v-permission="'role.assign-permissions'"
                  @click="roleAssignPermissionDrawerRef.open(scope.row.id, scope.row.guard_name)"
                  type="primary"
                  :link="true">{{ $t('assignPermission') }}</el-button>
          <el-popconfirm :title="$t('confirmDelete')" @confirm="handleDelete(scope.$index, scope.row)">
            <template #reference>
              <el-button v-permission="'role.destroy'" type="danger" :link="true">{{ $t('delete') }}</el-button>
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
  </el-card>
  <role-form-dialog ref="roleFormDialogRef" @success="requestData"></role-form-dialog>
  <role-assign-permission-drawer ref="roleAssignPermissionDrawerRef"></role-assign-permission-drawer>
</template>

<script setup name="roleIndex">
import { getRoleList, deleteRole } from '@/api/role'
import GuardSelect from '@/components/Select/GuardSelect.vue'
import TableAction from '@/components/Table/TableAction.vue'
import { tableDataFormat, tableDefaultData } from '@/utils/table'
import {onMounted, ref} from 'vue'
import notice from '@/utils/notice'
import RoleFormDialog from './components/RoleFormDialog.vue'
import RoleAssignPermissionDrawer from './components/RoleAssignPermissionDrawer.vue'
import { Plus } from '@element-plus/icons-vue'
const table = tableDefaultData()
const roleFormDialogRef = ref(null)
const roleAssignPermissionDrawerRef = ref(null)

const requestData = () => {
  table.loading = true
  getRoleList(table.getQueryParams()).then( response => {
    tableDataFormat(response, table)
  })
}

onMounted(() => {
  requestData()
})

const handleDelete = (index, row) => {
  deleteRole(row.id).then( () => {
    notice.deleteSuccess()
    table.data.splice(index, 1)
  })
}

</script>
