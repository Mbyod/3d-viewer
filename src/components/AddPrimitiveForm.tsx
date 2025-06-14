//Компонет popup окно для внесения параметров / форма добавления примитива
import React, { useState } from 'react'
import type {PrimitiveType}  from '../types/types';
import { Dialog, DialogTitle,DialogContent, FormControl, InputLabel, MenuItem, Select, TextField, Button, Box} from '@mui/material';


// пропсы
interface Props{
    open: boolean;
    onClose: ()=> void;
    onAdd: ( 
        type: PrimitiveType,
        width: number,
        height: number,
        depth: number,
        count: number,
    ) => void;
}

const AddPrimitiveForm: React.FC<Props> = ({open, onAdd, onClose}) => {

    // стейты
    const [type, setType] = useState<PrimitiveType>('cube');
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [depth, setDepth] = useState(1);
    const [count, setCount] = useState(1);

    // обработчик отправки
    const handleSubmit = () =>{
        onAdd(type, width, height, depth, count);
        onClose();
    }

    
  return (
    <Dialog open={open} onClose={onClose}  >
        <DialogTitle>Add Primitive</DialogTitle>
        <DialogContent>
            <FormControl fullWidth margin='dense'>
                <InputLabel>Type</InputLabel>
                <Select label="Type" value={type} onChange={(e)=>setType(e.target.value as PrimitiveType)}>
                    <MenuItem value ="cube">Cube</MenuItem>
                    <MenuItem value ="pyramid">Pyramid</MenuItem>
                </Select>
            </FormControl>
            <TextField label="Width" type='number' fullWidth value={width} onChange={(e)=>setWidth(Number(e.target.value))} sx={{mt:"20px"}}/>
            <TextField label="Height" type='number' fullWidth value={height} onChange={(e)=>setHeight(Number(e.target.value))} sx={{mt:"20px"}}/>
            <TextField label="Depth" type='number' fullWidth value={depth} onChange={(e)=>setDepth(Number(e.target.value))} sx={{mt:"20px"}}/>
            <TextField label="Count" type='number' fullWidth value={count} onChange={(e)=>setCount(Number(e.target.value))} sx={{mt:"20px"}}/>
        </DialogContent>
        <Box sx={{display: "flex", justifyContent: "center", columnGap: "50px",mb:"20px"}}>
            <Button variant="contained" onClick={handleSubmit} >Submit</Button>
            <Button onClick={onClose}>Discard</Button>
        </Box>
    </Dialog>
  )
}

export default AddPrimitiveForm