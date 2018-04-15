<template>
  <Modal
    v-model="show"
    class-name="vertical-center-modal"
    :title="mode === 'add' ? '添加队员' : '编辑队员'"
    :width="650"
    @on-ok="onOk"
    @on-cancel="onCancel">
    <Form label-position="right" :model="editPlayers" :label-width="50" :rules="ruleValidate">
      <Row :gutter="15">
        <Col span="14">
          <FormItem label="队名">
            <template v-if="mode === 'edit'">
              <Select v-model="editPlayers.teamId" @on-change="onChangeTeam" prop="teamId">
                <Option
                  v-for="team in teams"
                  :value="team.id"
                  :label="team.name"
                  :key="team.id"
                >
                </Option>
              </Select>
            </template>
            <template v-else>
              <Input v-model="editPlayers.teamName" prop="teamName"></Input>
            </template>
          </FormItem>
        </Col>
      </Row>
      <Row v-for="(player, index) in editPlayers.players" :key="index" :gutter="15">
        <Col span="14">
          <FormItem :label="`队员${index + 1}`">
            <Input v-model="player.name" prop="playerName"></Input>
          </FormItem>
        </Col>
        <template v-if="mode === 'edit'">
          <Col span="10">
            <FormItem label="网络ID">
              <Input v-model="player.webId" prop="playerWebId"></Input>
            </FormItem>
          </Col>
        </template>
        <template v-else>
          <Col span="4" class-name="form-el">
            <Checkbox v-model="player.autoGenId">自动生成</Checkbox>
          </Col>
          <Col span="6">
            <FormItem label="网络ID">
              <Input v-model="player.webId" :disabled="player.autoGenId" prop="playerWebId"></Input>
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
        players: {}
      },
      ruleValidate: {
        teamId: [
          { type: 'number', required: true, message: '请选择队名', trigger: 'blur' }
        ],
        teamName: [
          { required: true, message: '队名必填', trigger: 'blur' } // validator: validateTeam
        ],
        playerName: [

        ]
      }
    }
  },
  mounted: function () {
    const { maxTeamPlayers } = this.rule
    this.$set(this.editPlayers, 'players',
      _.range(maxTeamPlayers).map(n => ({
        name: '',
        webId: '',
        id: 0,
        deleted: false,
        autoGenId: true
      }))
    )
  },
  computed: {
    ...mapState(['players', 'rule']),
    ...mapGetters(['teams'])
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
            deleted: false
          })
        }
        this.$set(this.editPlayers, 'players', players)
      }
    },
    onOk: function () {
      this.onCancel()
    },
    onCancel: function () {
      this.show = false
    }
  }
}
</script>
