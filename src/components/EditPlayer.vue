<template>
  <Modal
    v-model="show"
    class-name="vertical-center-modal"
    :title="mode === 'add' ? '添加队员' : '编辑队员'"
    :width="650"
    :loading="loading"
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
            <Checkbox v-model="player.autoGenId" @on-change="onOk">自动生成</Checkbox>
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
      loading: true,
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
      const getBindPlayer = fullField => {
        const f = _.propertyOf(this.editPlayers)
        const path = _.dropRight(_.toPath(fullField))
        return {
          index: path[path.length - 1],
          player: f(path)
        }
      }

      const validatePlayerName = ({ fullField }, name, callback) => {
        if (!name) {
          return callback(new Error(`队员名必填`))
        }
        if (this.mode === 'add' && _.findIndex(this.players, p => p.name === name) !== -1) {
          return callback(new Error(`此名已存在`))
        }

        const { index } = getBindPlayer(fullField)
        if (_.findIndex(this.editPlayers.players, (p, i) => p.name === name && i !== index) !== -1) {
          return callback(new Error(`此名已存在`))
        }
        callback()
      }

      const validatePlayerWebId = ({ fullField }, webId, callback) => {
        const { index, player } = getBindPlayer(fullField)
        console.log(player)
        if (!player.autoGenId) {
          if (!webId) {
            return callback(new Error(`网络ID必填`))
          }
          if (this.mode === 'add' && _.findIndex(this.players, p => p.webId === webId) !== -1) {
            return callback(new Error(`此ID已存在`))
          }
          if (_.findIndex(this.editPlayers.players, (p, i) => p.webId === webId && i !== index) !== -1) {
            return callback(new Error(`此ID已存在`))
          }
        }
        callback()
      }

      const { maxTeamPlayers } = this.rule
      const playerValidator = {}
      _.range(maxTeamPlayers).forEach(index => {
        playerValidator[`players[${index}].name`] = [
          { validator: validatePlayerName, trigger: 'blur' }
        ]
        playerValidator[`players[${index}].webId`] = [
          { validator: validatePlayerWebId, trigger: 'blur' }
        ]
      })

      return {
        teamId: [
          { type: 'number', required: true, message: '请选择队名', trigger: 'change' }
        ],
        teamName: [
          { required: true, message: '队名必填', trigger: 'blur' }
        ],
        ...playerValidator
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
            id: '',
            deleted: false,
            autoGenId: this.mode === 'add'
          })
        }
        this.editPlayers.players = players
      }
    },
    onOk: function () {
      this.$refs.playerForm.validate(valid => {
        if (!valid) {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          return
        }
        this.show = false
      })
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
          id: '',
          deleted: false,
          autoGenId: this.mode === 'add'
        }))
      }
    }
  }
}
</script>
