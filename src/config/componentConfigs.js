
export const Components = {
  'Page': {
    'ReportMarking': () => import('../views/report/marking'),
    'UserInfo': () => import('../views/user/userInfo'),
    'Remind': () => import('../views/user/remind'),
    'Profile': () => import('../views/user/profile'),
    'ArticleWrite': () => import('../views/article/article-write')
  }
}
