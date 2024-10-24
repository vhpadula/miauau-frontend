export interface IVolunteer { // isso aqui provavelmente tem que ir pra outro lugar, tipo um model ou sla
    id: string;
    name: string;
    phone: string;
    profession: string;
    email: string;
    age: number;
    contribution: string;
}

export const volunteers: IVolunteer[] = [
    {
        id: "1",
        name: "João Silva",
        phone: "(11) 99999-1234",
        profession: "Veterinário",
        email: "joao.silva@example.com",
        age: 35,
        contribution: "Material"
    },
    {
        id: "2",
        name: "Maria Oliveira",
        phone: "(21) 98888-5678",
        profession: "Engenheira Ambiental",
        email: "maria.oliveira@example.com",
        age: 29,
        contribution: "Material"
    },
    {
        id: "3",
        name: "Carlos Souza",
        phone: "(31) 97777-9101",
        profession: "Administrador",
        email: "carlos.souza@example.com",
        age: 42,
        contribution: "Tempo"
    },
    {
        id: "4",
        name: "Ana Paula",
        phone: "(41) 96666-3141",
        profession: "Bióloga",
        email: "ana.paula@example.com",
        age: 27,
        contribution: "Material"
    },
    {
        id: "5",
        name: "Lucas Fernandes",
        phone: "(31) 95555-1122",
        profession: "Designer Gráfico",
        email: "lucas.fernandes@example.com",
        age: 30,
        contribution: "Tempo"
    },
    {
        id: "6",
        name: "Patrícia Lima",
        phone: "(71) 94444-2233",
        profession: "Assistente Social",
        email: "patricia.lima@example.com",
        age: 38,
        contribution: "Material"
    },
    {
        id: "7",
        name: "Roberto Faria",
        phone: "(61) 93333-3344",
        profession: "Advogado",
        email: "roberto.faria@example.com",
        age: 45,
        contribution: "Tempo"
    },
    {
        id: "8",
        name: "Juliana Costa",
        phone: "(19) 92222-4455",
        profession: "Veterinária",
        email: "juliana.costa@example.com",
        age: 31,
        contribution: "Financeiro"
    },
    {
        id: "9",
        name: "Pedro Santos",
        phone: "(21) 91111-5566",
        profession: "Fotógrafo",
        email: "pedro.santos@example.com",
        age: 26,
        contribution: "Financeiro"
    },
    {
        id: "10",
        name: "Renata Alves",
        phone: "(81) 90000-6677",
        profession: "Nutricionista",
        email: "renata.alves@example.com",
        age: 36,
        contribution: "Financeiro"
    },
    {
        id: "11",
        name: "Fernando Pires",
        phone: "(47) 98888-7788",
        profession: "Zootecnista",
        email: "fernando.pires@example.com",
        age: 33,
        contribution: "Financeiro"
    },
    {
        id: "12",
        name: "Camila Rocha",
        phone: "(11) 97777-8899",
        profession: "Publicitária",
        email: "camila.rocha@example.com",
        age: 28,
        contribution: "Financeiro"
    }
];

export const animals = [
    {
        id: "1",
        imageSrc: "/images/dog1.png",
        name: "Rex",
        species: "Cachorro",
        size: "Pequeno",
        age: "2 anos",
        location: "São Paulo",
    },
    {
        id: "2",
        imageSrc: "/images/cat1.png",
        name: "Mimi",
        species: "Gato",
        size: "Médio",
        age: "3 anos",
        location: "Rio de Janeiro",
    },
    {
        id: "3",
        imageSrc: "/images/dog2.png",
        name: "Buddy",
        species: "Cachorro",
        size: "Grande",
        age: "4 anos",
        location: "Curitiba",
    },
    {
        id: "4",
        imageSrc: "/images/cat2.png",
        name: "Luna",
        species: "Gato",
        size: "Pequeno",
        age: "1 ano",
        location: "Porto Alegre",
    },
    {
        id: "5",
        imageSrc: "/images/dog3.png",
        name: "Max",
        species: "Cachorro",
        size: "Médio",
        age: "5 anos",
        location: "Belo Horizonte",
    },
    {
        id: "6",
        imageSrc: "/images/cat3.png",
        name: "Bella",
        species: "Gato",
        size: "Grande",
        age: "2 anos",
        location: "Salvador",
    },
    {
        id: "7",
        imageSrc: "/images/dog4.png",
        name: "Charlie",
        species: "Cachorro",
        size: "Pequeno",
        age: "3 anos",
        location: "Fortaleza",
    },
    {
        id: "8",
        imageSrc: "/images/cat4.png",
        name: "Simba",
        species: "Gato",
        size: "Médio",
        age: "4 anos",
        location: "Brasília",
    },
];

export const candidates = [
    {
        id: "1",
        name: "Rex",
        age: "2 anos",
        livesAlone: false,
        occupation: "Trabalha"
    },
    {
        id: "2",
        name: "Mimi",
        age: "3 anos",
        livesAlone: false,
        occupation: "Trabalha"
    },
    {
        id: "3",
        name: "Buddy",
        age: "4 anos",
        livesAlone: false,
        occupation: "Trabalha"
    },
    {
        id: "4",
        name: "Luna",
        age: "1 ano",
        livesAlone: false,
        occupation: "Trabalha"
    },
    {
        id: "5",
        name: "Max",
        age: "5 anos",
        livesAlone: false,
        occupation: "Trabalha"
    },
    {
        id: "6",
        name: "Bella",
        age: "2 anos",
        livesAlone: false,
        occupation: "Trabalha"
    },
    {
        id: "7",
        name: "Charlie",
        age: "3 anos",
        livesAlone: false,
        occupation: "Trabalha"
    },
    {
        id: "8",
        name: "Simba",
        age: "4 anos",
        livesAlone: false,
        occupation: "Trabalha"
    },
];