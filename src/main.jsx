import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { WishlistProvider } from './Context/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <WishlistProvider>
            <App style={{backgroundColor:"var(--color-bg-main)"}}/>
        </WishlistProvider>
    </AuthProvider>
)
