import React from "react";

import cat from "./models/cat.gltf";

import Three from "./Three";
export default function Avatar() {
 
  return (
  
     <Three
             
                model={cat}
                 />
    
  );
}