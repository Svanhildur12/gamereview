"use client";
import React, { useContext, useEffect, useState } from "react";
import { Expense, api } from "./api";
import { AdminRightsContext } from "./AdminRightsContext";

const AdminButton = () => {
  const { toggleAdmin, value } = useContext(AdminRightsContext);

  return (
    <>
      <div>
        <button
          onClick={toggleAdmin}
          className="border-2 rounded-md border-black bg-green-500 mt-2 ml-10"
        >
          Admin mode: {value ? "ON" : "OFF"}
        </button>
      </div>
    </>
  );
};

const HeaderComponent = () => {
  return (
    <div className="m-10">
      <AdminButton />
    </div>
  );
};
type ExpenseItemProps = {
  expense: Expense;
  onDelete: (id: number) => void;
  showDeleteButton: boolean;
};

const ExpenseItem = ({
  expense,
  onDelete,
  showDeleteButton,
}: ExpenseItemProps) => {
  return (
    <div className="relative border-2 border-black bg-green-600 m-1">
      {showDeleteButton && (
        <button
          onClick={() => onDelete(expense.id)}
          className="relative m-1 text-sm font-bold border-2 border-black w-8 bg-red-600"
        >
          x
        </button>
      )}
      <div className="p-2">
        <div>
          <span className="underline">Name:</span> {expense.name}{" "}
        </div>
        <div>
          <span className="underline">Cost:</span> {expense.cost}{" "}
        </div>
      </div>
    </div>
  );
};

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [value, setValue] = useState<boolean>(false);

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

  const toggleAdmin = () => {
    setValue((v) => !v);
  };

  const contextProviderValue = {
    value,
    toggleAdmin,
  };

  return (
    <>
      <div className="m-10">
        <AdminRightsContext.Provider value={contextProviderValue}>
          <HeaderComponent />
          <div className="mt-5 ml-10 w-fit">
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
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onDelete={handleDelete}
                    showDeleteButton={value}
                  />
                ))}
              </div>
            </div>
          </div>
        </AdminRightsContext.Provider>
      </div>
    </>
  );
};

export default Expenses;
