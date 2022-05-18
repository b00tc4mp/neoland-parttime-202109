import { authenticateUser } from "../logic";

export default function AuthenticateUser({ onloggedIn }) {

    const auth = event => {
        event.preventDefault()
        const { target: { email: { value: email }, password: { value: password } } } = event // extraemos los campos

        try {
            authenticateUser(email, password)
                .then(token => {
                    sessionStorage.token = token

                    onloggedIn()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>    <section className="container w-full mx-auto pt-24 px-6">
            <div>
                <p className="text-2xl font-bold text-center pb-8">Sign in to NoteApp</p>
                <form className="grid gap-6 w-1/4 mx-auto" onSubmit={auth}>
                    <label>
                        <input className="w-full" type="email" name="email" placeholder="email" />
                    </label>
                    <label className="text-right">
                        <input className="w-full" type="password" name="password" placeholder="password" />
                        <span className="font-bold">Forgot password?</span>
                    </label>
                    <button className='w-full bg-transparent hover:bg-indigo-400 text-indigo-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Login</button>
                    <a href="/register" className="hover:underline hover:underline-offset-8 hover:text-gray-500 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg> Go to Register</a>
                </form>
            </div>
        </section>
        </>

    )

}