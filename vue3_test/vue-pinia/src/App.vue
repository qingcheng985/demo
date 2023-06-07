<script setup>
import {useCounterStore} from "./stores/counter";
import {onMounted} from "vue";

//导入storeToRefs
import {storeToRefs} from 'pinia'

const counterStore = useCounterStore()

//直接解构赋值-->丢失响应式
// const {counter,doubleCounter}=counterStore

//使用storeToRefs对数据进行结构赋值
const {counter,doubleCounter}=storeToRefs(counterStore)

//方法还是直接进行结构赋值
const {increment}=counterStore

onMounted(() => {
  counterStore.getList()
})
</script>

<template>
  <!-- -->
  <!--<h1>{{ counterStore.counter }}</h1>-->
  <h1>{{counter}}</h1>
  <h1>{{ counterStore.doubleCounter }}</h1>
  <button @click="counterStore.increment   ">+1</button>
  <ul>
    <li v-for="item in counterStore.list"
        :key="item.id">
      {{ item.name }}
    </li>
  </ul>
  1
</template>

<style scoped>
</style>
