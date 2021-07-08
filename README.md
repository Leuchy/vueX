> 初始化

1. 初始化一个vue工程
    ```shell
    # 创建工程
    vue create vuex-basic

    # 引入vuex
    vue add vuex
    ```
2. 使用`state`中的变量, 并通过`commit`/`dispatch`方法修改其中的值

> 替换引用文件

1. 复制`store`文件夹, 重命名为`mystore`

2. 修改`main.js`, 替换引入 store 为`mystore`

3. 修改`mystore/index.js`, 替换引入 vuex 为`myvuex`

> 实现Store类

1. 维持一个响应式状态state

    ```js
    this._vm = new Vue({
      data(){
        return {
          $$state: options.state,  
        }
      }
    });
    ```
    ```js
    get state() {
      return this._vm._data.$$state
    }

    set state(v){
      console.error('please use replaceState to reset state')
    }
    ```

2. 实现commit()

    ```js
    commit(type, payload) {
      const entry = this._mutations[type];
      if (!entry) {
        console.error('unknown mutation');
        return;
      }

      entry(this.state, payload);
    }
    ```

3. 实现dispatch()

    ```js
    dispatch(type, payload) {
      const entry = this._actions[type];
      if (!entry) {
        console.error('unknown action');
        return;
      }

      // 注意: this需要提前绑定
      entry(this, payload);
    }
    ```

4. getters
    ```js
    // (思考)
    ```

> 挂载$store

  ```js
  Vue.mixin({
    beforeCreate(){
      if (this.$options.store){
        Vue.prototype.$store = this.$options.store
      }
    }
  })
  ```