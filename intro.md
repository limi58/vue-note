# What is Vuex?
* 它把状态集中起来管理，然后在应用里服务所有的组件
* state： 驱动我们 app 的发动机
* view：状态的映射
* actions：用户在 view 里改变 state 的方式
![](http://vuex.vuejs.org/en/images/vuex.png)

# Getting Started
* vuex 是很具有活性的，state 改变时会立即更新组件
* 不能直接更改 store 的 state，只有明确的提交变动才可以。这样可以确保每次改变都有记录

```js
// Make sure to call Vue.use(Vuex) first if using a module system

const store = new Vuex.Store({
state: {
  count: 0
},
mutations: {
  increment (state) {
    state.count++
  }
}
})

// Now, you can access the state object as store.state, and trigger a state change with the store.commit method:
store.commit('increment')
console.log(store.state.count) // -> 1
```
