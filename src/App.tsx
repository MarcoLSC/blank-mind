import { CanvasProvider } from './context/CanvasContext'
import { FluidBackground } from './components/FluidBackground'
import { TextInput } from './components/TextInput'
import { SuggestionCards } from './components/SuggestionCards'
import styled from 'styled-components'

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

function App() {
  return (
    <CanvasProvider>
      <AppContainer>
        <FluidBackground />
        <TextInput />
        <SuggestionCards />
      </AppContainer>
    </CanvasProvider>
  )
}

export default App
