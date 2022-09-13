<template>
  <div>
    <van-cell
      v-if="article.cover.type === 0"
      :title="article.title"
      :label="label"
    />
    <van-cell
      v-else-if="article.cover.type === 1"
      :title="article.title"
      :label="label"
    >
      <van-image width="100" height="100" :src="article.cover.images[0]" />
    </van-cell>
    <van-cell v-else-if="article.cover.type === 3" :title="article.title">
      <template #label>
        <van-image
          v-for="(item, index) in article.cover.images"
          :key="index"
          width="100"
          height="100"
          :src="item"
        />
        <p>{{ label }}</p>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'

export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  watch: {},
  computed: {
    label() {
      const { aut_name, comm_count, pubdate } = this.article
      return `${aut_name} ${comm_count} 评论 ${dayjs(pubdate).fromNow()}`
    }
  },
  methods: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
}
</script>
<style lang="less" scoped></style>
