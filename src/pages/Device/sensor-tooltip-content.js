import React from "react";

const SensorTooltipContent = ({ sensor }) => {
    return (
        <React.Fragment>
            <div className="tooltip-content-container">
                <div className="tooltip-content-row">
                    Name: {sensor.name}
                </div>
                <div className="tooltip-content-row">
                    Key: {sensor.key}
                </div>
                <div className="tooltip-content-row">
                    Unit: {sensor.unit}
                </div>
                <div className="tooltip-content-row">
                    Description: {sensor.description}
                </div>
            </div>
        </React.Fragment>
    )
};
export default SensorTooltipContent;