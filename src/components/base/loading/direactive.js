import { createApp } from 'vue'
import Loading from './Loading.vue'

/* 自定义指令的开发 */
const loadingDirective = {
    /* 组件挂载后 */
    mounted(el, binding) {
        /* 新建一个app实例 */
        const app = createApp(Loading)
        /* 挂载到新创建的div上 */
        // instance是一个组件实例
        const instance = app.mount(document.createElement('div'))

        el.instance = instance
        /* 表示是不是正在加载的状态 */
        if (binding.value) {
            append(el)
        }
    },
    /* 组件更新时 */
    updated(el, binding) {
        /* 加载状态发生了变化 */
        if (binding.value !== binding.oldValue) {
            binding.value ? append(el) : remove(el)
        }
    },
}

/**
 * @param {HTMLElement} el - 挂载点 */
function append(el) {
    /* 添加样式， 是的指令能够居中gif */
    const style = getComputedStyle(el)
    if (!['relative', 'absolute', 'fixed'].includes(style.position)) {
        el.classList.add('relative')
        // 用于区分原来就有的还是这里添加上去的
        el.__loading__ = true
    }

    el.appendChild(el.instance.$el)
}

/**
 * @param {HTMLElement} el*/
function remove(el) {
    if (el.__loading__) {
        el.classList.remove('realative')
    }
    el.removeChild(el.instance.$el)
}

export default loadingDirective
