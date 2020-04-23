import Vue from 'vue'
import VueRouter from 'vue-router'
import appConfig from '../app.config'

const Home = () => import('../views/home/index')
const About = () => import('../views/about/index')
const Report = () => import('../views/report/index')
const Answer = () => import('../views/answer')
const Article = () => import('../views/article/index')
const Chat = () => import('../views/chat')
const Classes = () => import('../views/classes')
const Statistics = () => import('../views/statistics')
const Task = () => import('../views/task')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    mate: {
      title: '主页',
      icon: 'home'
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
    mate: {
      title: '报告',
      icon: 'book'
    }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    mate: {
      title: '会议',
      icon: 'schedule'
    }
  },
  {
    path: '/classes',
    name: 'Classes',
    component: Classes,
    mate: {
      title: '班级',
      icon: 'usergroup-add'
    }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
    mate: {
      title: '数据统计',
      icon: 'bar-chart'
    }
  },
  {
    path: '/answer',
    name: 'Answer',
    component: Answer,
    mate: {
      title: '答疑',
      icon: 'bulb'
    }
  },
  {
    path: '/article',
    name: 'Article',
    component: Article,
    mate: {
      title: '文章',
      icon: 'book'
    }
  },
  {
    path: '/task',
    name: 'Task',
    component: Task,
    mate: {
      title: '任务',
      icon: 'sound'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    mate: {
      title: '关于',
      icon: 'question-circle'
    }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name + ' - ' + appConfig.title
  next()
})

export { router, routes }
