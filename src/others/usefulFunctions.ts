import dayjs from "dayjs"

export const log = (text: string, format = "mm:ss.SSS"): void => {
  console.log(`${dayjs().format(format)} ${text}`)
}
