//  user.js  hua'fenhuafen划分是根据后端接口文档
import request from '@/utils/request'

/**
 *登录
 * @param {String} mobile 手机号
 * @param {Number} code 验证码
 * @returns Promise
 */
export const loginAPI = (mobile, code) =>
  request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })

/**
 *发送验证码
 * @param {String} mobile   手机号
 * @returns Promise
 */
export const sendCodeAPI = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`
  })

// 获取用户自己信息
export const getUserInfoAPI = () =>
  request({
    url: '/v1_0/user'
  })
