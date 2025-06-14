// Компонет одного примитива
import React from 'react'
import type { Primitive } from '../types/types'
import { Edges } from '@react-three/drei';
// пропсы
interface Props {
    primitive: Primitive;
    onSelect: (id: string) => void;
}

const PrimitiveItem: React.FC<Props>= ({primitive, onSelect}) => {

    // цвет выделенного примитива
    const color = primitive.selected ? "yellow" : primitive.color;

    // обработчик нажатия / выделение примитива
    const handleClick = ()=>{
        onSelect(primitive.id)
    }

    // создаем геометрию
    const geometry = 
        primitive.type === "cube" ? (
            // куб
            <boxGeometry args={[primitive.width, primitive.height, primitive.depth]} />
        ) : (
            // пирамида
            <coneGeometry args={[primitive.width / 2, primitive.height, 4 ]}/>
        )

    
  return (
    <mesh position={primitive.position} onClick={handleClick}>
        {geometry}
        <meshStandardMaterial color={color}/>
        {/* Обводка */}
        {primitive.selected &&
        <Edges scale={1.05} // немного больше, чтобы не совпадала с гранями
            color="red"
        />
        }
              <Edges scale={1.05} 
            color="black"
        />
    </mesh>
  )
}

export default PrimitiveItem


