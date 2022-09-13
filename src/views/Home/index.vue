<template>
  <div class="home">
    <van-nav-bar class="navbar">
      <template #title>
        <van-button size="small" round block icon="search">搜索</van-button>
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
        :myChannels="channels"
        @changeActive=";[(isShow = false), (active = $event)]"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import ChannelEdit from './components/ChannelEdit.vue'
import ArticleList from '../Home/components/ArticleList.vue'
import { getUserChannelsAPI } from '@/api'
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
  computed: {},
  // 1. ?? ==>相对于 || ，常用于语句
  // 2. ?. ==> 可选链操作符， ?前面是undefined ，那么不会往后面取值
  methods: {
    async getUserChannels() {
      try {
        const { data } = await getUserChannelsAPI()
        console.log(data)
        this.channels = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          error.response.status === 507 && this.$toast.fail('请刷新')
        }
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getUserChannels()
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
