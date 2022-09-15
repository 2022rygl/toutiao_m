<template>
  <div class="home">
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          size="small"
          round
          block
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = !isShow"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        v-if="isShow"
        :myChannels="channels"
        @changeActive=";[(isShow = false), (active = $event)]"
        @delChannels="delChannelsFn"
        @addChannels="addChannelsFn"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import ChannelEdit from './components/ChannelEdit.vue'
import ArticleList from '../Home/components/ArticleList.vue'
import { getUserChannelsAPI, delChannelsAPI, addChannelsAPI } from '@/api'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'HomeIndex',
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  components: { ArticleList, ChannelEdit },
  watch: {},
  computed: {
    ...mapGetters(['isLogin'])
  },
  // 1. ?? ==>相对于 || ，常用于语句
  // 2. ?. ==> 可选链操作符， ?前面是undefined ，那么不会往后面取值
  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    initChannels() {
      if (this.isLogin) {
        // 已登录，发送请求获取用户自己的频道
        this.getUserChannels()
      } else {
        // 未登录
        // 先判断本地存储有没有数据，没有再发送请求，请求默认的频道数据
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getUserChannels()
        } else {
          this.channels = myChannels
        }
      }
    },
    async getUserChannels() {
      try {
        const { data } = await getUserChannelsAPI()
        // console.log(data)
        this.channels = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          error.response.status === 507 && this.$toast.fail('请刷新')
        }
      }
    },
    async delChannelsFn(id) {
      try {
        const newChannels = this.channels.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannelsAPI(id)
        } else {
          this.SET_MY_CHANNELS(newChannels)
        }
        // 视图更新
        this.channels = newChannels
        this.$toast.success('删除频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再删除')
        } else {
          throw error
        }
      }
    },
    async addChannelsFn(channel) {
      try {
        if (this.isLogin) {
          await addChannelsAPI(channel.id, this.channels.length)
        } else {
          this.SET_MY_CHANNELS([...this.channels, channel])
        }
        // 视图添加
        this.channels.push(channel)
        this.$toast.success('添加频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再添加')
        } else {
          throw error
        }
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.initChannels()
  }
}
</script>
<style lang="less" scoped>
.home {
  padding-bottom: 135px;
  .navbar {
    background-color: #3296fa;

    // inherit 继承
    // unset 不设置
    :deep(.van-nav-bar__title) {
      max-width: unset;
    }
    .van-button--default {
      background-color: #5babfb;
      border: 0;
      color: #fff;
      font-size: 30px;
    }

    .van-icon {
      color: #fff;
    }
    .van-button--block {
      width: 7.4rem;
    }
  }

  /* tabs导航条样式 */
  :deep(.van-tabs__wrap) {
    padding-right: 66px;

    .van-tabs__nav {
      padding-left: 0;
      padding-right: 0;

      /* tab标签 */
      .van-tab {
        border: 1px solid #eee;
        width: 200px;
        height: 82px;
      }

      /* tab标签下划线 */
      .van-tabs__line {
        width: 31px;
        height: 6px;
        background-color: #3296fa;
        bottom: 40px;
      }
    }
  }

  /* 字体图标 */
  .toutiao-gengduo {
    position: absolute;
    top: 0;
    right: 0;
    width: 66px;
    height: 82px;
    font-size: 40px;
    line-height: 82px;
    text-align: center;
    opacity: 0.6;
    border-bottom: 1px solid #eee;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 70%;
      width: 1px;
      background-image: url('@/assets/imgs/gradient-gray-line.png');
    }
  }

  // 弹出层
}
</style>
