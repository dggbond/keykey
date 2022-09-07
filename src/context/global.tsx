import React, { createContext, ReactNode, useMemo, useState } from "react"
import generateText from '../text-generator'

interface StatData {
  speed: number
  accuracy: number
  typos: number
}

interface GlobalContextProps {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>

  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>

  curChar: string

  stat: StatData
  setStat: React.Dispatch<React.SetStateAction<StatData>>
}

const ctx = createContext<GlobalContextProps>({} as GlobalContextProps)

export const GlobalCtxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [text, setText] = useState(generateText({}))
  const [input, setInput] = useState('')
  const [stat, setStat] = useState<StatData>({
    speed: 0,
    accuracy: 0,
    typos: 0,
  })

  const curChar = useMemo(() => text[input.length], [text, input])

  return <ctx.Provider value={{
    text,
    setText,
    input,
    setInput,

    stat,
    setStat,

    curChar,
  }}>
    {children}
  </ctx.Provider>
}

export default ctx
