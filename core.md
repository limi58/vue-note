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

# Getters
* 可以在 store 里定义一些 getter 方法
```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

// The getters will be exposed on the store.getters object:
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]

// 还可以有第二个参数，引用自身的 Getter
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -> 1
```

* mapGetters（todo）

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
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
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
