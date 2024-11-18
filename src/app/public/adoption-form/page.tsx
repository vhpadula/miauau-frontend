"use client";
import {
	Button,
	Input,
	Checkbox,
	RadioButton,
	YesNoRadioButton,
	ComboBox
} from "@/components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikProps } from "formik";
import { FormData } from "./types";
import { get, post } from "@/services/baseServices";
import * as Yup from "yup";
import { IAnimalSimple, IOng } from "@/types";

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
				type: Yup.string().required(defaultError),
				otherDescription: Yup.string().when('type', (type) => {
					if (type && type[0] === "other") {
						return Yup.string().required('Descrição necessária se "outro" estiver selecionado')
					} 
					return Yup.string().nullable()
				}),
				situation: Yup.string().required(defaultError),
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
				allergicResidents: Yup.boolean().required(defaultError),
				whatHappensInCaseOfAllergies: Yup.string().when('allergicResidents', (allergicResidents) => {
					if (allergicResidents && allergicResidents[0]) {
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
				if (adoptionMotivation && adoptionMotivation[0]=='other') {
					return Yup.string().required(defaultError)
				} 
				return Yup.string().nullable()
			}),
			wantSpecificAnimal: Yup.boolean().required(defaultError),
			specificAnimal: Yup.string().when('wantSpecificAnimal', (wantSpecificAnimal) => {
				if (wantSpecificAnimal && wantSpecificAnimal[0]) {
					return Yup.string().required(defaultError)
				} 
				return Yup.string().nullable()
			}),
			animalsOfInterest: Yup.object().shape({
				cat: Yup.boolean(),
				dog: Yup.boolean()
			}),
		}),
		dailyCare: Yup.object().shape({
			responsibleForCare: Yup.string().required(),
			responsibleForCareInCaseOfTravel: Yup.string().required(),
			howWillEducate: Yup.string().required(),
			timeAlone: Yup.string().required(),
			foodType: Yup.string().required(defaultError)
		}),
		attitudesTowardsTheAnimal: Yup.object().shape({
			getsLost: Yup.string().required(),
			getsSickOrAccident: Yup.string().required(),
			hurtsYourChild: Yup.string().required(),
			damagesValuableObject: Yup.string().required(),
			peesOrPoopsInInappropriatePlace: Yup.string().required(),
			doesThingsYouDontWant: Yup.string().required(),
			ifYouHaveAChild: Yup.string().required()
		}),
		agreements: Yup.object().shape({
			certaintyOfAdoption: Yup.boolean().required(),
			awareOfTheImportanceOfNeuteringTheAnimal: Yup.boolean().required(),
			agreesWithCastration: Yup.boolean().required(),
			longTermCommitment: Yup.boolean().required(),
			imageUse: Yup.boolean().required(),
			monetaryContribution: Yup.boolean().required(),
			notifyBeforeDonateToSomeoneElse: Yup.boolean().required(),
			houseVisit: Yup.boolean().required(),
			trueInformation: Yup.boolean().required(),
			videoPresentation: Yup.boolean().required()
		}),
	});

export default function AdoptionForm() {
	const router = useRouter();
	
    const [ongs, setOngs] = useState<IOng[]>([]);
    const [ongId, setOngId] = useState("ongId1");
    const [animals, setAnimals] = useState<IAnimalSimple[]>([]);

    useEffect(() => {
        get(`/api/v1/managements/ongs`)
            .then((response) => {
                setOngs(response);
            })
            .catch((error) => {
                console.error("Failed to fetch ONGs:", error);
            });
    }, []);

    useEffect(() => {
        get(`/api/v1/animals/getNotAdoptedByOng/${ongId}`)
            .then((response) => {
                setAnimals(response);
            })
            .catch((error) => {
                console.error("Failed to fetch animals:", error);
            });
    }, [ongId]);
  
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
				type: "",
				otherDescription: "",
				situation: ""
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
				allergicResidents: undefined,
				whatHappensInCaseOfAllergies: "",
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
			wantSpecificAnimal: undefined,
			animalsOfInterest: {
				cat: undefined,
				dog: undefined
			},
			specificAnimal: ""
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
			timeAlone: "",
			foodType: ""
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
		if(step === 5 && formikProps.values?.animals?.specificAnimal) {
			setStep((prevStep) => prevStep + 2);
		} else {
			setStep((prevStep) => prevStep + 1);
		}
	};

	const prevStep = (formikProps: FormikProps<FormData>) => {
		if(step === 7 && formikProps.values?.animals?.specificAnimal) {
			setStep((prevStep) => prevStep - 2);
		} else {
			setStep((prevStep) => prevStep - 1);
		}
	};

	const handleSubmit = async (values: any) => {
		try {
			const response = await post('/api/v1/adoptions', values);
			console.log(response);
			// router.push('/public/animals');
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	useEffect(() => {
		scrollToTop();
	}, [step]);

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
									<RadioButton
										label="Casa"
										id="socioeconomicProfile.residence.type"
										isSelected={formikProps?.values?.socioeconomicProfile?.residence?.type === "house"}
										onChange={() => formikProps.setFieldValue("socioeconomicProfile.residence.type", "house")}
									/>
									<RadioButton
										label="Apartamento"
										id="socioeconomicProfile.residence.type"
										isSelected={formikProps?.values?.socioeconomicProfile?.residence?.type === "apartment"}
										onChange={() => formikProps.setFieldValue("socioeconomicProfile.residence.type", "apartment")}
									/>
									<RadioButton
										label="Sítio"
										id="socioeconomicProfile.residence.type"
										isSelected={formikProps?.values?.socioeconomicProfile?.residence?.type === "grange"}
										onChange={() => formikProps.setFieldValue("socioeconomicProfile.residence.type", "grange")}
									/>
									<RadioButton
										label="Outro"
										id="socioeconomicProfile.residence.type"
										isSelected={formikProps?.values?.socioeconomicProfile?.residence?.type === "other"}
										onChange={() => formikProps.setFieldValue("socioeconomicProfile.residence.type", "other")}
									/>
									{formikProps?.values?.socioeconomicProfile?.residence?.type === "other" && (
										<Input
											name="socioeconomicProfile.residence.otherDescription"
											value={formikProps?.values?.socioeconomicProfile?.residence?.otherDescription}
											onChange={formikProps.handleChange}
											placeholder="ex: fazenda"
											className="text-black mt-2"
											variant="form"
											required
										/>
									)}
								</div>
								<div className="flex flex-col">
									<label className="font-Roboto text-base text-black">
										Situação da residência<label className="text-error"> *</label>
									</label>
									<RadioButton
										label="Própria"
										id="socioeconomicProfile.residence.situation"
										isSelected={formikProps?.values?.socioeconomicProfile?.residence?.situation === "own"}
										onChange={() => formikProps.setFieldValue("socioeconomicProfile.residence.situation", "own")}
									/>
									<RadioButton
										label="Alugada"
										id="socioeconomicProfile.residence.situation"
										isSelected={formikProps?.values?.socioeconomicProfile?.residence?.situation === "rent"}
										onChange={() => formikProps.setFieldValue("socioeconomicProfile.residence.situation", "rent")}
									/>
									<RadioButton
										label="Herdada"
										id="socioeconomicProfile.residence.situation"
										isSelected={formikProps?.values?.socioeconomicProfile?.residence?.situation === "inherited"}
										onChange={() => formikProps.setFieldValue("socioeconomicProfile.residence.situation", "inherited")}
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
									value={formikProps.values?.coexistence?.generalCharacteristics?.allergicResidents}
									onChange={(value) => formikProps.setFieldValue("coexistence.generalCharacteristics.allergicResidents", value)}
									label={"Alguém na sua casa é alérgico a animais?"}
									required									
								/>	
								{formikProps.values?.coexistence?.generalCharacteristics?.allergicResidents && (
									<Input
										label="Como lidará com a alergia?"
										name="coexistence.generalCharacteristics.whatHappensInCaseOfAllergies"
										value={formikProps?.values?.coexistence?.generalCharacteristics?.whatHappensInCaseOfAllergies}
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
									label="Companhia"
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
						<YesNoRadioButton
							value={formikProps.values.animals.wantSpecificAnimal}
							onChange={(value) => formikProps.setFieldValue("animals.wantSpecificAnimal", value)}
							label={"Você deseja algum animal específico da ONG?"}
							required									
						/>
						{formikProps.values?.animals?.wantSpecificAnimal ? 
							(
								<div className="mt-7 grid gap-7">
									<ComboBox 
										label="Selecione a ONG que possui o animal desejado:"
										placeholder="Escolha uma ONG"
										options={ongs.map((ong) => ({ value: ong.Id, label: ong.name }))}
										value={ongId} 
										onChange={(value) => {
											setOngId(value);
											formikProps.setFieldValue("animals.specificAnimal", "")
										}}
										missingMessage="Nenhuma ONG encontrada"
										required
									/>
									<ComboBox 
										label="Selecione o animal desejado:"
										placeholder="Escolha um animal"
										options={animals.map((animal) => ({ value: animal.id, label: animal.name }))}
										value={formikProps?.values?.animals?.specificAnimal} 
										onChange={(value) => formikProps.setFieldValue("animals.specificAnimal", value)}
										missingMessage="Nenhum animal encontrado"
										required
									/>
								</div>
							) : (
								<div className="flex flex-col">
									<label className="font-Roboto text-base text-black mt-7">
										Animais que deseja adotar<label className="text-error"> * </label>
										<label className="text-sm text-gray-700">(Selecione todas as opções do seu interesse)</label>
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
							)
						}
					</div>
				);
			case 6:
				return (
					<div>
						{formikProps?.values?.animals?.animalsOfInterest?.dog && (
							<>
								<p className="font-black font-Roboto text-xl text-primary mb-3">Cachorros de interesse</p>
								<div className="grid gap-7">
									<div className="flex flex-col">
										<label className="font-Roboto text-base text-black">
											Sexo do cachorro<label className="text-error"> *</label>
										</label>
										<Checkbox
											label="Macho"
											id="interest.dog.sex.male"
											isChecked={formikProps?.values?.interest?.dog?.sex?.male}
											onChange={formikProps.handleChange}
										/>
										<Checkbox
											label="Fêmea"
											id="interest.dog.sex.female"
											isChecked={formikProps?.values?.interest?.dog?.sex?.female}
											onChange={formikProps.handleChange}
										/>
									</div>
									<div className="flex flex-col">
										<label className="font-Roboto text-base text-black">
											Porte do cachorro<label className="text-error"> *</label>
										</label>
										<Checkbox
											label="Pequeno"
											id="interest.dog.size.small"
											isChecked={formikProps?.values?.interest?.dog?.size?.small}
											onChange={formikProps.handleChange}
										/>
										<Checkbox
											label="Médio"
											id="interest.dog.size.medium"
											isChecked={formikProps?.values?.interest?.dog?.size?.medium}
											onChange={formikProps.handleChange}
										/>
										<Checkbox
											label="Grande"
											id="interest.dog.size.big"
											isChecked={formikProps?.values?.interest?.dog?.size?.big}
											onChange={formikProps.handleChange}
										/>
									</div>
									<div className="flex flex-col">
										<label className="font-Roboto text-base text-black">
											Faixa etária do cachorro<label className="text-error"> *</label>
										</label>
										<Checkbox
											label="Filhote"
											id="interest.dog.ageGroup.puppy"
											isChecked={formikProps?.values?.interest?.dog?.ageGroup?.puppy}
											onChange={formikProps.handleChange}
										/>
										<Checkbox
											label="Adulto"
											id="interest.dog.ageGroup.adult"
											isChecked={formikProps?.values?.interest?.dog?.ageGroup?.adult}
											onChange={formikProps.handleChange}
										/>
										<Checkbox
											label="Idoso"
											id="interest.dog.ageGroup.elderly"
											isChecked={formikProps?.values?.interest?.dog?.ageGroup?.elderly}
											onChange={formikProps.handleChange}
										/>
									</div>
								</div>
							</>
						)}
						{formikProps?.values?.animals?.animalsOfInterest?.cat && (
							<>
								<p className="font-black font-Roboto text-xl text-primary mb-3 mt-11">Gatos de interesse</p>
								<div className="grid gap-7">
									<div className="flex flex-col">
										<label className="font-Roboto text-base text-black">
											Sexo do gato<label className="text-error"> *</label>
										</label>
										<Checkbox
											label="Macho"
											id="interest.cat.sex.male"
											isChecked={formikProps?.values?.interest?.cat?.sex?.male}
											onChange={formikProps.handleChange}
										/>
										<Checkbox
											label="Fêmea"
											id="interest.cat.sex.female"
											isChecked={formikProps?.values?.interest?.cat?.sex?.female}
											onChange={formikProps.handleChange}
										/>
									</div>
									<div className="flex flex-col">
										<label className="font-Roboto text-base text-black">
											Porte do gato<label className="text-error"> *</label>
										</label>
										<Checkbox
											label="Pequeno"
											id="interest.cat.size.small"
											isChecked={formikProps?.values?.interest?.cat?.size?.small}
											onChange={formikProps.handleChange}
										/>
										<Checkbox
											label="Médio"
											id="interest.cat.size.medium"
											isChecked={formikProps?.values?.interest?.cat?.size?.medium}
											onChange={formikProps.handleChange}
										/>
										<Checkbox
											label="Grande"
											id="interest.cat.size.big"
											isChecked={formikProps?.values?.interest?.cat?.size?.big}
											onChange={formikProps.handleChange}
										/>
									</div>
									<div className="flex flex-col">
										<label className="font-Roboto text-base text-black">
											Faixa etária do gato<label className="text-error"> *</label>
										</label>
										<Checkbox
											label="Filhote"
											id="interest.cat.ageGroup.puppy"
											isChecked={formikProps?.values?.interest?.cat?.ageGroup?.puppy}
											onChange={formikProps.handleChange}
										/>
										<Checkbox
											label="Adulto"
											id="interest.cat.ageGroup.adult"
											isChecked={formikProps?.values?.interest?.cat?.ageGroup?.adult}
											onChange={formikProps.handleChange}
										/>
										<Checkbox
											label="Idoso"
											id="interest.cat.ageGroup.elderly"
											isChecked={formikProps?.values?.interest?.cat?.ageGroup?.elderly}
											onChange={formikProps.handleChange}
										/>
									</div>
								</div>
							</>
						)}
					</div>
				);
			case 7:
				return (
					<>
						<p className="font-black font-Roboto text-xl text-primary mb-3">Responsável</p>
						<div className="grid gap-7">
							<Input
								label="Principal responsável pelos cuidados com o animal"
								name="dailyCare.responsibleForCare"
								value={formikProps?.values?.dailyCare?.responsibleForCare}
								onChange={formikProps.handleChange}
								placeholder="Ana da Silva"
								className="text-black"
								variant="form"
								required
							/>
							<Input
								label="Principal responsável pelos cuidados com o animal em caso de viagens"
								name="dailyCare.responsibleForCareInCaseOfTravel"
								value={formikProps?.values?.dailyCare?.responsibleForCareInCaseOfTravel}
								onChange={formikProps.handleChange}
								placeholder="Bruna da Silva"
								className="text-black"
								variant="form"
								required
							/>
						</div>
						<p className="font-black font-Roboto text-xl text-primary mb-3 mt-11">Educação</p>
						<div className="grid gap-7">
							<Input
								label="Como irá educar o animal?"
								name="dailyCare.howWillEducate"
								value={formikProps?.values?.dailyCare?.howWillEducate}
								onChange={formikProps.handleChange}
								placeholder="Ana da Silva"
								className="text-black"
								variant="form"
								type="textarea"
								required
							/>
						</div>
						<p className="font-black font-Roboto text-xl text-primary mb-3 mt-11">Rotina</p>
						<div className="grid gap-2">
							<label className="font-Roboto text-base text-black">
								Quanto tempo por dia o animal ficará sozinho em casa?<label className="text-error"> *</label>
							</label>
							<RadioButton
								label="De 1 a 3 horas por dia"
								id="dailyCare.timeAlone"
								isSelected={formikProps?.values?.dailyCare?.timeAlone === "oneToThreeHours"}
								onChange={() => formikProps.setFieldValue("dailyCare.timeAlone", "oneToThreeHours")}
							/>
							<RadioButton
								label="De 4 a 7 horas por dia"
								id="dailyCare.timeAlone"
								isSelected={formikProps?.values?.dailyCare?.timeAlone === "fourToSevenHours"}
								onChange={() => formikProps.setFieldValue("dailyCare.timeAlone", "fourToSevenHours")}
							/>
							<RadioButton
								label="8 ou mais horas por dia"
								id="dailyCare.timeAlone"
								isSelected={formikProps?.values?.dailyCare?.timeAlone === "eightOrMoreHours"}
								onChange={() => formikProps.setFieldValue("dailyCare.timeAlone", "eightOrMoreHours")}
							/>
							{formikProps?.values?.animals?.animalsOfInterest?.dog && (
								<div className="mt-7">
									<Input
										label="Quantas vezes você levará o cachorro para passear?"
										name="dailyCare.dailyWalks"
										value={formikProps?.values?.dailyCare?.dailyWalks}
										onChange={formikProps.handleChange}
										className="text-black"
										variant="form"
										type="number"
										required
									/>
								</div>
							)}
							{formikProps?.values?.animals.animalsOfInterest.cat &&(
							<YesNoRadioButton
								className="mt-7"
								value={formikProps?.values?.dailyCare?.hasPetCarrier}
								onChange={(value) => formikProps.setFieldValue("dailyCare.hasPetCarrier", value)}
								label={"Possui caixa de transporte apropriada para levar o animal? "}
								required									
							/>)}
							<label className="font-Roboto text-base text-black">
								Qual será o tipo de alimentação principal do animal?<label className="text-error"> *</label>
							</label>
							<RadioButton
								label="Ração"
								id="dailyCare.foodType"
								isSelected={formikProps?.values?.dailyCare?.foodType === "animal"}
								onChange={() => formikProps.setFieldValue("dailyCare.foodType", "animal")}
							/>
							<RadioButton
								label="Comida humana"
								id="dailyCare.foodType"
								isSelected={formikProps?.values?.dailyCare?.foodType === "human"}
								onChange={() => formikProps.setFieldValue("dailyCare.foodType", "human")}
							/>
						</div>
					</>
				);
			case 8:
				return (
					<>
						<p className="text-sm text-gray-700 mb-7">Descreva em detalhes o que você faria em cada uma das seguintes situações:</p>
						<div className="grid gap-7">
							<Input
								label="Se o animal se perdesse"
								name="attitudesTowardsTheAnimal.getsLost"
								value={formikProps?.values?.attitudesTowardsTheAnimal?.getsLost}
								onChange={formikProps.handleChange}
								placeholder="descreva o que você faria caso isso acontecesse"
								className="text-black h-20 break-words resize-none text-left align-top overflow-y-auto"
								variant="form"
								type="textarea"
								required
							/>
							<Input
								label="Se o animal ficasse doente ou sofresse um acidente"
								name="attitudesTowardsTheAnimal.getsSickOrAccident"
								value={formikProps?.values?.attitudesTowardsTheAnimal?.getsSickOrAccident}
								onChange={formikProps.handleChange}
								placeholder="descreva o que você faria caso isso acontecesse"
								className="text-black h-20 break-words resize-none text-left align-top overflow-y-auto"
								variant="form"
								type="textarea"
								required
							/>
							<Input
								label="Se o animal machucasse o seu filho ou uma criança próxima"
								name="attitudesTowardsTheAnimal.hurtsYourChild"
								value={formikProps?.values?.attitudesTowardsTheAnimal?.hurtsYourChild}
								onChange={formikProps.handleChange}
								placeholder="descreva o que você faria caso isso acontecesse"
								className="text-black h-20 break-words resize-none text-left align-top overflow-y-auto"
								variant="form"
								type="textarea"
								required
							/>
							<Input
								label="Se o animal danificasse um objeto de valor"
								name="attitudesTowardsTheAnimal.damagesValuableObject"
								value={formikProps?.values?.attitudesTowardsTheAnimal?.damagesValuableObject}
								onChange={formikProps.handleChange}
								placeholder="descreva o que você faria caso isso acontecesse"
								className="text-black h-20 break-words resize-none text-left align-top overflow-y-auto"
								variant="form"
								type="textarea"
								required
							/>
							<Input
								label="Se o animal fizer suas necessidades em local inadequado"
								name="attitudesTowardsTheAnimal.peesOrPoopsInInappropriatePlace"
								value={formikProps?.values?.attitudesTowardsTheAnimal?.peesOrPoopsInInappropriatePlace}
								onChange={formikProps.handleChange}
								placeholder="descreva o que você faria caso isso acontecesse"
								className="text-black h-20 break-words resize-none text-left align-top overflow-y-auto"
								variant="form"
								type="textarea"
								required
							/>
							<Input
								label="Se o animal fizer algo que você não quer ou que você não goste"
								name="attitudesTowardsTheAnimal.doesThingsYouDontWant"
								value={formikProps?.values?.attitudesTowardsTheAnimal?.doesThingsYouDontWant}
								onChange={formikProps.handleChange}
								placeholder="descreva o que você faria caso isso acontecesse"
								className="text-black h-20 break-words resize-none text-left align-top overflow-y-auto"
								variant="form"
								type="textarea"
								required
							/>
							<Input
								label="O que fará com o animal se você tiver um filho?"
								name="attitudesTowardsTheAnimal.ifYouHaveAChild"
								value={formikProps?.values?.attitudesTowardsTheAnimal?.ifYouHaveAChild}
								onChange={formikProps.handleChange}
								placeholder="descreva o que você faria caso isso acontecesse"
								className="text-black h-20 break-words resize-none text-left align-top overflow-y-auto"
								variant="form"
								type="textarea"
								required
							/>
						</div>
					</>
				);
			case 9:
				return (
					<>
						<p className="font-black font-Roboto text-xl text-primary mb-3">Termos de consentimento</p>
						<div className="grid gap-7">
							<YesNoRadioButton
								value={formikProps?.values?.agreements?.certaintyOfAdoption}
								onChange={(value) => formikProps.setFieldValue("agreements.certaintyOfAdoption", value)}
								label={"Você está certo da adocção?"}
								required									
							/>
							<YesNoRadioButton
								value={formikProps?.values?.agreements?.awareOfTheImportanceOfNeuteringTheAnimal}
								onChange={(value) => formikProps.setFieldValue("agreements.awareOfTheImportanceOfNeuteringTheAnimal", value)}
								label={"Você tem consciência da importância da castração?"}
								required									
							/>
							<YesNoRadioButton
								value={formikProps?.values?.agreements?.agreesWithCastration}
								onChange={(value) => formikProps.setFieldValue("agreements.agreesWithCastration", value)}
								label={"Está ciente e de acordo com a esterilização? "}
								required									
							/>
							<YesNoRadioButton
								value={formikProps?.values?.agreements?.longTermCommitment}
								onChange={(value) => formikProps.setFieldValue("agreements.longTermCommitment", value)}
								label={"O tempo médio de vida de um animal doméstico é de 12 a 16 anos. Você está preparado para este compromisso duradouro?"}
								required									
							/>
							<YesNoRadioButton
								value={formikProps?.values?.agreements?.imageUse}
								onChange={(value) => formikProps.setFieldValue("agreements.imageUse", value)}
								label={"Você concorda com o uso da imagem?"}
								sublabel="Marque 'Sim' caso AUTORIZE o uso de sua imagem em fotos ou filme, sem finalidade comercial, para ser utilizada no(s) trabalho(s) de divulgação e voluntariado da Ong Anjos na Terra em Ação.  A presente autorização é concedida a título gratuito, abrangendo o uso da imagem acima mencionada em todo território nacional e no exterior, em todas as suas modalidades e, em destaque, das seguintes formas: (I) home page; (II) cartazes; (III) Redes Sociais (IV); divulgação em geral. Por esta ser a expressão da sua vontade declara que autoriza o uso acima descrito sem que nada haja a ser reclamado a título de direitos conexos à sua imagem ou a qualquer outro."
								required									
							/>
							<YesNoRadioButton
								value={formikProps?.values?.agreements?.monetaryContribution}
								onChange={(value) => formikProps.setFieldValue("agreements.monetaryContribution", value)}
								label={"Concorda com a contribuição?"}
								sublabel="Cada gato resgatado custa para a ONG em média R$400. Sendo R$200 de castração, R$100 de vacina, R$80 de antipulgas e R$10 de vermífugo."
								required									
							/>
							<YesNoRadioButton
								value={formikProps?.values?.agreements?.houseVisit}
								onChange={(value) => formikProps.setFieldValue("agreements.houseVisit", value)}
								label={"Você e sua família concordam com a visita do protetor (a) em sua casa, para verificar como o animal está sendo cuidado?"}
								required									
							/>
							<YesNoRadioButton
								value={formikProps?.values?.agreements?.notifyBeforeDonateToSomeoneElse}
								onChange={(value) => formikProps.setFieldValue("agreements.notifyBeforeDonateToSomeoneElse", value)}
								label={"Você está ciente que em caso de doar o animal para outra pessoa, deverá comunicar antes a protetora responsável?"}
								required									
							/>
							<YesNoRadioButton
								value={formikProps?.values?.agreements?.trueInformation}
								onChange={(value) => formikProps.setFieldValue("agreements.trueInformation", value)}
								label={"Você concorda que todas as informações são verdadeiras e que assume total responsabilidade pelo aqui respondido?"}
								required									
							/>
							<YesNoRadioButton
								value={formikProps?.values?.agreements?.videoPresentation}
								onChange={(value) => formikProps.setFieldValue("agreements.videoPresentation", value)}
								label={"Para candidatos indicados em feiras, solicitamos uma breve apresentação em vídeo, apenas para garantir o melhor tutor ao animal!"}
								required									
							/>
						</div>
					</>
				);
			default:
			return null;
		}
	};

	return (
	<>
		<div className="flex flex-col justify-center items-center pt-20 bg-white">
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
									onClick={() => prevStep(formikProps)}
									className="mr-4"
								/>
							)}
							{step < 9 && (<Button
								label="Próxima"
								variant="outline"
								type="button"
								disabled={Object.keys(formikProps.errors[schemaTitle[step]] || {}).length > 0}
								onClick={() => formikProps.validateForm().then(() => nextStep(formikProps))}
							/>)}
							{step == 9 && (<Button
								label="Enviar"
								variant="outline"
								type="button"
								disabled={Object.keys(formikProps.errors[schemaTitle[step]] || {}).length > 0}
								onClick={() => formikProps.validateForm().then(() => handleSubmit(formikProps.values))}
							/>)}
						</div>
					</Form>
				)}
        	</Formik>
		</div>
	</>
	);
}
