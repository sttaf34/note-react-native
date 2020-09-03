import React, { useState } from "react"
import dayjs from "dayjs"
import firebase from "firebase"
import { ScrollView, Button } from "react-native"

import { firestore } from "src/others/firebase"
import { MarginText } from "src/components/MarginText"
import { useRightButton } from "src/others/navigationHooks"

type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot<
  firebase.firestore.DocumentData
>

const scoresReference = firestore.collection("scores")

type Score = {
  id: string
  value: number
}

const log = (text: string) => {
  console.log(`${dayjs().format("mm:ss.SSS")} ${text}`)
}

export const FlatListFirestoreScreen: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([])

  // 初回のデータ取得
  React.useEffect(() => {
    const execute = async () => {
      const querySnapshot = await scoresReference.get()
      const snapshots: QueryDocumentSnapshot[] = querySnapshot.docs
      const newScores = snapshots.map((snapshot) => {
        const score: Score = {
          id: snapshot.id,
          value: snapshot.get("value"),
        }
        return score
      })
      setScores(newScores)
    }
    execute()
  }, [])

  // サーバへの追加は成功するとして、
  // レスポンスを待たずにローカルステートを更新してしまう
  const createScore = () => {
    log("作成開始")
    const randomId = String(Math.random())
    const randomValue = Math.random() * 200
    const newScore: Score = {
      id: randomId,
      value: randomValue,
    }
    scoresReference
      .doc(randomId)
      .set(newScore)
      .then(() => {
        log("サーバ追加完了")
      })
    const newScores = [...scores, newScore]
    setScores(newScores)
    log("ローカルステイト変更")
  }
  useRightButton(createScore, "追加")

  // サーバからの削除は成功するとして、
  // レスポンスを待たずにローカルステートを更新してしまう
  const deleteScore = async () => {
    log("削除開始")
    const newScores = scores.slice()
    newScores.pop()
    setScores(newScores)
    log("ローカル削除変更")

    const lastScore = scores[scores.length - 1]
    scoresReference
      .doc(lastScore.id)
      .delete()
      .then(() => {
        log(`サーバ削除完了 ${lastScore.id}`)
      })
  }

  const list = scores.map((score) => {
    return (
      <MarginText key={score.id}>
        {score.id.slice(0, 4)} / {score.value}
      </MarginText>
    )
  })

  return (
    <ScrollView>
      {list}
      <Button title="削除" onPress={deleteScore} />
    </ScrollView>
  )
}
