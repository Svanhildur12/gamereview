import React, { createContext, useContext, useEffect, useState } from "react";
import { Expense, api } from "./api";

const AdminRightsContext = createContext(createContext);

export const AdminButton = () => {
  const [toggleAdmin, setToggleAdmin] = useState(false);

  const handleToggleAdminButton = () => {
    setToggleAdmin(!toggleAdmin);
  };

  return (
    <>
      <div>
        <button
          onClick={handleToggleAdminButton}
          className="border-2 rounded-md border-black bg-green-500 mt-2 ml-10"
        >
          Admin mode: {toggleAdmin ? "Off" : "On"}
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

const Expense = ({
  expense,
  onDelete,
}: {
  expense: Expense;
  onDelete: (id: number) => void;
}) => {
  return (
    <div>
      <div className="text-center" key={expense.id}>
        <>
          <button onClick={() => onDelete(expense.id)} />
        </>
      </div>
    </div>
  );
};

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [showDeleteButton, setShowDeleteButton] = useState(true);
  const [toggleAdmin] = useState(false);

  const adminModeOnOff = () => {
    if (toggleAdmin === true) {
      showDeleteButton;
    }
  };

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
    <div className="m-10">
      <>
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
                <div
                  className="border 2 border-black bg-green-600 m-1"
                  key={expense.id}
                >
                  {showDeleteButton ? (
                    <button
                      onChange={adminModeOnOff}
                      onClick={() => handleDelete(expense.id)}
                      className="relative m-1 text-sm font-bold border-2 border-black w-8 bg-red-600"
                    >
                      x
                    </button>
                  ) : null}
                  <div
                    className="relative border-2 border-black bg-green-600 m-1"
                    key={expense.id}
                  >
                    <div className="p-2">
                      <div>
                        <span className="underline">Name:</span> {expense.name}{" "}
                      </div>
                      <div>
                        <span className="underline">Cost:</span> {expense.cost}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Expenses;
