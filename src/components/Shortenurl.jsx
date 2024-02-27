import { useState } from 'react';
import '../css/Shortenurl.css';
import { useSelector } from 'react-redux';

function Shortenurl() {

    const {token} = useSelector(state => state.user);
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleUrl () {
        if (url === "") {
            alert("Please enter a URL");
            return;
        }
        const urlPattern = /^(http|https):\/\//;
    
        if (!urlPattern.test(url)) {
            alert("Please enter a valid URL");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:8000/api/v1/urls/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({url})
            });
    
            if(response.status === 201){
                alert('URL shortened successfully');
            }
            else if(response.status === 401){
                alert("Please login first");
                navigate('/authentication?login=true');
            }
            else{
                alert(response.statusText);
            }
    
            const responseData = await response.json();
            setShortUrl(responseData.url);
        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
            setUrl('');
        }

    }

    function handleCopy() {
        navigator.clipboard.writeText(shortUrl);
        alert("Copied to clipboard");
    }

    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        alert(error);
    }

    return (
        <section className="shortenurl">
  
                <div className="heading">
                    <h1>SHORT🔗ME</h1>
                </div>
            
                <div className="description">
                    <p>SHORT_ME is a free tool to shorten URLs</p>
                    <p>Use our URL Shortner to create a rememberable and easy-to-share URL</p>
                </div>
            
                <div className="shortenlink">
                    <input type="text" placeholder="Enter URL Here" onChange={(e) => setUrl(e.target.value)}/>
                    <button onClick={handleUrl}>Shorten</button>
                </div>

                {shortUrl && <div className="newlink">
                    <h3>Your Shortened Link</h3>

                    <div className="copylink">
                        <a href={shortUrl} target="_blank">{shortUrl}</a>
                        <p onClick={handleCopy}>📋</p>
                    </div>

                </div>}
  
        </section>

    );
}

export default Shortenurl;