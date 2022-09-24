import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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