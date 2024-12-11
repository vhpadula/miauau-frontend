"use client";
import { Button, FinanceCard, PieChart } from "@/components";
import { useRouter } from "next/navigation";
import { financeRecords as mockRecords } from "../../../__mocks__/dataMock";

export default function Finance() {
  const router = useRouter();
  let expenses = 0;
  let income = 0;
  const month = "Dezembro";

  mockRecords.forEach((records) => {
    const value = parseFloat(
      records.value.replace("R$", "").replace(",", "").trim()
    );
    if (records.type == "Entrada") {
      income += value;
    } else {
      expenses += value;
    }
  });
  const result = income - expenses;

  const expensesList = mockRecords.filter((record) => record.type === "Saída");
  const groupedExpenses = expensesList.reduce(
    (acc: Record<string, number>, record) => {
      const type = record.outcomeType || "Outros";
      const value = parseFloat(
        record.value.replace("R$", "").replace(",", ".")
      );
      acc[type] = (acc[type] || 0) + value;
      return acc;
    },
    {}
  );

  const expensesData = {
    labels: Object.keys(groupedExpenses),
    data: Object.values(groupedExpenses),
  };

  const incomeList = mockRecords.filter((record) => record.type === "Entrada");
  const groupedIncome = incomeList.reduce(
    (acc: Record<string, number>, record) => {
      const type = record.incomeType || "Outros";
      const value = parseFloat(
        record.value.replace("R$", "").replace(",", ".")
      );
      acc[type] = (acc[type] || 0) + value;
      return acc;
    },
    {}
  );

  const incomeData = {
    labels: Object.keys(groupedIncome),
    data: Object.values(groupedIncome),
  };

  const formatToK = (value: number): string => {
    if (Math.abs(value) < 1000) {
      return value.toString();
    }

    const formattedValue = (value / 1000).toFixed(1);
    return formattedValue.replace(".", ",") + "k";
  };

  return (
    <div className="pt-20 flex flex-col items-center w-screen">
      <div className="lg:w-2/3">
        <div className="sticky top-20 bg-gray-150 grid grid-cols-2 gap-4 px-6 py-4 border-b border-gray-400">
          <Button
            label="Ver registros"
            variant="outline"
            type="button"
            onClick={() => router.push("/finance/records")}
          />
          <Button
            label="Adicionar registro"
            variant="primary"
            onClick={() => router.push("/finance/records/new")}
          />
        </div>
        <div className="p-6">
          <p className="font-bold font-Roboto text-xl text-secondary mb-8">
            Demonstração do resultado do exercício (DRE)
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <FinanceCard
              id="income"
              label="Receita"
              month={month}
              content={
                <p className="text-center font-bold font-Roboto text-4xl text-secondary">
                  {formatToK(income)}
                </p>
              }
            />
            <FinanceCard
              id="expenses"
              label="Despesas"
              month={month}
              content={
                <p className="text-center font-bold font-Roboto text-4xl text-secondary">
                  {formatToK(expenses)}
                </p>
              }
            />
          </div>
          <FinanceCard
            id="result"
            label="Resultado"
            month={month}
            content={
              <p className="text-center font-bold font-Roboto text-4xl text-secondary">
                {formatToK(result)}
              </p>
            }
          />
          <p className="font-bold font-Roboto text-xl text-secondary my-8">
            Gráficos consolidados
          </p>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            {/* <FinanceCard
              id="cashflow"
              label="Fluxo de caixa"
              month={month}
              content={<></>}
            /> */}
            <FinanceCard
              id="expensesDistribution"
              label="Distribuição de Gastos"
              month={month}
              content={<PieChart data={expensesData} />}
            />
            <FinanceCard
              id="incomeSources"
              label="Fontes de Arrecadação"
              month={month}
              content={<PieChart data={incomeData} />}
            />
            {/* <FinanceCard
              id="meanDistribution"
              label="Distribuição média"
              month={month}
              content={<></>}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
