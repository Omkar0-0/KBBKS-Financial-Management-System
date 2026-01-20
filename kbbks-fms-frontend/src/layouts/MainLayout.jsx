import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

function MainLayout({ children, setPage, onLogout }) {
  return (
    <div style={styles.container}>
      <Header onLogout={onLogout} />
      <div style={styles.body}>
        <Sidebar setPage={setPage} />
        <div style={styles.content}>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    display: 'flex',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: '20px',
  },
}

export default MainLayout
