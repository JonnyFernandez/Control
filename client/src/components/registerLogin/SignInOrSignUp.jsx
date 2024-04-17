import { useState } from "react"
import p from "./SignInOrSignUp.module.css"


const SignInOrSignUp = () => {
    const [Login, setLogin] = useState(true)
    const [SignUp, setSignUp] = useState(false)
    const [ForgotPass, setForgotPass] = useState(false)

    const toggleSelector = (data) => {
        switch (data) {
            case "login":
                setLogin(true)
                setSignUp(false)
                setForgotPass(false)
                break
            case "SignUp":
                setLogin(false)
                setSignUp(true)
                setForgotPass(false)
                break
            case "ForgotPass":
                setLogin(false)
                setSignUp(false)
                setForgotPass(true)
                break
        }
    }

    return (
        <div className={p.SignInOrSignUp}>



            {Login && <div>Login</div>}
            {SignUp && <div>SignUp</div>}
            {ForgotPass && <div>ForgotPass</div>}



        </div>
    )
}

export default SignInOrSignUp