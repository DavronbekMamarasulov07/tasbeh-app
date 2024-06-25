import React, { useEffect, useState } from 'react';
import "./Tasbeh.css";
import chevronUp from "../../images/chevron-up.svg";
import chevronDown from "../../images/chevron-down.svg";
import audio from "../../audio/output.mp3";

const Tasbeh = () => {
    const [count, setCount] = useState(0);
    const [selectedValue, setSelectedValue] = useState(33); 
    const [countLoop, setCountLoop] = useState(0);
    const [audioObj] = useState(new Audio(audio));
    const [audioPlaying, setAudioPlaying] = useState(false);


    const handleSelectChange = (e) => {
        setSelectedValue(parseInt(e.target.value));
        setCount(0); 
    }

    const handleReproduction = (e) => {
        e.preventDefault();
        if (count < selectedValue) {
            setCount(count + 1);
        }
    }

    const handleDepletion = (e) => {
        e.preventDefault();
        if (count > 0) {
            setCount(count - 1); 
        }
    }

    const resetCount = () => {
        setCount(0);
        setAudioPlaying(false); 
        audioObj.pause(); 
        audioObj.currentTime = 0; 
    }



    useEffect(() => {
        if (count === selectedValue) {
            audioObj.play();
            setAudioPlaying(true);
            setCount(1)
        }
    }, [count, audioObj, audioPlaying]);

    useEffect(() => {
        return () => {
            audioObj.pause();
            audioObj.currentTime = 0;
        };
    }, [audioObj]);

    useEffect(() => {
        if(count % selectedValue === 0 && count !== 0){
            setCountLoop(countLoop + 1)
        }
    }, [count])

    return (
        <div>
            <div className="container">
                <div className="tasbeh-content">
                    <form className="tasbeh-form">
                        <div className="form-btn-item-col">
                            <select className='form-select' onChange={handleSelectChange}>
                                <option value="33">33</option>
                                <option value="66">66</option>
                                <option value="99">99</option>
                            </select>
                            <button onClick={resetCount} type='button' className='form-clear-btn'>Clear</button>
                        </div>
                        <div className="count-info">
                            <strong>{countLoop}</strong> / <strong>{selectedValue}</strong>
                        </div>
                        <h2 className='form-count'>{count}</h2>
                        <div className="form-btn-item-row">
                            <button type='button' onClick={handleReproduction} className='btn-plus'>
                                <img className='btn-up' src={chevronUp} alt="chevronUp" />
                            </button>
                            <button type='button' onClick={handleDepletion} className='btn-minus'>
                                <img className='btn-down' src={chevronDown} alt="chevronDown" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Tasbeh;
