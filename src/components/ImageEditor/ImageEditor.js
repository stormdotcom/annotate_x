import React, { useEffect, useRef } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from '@react-fabric/react-fabric';
import { fabric } from 'fabric';
const initialAnnotations = [
  { type: 'circle', left: 50, top: 50, radius: 30, fill: 'red' },
  { type: 'rect', left: 150, top: 150, width: 100, height: 50, fill: 'green' },
  { type: 'text', left: 200, top: 200, text: 'Hello', fontSize: 20, fill: 'blue' },
  { type: 'rect', left: 300, top: 300, width: 150, height: 100, fill: 'yellow' },
];

const ImageEditor = () => {
  const { editor, onReady } = useFabricJSEditor();
  const canvasRef = useRef(null);

  const addInitialAnnotations = () => {
    initialAnnotations.forEach(annotation => {
      switch (annotation.type) {
        case 'circle':
          editor.canvas.add(new fabric.Circle(annotation));
          break;
        case 'rect':
          editor.canvas.add(new fabric.Rect(annotation));
          break;
        case 'text':
          editor.canvas.add(new fabric.Text(annotation.text, annotation));
          break;
        default:
          break;
      }
    });
    editor.canvas.renderAll();
  };

  const resizeCanvas = () => {
    const canvas = editor.canvas;
    const container = canvasRef.current;

    if (canvas && container) {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const scaleFactor = containerWidth / canvas.getWidth();

      canvas.setWidth(containerWidth);
      canvas.setHeight(containerHeight);
      canvas.setZoom(scaleFactor);

      canvas.getObjects().forEach(obj => {
        obj.scaleX = obj.scaleX * scaleFactor;
        obj.scaleY = obj.scaleY * scaleFactor;
        obj.left = obj.left * scaleFactor;
        obj.top = obj.top * scaleFactor;
        obj.setCoords();
      });

      canvas.renderAll();
    }
  };

  useEffect(() => {
    if (editor) {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      editor.canvas.setBackgroundImage('path/to/your/image.jpg', editor.canvas.renderAll.bind(editor.canvas), {
        scaleX: editor.canvas.width / editor.canvas.backgroundImage.width,
        scaleY: editor.canvas.height / editor.canvas.backgroundImage.height,
      });

      addInitialAnnotations();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [editor]);

  return (
    <div>
      <div ref={canvasRef} style={{ width: '100%', height: '80vh', border: '1px solid #ccc' }}>
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      </div>
    </div>
  );
};

export default ImageEditor;
