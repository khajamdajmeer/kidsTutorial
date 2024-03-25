"use client";
import { useRouter } from 'next/navigation';
import Signupimg from '../Resources/bgloginimg.png';
import styled from 'styled-components';
import { useState } from 'react';
import EnterOTP from './EnterOTP';
import toast,{Toaster} from 'react-hot-toast';
import {auth} from '../FireBase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const Signup = ()=>{

  

    const history = useRouter();
    const [showpassword,setShowpassword]=useState(false);
    const showpassChange = ()=>{
        setShowpassword(!showpassword);
    };
    const [SignupCredentials,setSignupCredentials] = useState({username:'',password:'',repassword:"",email:'',mobilenumber:''});
    const onchangeSignupCredentials = (e)=>{
        setSignupCredentials({...SignupCredentials,[e.target.name]:e.target.value});
    };
    const [InValidInput,setInValidInput]=useState({mobilenumber:false,email:false,passwordmismatch:false,passwordlength:false});
    const ValidateInputData = (e)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        ()=>setInValidInput({mobilenumber:SignupCredentials.mobilenumber.length!==10,
                            email:emailRegex.test(SignupCredentials.email),
                            passwordmismatch:(SignupCredentials.password!==SignupCredentials.repassword || SignupCredentials.password.length<1),
                            passwordlength:SignupCredentials.password.length<8
            })
            if(InValidInput.mobilenumber){
                return true;
            }else if(InValidInput.passwordmismatch){
                return true;
            }else if(InValidInput.passwordmismatch){
                return true;
            }else{
                return false
            }
           
     
    }
   

   
    const [message,setMessage]=useState("")
    const [ShowEnterOTP,setShowEnterOTP]=useState(false);
    
    const HandleOnsubmit = async(e)=>{
        e.preventDefault();
      try{
      createUserWithEmailAndPassword(auth,SignupCredentials.email,SignupCredentials.password).then((userCredential)=>{
        // userCredential.user.updateProfile({displayName:SignupCredentials.username});
        console.log(userCredential);
                                            toast.success('user signup successfull') ;

      }).catch((error)=>{
        console.log(error);
        toast.error(error.message)
      })
                             
      }catch(error){
        console.log(error);
        toast.error('error occured try agian!!')
      }
    };
    return(

        <>
        <FullScreen>
          <Toaster
              position='top-center'
              toastOptions={{duration:5000}}
              />
     <CenterBox>
      <Wrapperleft>
          <h1 style={{textAlign:'center'}}>SIGN UP</h1>
          <InputForm onSubmit={HandleOnsubmit}>
              <Lables>Name</Lables>
          <Input onChange={onchangeSignupCredentials} name='username' value={SignupCredentials.username} placeholder='Enter Name' type='text'/>
          <Lables>Mobilenumber  &nbsp;{InValidInput.mobilenumber && <InvalidMsg> Invalid Mobilenumber</InvalidMsg>}</Lables>
  
              
              <Input onChange={onchangeSignupCredentials} name='mobilenumber' value={SignupCredentials.mobilenumber} placeholder='Enter MobileNumber' type='number'/>
              <Lables>Email   </Lables>
              
              <Input onChange={onchangeSignupCredentials} name='email' value={SignupCredentials.email} placeholder='Enter Email'type='email'/>
              
              <Lables>password {InValidInput.passwordlength && <InvalidMsg> &nbsp; Password must have 8 characters</InvalidMsg>}</Lables>
  
              <Input onChange={onchangeSignupCredentials} name='password' value={SignupCredentials.password} placeholder='Enter password' type={`${showpassword ? 'text':'password'}`}/>
              <Showpassdiv>
                  <div><input type="checkbox" onChange={showpassChange} name="showpassword" id="" /> Show Password</div>
              </Showpassdiv>
              {InValidInput.passwordmismatch && <InvalidMsg>Password Mismatch</InvalidMsg>}
              <Input onChange={onchangeSignupCredentials} name='repassword' value={SignupCredentials.repassword} placeholder='Reenter password' type={`${showpassword ? 'text':'password'}`}/>
              <SignupBtn type='submit'>REQUEST OTP</SignupBtn>
        
              <BoderDiv></BoderDiv>
          </InputForm>
          <h3 style={{padding:'20px 0 10px 0',color:'black',textTransform:'capitalize'}}>Already have an account?</h3>
          <SignupBtn onClick={()=>history.push('/login')}>SIGN IN</SignupBtn>
      </Wrapperleft>
      <WrapperRight>
          <img style={{display:'flex',height:'100%',width:'auto'}} src={Signupimg} alt="" />
      </WrapperRight>
     </CenterBox>
    <BottomColor></BottomColor>
    <RightColor></RightColor>
    <LeftColor></LeftColor>
    {ShowEnterOTP && <EnterOTP email={SignupCredentials.email} message={message}/>}
    
    
      </FullScreen></>

    )
}

const FullScreen = styled.div({
    height:'100vh',
    width:'100vw',
    display:'flex',
    alignItems:'center'
    ,justifyContent:'center',
    background:'#E6E6E6',


})
const CenterBox = styled.div({
    width:'80%',
   height:'80%',
    // backgroundColor:'#FFFFFF40',
    borderRadius:'10px',
    padding:'30px 10px',
    // backdropFilter:'blur(2px)',
    display:'flex',
    alignItems:'center',justifyContent:'center',
    position:'absolute',zIndex:'10'
})
const WrapperRight = styled.div({
    width:'60%',
    minWidth:'500px',
   
    height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    borderLeft:'2px solid #E6E6E6',
    '@media (max-width: 768px)':{
        display:'none'
    }
    
    
})
const Wrapperleft = styled.div({
    width:'40%',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    '@media (max-width: 768px)':{
        width:'100%',
    }
    
})
const Input = styled.input({
    background:'#e9ecef',
    border:'none'
    ,borderRadius:'5px',
    width:'100%',
    maxWidth:'400px',
    padding:'8px 3px',
    fontSize:'16px',
    margin:'10px 0',
   
    '::-webkit-progress-inner-value':{
        display:"none"
    }
})
const SignupBtn = styled.button({
    background:'#348DF1',
    border:'none'
    ,borderRadius:'5px',
    width:'100%',color:'white',
    maxWidth:'400px',
    padding:'8px 0px',
    fontSize:'16px',
    margin:'8px 0',
    fontWeight:'bold',
    transition:'0.4s ease',
    '&:hover':{
        background:'#0F72E3',
        color:'white'
    } ,
    ':disabled':{
        opacity:'0.8'
    }      
});
const InputForm = styled.form({
    width:'100%',
   
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    margin:"0px"
})
const BoderDiv = styled.div({
    width:'90%',
    height:'3px',
    background:'#e9ecef',
    borderRadius:'5px'
})
const Showpassdiv=styled.div({
    display:'flex',justifyContent:'space-between',width:'80%',
    '@media (max-width: 768px)':{
        width:'100%'
    }
})
const BottomColor = styled.div({
    background:'#F19934',
    width:'100%',
    height:'100%',clipPath: 'polygon(0 0%, 9% 0, 100% 100%, 0 49%)',
    position:'absolute',
 

});
const LeftColor = styled.div({
    background:'#3A34F1',
    width:'100%',position:'absolute',
    height:'100%',
    clipPath:'polygon(96% 0, 100% 0, 100% 100%, 84% 100%)',
    '@media (max-width: 768px)':{
        clipPath: 'polygon(96% 0, 100% 0, 100% 100%, 54% 100%)'
    }
});
const RightColor = styled.div({
    background:'#34EBF1',
    width:'100%',position:'absolute',
    height:'100%',
    clipPath:'polygon(100% 100%, 100% 100%, 0 100%, 0 48%)'
});
const InvalidMsg = styled.p({
    color:'red',
    textTransform:'capitalize'
    ,fontWeight:'normal'
});
const Lables = styled.label({
    width:'100%',
    maxWidth:'400px',
    textTransform:'capitalize',
    fontWeight:'bold',display:'flex'
});

export default  Signup;