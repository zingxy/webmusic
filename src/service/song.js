import { get } from './base'
export function processSongs(songs) {
    // 统一返回promise
    // 如果是空的直接返回（用promise包装一下）
    if (!songs.length) {
        return Promise.resolve(songs)
    }
    return get('/api/getSongsUrl', {
        mid: songs.map(song => song.mid),
    }).then(result => {
        // songMid -> songUrl
        const urls = result.map

        songs.forEach(song => (song.url = urls[song.mid]))
        return songs.filter(song => song.url.indexOf('vkey') > -1)
    })
}
// 缓存歌词

const cache = new Map()

window.cache = cache

export function getLyric(song) {
    const mid = song.mid
    if (cache.has(mid)) {
        return Promise.resolve(cache.get(mid))
    }
    return get('/api/getLyric', {
        mid,
    }).then(result => {
        const lyric = result ? result.lyric : '[00:00.00]NAN not available'
        cache.set(mid, lyric)
        return lyric
    })
}
