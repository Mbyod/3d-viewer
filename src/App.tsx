import { Box } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import type { Primitive, PrimitiveType } from "./types/types";
import SceneCanvas from "./components/SceneCanvas";
import AddPrimitiveForm from "./components/AddPrimitiveForm";
import { v4 as uuidv4 } from "uuid";




const App: React.FC = () => {
  

  const randomColor = () => {
    const hexAr = ["a","b","c","d","e","f","1","2","3","4","5","6","7","8","9","0"];

    let hexColor = "#"
    
    for (let i = 0 ; i<6; i++ ){
        hexColor += hexAr[Math.floor(Math.random()*hexAr.length)];
    }

    return hexColor;
  }
    


  const randomPosition = (): [number, number, number] => [
    Math.random() * 10 -5,
    Math.random() * 10,
    Math.random() * 10 -5,
  ]


  const selectPrimitive = (id:string) =>{
    setSelectedId(id);
    setPrimitiveList((prev)=>
      prev.map((p)=> ({...p, selected: p.id === id}))
    )
  }

  const clearAll = () =>{
    setPrimitiveList([]);
    setSelectedId(null);
  }


  const addPrimitives = (
    type: PrimitiveType,
    width: number,
    height: number,
    depth: number,
    count: number,
  ) =>{
    const newPrimitive: Primitive[] = Array.from({length: count}, ()=> ({
      id: uuidv4(),
      type,
      width,
      height,
      depth,
      position: randomPosition(),
      color: randomColor(),
      selected: false,
    }))
    setPrimitiveList([...primitiveList, ...newPrimitive])
  }

  const [primitiveList, setPrimitiveList] = useState<Primitive[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box display="flex" >
        <Sidebar
          primitiveList={primitiveList}
          onSelect={selectPrimitive}
          onAddClick={()=> setDialogOpen(true)}
          onClearClick={clearAll}
        />
        <Box flexGrow={1} height="100vh">
          <SceneCanvas primitiveList={primitiveList} onSelect={selectPrimitive} />
        </Box>
        <AddPrimitiveForm open={dialogOpen} onClose={()=> setDialogOpen(false)} onAdd={addPrimitives}/>
    </Box>
  )
}

export default App

// import React, { useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   List,
//   ListItem,
//   Typography
// } from "@mui/material";
// import * as THREE from "three";
// import { v4 as uuidv4 } from "uuid";

// // Тип примитива
// type PrimitiveType = "cube" | "pyramid";

// // Структура примитива
// interface Primitive {
//   id: string;
//   type: PrimitiveType;
//   width: number;
//   height: number;
//   depth: number;
//   position: [number, number, number];
//   color: string;
//   selected: boolean;
// }

// function App() {
//   // Состояние всех примитивов
//   const [primitives, setPrimitives] = useState<Primitive[]>([]);
//   // Состояние выбранного ID
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   // Состояние окна добавления
//   const [open, setOpen] = useState(false);

//   // Поля формы
//   const [type, setType] = useState<PrimitiveType>("cube");
//   const [width, setWidth] = useState(1);
//   const [height, setHeight] = useState(1);
//   const [depth, setDepth] = useState(1);
//   const [count, setCount] = useState(1);

//   // Генерация случайного цвета
//   const randomColor = () =>
//     "#" + Math.floor(Math.random() * 16777215).toString(16);

//   // Генерация случайной позиции
//   const randomPosition = (): [number, number, number] => [
//     Math.random() * 10 - 5,
//     Math.random() * 5,
//     Math.random() * 10 - 5,
//   ];

//   // Добавление группы примитивов
//   const handleAdd = () => {
//     const newPrimitives: Primitive[] = Array.from({ length: count }, () => ({
//       id: uuidv4(),
//       type,
//       width,
//       height,
//       depth,
//       position: randomPosition(),
//       color: randomColor(),
//       selected: false,
//     }));
//     setPrimitives([...primitives, ...newPrimitives]);
//     setOpen(false);
//   };

//   // Очистить сцену
//   const handleClear = () => {
//     setPrimitives([]);
//     setSelectedId(null);
//   };

//   // Выбор примитива по ID
//   const selectPrimitive = (id: string) => {
//     setSelectedId(id);
//     setPrimitives((prev) =>
//       prev.map((p) => ({
//         ...p,
//         selected: p.id === id,
//       }))
//     );
//   };

//   return (
//     <Box display="flex">
//       {/* Левая панель управления */}
//       <Box width="300px" p={2}>
//         <Button variant="contained" onClick={() => setOpen(true)}>+ Добавить</Button>
//         <Button variant="outlined" onClick={handleClear} sx={{ mt: 1 }}>Очистить</Button>

//         <List>
//           {primitives.map((p) => (
//             <ListItem
//               key={p.id}
//               onClick={() => selectPrimitive(p.id)}
//               sx={{
//                 background: p.selected ? "#cfe8fc" : "transparent",
//                 cursor: "pointer",
//               }}
//             >
//               <Typography>
//                 {p.type.toUpperCase()} | {p.color} | Pos: ({p.position.map(n => n.toFixed(1)).join(", ")})
//               </Typography>
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Правая часть — 3D-сцена */}
//       <Box flexGrow={1} height="100vh" width="1000px" border="2px solid white">
//         <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
//           <ambientLight />
//           <OrbitControls />

//           {primitives.map((p) => (
//             <PrimitiveMesh key={p.id} primitive={p} onSelect={selectPrimitive} />
//           ))}
//         </Canvas>
//       </Box>

//       {/* Модальное окно добавления */}
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Добавить примитивы</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Тип</InputLabel>
//             <Select value={type} onChange={(e) => setType(e.target.value as PrimitiveType)}>
//               <MenuItem value="cube">Куб</MenuItem>
//               <MenuItem value="pyramid">Пирамида</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField label="Ширина" type="number" fullWidth value={width} onChange={(e) => setWidth(Number(e.target.value))} />
//           <TextField label="Высота" type="number" fullWidth value={height} onChange={(e) => setHeight(Number(e.target.value))} />
//           <TextField label="Глубина" type="number" fullWidth value={depth} onChange={(e) => setDepth(Number(e.target.value))} />
//           <TextField label="Количество" type="number" fullWidth value={count} onChange={(e) => setCount(Number(e.target.value))} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Отмена</Button>
//           <Button onClick={handleAdd}>Добавить</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// // Компонент отрисовки примитива
// const PrimitiveMesh = ({
//   primitive,
//   onSelect,
// }: {
//   primitive: Primitive;
//   onSelect: (id: string) => void;
// }) => {
//   const color = primitive.selected ? "yellow" : primitive.color;

//   // Обработка клика
//   const handleClick = () => {
//     onSelect(primitive.id);
//   };

//   let geometry;
//   if (primitive.type === "cube") {
//     geometry = <boxGeometry args={[primitive.width, primitive.height, primitive.depth]} />;
//   } else {
//     // Пирамида — как конус с 4 сегментами
//     geometry = <coneGeometry args={[primitive.width / 2, primitive.height, 4]} />;
//   }

//   return (
//     <mesh
//       position={primitive.position}
//       onClick={handleClick}
//     >
//       {geometry}
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// };

// export default App;

