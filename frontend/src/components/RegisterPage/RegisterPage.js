import {useState} from "react";
import style from './RegisterPage.module.scss'
const RegisterPage = () => {
    let newCredentials = {
        login: '',
        password: ''
    };

    let [user, setCredentials] = useState(newCredentials);

    let newValidation = {
        loginSpaces: 1,
        loginAlphaNum: 0,
        loginLength: 0,
        passwordSpaces: 1,
        passwordLength: 0,
        passwordUpper: 0,
        passwordLower: 0,
        passwordNumber: 0,
    }

    let [validationInfo, validationUpdate] = useState(newValidation)
    const handleInputChange = (event) => {
        const newUser = {
            ...user,
            [event.target.name]: event.target.value,
        };

        validationUpdate({
            loginSpaces: !/\s/.test(newUser.login),
            loginAlphaNum: /^[a-zA-Z0-9]+$/.test(newUser.login),
            loginLength: newUser.login.length >= 5,
            passwordSpaces: !/\s/.test(newUser.password),
            passwordLength: newUser.password.length >= 8,
            passwordUpper: /[A-Z]/.test(newUser.password),
            passwordLower: /[a-z]/.test(newUser.password),
            passwordNumber: /[0-9]/.test(newUser.password)
        })

        setCredentials(newUser);
    };

    const handleRegister = async (event) => {
        if (event) {
            event.preventDefault();
        }

        const userExistsResponse = (await fetch(`http://localhost:8000/userExists?login=${user.login}`, {
            method: 'GET',
            headers: {}
        }))
        const userExists = await userExistsResponse.json()

        if (userExists) {
            alert(`User: ${user.login} already exists`)
            return
        }

        let creationResponse = (await fetch(`http://localhost:8000/addUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: user.login,
                password: user.password
            })
        }))
        creationResponse = await creationResponse.json()

        if(creationResponse.status === "ok") {
            alert(`User: ${user.login} has been created`)
        }
    };

    const UserDataInfo = () => {
        const validation = (isValid) => {
            return (isValid) ? <i className="fas fa-check-circle icon correctIcon"/> :
                <i className="fas fa-times-octagon icon wrongIcon"/>
        }

        return (
            <div className={style.validationRules}>
                <h2>Remember that following conditions have to be met while creating an account</h2>
                <h3>Login</h3>
                <p>{validation(validationInfo.loginAlphaNum)} The username field accepts alpha-numeric values only</p>
                <p>{validation(validationInfo.loginLength)} The username length is no less than 5 characters</p>
                <p>{validation(validationInfo.loginSpaces)} The username cannot contain spaces</p>
                <h3>Password</h3>
                <p>{validation(validationInfo.passwordLength)} The password has a minimum length of 8 characters</p>
                <p>{validation(validationInfo.passwordNumber)} Contains at least 1 number </p>
                <p>{validation(validationInfo.passwordLower)} Contains at least 1 lowercase character</p>
                <p>{validation(validationInfo.passwordUpper)} Contains at least 1 uppercase</p>
                <p>{validation(validationInfo.passwordSpaces)} The password cannot contain spaces</p>
            </div>
        )
    }

    const SendButton = () => {
        const isValid = Object.values(validationInfo).includes(false)
        return (
            <button
                className={style.sendButton}
                type="submit"
                disabled={isValid}
            >
                Register
            </button>
        )
    }

    return (
        <div className={style.container}>
            <form className={style.registrationForm} onSubmit={handleRegister}>
                <div>
                    <p>Login:</p>
                    <input
                        type="text"
                        name="login"
                        value={user.login}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <p>Password:</p>
                    <input
                        type="text"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <SendButton/>
            </form>
            <UserDataInfo/>
        </div>
    );
};

export default RegisterPage