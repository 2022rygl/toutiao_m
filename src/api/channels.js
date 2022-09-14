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

/**
 *删除指定用户频道
 * @param {Number | String} id 频道id
 * @returns Promise
 */
export const delChannelsAPI = (id) =>
  request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })

/**
 * 新增用户频道
 * @param {Number | String} id   新增频道的id
 * @param {Number} seq  新增频道的索引值
 * @returns
 */
export const addChannelsAPI = (id, seq) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
