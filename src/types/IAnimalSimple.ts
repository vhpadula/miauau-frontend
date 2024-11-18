
export interface IAnimalSimple {
    id: string;
    name: string;
    imagePath: string;
    type: 'Gato' | 'Cachorro' | '';
    ageGroup: 'Filhote' | 'Adulto' | 'Idoso' | '';
    sex: 'Fêmea' | 'Macho' | '';
}