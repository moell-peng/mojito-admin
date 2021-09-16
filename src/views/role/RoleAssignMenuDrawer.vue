<template>
  <custom-scroll-drawer :title="$t('assignMenu')"  v-model="drawer" direction="ttb" :size="600">
    <el-card style="margin:10px;">
      <el-form :inline="false" :model="table.queryParams" size="small">
        <el-row :gutter="40"> 
          <el-col :span="8">
            <el-form-item :label="$t('guardName')">
              <guard-select v-model="table.queryParams.guard_name"></guard-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="8" style="text-align:right">
            <el-button type="primary" @click="loadData" size="small">{{ $t('search') }}</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card style="margin:10px;">
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
          :label="$t('globalDisplay')"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.is_display"
              disabled
              :active-text="$t('yes')"
              :active-value="1"
              :inactive-text="$t('no')"
              :inactive-value="0"
            />
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          :label="$t('assignMenu')"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.assigned"
              :active-text="$t('yes')"
              :inactive-text="$t('no')"
              @change="(e)=>toggleMenusFunc(scope.row,e)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <template #footer>
      <el-button @click="drawer = false" size="small">{{ $t('close') }}</el-button>
    </template>
  </custom-scroll-drawer>
</template>
<script>
import CustomScrollDrawer from '@/components/Drawer/CustomScrollDrawer.vue'
import { roleMenu, roleToggleMenu } from '@/api/role'
import { getMenuList } from '@/api/menu'
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { tableDefaultData } from '@/utils/table'
import { ElNotification } from 'element-plus'
import GuardSelect from '@/components/Select/GuardSelect.vue'

export default defineComponent({
  components: { 
    CustomScrollDrawer,
    GuardSelect,
  },
  name: 'RoleAssignMenuDrawer',
  props: {
    modelValue: false,
    roleId: {
      type: Number,
    },
    guardName: {
      type: String,
      default: 'admin',
    }
  },
  setup(props, { emit }) {
    const i18n = useI18n()
    const drawer = ref(props.modelValue)
    
    watch(() => props.modelValue, (v) => {
      drawer.value = v
    })
    watch(drawer, (d) => {
      emit("update:modelValue", d)
    })

    const table = tableDefaultData()

    let roleMenusList = ref([])

    const loadData = () => {
      table.loading = true
      const getMenuLists = getMenuList(table.queryParams)
      const roleMenus = roleMenu(props.roleId)
      Promise.all([getMenuLists, roleMenus]).then(result => {
        console.log(result[1], 'xxx')
        roleMenusList = result[1].data.data
        table.data = setAssigned(result[0].data.data)
        table.loading = false
      })
    }
    const setAssigned = (arr) => {
      arr.map(x=>{
        x.assigned = roleMenusList.includes(x.id)
        if (!x.hasOwnProperty('children')) {
          x.children = []
        }
        if (x.children.length > 0){
          x.children = setAssigned(x.children)
        }
        return x
      })
      return arr
    }

    const toggleMenusFunc = (row, bool) => {
      roleToggleMenu(props.roleId, [row.id]).then(response=>{
        if(response.status === 204){
          row.assigned = bool
          ElNotification.success({
            message: i18n.t('editSuccess')
          })
        }
      })
    }

    watch(() => props.roleId, (roleId) => {
      if (roleId) {
        loadData()
      }
    })

    return {
      drawer,
      toggleMenusFunc,
      loadData,
      table,
    }
  },
})
</script>
<style lang="scss" scoped>

</style>