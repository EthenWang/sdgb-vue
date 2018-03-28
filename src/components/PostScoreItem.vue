<template>
  <Form label-position="top">
    <Row type="flex" justify="center" :gutter="20">
      <Col span="5">
        <FormItem label="队名">
          <Select v-model="playerScore.teamId">
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
              :label="player.name"
              :key="player.id"
            >
            </Option>
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
  mounted: function () {
    this.$emit('scoreItemMounted', {
      colspan: 17
    })
  },
  computed: {
    ...mapState(['players']),
    teams: function () {
      return this.players.map(p => p.team)
    },
    teamPlayers: function () {
      const index = _.findIndex(this.players, p => p.team.id === this.playerScore.teamId)
      if (index !== -1) {
        return this.players[index].players
      }
      return []
    }
  },
  methods: {
    nickName
  }
}
</script>
