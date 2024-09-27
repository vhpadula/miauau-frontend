import React from "react";

type TitleTextProps = {
    textSize: string;
};

const TitleText: React.FC<TitleTextProps> = ({ textSize }) => {
    return <p className="text-6xl font-bold text-primary">Finanças</p>;
};

export default TitleText;
