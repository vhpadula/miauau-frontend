"use client";
import React, { useState } from "react";

interface ComboBoxOption<T> {
    value: T;
    label: string;
}

interface ComboBoxProps<T> {
    options: ComboBoxOption<T>[];
    value: T | null;
    onChange: (value: T) => void;
    placeholder?: string;
    label?: string;
    missingMessage?: string;
    required?: boolean;
    disabled?: boolean;
}

const ComboBox = <T extends string | number>({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    label,
    missingMessage,
    required,
    disabled
}: ComboBoxProps<T>) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (selectedValue: T) => {
        const selectedOption = options.find((o) => o.value === selectedValue);
        if (selectedOption) {
        setSearchTerm("");
        onChange(selectedValue);
        }
        setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsOpen(true);
    };

    const handleInputFocus = () => {
        setIsOpen(true);
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
        setIsOpen(false);
        }
    };

    return (
        <div
        className="relative flex flex-col"
        onBlur={handleInputBlur}
        tabIndex={-1}
        >
        {label && (
            <label
                className="font-Roboto text-base text-black mb-2"
                htmlFor="combobox-input"
            >
            {label} {required && <label className="text-error"> *</label>}
            </label>
        )}
        <div>
            <input
            id="combobox-input"
            className="p-2 text-black border rounded-md outline-none transition focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full"
            type="text"
            value={
                searchTerm || (value ? options.find((o) => o.value === value)?.label : "")
            }
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            disabled={disabled}
            />
            {isOpen && (
            <ul className="list-none p-0 mt-1 max-h-[150px] overflow-y-auto border border-gray-300 bg-white absolute z-50 w-full">
                {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                    <li
                    key={option.value.toString()}
                    onClick={() => handleSelect(option.value)}
                    className={`p-2 cursor-pointer text-black ${
                        option.value === value ? "bg-accent" : "bg-white"
                    }`}
                    >
                    {option.label}
                    </li>
                ))
                ) : (
                <li className="p-2 text-black">{missingMessage}</li>
                )}
            </ul>
            )}
        </div>
        </div>
    );
};

export default ComboBox;
