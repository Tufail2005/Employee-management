"use client";
import { useState } from "react";
import CreateEmployeeForm from "./createEmployee";

export default function CreateEmpBtn() {
  const [isOpen, setIsopen] = useState(false);

  return (
    <div>
      <button
        className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-md font-medium transition-colors mb-6 hover:cursor-pointer"
        onClick={() => {
          setIsopen(true);
        }}
      >
        <span className="text-lg">+</span>
        Create Employee
      </button>

      {isOpen && <CreateEmployeeForm setIsopen={setIsopen} />}
    </div>
  );
}
