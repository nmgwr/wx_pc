<template>
  <div class="index">
    <el-container style="height: 100%; border: 1px solid #eee">
      <!-- 左侧 -->
      <el-aside :width="isCollapse ? '60px' : '230px'" style="background-color: rgb(238, 241, 246)">
        <div style="height: 6vh;background:#fff">
          <div v-show="!isCollapse">
            文字+logo图片
          </div>
          <div v-show="isCollapse">
            logo图片
          </div>
        </div>
        <div style="height: 12vh; background:#fff" v-show="!isCollapse">
          <el-row>
            <el-col :span="12">
              <img src="../../assets/img/touxiang.png" style="height:8vh;margin-top: 1.3vh;margin-left: 1.3vw;">
            </el-col>
            <el-col :span="12" style="margin-top: 2.5vh;line-height: 3vh;">
              <el-row>张三</el-row>
              <el-row>
                <el-dropdown>
                  <i class="el-icon-setting" style="margin-right: 2vh"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>编辑个人资料</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                    <el-dropdown-item>其他..</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <!-- 左侧菜单 左侧菜单最多支持三级 如果有一级菜单有子菜单才显示，否则不显示-->
        <el-menu :collapse="isCollapse" :unique-opened="true" :collapse-transition="false" style="height:100vh">
          <el-submenu v-for="(item_1,index_1) in menuData" v-if="item_1.child && item_1.child.length > 0" :key="index_1" :index="(index_1 + 1) + ''">
            <template slot="title">
              <i :class="item_1.icon"></i>
              <span slot="title">{{item_1.name}}</span>
            </template>
            <el-menu-item v-for="(item_2_1,index_2_1) in item_1.child" v-if="!item_2_1.child || item_2_1.child.length < 2" :key="index_2_1" :index="(index_1 + 1) + '-' + (index_2_1 + 1)">{{item_2_1.name}}</el-menu-item>
            <el-submenu v-for="(item_2_2,index_2_2) in item_1.child" v-if="item_2_2.child && item_2_2.child.length > 1" :key="index_2_2" :index="(index_1 + 1) + '-' + (index_2_2 + 1)">
              <template slot="title">{{item_2_2.name}}</template>
              <el-menu-item v-for="(item_3,index_3) in item_2_2.child" :key="index_3" :index="(index_1 + 1) + '-' + (index_2_2 + 1) + '-' + (index_3 + 1)">{{item_3.name}}</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <!-- 右侧顶部 -->
        <el-header style="font-size: 1.8vh; height: 6vh; line-height: 6vh;border-bottom:1px solid rgb(123, 117, 117);background:#d8c7a9">
          <el-row>
            <el-col :span="4" style="line-height: 7.5vh">
              <i class="el-icon-menu" style="font-size: 4vh" @click="collapse"></i>
            </el-col>
            <el-col :span="20" style="text-align: right">
              <span>一些小组件</span>
              <i class="el-icon-error"></i>
            </el-col>
          </el-row>
        </el-header>
        <!-- 右侧底部 -->
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    // 表格假数据
    const tableItem = {
      date: '2016-05-02',
      name: '温瑞',
      address: '巨华和谐园'
    }
    // 菜单假数据
    const menuItem = {
      name: '一级导航凑字数哈哈',
      icon: 'el-icon-message',
      child: [
        {
          name: '选项1'
        },
        {
          name: '选项2'
        },
        {
          name: '选项3'
        },
        {
          name: '选项4',
          child: [
            {
              name: '选项4-1'
            },
            {
              name: '选项4-2'
            }
          ]
        }
      ]
    }
    return {
      tableData: Array(20).fill(tableItem),
      menuData: Array(4).fill(menuItem),
      isCollapse: false // 菜单是否折叠，默认否
    }
  },
  methods: {
    // 折叠菜单
    collapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style scoped>
  .index {
    height: 100vh;
  }
  .el-header {
    background-color: #b3c0d1;
    color: #333;
  }
  .el-aside {
    color: #333;
  }
  aside::-webkit-scrollbar{
    width:2px;
    background-color: rgb(238, 241, 246)
  }
</style>
