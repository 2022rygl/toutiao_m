<template>
  <div>
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true" />
        <div v-else>
          <span @click="$store.commit('SET_HISTORIES', [])">全部删除</span>
          &nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>

    <van-cell
      v-for="item in histories"
      :key="item"
      :title="item"
      @click="!isEdit && $emit('change-keywords', item)"
    >
      <template #extra>
        <van-icon
          name="cross"
          v-show="isEdit"
          @click="
            $store.commit(
              'SET_HISTORIES',
              histories.filter((i) => item !== i)
            )
          "
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      isEdit: false
    }
  },
  watch: {},
  computed: {
    ...mapState(['histories'])
  },
  methods: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created() {}
}
</script>
<style lang="less" scoped></style>
