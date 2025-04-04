import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface Suggestion {
  id: number
  title: string
  content: string
  type: 'recipe' | 'map' | 'video' | 'article'
  link?: string
  image?: string
}

interface CanvasContextType {
  particles: any[]
  setParticles: (particles: any[]) => void
  currentText: string
  setCurrentText: (text: string) => void
  suggestions: Suggestion[]
}

const CanvasContext = createContext<CanvasContextType>({
  particles: [],
  setParticles: () => {},
  currentText: '',
  setCurrentText: () => {},
  suggestions: []
})

export const useCanvas = () => useContext(CanvasContext)

// Mock content based on input patterns
const getSuggestions = (text: string): Suggestion[] => {
  // Default suggestions when no text
  if (!text) {
    return []
  }

  // Food-related content
  if (text.startsWith('food')) {
    if (text.startsWith('food po')) {
      return [
        {
          id: 1,
          title: 'Food Poisoning First Aid',
          content: 'Learn the essential steps to handle food poisoning symptoms and when to seek medical help.',
          type: 'article',
          link: 'https://www.healthline.com/health/food-poisoning'
        },
        {
          id: 2,
          title: 'Food Safety Guidelines',
          content: 'Comprehensive guide to food handling, storage, and preparation to prevent foodborne illnesses.',
          type: 'article',
          link: 'https://www.fda.gov/food/buy-store-serve-safe-food'
        }
      ]
    } else if (text === 'food portrait') {
      return [
        {
          id: 1,
          title: 'Food Photography Masterclass',
          content: 'Professional techniques for capturing stunning food portraits with your smartphone.',
          type: 'video',
          link: 'https://www.youtube.com/watch?v=food-photography'
        },
        {
          id: 2,
          title: 'Food Styling Tips',
          content: 'Learn how to style and arrange food for the perfect portrait shot.',
          type: 'article',
          link: 'https://www.foodstyling.com/tips'
        }
      ]
    } else {
      return [
        {
          id: 1,
          title: 'Spring Vegetable Risotto',
          content: 'A creamy risotto with fresh spring vegetables, perfect for a light dinner.',
          type: 'recipe',
          link: 'https://www.recipes.com/spring-risotto'
        },
        {
          id: 2,
          title: 'Local Farmers Markets',
          content: 'Find the best seasonal produce at these local farmers markets.',
          type: 'map',
          link: 'https://maps.google.com/farmers-markets'
        }
      ]
    }
  }

  // Travel-related content
  if (text.startsWith('travel')) {
    if (text.startsWith('travel ba')) {
      return [
        {
          id: 1,
          title: 'Essential Travel Backpack Guide',
          content: 'Everything you need to know about choosing and packing your travel backpack.',
          type: 'article',
          link: 'https://www.travelgear.com/backpack-guide'
        },
        {
          id: 2,
          title: 'Top Travel Backpacks 2023',
          content: 'Reviews and comparisons of the best travel backpacks on the market.',
          type: 'video',
          link: 'https://www.youtube.com/watch?v=travel-backpacks'
        }
      ]
    } else {
      return [
        {
          id: 1,
          title: 'Hidden Gems in Italy',
          content: 'Discover these lesser-known but amazing places to visit in Italy.',
          type: 'map',
          link: 'https://maps.google.com/italy-hidden-gems'
        },
        {
          id: 2,
          title: 'Travel Photography Tips',
          content: 'Capture your travel memories like a pro with these photography techniques.',
          type: 'video',
          link: 'https://www.youtube.com/watch?v=travel-photography'
        }
      ]
    }
  }

  // Code-related content
  if (text.startsWith('code')) {
    if (text.startsWith('code re')) {
      return [
        {
          id: 1,
          title: 'Code Review Best Practices',
          content: 'A comprehensive guide to conducting effective code reviews.',
          type: 'article',
          link: 'https://www.developer.com/code-review-guide'
        },
        {
          id: 2,
          title: 'Code Review Tools Comparison',
          content: 'Compare the top code review tools and find the best one for your team.',
          type: 'video',
          link: 'https://www.youtube.com/watch?v=code-review-tools'
        }
      ]
    } else {
      return [
        {
          id: 1,
          title: 'React Performance Optimization',
          content: 'Learn how to optimize your React applications for better performance.',
          type: 'video',
          link: 'https://www.youtube.com/watch?v=react-performance'
        },
        {
          id: 2,
          title: 'TypeScript Advanced Patterns',
          content: 'Advanced TypeScript patterns and best practices for better code.',
          type: 'article',
          link: 'https://www.typescript.com/advanced-patterns'
        }
      ]
    }
  }

  return []
}

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [particles, setParticles] = useState<any[]>([])
  const [currentText, setCurrentText] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  useEffect(() => {
    setSuggestions(getSuggestions(currentText))
  }, [currentText])

  return (
    <CanvasContext.Provider 
      value={{ 
        particles, 
        setParticles, 
        currentText, 
        setCurrentText, 
        suggestions 
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
} 