"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'

interface Streamer{
	jumpUrl: string;
	texture: string;
  }

interface iconProps {
	streamer: Streamer;
	setIndex: (lookAt: number) => void;
	index: number;
	width: string;
	height: string;
}

const Icon: React.FC<iconProps> = ({ streamer, setIndex, index, width, height}) => {
	const mountRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		if (!mountRef) return;
		const img = document.createElement('img');
		img.src = streamer.texture;
		img.alt = `IconImage${index}`;
		img.style.width = '100%';
		img.style.height = '100%';
		img.style.borderRadius = '50%';
		img.style.border = '8px solid rgb(216, 216, 201)'

		mountRef.current?.appendChild(img);

		const handleMouseOver = () => {
			setIndex(index);
			console.log('now!!!')
		}
		const handleMouseLeave = () => {
			setIndex(-1);
		}
		const handleMouseClick = () => {
			window.location.href = streamer.jumpUrl;
		}

		img.addEventListener('mouseover', handleMouseOver);
		img.addEventListener('mouseleave', handleMouseLeave);
		img.addEventListener('click', handleMouseClick);

		return () => {
			mountRef.current?.removeChild(img)
			img.removeEventListener('mouseover', handleMouseOver);
			img.removeEventListener('mouseleave', handleMouseLeave);
			img.removeEventListener('click', handleMouseClick);
		}
	}, [streamer, setIndex, index]);

	return <div ref={mountRef} style={{ width: width, height: height, display: 'inline-block', margin: '5px'}} />;
}

export default Icon;
