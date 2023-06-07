# 一、创建一个Vue应用

```node
npm init vue@latest	
```

这一指令会安装并执行create-vue

# 二、setup的解释

setup是一个开关：容许在script中书写组合式API

```js
<script setup>
</script>
```

# 三、计算属性computed

```js
import {computed, ref} from "vue";

const list=ref([1,2,3,4,5,6,7,8])

const computeState=computed(()=>{
  return list.value.filter(item=>item>2)
})

setTimeout(()=>{
  list.value.push(9,10)
},2000)
```

# 四、监视属性watch

```js
import {watch,ref} from "vue";
const count=ref(0)
const num=ref(10000)
//1、监听一个数据
// watch(count,(newValue,oldValue)=>{
//   console.log(`oldValue:${oldValue}`)
//   console.log(`newValue:${newValue}`)
// })

//2、监听多个数据
// watch([count,num],(newValue,oldValue)=>{
//   console.log(`oldValue:${oldValue}`)
//   console.log(`newValue:${newValue}`)
// })
watch([count,num],([newCount,newNum],[oldCount,oldNum])=>{
  console.log(`newCount:${newCount},newNum:${newNum}`)
  console.log(`oldCount:${oldCount},oldNum:${oldNum}`)
},{
  //立即执行，没有变化也执行
  immediate:true,
  deep:true
})

const info=ref({
  name:'cp',
  age:19
})
//3、只开启对一个数据的监听
watch(()=>info.value.age,()=>console.log('age发生变化'),{
  deep:true
})
```

# 五、父子通信-父传子

通过defineProps实现

```js
let props = defineProps({
  info:String
});
```

# 六、父子通信-子传父

基本思想：1、父组件中给子组件标签通过@绑定事件  2、子组件内部通过$emit方法触发事件

```vue
//父组件
<script setup>
import Son from './components/telecommunication/Son.vue'
import {ref} from "vue";
const info=ref('my info')

const showSonInfo=(sonInfo)=>{
  info.value=sonInfo
}
</script>

<template>
  <Son :info="info" @showSonInfo="showSonInfo"></Son>
  <h1>info:{{info}}</h1>
</template>

//子组件
<template>
  <button @click="sendInfo">发送信息</button>
</template>

<script setup>
//父传递给子的数据
import {ref} from "vue";

let props = defineProps({
  info: String
});


//子传递给父的数据
const sonInfo = ref('子传递给父的数据')
let emits = defineEmits(['showSonInfo']);
const sendInfo = () => {
  emits('showSonInfo',sonInfo)
}
</script>
```

当点击了子组件中的发送信息时，@click=“sendInfo"会执行，进而emits会触发自定义的showSonInfo事件，传递sonInfo信息到父组件中绑定自定义事件的控件中，然后通过@自定义事件的绑定函数接受从子组件中传过来的信息。

# 七、模板引用

```vue
<script setup>
import {onMounted, ref} from "vue";

//调用ref函数生成ref对象
const h1Ref=ref(null)

//组件挂载完毕之后
onMounted(()=>{
  console.log(h1Ref.value)
})
</script>

<template>
<!--给标签通过ref标识绑定ref对象-->
<h1 ref="h1Ref">哈哈</h1>
</template>
```

**注意：默认情况下在<script setup>语法糖下组件内部的属性和方法是不开放给父组件访问的，可以通过defineExpose编译宏指定那些属性和方法允许访问**

```js
defineExpose({
    name,
    setN
})
```

# 八、provide和inject

作用与场景：顶层组件向任意的底层组件传递数据和方法，实现跨层组件通信

```js
//父组件中
const appInfo=ref('app-->son info')
//使用provide向组件中发送一个消息，为key-value的形式
provide('appInfo',appInfo)
```

```js
//子组件中使用inject通过key获取value
const appInfo=inject('appInfo')
```

# 九、pinia（vuex的替代品）

```js
import {createPinia} from 'pinia'

const pinia=createPinia()

//使用类似于插件
app.use(pinia)
```

```js
// 创建store/counter.js
import {defineStore} from 'pinia'

//组合式api的写法
export const useCounterStore=defineStore('counter',()=>{
    const counter=ref(0)
    
    function increment=()=>{
        counter.value++
    }
    
    
    //getters:通过computed获取
    const dounleCounter=computed(()=>{
        return counter.value*2
    })

    //actions-->暴露出去
    const list=ref([])
    const getList=async ()=>{
        const ref=await axios.get(URL)

        list.value=ref.data.data.channels
    }
    return {
        counter,
        increment，
        doubleCounter,
        list,
        getList
    }
})
```

```js
// 使用store
import {useCounterStore} from 'store/counter.js'
const counterStore=useCounterStore()

//使用数据和方法
<h1>{{counterStore.count}}</h1>
<button @click="counterStore.increment"> +1 </button>
```

使用storeToRefs进行解构赋值

```js
//导入storeToRefs
import {storeToRefs} from 'pinia'

const counterStore = useCounterStore()

//直接解构赋值-->丢失响应式
// const {counter,doubleCounter}=counterStore

//使用storeToRefs对数据进行结构赋值
const {counter,doubleCounter}=storeToRefs(counterStore)

//方法还是直接进行结构赋值
const {increment}=counterStore
```

# 十、项目初始化

## 10.1 创建项目

```npm
npm init vue@latest	 
```

## 10.2 git管理

```
//创建本地仓库
git init

//
git add .

git commmit -m '首次提交'
```

## 10.3 配置别名路径联想提示

输入@/，就会联想出src下的所有子目录和文件

```js
//1、在项目的根目录下新增jsconfig.json文件

//2、添加json格式的配置项,如下:
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "scr/*"
      ]
    }
  }
}
```

## 10.4 安装element-plus

### 10.4.1 安装

```js
//npm install element-plus --save

//按需引入
//npm install -D unplugin-vue-components unplugin-auto-import

// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

## 10.5 定制主题

```
//1、安装scss -->npm i sass -D

//2、准备定制样式文件 --> styles/element/index.scss
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
     'primary': (
        'base': #27ba9b,
     ),
     'success': (
        'base': #61dc77,
     ),
     'warning': (
        'base': #ffb302,
     ),
     'danger': (
        'base': #e26237,
     ),
     'error': (
        'base': #cf4444,
     ),
     'info': (
        'base': #909399,
     ),
  ),
);

//3、对ElementPlus样式进行覆盖 -->通知element采用scss语言-->导入定制scss文件覆盖
//vite.config.js
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

export default defineConfig({
    plugins: [
       	//...
        Components({
            //配置elementPlus采用sass样式配色系统
            resolvers: [ElementPlusResolver({importStyle:'sass'})],
        }),
    ],
    css:{
      preprocessorOptions:{
          scss:{
              //2、自动导入定制化样式文件进行样式覆盖
              additionalData: `@use "@/styles/element/index.scss" as *;`
          }
      }
    },
```

## 10.6 axios基础配置

```
//安装
//npm i axios


//utils/http.js
//1、配置基础实例(统一接口配置)
//1.1 接口基地址
//1.2 接口超时时间
import axios from 'axios'

let httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
});

//1.3 请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

//1.4 响应拦截器
httpInstance.interceptors.response.use(res => {
    return res.data
}, error => {
    return Promise.reject(error)
})
export default httpInstance
```

### 10.6.1封装api接口函数

```js
// @/apis/testApi.js
import httpInstance from '@/utils/http.js'

export function getCategory(){
	return httpInstace({
		url:'home/category/head'
	})
}

// main.js进行测试
import {getCategory} from '@/apis/testApi.js'

getCategory().then(res=>{
	console.log(res)
},err=>{
	console.log(err)
})
```

注意：如果一个项目里面的不同业务有多个不同的基地址，可以通过axios.create()方法执行多次，每次执行都会生成一个新的实例，比如

```js
const http1=axios.create({
	baseURL:'url1'
})
const http2=axios.create({
	baseURL:'url2'
})
```

## 10.7 项目路由设计

可能会碰到组件命名的要求

```cjs
//.eslintrc.cjs
module.exports={
	rules:{
        'vue/multi-word-component-names':0//不再强制要求组件命名
    }
}
```

## 10.8 静态资源引入

## 10.9 静态模板搭建


$$

$$


