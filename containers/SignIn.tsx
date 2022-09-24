import { NextPage } from "next";

export const SignIn: NextPage = () => {

    return <>
        <div className="container-sign-in">
            <form>
            <input type="text" placeholder="name" />
            <input type="text" placeholder="email" />
            <input type="password" placeholder="password" />

            <button>Cadastrar</button>
            </form> 
        </div>
    </>
}