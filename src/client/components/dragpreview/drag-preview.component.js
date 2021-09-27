import React from "react";
import { DragLayer } from "react-dnd";
import ItemTypes from "../../constants/drag-item.types";
import TaskDragPreview from "./task-drag-preview.component";

const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 18,
    top: -13
};

function getItemStyles(props) {
    const { currentOffset } = props;
    if (!currentOffset) {
        return {
            display: "none",
        };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform: transform,
        WebkitTransform: transform,
    };
}

function CustomDragLayer(props) {
    const { item, itemType, isDragging } = props;
    
    if (!isDragging) {
        return null;
    }

    function renderItem(type, item) {
        switch (type) {
            case ItemTypes.TASK:
                return <TaskDragPreview task={item} />;
        }
    }

    return (
        <div style={layerStyles}>
            <div style={getItemStyles(props)}>{renderItem(itemType, item)}</div>
        </div>
    );
}

function collect(monitor) {
    return {
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    };
}

export default DragLayer(collect)(CustomDragLayer);
