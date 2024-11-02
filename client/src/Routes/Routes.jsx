import { Outlet, Navigate } from 'react-router-dom';

export const LoggedRoutes = ({role}) => {
    console.log('role=',role);
    return role !== 'guest' ? <Outlet />:<Navigate to='/home' /> 
}


