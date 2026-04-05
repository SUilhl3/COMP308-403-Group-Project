import { useState } from "react";
import {gql, useMutation} from "@apollo/client"
import { useNavigate } from "react-router-dom";

const REGISTER = gql `
mutation RegisterUser($username: String!, $password: String!, $email: String!)
{
    registerUser(username: $username, password: $password, email: $email)
    {
        id
        username
        email
    }
}
`

function Register()
{

    const [registerUser, {loading: registering, error: addError}] = useMutation(REGISTER);

    //use states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmitRegisterUser = async (e) => {
        e.preventDefault();

        await registerUser({variables: {username: username, password: password, email: email}});
        
        //should probably make this a toast message later but this is fine for now
        setSuccess("Account created successfully");
        setTimeout(() => {
            navigate("/login");
        }, 2000)
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmitRegisterUser}>
                <label>
                    Username:
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label>
                    Email:
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>    
                <button type="submit">Register</button>                            
            </form>
            {addError && <p>{addError.message}</p>}
            {success && <p>{success}</p>}
        </div>
    )
}

export default Register;