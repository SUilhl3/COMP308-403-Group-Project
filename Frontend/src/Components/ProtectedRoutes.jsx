import {Navigate, Outlet} from 'react-router-dom'
import {gql, useQuery} from "@apollo/client"

const ME = gql `
query GetMe {
    me
    {
        id,
        username,
        email
    }
}
`
function ProtectedRoutes ()  {
    const {data, loading} = useQuery(ME);
    if (loading) return <p>Loading...</p>

    if (!data?.me)
    {
        return <Navigate to="/login" />;
    }

    return <Outlet /> 
}

export default ProtectedRoutes;