<template>
  <div>
    <ArticleItem v-for="item in articles" :key="item.art_id" :article="item"> </ArticleItem>
  </div>
</template>

<script>
import ArticleItem from 'cpns/ArticleItem.vue'
import { getArticlesAPI } from '@/api'
export default {
  name: 'ArticleList',
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: []
    }
  },
  components: { ArticleItem },
  watch: {},
  computed: {},
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticlesAPI(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
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
<style lang="less" scoped></style>
