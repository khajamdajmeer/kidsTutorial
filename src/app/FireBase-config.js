import firebase,{initializeApp} from "firebase/app";
import {getAuth} from'firebase/auth'
import {getFirestore} from'firebase/firestore';


const FireBaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_WEB_APIKEY,
authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDERID,
appId: process.env.NEXT_PUBLIC_APP_ID,
measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
};
    
   const app = initializeApp(FireBaseConfig);
   export const fireStore = getFirestore(app);
    export const auth =  getAuth(app);
