import Vue from 'vue'
const Bus = new Vue({
  data : {
    store : {

    }
  },
  methods:{
    getter(key){
      return this.store.key
    },
    setter(key,value){
      this.store.key = value
    }
  }
})
export default Bus
