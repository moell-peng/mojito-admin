<template>
  <el-card style="margin:10px;">
    <el-form :inline="false" :model="table.queryParams">
      <el-row :gutter="40"> 
        <el-col :span="8">
          <el-form-item :label="$t('name')">
            <el-input v-model="table.queryParams.name" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('username')">
            <el-input v-model="table.queryParams.username" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align:right">
          <el-button type="primary" @click="requestData">{{ $t('search') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <el-card style="margin:10px;">
    <table-action :title="$t('meta.title.adminUser')">
      <template #action>
        <el-button type="primary" v-if="hasAddPermission"  @click="addDialogVisible = true">{{ $t('add') }}</el-button>
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
              prop="username"
              :label="$t('username')">
      </el-table-column>
      <el-table-column
              :label="$t('status')">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status">启用</el-tag>
          <el-tag type="danger" v-if="!scope.row.status">禁用</el-tag>
        </template>
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
              width="200px"
              :label="$t('actions')"
              >
        <template #default="scope">
          <el-button
                  v-if="hasEditPermission"
                  type="text"
                  @click="handleEdit(scope.row)">{{ $t('edit') }}</el-button>
          <el-button
                  v-if="hasAssignRolePermission"
                  type="text"
                  @click="handleAssignRole(scope.row)">{{ $t('assignRole') }}</el-button>
          <el-popconfirm v-if="hasDeletePermission" :title="$t('confirmDelete')" @confirm="handleDelete(scope.$index, scope.row)">
            <template #reference>
              <el-button type="text">{{ $t('delete') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination-right"
                   @current-change="requestData"
                   v-model="table.pagination.currentPage"
                   :page-size="table.pagination.pageSize"
                   layout="total, prev, pager, next, jumper"
                   :total="table.pagination.total">
    </el-pagination>
  </el-card>
  <user-assign-role :user-id="assignRole.id" :guard-name="assignRole.guardName" v-model="assignRole.dialogVisible"></user-assign-role>
  <admin-user-form-dialog :title="$t('add')" action="add" v-model="addDialogVisible"></admin-user-form-dialog>
  <admin-user-form-dialog :title="$t('edit')" :row="updateRow" action="edit" v-model="editDialogVisible"></admin-user-form-dialog>
</template>

<script setup>
import { getAdminUserList, deleteAdminUser } from '@/api/adminUser'
import UserAssignRole from '@/components/User/AssignRole.vue'
import TableAction from '@/components/Table/TableAction.vue'
import { ref, computed } from 'vue'
import AdminUserFormDialog from './AdminUserFormDialog.vue'
import { useStore } from 'vuex'
import { tableDataFormat, tableDefaultData } from '@/utils/table'
import notice from '@/utils/notice'

const store = useStore()
const addDialogVisible = ref(false)
const editDialogVisible = ref(false)
const table = tableDefaultData()

const updateRow = ref({})
const handleEdit = (row) => {
  editDialogVisible.value = true
  updateRow.value = row
}

const requestData = () => {
  table.loading = true
  getAdminUserList(table.getQueryParams()).then( response => {
    tableDataFormat(response, table)
  })
}

requestData()

const handleDelete = (index, row) => {
  deleteAdminUser(row.id).then( () => {
    notice.deleteSuccess()
    table.data.splice(index, 1)
  })
}

const assignRole = ref({
  id: 0,
  guardName: 'admin',
  dialogVisible: false,
})

const handleAssignRole = (row) => {
  assignRole.value.id = row.id
  assignRole.value.dialogVisible = true
}

const hasAddPermission = computed(() => store.getters.hasPermission("admin-user.store"))
const hasEditPermission = computed(() => store.getters.hasPermission("admin-user.update"))
const hasDeletePermission = computed(() => store.getters.hasPermission("admin-user.destroy"))
const hasAssignRolePermission = computed(() => store.getters.hasPermission("admin-user.assign-roles"))

</script>