"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { get } from "@/services/baseServices";
import { IAnimalSimple } from "@/types";
import Link from "next/link";

type Animal = {
  id: string;
  name: string;
  imagePath: string;
  type: string;
  sex: string;
  ageGroup: string;
  castrated: string;
  color: string;
};

export default function AnimalPublic({
  params,
}: {
  params: { animalId: string };
}) {
  const emptyAnimal: IAnimalSimple = {
    id: "",
    animalNumber: "",
    name: "",
    imagePath: "",
    type: "",
    sex: "",
    ageGroup: "",
    castrated: false,
    color: "",
    ongId: "",
  };

  const [animal, setAnimal] = useState<IAnimalSimple>(emptyAnimal);

  useEffect(() => {
    get(`/api/v1/animals/${params.animalId}`)
      .then((response) => {
        setAnimal(response);
      })
      .catch((error) => {
        console.error("Failed to fetch animal:", error);
      });
  }, [params.animalId]);

  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const image =
    animal.imagePath != null
      ? animal.imagePath
      : animal.type === "Gato"
      ? "/images/cat.png"
      : "/images/dog.png";

  return (
    <div className="bg-secondary w-full flex justify-center">
      <div className="flex flex-col pt-20 items-center justify-center min-h-screen sm:w-1/3">
        <div className="flex flex-col items-center px-5 pt-2 pb-20">
          <div
            className="my-6 relative rounded-full overflow-hidden border-[6px] border-white
                            w-[75vw] h-[75vw]
                            sm:w-[60vw] sm:h-[60vw]
                            md:w-[40vw] md:h-[40vw]
                            lg:w-[30vw] lg:h-[30vw]
                            xl:w-[20vw] xl:h-[20vw]"
          >
            <Image
              src={image}
              alt="Animais"
              fill={true}
              className="object-cover"
            />
          </div>
          <p className="font-bold text-white text-5xl">{animal.name}</p>

          <p className="font-medium text-white text-xl mt-2">{animal.sex}</p>
          <p className="font-medium text-white text-base">
            {animal.ageGroup} | {animal.color} |{" "}
            {animal.castrated ? "Castrad" : "Não castrad"}
            {animal.sex == "Macho" ? "o" : "a"}
          </p>
          {animal.animalNumber && (
            <p className="font-medium text-white text-sm mt-1">
              (ID: {animal.animalNumber})
            </p>
          )}
          {/* TODO: Adicionar link para envio de msgs quando ong tiver whatsapp */}
          {/* <div className="flex items-center justify-between bg-white shadow-md rounded-lg w-full p-1 mt-12">
                        <div className="flex items-center">
                            <div className="m-3">
                                <Image 
                                    src="/images/whatsapp.png" 
                                    alt="whatsapp" 
                                    width={40}
                                    height={40}
                                    className="object-cover object-center rounded-full"
                                />
                            </div>
                            <div>
                                <p className="font-medium text-black text-base">WhatsApp</p>
                                <p className="text-gray-700 text-xs font-light">Pergunte sobre {animal.sex == "Macho" ? "o" : "a"} {animal.name} no WhatsApp</p>
                            </div>
                        </div>
                        <Image
                            src="/icons/semi-right-arrow.svg"
                            alt="semi-right-arrow"
                            width={20}
                            height={20}
                            className="mx-4"
                        />
                    </div> */}
          <Link
            href="https://www.instagram.com/onganjosnaterra/"
            className="w-full"
          >
            <div className="flex items-center justify-between bg-white shadow-md rounded-lg w-full p-1 mt-12">
              <div className="flex items-center">
                <div className="m-3">
                  <Image
                    src="/images/instagram.png"
                    alt="instagram"
                    width={40}
                    height={40}
                    className="object-cover object-center rounded-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-black text-base">Instagram</p>
                  <p className="text-gray-700 text-xs font-light">
                    Siga a ONG no Instagram!
                  </p>
                </div>
              </div>
              <Image
                src="/icons/semi-right-arrow.svg"
                alt="semi-right-arrow"
                width={20}
                height={20}
                className="mx-4"
              />
            </div>
          </Link>
          <Link href={`/public/animals/ong/${animal.ongId}`} className="w-full">
            <div className="flex items-center justify-between bg-white shadow-md rounded-lg w-full p-1 mt-2">
              <div className="flex items-center">
                <div className="m-3">
                  <Image
                    src="/images/anjosnaterralogo.jpeg"
                    alt="instagram"
                    width={40}
                    height={40}
                    className="object-cover object-center rounded-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-black text-base">
                    Anjos na Terra
                  </p>
                  <p className="text-gray-700 text-xs font-light">
                    Ver mais animais desta ONG
                  </p>
                </div>
              </div>
              <Image
                src="/icons/semi-right-arrow.svg"
                alt="semi-right-arrow"
                width={20}
                height={20}
                className="mx-4"
              />
            </div>
          </Link>
          <Link href={`/public/animals/`} className="w-full">
            <div className="flex items-center justify-between bg-white shadow-md rounded-lg w-full p-1 mt-2">
              <div className="flex items-center">
                <div className="m-3">
                  <Image
                    src="/icons/earth-icon.svg"
                    alt="instagram"
                    width={40}
                    height={40}
                    className="object-cover object-center rounded-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-black text-base">
                    Todas as ONGs
                  </p>
                  <p className="text-gray-700 text-xs font-light">
                    Ver animais de todas as ONGs parceiras
                  </p>
                </div>
              </div>
              <Image
                src="/icons/semi-right-arrow.svg"
                alt="semi-right-arrow"
                width={20}
                height={20}
                className="mx-4"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
