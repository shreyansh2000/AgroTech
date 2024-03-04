import React from 'react';
const WelcomeScreen = () => {
  const containerStyle = {
    background: 'linear-gradient(to right, #39B68D, #007260)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const imageStyle = {
    height: 100,
    width: 120,
    borderRadius: 20,
    position: "absolute",
    transform: "translate(40px, 50px) rotate(30deg)",
  };

  const textStyle = {
    fontSize: 50,
    fontWeight: 900,
    color: 'white',
    textAlign: 'center',  
  };

  const buttonStyle = {
    padding: '15px',
    margin: '20px',
    background: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const buttonGuestStyle = {
    color: 'white',
    fontWeight: 700,
    fontSize: 17,
    marginTop: 15,
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
    

    <div style={containerStyle}>


            <img
            src="./assets/welcome_screen_image.png"
            style={{
              height: 120,
              width: 120,
              borderRadius: 20,
              position: "absolute",
              top: 150, 
              left: 400,
              transform: [
                { translateX: 40 },
                { translateY: 50 },
                { rotate: "30deg" }
              ]
            }}
          />
 
         <img
            src="./assets/welcome_screen_image.png"
            style={{
              height: 150,
              width: 150,
              borderRadius: 20,
              position: "absolute",
              top: 240,
              left: 180,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "80deg" }
              ]
            }}
          />

          <img
           src="./assets/welcome_screen_image.png"
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 20,
              left: 300,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "80deg" }
              ]
            }}
          />   


          <img
           src="./assets/welcome_screen_image.png"
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 380,
              left: 250,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "80deg" }
              ]
            }}
          /> 

   

      <div style={{
        paddingHorizontal: 22,
        position: "absolute",
        top: 310,
        left: 300,
        width: "100%",
      }}>



        <div style={textStyle}>Let's Get Started</div>

        <div style={{ marginTop: 10, marginBottom: 40,alignItems: 'center',justifyContent: 'center', textAlign: 'center',  }}>
          <div style={{ fontSize: 16, color: 'white', marginVertical: 4 }}>
            <span style={{  fontWeight: 800 }}>Detect, Prevent, and Treat</span> tomato crop diseases.
          </div>
          <div style={{ fontSize: 16, color: 'white' }}>Remember, a healthy crop is a happy crop!</div>
        </div>

        <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center',display: 'flex', flexDirection: 'row' }}>
          <button onClick={() => navigation.navigate('Register')} style={buttonStyle}>
            <span>Register</span>
          </button>

          <button onClick={() => navigation.navigate('Login')} style={buttonStyle}>
            <span>Login</span>
          </button>
        </div>

        <div onClick={onContinueAsGuest} style={buttonGuestStyle}>
          <span style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center',display: 'flex', flexDirection: 'row' }}>Continue as Guest</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
