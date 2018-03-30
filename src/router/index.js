import Vue from 'vue'
import Router from 'vue-router'
import Match from '@/components/Match'
import PostScore from '@/components/PostScore'
import MatchManage from '@/components/MatchManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Match',
      component: Match
    },
    {
      path: '/postscore/:gameId?',
      name: 'PostScore',
      component: PostScore,
      children: [
        { path: '', component: PostScore }
      ]
    },
    {
      path: '/matchmanage/:matchId?',
      name: 'MatchManage',
      component: MatchManage,
      children: [
        { path: '', component: MatchManage }
      ]
    }
  ]
})
