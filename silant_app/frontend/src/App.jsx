import { useState, useEffect, } from "react";
import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import { Modal, AuthN } from "./components/authn/authn";
import { getUser } from "./components/PostService";

import axios from 'axios';



function App() {
    const [showModal, setShowModal] = useState(false)
    const [userId, setUserID] = useState('')
    const [isAuthN, setIsAuthN] = useState(false)

  const updateSession = () => {
      axios.get('http://localhost:8000/_allauth/browser/v1/auth/session', {
            headers: {
                "accept": "application/json",
                'Content-Type': "application/json",
            },
            withCredentials: true
        })
        .then((res) => {
          if (res.data.status === 200) {
              const user =  res.data.data.user
              const userId = user.id
              setUserID(userId)
              setIsAuthN(true)

          } 
        }).catch(() => {
            setUserID("")
            setIsAuthN(false)
        }

        );
        
    } 


    useEffect(()=>{
        updateSession()
    },[])
    

  return (
    <>

          
          < Header setShowModal={setShowModal} />
          < Main isAuthN={isAuthN} userId={userId}/>
          < Footer />
          {
            showModal? (<Modal>
                          <AuthN setShowModal={setShowModal} updateSession={updateSession}/>
                        </Modal>): null
          }
          

          
    </>
  );
}

export default App;
