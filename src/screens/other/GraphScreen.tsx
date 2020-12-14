import React from "react"
import dayjs from "dayjs"
import { ScrollView } from "react-native"
import { VictoryLine, VictoryChart, VictoryAxis } from "victory-native"

import { MarginDivider } from "src/components/MarginDivider"

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
  // 横軸を時刻にした場合、厳密に反映される
  const dates = [
    dayjs("2020-06-25"),
    dayjs("2020-06-26"),
    dayjs("2020-06-27"),
    dayjs("2020-06-28"),
    dayjs("2020-06-29"),
    dayjs("2020-08-04"),
    dayjs("2020-08-05"),
    dayjs("2020-08-25"),
    dayjs("2020-08-24"),
    dayjs("2020-08-26"),
    dayjs("2020-08-28"),
  ]

  const data = dates.map((aDate) => {
    return { x: aDate, y: Math.random() }
  })

  return (
    <VictoryChart>
      <VictoryAxis
        tickValues={[dates[0], dates[dates.length - 1]]}
        tickFormat={(aDate: dayjs.Dayjs) => aDate.format("YYYY/MM/DD")}
      />
      <VictoryAxis dependentAxis domain={[0, 1]} />
      <VictoryLine data={data} x="x" y="y" />
    </VictoryChart>
  )
}

const VictorySampleData: React.FC = () => {
  // 筋トレの何かの種目が順調に伸びていくようなサンプルデータ
  const data = [
    { x: dayjs("2020-01-01"), y: 45 },
    { x: dayjs("2020-02-26"), y: 52 },
    { x: dayjs("2020-03-27"), y: 50 },
    { x: dayjs("2020-04-28"), y: 55 },
    { x: dayjs("2020-05-29"), y: 55 },
    { x: dayjs("2020-06-30"), y: 60 },
    { x: dayjs("2020-07-31"), y: 60 },
    { x: dayjs("2020-09-01"), y: 55 },
    { x: dayjs("2020-10-02"), y: 65 },
    { x: dayjs("2020-11-03"), y: 70 },
    { x: dayjs("2020-12-04"), y: 70 },
    { x: dayjs("2020-12-30"), y: 75 },
  ]

  const tickValues = [data[0].x, data[data.length - 1].x]
  const tickFormat = (aDate: dayjs.Dayjs) => aDate.format("YYYY/MM/DD")

  return (
    <VictoryChart>
      <VictoryAxis tickValues={tickValues} tickFormat={tickFormat} />
      <VictoryAxis dependentAxis domain={[40, 90]} />
      <VictoryLine data={data} x="x" y="y" />
    </VictoryChart>
  )
}

export const GraphScreen: React.FC = () => {
  return (
    <ScrollView>
      <VictoryHello />
      <MarginDivider />
      <VictoryHelloWithAxis />
      <MarginDivider />
      <VictoryDateAxis />
      <MarginDivider />
      <VictorySampleData />
    </ScrollView>
  )
}
