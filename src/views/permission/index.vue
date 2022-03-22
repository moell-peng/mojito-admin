<template>
  <el-card style="margin:10px">
    <el-form :inline="false" :model="table.queryParams">
      <el-row :gutter="40"> 
        <el-col :span="6">
          <el-form-item :label="$t('name')">
            <el-input v-model="table.queryParams.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('permissionGroup')">
            <permission-group-select v-model="table.queryParams.pg_id"></permission-group-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('guardName')">
            <guard-select v-model="table.queryParams.guard_name"></guard-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align:right">
         <el-button type="primary" @click="requestData" :icon="Search">{{ $t('search') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <el-card style="margin:10px">
    <table-action :title="$t('meta.title.permission')">
      <template #action>
        <el-button type="primary" v-if="hasPermissionGroup"  @click="permissionGroupdrawer = true">{{ $t('meta.title.permissionGroup') }}</el-button>
        <el-button type="primary" v-if="hasAddPermission" @click="handleAdd" :icon="Plus">{{ $t('add') }}</el-button>
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
              prop="display_name"
              :label="$t('displayName')">
      </el-table-column>
      <el-table-column
              prop="guard_name"
              :label="$t('guardName')">
      </el-table-column>
      <el-table-column
              prop="group.name"
              :label="$t('permissionGroup')">
      </el-table-column>
      <el-table-column
              prop="icon"
              :label="$t('icon')">
      </el-table-column>
      <el-table-column
              fixed="right"
              width="100px"
              :label="$t('actions')"
              >
        <template #default="scope">
          <el-button
                  v-if="hasUpdatePermission"
                  type="text"
                  @click="handleEdit(scope.row)">{{ $t('edit') }}</el-button>
          <el-popconfirm v-if="hasDeletePermission" :title="$t('confirmDelete')" @confirm="handleDelete(scope.$index, scope.row)">
            <template #reference>
              <el-button  type="text">{{ $t('delete') }}</el-button>
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
  <permission-form-drawer :row="updateRow" :action="formAction" v-model="drawer"></permission-form-drawer>
  <permission-group-drawer v-model="permissionGroupdrawer"></permission-group-drawer>
</template>

<script setup>
import { deletePermission, getPermissionList } from '@/api/permission'
import GuardSelect from '@/components/Select/GuardSelect.vue'
import PermissionGroupSelect from "@/components/Select/PermissionGroupSelect.vue"
import TableAction from '@/components/Table/TableAction.vue'
import CustomScrollDrawer from '@/components/Drawer/CustomScrollDrawer.vue';
import { ref, computed, watch } from 'vue'
import PermissionFormDrawer from './PermissionFormDrawer.vue'
import { useStore } from 'vuex'
import PermissionGroupDrawer from './PermissionGroupDrawer.vue'
import { tableDefaultData, tableDataFormat } from '@/utils/table'
import notice from '@/utils/notice'
import { Plus, Search } from '@element-plus/icons-vue'

const drawer = ref(false)
const permissionGroupdrawer = ref(false)
const store = useStore()
const table = tableDefaultData()

const requestData = () => {
  table.loading = true
  getPermissionList(table.getQueryParams()).then( response => {
    tableDataFormat(response, table)
  })
}

requestData()

const formAction = ref('add')
const handleAdd = () => {
  formAction.value = 'add'
  drawer.value = true
}

const updateRow = ref({})
const handleEdit = (row) => {
  updateRow.value = row
  drawer.value = true
  formAction.value = 'edit'
}

const handleDelete = (index, row) => {
  deletePermission(row.id).then(() => {
    notice.deleteSuccess()
    table.data.splice(index, 1)
  })
}

watch(drawer, d => {
  if (!d) {
    updateRow.value = {}
  }
})

const hasAddPermission = computed(() => store.getters.hasPermission("permission.store"))
const hasUpdatePermission = computed(() => store.getters.hasPermission("permission.update"))
const hasDeletePermission = computed(() => store.getters.hasPermission("permission.destroy"))
const hasPermissionGroup = computed(() => store.getters.hasPermission("permission-group.index"))
</script>