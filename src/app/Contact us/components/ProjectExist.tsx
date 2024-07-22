import React, { useEffect, useState } from "react";
import { SwipPage } from "./Welcome";
import { Button } from "@/components/ui/button";
import { TiArrowRight, TiArrowLeft } from "react-icons/ti";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ProjectExist: React.FC<SwipPage> = ({ onNext, onBack }) => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const userDataKey = "userData";
    const storedData = localStorage.getItem(userDataKey);
    if (storedData) {
      const userData = JSON.parse(storedData);
      if (userData.projectLink) {
        setMessage(userData.projectLink);
      }
    }
  }, []);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = event.target.value;
    setMessage(newMessage);

    const userDataKey = "userData";
    const storedData = localStorage.getItem(userDataKey);
    const userData = storedData ? JSON.parse(storedData) : {};
    userData.projectLink = newMessage;
    localStorage.setItem(userDataKey, JSON.stringify(userData));
  };

  return (
    <div className="flex flex-col gap-5 max-w-[450px]">
      <div>
        <h1 className="text-4xl font-semibold mb-1">
          Do you already have a website?
        </h1>
        <p>Please enter the link to your current website (if available)</p>
      </div>

      <div className="grid w-full gap-1.5 my-6">
        <Label htmlFor="message-2">Link to your current website</Label>
        <Input
          placeholder="https://"
          id="message-2"
          className="py-5"
          value={message}
          onChange={handleTextareaChange}
        />
      </div>
      <div className="flex justify-end gap-5">
        <Button
          className="px-6 py-6 rounded-full flex items-center gap-1 transition-all duration-200 ease-in-out hover:transform hover:scale-[0.9]"
          onClick={onBack}
          variant={"secondary"}
        >
          <TiArrowLeft size={22} />
          <span>Back</span>
        </Button>
        <Button
          className="px-6 py-6 rounded-full flex items-center gap-1 transition-all duration-200 ease-in-out hover:transform hover:scale-[0.9]"
          onClick={onNext}
        >
          <span>Next</span> <TiArrowRight size={22} />
        </Button>
      </div>
    </div>
  );
};
