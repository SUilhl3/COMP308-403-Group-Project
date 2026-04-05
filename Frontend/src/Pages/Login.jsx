import { useState } from "react";
import {gql, useMutation} from "@apollo/client"
import { useNavigate } from "react-router-dom";


const LOGIN = gql `
mutation LoginUser($username: String!, $password: String!)
{
    loginUser(username: $username, password: $password)
    {
        id
        username
        email
    }
}
`

function Login()
{
    const navigate = useNavigate();
    const [loginUser, {loading: loggingIn, error: addError}] = useMutation(LOGIN);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        await loginUser({variables: {username: username, password: password}});
        
        //should probably make this a toast message later but this is fine for now
        setSuccess("Login Successful");
        setTimeout(() => {
            navigate("/dashboard");
        }, 2000)
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button type="submit">Login</button>
            </form>
            {addError && <p>{addError.message}</p>}
            {success && <p>{success}</p>}            
        </div>
    )
}

export default Login;