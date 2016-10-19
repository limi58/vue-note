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
