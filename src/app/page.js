"use client";
import Image from "next/image";

import { useEffect } from "react";
import styles from "./page.module.css";
import styled from "styled-components";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import {auth} from './FireBase-config';
import firebase from 'firebase/app';

const Home=()=> {
  const history = useRouter();
  const HandleLessonButton = (page)=>{
    history.push(`/${page}`)
  }
  const HandleLogout = ()=>{
    const cookies = Cookies.get()
    for(const cookie in cookies){
      Cookies.remove(cookie)
    }
    history.push('/login')
    
  }
  useEffect(()=>{
    const id = auth;
  })
  return (
    <>
    
    <Navbar>
    <Menu>
      <MenuList>
        <button onClick={HandleLogout}>logout</button>
      </MenuList>
    </Menu>
    </Navbar>
    <CountLesson onClick={()=>HandleLessonButton('countlesson')}>Count Lessons</CountLesson>
    </>
  );
}

const CountLesson = styled.button({
  padding:'5px 10px',
  margin:'50px 50px',

})
const Navbar = styled.div({
  width:'100vw',
  height:'40px',
  background:'black',
  display:'flex',
  alignItems:'center',
  justifyContent:'end',
  color:'wheat'
});
const Menu = styled.ul({
  display:'flex',
  listStyle:'none'
})
const MenuList = styled.li({
  padding:'0 10px',
  fontWeight:'bold',
  fontSize:'18px'
})
export default Home;