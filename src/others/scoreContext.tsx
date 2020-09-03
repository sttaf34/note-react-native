/* eslint-disable @typescript-eslint/no-empty-function */

import React, { useState } from "react"
import { useCollectionDataOnce } from "react-firebase-hooks/firestore"

import { log } from "src/others/usefulFunctions"
import { firestore } from "src/others/firebase"

const scoresReference = firestore.collection("scores")

export type Score = {
  id: string
  value: number
}

type Context = {
  isLoading: boolean
  readError: Error | undefined
  writeError: Error | undefined
  scores: Score[]
  createScore: () => void
  updateScore: (scoreId: string) => void
  deleteScore: (scoreId: string) => void
}

const initialContext: Context = {
  isLoading: false,
  readError: undefined,
  writeError: undefined,
  scores: [],
  createScore: () => {},
  updateScore: (scoreId: string) => console.log(scoreId),
  deleteScore: (scoreId: string) => console.log(scoreId),
}

const useReadScoresOnce = (): {
  isLoading: boolean
  error: Error | undefined
  serverScores: Score[] | undefined
} => {
  const [serverScores, isLoading, error] = useCollectionDataOnce<Score>(
    scoresReference,
    { idField: "id" }
  )
  return { isLoading, error, serverScores }
}

export const ScoreContext = React.createContext(initialContext)

export const ScoreContextProvider: React.FC = (props: React.Props<unknown>) => {
  const [scores, setScores] = useState<Score[]>([])
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [writeError, setWriteError] = useState<Error | undefined>(undefined)
  const { isLoading, error: readError, serverScores } = useReadScoresOnce()

  if (isInitialLoading && serverScores) {
    setIsInitialLoading(false)
    setScores(serverScores)
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
    setScores((aScores) => {
      return aScores.filter((score) => score.id !== scoreId)
    })
    log(`DELETE SCORE LOCAL  ${scoreId}`)

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
    isLoading,
    readError,
    writeError,
    scores,
    createScore,
    updateScore,
    deleteScore,
  }

  const { children } = props
  return (
    <ScoreContext.Provider value={context}>{children}</ScoreContext.Provider>
  )
}
