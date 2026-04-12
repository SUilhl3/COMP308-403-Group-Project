import { createContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import { GET_CURRENT_USER } from "../graphql/queries";
import { REGISTER_USER } from "../graphql/mutations";
import { LOGOUT_USER } from "../graphql/mutations";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [message, setMessage] = useState("");

    
    const { data: userData, loading: loadingUser, error: errorUser } = useQuery(GET_CURRENT_USER, {
        fetchPolicy: "network-only", 
    });

    const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
        refetchQueries: [GET_CURRENT_USER],
        awaitRefetchQueries: true,
    });

    const [registerUser, { loadingRegister, errorRegister }] = useMutation(REGISTER_USER);

    const [logoutUser] = useMutation(LOGOUT_USER, {
        refetchQueries: [GET_CURRENT_USER],
        awaitRefetchQueries: true,
    });

    
    async function login(username, password, navigate) {
        try {
            const { data } = await loginUser({
                variables: { username, password },
            });

            console.log("Login response:", data);

            if (data?.loginUser) {
                setMessage("Login successful");
                navigate("/dashboard"); 
            } else {
                setMessage("Login failed.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setMessage("Login failed. Please check your credentials.");
        }
    }

    
    async function register(username, email, password, navigate) {
        try {
            await registerUser({
                variables: { username, email, password },
            });
            setMessage("Account created successfully");
        setTimeout(() => {
          setMessage(""); 
          navigate("/login"); 
        }, 1500);
        } catch (err) {
            console.error(err);
            setMessage("Register Failed");
        }
    }

   
    async function logout() {
        try {
            await logoutUser();
            setMessage("Logged out successfully");
        } catch (err) {
            console.error(err);
            setMessage("Logout Failed.");
        }
    }

    return (
        <UserContext.Provider
            value={{
                user: userData?.me,
                login,
                register,
                logout,
                loading,
                error,
                loadingUser,
                errorUser,
                loadingRegister,
                errorRegister,
                message,
                setMessage,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}