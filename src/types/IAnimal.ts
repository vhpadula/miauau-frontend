
export interface IAnimal {
    name: string;
    image: string;
    type: 'Gato' | 'Cachorro' | '';
    ageGroup: 'Filhote' | 'Adulto' | 'Idoso' | '';
    sex: 'Fêmea' | 'Macho' | '';
    pregnant: 'Sim' | 'Não' | 'Sem definição' | '';
    castrated: boolean | undefined;
    color: 'Preto' | 'Branco' | 'Amarelo' | 'Cinza' | 'Mesclado' | 'Tricolor' | 'Frajola' | 'Sialata' | 'Escaminha' | '';
    approximateAge: 'Recém-nascido' | '3 meses a 1 ano' | '1 a 2 anos' | '2 a 5 anos' | 'Acima de 5 anos' | 'Impossível definir' | '';
    fiv: boolean | undefined;
    felv: boolean | undefined;
    healthSituation: {
        healthy: boolean;
        dirty: boolean;
        hurt: boolean;
        mange: boolean;
        fleas: boolean;
        ticks: boolean;
        vomiting: boolean;
        limping: boolean;
        other: boolean;
        otherDescription: string;
    }
    needsCare: 'Não' | 'Veterinário básico' | 'Urgência' | 'Apenas banho' | '';
    vaccinated: 'Sim' | 'Não' | 'Não sei informar' | '';
    vaccinationDate: string;
    dewormed: 'Sim' | 'Não' | 'Não sei informar' | '';
    dewormingDate: string;
    antiFleas: 'Sim' | 'Não' | 'Não sei informar' | '';
    antiFleasApplicationDate: string;
    rescue: {
        howDidItArrive: 'Foi devolvido' | 'Resgate da ONG' | 'Resgate por outra pessoa' | 'Outro' | '';
        description: string;
        responsible: {
            name: string;
            phone: string;
            donnation: {
                money: boolean;
                food: boolean;
                antiFleas: boolean;
                timeToHelp: boolean;
                other: boolean;
                otherDescription: string;
            }
        }
    }
}