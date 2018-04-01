import Vue from 'vue'
import Router from 'vue-router'
import Match from '@/components/Match'
import PostScore from '@/components/PostScore'
import MatchManage from '@/components/MatchManage'
import Game from '@/components/Game'

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
      props: true
    },
    {
      path: '/matchmanage/:matchId?',
      name: 'MatchManage',
      component: MatchManage,
      props: true
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    }
  ]
})
