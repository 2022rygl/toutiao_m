<template>
  <div class="searchResult">
    <van-list
      v-model="loading"
      :finished="finished"
      @load="getResults"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
    >
      <van-cell
        v-for="item in resultsList"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  components: {},
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      error: false,
      page: 1,
      perPage: 10,
      resultsList: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    async getResults() {
      try {
        // if (Math.random() < 0.5) throw new Error()
        const res = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        // console.log(res)
        const { results } = res.data.data
        // console.log(results)
        this.resultsList = [...this.resultsList, ...results]
        if (results.length === 0) this.finished = true
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.getResults()
  }
}
</script>
<style lang="less" scoped>
.searchResult {
  height: calc(100vh - 54px);
  overflow: auto;
}
</style>
