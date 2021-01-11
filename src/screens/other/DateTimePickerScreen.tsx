import React from "react"
import dayjs from "dayjs"
import DateTimePicker, { Event } from "@react-native-community/datetimepicker"

export const DateTimePickerScreen: React.FC = () => {
  const minimumDate = dayjs("2020-01-01 00:00:00")
  const maximumDate = dayjs("2022-12-31 23:59:59")

  const [date, setDate] = React.useState(minimumDate.toDate())

  const onChange = (event: Event, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate)
    }
  }

  // minimumDate, maximumDate は選択肢から消えるのではなくて、
  // 範囲外にフォーカスしようとすると強制的に範囲内に戻されるようになってる

  return (
    <>
      <DateTimePicker
        mode="date"
        value={date}
        is24Hour
        display="spinner"
        onChange={onChange}
        locale="ja"
        minimumDate={minimumDate.toDate()}
        maximumDate={maximumDate.toDate()}
      />
    </>
  )
}
