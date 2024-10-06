import React from "react";
import Header from "./components/general/header/header";
import "./index.css";
import Sidebar from "./components/general/sidebar/sidebar";

function App() {
    return ( // Make sure to return JSX
        <React.Fragment>
            <Header />
            <div className="bodyWrapper"> {/* Use className for global CSS */}
                <Sidebar />
            </div>
        </React.Fragment>
    );
}

export default App;
