<template>
  <Form label-position="right">
    <Row type="flex" justify="center">
    <Col span="5">
      <FormItem label="">
        <Select v-model="playerScore.teamId">
          <template v-if="allTeams" v-for="team in allTeams">
            <Option :value="team.id" :key="team.id">{{team.name}}</Option>
          </template>
        </Select>
      </FormItem>
    </Col>
    <Col span="6">
      <FormItem label="">
        <Select v-model="playerScore.playerId">
          <template v-if="teamPlayers" v-for="player in teamPlayers">
            <Option :value="player.id" :key="player.id">{{player.name}}</Option>
          </template>
        </Select>
      </FormItem>
    </Col>
    <Col span="3">
      <FormItem label="">
        <Input :number="true" v-model="playerScore.score"/>
      </FormItem>
    </Col>
    <Col span="3">
      <FormItem label="">
        <Input :number="true" v-model="playerScore.break"/>
      </FormItem>
    </Col>
    </Row>
  </Form>
</template>

<script>
export default {
  name: 'PostScoreItem',
  props: {
    playerScore: {
      type: Object,
      required: true
    },
    allTeams: {
      type: Array,
      required: true
    },
    teamPlayers: {
      type: Array
    }
  }
}
</script>
