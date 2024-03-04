import React from 'react'

function Welcome() {

 

  const imageStyle = {
    height: 100,
    width: 120,
    borderRadius: 20,
    position: "absolute",
    transform: "translate(40px, 50px) rotate(30deg)",
  };

  const textStyle = {
    fontSize: 65,
    fontWeight: 700,
    color: 'white',
    textAlign: 'center',  
  };

  const buttonStyle = {
    padding: '18px',
    margin: '30px',
    background: '#fff',
    borderRadius: '20px',
    cursor: 'pointer',
  };

  const buttonGuestStyle = {
    padding: '10px',
    margin: '60px',
    background: '#fff',
    borderRadius: '20px',
    cursor: 'pointer',
  };

  const navigation = {
    navigate: (route) => {
      // Handle navigation here
      console.log(`Navigating to ${route}`);
    },
  };

  const onContinueAsGuest = () => {
    // Handle continue as guest action
    console.log('Continue as Guest clicked');
  };
  return (
    <>

    <div className="h-screen w-screen bg-black flex">
      {/* Left Side of Screen*/}
      <div className='h-full w-6/12 bg-[#39B68D]'>
        
      <img
            src="./assets/welcome_screen_image.png"
            class="transform rotate-90 ..."
            style={{
              height: 120,
              width: 120,
              borderRadius: 20,
              position: "absolute",
              top: 150, 
              left: 480,
            }}
          />
 
         <img
            src="./assets/welcome_screen_image.png"
            class="transform rotate-45 ..."
            style={{
              height: 150,
              width: 150,
              borderRadius: 20,
              position: "absolute",
              top: 240,
              left: 250,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "80deg" }
              ]
            }}
          />

          <img
           src="./assets/welcome_screen_image.png"
           class="transform rotate-12 ..."
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 450,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "80deg" }
              ]
            }}
          />  
            <img
           src="./assets/welcome_screen_image.png"
           class="transform rotate-0 ..."
            style={{
              height: 250,
              width: 250,
              borderRadius: 20,
              position: "absolute",
              top: 600,
              left: 400,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "80deg" }
              ]
            }}
          />  
          
           </div>



        {/* Right Side of Screen*/}
      <div className='h-full w-6/12' style={{ background: 'linear-gradient(to right, #39B68D, #007260)' }}>
      <div style={{
        paddingHorizontal: 22,
        position: "relative",
        top: 200,
        width: "100%",
      }}>



        <div style={textStyle}>Let's Get Started</div>

        <div style={{ marginTop: 10, marginBottom: 40,alignItems: 'center',justifyContent: 'center', textAlign: 'center',  }}>
          <div style={{ fontSize: 30, color: 'white', marginVertical: 4 }}>
            <span style={{  fontWeight: 1000 }}>Detect, Prevent, and Treat</span> tomato crop diseases.
          </div>
          <div style={{ fontSize: 25, color: 'white' }}>Remember, a healthy crop is a happy crop!</div>
        </div>

        <div style={{ fontSize: 20, alignItems: 'center', justifyContent: 'center', textAlign: 'center',display: 'flex', flexDirection: 'row' }}>
        
          <button onClick={() => navigation.navigate('Login')} style={buttonStyle}>
            <span>Login</span>
          </button>
          <button onClick={() => navigation.navigate('Register')} style={buttonStyle}>
            <span>Register</span>
          </button>
        </div>

        <div onClick={onContinueAsGuest} style={buttonGuestStyle}>
          <span style={{ fontSize: 20,alignItems: 'center', justifyContent: 'center', textAlign: 'center',display: 'flex', flexDirection: 'row' }}>Continue as Guest</span>
        </div>
      </div>
      </div>



    </div>

    </>
  )
}

export default Welcome;