import Image from "next/image";
import { OutlineBtn, TitleText } from "@/components/atoms";
export default function Home() {
    return (
        <>
            <div className="absolute top-0 left-0 right-0 h-[30vw] min-h-[75%] z-[-1]">
                <Image
                    src="/Rectangle.svg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="w-full"
                />
            </div>
            <main className="flex w-full min-h-screen flex-col items-center justify-between ">
                <TitleText textSize="text-5xl" />

                <OutlineBtn width="72" height="24">
                    Inscreva-se Gratuitamente
                </OutlineBtn>

                <OutlineBtn width="36" height="12">
                    Login
                </OutlineBtn>

                <OutlineBtn width="20" height="12">
                    Sobre Nós
                </OutlineBtn>
            </main>
        </>
    );
}
