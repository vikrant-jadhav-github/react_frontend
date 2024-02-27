import Sidebar from './Sidebar';
import '../css/Layout.css'
import { Outlet } from 'react-router-dom';

function Layout() {
    
    return (
        <div className="layout">
            <div className="layoutsidebar">
                <Sidebar />
            </div>
            <div className="dynamiccontent">
                <Outlet/>
            </div>
    </div>
    );
}

export default Layout;