"use client";
import {
	Button,
	Checkbox,
	Input,
	RadioButton,
    YesNoRadioButton
} from "@/components";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { IAnimal } from "@/types";
import FileInput from "@/components/molecules/FileInput";
import { get, post, put, uploadFile } from "@/services/baseServices";
import { useEffect, useState } from "react";

const defaultError = 'Preenchimento obrigatório';

const validationSchema  = Yup.object().shape({
        name: Yup.string().required(),
		image: Yup.mixed()
				.required("A imagem é obrigatória")
				.test("fileFormat", "A imagem deve ser um arquivo válido", (value) => {
					return value instanceof File;
				}),
		type: Yup.string().required(),
		ageGroup: Yup.string().required(),
		sex: Yup.string().required(),
		pregnant: Yup.string().when('sex', (sex) => {
			if (sex && sex[0] === 'Fêmea') {
				return Yup.string().required(defaultError)
			} 
			return Yup.string().nullable()
		}),
		castrated: Yup.boolean().required(),
		color: Yup.string().required(),
		approximateAge: Yup.string().required(),
		fiv: Yup.string().when('type', (type) => {
			if (type && type[0] === 'Gato') {
				return Yup.string().required(defaultError)
			} 
			return Yup.string().nullable()
		}),
		felv: Yup.string().when('type', (type) => {
			if (type && type[0] === 'Gato') {
				return Yup.string().required(defaultError)
			} 
			return Yup.string().nullable()
		}),
		healthSituation: Yup.object().shape({
			healthy: Yup.boolean().required(),
            dirty: Yup.boolean().required(),
            hurt: Yup.boolean().required(),
            mange: Yup.boolean().required(),
            fleas: Yup.boolean().required(),
            ticks: Yup.boolean().required(),
            vomiting: Yup.boolean().required(),
            limping: Yup.boolean().required(),
            other: Yup.boolean().required(),
            otherDescription: Yup.string().when('other', (other) => {
				if (other && other[0]) {
					return Yup.string().required(defaultError)
				} 
				return Yup.string().nullable()
			}),
		}),
		needsCare: Yup.string().required(),
		vaccinated: Yup.string().required(),
		vaccinationDate: Yup.date().when('vaccinated', (vaccinated) => {
			if (vaccinated && vaccinated[0] === 'Sim') {
				return Yup.string().required(defaultError)
			} 
			return Yup.string().nullable()
		}),
		dewormed: Yup.string().required(),
		dewormingDate: Yup.date().when('dewormed', (dewormed) => {
			if (dewormed && dewormed[0] === 'Sim') {
				return Yup.string().required(defaultError)
			} 
			return Yup.string().nullable()
		}),
		antiFleas: Yup.string().required(),
		antiFleasApplicationDate: Yup.date().when('antiFleas', (antiFleas) => {
			if (antiFleas && antiFleas[0] === 'Sim') {
				return Yup.string().required(defaultError)
			} 
			return Yup.string().nullable()
		}),
		rescue: Yup.object().shape({
			howDidItArrive: Yup.string().required(),
            description: Yup.string().when('howDidItArrive', (howDidItArrive) => {
				if (howDidItArrive && howDidItArrive[0] === 'Outro') {
					return Yup.string().required('Descrição necessária se "outro" estiver selecionado')
				} 
				return Yup.string().nullable()
			}),
            responsible: Yup.object().shape({
                name: Yup.string().required(),
                phone: Yup.string().required(),
                donnation: Yup.object().shape({
                    money: Yup.boolean().required(),
                    food: Yup.boolean().required(),
                    antiFleas: Yup.boolean().required(),
                    timeToHelp: Yup.boolean().required(),
                    other: Yup.boolean().required(),
                    otherDescription: Yup.string().when('other', (other) => {
						if (other && other[0]) {
							return Yup.string().required('Descrição necessária se "outro" estiver selecionado')
						} 
						return Yup.string().nullable()
					}),
                })
            })
		})
	});


export default function AnimalEditForm({params}: {
    params: { animalId: string }
}) {
    const emptyInitialValues: IAnimal = {
        name: "",
        image: undefined,
        imagePath: "",
        type: "",
        ageGroup: "",
        sex: "",
        pregnant: "",
        castrated: undefined,
        color: "",
        approximateAge: "",
        fiv: undefined,
        felv: undefined,
        healthSituation: {
            healthy: false,
            dirty: false,
            hurt: false,
            mange: false,
            fleas: false,
            ticks: false,
            vomiting: false,
            limping: false,
            other: false,
            otherDescription: ""
        },
        needsCare: "",
        vaccinated: "",
        vaccinationDate: "",
        dewormed: "",
        dewormingDate: "",
        antiFleas: "",
        antiFleasApplicationDate: "",
        rescue: {
            howDidItArrive: "",
            description: "",
            responsible: {
                name: "",
                phone: "",
                donnation: {
                    money: false,
                    food: false,
                    antiFleas: false,
                    timeToHelp: false,
                    other: false,
                    otherDescription: ""
                }
            }
        }
    };

	const router = useRouter();
    const [initialValues, setInitialValues] = useState<IAnimal>(emptyInitialValues);


	const handleSubmit = async (values: any) => {
		try {
			const response = await put(`/api/v1/animals/${params.animalId}`, values);
            console.log(values.image);

            if (values.image) {
                const formData = new FormData();
                formData.append('id', params.animalId);
                formData.append('file', values.image);
    
                // TODO: criar endpoint de replace
                uploadFile('/api/v1/animals/blob/upload', params.animalId, values.image);
            }
			setTimeout(() => {
				router.push('/animals');
			}, 1000);
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

    useEffect(() => {
        get(`/api/v1/animals/${params.animalId}`)
        .then((response) => {
            setInitialValues(response);
        })
        .catch((error) => {
            console.error("Failed to fetch animal data:", error);
        });
    }, [params.animalId]);

	return (
	<div className="bg-primary h-full">
		<div className="flex flex-col justify-center items-center pt-20 bg-white">
			<div className="border-b border-solid border-1 border-gray-400">
				<div className="flex flex-col items-center justify-center pt-9 mx-10">
					<p className="font-black font-Roboto text-2xl text-primary text-center mb-3">Editar animal</p>
				</div>
			</div>
			<Formik<IAnimal>
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
                enableReinitialize
			>
				{(formikProps: FormikProps<IAnimal>) => (
					<Form className="w-full justify-center lg:w-2/3 px-10 py-11 h-fit bg-white">
						<div>
                            <div className="grid gap-7">
                                <p className="font-black font-Roboto text-xl text-primary mb-3">Identificação</p>
                                <FileInput 
                                    imagePath={formikProps?.values?.imagePath}
									onChange={
										(file) => formikProps.setFieldValue('image', file)
									} 
								/>
                                <Input
                                    label="Nome"
                                    name="name"
                                    value={formikProps?.values?.name}
                                    onChange={formikProps.handleChange}
                                    placeholder="ex: Pipoca"
                                    className="text-black"
                                    maxLength={50}
                                    variant="form"
                                    required
                                />
                                <div className="flex flex-col">
                                    <label className="font-Roboto text-base text-black">
                                        Animal<label className="text-error"> *</label>
                                    </label>
									<RadioButton
										label="Cachorro"
										id="type1"
										isSelected={formikProps?.values?.type === "Cachorro"}
										onChange={() => formikProps.setFieldValue("type", "Cachorro")}
									/>
									<RadioButton
										label="Gato"
										id="type2"
										isSelected={formikProps?.values?.type === "Gato"}
										onChange={() => formikProps.setFieldValue("type", "Gato")}
									/>
								</div>
                                <div className="flex flex-col">
                                    <label className="font-Roboto text-base text-black">
                                        Faixa etária<label className="text-error"> *</label>
                                    </label>
									<RadioButton
										label="Filhote"
										id="ageGroup1"
										isSelected={formikProps?.values?.ageGroup === "Filhote"}
										onChange={() => formikProps.setFieldValue("ageGroup", "Filhote")}
									/>
									<RadioButton
										label="Adulto"
										id="ageGroup2"
										isSelected={formikProps?.values?.ageGroup === "Adulto"}
										onChange={() => formikProps.setFieldValue("ageGroup", "Adulto")}
									/>
									<RadioButton
										label="Idoso"
										id="ageGroup3"
										isSelected={formikProps?.values?.ageGroup === "Idoso"}
										onChange={() => formikProps.setFieldValue("ageGroup", "Idoso")}
									/>
								</div>
                                <div className="flex flex-col">
                                    <label className="font-Roboto text-base text-black">
                                        Idade aproximada<label className="text-error"> *</label>
                                    </label>
									<RadioButton
										label="Recém-nascido"
										id="approximateAge1"
										isSelected={formikProps?.values?.approximateAge === "Recém-nascido"}
										onChange={() => formikProps.setFieldValue("approximateAge", "Recém-nascido")}
									/>
									<RadioButton
										label="3 meses a 1 ano"
										id="approximateAge2"
										isSelected={formikProps?.values?.approximateAge === "3 meses a 1 ano"}
										onChange={() => formikProps.setFieldValue("approximateAge", "3 meses a 1 ano")}
									/>
									<RadioButton
										label="1 a 2 anos"
										id="approximateAge3"
										isSelected={formikProps?.values?.approximateAge === "1 a 2 anos"}
										onChange={() => formikProps.setFieldValue("approximateAge", "1 a 2 anos")}
									/>
									<RadioButton
										label="2 a 5 anos"
										id="approximateAge4"
										isSelected={formikProps?.values?.approximateAge === "2 a 5 anos"}
										onChange={() => formikProps.setFieldValue("approximateAge", "2 a 5 anos")}
									/>
									<RadioButton
										label="Acima de 5 anos"
										id="approximateAge5"
										isSelected={formikProps?.values?.approximateAge === "Acima de 5 anos"}
										onChange={() => formikProps.setFieldValue("approximateAge", "Acima de 5 anos")}
									/>
									<RadioButton
										label="Impossível definir"
										id="approximateAge6"
										isSelected={formikProps?.values?.approximateAge === "Impossível definir"}
										onChange={() => formikProps.setFieldValue("approximateAge", "Impossível definir")}
									/>
								</div>
                                <div className="flex flex-col">
                                    <label className="font-Roboto text-base text-black">
                                        Sexo<label className="text-error"> *</label>
                                    </label>
									<RadioButton
										label="Macho"
										id="sex1"
										isSelected={formikProps?.values?.sex === "Macho"}
										onChange={() => formikProps.setFieldValue("sex", "Macho")}
									/>
									<RadioButton
										label="Fêmea"
										id="sex2"
										isSelected={formikProps?.values?.sex === "Fêmea"}
										onChange={() => formikProps.setFieldValue("sex", "Fêmea")}
									/>
								</div>
                                <div>
                                    <label className="font-Roboto text-base text-black">
                                        Cor/Pelagem<label className="text-error"> *</label>
                                    </label>
									<RadioButton
										label="Amarelo"
										id="color1"
										isSelected={formikProps?.values?.color === "Amarelo"}
										onChange={() => formikProps.setFieldValue("color", "Amarelo")}
									/>
									<RadioButton
										label="Branco"
										id="color2"
										isSelected={formikProps?.values?.color === "Branco"}
										onChange={() => formikProps.setFieldValue("color", "Branco")}
									/>
									<RadioButton
										label="Cinza"
										id="color3"
										isSelected={formikProps?.values?.color === "Cinza"}
										onChange={() => formikProps.setFieldValue("color", "Cinza")}
									/>
									<RadioButton
										label="Escaminha"
										id="color4"
										isSelected={formikProps?.values?.color === "Escaminha"}
										onChange={() => formikProps.setFieldValue("color", "Escaminha")}
									/>
									<RadioButton
										label="Frajola"
										id="color5"
										isSelected={formikProps?.values?.color === "Frajola"}
										onChange={() => formikProps.setFieldValue("color", "Frajola")}
									/>
									<RadioButton
										label="Mesclado"
										id="color6"
										isSelected={formikProps?.values?.color === "Mesclado"}
										onChange={() => formikProps.setFieldValue("color", "Mesclado")}
									/>
									<RadioButton
										label="Preto"
										id="color7"
										isSelected={formikProps?.values?.color === "Preto"}
										onChange={() => formikProps.setFieldValue("color", "Preto")}
									/>
									<RadioButton
										label="Sialata"
										id="color8"
										isSelected={formikProps?.values?.color === "Sialata"}
										onChange={() => formikProps.setFieldValue("color", "Sialata")}
									/>
									<RadioButton
										label="Tricolor"
										id="color9"
										isSelected={formikProps?.values?.color === "Tricolor"}
										onChange={() => formikProps.setFieldValue("color", "Tricolor")}
									/>
                                </div>
                                <p className="font-black font-Roboto text-xl text-primary mt-5 mb-3">Saúde do animal</p>
                                {formikProps.values.sex == "Fêmea" && (
                                    <div className="flex flex-col">
                                        <label className="font-Roboto text-base text-black">
                                            Está prenha?<label className="text-error"> *</label>
                                        </label>
                                        <RadioButton
                                            label="Sim"
                                            id="pregnant1"
                                            isSelected={formikProps?.values?.pregnant === "Sim"}
                                            onChange={() => formikProps.setFieldValue("pregnant", "Sim")}
                                        />
                                        <RadioButton
                                            label="Não"
                                            id="pregnant2"
                                            isSelected={formikProps?.values?.pregnant === "Não"}
                                            onChange={() => formikProps.setFieldValue("pregnant", "Não")}
                                        />
                                        <RadioButton
                                            label="Sem definição"
                                            id="pregnant3"
                                            isSelected={formikProps?.values?.pregnant === "Sem definição"}
                                            onChange={() => formikProps.setFieldValue("pregnant", "Sem definição")}
                                        />
                                    </div>
                                )}
                                <YesNoRadioButton
                                    value={formikProps.values.castrated}
                                    onChange={(value) => formikProps.setFieldValue("castrated", value)}
                                    label={"É castrado?"}
                                    required									
                                />
                                {formikProps.values?.type === "Gato" && (
                                    <div className="grid gap-7">
                                        <YesNoRadioButton
                                            value={formikProps.values.fiv}
                                            onChange={(value) => formikProps.setFieldValue("fiv", value)}
                                            label={"FIV positivo?"}
                                            required									
                                        />
                                        <YesNoRadioButton
                                            value={formikProps.values.felv}
                                            onChange={(value) => formikProps.setFieldValue("felv", value)}
                                            label={"FELV Positivo?"}
                                            required									
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="font-Roboto text-base text-black">
										Situação da saúde do animal<label className="text-error"> *</label>
									</label>
									<Checkbox
										label="Saudável"
										id="healthSituation.healthy"
										isChecked={formikProps?.values?.healthSituation?.healthy}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Sujo"
										id="healthSituation.dirty"
										isChecked={formikProps?.values?.healthSituation?.dirty}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Machucado"
										id="healthSituation.hurt"
										isChecked={formikProps?.values?.healthSituation?.hurt}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Sarna"
										id="healthSituation.mange"
										isChecked={formikProps?.values?.healthSituation?.mange}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Pulgas"
										id="healthSituation.fleas"
										isChecked={formikProps?.values?.healthSituation?.fleas}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Carrapatos"
										id="healthSituation.ticks"
										isChecked={formikProps?.values?.healthSituation?.ticks}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Vomitando"
										id="healthSituation.vomiting"
										isChecked={formikProps?.values?.healthSituation?.vomiting}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Mancando"
										id="healthSituation.limping"
										isChecked={formikProps?.values?.healthSituation?.limping}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Outro"
										id="healthSituation.other"
										isChecked={formikProps?.values?.healthSituation?.other}
										onChange={formikProps.handleChange}
									/>
                                    {formikProps.values?.healthSituation?.other && (
										<Input
											name="healthSituation.otherDescription"
											value={formikProps?.values?.healthSituation?.otherDescription}
											onChange={formikProps.handleChange}
											placeholder="descreva a situação"
											className="text-black mt-2"
											variant="form"
											required
										/>
									)}
                                </div>
                                <div>
                                    <label className="font-Roboto text-base text-black">
                                        Precisa de atendimento?<label className="text-error"> *</label>
                                    </label>
									<RadioButton
										label="Não"
										id="needsCare1"
										isSelected={formikProps?.values?.needsCare === "Não"}
										onChange={() => formikProps.setFieldValue("needsCare", "Não")}
									/>
									<RadioButton
										label="Apenas banho"
										id="needsCare2"
										isSelected={formikProps?.values?.needsCare === "Apenas banho"}
										onChange={() => formikProps.setFieldValue("needsCare", "Apenas banho")}
									/>
									<RadioButton
										label="Veterinário básico"
										id="needsCare3"
										isSelected={formikProps?.values?.needsCare === "Veterinário básico"}
										onChange={() => formikProps.setFieldValue("needsCare", "Veterinário básico")}
									/>
									<RadioButton
										label="Urgência"
										id="needsCare4"
										isSelected={formikProps?.values?.needsCare === "Urgência"}
										onChange={() => formikProps.setFieldValue("needsCare", "Urgência")}
									/>
                                </div>
                                <div>
                                    <label className="font-Roboto text-base text-black">
                                        Foi vacinado?<label className="text-error"> *</label>
                                    </label>
									<RadioButton
										label="Sim"
										id="vaccinated1"
										isSelected={formikProps?.values?.vaccinated === "Sim"}
										onChange={() => formikProps.setFieldValue("vaccinated", "Sim")}
									/>
									<RadioButton
										label="Não"
										id="vaccinated2"
										isSelected={formikProps?.values?.vaccinated === "Não"}
										onChange={() => formikProps.setFieldValue("vaccinated", "Não")}
									/>
									<RadioButton
										label="Não sei informar"
										id="vaccinated3"
										isSelected={formikProps?.values?.vaccinated === "Não sei informar"}
										onChange={() => formikProps.setFieldValue("vaccinated", "Não sei informar")}
									/>
                                </div>
                                {formikProps.values?.vaccinated === "Sim" && (
                                    <Input
                                        label="Data da última vacina"
                                        name="vaccinationDate"
                                        value={formikProps?.values?.vaccinationDate}
                                        onChange={formikProps.handleChange}
                                        className="text-black"
                                        variant="form"
                                        type="date"
                                        helperText="Informe ao menos uma data aproximada."
                                        required
                                    />
                                )}
                                <div>
                                    <label className="font-Roboto text-base text-black">
                                        Foi vermifugado?<label className="text-error"> *</label>
                                    </label>
									<RadioButton
										label="Sim"
										id="dewormed1"
										isSelected={formikProps?.values?.dewormed === "Sim"}
										onChange={() => formikProps.setFieldValue("dewormed", "Sim")}
									/>
									<RadioButton
										label="Não"
										id="dewormed2"
										isSelected={formikProps?.values?.dewormed === "Não"}
										onChange={() => formikProps.setFieldValue("dewormed", "Não")}
									/>
									<RadioButton
										label="Não sei informar"
										id="dewormed3"
										isSelected={formikProps?.values?.dewormed === "Não sei informar"}
										onChange={() => formikProps.setFieldValue("dewormed", "Não sei informar")}
									/>
                                </div>
                                {formikProps.values?.dewormed === "Sim" && (
                                    <Input
                                        label="Data da última vermifugação"
                                        name="dewormingDate"
                                        value={formikProps?.values?.dewormingDate}
                                        onChange={formikProps.handleChange}
                                        className="text-black"
                                        variant="form"
                                        type="date"
                                        helperText="Informe ao menos uma data aproximada."
                                        required
                                    />
                                )}
                                <div>
                                    <label className="font-Roboto text-base text-black">
                                        Aplicado anti-pulgas?<label className="text-error"> *</label>
                                    </label>
									<RadioButton
										label="Sim"
										id="antiFleas1"
										isSelected={formikProps?.values?.antiFleas === "Sim"}
										onChange={() => formikProps.setFieldValue("antiFleas", "Sim")}
									/>
									<RadioButton
										label="Não"
										id="antiFleas2"
										isSelected={formikProps?.values?.antiFleas === "Não"}
										onChange={() => formikProps.setFieldValue("antiFleas", "Não")}
									/>
									<RadioButton
										label="Não sei informar"
										id="antiFleas3"
										isSelected={formikProps?.values?.antiFleas === "Não sei informar"}
										onChange={() => formikProps.setFieldValue("antiFleas", "Não sei informar")}
									/>
                                </div>
                                {formikProps.values?.antiFleas === "Sim" && (
                                    <Input
                                        label="Data da última aplicação do anti-pulgas"
                                        name="antiFleasApplicationDate"
                                        value={formikProps?.values?.antiFleasApplicationDate}
                                        onChange={formikProps.handleChange}
                                        className="text-black"
                                        variant="form"
                                        type="date"
                                        helperText="Informe ao menos uma data aproximada."
                                        required
                                    />
                                )}
                                <p className="font-black font-Roboto text-xl text-primary mt-5 mb-3">Sobre o resgate</p>
                                <div>
                                    <label className="font-Roboto text-base text-black">
                                        Como chegou à ONG?<label className="text-error"> *</label>
                                    </label>
									<RadioButton
										label="Foi devolvido"
										id="rescue.howDidItArrive1"
										isSelected={formikProps?.values?.rescue?.howDidItArrive === "Foi devolvido"}
										onChange={() => formikProps.setFieldValue("rescue.howDidItArrive", "Foi devolvido")}
									/>
									<RadioButton
										label="Resgate da ONG"
										id="rescue.howDidItArrive1"
										isSelected={formikProps?.values?.rescue?.howDidItArrive === "Resgate da ONG"}
										onChange={() => formikProps.setFieldValue("rescue.howDidItArrive", "Resgate da ONG")}
									/>
									<RadioButton
										label="Resgate por outra pessoa"
										id="rescue.howDidItArrive1"
										isSelected={formikProps?.values?.rescue?.howDidItArrive === "Resgate por outra pessoa"}
										onChange={() => formikProps.setFieldValue("rescue.howDidItArrive", "Resgate por outra pessoa")}
									/>
									<RadioButton
										label="Outro"
										id="rescue.howDidItArrive1"
										isSelected={formikProps?.values?.rescue?.howDidItArrive === "Outro"}
										onChange={() => formikProps.setFieldValue("rescue.howDidItArrive", "Outro")}
									/>
                                    {formikProps.values?.rescue?.howDidItArrive === "Outro" && (
										<Input
											name="rescue.description"
											value={formikProps?.values?.rescue?.description}
											onChange={formikProps.handleChange}
											placeholder="descreva a situação"
											className="text-black mt-2"
											variant="form"
											required
										/>
									)}
                                </div>
                                <Input
                                    label="Nome do responsável pelo resgate"
                                    name="rescue.responsible.name"
                                    value={formikProps?.values?.rescue?.responsible?.name}
                                    onChange={formikProps.handleChange}
                                    placeholder="Ana da Silva"
                                    className="text-black"
                                    variant="form"
                                    required
                                />
                                <Input
                                    label="Telefone do responsável pelo resgate"
                                    name="rescue.responsible.phone"
                                    value={formikProps?.values?.rescue?.responsible?.phone}
                                    onChange={formikProps.handleChange}
                                    placeholder="(XX) XXXXX - XXXX"
                                    className="text-black"
                                    variant="form"
                                    required
                                />
                                <div>
                                    <label className="font-Roboto text-base text-black">
										O responsável pelo resgate fez alguma doação à ONG?<label className="text-error"> *</label>
									</label>
									<Checkbox
										label="Dinheiro"
										id="rescue.responsible.donnation.money"
										isChecked={formikProps?.values?.rescue?.responsible?.donnation.money}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Ração"
										id="rescue.responsible.donnation.food"
										isChecked={formikProps?.values?.rescue?.responsible?.donnation.food}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Anti-pulgas"
										id="rescue.responsible.donnation.antiFleas"
										isChecked={formikProps?.values?.rescue?.responsible?.donnation.antiFleas}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Tempo para ajudar (Voluntariado)"
										id="rescue.responsible.donnation.timeToHelp"
										isChecked={formikProps?.values?.rescue?.responsible?.donnation.timeToHelp}
										onChange={formikProps.handleChange}
									/>
									<Checkbox
										label="Outro"
										id="rescue.responsible.donnation.other"
										isChecked={formikProps?.values?.rescue?.responsible?.donnation.other}
										onChange={formikProps.handleChange}
									/>
                                    {formikProps.values?.rescue?.responsible?.donnation?.other && (
                                        <Input
                                            name="rescue.responsible.donnation.otherDescription"
                                            value={formikProps?.values?.rescue?.responsible?.donnation?.otherDescription}
                                            onChange={formikProps.handleChange}
                                            placeholder="Informe o tipo de doação"
                                            className="text-black mt-2"
                                            variant="form"
                                            required
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
						<div className="flex justify-center pt-11">
                            <Button
								label="Salvar"
								variant="outline"
								type="button"
								disabled={Object.keys(formikProps.errors || {}).length > 0}
								onClick={() => formikProps.validateForm().then(() => handleSubmit(formikProps.values))}
							/>
						</div>
					</Form>
				)}
        	</Formik>
		</div>
	</div>
	);
}
