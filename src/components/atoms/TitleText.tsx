import React from "react";

type TitleTextProps = {
    textSize: string;
    ongTextColor?: string;
};

const TitleText: React.FC<TitleTextProps> = ({ textSize, ongTextColor = "white" }) => {
    return (
        <div>
            <span className={`text-${ongTextColor} ${textSize} font-bold font-Roboto`}>
                ONG
            </span>
            <span className={`text-tertiary ${textSize} font-bold font-Roboto`}>
                Admin
            </span>
        </div>
    );
};

export default TitleText;
