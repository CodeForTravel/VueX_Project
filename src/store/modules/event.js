import EventService from '@/services/EventService.js'

export const namespaced = true

export default {
    state: {
        events: [],
        eventsTotal: 0,
        event: {}
      },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event)
        },
        SET_EVENTS(state, events) {
            state.events = events
        },
        SET_EVENTS_TOTAL(state, eventsTotal) {
            state.eventsTotal = eventsTotal
        },
        SET_EVENT(state, event) {
            state.event = event
        }
    },
    actions: {
        createEvent({ commit, rootState}, event) {
            console.log('User creating Event is ' + rootState.user.user.name)
            return EventService.postEvent(event).then(() => {
                commit('ADD_EVENT', event)
            })
        },
        fetchEvents({ commit }, { perPage, page }) {
            EventService.getEvents(perPage, page)
            .then(response => {
                commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
                commit('SET_EVENTS', response.data)
            })
            .catch(error => {
                console.log('There was an error:', error.response)
            })
        },
        fetchEvent({ commit, getters }, id) {
            var event = getters.getEventById(id)
            if (event) {
            commit('SET_EVENT', event)
            } else {
            EventService.getEvent(id)
                .then(response => {
                commit('SET_EVENT', response.data)
                })
                .catch(error => {
                console.log('There was an error:', error.response)
                })
            }
        }
    },
    getters: {
        getEventById: state => id => {
            return state.events.find(event => event.id === id)
        }
    },
}

    






















// // import EventService from '@/services/EventService.js'
// import EventService from '../services/EventService'

// export const state = {
//       event: {},
//       total_events:0,
//       count: 2,
//       events:[]
  
//     },

// export const mutations = {
//       INCREMENT_COUNT(state,value){
//         console.log(value)
//         state.count += (value)
//       },
//       ADD_EVENT(state,event){
//         state.events.push(event)
//         console.log('pushed in metations')
//       },
//       SET_EVENTS(state,events){
//         state.events = events
//       },
//       SET_TOTAL_EVENTS(state,value){
//         state.total_events = value
//       },
//       SET_EVENT(state,event){
//         state.event = event
//       }
     
//     }
  
  
// export const   actions = {
//       updateCount({state,commit},value){
//         if(state.user){
//           commit('INCREMENT_COUNT',value)
//         }
//       },
//       createEvent({ commit }, event) {
//         return EventService.postEvent(event).then( () => {
//             commit('ADD_EVENT', event.data)
//           })
//       },
//       fetchEvents({ commit }, { perPage, page } ) {
//         EventService.getEvents(perPage, page)
//           .then(response => {
//             commit('SET_EVENTS', response.data)
//             commit('SET_TOTAL_EVENTS',response.headers['x-total-count'])
            
//           })
//           .catch(error => {
//             console.log('There was an error:', error.response)
//           })
//       },
//       fetchEvent({ commit,getters }, id ){
//         var event = getters.getEventById(id)
//         if(event) {
//           commit('SET_EVENT',event)
//         }
//         else { 
//           EventService.getEvent(id)
//           .then(response => {
//             commit('SET_EVENT',response.data)
//           })
//           .catch(error => {
//             console.log(error.response)
//             console.log('There was an error:', error.response)
//           }) 
//         }
//       },
//     }
  
  
//     export const getters ={
//       catLength: state => {
//         return state.categories.length
//       },
//       doneTodos: state => {
//         return state.todos.filter(todo => todo.done)
//       },
//       // activeTodoCount : (state,getters)=> {
//       //   return state.todos.length - getters.doneTodos.length
//       // },
//       activeTodoCount : state=> {
//          return state.todos.filter(todo => !todo.done).length
//       },
//   // Dynamin Getter
//       getEventById: (state) => (id) => {
//         return state.events.find(event => event.id === id)
//       },
        
//     }