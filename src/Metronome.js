import React, { useState, useEffect } from "react";
import "./Metronome.css";
import click1WAV from "./audio/click1.wav";
import click2WAV from "./audio/click2.wav";

export default function Metronome() {
  const [bpm, setBpm] = useState(100);
  const [playing, setPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);

  const click1 = new Audio(click1WAV);
  const click2 = new Audio(click2WAV);

  useEffect(() => {
    var timer;
    if (playing) {
      timer = setInterval(() => {
        count === 0 ? click2.play() : click1.play();
        setCount((count + 1) % beatsPerMeasure);
      }, 60000 / bpm);
    } else {
      clearInterval(timer);
      setCount(0);
    }
    return () => clearInterval(timer);
  }, [count, beatsPerMeasure, playing, bpm, click1, click2]);

  const handleBpmChange = (event) => {
    const bpm = event.target.value;
    setBpm(bpm);
  };

  const handleBeatsPerMeasureChange = (event) => {
    const beatsPerMeasure = event.target.value;
    setBeatsPerMeasure(beatsPerMeasure);
  };

  return (
    <div className="metronome">
      <div className="settings">
        <div>
          <input
            type="number"
            min="1"
            max="12"
            value={beatsPerMeasure}
            onChange={handleBeatsPerMeasureChange}
          />
          {" beats per measure"}
        </div>
        <div>
          <input
            type="number"
            min="40"
            max="240"
            value={bpm}
            onChange={handleBpmChange}
          />
          {" BPM"}
        </div>
        <input
          className="range"
          type="range"
          min="40"
          max="240"
          value={bpm}
          onChange={handleBpmChange}
        />
      </div>
      <button
        onClick={() => setPlaying(!playing)}
        style={{ background: playing ? "red" : "blue" }}
      >
        {playing ? "Stop" : "Start"}
      </button>
    </div>
  );
}
