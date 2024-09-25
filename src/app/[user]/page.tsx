import Image from "next/image";
import { NavBar } from "@/components";
export default function Page() {
    return (
        <>
            <NavBar />
            <main className="flex w-full min-h-screen flex-col items-center justify-between">
                <div className="flex w-full justify-end"></div>
            </main>
        </>
    );
}
