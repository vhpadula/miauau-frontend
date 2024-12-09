"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
type VolunteerCardProps = {
  id: string | undefined;
  name: string;
  age: number | undefined;
  phone: string;
  contribution: string;
};

const VolunteerCard: React.FC<VolunteerCardProps> = ({
  id,
  name,
  age,
  phone,
  contribution,
}) => {
  const router = useRouter();
  function formatPhoneNumber(phoneNumberString: string) {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  }

  return (
    <div
      id={id}
      className="flex items-center justify-between bg-white shadow-md rounded-lg w-full h-24"
    >
      <div className="flex items-center ml-7">
        <div>
          <p className="font-bold text-gray-700 text-base mb-1">{name}</p>
          <p className="text-gray-700 text-xs font-medium mb-0.5">
            {age} anos | {contribution}
          </p>
          <p className="text-gray-700 text-xs font-medium">
            {formatPhoneNumber(phone)}
          </p>
        </div>
      </div>
      <Image
        src="/icons/edit-gray.svg"
        alt="edit"
        width={20}
        height={20}
        className="mr-7"
        onClick={() => router.push(`/volunteers/edit/${id}`)}
      />
    </div>
  );
};

export default VolunteerCard;
