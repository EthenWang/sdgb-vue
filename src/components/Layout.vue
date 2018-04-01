<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-nav a {
  color: #d7dde4;
}
.layout-footer-center {
  text-align: center;
}
</style>

<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
          </div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="home"></Icon>
              <router-link to="/">成绩查询</router-link>
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              <router-link to="/postscore">报分</router-link>
            </MenuItem>
            <MenuItem name="3">
              <Icon type="settings"></Icon>
              <router-link to="/matchmanage">比赛管理</router-link>
            </MenuItem>
            <MenuItem name="4">
              <Icon type="log-in"></Icon>
              <router-link to="/">登录</router-link>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <slot></slot>
      </Content>
      <Footer class="layout-footer-center">
        <slot name="footer"></slot>
      </Footer>
    </Layout>
  </div>
</template>

<script>
export default {}
</script>
