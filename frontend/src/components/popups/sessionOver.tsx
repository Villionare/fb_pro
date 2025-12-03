import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSessionContext from '../../context/useContext';

interface Props {
  setShowPopUp: (value: boolean) => void;
}


const SessionOver: React.FC<Props> = ({ setShowPopUp }) => {
  const { user, setUser } = useSessionContext();
  const navigate = useNavigate();

  const btnAction = () => {


    // here logout is not doing anything as the session gets already deleted on the server before user can even press
    // "back to home" button. so i need to create a fun which will just set the user context to null.
    setUser(null); //cleaning context
    localStorage.removeItem('user'); //clearing the user data from localStorage
    setShowPopUp(false);
    navigate('/');
  }
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-999'>

      <div className='flex flex-row justify-around items-center h-full w-full bg-black border-2 border-red-600 text-white'>
        <pre className='white-space: pre; font-family: monospace; text-[1px]'>
          {`
              --:                                                           :::              
           --%@@@%-:                                                     :-#@@@%-:           
          :+@@@@@@@+:                                                   -=@@@@@@@*:          
         :-@@@@@@@@@-                ::--+*#######*+--::                -@@@@@@@@@-          
      :-*@@@@@@@@@@*:            ::-*###################*-::            :*@@@@@@@@%%*--      
     -%@@@@@@@@@@@#-:          :-*#########################*-:          :-*@@@@@@@@@@@%:     
    :=@@@@@@@@@@@@@@*-:      --###**##########################--       :+@@@@@@@@@@@@@@=:    
    :-@@@@@@@@@@@@@@@@*-:  :-*###-+##-*###################*-*##*-:   :+@@@@@@@@@@@@@@@@-:    
     :-%@@@@%-#@@@@@@@@@+:-=###*-##*-##==##############=+###=+###-::+@@@@@@@@@%-%@@@@%-:     
       ::--:  --%@@@@@@@@#=########-###*################-###*-####=#@@@@@@@@@-- ::--::       
                :-%@@@@@#-------------------------------------------#@@@@@%--                
                  --%@@@---------------------------------------------@@@@--                  
                    :-%*---------------------------------------------*@=:                    
                      -------------------------------------------------                      
           :----------------------------------------------------------------------:          
           --####################################################################=:          
            ::--------------------------------------------------------------------           
                       :%@@@@@@@@@@@*=+#@@@@@@@@@@@@@%+=+%@@@@@@@@@@%-                       
                       :+@@@@@@@@=--------%@@@@@@@@---------@@@@@@@@+:                       
                        :%@@@@@@=----------%@@@@@@-----------@@@@@@%:                        
                        :-@@@@@#-----------+@@@@@*-----------*@@@@@-:                        
                         :-@@@@%-----------+@@@@@#-----------#@@@@-:                         
                           -#@@@#---------=@@@@@@@+---------*@@@%-:                          
                            :=@@@@+------%@@@@@@@@@@=----:=@@@@=:                            
                              -+@@@@@@@@@@@@+----@@@@@@@@@@@@+-                              
                                :-%@@@@@@@@@#---+@@@@@@@@@%-:                                
                               :--*+-*%@@@@@@@@@@@@@@@%*-+-=-:                               
                             :-*%-@@@@@*-===++*++===-#@@@@%=@+::                             
                           :-*@@++@@@@@*#@@@@@=@@@@@-%@@@@@=%@@+:                            
                         :-*@@@@=@%==#@=@@@@@@=@@@@@+*@%+-*#+@@@@+-                          
                       :-*@@@@@*+@@@@@#-=-=+*#-**+=---%@@@@@=%@@@@@=:                        
               -:-:: :-#@@@@@@@*-+@@@@+*@@@@@@=@@@@@@=@@@@@%-*@@@@@@@-:  :---:               
             -#@@@@@=*@@@@@@@@@+*@%==%=@@@@@@@=@@@@@@**@+-*@*+@@@@@@@@@=+@@@@@=-             
            -%@@@@@@@@@@@@@@@#--+@@@@@%+-=+#%%=%%%*=-=*@@@@@+--@@@@@@@@@@@@@@@@*-            
           ::@@@@@@@@@@@@@@#-:  -@@@@@@@@@@@@@@@@@@@@@@@@@@@-: :=@@@@@@@@@@@@@@%-            
            -*@@@@@@@@@@@%-:    :+@@@@@@@@@@@@@@@@@@@@@@@@@+-    :=@@@@@@@@@@@@=-            
             :-+#%%@@@@@@@%-     -#@@@@@@@@@@@@@@@@@@@@@@@*-    :-@@@@@@@@@@%+-:             
                 :#@@@@@@@@-:     -+@@@@@@@@@@@@@@@@@@@@@--     -+@@@@@@@@+::                
                 -=@@@@@@@#-        --@@@@@@@@@@@@@@@@*--       :-@@@@@@@@-                  
                  :-*@@@%-:           ::--=*#%%#*+-:-:           :-*@@@@*::                  
                      ::                                            :-::                     
`}
        </pre>
        <div className='flex flex-col'>
          <p>
            {user?.session_data.username}, Your session has been over!!! <br />
            {user?.session_data.type === 'admin' ? <span>Please Login again to continue using!</span> : <span>Login again with a different username</span>}
          </p>
          <button onClick={btnAction} className='bg-black p-2 border-1 border-gray-400 cursor-pointer'>
            Return to Home
          </button>

        </div>
      </div>
    </div>
  );
};

export default SessionOver;