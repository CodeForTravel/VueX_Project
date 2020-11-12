<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1 ">
      <router-link :to="{ name :'event-list', query:{ page: page-1 } }" ref="Prev">Previous Page</router-link>
    </template>
    |
    <template>
      <router-link v-if="nextPage" :to="{ name :'event-list', query:{ page: page+1 } }" ref="Next">Next Page</router-link>
    </template>
    
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  data(){
    return{
      perPage:3,
      nextPage(){
        return this.event.eventsTotal > this.page * this.perPage
      }
    }
  },
  created() {
    this.$store.dispatch('event/fetchEvents',  {
          perPage: 3,  // <-- How many items to display per page
          page: this.page // <-- What page we're on    
        })
  },
  computed: {
   page() {  // What page we're currently on
          return parseInt(this.$route.query.page) || 1
        },
    ...mapState(['event','user'])
  }
}
</script>
