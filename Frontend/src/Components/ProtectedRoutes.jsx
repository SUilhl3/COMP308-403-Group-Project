import {Navigate, Outlet} from 'react-router-dom'
import {useQuery} from "@apollo/client"
import { GET_CURRENT_USER } from '../graphql/queries';

function ProtectedRoutes ()  {
    const {data, loading} = useQuery(GET_CURRENT_USER, {
        fetchPolicy: "network-only"
    });
    if (loading) return <p>Loading...</p>

    if (!data?.me)
    {
        return <Navigate to="/login" />;
    }

    return <Outlet /> 
}

export default ProtectedRoutes;