"use client";
import React, { useEffect, useState } from "react";
import { AdoptionCandidateCard, Button, Input } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { get } from "@/services/baseServices";
import Link from "next/link";
import { ICandidateSimple } from "@/types";

export default function Candidates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [candidates, setCandidates] = useState<ICandidateSimple[]>([]);
  const router = useRouter();

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearchTerm = searchTerm
      ? candidate.name.toLowerCase().includes(searchTerm)
      : true;
    return matchesSearchTerm;
  });

  useEffect(() => {
    get("/api/v1/adoptions")
      .then((response) => {
        setCandidates(response);
      })
      .catch((error) => {
        console.error("Failed to fetch candidates:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="sticky z-10 top-20 mt-20 flex items-center bg-white justify-center w-full p-5 mb-4 shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
        <div className="flex-grow md:flex-grow-0 lg:flex-grow-0 lg:w-2/3 md:w-1/2">
          <Input
            type="text"
            placeholder="Buscar candidato"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 border border-gray-300 rounded-l-md focus:outline-none text-black"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:w-2/3 md:w-1/2 gap-4 m-2 w-full p-5 max-h-screen">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <Link href={`/candidates/${candidate.id}`} key={candidate.id}>
              <AdoptionCandidateCard
                key={candidate.id}
                id={candidate.id}
                name={candidate.name}
                occupation={candidate.occupation}
                livengSituation={candidate.livingSituation}
                age={candidate.age}
              />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-700">
            Nenhum candidato encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
