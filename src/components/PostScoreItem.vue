<template>
  <Row type="flex" justify="center" :gutter="20">
    <Col span="5">
      <FormItem label="队名" prop="teamId">
        <Select v-model="playerScore.teamId">
          <Option
            v-for="team in teams"
            :value="team.id"
            :label="team.name"
            :key="team.id"
          >
          </Option>
        </Select>
      </FormItem>
    </Col>
    <Col span="6">
      <FormItem label="网络ID" prop="playerId">
        <Select v-model="playerScore.playerId">
          <Option
            v-for="player in teamPlayers"
            :value="player.id"
            :label="player.name"
            :key="player.id"
          >
          </Option>
        </Select>
      </FormItem>
    </Col>
    <Col span="3">
      <FormItem label="比分" prop="score">
        <InputNumber v-model="playerScore.score"></InputNumber>
      </FormItem>
    </Col>
    <Col span="3">
      <FormItem label="断线" prop="break">
        <InputNumber
          v-model="playerScore.break"
          :max="5"
          :min="0"
          :editable="false"
        ></InputNumber>
      </FormItem>
    </Col>
  </Row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
  data: function () {
    return {
      colspan: 17,
      ruleValidate: {
        playerId: [
          { required: true, message: '网络ID必填' }
        ],
        score: [
          { required: true, message: '比分不能为空' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['players']),
    ...mapGetters(['teams']),
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
