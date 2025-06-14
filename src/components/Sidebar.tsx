// Компонент боковой панели 
import React from 'react'
import type { Primitive } from '../types/types'
import { Box, Button, List, ListItem, Typography } from '@mui/material';

// пропсы
interface Props{
    primitiveList: Primitive[];
    onSelect: (id: string)=> void;
    onAddClick: ()=>void;
    onClearClick : ()=> void;

}

const Sidebar:React.FC<Props> = ({primitiveList, onSelect, onAddClick, onClearClick}) => {
  return (
    <Box width="350px" p={1} sx={{border: "1px solid", overflow: "auto", height: "98vh"} }>
        <List>
            {primitiveList.map((primitive)=> (
          
                <ListItem key={primitive.id} onClick={()=>onSelect(primitive.id)} sx={
                    {background: primitive.selected ? "#cfe8fc" : "transparent", cursor:"pointer", display: "flex", justifyContent:"space-between"}}
                >
                    
                        <Typography>
                            {primitive.type.toUpperCase()}| Pos: ({primitive.position.map(n => n.toFixed(1)).join(", ")} )
                        </Typography>
                        <Box sx={{bgcolor: primitive.color,
                                width: 30,
                                height: 30,
                                borderRadius: 1,
                                }}/> 
                </ListItem>
            ))}
        </List>
        <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
            <Button variant="contained" onClick={onAddClick} sx={{width:"150px"}}>Add</Button>
            <Button variant="outlined" sx={{mt:1, width:"150px"}} onClick={onClearClick}>Clear</Button>

        </Box>

    </Box>
    
  )
}

export default Sidebar


