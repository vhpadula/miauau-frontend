"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { get } from "@/services/baseServices";
import { events as mockEvents } from "../../../__mocks__/dataMock";
import { Button, Filter, Input } from "@/components";
import { IEvent } from "@/types";
import { useRouter } from "next/navigation";

export default function Events() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContribution, setSelectedContribution] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  useEffect(() => {
    get("/api/v1/persons/Events")
      .then((response) => {
        setEvents(response);
      })
      .catch((error) => {
        setEvents(mockEvents);
      });
  }, []);

  // ajustar busca e filtro pra funcionar intgrado com o backend, do jeito que se ele filtrar e estiver depois da primeira pg pode dar ruim
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleLocationSelect = (location: string) => {
    if (location === "Todos") {
      setSelectedContribution("");
    } else {
      setSelectedContribution(location);
    }
    setShowFilterPopup(false);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="relative top-0 mt-[76px] flex items-center bg-white justify-center w-full p-5 mb-4 z-1 shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
        <div>
          <Button
            icon={
              <Image
                src="/icons/new-form.svg"
                alt="new-form"
                width={25}
                height={20}
                className="mx-0.5"
              />
            }
            variant="primary"
            type="button"
            className="px-1.5 mr-2 h-full"
            onClick={() => console.log("new event")}
          />
        </div>
        <div className="flex-grow md:flex-grow-0 lg:flex-grow-0 lg:w-2/3 md:w-1/2">
          <Input
            type="text"
            placeholder="Buscar Evento"
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
        </div>
      </div>

      <section className="relative bg-stone-50">
        <div className=" py-24 relative ">
          <div className="w-full max-w-7xl mx-auto px-2 lg:px-8">
            <div className="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">
              <div className="col-span-12 xl:col-span-5">
                <h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">
                  Próximos Eventos
                </h2>

                <div className="flex gap-5 flex-col">
                  <div className="p-6 rounded-xl bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                        <p className="text-base font-medium text-gray-900">
                          Dec 7,2024 - 14:00 - 20:00
                        </p>
                      </div>
                      <div className="dropdown relative inline-flex">
                        <button
                          type="button"
                          data-target="dropdown-default"
                          className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-secondary  ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="4"
                            viewBox="0 0 12 4"
                            fill="none">
                            <path
                              d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707"
                              stroke="currentcolor"
                              stroke-width="2.5"
                              stroke-linecap="round"></path>
                          </svg>
                        </button>
                        <div
                          id="dropdown-default"
                          className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full -left-10 w-max mt-2 hidden"
                          aria-labelledby="dropdown-default">
                          <ul className="py-2">
                            <li>
                              <a
                                className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
                                href="javascript:;">
                                Edit
                              </a>
                            </li>
                            <li>
                              <a
                                className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
                                href="javascript:;">
                                Remove
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-xl leading-8 font-semibold text-black mb-1">
                      Feira de Adoção - Cobasi Pompeia
                    </h6>
                  </div>
                  <div className="p-6 rounded-xl bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                        <p className="text-base font-medium text-gray-900">
                          Dec 19,2024 - 10:00 - 18:00
                        </p>
                      </div>
                      <div className="dropdown relative inline-flex">
                        <button
                          type="button"
                          data-target="dropdown-a"
                          className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-sky-400  ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="4"
                            viewBox="0 0 12 4"
                            fill="none">
                            <path
                              d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707"
                              stroke="currentcolor"
                              stroke-width="2.5"
                              stroke-linecap="round"></path>
                          </svg>
                        </button>
                        <div
                          id="dropdown-a"
                          className="dropdown-menu rounded-xl shadow-lg bg-white absolute -left-10 top-full w-max mt-2 hidden"
                          aria-labelledby="dropdown-a">
                          <ul className="py-2">
                            <li>
                              <a
                                className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
                                href="javascript:;">
                                Edit
                              </a>
                            </li>
                            <li>
                              <a
                                className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
                                href="javascript:;">
                                Remove
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-xl leading-8 font-semibold text-black mb-1">
                      Feira de Adoção - Petz Butantã
                    </h6>
                  </div>
                  <div className="p-6 rounded-xl bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                        <p className="text-base font-medium text-gray-900">
                          Dec 14, 2024 10:00 - 18:00
                        </p>
                      </div>
                      <div className="dropdown relative inline-flex">
                        <button
                          type="button"
                          data-target="dropdown-b"
                          className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-secondary  ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="4"
                            viewBox="0 0 12 4"
                            fill="none">
                            <path
                              d="M1.85624 2.00085H1.81458M6.0343 2.00085H5.99263M10.2124 2.00085H10.1707"
                              stroke="currentcolor"
                              stroke-width="2.5"
                              stroke-linecap="round"></path>
                          </svg>
                        </button>
                        <div
                          id="dropdown-b"
                          className="dropdown-menu rounded-xl shadow-lg bg-white absolute -left-10 top-full w-max mt-2 hidden"
                          aria-labelledby="dropdown-b">
                          <ul className="py-2">
                            <li>
                              <a
                                className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
                                href="javascript:;">
                                Edit
                              </a>
                            </li>
                            <li>
                              <a
                                className="block px-6 py-2 text-xs hover:bg-gray-100 text-gray-600 font-medium"
                                href="javascript:;">
                                Remove
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-xl leading-8 font-semibold text-black mb-1">
                      Feira de Adoção - Prefeitura, Parque Ibirapuera
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <h5 className="text-xl leading-8 font-semibold text-gray-900">
                      Dezembro 2024
                    </h5>
                    <div className="flex items-center">
                      <button className="text-secondary p-1 rounded transition-all duration-300 hover:text-white hover:bg-secondary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none">
                          <path
                            d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
                            stroke="currentcolor"
                            stroke-width="1.3"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        </svg>
                      </button>
                      <button className="text-secondary p-1 rounded transition-all duration-300 hover:text-white hover:bg-secondary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none">
                          <path
                            d="M6.00236 3.99707L10.0025 7.99723L6 11.9998"
                            stroke="currentcolor"
                            stroke-width="1.3"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border border-indigo-200 rounded-xl">
                  <div className="grid grid-cols-7 rounded-t-3xl border-b border-indigo-200">
                    <div className="py-3.5 border-r rounded-tl-xl border-indigo-200 bg-primary flex items-center justify-center text-sm font-medium text-secondary">
                      Dom
                    </div>
                    <div className="py-3.5 border-r border-indigo-200 bg-primary flex items-center justify-center text-sm font-medium text-secondary">
                      Seg
                    </div>
                    <div className="py-3.5 border-r border-indigo-200 bg-primary flex items-center justify-center text-sm font-medium text-secondary">
                      Ter
                    </div>
                    <div className="py-3.5 border-r border-indigo-200 bg-primary flex items-center justify-center text-sm font-medium text-secondary">
                      Qua
                    </div>
                    <div className="py-3.5 border-r border-indigo-200 bg-primary flex items-center justify-center text-sm font-medium text-secondary">
                      Qui
                    </div>
                    <div className="py-3.5 border-r border-indigo-200 bg-primary flex items-center justify-center text-sm font-medium text-secondary">
                      Fri
                    </div>
                    <div className="py-3.5 rounded-tr-xl bg-primary flex items-center justify-center text-sm font-medium text-secondary">
                      Sat
                    </div>
                  </div>
                  <div className="grid grid-cols-7 rounded-b-xl">
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary">
                      <span className="text-xs font-semibold text-gray-400">
                        27
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">
                        28
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">
                        29
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">
                        30
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">
                        31
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        1
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        2
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 relative bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        3
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        4
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        5
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        6
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white relative border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        7
                      </span>
                      <div className="absolute top-9 bottom-1 left-3.5 p-1.5 xl:px-2.5 h-max rounded bg-accent ">
                        <p className="hidden xl:block text-xs font-medium text-secondary mb-px whitespace-nowrap">
                          Feira de Adoção - Pompeia
                        </p>
                        <span className="hidden xl:block text-xs font-normal text-secondary whitespace-nowrap">
                          10:00 - 18:00
                        </span>
                        <p className="xl:hidden w-2 h-2 rounded-full bg-secondary"></p>
                      </div>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        8
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-secondary sm:text-white sm:w-6 sm:h-6 rounded-full sm:flex items-center justify-center sm:bg-secondary">
                        9
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        10
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        11
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        12
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        13
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        14
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        15
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        16
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        17
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        18
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 relative bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        19
                      </span>
                      <div className="absolute top-9 bottom-1 left-3.5 p-1.5 xl:px-2.5 h-max rounded bg-sky-50 ">
                        <p className="hidden xl:block text-xs font-medium text-sky-600 mb-px whitespace-nowrap">
                          Feira de Adoção - Butantã
                        </p>
                        <span className="hidden xl:block text-xs font-normal text-sky-600 whitespace-nowrap">
                          10:00 - 18:00
                        </span>
                        <p className="xl:hidden w-2 h-2 rounded-full bg-sky-600"></p>
                      </div>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        20
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        21
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        22
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        23
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        24
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        25
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        26
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        27
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        28
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        29
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-b border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        30
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-indigo-200 rounded-bl-xl transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-900">
                        31
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">
                        1
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">
                        2
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">
                        3
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 relative bg-gray-50 border-r border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">
                        4
                      </span>
                      <div className="absolute top-9 bottom-1 left-3.5 p-1.5 xl:px-2.5 h-max rounded bg-tertiary ">
                        <p className="hidden xl:block text-xs font-medium text-secondary mb-px whitespace-nowrap">
                          Feira Ibirapuera
                        </p>
                        <span className="hidden xl:block text-xs font-normal text-secondary whitespace-nowrap">
                          10:00 - 18:00
                        </span>
                        <p className="xl:hidden w-2 h-2 rounded-full bg-secondary"></p>
                      </div>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-indigo-200 transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">
                        5
                      </span>
                    </div>
                    <div className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-indigo-200 rounded-br-xl transition-all duration-300 hover:bg-primary cursor-pointer">
                      <span className="text-xs font-semibold text-gray-400">
                        6
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
