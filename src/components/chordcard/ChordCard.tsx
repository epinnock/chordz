import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
type ChordCardProps = {
    name?: string,
    type?: string
  };
export default function ChordCard({ name,type }: ChordCardProps){

return(<Card>
    <CardContent>
        <Typography
            sx={{ fontSize: 28 }}
            
        >
            {name+" "+type}
        </Typography>
    </CardContent>
</Card>)
}