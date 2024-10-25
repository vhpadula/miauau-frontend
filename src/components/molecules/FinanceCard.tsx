import React, { ReactNode } from "react";
type FinanceCardProps = {
    id: string;
    label: string;
    month: string;
    content: ReactNode;
};

const FinanceCard: React.FC<FinanceCardProps> = ({
    id,
    label,
    month,
    content
}) => {
    return (
        <div id={id} className="flex flex-col p-4 justify-center bg-white shadow-md rounded-lg w-full">
            <p className="text-center font-bold font-Roboto text-sm text-gray-700">{label}</p>
            <p className="text-center font-medium font-Roboto text-sm text-gray-700 mb-3">{month}</p>
            {content}
        </div>
    );
};

export default FinanceCard;
