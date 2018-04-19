<template>
  <Modal
    v-model="show"
    class-name="vertical-center-modal"
    :title="mode === 'add' ? '添加队员' : '编辑队员'"
    :width="650"
    @on-ok="onOk"
    @on-cancel="onCancel"
    @on-visible-change="onChangeVisible">
    <Form label-position="right" ref="playerForm" :model="editPlayers" :label-width="50" :rules="ruleValidate">
      <Row :gutter="15">
        <Col span="14">
          <template v-if="mode === 'edit'">
            <FormItem label="队名" prop="teamId">
              <Select v-model="editPlayers.teamId" @on-change="onChangeTeam">
                <Option
                  v-for="team in teams"
                  :value="team.id"
                  :label="team.name"
                  :key="team.id"
                >
                </Option>
              </Select>
            </FormItem>
          </template>
          <template v-else>
            <FormItem label="队名" prop="teamName">
              <Input v-model="editPlayers.teamName"></Input>
            </FormItem>
          </template>
        </Col>
      </Row>
      <Row v-for="(player, index) in editPlayers.players" :key="index" :gutter="15">
        <Col span="14">
          <FormItem :label="`队员${index + 1}`" :prop="`players[${index}].name`">
            <Input v-model="player.name"></Input>
          </FormItem>
        </Col>
        <template v-if="mode === 'edit'">
          <Col span="10">
            <FormItem label="网络ID" :prop="`players[${index}].webId`">
              <Input v-model="player.webId"></Input>
            </FormItem>
          </Col>
        </template>
        <template v-else>
          <Col span="4" class-name="form-el">
            <Checkbox v-model="player.autoGenId">自动生成</Checkbox>
          </Col>
          <Col span="6">
            <FormItem label="网络ID" :prop="`players[${index}].webId`">
              <Input v-model="player.webId" :disabled="player.autoGenId"></Input>
            </FormItem>
          </Col>
        </template>
      </Row>
    </Form>
  </Modal>
</template>

<script>
import * as _ from 'lodash'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'EditPlayer',
  props: {
    mode: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      show: false,
      editPlayers: {
        teamId: 0,
        teamName: '',
        players: []
      }
    }
  },
  computed: {
    ...mapState(['players', 'rule']),
    ...mapGetters(['teams']),
    ruleValidate: function () {
      const validatePlayerName = function (rule, name, callback, source) {
        console.log(rule)
        console.log(source)
        if (!name) {
          return callback(new Error(`队员名必填`))
        }
        const { players } = this.players
        if (_.findIndex(players, p => p.playerName === name) !== -1) {
          return callback(new Error(`此名已存在`))
        }
        callback()
      }

      const validatePlayerWebId = function (rule, webId, callback, source) {
        console.log(rule)
        console.log(source)
        callback()
      }

      const { maxTeamPlayers } = this.rule
      const playerValidator = {}
      _.range(maxTeamPlayers).map(index => {
        playerValidator[`players[${index}].name`] = [
          { validator: validatePlayerName, trigger: 'blur' }
        ]
        playerValidator[`players[${index}].webId`] = [
          { validator: validatePlayerWebId, trigger: 'blur' }
        ]
      })

      return {
        teamId: [
          { type: 'number', required: true, message: '请选择队名', trigger: 'blur' }
        ],
        teamName: [
          { required: true, message: '队名必填', trigger: 'blur' }
        ],
        ...playerValidator
        /* name: [
          { validator: validatePlayerName, trigger: 'blur' }
        ],
        webId: [
          { validator: validatePlayerWebId, trigger: 'blur' }
        ] */
      }
    }
  },
  methods: {
    onChangeTeam: function () {
      const index = _.findIndex(this.players, p => p.team.id === this.editPlayers.teamId)
      if (index !== -1) {
        let players = [...this.players[index].players]
        for (let i = players.length; i < this.editPlayers.players.length; i++) {
          players.push({
            name: '',
            webId: '',
            id: 0,
            deleted: false,
            autoGenId: true
          })
        }
        this.editPlayers.players = players
      }
    },
    onOk: function () {
      this.$refs.playerForm.validate()
      this.onCancel()
    },
    onCancel: function () {
      this.show = false
    },
    onChangeVisible: function () {
      const { maxTeamPlayers } = this.rule
      this.editPlayers = {
        teamId: 0,
        teamName: '',
        players: _.range(maxTeamPlayers).map(n => ({
          name: '',
          webId: '',
          id: 0,
          deleted: false,
          autoGenId: true
        }))
      }
    }
  }
}
</script>
