export interface IVolunteer {
  id?: string;
  name: string;
  phone: string;
  email: string;
  age: number | undefined;
  role: string;
  birthDate?: string;
}
