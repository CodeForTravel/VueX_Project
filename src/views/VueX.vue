<template>
 <div>
    <h1>Create Event</h1>

    <div>
      <!-- Mutation example -->
      <h4>Store Count : {{ $store.state.count }} </h4> 
      <input type="text" v-model.number="incremented_by">
      <input type="submit" @click="storeCount">
    </div>

    <h3> Creator : {{ user.name }}</h3>
    <p>This Article was created by -{{ user.name }}</p>
    <h4>User Id : {{ user.id }}</h4>
    <ul>
      <h4>Categories ({{ catCount }})</h4>
      <li v-for="cat in categories" :key="cat.id">
        {{ cat }}
      </li>
    </ul>
    <h4>Done Todos</h4>
      <ul>
        <li v-for="todo in doneTodos" :key="todo.id"> {{ todo.id   }}-{{ todo.done }} </li>
      </ul>

      <p>{{ activeTodoCount }}</p>

      <p>{{ todos }}</p>
      <h4>Events :</h4>
      <p>{{ getEvent(1) }}</p>
 </div>
</template>

<script>
  import { mapMutations, mapState } from "vuex"
   import { mapGetters } from 'vuex'

  export default {
    data(){
      return{
        incremented_by: 0
      }
    },
    methods:{
      storeCount(){
        this.$store.dispatch('event/updateCount',this.incremented_by)
      }
    },
//---------normal way to render store data
  // computed:{
  //   userName(){
  //     return this.$store.state.user.name
  //   },
  //   userId(){
  //     return this.$store.state.user.id
  //   }
  // }

//--------mapStore to  render store data ------------
    // computed: mapState({
    //   user : 'user',
    //   categories : 'categories'
    // })

//---------mapStore to  render store data in simple way with array-------
    // computed: mapState(['user','categories'])

//---------Object Spread Operator
    computed:{
      // catlength(){ return this.$store.state.categories.length },
      // catlength(){ return this.$store.getters.catLength },
      // doneTodos() { return this.$store.getters.doneTodos},
      // getEvent(){
      //   return this.$store.getters.getEventById
      // },
      ...mapState(['user','categories','todos']),
      ...mapGetters({
          catCount: 'catLength',
          getEvent: 'getEventById',
          doneTodos: 'doneTodos' ,
          activeTodoCount: 'activeTodoCount'
        }),
        // ...mapMutations['INCREMENT_COUNT']
    },

  }
</script>

<style scoped>

</style>>

 