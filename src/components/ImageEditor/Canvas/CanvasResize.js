import { drawShapes } from '../../utils/render';

export const resizeCanvas = (canvasRef, imageRef, context, shapes, currentShape, canvasScale) => {
    const canvas = canvasRef.current;
    if (canvas && imageRef.current) {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight * 0.8;

        const aspectRatio = imageRef.current.width / imageRef.current.height;
        let newWidth = containerWidth;
        let newHeight = containerHeight;

        if (newWidth / aspectRatio > newHeight) {
            newWidth = newHeight * aspectRatio;
        } else {
            newHeight = newWidth / aspectRatio;
        }

        const scale = newWidth / imageRef.current.width;

        canvas.width = newWidth;
        canvas.height = newHeight;

        drawShapes(context, shapes, imageRef.current, currentShape, scale);
    }
};

export const handleResize = (setIsWindowTooSmall, resizeCanvas, canvasRef, imageRef, context, shapes, currentShape, canvasScale) => {
    const isTooSmall = window.innerWidth < 900 || window.innerHeight < 500;
    setIsWindowTooSmall(isTooSmall);
    if (!isTooSmall && canvasRef.current && imageRef.current) {
        resizeCanvas(canvasRef, imageRef, context, shapes, currentShape, canvasScale);
    }
};
