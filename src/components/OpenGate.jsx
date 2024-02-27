import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OpenGate({ children }) {

    const navigate = useNavigate();
    const {token} = useSelector(state => state.user);

    useEffect(() => {
        if (!token) {
            navigate("/authentication?login=true");
            alert('Please login first');
            return;
        }
    }, [token])

    return children;
}

export default OpenGate;