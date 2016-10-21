# state
* 和 redux 一个样，也是用的是单个状态树，这样好处多多嘛，可以保存快照，记录应用的时刻状态
* state 要放 computed 里边，这样 state 改变的时候 computed property 会自动重新计算

```js
// let's create a Counter component
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```

* 有个更加方便的方法就是，在所有的子组件里注入 store

```js
import store from './stores/stores.js'
const app = new Vue({
  el: '#app',
  // provide the store using the "store" option.
  // this will inject the store instance to all child components.
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})

const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

* mapState（todo）
