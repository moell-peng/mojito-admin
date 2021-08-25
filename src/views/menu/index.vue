<template>
  <el-card style="margin:10px;">
    <el-form :inline="false" :model="table.queryParams" size="small">
      <el-row :gutter="40"> 
        <el-col :span="8">
          <el-form-item :label="$t('guardName')">
            <guard-select v-model="table.queryParams.guard_name"></guard-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8" style="text-align:right">
          <el-button type="primary" @click="requestData" size="small">{{ $t('search') }}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <el-card style="margin:10px;">
    <table-action :title="$t('meta.title.menu')">
      <template #action>
        <el-button type="primary" v-if="hasAddPermission" size="small"  @click="handleAdd">{{ $t('add') }}</el-button>
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
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column
              align="center"
              :label="$t('actions')">
        <template #default="scope">
          <el-button
                  v-if="hasUpdatePermission"
                  size="mini"
                  type="text"
                  @click="handleEdit(scope.row)">{{ $t('edit') }}</el-button>
          <el-popconfirm v-if="hasDeletePermission" :title="$t('confirmDelete')" @confirm="handleDelete(scope.$index, scope.row)">
            <template #reference>
              <el-button size="mini" type="text">{{ $t('delete') }}</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <menu-form-drawer :row="updateRow" v-model="showFormDrawer" :action="formAction"></menu-form-drawer>
</template>

<script>
import GuardSelect from '@/components/Select/GuardSelect.vue'
import { getMenuList, deleteMenu } from '@/api/menu'
import MenuCascader from '@/components/Cascader/MenuCascader.vue'
import TableAction from '@/components/Table/TableAction.vue'
import MenuFormDrawer from './MenuFormDrawer.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { tableDefaultData } from '@/utils/table'
import notice from '@/utils/notice'

export default {
  name: 'adminUserIndex',
  components: {
    GuardSelect,
    MenuCascader,
    TableAction,
    MenuFormDrawer,
  },
  setup() {
    const showFormDrawer = ref(false)
    const store = useStore()
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

    return {
      showFormDrawer,
      table,
      requestData,
      handleDelete,
      updateRow,
      handleEdit,
      handleAdd,
      formAction,
      hasAddPermission: computed(() => store.getters.hasPermission("menu.store")),
      hasUpdatePermission: computed(() => store.getters.hasPermission("menu.update")),
      hasDeletePermission: computed(() => store.getters.hasPermission("menu.destroy")),
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
