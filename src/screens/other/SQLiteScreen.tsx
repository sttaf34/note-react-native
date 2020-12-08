import React from "react"
import { View, Button, StyleSheet } from "react-native"
import { MarginDiveder } from "src/components/MarginDiveder"
import * as SQLite from "expo-sqlite"
import {
  SQLError,
  SQLResultSet,
  SQLTransaction,
  SQLTransactionCallback,
} from "expo-sqlite"

const db = SQLite.openDatabase("sample")

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  buttonContainer: {
    padding: 5,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
  },
})

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
  const callback: SQLTransactionCallback = (transaction: SQLTransaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT, age INTEGER);"
    )
  }
  db.transaction(callback, logError, logSuccess)
}

const select = () => {
  const callback = (transaction: SQLTransaction) => {
    transaction.executeSql("SELECT * FROM users;", [], logResult)
  }
  db.transaction(callback, logError, logSuccess)
}

const insert = () => {
  const callback = (transaction: SQLTransaction) => {
    transaction.executeSql(
      "INSERT INTO users (id, name, age) VALUES (1, 'sttaf34', 39);"
    )
  }
  db.transaction(callback, logError, logSuccess)
}

export const SqliteScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button onPress={createTable} title="Create Table" />
      </View>
      <MarginDiveder />

      <View style={styles.buttonContainer}>
        <Button onPress={select} title="Select" />
      </View>
      <MarginDiveder />

      <View style={styles.buttonContainer}>
        <Button onPress={insert} title="Insert" />
      </View>
    </View>
  )
}
