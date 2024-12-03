import Image from "next/image";
import { TitleLogo, Footer, OutlineBtn } from "@/components";
import Link from "next/link";

export default function About() {
  return (
    <>
      <main className="flex w-full min-h-screen flex-col items-center bg-primary">
        <div className="flex w-full justify-start pl-5 pt-5">
          <Link href="/">
            <OutlineBtn width="36" height="12" className="mr-2 my-1">
              Home
            </OutlineBtn>
          </Link>
        </div>

        <TitleLogo size="l" className="my-16" />

        <div className="text-white text-justify grid gap-8 mx-8">
          <p>
            O presente sistema foi desenvolvido por estudantes da Escola
            Politécnica da USP, Leticia Cohen, Michel Brito e Victor Padula.
          </p>
          <p>
            Este projeto tem como objetivo o desenvolvimento de uma plataforma
            digital inovadora, baseada em uma arquitetura modular e escalável de
            microserviços, destinada à gestão de Organizações Não Governamentais
            (ONGs) que atuam em diversas causas sociais. A primeira aplicação
            será voltada para ONGs que resgatam e promovem a adoção de animais,
            com foco na otimização de suas operações e no apoio a essas
            organizações de forma eficiente e acessível.
          </p>
          <p>
            A plataforma foi concebida para automatizar, centralizar e otimizar
            os processos essenciais das ONGs, com base nas operações da ONG
            Anjos na Terra. Ela visa facilitar a gestão de atividades como o
            controle de resgates e adoções de animais, gestão financeira,
            administração de voluntários e organização de eventos. Além disso, a
            arquitetura modular do sistema permite a expansão para atender a
            diferentes demandas de diferentes setores e a integração com outros
            sistemas, tornando-a uma solução flexível e adaptável.
          </p>
          <p>
            O projeto também envolve a criação de um projeto de extensão
            extracurricular na Escola Politécnica da USP, com o intuito de
            fortalecer a conexão entre a universidade e a sociedade. Os alunos
            serão incentivados a contribuir para a evolução contínua da
            plataforma, promovendo o uso do conhecimento acadêmico para impactar
            positivamente a sociedade e apoiar causas sociais relevantes, a fim
            de promover habilidades técnicas de projeto e empatia para a
            graduação dos engenheiros.
          </p>
          <p>
            O sistema foi desenvolvido utilizando práticas modernas de
            Engenharia de Software, sobretudo a Arquitetura em Camadas de
            Plataforma Digital, aplicando diversas tecnologias para garantir
            desempenho, escalabilidade e facilidade de manutenção. No frontend,
            foram utilizadas as tecnologias Next.js, TailwindCSS e TypeScript. O
            Next.js permite uma renderização eficiente e server-side rendering
            (SSR), enquanto o TailwindCSS proporciona um design responsivo e
            customizável com classes utilitárias. O TypeScript garante um código
            mais robusto e seguro, com tipagem estática. No backend, foi adotado
            o Java juntamente com o framework Spring, que oferece uma estrutura
            sólida e flexível para o desenvolvimento de APIs. A arquitetura do
            sistema é baseada em microsserviços, facilitando a escalabilidade e
            a modularidade, o que permite que o sistema se adapte a diferentes
            contextos e cresça com a adição de novas funcionalidades. O código
            fonte do projeto está em código aberto em repositórios públicos.
            Além disso, o projeto está estruturado usando contêineres Docker e
            pode ser implementado com orquestração em Kubernetes.
          </p>
          <p>
            Este projeto se destaca não apenas pelo seu potencial técnico, mas
            também pelo seu impacto social, ao apoiar ONGs essenciais para a
            proteção e cuidado de animais. Com a possibilidade de expandir para
            outras causas sociais, a plataforma representa um exemplo de como a
            tecnologia pode ser usada para gerar transformação social e promover
            um futuro mais justo e sustentável para todos.
          </p>

          <p>
            Confira imagens dos animais da ONG cadastrados no sistema na
            primeira implementação:
          </p>
        </div>
        <div className="mt-5 mx-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Image
            src="/about_images/IMG_8338.jpg"
            alt="cat"
            width={600}
            height={400}
          />
          <Image
            src="/about_images/IMG_8346.jpg"
            alt="cat"
            width={600}
            height={400}
          />

          <Image
            src="/about_images/IMG_8407.jpg"
            alt="cat"
            width={600}
            height={400}
          />
          <Image
            src="/about_images/IMG_8421.jpg"
            alt="cat"
            width={600}
            height={400}
          />
          <Image
            src="/about_images/IMG_8352.jpg"
            alt="cat"
            width={600}
            height={400}
          />
          <Image
            src="/about_images/IMG_8361.jpg"
            alt="cat"
            width={600}
            height={400}
          />
          <Image
            src="/about_images/Imagem1.jpg"
            alt="cat"
            width={600}
            height={400}
          />

          <Image
            src="/about_images/Imagem3.jpg"
            alt="cat"
            width={600}
            height={400}
          />

          <Image
            src="/about_images/Imagem5.jpg"
            alt="cat"
            width={600}
            height={400}
          />
        </div>

        <Footer className="mt-auto" />
      </main>
    </>
  );
}
