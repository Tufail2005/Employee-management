"use client";
import { useState } from "react";
import HolidayFormModel from "./HolidayFormModel";
import Button from "./Button";

export default function () {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button
        text="+ add Holiday"
        disabled={false}
        type="button"
        onClick={() => setIsOpen(true)}
      />
      <HolidayFormModel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
