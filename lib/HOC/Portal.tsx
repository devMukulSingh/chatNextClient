import React, { useEffect, useState } from 'react'
import {createPortal} from "react-dom";

const Portal = ({children} : {children:React.ReactNode}) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect( () => {
    setIsMounted(true);
  },[]);
  const modal = document.querySelector('#modal');
  return isMounted && modal ? 
    createPortal(children,modal) : null
}

export default Portal