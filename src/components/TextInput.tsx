import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useCanvas } from '../context/CanvasContext'

const InputContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 800px;
  padding: 0 2rem;
  z-index: 10;
`

const TextDisplay = styled.div`
  font-size: 2rem;
  line-height: 1.5;
  color: #000;
  text-align: center;
  min-height: 3rem;
  white-space: pre-wrap;
`

const Cursor = styled.span<{ $visible: boolean }>`
  display: inline-block;
  width: 2px;
  height: 2rem;
  background: #000;
  margin-left: 2px;
  vertical-align: middle;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.1s;
`

export const TextInput = () => {
  const { setCurrentText } = useCanvas()
  const [text, setText] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        setText(prev => prev.slice(0, -1))
      } else if (e.key.length === 1) {
        setText(prev => prev + e.key)
      }
      setCurrentText(text)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [text, setCurrentText])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <InputContainer ref={containerRef}>
      <TextDisplay>
        {text}
        <Cursor $visible={cursorVisible} />
      </TextDisplay>
    </InputContainer>
  )
} 