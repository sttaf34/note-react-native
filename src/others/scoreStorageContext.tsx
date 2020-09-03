/* eslint-disable @typescript-eslint/no-empty-function */

import React, { useState } from "react"
import AsyncStorage from "@react-native-community/async-storage"

import { log } from "src/others/usefulFunctions"
import { firestore } from "src/others/firebase"

const KEY_FOR_SCORES = "KEY_FOR_SCORES"

const scoresReference = firestore.collection("scores")

export type Score = {
  id: string
  value: number
}

type Context = {
  scores: Score[]
  writeError: Error | undefined
  createScore: () => void
  updateScore: (scoreId: string) => void
  deleteScore: (scoreId: string) => void
}

const initialContext: Context = {
  scores: [],
  writeError: undefined,
  createScore: () => {},
  updateScore: (scoreId: string) => console.log(scoreId),
  deleteScore: (scoreId: string) => console.log(scoreId),
}

export const ScoreContext = React.createContext(initialContext)

export const ScoreContextProvider: React.FC = (props: React.Props<unknown>) => {
  const [scores, setScores] = useState<Score[]>([])
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [writeError, setWriteError] = useState<Error | undefined>(undefined)

  if (isInitialLoading) {
    // エラー処理してない
    setIsInitialLoading(false)
    AsyncStorage.getItem(KEY_FOR_SCORES).then((jsonString) => {
      if (jsonString) {
        const previousSores: Score[] = JSON.parse(jsonString)
        setScores(previousSores)
      }
    })
  }

  const createScore = () => {
    const randomId = String(Math.random())
    const randomValue = Math.random() * 200
    log(`CREATE SCORE START  ${randomId}`)
    const newScore: Score = {
      id: randomId,
      value: randomValue,
    }
    const newScores = [...scores, newScore]
    setScores(newScores)
    log(`CREATE SCORE LOCAL  ${randomId}`)

    const jsonString = JSON.stringify(newScores)
    AsyncStorage.setItem(KEY_FOR_SCORES, jsonString)
      .then(() => {
        log(`CREATE SCORE STORAGE`)
      })
      .catch((error) => {
        setWriteError(error)
      })

    scoresReference
      .doc(randomId)
      .set(newScore)
      .then(() => {
        log(`CREATE SCORE SERVER ${randomId}`)
      })
      .catch((error) => {
        // ID の衝突とかセキュルティルール違反でエラーが返る
        setWriteError(error)
      })
  }

  const updateScore = (scoreId: string) => {
    const updateIndex = scores.findIndex((score) => score.id === scoreId)
    if (updateIndex === -1) {
      return
    }

    log(`UPDATE SCORE START  ${scoreId}`)
    const newRandomValue = Math.random() * 200
    const newScore: Score = {
      ...scores[updateIndex],
      value: newRandomValue,
    }
    const newScores = scores.slice()
    newScores[updateIndex] = newScore
    setScores(newScores)
    log(`UPDATE SCORE LOCAL  ${scoreId}`)

    const jsonString = JSON.stringify(newScores)
    AsyncStorage.setItem(KEY_FOR_SCORES, jsonString)
      .then(() => {
        log(`UPDATE SCORE STORAGE`)
      })
      .catch((error) => {
        setWriteError(error)
      })

    const patch = {
      value: newRandomValue,
    }
    scoresReference
      .doc(scoreId)
      .update(patch)
      .then(() => {
        log(`UPDATE SCORE SERVER ${scoreId} ${newRandomValue}`)
      })
      .catch((error) => {
        setWriteError(error)
      })
  }

  const deleteScore = (scoreId: string) => {
    log(`DELETE SCORE START  ${scoreId}`)
    const newScores = scores.slice().filter((score) => score.id !== scoreId)
    setScores(newScores)
    log(`DELETE SCORE LOCAL  ${scoreId}`)

    const jsonString = JSON.stringify(newScores)
    AsyncStorage.setItem(KEY_FOR_SCORES, jsonString)
      .then(() => {
        log(`DELETE SCORE STORAGE`)
      })
      .catch((error) => {
        setWriteError(error)
      })

    scoresReference
      .doc(scoreId)
      .delete()
      .then(() => {
        log(`DELETE SCORE SERVER ${scoreId}`)
      })
      .catch((error) => {
        setWriteError(error)
      })
  }

  const context: Context = {
    scores,
    writeError,
    createScore,
    updateScore,
    deleteScore,
  }

  const { children } = props
  return (
    <ScoreContext.Provider value={context}>{children}</ScoreContext.Provider>
  )
}
