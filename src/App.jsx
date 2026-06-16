import { useState } from 'react'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { TopBar, MainNav } from 'zendesk-globalnav-template'
import styled from 'styled-components'
import NotificationsHub from './components/NotificationsHub'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f8f9f9;
  overflow: hidden;
`

const ContentRow = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow: hidden;
`

const MainContent = styled.main`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  background: #ffffff;
  border-radius: 8px 0px 0px 0px;
  box-shadow: 0px 0px 4px rgba(10, 13, 14, 0.16);
  overflow: hidden;
`

export default function App() {
  const [currentProduct, setCurrentProduct] = useState('admin_center')
  const [activeNavItem, setActiveNavItem] = useState(0)
  const [isSubnavExpanded, setIsSubnavExpanded] = useState(false)

  return (
    <ThemeProvider>
      <PageContainer>
        <TopBar
          currentProduct={currentProduct}
          onProductChange={setCurrentProduct}
        />
        <ContentRow>
          <MainNav
            currentProduct="admin_center"
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isSubnavExpanded={isSubnavExpanded}
            setIsSubnavExpanded={setIsSubnavExpanded}
          />
          <MainContent>
            <NotificationsHub />
          </MainContent>
        </ContentRow>
      </PageContainer>
    </ThemeProvider>
  )
}
