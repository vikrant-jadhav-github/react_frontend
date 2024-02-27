import Cookies from 'js-cookie';
import '../css/Viewurls.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Viewurls() {

    const {token} = useSelector(state => state.user);
    const [allUrls, setAllUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        ;(async () => {
        try {
            setLoading(true);      
                const response = await fetch('http://localhost:8000/api/v1/urls/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const responseData = await response.json();
                setAllUrls(responseData.data);
        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
        })();
    }, []);

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        alert(error);
    }

    return (
        <div className="viewurls">
            <h2>Here Is All The Urls That We Have Shortened</h2>
            {allUrls.length === 0 && <div className="nodata">
                <img src="https://cdn.dribbble.com/users/633133/screenshots/3218559/media/3490827c0bba959b5bc92bb031f5dc05.png?resize=800x600&vertical=center" alt="Image" />
                <h3>You Have Not Shorten Any Url Yet</h3>
            </div>}

            {allUrls.map((urlData) => (                
                <div key={urlData.uuid} className="allurls">
                    <div className="url">
                        <table>
                            <thead>
                                <tr>
                                    <th>Original URL</th>
                                    <th>UUID</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="column-80"><a href={urlData.url}>{urlData.url}</a></td>
                                    <td className="column-20">{urlData.uuid}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Viewurls;