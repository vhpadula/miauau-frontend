"use client";
import { Button, Input } from "@/components";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { IVolunteer } from "@/types";
import { get, put, remove } from "@/services/baseServices";
import { useEffect, useState } from "react";

const defaultError = "Preenchimento obrigatório";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(defaultError),
  phone: Yup.string().required(defaultError),
  email: Yup.string().email("Email inválido").required(defaultError),
  age: Yup.number()
    .required(defaultError)
    .max(99, "A idade deve ter no máximo 2 dígitos"),
  role: Yup.string()
    .oneOf(["Material", "Tempo", "Financeiro"], "Contribuição inválida")
    .required(defaultError),
});

export default function VolunteerEditForm({
  params,
}: {
  params: { volunteerId: string };
}) {
  const emptyInitialValues: IVolunteer = {
    name: "",
    phone: "",
    email: "",
    age: undefined,
    role: "",
  };

  const router = useRouter();
  const [initialValues, setInitialValues] =
    useState<IVolunteer>(emptyInitialValues);

  function birthdateToAge(birthDate: string | undefined): number | undefined {
    if (!birthDate) return undefined;
    const birthDateObj = new Date(birthDate);
    const ageDifMs = Date.now() - birthDateObj.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const handleSubmit = async (values: IVolunteer) => {
    try {
      const response = await put(
        `/api/v1/persons/volunteers/${params.volunteerId}`,
        values
      );
      setTimeout(() => {
        router.push("/volunteers");
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await remove(`/api/v1/persons/${params.volunteerId}`);
      setTimeout(() => {
        router.push("/volunteers");
      }, 1000);
    } catch (error) {
      console.error("Error deleting volunteer:", error);
    }
  };

  useEffect(() => {
    get(`/api/v1/persons/${params.volunteerId}`)
      .then((response) => {
        response.age = birthdateToAge(response.birthDate);
        setInitialValues(response);
      })
      .catch((error) => {
        console.error("Failed to fetch volunteer data:", error);
      });
  }, [params.volunteerId]);

  return (
    <div className="bg-primary h-full">
      <div className="flex flex-col justify-center items-center pt-20 bg-white">
        <div className="border-b border-solid border-1 border-gray-400 pb-9">
          <div className="flex flex-col items-center justify-center pt-9 mx-10">
            <p className="font-black font-Roboto text-2xl text-primary text-center mb-3">
              Novo voluntário
            </p>
            <p className="font-Roboto text-sm text-gray-700 text-center">
              Este formulário serve para o cadastro de novos voluntários na ONG
              Anjos na Terra em Ação.
            </p>
          </div>
        </div>
        <Formik<IVolunteer>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formikProps: FormikProps<IVolunteer>) => (
            <Form className="w-full justify-center lg:w-2/3 px-10 py-11 h-fit bg-white">
              <div>
                <div className="grid gap-7">
                  <Input
                    label="Nome"
                    name="name"
                    value={formikProps?.values?.name}
                    onChange={formikProps.handleChange}
                    placeholder="ex: João da Silva"
                    className="text-black"
                    maxLength={50}
                    variant="form"
                    required
                  />
                  <Input
                    label="Telefone"
                    name="phone"
                    value={formikProps?.values?.phone}
                    onChange={formikProps.handleChange}
                    placeholder="(XX) XXXXX-XXXX"
                    className="text-black"
                    maxLength={15}
                    variant="form"
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    value={formikProps?.values?.email}
                    onChange={formikProps.handleChange}
                    placeholder="ex: joao@email.com"
                    className="text-black"
                    maxLength={50}
                    variant="form"
                    required
                  />
                  <Input
                    label="Idade"
                    name="age"
                    value={formikProps?.values?.age}
                    onChange={formikProps.handleChange}
                    placeholder="ex: 30"
                    className="text-black"
                    type="number"
                    variant="form"
                    required
                  />
                  <Input
                    label="Contribuição"
                    name="role"
                    value={formikProps?.values?.role}
                    onChange={formikProps.handleChange}
                    placeholder="ex: Material, Tempo ou Financeiro"
                    className="text-black"
                    variant="form"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center pt-11 gap-5">
                <Button
                  label="Salvar"
                  variant="outline"
                  type="submit"
                  disabled={Object.keys(formikProps.errors || {}).length > 0}
                />
                <Button
                  label="Deletar"
                  variant="primary"
                  type="button"
                  onClick={() => {
                    handleDelete();
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
