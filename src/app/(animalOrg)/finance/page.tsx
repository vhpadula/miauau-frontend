"use client";
import { Button, FinanceCard } from "@/components";
import { useRouter } from "next/navigation";

export default function Finance() {
	const router = useRouter();
    const expenses = 65;
    const income = 50;
    const result = income - expenses;
    const month = "Abril"
    return (
        <div className="pt-20 flex flex-col items-center w-screen">
            <div className="lg:w-2/3">
                <div className="sticky top-20 bg-gray-150 grid grid-cols-2 gap-4 px-6 py-4 border-b border-gray-400">
                    <Button
                        label="Ver registros"
                        variant="outline"
                        type="button"
                        onClick={() => router.push('/finance/records')}
                    />
                    <Button
                        label="Adicionar registro"
                        variant="primary"
                        onClick={() => router.push('/finance/records/new')}
                    />
                </div>
                <div className="p-6">
                    <p className="font-bold font-Roboto text-xl text-secondary mb-8">Demonstração do resultado do exercício (DRE)</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <FinanceCard 
                            id="income"
                            label="Receita" 
                            month={month}
                            content={<p className="text-center font-bold font-Roboto text-4xl text-secondary">{income}k</p>} 
                        />
                        <FinanceCard 
                            id="expenses"
                            label="Despesas" 
                            month={month}
                            content={<p className="text-center font-bold font-Roboto text-4xl text-secondary">{expenses}k</p>} 
                        />
                    </div>
                    <FinanceCard 
                        id="result"
                        label="Resultado" 
                        month={month}
                        content={<p className="text-center font-bold font-Roboto text-4xl text-secondary">{result}k</p>} 
                    />
                    <p className="font-bold font-Roboto text-xl text-secondary my-8">Gráficos consolidados</p>
                    <div className="grid grid-cols-1 gap-4">
                        <FinanceCard 
                            id="cashflow"
                            label="Fluxo de caixa" 
                            month={month}
                            content={<></>} 
                        />
                        <FinanceCard 
                            id="expensesDistribution"
                            label="Distribuição de Gastos" 
                            month={month}
                            content={<></>} 
                        />
                        <FinanceCard 
                            id="incomeSources"
                            label="Fontes de Arrecadação" 
                            month={month}
                            content={<></>} 
                        />
                        <FinanceCard 
                            id="meanDistribution"
                            label="Distribuição média" 
                            month={month}
                            content={<></>} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}