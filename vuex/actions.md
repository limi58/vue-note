# Actions
* 他的作用不是改变 state，是提交 mutation
* 他可以包含任意异步代码和多个 commit mutation
* 下面是创建 action 的例子，context 包含 context.state， context.getters

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state, payload) {
      state.count++
    }
  },
  actions: {
    increment (context, payload) {
      context.commit('increment', payload)
    }
  }
})
```

* 触发 action：

```js
store.dispatch('increment')
// or
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

* store 注入后可以在组件里这样调用：this.$store.dispatch('xxx')
* 这样处理异步 action

```js
store.dispatch('actionA').then(() => {
  // ...
})

// or

actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```
