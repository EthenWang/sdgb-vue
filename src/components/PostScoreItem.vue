<template>
  <Form
    label-position="top"
    ref="scoreItem"
    :model="playerScore"
    :rules="ruleValidate"
  >
    <Row type="flex" justify="center" :gutter="20">
      <Col span="5">
        <FormItem :label="`队名${index + 1}`" prop="teamId">
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
  </Form>
</template>

<script>
import { nickName, isTeamMatch } from '../utils'

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
    const validateTeam = (rule, value, callback) => {
      const teamMatch = isTeamMatch(this.rule.matchType)
      const gameScore = this.$parent.gameScore
      if (!teamMatch) {
        return callback()
      }
      if (!value) {
        return callback(new Error(`请选择队名`))
      }
      for (let i = 0; i < gameScore.length; i++) {
        if (i < this.index && gameScore[i].teamId === value) {
          return callback(new Error(`与第${i + 1}名同队`))
        }
      }
      callback()
    }
    return {
      colspan: 17,
      ruleValidate: {
        teamId: [
          { type: 'number', validator: validateTeam, trigger: 'change' }
        ],
        playerId: [
          { type: 'number', required: true, message: '网络ID必填', trigger: 'change' }
        ],
        score: [
          { type: 'number', required: true, message: '比分不能为空', trigger: 'blur' }
        ],
        break: [
          { type: 'number', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['players', 'rule']),
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
    nickName,
    validateInputs: function () {
      let validInput = false
      this.$refs.scoreItem.validate(pass => {
        validInput = pass
      })
      return validInput
    }
  }
}
</script>
