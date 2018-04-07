<template>
  <Modal
    v-model="show"
    class-name="vertical-center-modal"
    title="添加队员"
    @on-ok="onOk"
    @on-cancel="onCancel">
    <Form label-position="right" :model="addPlayers" :label-width="50">
      <Row :gutter="20">
        <Col span="14">
          <FormItem label="队名">
            <Input v-model="addPlayers.teamName"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row v-for="(player, index) in addPlayers.players" :key="index">
        <Col span="14">
          <FormItem :label="`队员${index + 1}`">
            <Input v-model="player.name"></Input>
          </FormItem>
        </Col>
        <Col span="9" push="1">
          <FormItem label="网络ID">
            <Input v-model="player.webId"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>

<script>
import * as _ from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'AddPlayer',
  data: function () {
    return {
      show: false,
      addPlayers: {
        teamId: 0,
        teamName: '',
        players: {}
      }
    }
  },
  created: function () {
    const { maxTeamPlayers } = this.rule
    this.$set(this.addPlayers, 'players',
      _.range(maxTeamPlayers).map(n => ({
        name: '',
        webId: '',
        id: 0
      }))
    )
  },
  computed: {
    ...mapState(['players', 'rule'])
  },
  methods: {
    onOk: function () {
      this.onCancel()
    },
    onCancel: function () {
      this.show = false
    }
  }
}
</script>
