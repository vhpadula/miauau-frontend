"use client";
import {
	Button,
	Input,
	RadioButton
} from "@/components";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { IFinanceRecord } from "@/__mocks__/dataMock";

const defaultError = 'Preenchimento obrigatório';

const validationSchema  = Yup.object().shape({
        label: Yup.string().required(),
        type: Yup.string().required(),
        incomeType: Yup.string().when('type', (type) => {
            if (type && type[0]=='Entrada') {
                return Yup.string().required(defaultError)
            } 
            return Yup.string().nullable()
        }),
        outcomeType: Yup.string().when('type', (type) => {
            if (type && type[0]=='Saída') {
                return Yup.string().required(defaultError)
            } 
            return Yup.string().nullable()
        }),
		value: Yup.string().required()
	});

const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    
    return (Number(numericValue) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};

export default function FinanceRecordForm() {
	const router = useRouter();

	const initialValues: IFinanceRecord = {
        id: "",
        label: "",
        type: "",
        date: "",
        value: ""
    }

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

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setFieldValue: any) => {
        const { value } = e.target;
        const formattedValue = formatCurrency(value);
        setFieldValue("value", formattedValue);
    };

	return (
	<>
		<div className="flex flex-col justify-center items-center pt-20 bg-white">
			<div className="border-b border-solid border-1 border-gray-400 pb-9">
				<div className="flex flex-col items-center justify-center pt-9 mx-10">
					<p className="font-black font-Roboto text-2xl text-primary text-center mb-3">Registro financeiro</p>
					<p className="font-Roboto text-sm text-gray-700 text-center">Este formulário serve para o controle de movimentações financeiras da ONG Anjos na Terra em Ação.</p>
				</div>
			</div>
			<Formik<IFinanceRecord>
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(formikProps: FormikProps<IFinanceRecord>) => (
					<Form className="w-full h-screen justify-center lg:w-2/3 px-10 py-11">
						<div>
                            <p className="font-black font-Roboto text-xl text-primary mb-3">Movimento</p>
                            <div className="grid gap-7">
                                <Input
                                    label="Descrição"
                                    name="label"
                                    value={formikProps?.values?.label}
                                    onChange={formikProps.handleChange}
                                    placeholder="ex: Doação de Ana da Silva"
                                    className="text-black"
                                    maxLength={50}
                                    helperText="Descreva em até 50 caracteres sobre o que se trata essa movimentação."
                                    variant="form"
                                    required
                                />
								    <div className="flex flex-col"><label className="font-Roboto text-base text-black">
                                        Tipo de movimentação<label className="text-error"> *</label>
                                    </label>
									<RadioButton
										label="Entrada"
										id="type"
										isSelected={formikProps?.values?.type === "Entrada"}
										onChange={() => formikProps.setFieldValue("type", "Entrada")}
									/>
									<RadioButton
										label="Saída"
										id="type"
										isSelected={formikProps?.values?.type === "Saída"}
										onChange={() => formikProps.setFieldValue("type", "Saída")}
									/>
								</div>
                                {formikProps.values.type != "" && (
                                    formikProps.values.type === "Entrada" ? (
                                        <div className="flex flex-col">
                                            <label className="font-Roboto text-base text-black">
                                                Tipo de entrada<label className="text-error"> *</label>
                                            </label>
                                            <RadioButton
                                                label="Doação"
                                                id="incomeType"
                                                isSelected={formikProps?.values?.incomeType === "Doação"}
                                                onChange={() => formikProps.setFieldValue("incomeType", "Doação")}
                                            />
                                            <RadioButton
                                                label="Governo"
                                                id="incomeType"
                                                isSelected={formikProps?.values?.incomeType === "Governo"}
                                                onChange={() => formikProps.setFieldValue("incomeType", "Governo")}
                                            />
                                            <RadioButton
                                                label="Parceria"
                                                id="incomeType"
                                                isSelected={formikProps?.values?.incomeType === "Parceria"}
                                                onChange={() => formikProps.setFieldValue("incomeType", "Parceria")}
                                            />
                                            <RadioButton
                                                label="Outro"
                                                id="incomeType"
                                                isSelected={formikProps?.values?.incomeType === "Outro"}
                                                onChange={() => formikProps.setFieldValue("incomeType", "Outro")}
                                            />
                                        </div>
                                    ) :
                                    (
                                        <div className="flex flex-col">
                                            <label className="font-Roboto text-base text-black">
                                                Despesas<label className="text-error"> *</label>
                                            </label>
                                            <RadioButton
                                                label="Vacinas"
                                                id="outcomeType"
                                                isSelected={formikProps?.values?.outcomeType === "Vacinas"}
                                                onChange={() => formikProps.setFieldValue("outcomeType", "Vacinas")}
                                            />
                                            <RadioButton
                                                label="Ração"
                                                id="outcomeType"
                                                isSelected={formikProps?.values?.outcomeType === "Ração"}
                                                onChange={() => formikProps.setFieldValue("outcomeType", "Ração")}
                                            />
                                            <RadioButton
                                                label="Castração"
                                                id="outcomeType"
                                                isSelected={formikProps?.values?.outcomeType === "Castração"}
                                                onChange={() => formikProps.setFieldValue("outcomeType", "Castração")}
                                            />
                                            <RadioButton
                                                label="Remédios"
                                                id="outcomeType"
                                                isSelected={formikProps?.values?.outcomeType === "Remédios"}
                                                onChange={() => formikProps.setFieldValue("outcomeType", "Remédios")}
                                            />
                                            <RadioButton
                                                label="Limpeza"
                                                id="outcomeType"
                                                isSelected={formikProps?.values?.outcomeType === "Limpeza"}
                                                onChange={() => formikProps.setFieldValue("outcomeType", "Limpeza")}
                                            />
                                            <RadioButton
                                                label="Internação"
                                                id="outcomeType"
                                                isSelected={formikProps?.values?.outcomeType === "Internação"}
                                                onChange={() => formikProps.setFieldValue("outcomeType", "Internação")}
                                            />
                                            <RadioButton
                                                label="Internet"
                                                id="outcomeType"
                                                isSelected={formikProps?.values?.outcomeType === "Internet"}
                                                onChange={() => formikProps.setFieldValue("outcomeType", "Internet")}
                                            />
                                            <RadioButton
                                                label="Funcionários"
                                                id="outcomeType"
                                                isSelected={formikProps?.values?.outcomeType === "Funcionários"}
                                                onChange={() => formikProps.setFieldValue("outcomeType", "Funcionários")}
                                            />
                                            <RadioButton
                                                label="Combustível"
                                                id="outcomeType"
                                                isSelected={formikProps?.values?.outcomeType === "Combustível"}
                                                onChange={() => formikProps.setFieldValue("outcomeType", "Combustível")}
                                            />
                                            <RadioButton
                                                label="Alimentação"
                                                id="outcomeType"
                                                isSelected={formikProps?.values?.outcomeType === "Alimentação"}
                                                onChange={() => formikProps.setFieldValue("outcomeType", "Alimentação")}
                                            />
                                            <RadioButton
                                                label="Outro"
                                                id="outcomeType"
                                                isSelected={formikProps?.values?.outcomeType === "Outro"}
                                                onChange={() => formikProps.setFieldValue("outcomeType", "Outro")}
                                            />
                                        </div>
                                    )
                                )}
                                <Input
                                    label="Valor"
                                    name="value"
                                    value={formikProps?.values?.value}
                                    onChange={(e) => {
                                        handleValueChange(e, formikProps.setFieldValue);
                                        console.log(formikProps.errors)
                                    }}
                                    placeholder="ex: R$50,00 "
                                    className="text-black"
                                    variant="form"
                                    required
                                />
                                {/* colocar aqui o upload de arquivo */}
                            </div>
                        </div>
						<div className="flex justify-center pt-11">
                            <Button
								label="Enviar"
								variant="outline"
								type="button"
								disabled={Object.keys(formikProps.errors || {}).length > 0}
								onClick={() => formikProps.validateForm().then(() => console.log(formikProps.values))}
							/>
						</div>
					</Form>
				)}
        	</Formik>
		</div>
	</>
	);
}
