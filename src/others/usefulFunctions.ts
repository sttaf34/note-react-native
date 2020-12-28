import dayjs from "dayjs"

export const log = (text: string, format = "mm:ss.SSS"): void => {
  console.log(`${dayjs().format(format)} ${text}`)
}

export const sleep = async (milliseconds: number): Promise<void> => {
  return new Promise((resolve: () => void): void => {
    setTimeout((): void => {
      resolve()
    }, milliseconds)
  })
}
