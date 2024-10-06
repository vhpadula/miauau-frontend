import { Header } from "@/components";

export default function AnimalOrgLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header
                imageSrc="/images/anjosnaterra.png"
                username="Anjos Na Terra"
            />
            <main className="h-screen">{children}</main>
        </>
    );
}