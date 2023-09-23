import { Link } from 'react-router-dom';


function ProfilePage () {
    const pageStyle = {
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        padding: '20px',
      };
    
      const headingStyle = {
        fontSize: '24px',
        color: 'blue',
      };
    
      const paragraphStyle = {
        fontSize: '18px',
      };
    return (
        <div style={pageStyle}>
        <h1 style={headingStyle}>Welcome to Expense Tracker App</h1>
        <p style={paragraphStyle}>Your Profile is incomplete.</p>
        <Link to="/completeProfile">Complete Profile</Link>
      </div>
    )

}
export default ProfilePage;