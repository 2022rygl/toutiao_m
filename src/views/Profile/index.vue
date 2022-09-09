<template>
  <div class="profile">
    <!-- 已登录结构 -->
    <div v-if="isLogin" class="login banner">
      <van-row></van-row>

      <van-row>
        <van-col span="12">
          <van-row type="flex" justify="space-around" align="center">
            <van-image
              round
              width="1.5rem"
              height="1.5rem"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <span class="mobile"> 13111111111 </span>
          </van-row>
        </van-col>
        <van-col span="5"> </van-col>
        <van-col span="7">
          <van-row
            type="flex"
            justify="center"
            align="center"
            style="height: 100%"
          >
            <van-button class="edit-btn" round size="mini">编辑按钮</van-button>
          </van-row>
        </van-col>
      </van-row>

      <van-row>
        <van-grid class="grid" :border="false">
          <van-grid-item text="头条">
            <template #icon>11</template>
          </van-grid-item>
          <van-grid-item text="粉丝">
            <template #icon>22</template>
          </van-grid-item>
          <van-grid-item text="关注">
            <template #icon>33</template>
          </van-grid-item>
          <van-grid-item text="获赞">
            <template #icon>44</template>
          </van-grid-item>
        </van-grid>
      </van-row>
    </div>
    <!-- /已登录结构 -->
    <!-- 未登录结构 -->
    <div v-else class="logout banner">
      <van-image
        width="1.76rem"
        height="1.76rem"
        :src="require('@/assets/imgs/mobile.png')"
      />
      <span class="text" @click="$router.push('/login')">登录 / 注册</span>
    </div>
    <!-- /未登录结构 -->

    <!-- 主体 -->
    <main>
      <van-grid :column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>

      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <!-- 底部 -->
    <footer>
      <van-button class="logout-btn" block v-if="isLogin" @click="onLogout"
        >退出登录</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MyIndex',
  props: {},
  data() {
    return {}
  },
  components: {},
  watch: {},
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    async onLogout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
      this.$store.commit('SetToken', {})
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
}
</script>
<style lang="less" scoped>
.profile {
  // 视口高度
  height: 100vh;
  background-color: #f5f7f9;
  .banner {
    width: 100%;
    height: 361px;
    background: url('@/assets/imgs/banner.png') no-repeat 0 0 / cover;
    // background-size: cover;
  }
  .logout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .text {
      font-size: 30px;
      color: #fff;
      margin-top: 10px;
    }
  }
  .login {
    display: flex;
    flex-direction: column;
    > .van-row {
      flex: 1;
    }
    .mobile {
      font-size: 30px;
      color: #fff;
    }
    .van-col {
      height: 100%;
    }
    .edit-btn {
      width: 1.6rem;
      height: 0.42667rem;
      color: #666;
    }
    :deep(.grid) {
      color: #fff;
      .van-grid-item__content {
        font-size: 30px;
        background-color: inherit;
      }
      .van-grid-item__text {
        color: #fff;
      }
    }
  }
  .link {
    padding: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: #ed5253;
  }
  .toutiao-lishi {
    color: #ffb31d;
  }
  .logout-btn {
    .van-button__text {
      font-size: 30px;
      color: red;
    }
  }
}
</style>
