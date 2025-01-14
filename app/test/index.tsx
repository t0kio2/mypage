import { useEffect, useRef, useState } from 'react'
import classes from './index.module.css'

const Test = () => {
  const ORIGIN_TEXT_LIST = [
    'Welcome to tokiolab.dev!',
    'React Router',
    'React Native',
    'Ruby on Rails'
  ]
  const [text, setText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const indexRef = useRef(1) // 再レンダリングを防ぐためにuseStateではなくuseRefを使う
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  const getRandomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    return chars[Math.floor(Math.random() * chars.length)]
  }

  const typeText = () => {
    const currentText = ORIGIN_TEXT_LIST[textIndex]
    const updatedText = currentText.slice(0, indexRef.current)
    setText(updatedText)

    if (indexRef.current < currentText.length) {
      const currentChar = currentText[indexRef.current]
      const isFinalChar = Math.random() > 0.8 // 80%の確立でランダム文字を表示しない
      const nextChar = isFinalChar ? currentChar : getRandomChar()

      setText((prev) => prev + nextChar)

      indexRef.current++
      timeoutId.current = setTimeout(typeText, 100)
    } else {
      timeoutId.current = setTimeout(eraseText, 800)
    }
  }
  
  const eraseText = () => {
    const currentText = ORIGIN_TEXT_LIST[textIndex]
    indexRef.current--
    const updatedText = currentText.slice(0, indexRef.current)
    setText(updatedText)

    if (indexRef.current > 0) {
      timeoutId.current = setTimeout(eraseText, 20)
    } else {
      setTextIndex((prev) => (prev + 1) % ORIGIN_TEXT_LIST.length)
      indexRef.current = 1
      timeoutId.current = setTimeout(typeText, 800)
    }
  }

  useEffect(() => {
    timeoutId.current = setTimeout(typeText, 500)
    return () => {
      timeoutId.current && clearTimeout(timeoutId.current)
    }
  }, [textIndex])
  return (
    <>
      <p className={classes.typingText}>{text}</p>
    </>
  )
}

export default Test