"use client";
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import loginimg from '../Resources/bgloginimg.png';
import toast,{Toaster} from 'react-hot-toast';
import Cookies from 'js-cookie';
import {auth} from '../FireBase-config'
import {signInWithEmailAndPassword} from 'firebase/auth'
const Login = ()=>{
    const history = useRouter();
    const [showpassword,setShowpassword]=useState(false);
    const showpassChange = ()=>{
        setShowpassword(!showpassword);
    };
    const [LoginCredentials,setLoginCredentials] = useState({username:'',password:''});
    const onchangeLoginCredentials = (e)=>{
        setLoginCredentials({...LoginCredentials,[e.target.name]:e.target.value});
    };
    
    useEffect(()=>{
        const TokenExists = Cookies.get('auth-token');
        if(TokenExists){
            history.push('/')
        }
    },[])
    

    const HandleLogin = async(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth,LoginCredentials.username,LoginCredentials.password).then((userCredential)=>{
            Cookies.set('auth-token',userCredential.user.accessToken);
            Cookies.set('uid',userCredential.user.uid);
            history.push('/')
        }).catch((error)=>{
            console.log(error);
            toast.error(error.message)
        })
     
    }
    return(
        <>
    <FullScreen>
        <Toaster
            position='top-center'
            toastOptions={{duration:5000}}/>
   <CenterBox>
    <Wrapperleft>
        <h1 style={{textAlign:'center'}}>LOGIN</h1>
        <ForgotPasswordBtn onSubmit={HandleLogin}>
            <Input onChange={onchangeLoginCredentials} name='username' value={LoginCredentials.username} placeholder='username'type='text'/>
            <Input onChange={onchangeLoginCredentials} name='password' value={LoginCredentials.password} placeholder='password' type={`${showpassword ? 'text':'password'}`}/>
            <Showpassdiv>
                <div><input type="checkbox" onChange={showpassChange} name="showpassword" id="" /> Show Password</div>
                {/* <Link to={'/forgot-password'}>Forgot Password?</Link> */}
            </Showpassdiv>
            <LoginBtn type='submit'>SIGN IN</LoginBtn>
            <BoderDiv></BoderDiv>
        </ForgotPasswordBtn>
        <h3 style={{padding:'20px 0 10px 0',color:'gray'}}>Don't have an account?</h3>
        <LoginBtn onClick={()=>history.push('/signup')}>SIGN UP</LoginBtn>
    </Wrapperleft>
    <WrapperRight>
        <img style={{display:'flex',height:'100%',width:'auto'}} src={loginimg} alt="" />
    </WrapperRight>
   </CenterBox>
  <BottomColor></BottomColor>
  <LeftColor></LeftColor>
  <RightColor></RightColor>
    </FullScreen>
    </>

    )
};
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
    padding:'10px 3px',
    fontSize:'18px',
    margin:'10px 0'
})
const LoginBtn = styled.button({
    background:'#348DF1',
    border:'none'
    ,borderRadius:'5px',
    width:'100%',color:'white',
    maxWidth:'400px',
    padding:'10px 0px',
    fontSize:'18px',
    margin:'10px 0',
    fontWeight:'bold',
    transition:'0.4s ease',
    '&:hover':{
        background:'#0F72E3',
        color:'white'
    }       
});

const ForgotPasswordBtn = styled.form({
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
})

export default Login;