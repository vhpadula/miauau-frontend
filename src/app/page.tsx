import Image from "next/image";
import { OutlineBtn, TitleText } from "@/components/atoms";
import { TitleLogo } from "@/components";
export default function Home() {
    return (
        <>
            <div className="absolute top-0 left-0 right-0 h-[30vw] min-h-[75%] z-[-1]">
                <Image
                    src="/background.svg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="w-full"
                />
            </div>

            <main className="flex w-full min-h-screen flex-col items-center justify-between">
                <div className="flex w-full justify-end">
                    <OutlineBtn width="32" height="12" className="mr-2">
                        Sobre Nós
                    </OutlineBtn>
                    <OutlineBtn width="36" height="12" className="mr-2">
                        Login
                    </OutlineBtn>
                </div>
                <TitleLogo size="l" />

                <p>Sistema Inteligente para Administração da sua ONG</p>

                <OutlineBtn width="72" height="24" className="my-1">
                    Inscreva-se Gratuitamente
                </OutlineBtn>
                <div className="relative w-20 p-48">
                    <Image
                        src="./window.svg"
                        alt="Window Example"
                        fill={true}
                    />
                </div>
                <div className="flex w-full justify-end items-center h-20 bg-primary">
                    <TitleLogo size="sm" className="m-1" />
                </div>
            </main>
        </>
    );
}
