import Header from './Header'
import Footer from './Footer'
import Register from '../../pages/Register'

const Layout = ({children}) => {
  return (
   <>
   <Header/>
   <div className='content'>{children}</div>
   <Footer/>
   </>
  )
}

export default Layout
