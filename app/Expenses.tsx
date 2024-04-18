import React, { useEffect, useState } from "react";
import { Expense, api } from "./api";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const fetchExpenses = async () => {
    const fetchExpenses = await api.getExpenses();
    setExpenses(fetchExpenses);
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  if (!expenses) {
    return <p>Loading...</p>;
  }

  const handleDelete = (id: number) => {
    api.deleteExpense(id).then(fetchExpenses);
  };

  const handleAddExpense = async () => {
    if (name && cost) {
      await api.postExpenses({ name, cost: Number(cost), id: 0 });
      fetchExpenses();
      setName("");
      setCost("");
    }
  };

  return (
    <div className="m-10 w-fit">
      <div className="flex grid-cols-1 bg-yellow-400">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddExpense();
          }}
        >
          <div className="border-2 border-black rounded w-64 h-16 m-2">
            <label className="px-4 py-2">
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="ml-2 bg-yellow-200"
              />
            </label>
          </div>
          <div className="border-2 rounded border-black w-64 h-16 m-2">
            <label className="px-4 py-2">
              Cost:
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="ml-2 rounded border-black bg-yellow-200"
              />
            </label>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-black text-yellow-600 mt-0 m-2 pt-1"
          >
            Add Expense
          </button>
        </form>
        <div className="w-64 m-2">
          {expenses.map((expense) => (
            <div
              className="relative border 2 border-black bg-green-600 m-1"
              key={expense.id}
            >
              <button
                onClick={() => handleDelete(expense.id)}
                className="absolute right-0 top-0 p-1"
                style={{ cursor: "pointer" }}
              >
                x
              </button>
              <div className="p-2">
                <div>
                  <span className="underline">Name:</span> {expense.name}{" "}
                </div>
                <div>
                  <span className="underline">Cost:</span> {expense.cost}{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
