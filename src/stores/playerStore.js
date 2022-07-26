import { defineStore } from 'pinia'
import { PLAY_MODE } from '../assets/constant.js'
import { shuffle } from 'lodash-es'

const usePlayerStore = defineStore('player', {
    state: () => {
        return {
            sequenceList: [], // 歌曲列表
            playlist: [], // 播放列表,
            playing: false, // 是否正在播放
            playMode: PLAY_MODE.sequence, // 播放模式， 随机 顺序
            currentIndex: 0, // 当前播放歌曲的索引
            fullScreen: false, // 是否全屏播放
            audio: new Audio(), // audio
        }
    },
    getters: {
        currentSong: state => state.playlist[state.currentIndex] || {},
    },
    actions: {
        setPlayingState(playing) {
            this.playing = playing
        },
        setSequenceList(list) {
            this.sequenceList = list
        },
        setPlaylist(list) {
            this.playlist = list
        },
        setPlayMode(mode) {
            this.playMode = mode
        },
        setCurrentIndex(index) {
            index = index % this.playlist.length
            this.currentIndex = index
            // 切换为播放状态
            this.setPlayingState(true)
        },
        setFullScreen(fullScreen) {
            this.fullScreen = fullScreen
        },
        setReadyFalse() {
            ready = false
        },
        // 复合型
        play() {},

        selectPlay({ list, index }) {
            this.setPlayMode(PLAY_MODE.sequence)
            this.setSequenceList(list)
            this.setPlayingState(true)
            this.setPlaylist(list)
            this.setFullScreen(true)
            this.setCurrentIndex(index)
        },
        randomPlay(list) {
            this.setPlayMode(PLAY_MODE.random)
            this.setSequenceList(list)
            this.setPlayingState(true)
            this.setPlaylist(shuffle(list))
            this.setFullScreen(true)
            // this.setCurrentIndex(0)
        },
        changeMode(mode) {
            mode = mode % 3

            const songId = this.currentSong.id
            if (mode === PLAY_MODE.random) {
                this.randomPlay(this.sequenceList)
            } else if (mode === PLAY_MODE.sequence) {
                this.setPlaylist(this.sequenceList)
            }
            this.setPlayMode(mode)
            const newIdx = this.playlist.findIndex(song => song.id == songId)
            this.setCurrentIndex(newIdx)
        },
    },
})
export default usePlayerStore
