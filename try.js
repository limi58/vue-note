const str = 'haha'

const obj = {
  [str]() {
    console.log('xixi')
  }
}

obj.haha()
