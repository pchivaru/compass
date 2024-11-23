"use client";

import React from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import dynamic from "next/dynamic";
import { useMemo } from 'react';

interface ModelProps {
    modelUrl: string;
}

export default function Model({
    modelUrl,
}: ModelProps) {

  //const Canvas = useMemo(() => dynamic(() => import("@react-three/fiber"), {ssr: false}), [])

  const model = useLoader(GLTFLoader, modelUrl)
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far:200,
        position:[-4, 3, 6],
      }}
    >
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <primitive object={model.scene} scale={0.3}/>
      <OrbitControls />

    </Canvas>
  )
}



