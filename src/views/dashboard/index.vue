<template>
  <div style="padding: 10px">
    <div class="data-cards">
      <el-card>
        <div class="header">
          <div class="title">
            <el-icon><View /></el-icon>
            <span>访客数</span>
            <span class="sub-title">24小时内</span>
          </div>
        </div>
        <div class="number pointer" @click="router.push({name: 'eventIndex'})">20</div>
      </el-card>
      <el-card>
        <div class="header">
          <div class="title">
            <el-icon><User/></el-icon>
            <span>用户数</span>
          </div>
        </div>
        <div class="number">30</div>
      </el-card>
      <el-card>
        <div class="header">
          <div class="title">
            <el-icon><Sell /></el-icon>
            <span>订单数</span>
          </div>
        </div>
        <div class="number">66</div>
      </el-card>
      <el-card>
        <div class="header">
          <div class="title">
            <el-icon><Money /></el-icon>
            <span>成交额</span>
          </div>
        </div>
        <div class="number">$30000.00</div>
      </el-card>
    </div>
    <div class="data-cards">
      <el-card style="flex: 1 1 600px;" v-for="i in 2">
        <el-skeleton :rows="8" animated />
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {Money, Sell, User, View} from "@element-plus/icons-vue"
</script>
<style lang="scss" scoped>
.data-cards {
  display: flex;
  flex-wrap: wrap;
  .el-card {
    flex: 1 1 200px;
    margin: 10px;
    .number {
      padding-top: 1em;
      font-weight: 800;
      font-size: 1.5em;
    }
    .pointer {
      cursor: pointer;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    .title {
      font-weight: 600;
      display: flex;
      align-items: center;
      & span {
        margin-left: 5px;
      }
      .sub-title {
        font-weight: normal;
        font-size:12px;
      }
    }
    .action {
      display: flex;
      align-items: center;
    }
  }
}
</style>