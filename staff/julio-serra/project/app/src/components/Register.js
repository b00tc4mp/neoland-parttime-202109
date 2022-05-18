import { registerUser } from '../logic'

export default function Register() {

    const register = event => {
        event.preventDefault()

        const { target: { name: { value: name }, email: { value: email }, password: { value: password } } } = event //extraer los campos
        
        try {
            registerUser(name, email, password)
                .then(() => alert('User Registered'))
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
            
            <section className="container w-full mx-auto pt-24 px-6">
            <h1><a href="/">Go to Home</a></h1>
            <h1>Register User</h1>
                    <div>
                        <p className="text-2xl font-bold text-center pb-8">Register to Space Local</p>
                        <form className="grid gap-6 w-1/4 mx-auto" onSubmit={register}>
                            <label>
                                <input type="text" className="mt-1 w-full" name="name" placeholder="Name" />
                            </label>
                            <label>
                                <input type="email" className="mt-1 w-full" name="email" placeholder="email" />
                            </label>
                            <label>
                                <input type="password" className="mt-1 w-full" name="password" placeholder="Password" />
                            </label>
                            <button className="w-full bg-transparent hover:bg-indigo-400 text-indigo-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Register User
                                </button>
                        </form>
                    </div>
                </section>
        </>
    )
}