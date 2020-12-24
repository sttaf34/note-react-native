import { fizzbuzz } from "../src/others/fizzbuzz"

describe("fizzbuzz()", () => {
  it("正常な場合", () => {
    const result = fizzbuzz(16)
    expect(result.length).toBe(16)
    expect(result[0]).toBe("1")
    expect(result[1]).toBe("2")
    expect(result[2]).toBe("fizz")
    expect(result[3]).toBe("4")
    expect(result[4]).toBe("buzz")
    expect(result[5]).toBe("fizz")
  })

  it("空配列が返される場合", () => {
    expect(fizzbuzz(0)).toEqual([])
    expect(fizzbuzz(-1)).toEqual([])
    expect(fizzbuzz(2.2)).toEqual([])
    expect(fizzbuzz(2 ** 54)).toEqual([])
  })
})
