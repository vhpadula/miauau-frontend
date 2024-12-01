import Image from "next/image";
import { TitleLogo, Footer, OutlineBtn } from "@/components";
import Link from "next/link";
export default function Home() {
    return (
        <>
            <div className="absolute top-0 left-0 right-0 h-[30vw] min-h-[70%] z-[-1]">
                <Image
                    src="/images/background.svg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="w-full"
                />
            </div>

            <main className="flex w-full min-h-screen flex-col items-center justify-between">
                <div className="flex w-full justify-end">
                    <Link href="/about">
                        <OutlineBtn width="36" height="12" className="mr-2 my-1">
                            Sobre Nós
                        </OutlineBtn>
                    </Link>
                    <Link href="/animals">
                        <OutlineBtn
                            width="36"
                            height="12"
                            className="mr-2 my-1"
                        >
                            Login
                        </OutlineBtn>
                    </Link>
                </div>
                <TitleLogo size="l" />

                <p>Sistema Inteligente para Administração da sua ONG</p>

                <OutlineBtn width="72" height="24" className="my-5">
                    Inscreva-se Gratuitamente
                </OutlineBtn>

                <div className="relative min-h-60 px-[40%] py-[15%]">
                    <Image
                        src="/images/window.svg"
                        alt="Window Example"
                        fill={true}
                    />
                </div>
                <Footer />
            </main>
        </>
    );
}
