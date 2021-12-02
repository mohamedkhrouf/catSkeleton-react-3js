import React, { useEffect, useState } from 'react'
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import duck from "../models/standard-female-figure.gltf";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
function Three(props) {
   function RandomColor()
{
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
  
}

  const handleChange = event => {
    console.log(event.target.value)
    setSelectedBone(event.target.value);
   
  };
    const [selectedBone,setSelectedBone]= useState("crane")
     const [selectedBoneIndex,setSelectedBoneIndex]= useState(3)
    const [bones, setBones] = useState([])
    useEffect(() => {

    var scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
    const canvas = document.querySelector("canvas.webgl");
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });

    renderer.setSize(500, 1000);


    const gltfLoader = new GLTFLoader();
    gltfLoader.load(props.model, gltf => {
      gltf.scene.position.y = 1;
      gltf.scene.rotation.y=-3.14/2
      let material = new THREE.MeshStandardMaterial({
       color: RandomColor(),
      emissive: 0x0,
         roughness: 1,
       metalness: 0.2
       });
       
      gltf.scene.children[selectedBoneIndex].material=material
      /*  gltf.scene.children.forEach((e,i)=>{
         setBones(value=>[...value,{name:e.name,index:i}])
        let material = new THREE.MeshStandardMaterial({
       color: RandomColor(),
      emissive: 0x0,
         roughness: 1,
       metalness: 0.2
       });
           if(e.material){
               e.material=material
           }
       }) */
       setBones(gltf.scene.children)
     
     console.log(gltf.scene)
    
       material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x0,
        roughness: 1,
        metalness: 0.2
      });

      gltf.scene.children.forEach(c => {
        c.children.forEach(child => {
          child.material = material;
        });
      });
 
    
      scene.add(gltf.scene);
    });
  
 

    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    /**
     * Sizes
     */
    const sizes = {
      width: 1000,
      height: 500
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = 1000;
      sizes.height = 500;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      15,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(0, 10, 20);
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0.75, 0);
    controls.enableDamping = true;

    /**
     * Renderer
     */

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */
   

    const tick = () => {
     
      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
    }, [selectedBoneIndex,props.model])
    return (
    <>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">{selectedBone.toString()}</InputLabel>
  <Select
    defaultValue="crane"
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedBone.toString()}
    label="bone"
    onChange={handleChange}
  >

    {bones.map((e,index)=>{ return  <MenuItem onClick={()=>{ setSelectedBoneIndex(index)}} key={index} value={e.name}> {e.name}</MenuItem>
    
   })}
   
  </Select>
</FormControl>



    
        <canvas className="webgl"></canvas>
        </>
    )
}

export default Three
