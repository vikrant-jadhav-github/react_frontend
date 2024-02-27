import { NavLink, useNavigate } from 'react-router-dom';
import '../css/Sidebar.css'
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '../slices/userSlice';

function Sidebar() {

    const {token, user} = useSelector(state => state.user)
    const dispatch = useDispatch();

    const navigate = useNavigate();


    function handleLogout(){
        dispatch(setToken(null));
        dispatch(setUser({}));
        alert('Logged out successfully');
        navigate("/authentication?login=true");
    }

    return (
        <div className="sidebar">

            <div className="branding">
                <h1>SHORT_ME</h1>
                <h2>🔗</h2>
            </div>
            
            {!token && <div className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="authentication">Register</NavLink>
                <NavLink to="authentication/?login=true">Login</NavLink>
                <NavLink to="about">About</NavLink>
            </div>}

            {token && <div className="links">
                <div className="profile">
                    <h2>Welcome {user.name}!</h2>
                </div>
                <NavLink to="home">Home</NavLink>
                <NavLink to="home/viewurls">Visited Urls</NavLink>
                <NavLink to="home/about">About</NavLink>
                <NavLink className="logout" onClick={handleLogout}>Logout</NavLink>
            </div>}

        </div>

    )
}

export default Sidebar;