import React from "react"
import { View, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { ItemValue } from "@react-native-picker/picker/typings/Picker"

import { StyledSafeAreaView } from "src/components/StyledSafeAreaView"

const styles = StyleSheet.create({
  row: {
    height: "40%",
    flexDirection: "row",
  },
  left: {
    width: "33.3%",
    borderWidth: 0.5,
  },
  center: {
    width: "33.3%",
    borderWidth: 0.5,
  },
  right: {
    flex: 1,
    borderWidth: 0.5,
  },
})

export const PickerScreen: React.FC = () => {
  // 月毎の日数を考慮していない
  const years = [2018, 2019, 2020, 2021, 2022]
  const months = Array.from({ length: 12 }).map((_, index) => index + 1)
  const dates = Array.from({ length: 31 }).map((_, index) => index + 1)
  const hours = Array.from({ length: 24 }).map((_, index) => index)
  const minutes = Array.from({ length: 60 }).map((_, index) => index)

  const [year, setYear] = React.useState(years[2])
  const [month, setMonth] = React.useState(months[3])
  const [date, setDate] = React.useState(dates[4])
  const [hour, setHour] = React.useState(hours[11])
  const [minute, setMinute] = React.useState(minutes[33])

  const onChangeYear = (itemValue: ItemValue) => setYear(Number(itemValue))
  const onChangeMonth = (itemValue: ItemValue) => setMonth(Number(itemValue))
  const onChangeDate = (itemValue: ItemValue) => setDate(Number(itemValue))
  const onChangeHour = (itemValue: ItemValue) => setHour(Number(itemValue))
  const onChangeMinute = (itemValue: ItemValue) => setMinute(Number(itemValue))

  const pickerItemYears = years.map((aYear) => {
    return <Picker.Item label={String(aYear)} value={aYear} />
  })
  const pickerItemMonths = months.map((aMonth) => {
    return <Picker.Item label={String(aMonth)} value={aMonth} />
  })
  const pickerItemDates = dates.map((aDate) => {
    return <Picker.Item label={String(aDate)} value={aDate} />
  })
  const pickerItemHours = hours.map((aHour) => {
    return <Picker.Item label={String(aHour)} value={aHour} />
  })
  const pickerItemMinutes = minutes.map((aMinute) => {
    return <Picker.Item label={String(aMinute)} value={aMinute} />
  })

  return (
    <>
      <StyledSafeAreaView>
        <View style={styles.row}>
          <Picker
            style={styles.left}
            selectedValue={year}
            onValueChange={onChangeYear}
          >
            {pickerItemYears}
          </Picker>
          <Picker
            style={styles.center}
            selectedValue={month}
            onValueChange={onChangeMonth}
          >
            {pickerItemMonths}
          </Picker>
          <Picker
            style={styles.right}
            selectedValue={date}
            onValueChange={onChangeDate}
          >
            {pickerItemDates}
          </Picker>
        </View>
        <View style={styles.row}>
          <Picker
            style={styles.left}
            selectedValue={hour}
            onValueChange={onChangeHour}
          >
            {pickerItemHours}
          </Picker>
          <Picker
            style={styles.center}
            selectedValue={minute}
            onValueChange={onChangeMinute}
          >
            {pickerItemMinutes}
          </Picker>
        </View>
      </StyledSafeAreaView>
    </>
  )
}
