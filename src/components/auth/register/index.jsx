import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'


const Register = () => {


    

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, SetUsername] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <>
         
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            <img
            src="./assets/image.png"
            style={{
              height: 190,
              width: 190,
              borderRadius: 20,
              position: "relative",
              top: 90,
              left: 650,
              bottom: 200,
            }}
          />
            <main className="w-full h-screen flex place-content-center place-items-center">
            
            <div className="h-75% w-3/5 md:w-4/5 lg:w-3/5 xl:w-2/5 text-gray-600 space-y-5 p-8 shadow-xl border rounded-xl" style={{borderColor: '#39B68D'}}>
            <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-4xl font-semibold sm:text-2xl">Create a New Account</h3>
                        </div>

                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-4"
                    >
                         <div>
                            <label className="text-3xl text-gray-600 font-bold">
                                Username
                            </label>
                            <input
                                type="text"
                                autoComplete='text'
                                required
                                value={username} onChange={(e) => { SetUsername(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-2xl text-gray-500 bg-transparent outline-none border focus:green-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        <div>
                            <label className="text-3xl text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-2xl text-gray-500 bg-transparent outline-none border focus:green-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-3xl text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-2xl text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-3xl text-gray-600 font-bold">
                                Confirm Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-2xl text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full text-2xl px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-3xl text-center">
                            Already have an account? {'   '}
                            <Link to={'/login'} className="text-center text-3xl hover:underline font-bold">Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register