import React from "react";
export default function LoadingSpinner() {
    return (
        <span className="h-6 w-6 animate-spin">
            <svg height="100%" viewBox="0 0 32 32" width="100%">
                <circle
                    cx="16"
                    cy="16"
                    fill="none"
                    r="14"
                    strokeWidth="4"
                    style={{
                        stroke: "rgb(29, 155, 240)",
                        opacity: "0.2",
                    }}
                ></circle>
                <circle
                    cx="16"
                    cy="16"
                    fill="none"
                    r="14"
                    strokeWidth="4"
                    style={{
                        stroke: "rgb(29, 155, 240)",
                        strokeDasharray: "80",
                        strokeDashoffset: "60",
                    }}
                ></circle>
            </svg>
        </span>
    );
}
