<template>
  <Modal
    v-model="show"
    class-name="vertical-center-modal"
    title="编辑队员"
    @on-ok="onOk"
    @on-cancel="onCancel">
    <Form label-position="right" :model="editPlayers" :label-width="50">
      <Row :gutter="20">
        <Col span="14">
          <FormItem label="队名">
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
        </Col>
      </Row>
      <Row v-for="(player, index) in editPlayers.players" :key="index">
        <Col span="14">
          <FormItem :label="`队员${index + 1}`">
            <Input v-model="player.name"></Input>
          </FormItem>
        </Col>
        <Col span="8" push="1">
          <FormItem label="网络ID">
            <Input v-model="player.webId"></Input>
          </FormItem>
        </Col>
        <Col span="1" push="1">
          <Icon type="minus-circled" color="red" class="side-icon"></Icon>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>

<script>
import * as _ from 'lodash'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'EditPlayer',
  data: function () {
    return {
      show: false,
      editPlayers: {
        teamId: 0,
        teamName: '',
        players: {}
      }
    }
  },
  created: function () {
    const { maxTeamPlayers } = this.rule
    this.$set(this.editPlayers, 'players',
      _.range(maxTeamPlayers).map(n => ({
        name: '',
        webId: '',
        id: 0
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
            id: 0
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
