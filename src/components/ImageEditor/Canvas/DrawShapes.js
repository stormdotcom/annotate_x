/* eslint-disable no-use-before-define */

export const drawShapes = (context, shapes, image, currentShape, scale) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (image) {
        context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
    }
    shapes.forEach(shape => {
        context.strokeStyle = shape.color;
        context.lineWidth = (currentShape && currentShape.id === shape.id) ? 4 : 2;
        context.setLineDash([]);
        if (shape.type === "circle") {
            context.beginPath();
            context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            context.stroke();
        } else if (shape.type === "rect") {
            context.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "roundedRect") {
            context.beginPath();
            context.moveTo(shape.x + shape.borderRadius, shape.y);
            context.lineTo(shape.x + shape.width - shape.borderRadius, shape.y);
            context.quadraticCurveTo(shape.x + shape.width, shape.y, shape.x + shape.width, shape.y + shape.borderRadius);
            context.lineTo(shape.x + shape.width, shape.y + shape.height - shape.borderRadius);
            context.quadraticCurveTo(shape.x + shape.width, shape.y + shape.height, shape.x + shape.width - shape.borderRadius, shape.y + shape.height);
            context.lineTo(shape.x + shape.borderRadius, shape.y + shape.height);
            context.quadraticCurveTo(shape.x, shape.y + shape.height, shape.x, shape.y + shape.height - shape.borderRadius);
            context.lineTo(shape.x, shape.y + shape.borderRadius);
            context.quadraticCurveTo(shape.x, shape.y, shape.x + shape.borderRadius, shape.y);
            context.stroke();
        }
        if (shape.label) {
            context.fillStyle = shape.color;
            context.font = "10px Arial";
            const labelX = shape.type === "circle" ? shape.x : shape.x + shape.width / 2;
            const labelY = shape.type === "circle" ? shape.y + shape.radius + 15 : shape.y + shape.height + 15;
            context.fillText(shape.label, labelX, labelY);
        }
    });
    if (currentShape) {
        drawResizeHandles(context, currentShape, scale);
    }
};

const drawResizeHandles = (context, shape, scale) => {
    if (!shape) return;
    const handleSize = 8 / scale;
    context.fillStyle = "blue";
    if (shape.type === "circle") {
        context.fillRect(shape.x + shape.radius - handleSize / 2, shape.y - handleSize / 2, handleSize, handleSize);
    } else if (shape.type === "rect" || shape.type === "roundedRect") {
        context.fillRect(shape.x - handleSize / 2, shape.y - handleSize / 2, handleSize, handleSize);
        context.fillRect(shape.x + shape.width - handleSize / 2, shape.y - handleSize / 2, handleSize, handleSize);
        context.fillRect(shape.x - handleSize / 2, shape.y + shape.height - handleSize / 2, handleSize, handleSize);
        context.fillRect(shape.x + shape.width - handleSize / 2, shape.y + shape.height - handleSize / 2, handleSize, handleSize);
    }
};
