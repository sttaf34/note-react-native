import React from "react"
import * as SQLite from "expo-sqlite"
import { ResultSetError, ResultSet } from "expo-sqlite"

import { StyledButton } from "src/components/StyledButton"

const database = SQLite.openDatabase("sample")

type Query = {
  sql: string
  args: (string | number)[]
}

const executeQueries = (queries: Query[]): void => {
  const callback = (
    error: Error | null | undefined,
    resultSet: (ResultSetError | ResultSet)[] | undefined
  ) => {
    console.log(error)
    console.log(resultSet)
  }
  // トランザクションなしのクエリ実行
  database.exec(queries, false, callback)
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

// 手動で BEGIN, COMMIT, ROLLBACK する
const insertBegin = () => {
  const queries = [
    {
      sql: "BEGIN TRANSACTION",
      args: [],
    },
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

const commit = () => {
  const sql = `COMMIT`
  executeQueries([{ sql, args: [] }])
}

const rollback = () => {
  const sql = `ROLLBACK`
  executeQueries([{ sql, args: [] }])
}

const select = () => {
  const sql = `SELECT * FROM workouts`
  executeQueries([{ sql, args: [] }])
}

export const SqliteBeginCommitScreen: React.FC = () => {
  return (
    <>
      <StyledButton onPress={createTable} />
      <StyledButton onPress={dropTable} />
      <StyledButton onPress={insertBegin} />
      <StyledButton onPress={commit} />
      <StyledButton onPress={rollback} />
      <StyledButton onPress={select} />
    </>
  )
}
