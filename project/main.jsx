import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { App } from './src/App.jsx'
import { FiltersProvider } from './src/contexts/filter.context.jsx'
const root = createRoot(document.getElementById('app'))
root.render(
  <StrictMode>
    <FiltersProvider>
      <App />
    </FiltersProvider>
  </StrictMode>
)
