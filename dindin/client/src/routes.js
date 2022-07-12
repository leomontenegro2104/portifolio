import Dashboard from './pages/Dashboard';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { getItem } from './pages/utils/storage';


function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function ProjectRoutes() {
    return (
        <div>
            <Routes>
                <Route element={<ProtectedRoutes redirectTo='/sign-in' />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                </Route>
                <Route path='/'>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/sign-in' element={<SignIn />} />
                </Route>
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='*' element={<h1>404 - Not found</h1>} />
            </Routes>
        </div>
    );
}

export default ProjectRoutes;

