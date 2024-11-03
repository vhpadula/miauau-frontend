import { IFinanceRecord, IVolunteer } from "@/types";

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
        name: "João",
        age: "35 anos",
        livesAlone: true,
        occupation: "Veterinário"
    },
    {
        id: "2",
        name: "Maria",
        age: "29 anos",
        livesAlone: true,
        occupation: "Engenheira Ambiental"
    },
    {
        id: "3",
        name: "Carlos",
        age: "42 anos",
        livesAlone: true,
        occupation: "Administrador"
    },
    {
        id: "4",
        name: "Ana Paula",
        age: "27 anos",
        livesAlone: true,
        occupation: "Bióloga"
    },
    {
        id: "5",
        name: "Lucas",
        age: "30 anos",
        livesAlone: true,
        occupation: "Designer Gráfico"
    },
    {
        id: "6",
        name: "Patrícia",
        age: "38 anos",
        livesAlone: true,
        occupation: "Assistente Social"
    },
    {
        id: "7",
        name: "Roberto",
        age: "45 anos",
        livesAlone: true,
        occupation: "Advogado"
    },
    {
        id: "8",
        name: "Juliana",
        age: "31 anos",
        livesAlone: true,
        occupation: "Veterinária"
    },
];

export const financeRecords: IFinanceRecord[] = [
    {
        id: "1",
        label: "Doação de João Silva",
        type: "Entrada",
        incomeType: "Doação",
        date: "2024-01-15",
        value: "R$500.00"
    },
    {
        id: "2",
        label: "Compra de ração",
        type: "Saída",
        outcomeType: "Alimentação",
        date: "2024-01-18",
        value: "R$300.00"
    },
    {
        id: "3",
        label: "Doação de Maria Oliveira",
        type: "Entrada",
        incomeType: "Doação",
        date: "2024-02-02",
        value: "R$1000.00"
    },
    {
        id: "4",
        label: "Serviço de veterinário",
        type: "Saída",
        outcomeType: "Serviços",
        date: "2024-02-10",
        value: "R$450.00"
    },
    {
        id: "5",
        label: "Venda de produtos",
        type: "Entrada",
        incomeType: "Venda",
        date: "2024-02-15",
        value: "R$250.00"
    },
    {
        id: "6",
        label: "Compra de medicamentos",
        type: "Saída",
        outcomeType: "Medicamentos",
        date: "2024-02-18",
        value: "R$120.00"
    },
    {
        id: "7",
        label: "Doação anônima",
        type: "Entrada",
        incomeType: "Doação",
        date: "2024-03-01",
        value: "R$200.00"
    },
    {
        id: "8",
        label: "Pagamento de aluguel",
        type: "Saída",
        outcomeType: "Infraestrutura",
        date: "2024-03-05",
        value: "R$900.00"
    },
    {
        id: "9",
        label: "Evento de arrecadação",
        type: "Entrada",
        incomeType: "Evento",
        date: "2024-03-10",
        value: "R$1500.00"
    },
    {
        id: "10",
        label: "Manutenção do abrigo",
        type: "Saída",
        outcomeType: "Infraestrutura",
        date: "2024-03-12",
        value: "R$400.00"
    },
    {
        id: "11",
        label: "Doação de Pedro Santos",
        type: "Entrada",
        incomeType: "Doação",
        date: "2024-03-15",
        value: "R$600.00"
    },
    {
        id: "12",
        label: "Compra de brinquedos para animais",
        type: "Saída",
        outcomeType: "Equipamentos",
        date: "2024-03-18",
        value: "R$150.00"
    },
    {
        id: "13",
        label: "Venda de produtos",
        type: "Entrada",
        incomeType: "Venda",
        date: "2024-04-02",
        value: "R$300.00"
    },
    {
        id: "14",
        label: "Compra de produtos de limpeza",
        type: "Saída",
        outcomeType: "Higiene",
        date: "2024-04-04",
        value: "R$80.00"
    },
    {
        id: "15",
        label: "Doação de empresa XYZ",
        type: "Entrada",
        incomeType: "Doação",
        date: "2024-04-10",
        value: "R$2000.00"
    },
    {
        id: "16",
        label: "Pagamento de conta de luz",
        type: "Saída",
        outcomeType: "Infraestrutura",
        date: "2024-04-12",
        value: "R$300.00"
    },
    {
        id: "17",
        label: "Venda de rifas",
        type: "Entrada",
        incomeType: "Venda",
        date: "2024-04-18",
        value: "R$500.00"
    },
    {
        id: "18",
        label: "Compra de camas para animais",
        type: "Saída",
        outcomeType: "Equipamentos",
        date: "2024-04-20",
        value: "R$250.00"
    },
    {
        id: "19",
        label: "Doação de Ana Paula",
        type: "Entrada",
        incomeType: "Doação",
        date: "2024-04-25",
        value: "R$700.00"
    },
    {
        id: "20",
        label: "Serviço de transporte",
        type: "Saída",
        outcomeType: "Serviços",
        date: "2024-04-28",
        value: "R$350.00"
    }
];