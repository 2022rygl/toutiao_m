<template>
  <div class="login">
    <!-- 头部导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar" />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="form" class="loginForm">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            v-if="isShowBtn"
            class="codeBtn"
            round
            block
            size="small"
            type="default"
            @click="sendCode"
            native-type="button"
            >发送验证码</van-button
          >

          <van-count-down
            v-else
            :time="6 * 1000"
            format="ss秒"
            @finish="isShowBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { loginAPI, sendCodeAPI } from '@/api'
import { mobileRules, codeRules } from './rule'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowBtn: true
    }
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations(['SetToken']),
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit() {
      this.loading()
      try {
        const { data } = await loginAPI(this.mobile, this.code)
        console.log(data)
        // 将 token 存进 vuex
        this.SetToken(data.data)
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分失败：提示用户手机号和验证码
        // error：1，js抛出的错 2.axios 封装的error对象

        // axios封装的error对象
        // error.response.data   后端返回的数据
        // error.response.status   后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // js 导致错误 或者 507
          // console.dir(error)
          this.$toast.clear()
          throw error
        }
      }
    },
    // 发送验证码
    async sendCode() {
      // 1.验证手机号是否有效
      // form绑定ref
      await this.$refs.form.validate('mobile')
      // 验证成功后发请求
      this.loading()
      try {
        const { data } = await sendCodeAPI(this.mobile)
        this.isShowBtn = false
        console.log(data)
        this.$toast.success('发送验证码成功')
      } catch (error) {
        const { data, status } = error.response

        if (error.response && (status === 429 || status === 404)) {
          this.$toast.fail(data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
}
</script>
<style lang="less" scoped>
// scoped样式值作用于当前的组件
// vue-cli 提供了语法 :deep()  深度选择器

// ----头部导航栏
.page-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

:deep(.loginForm) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.codeBtn {
  height: 46px;
  background-color: #eee;
  color: #666;
}
</style>
