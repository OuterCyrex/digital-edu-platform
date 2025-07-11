import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import IndexView from "@/views/IndexView.vue";
import LoginView from "@/views/LoginView.vue";
import ClassView from "@/views/ClassView.vue";
import EmptyView from "@/views/EmptyView.vue";
import ClassDetail from "@/views/ClassDetail.vue";
import GameView from "@/views/GameView.vue";
import BoardView from "@/views/BoardView.vue";
import ProposalView from "@/views/ProposalView.vue";
import UserView from "@/views/UserView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
    children: [
      {
        path: '',
        name: 'class',
        component: ClassView,
      },
      {
        path: 'detail',
        name: 'detail',
        component: ClassDetail
      },
      {
        path: 'game',
        name: 'game',
        component: GameView
      },
      {
        path: '/user',
        name: 'user',
        component: UserView
      },
      {
        path: ':childPathMatch(.*)*',
        name: 'sub-not-found',
        component: EmptyView,
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {title: '数字化教学平台 - 首页'},
  },
  {
    path: '/board',
    name: 'board',
    component: BoardView
  },
  {
    path: '/proposal',
    name: 'proposal',
    component: ProposalView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: EmptyView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(() => {
    document.title = '西南石油大学 - 数字化教学平台'
})


export default router
