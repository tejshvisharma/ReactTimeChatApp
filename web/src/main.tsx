import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from "@clerk/react";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!clerkKey){
  throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined");
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ClerkProvider publishableKey={clerkKey}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
