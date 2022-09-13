<template>
  <div class="article">
    <van-pull-refresh v-model="reFreshLoading" @refresh="loadNextPageArticle">
      <van-list
        v-model="loading"
        @load="loadNextPageArticle"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，请重新加载"
        :immediate-check="false"
        offset="100"
        finished-text="没有更多了"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        >
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticlesAPI } from '@/api'
export default {
  name: 'ArticleList',
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      reFreshLoading: false,
      error: false
    }
  },
  components: { ArticleItem },
  watch: {},
  computed: {},
  methods: {
    async getFirstPageArticle() {
      try {
        const res = await getArticlesAPI(this.id, +new Date())
        const { pre_timestamp, results } = res.data.data
        this.articles = results
        this.preTimestamp = pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async loadNextPageArticle() {
      try {
        const res = await getArticlesAPI(this.id, this.preTimestamp)
        // console.log(res)
        const { pre_timestamp, results } = res.data.data
        if (!pre_timestamp) this.finished = true

        if (this.reFreshLoading) {
          this.articles.unshift(...results)
          this.$toast('刷新成功')
        } else {
          this.articles.push(...results)
        }
        this.preTimestamp = pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // finally 语句一定会执行
        this.loading = false
        this.reFreshLoading = false
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getFirstPageArticle()
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
}
</script>
<style lang="less" scoped>
.article {
  height: calc(100vh - 46px - 42px - 50px);
  overflow: auto;
  // & 代表当前父元素
  //  ::-webkit-scrollbar ；滚动槽
  //  ::-webkit-scrollbar-thumb ；滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lawngreen;
    border-radius: 10px;
  }
}
</style>
