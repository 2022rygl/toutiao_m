import request from '@/utils/request'

// 获取联想建议（自动补全）
/**
 *
 * @param {String }q 请求的关键词
 * @returns Promise
 */
export const getSuggestionsAPI = (q) =>
  request({
    url: '/v1_0/suggestion',
    params: { q }
  })
// 获取搜索结果
/**
 *
 * @param {Number} page 分页页数，非必选，默认值为 1
 * @param {Number} per_page  每一页数据的数量
 * @param {String} q  搜索关键词
 * @returns
 */
export const getResultsAPI = (page, per_page, q) =>
  request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
