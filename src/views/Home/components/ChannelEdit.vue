<template>
  <div class="channel-edit">
    <van-cell title="我的频道">
      <van-button
        class="editBtn"
        size="mini"
        round
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>

    <div class="my-pannel">
      <van-grid :border="false" :gutter="10">
        <van-grid-item
          v-for="(item, index) in myChannels"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          :class="{ active: item.name === '推荐' }"
          @click="handleMyChannels(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>

    <van-cell title="频道推荐"></van-cell>
    <div class="recommend-pannel">
      <van-grid :border="false" :gutter="10">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
export default {
  name: '',
  components: {},
  props: {
    myChannels: Array
  },
  data() {
    return {
      isEdit: false,
      allchannels: []
    }
  },
  watch: {},
  computed: {
    recommendChannels() {
      return this.allchannels.filter(
        (allchannelsItem) =>
          !this.myChannels.find(
            (myChannelsItem) => myChannelsItem.id === allchannelsItem.id
          )
      )
    }
  },
  methods: {
    async getAllChannels() {
      const res = await getAllChannelsAPI()
      // console.log(res)
      const { channels } = res.data.data
      this.allchannels = channels
    },
    handleMyChannels({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        console.log('删除')
      } else {
        this.$emit('changeActive', index)
        //
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getAllChannels()
  }
}
</script>
<style lang="less" scoped>
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}

.channel-edit {
  padding-top: 92px;
  .editBtn {
    width: 100px;
    font-size: 25px;
  }
  :deep(.van-grid-item__content) {
    background-color: #f4f5f6;
  }
  // 我的频道
  .my-pannel {
    // 编辑按钮居中
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    // 关闭按钮样式
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__content {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  :deep(.van-icon-cross) {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 25px;
    transform: translate(20%, -35%);
    border: 0.02667rem solid #000;
    border-radius: 50%;
    text-align: center;
    line-height: 0.32rem;
  }
  // 推荐频道
  .recommend-pannel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
