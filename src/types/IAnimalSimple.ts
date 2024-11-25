import { number } from "yup";

export interface IAnimalSimple {
    id: string;
    animalNumber: string;
    name: string;
    imagePath: string;
    type: 'Gato' | 'Cachorro' | '';
    ageGroup: 'Filhote' | 'Adulto' | 'Idoso' | '';
    sex: 'Fêmea' | 'Macho' | '';
}