// @ts-nocheck
import { useEffect, useRef } from "react";
import { Fretboard } from "@moonwave99/fretboard.js";
import {colors} from "./config"
type FretboardWrapperProps = {
    options?: any;
    initialDots?: any;
    onDotsChange?: any;
    root?: string;
    type?: string;
}

export default function FretboardWrapper({
  root,
  type,
}: FretboardWrapperProps) {

  // create a ref for the fretboard
  const fretboardRef: any = useRef(null);
  
  const fretboardDivRef:any = useRef(null);




  useEffect(() => {
    if (!fretboardRef.current) {
      fretboardRef.current = new Fretboard({
        el: fretboardDivRef.current,
        dotStrokeColor:  "black",
      });
      //if root and type are defined render scale of root and type else just render the fretboard
  

  
    }
    if(root && type){
      fretboardRef.current.renderScale({
        type: type,
        root: root,
   
      });
    }
    else{
      fretboardRef.current.render()
    }
    

    fretboardRef.current.style({
      text: ({ degree, interval }:any) => [1, 3, 5].indexOf(degree) > -1 ? interval : null,
      fill: ({ degree, interval}:any) =>
        [1, 3, 5].indexOf(degree) > -1
          ? colors.intervals[interval]
          : colors.defaultFill,
    });

    return () => {
      console.log("remove");
      fretboardRef.current.removeEventListeners();
    };
  }, [root,type]);

  return <div ref={fretboardDivRef}></div>;
}