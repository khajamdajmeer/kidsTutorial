'use client';
import { useEffect,useRef, useState } from "react";
import './page.css';
import Head from "next/head";
import styled from "styled-components";
import mbhind from '../Resources/mbhind.png';
import greenground from '../Resources/greenground.png'
import Image from "next/image";
import tutor from '../Resources/tut.png';
import Cloud from '../Resources/cloud.png';
import d1 from '../Resources/d1.png';
import d2 from '../Resources/d2.png';
import d3 from '../Resources/d3.png';
import d4 from '../Resources/d4.png';
import q1 from '../Resources/q1.png';
import q2 from '../Resources/q2.png';
import q3 from '../Resources/q3.png';
import q4 from '../Resources/q4.png';
import c1 from '../Resources/c1.png';
import Music from '../Resources/music.mp3';
import { fireStore } from "../FireBase-config";

import Cookies from "js-cookie";

const CountLesson = () => {

  const Creatingcollectin =async()=>{

    Cookies.get('uid')
    // const db = fireStore;
    // const level = fireStore.collection('level')
    // const levels = collection(db,'level');
    // await setDoc(doc(levels,uid),{
    //   email:'ajukhaja@gmail.com',
    //   name:'ajmeer'
    // });
  }
  
   
    const [mute,setMute]= useState(false);
    const HandleMute = ()=>{
      setMute(!mute);
    }
    useEffect(()=>{
      Creatingcollectin();
      console.log('start playing')
    },[])
    
  return (
    <>
    <BackGround>
    <Nav>
    <div>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <span className="material-symbols-outlined">
arrow_back
</span>
    </div>
   
      <Image src={mbhind} style={Bhindclode} alt='.' />
    <div style={{cursor:'pointer',zIndex:5}} onClick={HandleMute}>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />{mute&& <span className="material-symbols-outlined" style={{zIndex:'5'}}>volume_off</span>}
    {!mute&& <span className="material-symbols-outlined" style={{zIndex:'5'}}>volume_up</span>}
    </div>
    </Nav>
    <div className="valuecount">
      <Image src={c1} className="valimg"></Image>
      {/* <span className="Count">4/5</span> */}
    </div>
    <Image src={greenground} className="bhindGround"/>
    <Image src={tutor} className="tutor"/>
    <h2 className="Question">How many friends are there in the cloud?</h2>
    <div className="cloudans">
    <Image src={Cloud} style={{maxHeight:'100%',maxWidth:'100%',position:'absolute'}}/>
    <Image className="bots" src={d1}/>
    <Image className="bots"  src={d2}/>
    <Image className="bots"  src={d3}/>
    <Image className="bots"  src={d4}/>
    </div>
    <div className="answers">
    <Image src={q1} className="options"/>
    <Image src={q2} className="options"/>
    <Image src={q3} className="options"/>
    <Image src={q4} className="options"/>
    </div>
    </BackGround>
    </>
  )
}

const BackGround = styled.div({
    width:'100vw',
    height:'100vh',
    background:'white',
    overflow:'hidden'
})
const Nav = styled.div({
    width:'100vw',
    height:'40px',
    display:'flex',
    justifyContent:'space-between',alignItems:'center',
    boxSizing:'border-box',
    padding:'10px 10px',
    position:'relative'
})
const Bhindclode = {
  position:'absolute',
  top:'0',
  right:'0',
  zIndex:'1',
  height:'60px',
  width:'auto',

}
const Ground = {
  position:'absolute',
  bottom:'0',
  width:'100vw',
  maxHeight:'300px',
  zIndex:'5'
}
const Tutor = {
  position:'absolute',
  right:'5%',
  bottom:'5%',
  zIndex:'10',
}
const Cloudstyle = {
  position:'absolute',
  top:'10%',
  left:'10%',
  height:'230px'
  ,width:'50%'
}

export default CountLesson;