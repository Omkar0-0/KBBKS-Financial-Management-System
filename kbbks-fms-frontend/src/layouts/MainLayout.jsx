import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

function MainLayout({ children, setPage, onLogout }) {
  // Static role for now - can be replaced with authentication later
  const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    VIEWER: 'VIEWER'
  };
  const currentRole = ROLES.VIEWER; // Static role - change to USER or VIEWER to test

  return (
    <div style={styles.container}>
      <Header onLogout={onLogout} currentRole={currentRole} />
      <div style={styles.body}>
        <Sidebar setPage={setPage} currentRole={currentRole} />
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
