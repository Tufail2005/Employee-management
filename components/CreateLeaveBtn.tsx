"use client";
import { useState } from "react";
import CreateLeave from "./CreateLeave";
import Button from "./Button";

export default function CreateLeaveBtn() {
  const [isOpen, setIsopen] = useState(false);
  return (
    <div>
      <Button
        text="+ add Leave"
        disabled={false}
        type="button"
        onClick={() => setIsopen(true)}
      />
      {isOpen && <CreateLeave setIsopen={setIsopen} />}
    </div>
  );
}
