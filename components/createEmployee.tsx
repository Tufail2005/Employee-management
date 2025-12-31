// 

"use client"

import { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

export default function CreateEmployeeForm() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [qualification, setQualification] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 p-6">
                    <h2 className="text-2xl font-bold text-white">Create Employee Profile</h2>
                    <p className="text-blue-100 text-sm">Fill in the details to register a new employee.</p>
                </div>

                {/* Form Content */}
                <form className="p-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Left Column */}
                        <div className="space-y-4">
                            <Input label="Full Name" type="text" placeholder="John Doe" value={name} onChangeState={setName} />
                            <Input label="Phone Number" type="number" placeholder="9876543210" value={number} onChangeState={setNumber} />
                            <Select label="Gender" value={gender} options={["male", "female"]} onChangeState={setGender} />
                            <Input label="Email Address" type="email" placeholder="noor@gmail.com" value={email} onChangeState={setEmail} />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <Input label="Password" type="password" placeholder="••••••••" value={password} onChangeState={setPassword} />
                            <Input label="Date of Birth" type="date" placeholder="" value={dob} onChangeState={setDob} />
                            <Input label="Qualification" type="text" placeholder="BBA / MBA / B.Tech" value={qualification} onChangeState={setQualification} />
                            <Input label="Pin Code" type="text" placeholder="783030" value={pincode} onChangeState={setPincode} />
                        </div>

                        {/* Full Width Section */}
                        <div className="md:col-span-2">
                            <Input label="Home Address" type="description" placeholder="Street name, Apartment, City, State" value={address} onChangeState={setAddress} />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-10 flex justify-end border-t border-gray-100 pt-6">
                        <Button text="Register Employee" />
                    </div>
                </form>
            </div>
        </div>
    );
}