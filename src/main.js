import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context('./components', false, /Base[A-Z]\w+\.(vue|js)$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')))

  Vue.component(componentName, componentConfig.default || componentConfig)
})

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: 'UA-140868667-4',
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
