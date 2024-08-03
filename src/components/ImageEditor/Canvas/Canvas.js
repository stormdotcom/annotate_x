/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { resizeCanvas, handleResize } from "./CanvasResize";
import { handleMouseDown, handleMouseMove, handleMouseUp } from "./CanvasEvents";
import { drawShapes } from "./DrawShapes";

import { useDispatch, useSelector } from "react-redux";
import { STATE_SLICE_KEY } from "../../constants";
import { actions } from "../../slice";
import labelImg from "../../../assets/img/label-image.png";
import "./Canvas.css";
const Canvas = ({ canvasRef, imageRef }) => {
    const dispatch = useDispatch();

    const [isDrawing, setIsDrawing] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [hoveredHandle, setHoveredHandle] = useState(null);
    const [isWindowTooSmall, setIsWindowTooSmall] = useState(false);

    const context = useSelector(state => state[STATE_SLICE_KEY].context);
    const shapes = useSelector(state => state[STATE_SLICE_KEY].shapes);
    const selectedLabel = useSelector(state => state[STATE_SLICE_KEY].selectedLabel);
    const color = useSelector(state => state[STATE_SLICE_KEY].selectedColor);
    const selectedShape = useSelector(state => state[STATE_SLICE_KEY].selectedShapeType);
    const currentShape = useSelector(state => state[STATE_SLICE_KEY].currentShape);
    const canvasScale = useSelector(state => state[STATE_SLICE_KEY].canvasScale);
    const setCurrentShape = (s) => {
        if (s) {
            dispatch(actions.setCurrentShape(s));
        }
    };
    const setContext = (c) => dispatch(actions.setContext(c));

    const setShapes = (data) => dispatch(actions.setShapes(data));

    useEffect(() => {
        const onResize = () => handleResize(setIsWindowTooSmall, resizeCanvas, canvasRef, imageRef, context, shapes, currentShape, canvasScale);
        window.addEventListener("resize", onResize);

        onResize();

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [context, shapes, currentShape, canvasScale]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        setContext(ctx);

        const image = new Image();
        image.src = labelImg;
        image.onload = () => {
            imageRef.current = image;
            resizeCanvas(canvasRef, imageRef, ctx, shapes, currentShape, canvasScale);
            drawShapes(ctx, shapes, imageRef.current, currentShape, canvasScale);
        };
    }, [shapes, currentShape, canvasScale]);

    return (
        <>
            {isWindowTooSmall ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <p>Please resize the window to at least 900 x 500 pixels.</p>
                </div>
            ) : (
                <div className="canvas-container">

                    <canvas
                        ref={canvasRef}
                        style={{ border: "1px solid #ccc", width: "100%", height: "80vh", cursor: "crosshair" }}
                        onMouseDown={(e) => handleMouseDown(e, canvasRef, setCurrentShape, setIsDrawing, setIsResizing, setIsDragging, setStartX, setStartY, setHoveredHandle, shapes, canvasScale)}
                        onMouseMove={(e) => handleMouseMove(e, canvasRef, context, imageRef, shapes, currentShape, setShapes, setCurrentShape, startX, startY, setHoveredHandle, hoveredHandle, setIsDragging, setIsResizing, color, selectedShape, isDrawing, isDragging, isResizing, canvasScale, setStartX, setStartY, color)}
                        onMouseUp={(e) => handleMouseUp(e, canvasRef, setIsDrawing, setIsDragging, setIsResizing, setHoveredHandle, shapes, setShapes, startX, startY, color, selectedShape, canvasScale, isDrawing, selectedLabel)}
                    />
                </div>
            )}
        </>
    );
};

export default Canvas;
