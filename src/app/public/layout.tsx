import { TitleLogo } from "@/components";
import Image from "next/image";

export default function PublicPagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="header-container fixed w-screen h-20 bg-primary flex items-center justify-between z-20">
                <div className="flex-grow flex justify-center">
                    <TitleLogo size="sm" />
                </div>
            </div>
            <main className="h-screen">{children}</main>
        </>
    );
}