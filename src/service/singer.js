// 用于获取歌手列表以及歌手详情的数据

import { get } from './base'

export function getSingerList() {
    return get('api/getSingerList')
}

export function getSingerDetail(singer) {
    return get('api/getSingerDetail', {
        mid: singer.mid,
    })
}
