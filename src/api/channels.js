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

// 获取所有频道列表
export const getAllChannelsAPI = () =>
  request({
    url: '/v1_0/channels'
  })
