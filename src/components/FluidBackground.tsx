import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: white;
`

export const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEEAD'
    ]

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw border glow
      const borderWidth = 20
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      
      colors.forEach((color, i) => {
        const offset = (i / colors.length) + (time * 0.0001)
        gradient.addColorStop(offset % 1, color)
      })

      ctx.strokeStyle = gradient
      ctx.lineWidth = borderWidth
      ctx.strokeRect(
        borderWidth/2,
        borderWidth/2,
        canvas.width - borderWidth,
        canvas.height - borderWidth
      )

      time++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <Canvas ref={canvasRef} />
} 