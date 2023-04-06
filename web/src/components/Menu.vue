<!--  -->
<template>
  <div class="menu">
    <div class="menu-inner">
      <a-row class="grid-demo" justify="start">
        <a-col class="logo" :span="3">
          <RouterLink active-class="" to="/"
            ><div>病毒研讨大会</div><div class="line" v-if="$route.path === '/'"></div>
          </RouterLink>
        </a-col>

        <a-col class="btn" :span="2">
          <RouterLink active-class="" to="/tree"
            ><div><icon-book /> 树</div>
            <div class="line" v-if="$route.path === '/tree'"></div>
          </RouterLink>
        </a-col>
        <a-col class="btn" :span="2">
          <RouterLink active-class="" to="/upload"
            ><div><icon-upload /> 上传</div>
            <div class="line" v-if="$route.path === '/upload'"></div>
          </RouterLink>
        </a-col>
        <a-col class="btn" :span="2">
          <RouterLink active-class="" to="/help"
            ><div><icon-question-circle /> 帮助</div>
            <div class="line" v-if="$route.path === '/help'"></div>
          </RouterLink>
        </a-col>
        <a-col :span="11"> </a-col>
        <a-col class="btn" :span="2">
          <div><icon-user-add /> 注册</div>
        </a-col>
        <a-col class="btn" :span="2">
          <div><icon-import /> 登录</div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
</script>
<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

.menu {
  width: 100%;
  height: 6vh;
  /* padding: 1vh 2vw; */
  text-align: center;
  font-size: 1.3em;
  letter-spacing: 0.05em;
  font-family: Microsoft JhengHei;
  font-weight: bold;
  overflow-x: hidden;
}

.menu-inner {
  margin: 1vh 2vw;
  height: 5vh;
  line-height: 5vh;
  background-color: #e4e5ea;
  border-radius: 10px;
}

.logo:hover {
  cursor: pointer;
}

.btn {
  background-color: transparent;
  color: #141413;
  transition: 140ms;
  border-radius: 10px;
  position: relative;
  z-index: 1;
}

.btn:hover {
  background-color: rgba(22,93,255,0.9);
  cursor: pointer;
  transition: 140ms;
  color: rgb(239, 235, 235);
  background-clip: content-box;
}

.line {
  height: 0.5vh;
  /* margin: -0.5vh auto; */
  top: -0.5vh;
  margin-bottom: -0.5vh;
  margin-left: 25%;
  margin-right: 25%;
  border-radius: 0.5vh;
  width: 50%;
  background-color: rgba(22,93,255,0.9);;
  position: relative;
  transition: 140ms;
}
</style>