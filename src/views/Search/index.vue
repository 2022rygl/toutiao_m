<template>
  <div class="search">
    <form action="/">
      <!-- 搜索框 -->
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="$router.push('/')"
        @search="onSearch"
        @focus="isShowSearchResult = false"
      />
    </form>
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'SearchIndex',
  components: { SearchHistory, SearchResult, SearchSuggestion },
  props: {},
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  watch: {},
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索历史： 搜索框的值为空
      // 搜索建议 ：搜索框有值，并且不渲染搜索结果
      //  搜索结果：触发搜索时，显示搜索结果
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 把keywords 关键词存起来
      // 1.用户手动敲回车  2.点击了搜索
      // 对搜索历史 去重
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  //   [role='button'] {
  //
  //   }
  .van-search__action {
    color: #fff;
  }
}
</style>
