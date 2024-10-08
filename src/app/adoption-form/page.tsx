"use client";
import {
    HeaderGroup,
	Button,
	Input
} from "@/components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikProps } from "formik";
import { FormData } from "./types";
import * as Yup from "yup";
import Checkbox from "@/components/atoms/Checkbox";
import RadioButton from "@/components/atoms/RadioButton";

const validationSchema  = Yup.object().shape({
    personalInformation: Yup.object().shape({
        identification: Yup.object().shape({
            name: Yup.string().required('Nome completo é obrigatório'),
            cpf: Yup.string().required('CPF é obrigatório'),
            rg: Yup.string().required('RG é obrigatório'),
            birthDate: Yup.date()
                .required('Data de Nascimento é obrigatória'),
            phone: Yup.string().required('Celular é obrigatório'),
            landline: Yup.string(),
            email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        }),
		address: Yup.object({
		  zipcode: Yup.string().required('CEP é obrigatório'),
		  street: Yup.string().required('Rua é obrigatória'),
		  number: Yup.string().required('Número é obrigatório'),
		  complement: Yup.string(),
		  neighborhood: Yup.string().required('Bairro é obrigatório'),
		}),
    }),
    socioeconomicProfile: Yup.object({
		occupation: Yup.object({
		  profession: Yup.string().required('Profissão é obrigatória'),
		  occupation: Yup.object({
			working: Yup.boolean(),
			studying: Yup.boolean(),
			unemployed: Yup.boolean(),
			other: Yup.boolean(),
            otherDescription: Yup.string().when('other', (other) => {
				if (other && other[0]) {
					console.log("other", other)
					return Yup.string().required('Descrição necessária se "outro" estiver selecionado')
				} 
				return Yup.string().nullable()
			}),
		  }),
		  rent: Yup.string().required('Preenchimento obrigatório'),
		}),
		residence: Yup.object({
		  type: Yup.object({
			house: Yup.boolean(),
			apartment: Yup.boolean(),
			grange: Yup.boolean(),
			other: Yup.boolean(),
            otherDescription: Yup.string().when('other', (other) => {
				if (other && other[0]) {
					console.log("other", other)
					return Yup.string().required('Descrição necessária se "outro" estiver selecionado')
				} 
				return Yup.string().nullable()
			}),
		  }),
		  own: Yup.boolean(),
		  rent: Yup.boolean(),
		  inherited: Yup.boolean(),
		}),
	  }),
	});

export default function AdoptionForm() {
	const router = useRouter();
  
    const [step, setStep] = useState(1);
	const stepTitle: { [key: number]: string } = {
		1: "Informações pessoais",
		2: "Perfil socioeconômico",
		3: "Detalhes da moradia",
		4: "Convivência",
		5: "Animais",
		6: "Interesses",
		7: "Cuidados diários",
		8: "O que você faria?",
		9: "Acordos"
	}

	type Step = 'personalInformation' | 'socioeconomicProfile' | 'housingDetails' | 'coexistence' | 'animals' | 'interest' | 'dailyCare' | 'attitudesTowardsTheAnimal' | 'agreements';

	const schemaTitle: { [key: number]: Step } = {
		1: "personalInformation",
		2: "socioeconomicProfile",
		3: "housingDetails",
		4: "coexistence",
		5: "animals",
		6: "interest",
		7: "dailyCare",
		8: "attitudesTowardsTheAnimal",
		9: "agreements"
	}

	const initialValues: FormData = {
		personalInformation: {
			identification: {
				name: "",
				cpf: "",
				rg: "",
				birthDate: "",
				phone: "",
				landline: "",
				email: ""
			},
			address: {
				zipcode: "",
				street: "",
				number: "",
				complement: "",
				neighborhood: ""
			}
		},
		socioeconomicProfile: {
			occupation: {
				profession: "",
				occupation: {
					working: false,
					studying: false,
					unemployed: false,
					other: false,
					otherDescription: ""
				},
				rent: ""
			},
			residence: {
				type: {
					house: false,
					apartment: false,
					grange: false,
					other: false,
					otherDescription: ""
				},
				own: false,
				rent: false,
				inherited: false
			}
		},
		housingDetails: {
			generalCharacteristics: {
				pool: false,
				poolWithProtection: false,
				fence: false,
				wall: false,
				windowsWithScreen: false,
				balconyWithScreen: false,
				willInstallScreens: false,
				yard: false,
				bigYard: false,
				safeHouse: false,
				flightRisk: false,
				condominiumRestriction: ""
			}
		},
		coexistence: {
			generalCharacteristics: {
				animalWillStay: {
					inside: false,
					outside: false
				},
				possibilityOfMoving: false,
				livesAlone: false,
				livesWithWho: "",
				amountOfChildrenInTheHouse: 0,
				childrensAge: false,
				alergicResidents: false,
				whatHappensInCaseOfAlergies: "",
				allResidentsAgree: false,
				numberOfAnimalsCurrently: 0,
				castrated: false
			}
		},
		animals: {
			previous: {
				hadAnimalsBefore: false,
				whatHappenedToLastAnimal: {
					ranAway: false,
					ranOver: false,
					diedOfOldAge: false,
					diedByAccident: false,
					disappeared: false,
					donatedToSomeone: false,
					stolen: false,
					diedFromIllness: false,
					dateOfOccurrence: ""
				}
			},
			adoptionMotivation: {
				company: false,
				guard_and_lookout: false,
				gift_someone: false,
				other: false,
				otherDescription: ""
			},
			animalsOfInterest: {
				cat: false,
				dog: false
			}
		},
		interest: {
			dog: {
				sex: {
					female: false,
					male: false
				},
				size: {
					small: false,
					medium: false,
					big: false
				},
				ageGroup: {
					puppy: false,
					adult: false,
					elderly: false
				}
			},
			cat: {
				sex: {
					female: false,
					male: false
				},
				size: {
					small: false,
					medium: false,
					big: false
				},
				ageGroup: {
					puppy: false,
					adult: false,
					elderly: false
				}
			}
		},
		dailyCare: {
			responsibleForCare: "",
			responsibleForCareInCaseOfTravel: "",
			howWillEducate: "",
			hasPetCarrier: false,
			dailyWalks: 0,
			timeAlone: {
				oneToThreeHours: false,
				threeToSevenHours: false,
				eightOrMoreHours: false
			},
			foodType: {
				animal: false,
				human: false,
				other: false,
				otherDescription: ""
			}
		},
		attitudesTowardsTheAnimal: {
			getsLost: "",
			getsSickOrAccident: "",
			hurtsYourChild: "",
			damagesValuableObject: "",
			peesOrPoopsInInappropriatePlace: "",
			doesThingsYouDontWant: "",
			ifYouHaveAChild: ""
		},
		agreements: {
			certaintyOfAdoption: false,
			awareOfTheImportanceOfNeuteringTheAnimal: false,
			agreesWithCastration: false,
			longTermCommitment: false,
			imageUse: false,
			monetaryContribution: false,
			houseVisit: false,
			notifyBeforeDonateToSomeoneElse: false,
			trueInformation: false,
			videoPresentation: false
		}
	}

	const nextStep = (formikProps: FormikProps<FormData>) => {
		console.log(formikProps);
		setStep((prevStep) => prevStep + 1);
	};

	const prevStep = () => {
		setStep((prevStep) => prevStep - 1);
	};

	// Função para submeter o formulário ao final
	const handleSubmit = async (values: any) => {
		console.log(values);
		// const response = await fetch('/api/adoption', {
		// 	method: 'POST',
		// 	body: JSON.stringify(values),
		// });

		// if (response.ok) {
		// 	router.push('/adoption-success');
		// }
	};

	const renderStep = (formikProps: FormikProps<FormData>) => {
		switch (step) {
			case 1:
				return (
					<div>
						<p className="font-black font-Roboto text-xl text-primary mb-3">Identificação</p>
						<div className="grid gap-7">
							<Input
								label="Nome completo"
								name="personalInformation.identification.name"
								value={formikProps?.values?.personalInformation?.identification?.name}
								onChange={formikProps.handleChange}
								placeholder="Ana da Silva"
								className="text-black"
								variant="form"
								required
							/>
							<Input
								label="CPF"
								name="personalInformation.identification.cpf"
								value={formikProps?.values?.personalInformation?.identification?.cpf}
								onChange={formikProps.handleChange}
								placeholder="XXX.XXX.XXX-XX"
								className="text-black"
								variant="form"
								required
								helperText="Insira somente números."
								type="number"
							/>
							<Input
								label="RG"
								name="personalInformation.identification.rg"
								value={formikProps?.values?.personalInformation?.identification?.rg}
								onChange={formikProps.handleChange}
								placeholder="XX.XXX.XXX-X"
								className="text-black"
								variant="form"
								required
								helperText="Insira somente números."
								type="number"
							/>
							<Input
								label="Data de Nascimento"
								name="personalInformation.identification.birthDate"
								value={formikProps?.values?.personalInformation?.identification?.birthDate}
								onChange={formikProps.handleChange}
								placeholder="XXX.XXX.XXX-XX"
								className="text-black"
								variant="form"
								type="date"
								helperText="Necessário ter ao menos 21 anos."
								required
							/>
							<Input
								label="Celular"
								name="personalInformation.identification.phone"
								value={formikProps?.values?.personalInformation?.identification?.phone}
								onChange={formikProps.handleChange}
								placeholder="(XX)XXXXX-XXXX"
								className="text-black"
								variant="form"
								type="number"
								required
								helperText="Insira somente números."
							/>
							<Input
								label="Telefone fixo"
								name="personalInformation.identification.landline"
								value={formikProps?.values?.personalInformation?.identification?.landline}
								onChange={formikProps.handleChange}
								placeholder="(XX)XXXX-XXXX"
								className="text-black"
								variant="form"
								type="number"
								helperText="Insira somente números."
							/>
							<Input
								label="E-mail"
								name="personalInformation.identification.email"
								value={formikProps?.values?.personalInformation?.identification?.email}
								onChange={formikProps.handleChange}
								placeholder="email@email.com"
								className="text-black"
								variant="form"
								type="email"
								required
							/>
						</div>

						<p className="font-black font-Roboto text-xl text-primary mb-3 pt-11">Endereço</p>
						<div className="grid gap-7">
							<Input
								label="CEP"
								name="personalInformation.address.zipcode"
								value={formikProps?.values?.personalInformation?.address?.zipcode}
								onChange={formikProps.handleChange}
								placeholder="00000-000"
								className="text-black"
								variant="form"
								required
								helperText="Insira somente números."
								type="number"
							/>
							<Input
								label="Rua"
								name="personalInformation.address.street"
								value={formikProps?.values?.personalInformation?.address?.street}
								onChange={formikProps.handleChange}
								placeholder="Rua Alvarenga"
								className="text-black"
								variant="form"
								required
							/>
							<Input
								label="Número"
								name="personalInformation.address.number"
								value={formikProps?.values?.personalInformation?.address?.number}
								onChange={formikProps.handleChange}
								placeholder="1234"
								className="text-black"
								variant="form"
								required
								helperText="Insira somente números."
								type="number"
							/>
							<Input
								label="Complemento"
								name="personalInformation.address.complement"
								value={formikProps?.values?.personalInformation?.address?.complement}
								onChange={formikProps.handleChange}
								placeholder="Apartamento 12A"
								className="text-black"
								variant="form"
							/>
							<Input
								label="Bairro"
								name="personalInformation.address.neighborhood"
								value={formikProps?.values?.personalInformation?.address?.neighborhood}
								onChange={formikProps.handleChange}
								placeholder="Butatã"
								className="text-black"
								variant="form"
								required
							/>
						</div>
					</div>
				);
			case 2:
				return (
					<>
						<div>
							<p className="font-black font-Roboto text-xl text-primary mb-5">Ocupação</p>
							<div className="grid gap-7">
								<Input
									label="Profissão"
									name="socioeconomicProfile.occupation.profession"
									value={formikProps?.values?.socioeconomicProfile?.occupation?.profession}
									onChange={formikProps.handleChange}
									placeholder="ex: Professor"
									className="text-black"
									variant="form"
									required
								/>
								<div className="flex flex-col">
									<label className="font-Roboto text-base text-black">
										Ocupação<label className="text-error"> *</label>
									</label>
									<Checkbox
										label="Trabalha"
										id="socioeconomicProfile.occupation.occupation.working"
										isChecked={formikProps?.values?.socioeconomicProfile?.occupation?.occupation?.working}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Estuda"
										id="socioeconomicProfile.occupation.occupation.studying"
										isChecked={formikProps?.values?.socioeconomicProfile?.occupation?.occupation?.studying}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Desempregado"
										id="socioeconomicProfile.occupation.occupation.unemployed"
										isChecked={formikProps?.values?.socioeconomicProfile?.occupation?.occupation?.unemployed}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label={`Outro ${formikProps.values?.socioeconomicProfile?.occupation?.occupation?.other ? "(Descreva abaixo)": ""}`}
										id="socioeconomicProfile.occupation.occupation.other"
										isChecked={formikProps?.values?.socioeconomicProfile?.occupation?.occupation?.other}
										onChange={formikProps.handleChange}
									/>
									{formikProps.values?.socioeconomicProfile?.occupation?.occupation?.other && (
										<Input
											name="socioeconomicProfile.occupation.occupation.otherDescription"
											value={formikProps?.values?.socioeconomicProfile?.occupation?.occupation.otherDescription}
											onChange={formikProps.handleChange}
											placeholder="ex: voluntário"
											className="text-black"
											variant="form"
											required
										/>
									)}
								</div>
								<div className="flex flex-col">
									<label className="font-Roboto text-base text-black">
										Renda<label className="text-error"> *</label>
									</label>
									<RadioButton
										label="Fixa"
										id="socioeconomicProfile.occupation.rent"
										isSelected={formikProps?.values?.socioeconomicProfile?.occupation?.rent === "fixed"}
										onChange={() => formikProps.setFieldValue("socioeconomicProfile.occupation.rent", "fixed")}
									/>
									<RadioButton
										label="Variável"
										id="socioeconomicProfile.occupation.rent"
										isSelected={formikProps?.values?.socioeconomicProfile?.occupation?.rent === "variable"}
										onChange={() => formikProps.setFieldValue("socioeconomicProfile.occupation.rent", "variable")}
									/>
									<RadioButton
										label="Não possui"
										id="socioeconomicProfile.occupation.rent"
										isSelected={formikProps?.values?.socioeconomicProfile?.occupation?.rent === "doesNotHave"}
										onChange={() => formikProps.setFieldValue("socioeconomicProfile.occupation.rent", "doesNotHave")}
									/>
								</div>
							</div>
						</div>
						<div className="mt-11">
							<p className="font-black font-Roboto text-xl text-primary mb-5">Residência</p>
							<div className="grid gap-7">
								<div className="flex flex-col">
									<label className="font-Roboto text-base text-black">
										Tipo<label className="text-error"> *</label>
									</label>
									<Checkbox
										label="Casa"
										id="socioeconomicProfile.residence.type.house"
										isChecked={formikProps?.values?.socioeconomicProfile?.residence?.type?.house}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Apartamento"
										id="socioeconomicProfile.residence.type.apartment"
										isChecked={formikProps?.values?.socioeconomicProfile?.residence?.type?.apartment}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Sítio"
										id="socioeconomicProfile.residence.type.grange"
										isChecked={formikProps?.values?.socioeconomicProfile?.residence?.type?.grange}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Outro"
										id="socioeconomicProfile.residence.type.other"
										isChecked={formikProps?.values?.socioeconomicProfile?.residence?.type?.other}
										onChange={formikProps.handleChange}
									/>
									{formikProps?.values?.socioeconomicProfile?.residence?.type?.other && (
										<Input
											name="socioeconomicProfile.residence.type.otherDescription"
											value={formikProps?.values?.socioeconomicProfile?.residence?.type?.otherDescription}
											onChange={formikProps.handleChange}
											placeholder="ex: fazenda"
											className="text-black"
											variant="form"
											required
										/>
									)}
								</div>
								<div className="flex flex-col">
									<label className="font-Roboto text-base text-black">
										Situação da residência<label className="text-error"> *</label>
									</label>
									<Checkbox
										label="Própria"
										id="socioeconomicProfile.residence.own"
										isChecked={formikProps?.values?.socioeconomicProfile?.residence?.own}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Alugada"
										id="socioeconomicProfile.residence.rent"
										isChecked={formikProps?.values?.socioeconomicProfile?.residence?.rent}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Herdada"
										id="socioeconomicProfile.residence.inherited"
										isChecked={formikProps?.values?.socioeconomicProfile?.residence?.inherited}
										onChange={formikProps.handleChange}
									/>
								</div>
							</div>
						</div>
					</>
				);
			default:
				return null;
		}
	};

	return (
	<>
		<HeaderGroup
			className="fixed z-10"
		/>
		<div className="flex flex-col justify-center items-center pt-20">
			<div className="border-b border-solid border-1 border-gray-400 pb-9">
				<div className="flex flex-col items-center justify-center pt-9 mx-10">
					<p className="font-black font-Roboto text-2xl text-primary text-center mb-3">{stepTitle[step]}</p>
					<p className="font-Roboto text-sm text-gray-700 text-center">Este formulário serve para o controle de identificação e adoções dos animais resgatados da ONG Anjos na Terra em Ação.</p>
				</div>
			</div>
			<Formik<FormData>
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(formikProps: FormikProps<FormData>) => (
					<Form className="w-full px-10 py-11">
						{renderStep(formikProps)}
						<div className="grid grid-cols-2 gap-4 pt-11">
							{step > 1 && (
								<Button
									label="Anterior"
									variant="outline"
									type="button"
									onClick={prevStep}
									className="mr-4"
								/>
							)}
							<Button
								label="Próxima"
								variant="outline"
								type="button"
								disabled={Object.keys(formikProps.errors[schemaTitle[step]] || {}).length > 0}
								onClick={() => formikProps.validateForm().then(() => nextStep(formikProps))}
							/>
						</div>
					</Form>
				)}
        	</Formik>
		</div>
	</>
	);
}
