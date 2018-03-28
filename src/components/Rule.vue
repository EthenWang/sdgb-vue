<template>
  <Form>
    <FormItem label="比赛类型">
      <Row>
        <Col span="9">
          <Select v-model="model.matchType">
            <Option
              v-for="t in types"
              :value="t.code"
              :label="t.title"
              :key="t.code"
            >
            </Option>
          </Select>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Row>
        <Col span="2">
          <Checkbox v-model="model.globalRanking" @on-change="onChangeGlobalRanking">全场积分</Checkbox>
        </Col>
        <Col span="2">
          <FormItem label="比分1">
            <InputNumber v-model="model.points[0]" :disabled="model.globalRanking" placeholder="第1名得分"></InputNumber>
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem label="比分2">
            <InputNumber v-model="model.points[1]" :disabled="model.globalRanking" placeholder="第2名得分"></InputNumber>
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem label="比分3">
            <InputNumber v-model="model.points[2]" :disabled="model.globalRanking" placeholder="第3名得分"></InputNumber>
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem label="比分4">
            <InputNumber v-model="model.points[3]" :disabled="model.globalRanking" placeholder="第4名得分"></InputNumber>
          </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Row>
        <Col span="3">
          <FormItem label="团队最低局数">
            <InputNumber v-model="model.minTeamGames"></InputNumber>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem label="团队最低人数">
            <InputNumber v-model="model.minTeamPlayers"></InputNumber>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem label="团队最高人数">
            <InputNumber v-model="model.maxTeamPlayers"></InputNumber>
          </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Row>
        <Col span="3">
          <FormItem label="个人最低局数">
            <InputNumber v-model="model.minPlayerGames"></InputNumber>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem label="个人最高局数">
            <InputNumber v-model="model.maxPlayerGames"></InputNumber>
          </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Row>
        <Col span="10">
          <Input v-model="model.punishPoint" :number="true" :disabled="!model.breakPunish">
            <Checkbox v-model="model.breakPunish" slot="prepend" @on-change="onChangeBreakPunish">断线罚分</Checkbox>
          </Input>
        </Col>
      </Row>
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
