import { drawShapes } from '../../utils/render';
import { createShape } from '../../utils/shapes';

export const handleMouseDown = (e, canvasRef, setCurrentShape, setIsDrawing, setIsResizing, setIsDragging, setStartX, setStartY, setHoveredHandle, shapes, canvasScale) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvasScale;
    const y = (e.clientY - rect.top) / canvasScale;

    const clickedHandle = getHandleAtPosition(x, y, shapes, canvasScale);
    if (clickedHandle) {
        setHoveredHandle(clickedHandle);
        setIsResizing(true);
        return;
    }

    const clickedShape = shapes.find(shape => {
        if (shape.type === 'circle') {
            const dist = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
            return dist <= shape.radius;
        } else if (shape.type === 'rect' || shape.type === 'roundedRect') {
            return x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height;
        }
        return false;
    });

    if (clickedShape) {
        setCurrentShape(clickedShape);
        setIsDragging(true);
        setStartX(x);
        setStartY(y);
    } else {
        setCurrentShape(null);
        setStartX(x);
        setStartY(y);
        setIsDrawing(true);
    }
};

export const handleMouseMove = (e, canvasRef, context, imageRef, shapes, currentShape, setShapes, setCurrentShape, setStartX, setStartY, setHoveredHandle, setIsDragging, setIsResizing, color, selectedShape, isDrawing, isDragging, isResizing, canvasScale) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvasScale;
    const y = (e.clientY - rect.top) / canvasScale;

    if (isDrawing) {
        drawShapes(context, shapes, imageRef.current, currentShape, canvasScale);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.setLineDash([5, 3]);
        switch (selectedShape) {
            case 'circle':
                const radius = Math.sqrt((x - setStartX) ** 2 + (y - setStartY) ** 2);
                context.beginPath();
                context.arc(setStartX, setStartY, radius, 0, 2 * Math.PI);
                context.stroke();
                break;
            case 'rect':
                context.strokeRect(setStartX, setStartY, x - setStartX, y - setStartY);
                break;
            case 'roundedRect':
                context.beginPath();
                context.moveTo(setStartX + 20, setStartY);
                context.lineTo(setStartX + (x - setStartX) - 20, setStartY);
                context.quadraticCurveTo(setStartX + (x - setStartX), setStartY, setStartX + (x - setStartX), setStartY + 20);
                context.lineTo(setStartX + (x - setStartX), setStartY + (y - setStartY) - 20);
                context.quadraticCurveTo(setStartX + (x - setStartX), setStartY + (y - setStartY), setStartX + (x - setStartX) - 20, setStartY + (y - setStartY));
                context.lineTo(setStartX + 20, setStartY + (y - setStartY));
                context.quadraticCurveTo(setStartX, setStartY + (y - setStartY), setStartX, setStartY + (y - setStartY) - 20);
                context.lineTo(setStartX, setStartY + 20);
                context.quadraticCurveTo(setStartX, setStartY, setStartX + 20, setStartY);
                context.stroke();
                break;
            default:
                break;
        }
    } else if (isDragging && currentShape) {
        const dx = x - setStartX;
        const dy = y - setStartY;
        const updatedShapes = shapes.map(shape => {
            if (shape.id === currentShape.id) {
                return { ...shape, x: shape.x + dx, y: shape.y + dy };
            }
            return shape;
        });
        setShapes(updatedShapes);
        setStartX(x);
        setStartY(y);
    } else if (isResizing && setHoveredHandle && currentShape) {
        const updatedShapes = shapes.map(shape => {
            if (shape.id === currentShape.id) {
                switch (shape.type) {
                    case 'circle':
                        return { ...shape, radius: Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2) };
                    case 'rect':
                    case 'roundedRect':
                        return {
                            ...shape,
                            width: setHoveredHandle.includes('right') ? x - shape.x : shape.width,
                            height: setHoveredHandle.includes('bottom') ? y - shape.y : shape.height,
                        };
                    default:
                        return shape;
                }
            }
            return shape;
        });
        setShapes(updatedShapes);
    } else {
        const handle = getHandleAtPosition(x, y, shapes, canvasScale);
        setHoveredHandle(handle);
        if (handle) {
            canvasRef.current.style.cursor = 'nwse-resize';
        } else {
            canvasRef.current.style.cursor = 'default';
        }

        // Select shape on hover
        const hoveredShape = shapes.find(shape => {
            if (shape.type === 'circle') {
                const dist = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
                return dist <= shape.radius;
            } else if (shape.type === 'rect' || shape.type === 'roundedRect') {
                return x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height;
            }
            return false;
        });

        if (hoveredShape && (!currentShape || hoveredShape.id !== currentShape.id)) {
            setCurrentShape(hoveredShape);
        }
    }
};
export const handleMouseUp = (e, canvasRef, setIsDrawing, setIsDragging, setIsResizing, setHoveredHandle, shapes, setShapes, startX, startY, color, selectedShape, canvasScale, isDrawing) => {
    if (isDrawing) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / canvasScale;
        const y = (e.clientY - rect.top) / canvasScale;

        const newShape = createShape(selectedShape, startX, startY, x, y, color);
        setShapes([...shapes, newShape]);
        setIsDrawing(false);
    } else {
        setIsDragging(false);
        setIsResizing(false);
        setHoveredHandle(null);
    }
};

const getHandleAtPosition = (x, y, shapes, canvasScale) => {
    const handleSize = 8 / canvasScale;
    for (const shape of shapes) {
        if (shape.type === 'circle') {
            if (x >= shape.x + shape.radius - handleSize / 2 && x <= shape.x + shape.radius + handleSize / 2 &&
                y >= shape.y - handleSize / 2 && y <= shape.y + handleSize / 2) {
                return 'circle-handle';
            }
        } else if (shape.type === 'rect' || shape.type === 'roundedRect') {
            if (x >= shape.x - handleSize / 2 && x <= shape.x + handleSize / 2 &&
                y >= shape.y - handleSize / 2 && y <= shape.y + handleSize / 2) {
                return 'top-left';
            }
            if (x >= shape.x + shape.width - handleSize / 2 && x <= shape.x + shape.width + handleSize / 2 &&
                y >= shape.y - handleSize / 2 && y <= shape.y + handleSize / 2) {
                return 'top-right';
            }
            if (x >= shape.x - handleSize / 2 && x <= shape.x + handleSize / 2 &&
                y >= shape.y + shape.height - handleSize / 2 && y <= shape.y + shape.height + handleSize / 2) {
                return 'bottom-left';
            }
            if (x >= shape.x + shape.width - handleSize / 2 && x <= shape.x + shape.width + handleSize / 2 &&
                y >= shape.y + shape.height - handleSize / 2 && y <= shape.y + shape.height + handleSize / 2) {
                return 'bottom-right';
            }
        }
    }
    return null;
};
