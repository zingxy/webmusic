import { get } from './base'

/**
 * 处理轮播图的请求 */
export function getRecommend(){
    return get('api/getRecommend')
}