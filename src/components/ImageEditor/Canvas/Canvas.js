import React, { useEffect, useRef, useState } from 'react';
import { resizeCanvas, handleResize } from './CanvasResize';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './CanvasEvents';
import { drawShapes } from './DrawShapes';
import { initialAnnotations } from '../../utils/shapes';

const Canvas = ({ selectedShape, color }) => {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [context, setContext] = useState(null);
    const [shapes, setShapes] = useState(initialAnnotations);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [currentShape, setCurrentShape] = useState(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [hoveredHandle, setHoveredHandle] = useState(null);
    const [canvasScale, setCanvasScale] = useState(1);
    const [isWindowTooSmall, setIsWindowTooSmall] = useState(false);

    useEffect(() => {
        const onResize = () => handleResize(setIsWindowTooSmall, resizeCanvas, canvasRef, imageRef, context, shapes, currentShape, canvasScale);
        window.addEventListener('resize', onResize);

        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [context, shapes, currentShape, canvasScale]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        setContext(ctx);

        const image = new Image();
        image.src = "https://media.istockphoto.com/id/946459708/photo/3d-illustration-of-generic-red-sedan-car-on-white.webp?b=1&s=170667a&w=0&k=20&c=HBLWPFx4jRKwkwkUy4ZH34OyeafkhtrxxfEQWerKmDE=";
        image.onload = () => {
            imageRef.current = image;
            resizeCanvas(canvasRef, imageRef, ctx, shapes, currentShape, canvasScale);
            drawShapes(ctx, shapes, imageRef.current, currentShape, canvasScale);
        };
    }, [shapes, currentShape, canvasScale]);

    return (
        <>
            {isWindowTooSmall ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>Please resize the window to at least 900 x 500 pixels.</p>
                </div>
            ) : (
                <canvas
                    ref={canvasRef}
                    style={{ border: '1px solid #ccc', width: '100%', height: '80vh', cursor: 'crosshair' }}
                    onMouseDown={(e) => handleMouseDown(e, canvasRef, setCurrentShape, setIsDrawing, setIsResizing, setIsDragging, setStartX, setStartY, setHoveredHandle, shapes, canvasScale)}
                    onMouseMove={(e) => handleMouseMove(e, canvasRef, context, imageRef, shapes, currentShape, setShapes, setCurrentShape, setStartX, setStartY, setHoveredHandle, setIsDragging, setIsResizing, color, selectedShape, isDrawing, isDragging, isResizing, canvasScale)}
                    onMouseUp={(e) => handleMouseUp(e, canvasRef, setIsDrawing, setIsDragging, setIsResizing, setHoveredHandle, shapes, setShapes, startX, startY, color, selectedShape, canvasScale, isDrawing)}
                />
            )}
        </>
    );
};

export default Canvas;
