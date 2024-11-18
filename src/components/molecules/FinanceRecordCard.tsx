import React from "react";
import Image from "next/image";
import { IFinanceRecord } from "@/types";

const FinanceRecordCard: React.FC<IFinanceRecord> = ({
    id,
    label,
    type,
    incomeType,
    outcomeType,
    date,
    value,
}) => {
    const incomeSrc = "/icons/income.svg";
    const outcomeSrc = "/icons/outcome.svg";

    return (
        <div
            id={id}
            className="flex items-center justify-between bg-white shadow-md rounded-lg w-full h-24"
        >
            <div className="flex items-center">
                <Image
                    src={type === "Entrada" ? incomeSrc : outcomeSrc}
                    alt="Animais"
                    width={35}
                    height={35}
                    className="rounded-full m-5"
                />
                <div>
                    <p className="font-bold text-gray-700 text-base mb-1">
                        {label}
                    </p>
                    <p className="text-gray-700 text-xs font-medium">
                        {type} | {incomeType || outcomeType} | {date}
                    </p>
                    <p className="text-gray-700 text-xs font-medium">{value}</p>
                </div>
            </div>
            <Image
                src="/icons/semi-right-arrow.svg"
                alt="semi-right-arrow"
                width={20}
                height={20}
                className="mr-7"
            />
        </div>
    );
};

export default FinanceRecordCard;
