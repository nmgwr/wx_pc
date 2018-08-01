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
              <el-row>{{userInfo.name}}({{userInfo.loginName}})</el-row>
              <el-row>
                <el-dropdown @command="userinfoCommand">
                  <i class="el-icon-setting" style="margin-right: 2vh"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>编辑个人资料</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
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
            <el-menu-item @click='addTab(item_2_1)' v-for="(item_2_1,index_2_1) in item_1.child" v-if="!item_2_1.child || item_2_1.child.length < 2" :key="index_2_1" :index="(index_1 + 1) + '-' + (index_2_1 + 1)">{{item_2_1.name}}</el-menu-item>
            <el-submenu v-for="(item_2_2,index_2_2) in item_1.child" v-if="item_2_2.child && item_2_2.child.length > 1" :key="index_2_2" :index="(index_1 + 1) + '-' + (index_2_2 + 1)">
              <template slot="title">{{item_2_2.name}}</template>
              <el-menu-item @click='addTab(item_3)' v-for="(item_3,index_3) in item_2_2.child" :key="index_3" :index="(index_1 + 1) + '-' + (index_2_2 + 1) + '-' + (index_3 + 1)">{{item_3.name}}</el-menu-item>
                <!-- <a href="https://www.ele.me" target="_blank">订单管理</a> -->
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <el-header id="table" style="font-size: 1.8vh; height: 6vh; line-height: 6vh;border-bottom:1px solid rgb(123, 117, 117);background:#d8c7a9">
          <el-row>
            <el-col :span="4" style="line-height: 7.5vh">
              <i class="el-icon-menu" style="font-size: 4vh" @click="collapse"></i>
            </el-col>
            <el-col :span="20" style="text-align: right">
              <span>Tabs组件</span>
              <i class="el-icon-error"></i>
            </el-col>
          </el-row>
        </el-header>
        <!-- 右侧底部 -->
        <!-- 右侧tabs组件 -->
        <el-tabs v-model="editableTabsValue1" type="card" closable @tab-remove="removeTab">
          <el-tab-pane v-for="(item) in editableTabs1" :key="item.name" :label="item.title" :name="item.name">{{item.content}}</el-tab-pane>
        </el-tabs>
      </el-container>
    </el-container>
  </div>
</template>

<script>

// import cacheList from '../sys/cacheList.vue'
// import dataLog from '.vscode/src/sys/dataLog.vue'

export default {
  name: 'Index',
  data () {
    return {
      menuData: [], // 菜单假数据
      userInfo: '', // 用户信息、包含角色和菜单信息
      menus: '', // menus从info中解析出来
      isCollapse: false, // 菜单是否折叠，默认否
      // 默认首页tabs标签
      editableTabsValue1: '1',
      editableTabs1: [{
        title: '欢迎',
        name: '1',
        content: 'Welcome to you !'
      }],
      tabIndex: 1
    }
  },
  // components: {
  //   'cacheList': cacheList
  // 'dataLog': dataLog
  // },
  methods: {
    // 点击菜单添加tabs标签
    addTab (menu) {
      let newTabName = menu.name
      let menuHref = menu.href
      // let href = ''
      console.log(menuHref)
      this.editableTabs1.push({
        title: newTabName,
        name: newTabName,
        content: newTabName
      })
      // alert(href = '../sys/cacheList.vue')
      this.editableTabsValue1 = newTabName
      // this.$router.push({ path: '/sys/cacheLish.vue' })
      // this.$message('click on item ' + cacheList)
    },
    removeTab (targetName) {
      let tabs = this.editableTabs1
      let activeName = this.editableTabsValue1
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
        this.editableTabsValue1 = activeName
        this.editableTabs1 = tabs.filter(tab => tab.name !== targetName)
      }
    },
    // 折叠菜单
    collapse () {
      this.isCollapse = !this.isCollapse
    },
    // 个人信息下拉菜单点击
    userinfoCommand (command) {
      // 退出登陆
      if (command === 'logout') {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        this.$router.push({name: 'Login'})
      }
    },
    // 初始化菜单
    initMenu () {
      let menus = []
      // 把userInfo.menus的数据解析成menuItem这样的格式存入this.menus中
      // 一级菜单
      for (let i = 0; i < this.userInfo.menus.length; i++) {
        let menu1 = this.userInfo.menus[i]
        if (!menu1.child) {
          menu1.child = []
        }
        if (menu1.parentId === '0') {
          // 二级菜单
          for (let j = 0; j < this.userInfo.menus.length; j++) {
            let menu2 = this.userInfo.menus[j]
            if (!menu2.child) {
              menu2.child = []
            }
            if (menu2.parentId === menu1.id) {
              // 三级菜单
              for (let l = 0; l < this.userInfo.menus.length; l++) {
                let menu3 = this.userInfo.menus[l]
                if (menu3.parentId === menu2.id) {
                  menu2.child.push(menu3)
                }
              }
              menu1.child.push(menu2)
            }
          }
          menus.push(menu1)
        }
      }
      this.menuData = menus
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.initMenu()
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
