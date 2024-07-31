import React, { useState } from 'react';
import Toolbar from './Toolbar';
import Canvas from './Canvas/Canvas';
const ImageEditor = () => {
  const [selectedShape, setSelectedShape] = useState('circle');
  const [color, setColor] = useState('#000000');
  const [selectedLabel, setSelectedLabel] = useState("")
  return (
    <div>
      <Toolbar selectedShape={selectedShape} setSelectedShape={setSelectedShape} color={color} setColor={setColor} />
      <Canvas selectedShape={selectedShape} color={color} selectedLabel={selectedLabel} />
    </div>
  );
};

export default ImageEditor;
