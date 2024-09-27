import React from "react";

type TitleTextProps = {
    textSize: string;
};

const TitleText: React.FC<TitleTextProps> = ({ textSize }) => {
    return (
        <div>
            <span className={`text-white ${textSize} font-bold font-Roboto`}>
                ONG
            </span>
            <span className={`text-tertiary ${textSize} font-bold font-Roboto`}>
                Admin
            </span>
        </div>
    );
};

export default TitleText;
