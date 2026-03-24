import { Outlet } from "react-router-dom"
import BottomNav from "./Footer"

const Layout = () => {
    return(
        <>
         <div className="app-layout">
            <main className="page-content">
                <Outlet />
            </main>

            <BottomNav />
         </div>
        </>
    );
};

export default Layout;