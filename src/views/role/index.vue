<template>
  <el-card style="margin:10px">
    <el-form :inline="false" :model="table.queryParams">
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item :label="$t('name')">
            <el-input v-model="table.queryParams.name" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8" style="text-align:right">
         <el-button type="primary" @click="requestData" :icon="Search">{{ $t('search') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <el-card style="margin:10px">
    <table-action :title="$t('meta.title.role')">
      <template #action>
        <el-button type="primary" v-if="addPermission"  @click="showAddRoleDialog" :icon="Plus">{{ $t('add') }}</el-button>
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
                  v-if="updatePermission"
                  type="text"
                  @click="showEditRoleDialog(scope.row)">{{ $t('edit') }}</el-button>
          <el-button
                  v-if="assignPermission"
                  @click="showAssignPermissionDrawer(scope.row)"
                  type="text">{{ $t('assignPermission') }}</el-button>
          <el-popconfirm v-if="deletePermission" :title="$t('confirmDelete')" @confirm="handleDelete(scope.$index, scope.row)">
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
  </el-card>
  <el-dialog :title="dialogAction == 'add' ? $t('add') : $t('edit')" v-model="dialogFormVisible"  width="500px">
    <el-form :model="form" :rules="rules" label-width="120px" ref="formRef">
      <el-form-item :label="$t('name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('guardName')" prop="guard_name">
        <guard-select v-model="form.guard_name"></guard-select>
      </el-form-item>
      <el-form-item :label="$t('description')" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogFormVisible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="handleAddRole" v-if="dialogAction == 'add'">{{ $t('confirm') }}</el-button>
      <el-button type="primary" @click="handleEditRole" v-if="dialogAction == 'edit'">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
  <role-assign-permission-drawer v-model="assignPermisionDrawer" :role-id="assignPermissionRole.id" :guard-name="assignPermissionRole.guardName"></role-assign-permission-drawer>
</template>

<script setup>
import { getRoleList, addRole, editRole, deleteRole } from '@/api/role'
import GuardSelect from '@/components/Select/GuardSelect.vue'
import TableAction from '@/components/Table/TableAction.vue'
import { tableDataFormat, tableDefaultData } from '@/utils/table'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import notice from '@/utils/notice'
import RoleAssignPermissionDrawer from './RoleAssignPermissionDrawer.vue'
import { Plus, Search} from '@element-plus/icons-vue'

const table = tableDefaultData()
const store = useStore()

const requestData = () => {
  table.loading = true
  getRoleList(table.getQueryParams()).then( response => {
    tableDataFormat(response, table)
  })
}

requestData()

const formRef = ref(null)
const form = ref({
  name: null,
  guard_name: null,
  description: null,
})
const dialogFormVisible = ref(false)

const dialogAction = ref('add')

const showAddRoleDialog = () => {
  dialogAction.value = 'add'
  dialogFormVisible.value = true
  form.value = {
    name: null,
    guard_name: null,
    description: null,
  }
}

const updateRow = ref({})

const showEditRoleDialog = (row) => {
  dialogAction.value = 'edit'
  dialogFormVisible.value = true
  form.value = {
    name: row.name,
    guard_name: row.guard_name,
    description: row.description,
  }
  updateRow.value = row
}

const handleAddRole = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    
    addRole(form.value).then(() => {
      notice.addSuccess()
      dialogFormVisible.value = false
    })
  })
}

const handleEditRole = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    editRole(updateRow.value.id, form.value).then(() => {
      notice.editSuccess()
      updateRow.value.name = form.value.name
      updateRow.value.guard_name = form.value.guard_name
      updateRow.value.description = form.value.description
      dialogFormVisible.value = false
    })
  })
}

const handleDelete = (index, row) => {
  deleteRole(row.id).then( () => {
    notice.deleteSuccess()
    table.data.splice(index, 1)
  })
}

const assignPermisionDrawer = ref(false)
const assignPermissionRole = ref({
  id: 0,
  guardName: null,
})
const showAssignPermissionDrawer = (row) => {
  assignPermisionDrawer.value = true
  assignPermissionRole.value.id = row.id
  assignPermissionRole.value.guardName = row.guard_name
}

const updatePermission = computed(() => store.getters.hasPermission('role.update'))
const addPermission = computed(() => store.getters.hasPermission('role.store'))
const deletePermission = computed(() => store.getters.hasPermission('role.destroy'))
const assignPermission = computed(() => store.getters.hasPermission('role.assign-permissions'))
const rules = {
  name: [
    { required: true },
    { min: 1, max: 255 }
  ],
  guard_name: [
    { required: true },
    { min: 1, max: 255 }
  ]
}
</script>