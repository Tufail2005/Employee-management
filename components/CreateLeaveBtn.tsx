// "use client";
// import { useState } from "react";
// import CreateLeave from "./CreateLeave";
// import Button from "./Button";

// export default function CreateLeaveBtn() {
//   const [isOpen, setIsopen] = useState(false);
//   return (
//     <div>
//       <Button
//         text="+ add Leave"
//         disabled={false}
//         type="button"
//         onClick={() => setIsopen(true)}
//       />
//       {isOpen && <CreateLeave setIsopen={setIsopen} />}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Button from "./Button";
import LeaveFormModel from "./LeaveFormModel"; // Reuse the same modal

export default function CreateLeaveBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        text="+ Add Leave"
        disabled={false}
        type="button"
        onClick={() => setIsOpen(true)}
      />

      <LeaveFormModel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
