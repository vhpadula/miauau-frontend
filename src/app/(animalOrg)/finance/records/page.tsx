"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { get } from "@/services/baseServices";
import FinanceRecordCard from "@/components/molecules/FinanceRecordCard";
import { financeRecords as mockRecords } from '../../../../__mocks__/dataMock';
import { Button, Filter, Input } from "@/components";
import { IFinanceRecord } from "@/types";

export default function FinanceRecordsList () {

    const imageSrc = "/images/default.png";
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(8);
    const [records, setRecords] = useState<IFinanceRecord[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRecordType, setSelectedRecordType] = useState("");
    const [showFilterPopup, setShowFilterPopup] = useState(false);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect( () => {
        get("finance/records")
        .then((response) => {
            setRecords(response);
        })
        .catch((error) => {
            setRecords(mockRecords);
        });
    }, []);


    // ajustar busca e filtro pra funcionar intgrado com o backend, do jeito que se ele filtrar e estiver depois da primeira pg pode dar ruim
    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleRecordTypeSelect = (contribution: string) => {
        if (contribution === "Todos") {
            setSelectedRecordType("");
        } else {
            setSelectedRecordType(contribution);
        }
        setShowFilterPopup(false);
    };

    const filteredRecords = records.filter((records) => {
        const matchesSearchTerm = records.label.toLowerCase().includes(searchTerm);
        const matchesRecordType = selectedRecordType ? records.type === selectedRecordType : true;
        return matchesSearchTerm && matchesRecordType;
    });
    
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    return (
        <div className="flex flex-col items-center h-screen">
            <div className="sticky top-20 mt-[76px] flex items-center bg-white justify-center w-full p-5 mb-4 z-1 shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
                <div className="flex-grow md:flex-grow-0 lg:flex-grow-0 lg:w-2/3 md:w-1/2">
                    <Input
                        type="text"
                        placeholder="Buscar registro"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 border border-gray-300 rounded-l-md focus:outline-none text-black"
                    />
                </div>
                <div className="relative">
                    <Button
                        icon={
                            <Image
                                src="/icons/filter.svg"
                                alt="filter"
                                width={25}
                                height={20}
                                className="mx-0.5"
                            />
                        }
                        variant="outline"
                        type="button"
                        className="px-1.5 ml-2 h-full"
                        onClick={() => setShowFilterPopup(!showFilterPopup)}
                    />
                    {showFilterPopup && (
                        <div className="absolute right-0 mt-2 w-fit bg-white shadow-lg rounded-lg p-3 z-20">
                            <Filter 
                                filterLabel="Filtrar por movimentação"
                                options={['Todos', 'Entrada', 'Saída']} 
                                selectedOption={selectedRecordType} 
                                onClick={handleRecordTypeSelect}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:w-2/3 md:w-1/2 gap-4 w-full p-5 max-h-screen">
                {currentRecords.map((record: IFinanceRecord) => (
                    <FinanceRecordCard
                        key={record.id}
                        id={record.id}
                        label={record.label}
                        type={record.type}
                        incomeType={record.incomeType}
                        outcomeType={record.outcomeType}
                        date={record.date}
                        value={record.value}
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 z-10">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 mt-2 mb-4 rounded-full transition-colors duration-300 ${
                            currentPage === index + 1
                            ? "bg-primary text-white"
                            : "border-primary border text-black hover:bg-gray-300"
                        }`}
                    >
                    {index + 1}
                    </button>
                ))}
                </div>
        )}
        </div>
    )
};