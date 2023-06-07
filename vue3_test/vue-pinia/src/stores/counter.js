import {defineStore} from "pinia/dist/pinia";
import {computed, ref} from "vue";
import axios from 'axios'
const API_URL='http://geek.itheima.net/v1_0/channels'
export const useCounterStore=defineStore('counter',()=>{
    const  counter=ref(0)
    function increment(){
        counter.value++
    }

    //getter定义
    const doubleCounter=computed(()=>counter.value*2)

    //定义异步action
    const list=ref([])

    const getList=async () => {
        const  res = await axios.get(API_URL);
        console.log(res.data)
        list.value=res.data.data.channels

    }

    return {
        counter,
        doubleCounter,
        increment,
        list,
        getList
    }
})
