<template>
  <Form>
    <FormItem label="比赛类型">
      <Select v-model="model.matchType">
        <Option
          v-for="t in types"
          :value="t.code"
          :label="t.title"
          :key="t.code"
        >
        </Option>
      </Select>
    </FormItem>
    <FormItem>
      <Checkbox v-model="model.globalRanking" @on-change="onChangeGlobalRanking">全场积分</Checkbox>
    </FormItem>
    <FormItem label="比分1">
      <Input :number="true" v-model="model.points[0]" :disabled="model.globalRanking" placeholder="第1名得分"></Input>
    </FormItem>
    <FormItem label="比分2">
      <Input :number="true" v-model="model.points[1]" :disabled="model.globalRanking" placeholder="第2名得分"></Input>
    </FormItem>
    <FormItem label="比分3">
      <Input :number="true" v-model="model.points[2]" :disabled="model.globalRanking" placeholder="第3名得分"></Input>
    </FormItem>
    <FormItem label="比分4">
      <Input :number="true" v-model="model.points[3]" :disabled="model.globalRanking" placeholder="第4名得分"></Input>
    </FormItem>
    <FormItem label="团队最低局数">
      <Input :number="true" v-model="model.minTeamGames"></Input>
    </FormItem>
    <FormItem label="团队最低人数">
      <Input :number="true" v-model="model.minTeamPlayers"></Input>
    </FormItem>
    <FormItem label="团队最高人数">
      <Input :number="true" v-model="model.maxTeamPlayers"></Input>
    </FormItem>
    <FormItem label="个人最低局数">
      <Input :number="true" v-model="model.minPlayerGames"></Input>
    </FormItem>
    <FormItem label="个人最高局数">
      <Input :number="true" v-model="model.maxPlayerGames"></Input>
    </FormItem>
    <FormItem>
      <Input :number="true" v-model="model.punishPoint" :disabled="!model.breakPunish">
        <Checkbox v-model="model.breakPunish" slot="prepend" @on-change="onChangeBreakPunish">断线罚分</Checkbox>
      </Input>
    </FormItem>
  </Form>
</template>

<script>
import { matchTypes } from '../utils'

export default {
  name: 'Rule',
  /* props: {
    matchType: {
      type: String,
      required: true
    },
    minTeamPlayers: {
      type: Number,
      required: true
    },
    maxTeamPlayers: {
      type: Number,
      required: true
    },
    minTeamGames: {
      type: Number,
      required: true
    },
    minPlayerGames: {
      type: Number,
      required: true
    },
    maxPlayerGames: {
      type: Number,
      required: true
    },
    globalRanking: {
      type: Boolean,
      required: true
    },
    points: {
      type: Array,
      required: true
    },
    breakPunish: {
      type: Boolean,
      required: true
    },
    punishPoint: {
      type: Number,
      required: true
    }
  }, */
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  computed: {
    types: () => matchTypes
  },
  methods: {
    onChangeGlobalRanking: function (val) {
      if (val) {
        this.model.points.forEach(point => { point = 0 })
      }
    },
    onChangeBreakPunish: function (val) {
      if (!val) {
        this.model.punishPoint = 0
      }
    }
  }
}
</script>
