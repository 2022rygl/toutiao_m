<template>
  <div>
    <van-cell
      v-for="(item, index) in heightLightSuggestions"
      :key="index"
      icon="search"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
//   1.当输入了第一个字符：  才决定渲染SearchSuggestion

//  map
//  - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
// 动态正则
//  - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
// - new RegExp(字符串,修饰符'ig')

// 字符串的 replace
// - 字符串.replace(正则,函数)
//  - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { getSuggestionsAPI } from '@/api'
// 防抖
import { debounce } from 'lodash'
export default {
  name: '',
  components: {},
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  computed: {
    heightLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const res = await getSuggestionsAPI(this.keywords)
        // console.log(res)
        const { options } = res.data.data
        // this.suggestions = options.filter((item) => Boolean(item))
        this.suggestions = options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {}
}
</script>
<style lang="less" scoped></style>
