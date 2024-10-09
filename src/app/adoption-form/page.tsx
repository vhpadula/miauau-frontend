"use client";
import {
    HeaderGroup,
	Button,
	Input,
	Checkbox,
	RadioButton,
	YesNoRadioButton
} from "@/components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikProps } from "formik";
import { FormData } from "./types";
import * as Yup from "yup";

const defaultError = 'Preenchimento obrigatório';

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
						return Yup.string().required('Descrição necessária se "outro" estiver selecionado')
					} 
					return Yup.string().nullable()
				}),
			}),
			rent: Yup.string().required(defaultError),
			}),
			residence: Yup.object({
			type: Yup.object({
				house: Yup.boolean(),
				apartment: Yup.boolean(),
				grange: Yup.boolean(),
				other: Yup.boolean(),
				otherDescription: Yup.string().when('other', (other) => {
					if (other && other[0]) {
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
		housingDetails: Yup.object().shape({
			generalCharacteristics: Yup.object().shape({
				pool: Yup.boolean().required(defaultError),
				poolWithProtection: Yup.string().when('pool', (pool) => {
					if (pool && pool[0]) {
						return Yup.string().required(defaultError)
					} 
					return Yup.string().nullable()
				}),
				fence: Yup.boolean(),
				wall: Yup.boolean(),
				windowsWithScreen: Yup.boolean(),
				balconyWithScreen: Yup.boolean(),
				willInstallScreens: Yup.boolean().when(['windowsWithScreen', 'balconyWithScreen'], (items) => {
					if (items.length== 2 && (!items[0] || !items[1])) {
						return Yup.string().required(defaultError)
					} 
					return Yup.string().nullable()
				}),
				yard: Yup.string().required(defaultError),
				safeHouse: Yup.boolean().required(defaultError),
				flightRisk: Yup.boolean().required(defaultError),
				condominiumRestriction: Yup.string().required(defaultError),
			}),
		}),
		coexistence: Yup.object().shape({
			generalCharacteristics: Yup.object().shape({
				animalWillStay: Yup.string().required(defaultError),
				possibilityOfMoving: Yup.string().required(defaultError),
				livesAlone: Yup.boolean().required(defaultError),
				livesWithWho: Yup.string().when('livesAlone', (livesAlone) => {
					if (livesAlone && !livesAlone[0]) {
						return Yup.string().required(defaultError)
					} 
					return Yup.string().nullable()
				}),
				amountOfChildrenInTheHouse: Yup.string().when('livesAlone', (livesAlone) => {
					if (livesAlone && !livesAlone[0]) {
						return Yup.number().required(defaultError)
					} 
					return Yup.number().nullable()
				}),
				childrensAge: Yup.string().when('amountOfChildrenInTheHouse', (amountOfChildrenInTheHouse) => {
					if (amountOfChildrenInTheHouse && amountOfChildrenInTheHouse[0] != 0) {
						return Yup.string().required(defaultError)
					} 
					return Yup.string().nullable()
				}),
				alergicResidents: Yup.boolean().required(defaultError),
				whatHappensInCaseOfAlergies: Yup.string().when('alergicResidents', (alergicResidents) => {
					if (alergicResidents && alergicResidents[0]) {
						return Yup.string().required(defaultError)
					} 
					return Yup.string().nullable()
				}),
				allResidentsAgree: Yup.boolean().required(defaultError),
				hasOtherAnimals: Yup.boolean().required(defaultError),
				numberOfAnimalsCurrently: Yup.string().when('hasOtherAnimals', (hasOtherAnimals) => {
					if (hasOtherAnimals && hasOtherAnimals[0]) {
						return Yup.number().required(defaultError)
					} 
					return Yup.number().nullable()
				}),
				castrated: Yup.string().when('hasOtherAnimals', (hasOtherAnimals) => {
					if (hasOtherAnimals && hasOtherAnimals[0]) {
						return Yup.boolean().required(defaultError)
					} 
					return Yup.boolean().nullable()
				}),
			}),
		}),
		animals: Yup.object().shape({
			previous: Yup.object().shape({
				hadAnimalsBefore: Yup.boolean().required(defaultError),
				whatHappenedToLastAnimal: Yup.string().when('hadAnimalsBefore', (hadAnimalsBefore) => {
					if (hadAnimalsBefore && hadAnimalsBefore[0]) {
						return Yup.string().required(defaultError)
					} 
					return Yup.string().nullable()
				}),
				dateOfOccurrence: Yup.string().when('hadAnimalsBefore', (hadAnimalsBefore) => {
					if (hadAnimalsBefore && hadAnimalsBefore[0]) {
						return Yup.string().required(defaultError)
					} 
					return Yup.string().nullable()
				}),
			}),
			adoptionMotivation: Yup.string().required(defaultError),
			adoptionMotivationDescription: Yup.string().when('adoptionMotivation', (adoptionMotivation) => {
				if (adoptionMotivation && adoptionMotivation[0]) {
					return Yup.string().required(defaultError)
				} 
				return Yup.string().nullable()
			}),
			animalsOfInterest: Yup.object().shape({
				cat: Yup.boolean(),
				dog: Yup.boolean()
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
					working: undefined,
					studying: undefined,
					unemployed: undefined,
					other: undefined,
					otherDescription: ""
				},
				rent: ""
			},
			residence: {
				type: {
					house: undefined,
					apartment: undefined,
					grange: undefined,
					other: undefined,
					otherDescription: ""
				},
				own: undefined,
				rent: undefined,
				inherited: undefined
			}
		},
		housingDetails: {
			generalCharacteristics: {
				pool: undefined,
				poolWithProtection: undefined,
				fence: undefined,
				wall: undefined,
				windowsWithScreen: undefined,
				balconyWithScreen: undefined,
				willInstallScreens: undefined,
				yard: "",
				safeHouse: undefined,
				flightRisk: undefined,
				condominiumRestriction: ""
			}
		},
		coexistence: {
			generalCharacteristics: {
				animalWillStay: "",
				possibilityOfMoving: "",
				livesAlone: undefined,
				livesWithWho: "",
				amountOfChildrenInTheHouse: 0,
				childrensAge: "",
				alergicResidents: undefined,
				whatHappensInCaseOfAlergies: "",
				allResidentsAgree: undefined,
				hasOtherAnimals: undefined,
				numberOfAnimalsCurrently: 0,
				castrated: undefined
			}
		},
		animals: {
			previous: {
				hadAnimalsBefore: undefined,
				whatHappenedToLastAnimal: "",
				dateOfOccurrence: ""
			},
			adoptionMotivation: "",
			adoptionMotivationDescription: "",
			animalsOfInterest: {
				cat: undefined,
				dog: undefined
			}
		},
		interest: {
			dog: {
				sex: {
					female: undefined,
					male: undefined
				},
				size: {
					small: undefined,
					medium: undefined,
					big: undefined
				},
				ageGroup: {
					puppy: undefined,
					adult: undefined,
					elderly: undefined
				}
			},
			cat: {
				sex: {
					female: undefined,
					male: undefined
				},
				size: {
					small: undefined,
					medium: undefined,
					big: undefined
				},
				ageGroup: {
					puppy: undefined,
					adult: undefined,
					elderly: undefined
				}
			}
		},
		dailyCare: {
			responsibleForCare: "",
			responsibleForCareInCaseOfTravel: "",
			howWillEducate: "",
			hasPetCarrier: undefined,
			dailyWalks: 0,
			timeAlone: {
				oneToThreeHours: undefined,
				threeToSevenHours: undefined,
				eightOrMoreHours: undefined
			},
			foodType: {
				animal: undefined,
				human: undefined,
				other: undefined,
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
			certaintyOfAdoption: undefined,
			awareOfTheImportanceOfNeuteringTheAnimal: undefined,
			agreesWithCastration: undefined,
			longTermCommitment: undefined,
			imageUse: undefined,
			monetaryContribution: undefined,
			houseVisit: undefined,
			notifyBeforeDonateToSomeoneElse: undefined,
			trueInformation: undefined,
			videoPresentation: undefined
		}
	}

	const scrollToTop = () => {
		window.scrollTo({
		  top: 0,
		  behavior: 'smooth',
		});
	  };

	const nextStep = (formikProps: FormikProps<FormData>) => {
		console.log(formikProps);
		scrollToTop();
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
			case 3:
				return (
					<div>
						<p className="font-black font-Roboto text-xl text-primary mb-3">Características gerais</p>
						<div className="grid gap-7">
								<div className="flex flex-col space-y-7">
									<YesNoRadioButton
										value={formikProps.values.housingDetails.generalCharacteristics.pool}
										onChange={(value) => formikProps.setFieldValue("housingDetails.generalCharacteristics.pool", value)}
										label={"Possui piscina?"}
										required									
									/>
									{formikProps.values.housingDetails.generalCharacteristics.pool && (
										<YesNoRadioButton
											value={formikProps.values.housingDetails.generalCharacteristics.poolWithProtection}
											onChange={(value) => formikProps.setFieldValue("housingDetails.generalCharacteristics.poolWithProtection", value)}
											label={"Piscina possui proteção?"}
											required									
										/>	
									)}
								</div>
								<div className="flex flex-col">
									<label className="font-Roboto text-base text-black">
										Há restrição do comdomínio/proprietário sobre ter animais?<label className="text-error"> *</label>
									</label>
									<RadioButton
										label="Sim"
										id="housingDetails.generalCharacteristics.condominiumRestriction"
										isSelected={formikProps?.values?.housingDetails?.generalCharacteristics?.condominiumRestriction === "yes"}
										onChange={() => formikProps.setFieldValue("housingDetails.generalCharacteristics.condominiumRestriction", "yes")}
									/>
									<RadioButton
										label="Não"
										id="housingDetails.generalCharacteristics.condominiumRestriction"
										isSelected={formikProps?.values?.housingDetails?.generalCharacteristics?.condominiumRestriction === "no"}
										onChange={() => formikProps.setFieldValue("housingDetails.generalCharacteristics.condominiumRestriction", "no")}
									/>
									<RadioButton
										label="Não sei"
										id="housingDetails.generalCharacteristics.condominiumRestriction"
										isSelected={formikProps?.values?.housingDetails?.generalCharacteristics?.condominiumRestriction === "dontKnow"}
										onChange={() => formikProps.setFieldValue("housingDetails.generalCharacteristics.condominiumRestriction", "dontKnow")}
									/>
								</div>
								<div className="flex flex-col">
									<label className="font-Roboto text-base text-black">
										Possui quintal?<label className="text-error"> *</label>
									</label>
									<RadioButton
										label="Não"
										id="housingDetails.generalCharacteristics.yard"
										isSelected={formikProps?.values?.housingDetails?.generalCharacteristics?.yard === "no"}
										onChange={() => formikProps.setFieldValue("housingDetails.generalCharacteristics.yard", "no")}
									/>
									<RadioButton
										label="Sim,  pequeno"
										id="housingDetails.generalCharacteristics.yard"
										isSelected={formikProps?.values?.housingDetails?.generalCharacteristics?.yard === "small"}
										onChange={() => formikProps.setFieldValue("housingDetails.generalCharacteristics.yard", "small")}
									/>
									<RadioButton
										label="Sim, grande"
										id="housingDetails.generalCharacteristics.yard"
										isSelected={formikProps?.values?.housingDetails?.generalCharacteristics?.yard === "big"}
										onChange={() => formikProps.setFieldValue("housingDetails.generalCharacteristics.yard", "big")}
									/>
								</div>
								<div className="flex flex-col">
									<label className="font-Roboto text-base text-black">
										Elementos de proteção<label className="text-error"> *</label>
									</label>
									<Checkbox
										label="Cerca em frente à residência"
										id="housingDetails.generalCharacteristics.fence"
										isChecked={formikProps?.values?.housingDetails?.generalCharacteristics?.fence}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Muro em frente à residência"
										id="housingDetails.generalCharacteristics.wall"
										isChecked={formikProps?.values?.housingDetails?.generalCharacteristics?.wall}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Janelas com tela"
										id="housingDetails.generalCharacteristics.windowsWithScreen"
										isChecked={formikProps?.values?.housingDetails?.generalCharacteristics?.windowsWithScreen}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Sacada com tela"
										id="housingDetails.generalCharacteristics.balconyWithScreen"
										isChecked={formikProps?.values?.housingDetails?.generalCharacteristics?.balconyWithScreen}
										onChange={formikProps.handleChange}
									/>
								</div>
								{(!formikProps.values?.housingDetails?.generalCharacteristics?.windowsWithScreen
									|| !formikProps.values?.housingDetails?.generalCharacteristics?.balconyWithScreen
								) && (
									<YesNoRadioButton
										value={formikProps.values?.housingDetails?.generalCharacteristics?.willInstallScreens}
										onChange={(value) => formikProps.setFieldValue("housingDetails.generalCharacteristics.willInstallScreens", value)}
										label={"Não havendo tela nas janelas ou sacada, concorda em telar antes da adoção?"}
										required									
									/>	
								)}
								<YesNoRadioButton
									value={formikProps.values?.housingDetails?.generalCharacteristics?.safeHouse}
									onChange={(value) => formikProps.setFieldValue("housingDetails.generalCharacteristics.safeHouse", value)}
									label={"Sua casa oferece segurança para o animal?"}
									required									
								/>	
								<YesNoRadioButton
									value={formikProps.values?.housingDetails?.generalCharacteristics?.flightRisk}
									onChange={(value) => formikProps.setFieldValue("housingDetails.generalCharacteristics.flightRisk", value)}
									label={"Há risco de fuga?"}
									required									
								/>	
						</div>
					</div>
				);
			case 4:
				return (
					<div>
						<p className="font-black font-Roboto text-xl text-primary mb-3">Características gerais</p>
						<div className="grid gap-7">
								<div className="flex flex-col">
									<label className="font-Roboto text-base text-black">
										Onde o animal ficará?<label className="text-error"> *</label>
									</label>
									<RadioButton
										label="Dentro de casa"
										id="coexistence.generalCharacteristics.animalWillStay"
										isSelected={formikProps?.values?.coexistence?.generalCharacteristics?.animalWillStay === "inside"}
										onChange={() => formikProps.setFieldValue("coexistence.generalCharacteristics.animalWillStay", "inside")}
									/>
									<RadioButton
										label="Do lado de fora"
										id="coexistence.generalCharacteristics.animalWillStay"
										isSelected={formikProps?.values?.coexistence?.generalCharacteristics?.animalWillStay === "outside"}
										onChange={() => formikProps.setFieldValue("coexistence.generalCharacteristics.animalWillStay", "outside")}
									/>
								</div>
								<div className="flex flex-col">
									<label className="font-Roboto text-base text-black">
									Se morar em CASA, há a possibilidade de você mudar para apartamento?<label className="text-error"> *</label>
									</label>
									<RadioButton
										label="Sim"
										id="coexistence.generalCharacteristics.possibilityOfMoving"
										isSelected={formikProps?.values?.coexistence?.generalCharacteristics?.possibilityOfMoving === "yes"}
										onChange={() => formikProps.setFieldValue("coexistence.generalCharacteristics.possibilityOfMoving", "yes")}
									/>
									<RadioButton
										label="Não"
										id="coexistence.generalCharacteristics.possibilityOfMoving"
										isSelected={formikProps?.values?.coexistence?.generalCharacteristics?.possibilityOfMoving === "no"}
										onChange={() => formikProps.setFieldValue("coexistence.generalCharacteristics.possibilityOfMoving", "no")}
									/>
									<RadioButton
										label="Talvez"
										id="coexistence.generalCharacteristics.possibilityOfMoving"
										isSelected={formikProps?.values?.coexistence?.generalCharacteristics?.possibilityOfMoving === "maybe"}
										onChange={() => formikProps.setFieldValue("coexistence.generalCharacteristics.possibilityOfMoving", "maybe")}
									/>
								</div>
								<YesNoRadioButton
									value={formikProps?.values?.coexistence?.generalCharacteristics?.livesAlone}
									onChange={(value) => formikProps.setFieldValue("coexistence.generalCharacteristics.livesAlone", value)}
									label={"Você mora sozinho?"}
									required									
								/>	
								{!formikProps?.values?.coexistence?.generalCharacteristics?.livesAlone && (
									<div className="flex flex-col space-y-7">
										<Input
											label="Com quem mora?"
											name="coexistence.generalCharacteristics.livesWithWho"
											value={formikProps?.values?.coexistence?.generalCharacteristics?.livesWithWho}
											onChange={formikProps.handleChange}
											placeholder="ex: pai, mãe, filhos, sobrinhos, etc"
											className="text-black h-20 break-words resize-none text-left align-top overflow-y-auto"
											variant="form"
											type="textarea"
											required
										/>
										<Input
											label="Quantidade de crianças na casa"
											name="coexistence.generalCharacteristics.amountOfChildrenInTheHouse"
											value={formikProps?.values?.coexistence?.generalCharacteristics?.amountOfChildrenInTheHouse}
											onChange={formikProps.handleChange}
											placeholder="ex: 3"
											className="text-black"
											variant="form"
											type="number"
											required
										/>
										{formikProps?.values?.coexistence?.generalCharacteristics?.amountOfChildrenInTheHouse != 0 && (
											<Input
												label="Idade das crianças"
												name="coexistence.generalCharacteristics.livesWithWho"
												value={formikProps?.values?.coexistence?.generalCharacteristics?.livesWithWho}
												onChange={formikProps.handleChange}
												placeholder="ex: 2, 4 e 7 anos"
												className="text-black"
												variant="form"
												required
											/>
										)}
									</div>
								)}
								<YesNoRadioButton
									value={formikProps.values?.coexistence?.generalCharacteristics?.alergicResidents}
									onChange={(value) => formikProps.setFieldValue("coexistence.generalCharacteristics.alergicResidents", value)}
									label={"Alguém na sua casa é alérgico a animais?"}
									required									
								/>	
								{formikProps.values?.coexistence?.generalCharacteristics?.alergicResidents && (
									<Input
										label="Como lidará com a alergia?"
										name="coexistence.generalCharacteristics.whatHappensInCaseOfAlergies"
										value={formikProps?.values?.coexistence?.generalCharacteristics?.whatHappensInCaseOfAlergies}
										onChange={formikProps.handleChange}
										className="text-black"
										variant="form"
										type="textarea"
										required
									/>
								)}
								<YesNoRadioButton
									value={formikProps.values?.coexistence?.generalCharacteristics?.allResidentsAgree}
									onChange={(value) => formikProps.setFieldValue("coexistence.generalCharacteristics.allResidentsAgree", value)}
									label={"Todos na residência concordam com a adoção?"}
									required									
								/>	
								<YesNoRadioButton
									value={formikProps.values?.coexistence?.generalCharacteristics?.hasOtherAnimals}
									onChange={(value) => formikProps.setFieldValue("coexistence.generalCharacteristics.hasOtherAnimals", value)}
									label={"Há outros animais na casa?"}
									required									
								/>	
								{formikProps.values?.coexistence?.generalCharacteristics?.hasOtherAnimals && (
									<div className="flex flex-col space-y-7">
										<Input
											label="Quantidade de animais na casa"
											name="coexistence.generalCharacteristics.numberOfAnimalsCurrently"
											value={formikProps?.values?.coexistence?.generalCharacteristics?.numberOfAnimalsCurrently}
											onChange={formikProps.handleChange}
											placeholder="ex: 3"
											className="text-black"
											variant="form"
											type="number"
											required
										/>
										<YesNoRadioButton
											value={formikProps.values?.coexistence?.generalCharacteristics?.castrated}
											onChange={(value) => formikProps.setFieldValue("coexistence.generalCharacteristics.castrated", value)}
											label={"Todos os animais estão castrados?"}
											required									
										/>	
									</div>
								)}
						</div>
					</div>
				);
			case 5:
				return (
					<div>
						<p className="font-black font-Roboto text-xl text-primary mb-3">Animais anteriores</p>
						<div className="grid gap-7">
							<YesNoRadioButton
								value={formikProps?.values?.animals?.previous?.hadAnimalsBefore}
								onChange={(value) => formikProps.setFieldValue("animals.previous.hadAnimalsBefore", value)}
								label={"Já teve algum outro animal antes?"}
								helperText="Responda 'sim' se você já teve algum animal que não tem mais por qualquer motivo."
								required									
							/>	
							{formikProps?.values?.animals?.previous?.hadAnimalsBefore && (
								<div className="flex flex-col">
								<label className="font-Roboto text-base text-black">
									O que aconteceu com o último animal que você teve?<label className="text-error"> *</label>
								</label>
								<RadioButton
									label="Morreu por velhice"
									id="animals.previous.whatHappenedToLastAnimal"
									isSelected={formikProps?.values?.animals?.previous?.whatHappenedToLastAnimal === "diedOfOldAge"}
									onChange={() => formikProps.setFieldValue("animals.previous.whatHappenedToLastAnimal", "diedOfOldAge")}
								/>
								<RadioButton
									label="Atropelado"
									id="animals.previous.whatHappenedToLastAnimal"
									isSelected={formikProps?.values?.animals?.previous?.whatHappenedToLastAnimal === "ranOver"}
									onChange={() => formikProps.setFieldValue("animals.previous.whatHappenedToLastAnimal", "ranOver")}
								/>
								<RadioButton
									label="Fugiu"
									id="animals.previous.whatHappenedToLastAnimal"
									isSelected={formikProps?.values?.animals?.previous?.whatHappenedToLastAnimal === "ranAway"}
									onChange={() => formikProps.setFieldValue("animals.previous.whatHappenedToLastAnimal", "ranAway")}
								/>
								<RadioButton
									label="Morreu por acidente"
									id="animals.previous.whatHappenedToLastAnimal"
									isSelected={formikProps?.values?.animals?.previous?.whatHappenedToLastAnimal === "diedByAccident"}
									onChange={() => formikProps.setFieldValue("animals.previous.whatHappenedToLastAnimal", "diedByAccident")}
								/>
								<RadioButton
									label="Sumiu"
									id="animals.previous.whatHappenedToLastAnimal"
									isSelected={formikProps?.values?.animals?.previous?.whatHappenedToLastAnimal === "disappeared"}
									onChange={() => formikProps.setFieldValue("animals.previous.whatHappenedToLastAnimal", "disappeared")}
								/>
								<RadioButton
									label="Doado para outra pessoa"
									id="animals.previous.whatHappenedToLastAnimal"
									isSelected={formikProps?.values?.animals?.previous?.whatHappenedToLastAnimal === "donatedToSomeone"}
									onChange={() => formikProps.setFieldValue("animals.previous.whatHappenedToLastAnimal", "donatedToSomeone")}
								/>
								<RadioButton
									label="Roubado"
									id="animals.previous.whatHappenedToLastAnimal"
									isSelected={formikProps?.values?.animals?.previous?.whatHappenedToLastAnimal === "stolen"}
									onChange={() => formikProps.setFieldValue("animals.previous.whatHappenedToLastAnimal", "stolen")}
								/>
								<RadioButton
									label="Morreu por doença"
									id="animals.previous.whatHappenedToLastAnimal"
									isSelected={formikProps?.values?.animals?.previous?.whatHappenedToLastAnimal === "diedFromIllness"}
									onChange={() => formikProps.setFieldValue("animals.previous.whatHappenedToLastAnimal", "diedFromIllness")}
								/>
								<div className="mt-7">
									<Input
										label="Data da ocorrência"
										name="animals.previous.dateOfOccurrence"
										value={formikProps?.values?.animals?.previous?.dateOfOccurrence}
										onChange={formikProps.handleChange}
										className="text-black"
										variant="form"
										type="date"
										helperText="Informe uma data aproximada."
										required
									/>
								</div>
							</div>)}
						</div>
						<p className="font-black font-Roboto text-xl text-primary mb-3 mt-11">Motivação da adoção</p>
						<div className="grid gap-7">
							<div className="flex flex-col">
								<label className="font-Roboto text-base text-black">
									Por que quer adotar um animal?<label className="text-error"> *</label>
								</label>
								<RadioButton
									label="Compania"
									id="animals.adoptionMotivation"
									isSelected={formikProps?.values?.animals?.adoptionMotivation === "company"}
									onChange={() => formikProps.setFieldValue("animals.adoptionMotivation", "company")}
								/>
								<RadioButton
									label="Guarda/vigia"
									id="animals.adoptionMotivation"
									isSelected={formikProps?.values?.animals?.adoptionMotivation === "guard_and_lookout"}
									onChange={() => formikProps.setFieldValue("animals.adoptionMotivation", "guard_and_lookout")}
								/>
								<RadioButton
									label="Presentear alguém"
									id="animals.adoptionMotivation"
									isSelected={formikProps?.values?.animals?.adoptionMotivation === "gift_someone"}
									onChange={() => formikProps.setFieldValue("animals.adoptionMotivation", "gift_someone")}
								/>
								<RadioButton
									label="Outro"
									id="animals.adoptionMotivation"
									isSelected={formikProps?.values?.animals?.adoptionMotivation === "other"}
									onChange={() => formikProps.setFieldValue("animals.adoptionMotivation", "other")}
								/>
								{formikProps?.values?.animals?.adoptionMotivation === "other" && (
									<Input
										name="animals.adoptionMotivationDescription"
										value={formikProps?.values?.animals?.adoptionMotivationDescription}
										onChange={formikProps.handleChange}
										placeholder="descreva aqui a sua motivação"
										className="text-black"
										variant="form"
										required
									/>
								)}
							</div>
						</div>
						<p className="font-black font-Roboto text-xl text-primary mt-11">Animais de interesse</p>
						<p className="text-sm text-gray-700 mb-3">Selecione todas as opções do seu interesse</p>
							<div className="flex flex-col">
								<label className="font-Roboto text-base text-black">
									Animais que deseja adotar<label className="text-error"> *</label>
								</label>
								<Checkbox
									label="Gato"
									id="animals.animalsOfInterest.cat"
									isChecked={formikProps?.values?.animals?.animalsOfInterest?.cat}
									onChange={formikProps.handleChange}
								/>
								<Checkbox
									label="Cachorro"
									id="animals.animalsOfInterest.dog"
									isChecked={formikProps?.values?.animals?.animalsOfInterest?.dog}
									onChange={formikProps.handleChange}
								/>
							</div>
					</div>
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
