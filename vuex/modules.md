# Modules

* 因为是单一 state 树，所以这个树会越来越大，因此应该可以分模块处理：

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA's state
store.state.b // -> moduleB's state
```

* 在模块里的 mutation 和 getter，第一个参数将是这个模块的本地 state

```js
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment: (state) {
      // state is the local module state
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

* 同样的，在 action 里，context.state 将是本地 state, root state将是 context.rootState

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOdd ({ state, commit }) {
      if (state.count % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

* 在 getters 里, root state 将在第三个参数:

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

* 并不想用官方推荐的命名空间方案，和 redux 的 actionType 一样繁琐，其实只要做好变量命名的规范即可：模块_标识符
