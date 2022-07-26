import { createApp } from 'vue'
import Loading from './Loading.vue'
import createLoadingLickDirective from '../../../directives/createLoadingLickDirective'

const loadingDirective = createLoadingLickDirective(Loading)

export default loadingDirective
