
const Home = () => import('../views/home/index')
const About = () => import('../views/about/index')
const Report = () => import('../views/report/index')
const Answer = () => import('../views/answer')
const Article = () => import('../views/article/index')
const ArticleRead = () => import('../views/article/article-read')
const Chat = () => import('../views/chat')
const Classes = () => import('../views/classes')
const Statistics = () => import('../views/statistics')
const Task = () => import('../views/tasknotice/index')
const Reply = () => import('../views/tasknotice/reply')
const Register = () => import('../views/register/index')
const NotFoundComponent = () => import('../views/exception/404')

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    mate: {
      title: '主页',
      icon: 'home',
      isLoading: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    mate: {
      isLoading: false
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
    mate: {
      title: '报告',
      icon: 'book',
      isLoading: true
    }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    mate: {
      title: '会议',
      icon: 'schedule',
      isLoading: true
    }
  },
  {
    path: '/classes',
    name: 'Classes',
    component: Classes,
    mate: {
      title: '班级',
      icon: 'usergroup-add',
      isLoading: true
    }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
    mate: {
      title: '数据统计',
      icon: 'bar-chart',
      isLoading: true
    }
  },
  {
    path: '/answer',
    name: 'Answer',
    component: Answer,
    mate: {
      title: '答疑',
      icon: 'bulb',
      isLoading: true
    }
  },
  {
    path: '/article',
    name: 'Article',
    component: Article,
    mate: {
      title: '文章',
      icon: 'book',
      isLoading: true
    }
  },
  {
    path: '/articleRead/:id',
    name: 'ArticleRead',
    component: ArticleRead,
    mate: {
      title: '阅读文章',
      icon: 'book',
      isLoading: false
    }
  },
  {
    path: '/tasknotice',
    name: 'Task',
    component: Task,
    mate: {
      title: '任务',
      icon: 'sound',
      isLoading: true
    }
  },
  {
    path: '/reply',
    name: 'reply',
    component: Reply,
    mate: {
      title: '任务回复',
      icon: 'sound',
      isLoading: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    mate: {
      title: '关于',
      icon: 'question-circle',
      isLoading: true
    }
  },
  {
    path: '/exception/403',
    name: '403',
    component: () => import('../views/exception/403'),
    mate: {
      isLoading: false
    }
  },
  {
    path: '/exception/500',
    name: '500',
    component: () => import('../views/exception/500'),
    mate: {
      isLoading: false
    }
  },
  {
    path: '/exception/404',
    name: '404',
    component: NotFoundComponent,
    mate: {
      isLoading: false
    }
  }
]
