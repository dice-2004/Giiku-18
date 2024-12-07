"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { runInNewContext } from 'vm';

interface Streamer{
  jumpUrl: string;
  texture: string;
}

interface ThreeCudeProps {
  streamers: Streamer[];
	width: string;
	height: string;
	lookAt: number;
}

const ThreeCude: React.FC<ThreeCudeProps> = ({ streamers, width, height, lookAt }) => {
  const mountRef = useRef<HTMLDivElement>(null);
	const [ nowX, setNowX ] = useState(Math.random() * 3);
  const [ nowY, setNowY ] = useState(Math.random() * 3);
  const [ nowZ, setNowZ ] = useState(Math.random() * 3);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    const geometry = new THREE.BoxGeometry();
    const materials = streamers.map(f => new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(f.texture) }));

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    cube.rotation.x = nowX;
    cube.rotation.y = nowY;
    cube.rotation.z = nowZ;

    const overlayMaterials: THREE.Material[] = Array(6).fill(new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.3
    }));

    const overlayGeometry = new THREE.BoxGeometry(1.01, 1.01, 1.01);
    const overlayMesh = new THREE.Mesh(overlayGeometry, overlayMaterials);
    overlayMesh.visible = false;
    scene.add(overlayMesh);

    const highLightMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.0
    });

    camera.position.z = 2;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = 10000;
    mouse.y = 10000;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    let countStop = 0;
		let countClick = 0;
		let isClick = false;
    let countLook = 50;
    const preX = nowX;
    const preY = nowY;
    const preZ = nowZ;
    let tgtX = 0;
    let tgtY = 0;
    let tgtZ = 0;
    switch(lookAt) {
      case 0:
        tgtY = -1 * Math.PI/2;
        break;
      case 1:
        tgtY = Math.PI/2;
        break;
      case 2:
        tgtX = Math.PI/2;
        break;
      case 3:
        tgtX = -1 * Math.PI/2;
        break;
      case 4:
        break;
      case 5:
        tgtY = Math.PI;
        break;
    }

    const handleMouseUp = () => {
			if (countClick > 0) {
				isClick = true;
			} else {
				countStop = 75;
			}
    };

		const handleMouseDown = () => {
			countClick = 10;
		}

    const animate = () => {
      requestAnimationFrame(animate);
      if(lookAt == -1){
        if (countStop > 0) {
          countStop--;
        } else {
          cube.rotation.x += 0.00603;
          cube.rotation.y += 0.0081;
          cube.rotation.y += 0.00472;
        }
        if (countClick > 0) {
          countClick--;
        }
      }else{
        // cube.lookAt(camera.position);
        // cube.rotation.x -= Math.PI / 2 ;
        // cube.rotation.y += Math.PI / 2;
        if(countLook > 0){
          cube.rotation.x += (tgtX - preX) / 50;
          cube.rotation.y += (tgtY - preY) / 50;
          cube.rotation.z += (tgtZ - preZ) / 50;
          countLook--;
        }
      }

      controls.update();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(cube);

      if (intersects.length > 0) {
        const faceIndex = intersects[0].face!.materialIndex;
        overlayMesh.rotation.copy(cube.rotation);
        overlayMesh.material = overlayMesh.material.map((_, i) => (i === faceIndex ? highLightMaterial : overlayMaterials[i]));
				if (isClick) {
					console.log(`Click${faceIndex}`);
					window.location.href = streamers[faceIndex].jumpUrl;
					isClick = false;
				}
        overlayMesh.visible = true;
      } else {
        overlayMesh.visible = false;
				isClick = false
      }

      setNowX(cube.rotation.x);
      setNowY(cube.rotation.y);
      setNowZ(cube.rotation.z);
      renderer.render(scene, camera);
    };

    animate();

    document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      mount.removeChild(renderer.domElement);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [streamers]);

  return <div ref={mountRef} style={{ width: width, height: height, display: 'inline-block' }} />;
};

export default ThreeCude;
