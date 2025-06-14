// Компонент 3d-сцены
import React from 'react'
import type { Primitive } from '../types/types'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PrimitiveItem from './PrimitiveItem';

// пропсы
interface Props{
    primitiveList: Primitive[];
    onSelect:(id:string) => void;
}

const SceneCanvas:React.FC<Props> = ({primitiveList, onSelect}) => {
    
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 60 }} >
        <gridHelper args={[20,20]}/>
        <ambientLight/>
        <OrbitControls/>
        {/* заполняем примитивами из массива примитивов */}
        {primitiveList.map((primitive)=>{
            return(
                <PrimitiveItem  key={primitive.id} primitive={primitive} onSelect={onSelect}/>
            );
        })}

    </Canvas>
  )
}

export default SceneCanvas