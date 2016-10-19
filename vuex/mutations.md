# Mutations

* 让 state 变化的唯一方法就是 `commit mutation`

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // mutate state
      state.count++
    }
  }
})

// 提交变动
store.commit('increment')
```

* 可以加入一个载体

```js
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit('increment', 10)
```

* 可以用对象风格来 commit，这种方式更接近于 redux，我喜欢

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

* Mutations 必须是同步的，如果像下面那样是绝对不行的，因为不能准确追踪

```js
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```
