import React from "react"
import * as SQLite from "expo-sqlite"
import {
  SQLError,
  SQLResultSet,
  SQLTransaction,
  SQLTransactionCallback,
} from "expo-sqlite"

import { StyledButton } from "src/components/StyledButton"

const db = SQLite.openDatabase("sample")

const logError = (error: SQLError) => {
  console.log(error)
}

const logSuccess = () => {
  console.log("SUCCESS")
}

const logResult = (transaction: SQLTransaction, resultSet: SQLResultSet) => {
  const { rows } = resultSet
  console.log(rows)
}

const createTable = () => {
  const create = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER,
      name TEXT,
      age INTEGER DEFAULT NULL
    )
  `
  const callback: SQLTransactionCallback = (transaction: SQLTransaction) => {
    transaction.executeSql(create)
  }
  db.transaction(callback, logError, logSuccess)
}

const dropTable = () => {
  const drop = "DROP TABLE IF EXISTS users"
  const callback: SQLTransactionCallback = (transaction: SQLTransaction) => {
    transaction.executeSql(drop)
  }
  db.transaction(callback, logError, logSuccess)
}

const select = () => {
  const callback = (transaction: SQLTransaction) => {
    transaction.executeSql("SELECT * FROM users;", [], logResult)
  }
  db.transaction(callback, logError, logSuccess)
}

const insertUser = () => {
  const insert = "INSERT INTO users (id, name, age) VALUES (?, ?, ?);"
  const callback = (transaction: SQLTransaction) => {
    transaction.executeSql(insert, [1, "sttaf34", 39])
    transaction.executeSql(insert, [2, "sttaf34", null])
  }
  db.transaction(callback, logError, logSuccess)
}

export const SqliteScreen: React.FC = () => {
  return (
    <>
      <StyledButton onPress={createTable} title="Create Table" />
      <StyledButton onPress={dropTable} title="Drop Table" />
      <StyledButton onPress={select} title="Select" />
      <StyledButton onPress={insertUser} title="Insert User" />
    </>
  )
}
