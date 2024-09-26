import Image from "next/image";
import { NavBar } from "@/components";
export default function Page() {
    return (
        <>
            <NavBar />
            <main className="flex flex-col items-center justify-center h-full">
                <h1 className="text-6xl font-bold">Hello, World!</h1>
            </main>
        </>
    );
}
