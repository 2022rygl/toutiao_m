import request from '@/utils/request'

//
/**
 * 获取用户的频道
 * @returns Promise
 */
export const getUserChannelsAPI = () =>
  request({
    url: '/v1_0/user/channels'
  })
