"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface Face {
  jumpUrl: string;
  texture: string;
}

interface ThreeSceneProps {
  face: Face[];
	width: string;
	height: string;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ face, width, height }) => {
  const mountRef = useRef<HTMLDivElement>(null);

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
    const materials = face.map(f => new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(f.texture) }));

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

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

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    let countStop = 0;
		let countClick = 0;
		let isClick = false;

    const handleMouseUp = () => {
			if (countClick > 0) {
				isClick = true;
			} else {
				countStop = 50;
			}
    };

		const handleMouseDown = () => {
			countClick = 10;
		}

    const animate = () => {
      requestAnimationFrame(animate);

      if (countStop > 0) {
        countStop--;
      } else {
        cube.rotation.x += 0.00603;
        cube.rotation.y += 0.0081;
      }
			if (countClick > 0) {
				countClick--;
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
					window.location.href = face[faceIndex].jumpUrl;
					isClick = false;
				}
        overlayMesh.visible = true;
      } else {
        overlayMesh.visible = false;
				isClick = false
      }

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
  }, [face]);

  return <div ref={mountRef} style={{ width: width, height: height, display: 'inline-block' }} />;
};

export default ThreeScene;
