import React from "react"
import dayjs from "dayjs"
import { View, ScrollView } from "react-native"
import { VictoryLine, VictoryChart, VictoryAxis } from "victory-native"

import { MarginDiveder } from "src/components/MarginDiveder"

const length = 10

const VictoryHello: React.FC = () => {
  const randomNumbers = Array.from({ length }, (_, index) => {
    return {
      x: index,
      y: Math.random() * 1000,
    }
  })

  return (
    <VictoryChart>
      <VictoryLine data={randomNumbers} x="x" y="y" />
    </VictoryChart>
  )
}

const VictoryHelloWithAxis: React.FC = () => {
  const randomNumbers = Array.from({ length }, (_, index) => {
    return {
      x: index,
      y: Math.random() * 1000,
    }
  })

  return (
    <VictoryChart>
      <VictoryAxis domain={[0, length - 1]} />
      <VictoryAxis dependentAxis domain={[0, 2000]} />
      <VictoryLine data={randomNumbers} x="x" y="y" />
    </VictoryChart>
  )
}

const VictoryDateAxis: React.FC = () => {
  const startDate = dayjs("2020-06-25 04:00:58")
  const endDate = dayjs("2020-08-04 04:00:58")

  const data = [
    { x: startDate, y: Math.random() },
    { x: dayjs("2020-07-25 04:00:58"), y: Math.random() },
    { x: endDate, y: Math.random() },
  ]

  return (
    <VictoryChart>
      <VictoryAxis
        tickValues={[startDate, endDate]}
        tickFormat={(aDate: dayjs.Dayjs) => aDate.format("YYYY/MM/DD")}
      />
      <VictoryAxis dependentAxis domain={[0, 1]} />
      <VictoryLine data={data} x="x" y="y" />
    </VictoryChart>
  )
}

export const GraphScreen: React.FC = () => {
  return (
    <ScrollView>
      <VictoryHello />
      <MarginDiveder />
      <VictoryHelloWithAxis />
      <MarginDiveder />
      <VictoryDateAxis />
      <MarginDiveder />
    </ScrollView>
  )
}
