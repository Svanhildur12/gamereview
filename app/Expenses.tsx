import React, { useEffect, useState } from "react";

type Expense = {
  id: number;
  name: string;
  cost: number;
};

const ExpensesDisplay: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/expenses");
      if (!res.ok) throw new Error("Failed to fetch data");
      const data: Expense[] = await res.json();
      setExpenses(data);
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {expenses.map((expense) => (
        <div
          key={expense.id}
          style={{ border: "1px solid #ccc", borderRadius: "8px" }}
        >
          <h1>{expense.name}</h1>
          <p>${expense.cost / 100}</p>
        </div>
      ))}
    </div>
  );
};

export default ExpensesDisplay;
