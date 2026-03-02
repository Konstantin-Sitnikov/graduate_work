import { useState } from "react";



import Header from "./components/header/header";
import Main from "./components/main/main";
import { Modal } from "./components/authn/authn";

function App() {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
  
    < Header setShowModal={setShowModal} />
    < Main />
    {
      showModal? (<Modal>
                    <div>
                      <h1>модальное окно</h1>
                      <button onClick={()=>{
                        setShowModal(false)}}>Закрыть</button>
                    </div>
                  </Modal>): null
    }

    
    </>
  );
}

export default App;
