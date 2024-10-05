import React from "react";
import { VolunteerCard } from "../../molecules";

type VolunteersListProps = {
    setCurrentSection: (section: string) => void;
};

const VolunteersList: React.FC<VolunteersListProps> = ({ setCurrentSection }) => {
    const volunteers = [
        {
            id: "1",
            name: "John Doe",
            role: "Coordinator",
            occupancy: "Full-time",
            age: "35",
            imageSrc: "/images/default.png"
        },
        {
            id: "2",
            name: "Jane Smith",
            role: "Assistant",
            occupancy: "Part-time",
            age: "28",
            imageSrc: "/images/default.png"
        },
        {
            id: "3",
            name: "Emily Johnson",
            role: "Trainer",
            occupancy: "Full-time",
            age: "42",
            imageSrc: "/images/default.png"
        },
        {
            id: "4",
            name: "Michael Brown",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "22",
            imageSrc: "/images/default.png"
        },
        {
            id: "5",
            name: "Jessica White",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "25",
            imageSrc: "/images/default.png"
        },
        {
            id: "6",
            name: "David Green",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "30",
            imageSrc: "/images/default.png"
        },
        {
            id: "7",
            name: "Emma Black",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "27",
            imageSrc: "/images/default.png"
        },
        {
            id: "8",
            name: "James Blue",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "29",
            imageSrc: "/images/default.png"
        },
        {
            id: "9",
            name: "Sophia Red",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "31",
            imageSrc: "/images/default.png"
        },
        {
            id: "10",
            name: "Oliver Yellow",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "26",
            imageSrc: "/images/default.png"
        },
        {
            id: "11",
            name: "Amelia Purple",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "32",
            imageSrc: "/images/default.png"
        },
        {
            id: "12",
            name: "Benjamin Orange",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "33",
            imageSrc: "/images/default.png"
        },
        {
            id: "13",
            name: "Mia Pink",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "24",
            imageSrc: "/images/default.png"
        },
        {
            id: "14",
            name: "Ethan Brown",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "23",
            imageSrc: "/images/default.png"
        },
        {
            id: "15",
            name: "Ava Green",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "34",
            imageSrc: "/images/default.png"
        },
        {
            id: "16",
            name: "Noah Black",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "36",
            imageSrc: "/images/default.png"
        },
        {
            id: "17",
            name: "Isabella Blue",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "37",
            imageSrc: "/images/default.png"
        },
        {
            id: "18",
            name: "Liam Red",
            role: "Volunteer",
            occupancy: "Part-time",
            age: "38",
            imageSrc: "/images/default.png"
        }
    ]

    const [currentPage, setCurrentPage] = React.useState(1);
    const [volunteersPerPage] = React.useState(8);

    const totalPages = Math.ceil(volunteers.length / volunteersPerPage);

    const indexOfLastVolunteer = currentPage * volunteersPerPage;
    const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
    const currentVolunteers = volunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };


    return (
        <div className="flex flex-col items-center justify-center ml-16 h-screen">
            <div className="w-full flex justify-end mr-6">
                <button 
                className="m-4 p-2 bg-primary text-white rounded z-50"
                    onClick={()=> console.log("adicionou")}>
                    Create New
                </button>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-2 max-h-screen">
                {currentVolunteers.map((volunteer) => (
                    <VolunteerCard
                        key={volunteer.id}
                        id={volunteer.id}
                        imageSrc={volunteer.imageSrc}
                        name={volunteer.name}
                        role={volunteer.role}
                        occupancy={volunteer.occupancy}
                        age={volunteer.age}
                        setCurrentSection={setCurrentSection}
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 z-50">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-full transition-colors duration-300 ${
                            currentPage === index + 1
                            ? "bg-primary text-white"
                            : "bg-gray text-black hover:bg-gray-300"
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

export default VolunteersList;
