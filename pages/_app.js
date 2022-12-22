import '../styles/globals.css'
import  UserProvider from '../pages/contexts/userDataContext'

export default function MyApp({ Component, pageProps }) {
  return(
    <UserProvider>
     <Component {...pageProps} />
    </UserProvider>
  )
}