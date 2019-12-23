import React, { useState, useContext, useEffect } from 'react'
import AlertContext from "../../context/alert/alertContext"
import AuthContext from "../../context/auth/authContext"

const Register = props => {

    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const { setAlert } = alertContext
    const { register, error, clearErrors, isAuthenticated } = authContext


    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/cities")
        }

        if (error === "User already exists") {
            setAlert(error, "danger")
            clearErrors()
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        //password confirmation
        password2: ""
    })

    const { username, email, password, password2 } = user

    const onChange = e =>
        setUser({ ...user, [e.target.name]: e.target.value })


    const onSubmit = e => {
        e.preventDefault()
        if (username === "" || email === "" || password === "") {
            setAlert("Please enter all fields", "danger")
        } else if (password !== password2) {
            setAlert("Passwords do not match", "danger")
        } else {
            register({
                username, email, password
            })
        }
    }



    return (
        <div className="form-container">
            <h1>
                Account <span className="brand-color-1">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group" >
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        required />
                </div>
                <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary btn-block" />
            </form>

        </div>

    )
}

export default Register