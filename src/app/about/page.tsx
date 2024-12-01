import Image from "next/image";
import { TitleLogo, Footer, OutlineBtn} from "@/components";
import { aboutInfo } from "@/constants/about";
import Link from "next/link";

export default function About() {
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
            <div className="flex w-full justify-start pl-5 pt-5">
                    <Link href="/">
                        <OutlineBtn width="36" height="12" className="mr-2 my-1">
                            Home
                        </OutlineBtn>
                    </Link>
                </div>
                
                <TitleLogo size="l" />

                <p>{aboutInfo.title}</p>
                <p>{aboutInfo.description}</p>
                <p>{aboutInfo.stack}</p>
                <p className="text-black">Foto dos integrantes ?</p>
                
                <Footer />
            </main>
        </>
    );
}
