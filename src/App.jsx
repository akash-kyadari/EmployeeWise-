import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Users from "./pages/Users"
import EditUser from "./pages/EditUser";
import { useSelector } from "react-redux";

function App() {
    const token = useSelector((state) => state.auth.token);
    return (
        <div>
            <Routes>
                <Route path="/" element={token ? <Navigate to="/users" /> : <Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={token ? <Users /> : <Navigate to="/login" />} />
                <Route path="/users/edit/:id" element={token ? <EditUser /> : <Login />} />
            </Routes>
        </div>
    )
}

export default App
