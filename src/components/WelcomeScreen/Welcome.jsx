import React from 'react'
import { useNavigate } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import './Welcome.css';

function Welcome() {

  const navigate=useNavigate();
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });


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
    color: '#420103',
    textAlign: 'center',  
  };

  const buttonStyle = {
    padding: '18px',
    margin: '30px',
    background: '#fff',
    borderRadius: '20px',
    width: '40%',
    cursor: 'pointer',

  };

  const buttonGuestStyle = {
    padding: '10px',
    margin: '60px',
    background: '#fff',
    borderRadius: '20px',
    cursor: 'pointer',
   
  };
  const Screen={
    height: '100vh',
    display:'flex',
    width: '100%',
    color: 'black'
  
  }

 function goTologin()
 {
   navigate('/login');
 }
 function gotToRegister()
 {
   navigate('/register');
 }

  const onContinueAsGuest = () => {
    // Handle continue as guest action
    navigate('/home');
  };
  return (
    <>
  
  <div >
    <animated.div className='screen' style={Screen}>
      {/* Left Side of Screen*/}
      
      <div className='left-side h-full w-6/12 bg-[#39B68D]'>
  
        
      <img
            src="./assets/tomato.png"
            className="transform rotate-90 ..."
            style={{
              height: 120,
              width: 120,
              borderRadius: 20, 
              position: "relative",
              top: 140, 
              left: 480,
            }}
          />
 
         <img
            src="./assets/tomato.png"
            className="transform rotate-45 ..."
            style={{
              height: 150,
              width: 150,
              borderRadius: 20,
              position: "relative",
              top: 140,
              left: 270,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "80deg" }
              ]
            }}
          />

          <img
           src="./assets/tomato.png"
           className="transform rotate-12 ..."
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "relative",
              top: 170,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "80deg" }
              ]
            }}
          />  
            <img
           src="./assets/tomato.png"
           className="transform rotate-0 ..."
            style={{
              height: 250,
              width: 250,
              borderRadius: 20,
              position: "relative",
              top: 100,
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
      <div className='right-side h-full w-6/12' style={{ background:'#39B68D' }}>
      <div style={{
        paddingHorizontal: 22,
        position: "relative",
        top: 200,
        width: "100%",
      }}>



        <div style={textStyle}>Let's Get Started</div>

        <div style={{marginTop: 10, marginBottom: 40,alignItems: 'center',justifyContent: 'center', textAlign: 'center'}}>
          <div style={{ fontSize: 30, color: 'white', marginVertical: 4 }}>
            <span style={{  color:'#420103' , fontWeight: 1000 }}>Detect, Prevent, and Treat Tomato Crop Diseases.</span> 
          </div>
          <div style={{ fontSize: 25, color: '#420103' }}>Remember, a healthy crop is a happy crop!</div>
        </div>

        <div style={{ fontSize: 20, alignItems: 'center', justifyContent: 'center', textAlign: 'center',display: 'flex', flexDirection: 'row' }}>
        
          <button onClick={goTologin} style={buttonStyle}>
            <span>Login</span>
          </button>
          <button onClick={gotToRegister} style={buttonStyle}>
            <span>Register</span>
          </button>
        </div>

        <div onClick={onContinueAsGuest} style={buttonGuestStyle}>
          <span style={{ fontSize: 20,alignItems: 'center', justifyContent: 'center', textAlign: 'center',display: 'flex', flexDirection: 'row' }}>Continue as Guest</span>
        </div>
      </div>
      </div>



    </animated.div>
    </div>

    </>
  )
}

export default Welcome;
