import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { useCanvas } from '../context/CanvasContext'

const CardsContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`

const Card = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  padding: 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  pointer-events: auto;
  cursor: pointer;
  transform-style: preserve-3d;
  perspective: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateZ(20px) scale(1.02);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  }
`

interface CardTitleProps {
  $isEmpty?: boolean
}

const CardTitle = styled.h3<CardTitleProps>`
  margin: 0 0 1rem;
  font-size: ${props => props.$isEmpty ? '2.5rem' : '1.5rem'};
  font-weight: ${props => props.$isEmpty ? '700' : '600'};
  color: #1a1a1a;
  line-height: 1.2;
`

interface CardContentProps {
  $isEmpty?: boolean
}

const CardContent = styled.p<CardContentProps>`
  margin: 0;
  font-size: ${props => props.$isEmpty ? '1.8rem' : '1.1rem'};
  color: #666;
  line-height: 1.4;
  font-style: ${props => props.$isEmpty ? 'italic' : 'normal'};
`

const TypeBadge = styled.span<{ $type: string }>`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  background: ${props => {
    switch (props.$type) {
      case 'recipe': return 'rgba(255, 87, 34, 0.15)';
      case 'map': return 'rgba(33, 150, 243, 0.15)';
      case 'video': return 'rgba(233, 30, 99, 0.15)';
      case 'article': return 'rgba(76, 175, 80, 0.15)';
      default: return 'rgba(0, 0, 0, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.$type) {
      case 'recipe': return '#ff5722';
      case 'map': return '#2196f3';
      case 'video': return '#e91e63';
      case 'article': return '#4caf50';
      default: return '#000';
    }
  }};
  backdrop-filter: blur(5px);
`

export const SuggestionCards = () => {
  const { suggestions, currentText } = useCanvas()

  if (!currentText) return null

  return (
    <CardsContainer>
      <AnimatePresence>
        {suggestions.map((suggestion, index) => {
          const angle = (index * (2 * Math.PI)) / suggestions.length
          const radius = 400 // Increased radius to avoid text overlap
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          const isEmpty = !suggestion.content

          return (
            <Card
              key={suggestion.id}
              initial={{ 
                opacity: 0, 
                scale: 0.5,
                x: 0,
                y: 0,
                rotateX: 90,
                rotateY: 90
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x,
                y,
                rotateX: 0,
                rotateY: 0,
                transition: {
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  mass: 1,
                  delay: index * 0.15
                }
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.5,
                x: 0,
                y: 0,
                rotateX: -90,
                rotateY: -90,
                transition: { duration: 0.3 }
              }}
              whileHover={{ 
                scale: 1.02,
                y: y - 10,
                transition: { duration: 0.2 }
              }}
              onClick={() => window.open(suggestion.link, '_blank')}
            >
              <TypeBadge $type={suggestion.type}>
                {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
              </TypeBadge>
              <CardTitle $isEmpty={isEmpty}>{suggestion.title}</CardTitle>
              {!isEmpty && <CardContent $isEmpty={isEmpty}>{suggestion.content}</CardContent>}
            </Card>
          )
        })}
      </AnimatePresence>
    </CardsContainer>
  )
} 