import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../Hooks/useUser";
function Home()
{
    return (
        <div>
            <h1>Home</h1>
            <p> Welcome to the page! Create a backlog list for your video games here!</p>
            <i>Want to get started?</i> <Link to="/register" class="font-medium text-fg-brand hover:underline">Create an Account</Link>
            <br></br>
            <i>Already have an account?</i> <Link to="/login" class="font-medium text-fg-brand hover:underline">Login</Link>
        </div>
    )
}

export default Home;