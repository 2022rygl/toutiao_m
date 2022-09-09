<template>
  <div class="layout">
    <!-- 二级路由挂载点 -->
    <router-view></router-view>
    <!-- 导航区域 -->

    <div class="tabbar">
      <!-- 路由模式：用item的to属性和当前路由的path对比，一样的就高亮 -->
      <van-tabbar route>
        <van-tabbar-item to="/">
          <template #icon>
            <span class="toutiao toutiao-shouye"></span>
            <span class="text">首页</span>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/video">
          <template #icon>
            <span class="toutiao toutiao-shipin"></span>
            <span class="text">视频</span>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/qa">
          <template #icon>
            <span class="toutiao toutiao-wenda"></span>
            <span class="text">问答</span>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/profile">
          <template #icon>
            <span class="toutiao toutiao-wode"></span>
            <span class="text">{{ isLogin ? '我的' : '未登录' }}</span>
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LayoutIndex',
  props: {},
  data() {
    return {}
  },
  components: {},
  watch: {},
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
}
</script>
<style lang="less" scoped>
.tabbar {
  :deep(.van-tabbar-item__icon) {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .toutiao {
    font-size: 40px;
  }
  .text {
    font-size: 30px;
  }
}
</style>
