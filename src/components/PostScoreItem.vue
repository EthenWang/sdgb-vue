<template>
  <Form label-position="top">
    <Row type="flex" justify="center" :gutter="20">
      <Col span="5">
        <FormItem label="队名">
          <Select v-model="playerScore.teamId" @change="onTeamChange">
            <Option
              v-for="team in teams"
              v-if="team"
              :value="team.id"
              :key="team.id"
            >
              {{team.name}}
            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="网络ID">
          <Select v-model="playerScore.playerId">
            <Option
              v-for="player in teamPlayers"
              v-if="player"
              :value="player.id"
              :label="nickName(player)"
              :key="player.id"
            />
          </Select>
        </FormItem>
      </Col>
      <Col span="3">
        <FormItem label="比分">
          <InputNumber v-model="playerScore.score"></InputNumber>
        </FormItem>
      </Col>
      <Col span="3">
        <FormItem label="断线">
          <InputNumber
            v-model="playerScore.break"
            :max="5"
            :min="0"
            :editable="false"
          ></InputNumber>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script>
import { mapState } from 'vuex'
import * as actions from '../store/actions'
import * as _ from 'lodash'
import { nickName } from '../utils'

export default {
  name: 'PostScoreItem',
  props: {
    index: {
      type: Number,
      required: true
    },
    playerScore: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState([
      'teams', 'players'
    ]),
    teamPlayers: function () {
      return _.filter(this.players, { 'teamId': this.playerScore.teamId }) || []
    }
  },
  mounted: function () {
    this.$emit('scoreItemMounted', {
      colspan: 17
    })
  },
  methods: {
    nickName,
    onTeamChange: function (teamId) {
      this.$store.dispatch({
        type: actions.GET_TEAM_PLAYERS,
        teamId
      })
    }
  }
}
</script>
