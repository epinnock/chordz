import React, {useState,useEffect}from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import './App.css';
import ChordCard from './components/chordcard/ChordCard';
import FretboardWrapper from './components/fretboard/FretboardWrapper';
import SearchBar from './components/searchbar/SearchBar';

function App(){

const [data,setData] = useState({chord_segments:[{"chord":"D:maj","end":"6.687346896","start":"4.690430809"},{"chord":"A:min","end":"8.962902437","start":"6.733786805"}]})
// create a state variable to track if video is playing
const [playing,setPlaying]=useState(false)
// create a state variable to track the current time of the video
const [currentTime,setCurrentTime]=useState(0)
// create a state variable to track the current youtube link
const [youtubeLink,setYoutubeLink]=useState("")

const baseurl= 'https://chordz-backend-rseivhhgya-uc.a.run.app/yt?ytl='

useEffect(() => {
  console.log("useEffect called");
  // Using an IIFE
  (async function anyNameFunction() {
    const response = await axios(baseurl+youtubeLink);
    if(response.status===200){
      console.log("response",response.data);
      setData(response.data)
    }
    else{
      console.log("error");
      console.log(response.status)
    }
  })();
}, [youtubeLink]);




/*
* callback for when the video is playing
*/
const onPlay = () => {
  setPlaying(true)
}

/* callback for when the video is paused*/
const onPause = () => {
  setPlaying(false) 
}


/* callback for when the video is ended*/
const onEnded = () => {
  setPlaying(false)
  setCurrentTime(0)
}
/* on progress callback for the video*/
const onProgress = (e: { playedSeconds: React.SetStateAction<number>; }) => {
  setCurrentTime(e.playedSeconds)
};

/*
*  get the current chord using the currentTime
*/
const getCurrentChord = () => {
  if(data?.chord_segments?.length>0){
    for(let i=0;i<data.chord_segments.length;i++){
      if(currentTime>=parseFloat(data.chord_segments[i].start) && currentTime<=parseFloat(data.chord_segments[i].end)){
        return data.chord_segments[i].chord
      }
    }
  }
  return "Loading..."
}

const currentChord = getCurrentChord()
const chordObj = parseChord(currentChord)
// log th current chord object
console.log("chordObj",chordObj)
console.log("currentChord",currentChord)

//function to update the youtube link with the search query
const onSearch = (searchTerm:string) => {
  setYoutubeLink(searchTerm)
}

return (
  <div className="App">
    <SearchBar onSearch={onSearch}/>
    <ReactPlayer 
      url={youtubeLink}
      playing={playing}
      onPlay={onPlay}
      onPause={onPause}
      onProgress={onProgress}
      onEnded={onEnded}
      progressInterval={10}
     
    />
    <ChordCard name={chordObj?.root} type ={chordObj?.type}/>
    <FretboardWrapper root ={chordObj?.root} type ={chordObj?.type} />

    </div>);
  
}
export default App;



// method turns string maj to major and min to minor
const parseType = (type:string) => {
  if(type==="maj"){
    return "major"
  }
  if(type==="min"){
    return "minor"
  }
  return type
}

/*
* typescript method turns string in format "C:maj"  by calling parseType method to get type to {root:"C",type:"major"} with fields typed as strings returns null if the string is not in the correct format
*/
const parseChord = (chord:string) => {
  const split = chord.split(":")
  if(split.length===2){
    return {root:split[0],type:parseType(split[1])}
  }
  return null
}