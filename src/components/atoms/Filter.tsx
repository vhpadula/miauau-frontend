


import { FC } from "react";

interface FilterProps {
  filterLabel: string;
  options: string[];
  selectedOption: string;
  onClick: (option: string) => void;
}

const Filter: FC<FilterProps> = ({ filterLabel, options, selectedOption, onClick }) => {
    return (
        <>
            <p className="font-bold text-primary mb-2">{filterLabel}</p>
            <div className="space-y-2">
                {options.map((option) => (
                    <button
                        key={`filter-${option}`}
                        onClick={() => onClick(option)}
                        className={`w-full text-black text-left px-2 py-1 rounded ${(selectedOption === option || (option === "Todos" && selectedOption === "")) ?  "bg-accent" : ""}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Filter;
