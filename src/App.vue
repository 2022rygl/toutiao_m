<template>
  <div id="app">
    <!-- 一级路由挂载点 -->
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="less"></style>
