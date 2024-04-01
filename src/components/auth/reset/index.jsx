import React, { useState } from 'react'
import { doPasswordReset} from '../../../firebase/auth'



const ResetPassword = () => {

    const [email, setEmail] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
 
    

    const onSubmit = async (e) => {
        e.preventDefault()    
            await doPasswordReset(email)    
    }

    return (
<>
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
          
            {/* {userLoggedIn && (<Navigate to={'/home'} replace={true} />)} */}

            <main className="w-full h-screen flex place-content-center place-items-center">
            <div className="h-75% w-3/5 md:w-4/5 lg:w-3/5 xl:w-2/5 text-gray-600 space-y-5 p-8 shadow-xl border rounded-xl" style={{borderColor: '#39B68D'}}>
                        <div className="text-center">
                            <div className="mt-2">
                                <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl"></h3>
                            </div>
                        </div>
                        <form
                            onSubmit={onSubmit}
                            className="space-y-5"
                        >
                            <div>
                                <label className="text-3xl text-gray-600 font-bold">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    autoComplete='email'
                                    required
                                    value={email} onChange={(e) => { setEmail(e.target.value) }}
                                    className="w-full mt-2 px-3 py-2 text-3xl  text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg transition duration-300"
                                />
                            </div>              

                            <button
                                type="submit"
                                disabled={isSigningIn}
                                className={`w-full px-4 py-2 text-2xl  text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 green:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                            >
                                {isSigningIn ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                      
                       
                    </div>
            </main>
      </>
    )
}

export default ResetPassword