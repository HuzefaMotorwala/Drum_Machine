import React, { useEffect ,useState} from 'react';
import ReactDOM from 'react-dom';
import './style.css'

const audioClips = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];
function App (){
    const[volume,setVolume]=React.useState(1);
    const[text,setText]=React.useState("");
    return (
        <div id="drum-machine" className="bg-info min-vh-100">
            <div className="text-center">
                <h1 id="title">Drum Machine</h1>
                <div id="drum-container">
                    <input id="display" defaultValue={text}/>
                    <br/>
                    {audioClips.map((clip)=>{
                        return <Drumpads key={clip.id} volume={volume} clip={clip} setText={setText}/>
                    })}
                    <br/>
                    <h4>Volume</h4>
                    <input 
                        type="range" 
                        className="form-range"
                        onChange={(e)=>setVolume(e.target.value)}
                        value={volume}
                        min="0" 
                        max="1" 
                        step="0.01" 
                        id="customRange3"
                        className="w-50">
                    </input>
                </div>
                <footer>by Huzefa</footer>
            </div>
            
        </div>
    )
}

function Drumpads({clip,volume,setText}){
    const[active,setActive]=React.useState(false)

    const handleKeyPress=(e)=>{
        if(e.keyCode===clip.keyCode){
            playSound();
        }
    }

    React.useEffect(()=>{
        document.addEventListener('keydown',handleKeyPress);
        return()=>{
            document.removeEventListener('keydown',handleKeyPress);
        }
    },[])

    const playSound=()=>{
        const audioTag=document.getElementById(clip.keyTrigger);
        setActive(true);
        setTimeout(()=>{
            setActive(false)
        },200);
        audioTag.volume=volume;
        audioTag.cuurentTime=0;
        audioTag.play();
        setText(()=>clip.id);
    }
    return(
        <div onClick={playSound} className={`btn btn-secondary p-4 m-3 ${active && "btn-warning"}`}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url}/>
            {clip.keyTrigger}            
        </div>
    )
}



ReactDOM.render(<App/>,document.getElementById("root"))
