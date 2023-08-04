import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import TaskManagerView from '@/views/TaskManagerView.vue'
import SuspectMinerTraining from '@/views/SuspectMinerTrainingView.vue'
import { useUserStore } from '@/stores/UserStore';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/suspect-miner/training',
      name: 'suspectMinerTraining',
      component: SuspectMinerTraining
    },
    {
      path: '/task-manager',
      name: 'taskManager',
      component: TaskManagerView
    },
  ]
})

router.beforeEach((to, from, next) =>{
  const userStore = useUserStore()
  if(document.body.classList.contains('overflow-hidden')){
    document.body.classList.remove('overflow-hidden')
  }

  if(!userStore.token && to.name !== 'login'){
    userStore.$reset()
    next({name: 'login'})
  }else{
    next()
  }
})

export default router
