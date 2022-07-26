/**
 *
 * @param {String} lyric
 */
export function LyricParser(lyric) {
    const pattern = /(?<=^\[(\d\d):(\d\d.\d\d)\]).*/i

    const lyricWithTimeStamp = []
    lyric.split('\n').forEach(line => {
        if (pattern.test(line)) {
            const match = pattern.exec(line)
            const text = match[0] || '~'
            console.log(line)
            const timeStamp =
                (parseFloat(match[1]) * 60 + parseFloat(match[2])) * 1000
            lyricWithTimeStamp.push([timeStamp, text])
        }
    })
    return lyricWithTimeStamp
}

export function formatTime(timeStamp) {
    let min = Math.floor(timeStamp / 60)
        .toString()
        .padStart(2, 0)
    let sec = Math.floor(timeStamp % 60)
        .toString()
        .padStart(2, 0)

    return `${min}:${sec}`
}
