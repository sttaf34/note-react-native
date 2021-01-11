import React from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import * as SQLite from "expo-sqlite"

import { SQLError, SQLResultSet, SQLTransaction } from "expo-sqlite"

import { StyledButton } from "src/components/StyledButton"

dayjs.extend(utc)

const database = SQLite.openDatabase("sample")

const executeSql = (sql: string, args: (string | number)[] = []): void => {
  database.transaction((transaction: SQLTransaction) => {
    transaction.executeSql(
      sql,
      args,
      (_, result: SQLResultSet) => {
        console.log(result)
      },
      (_, error: SQLError) => {
        console.log(error)
        return false
      }
    )
  })
}

const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      datetime TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `
  executeSql(sql)
}

const dropTable = () => {
  const sql = `DROP TABLE IF EXISTS workouts`
  executeSql(sql)
}

const insertA = () => {
  // datetime カラムに入る値は CURRENT_TIMESTAMP によって自動的に定まる
  // 2021-01-11T11:00:00+09:00 に実行したのであれば、
  // UTC に換算された "2021-01-11 02:00:00" が入っている
  const sql = `
    INSERT INTO workouts (id, name) VALUES (?, ?)
  `
  executeSql(sql, [100, "足の日"])
}

const selectA = () => {
  const sql = `
    SELECT * FROM workouts WHERE id = ?
  `
  executeSql(sql, [100])

  // SQLite から返された時差情報が含まれていない時刻文字列
  const datetimeString = "2021-01-11 02:00:00"

  // dayjs.tz.guess() なタイムゾーンを考慮した dayjs オブジェクトにする
  const dayjsObject = dayjs.utc(datetimeString).local()
  console.log(dayjsObject.format())
}

const insertB = () => {
  // 年月で丸めて GROUP BY する用のサンプルデータ
  // 2020-03-30T22:00:00Z 2020-03-31T07:00:00+09:00
  // 2020-03-31T22:00:00Z 2020-04-01T07:00:00+09:00
  // 2020-04-01T22:00:00Z 2020-04-02T07:00:00+09:00
  const utcDatetimes = [
    "2020-03-30 22:00:00",
    "2020-03-31 22:00:00",
    "2020-04-01 22:00:00",
  ]

  const sql = `
    INSERT INTO workouts (name, datetime) VALUES (?, ?)
  `

  utcDatetimes.forEach((datetimeString) => {
    executeSql(sql, ["全身の日", datetimeString])
  })
}

const selectB = () => {
  {
    // 現在タイムゾーンでの年月で丸められるので3月は1件になる
    const select = `
      SELECT
        strftime('%Y', datetime, 'localtime') AS year,
        strftime('%m', datetime, 'localtime') AS month,
        count(id) AS count
      FROM workouts
      GROUP BY strftime('%Y年%m月', datetime, 'localtime')
    `
    executeSql(select)
  }
  {
    // UTC での年月で丸められるので3月は2件になる
    const select = `
      SELECT
        strftime('%Y', datetime) AS year,
        strftime('%m', datetime) AS month,
        count(id) AS count
      FROM workouts
      GROUP BY strftime('%Y年%m月', datetime)
    `
    executeSql(select)
  }
}

export const SqliteDatetimeScreen: React.FC = () => {
  return (
    <>
      <StyledButton title="Create Table" onPress={createTable} />
      <StyledButton title="Drop Table" onPress={dropTable} />

      <StyledButton title="Insert A" onPress={insertA} />
      <StyledButton title="Select A" onPress={selectA} />

      <StyledButton title="Insert B" onPress={insertB} />
      <StyledButton title="Select B" onPress={selectB} />
    </>
  )
}
