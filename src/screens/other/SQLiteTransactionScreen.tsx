import React from "react"
import * as SQLite from "expo-sqlite"
import { SQLError, SQLResultSet, SQLTransaction } from "expo-sqlite"

import { StyledButton } from "src/components/StyledButton"

const database = SQLite.openDatabase("sample")

type Query = {
  sql: string
  args: (string | number)[]
}

const executeQueries = (queries: Query[]): void => {
  database.transaction((transaction: SQLTransaction) => {
    queries.forEach((query) => {
      transaction.executeSql(
        query.sql,
        query.args,
        (_, result: SQLResultSet) => {
          console.log(result)
        },
        (_, error: SQLError) => {
          console.log(error)
          // true => エラー発生時にロールバックされる
          return true
        }
      )
    })
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
  executeQueries([{ sql, args: [] }])
}

const dropTable = () => {
  const sql = `DROP TABLE IF EXISTS workouts`
  executeQueries([{ sql, args: [] }])
}

const insert = () => {
  const queries = [
    {
      sql: "INSERT INTO workouts (name) VALUES (?)",
      args: ["背中の日"],
    },
    {
      // エラーになる
      sql: "INSERT INTO workouts (name) VALUES (?) ERROR",
      args: ["足の日"],
    },
  ]
  executeQueries(queries)
}

const select = () => {
  const sql = `SELECT * FROM workouts`
  executeQueries([{ sql, args: [] }])
}

export const SqliteTransactionScreen: React.FC = () => {
  return (
    <>
      <StyledButton onPress={createTable} />
      <StyledButton onPress={dropTable} />
      <StyledButton onPress={insert} />
      <StyledButton onPress={select} />
    </>
  )
}
