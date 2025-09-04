import React from "react";
import { FaGamepad, FaMusic } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaPeopleLine } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa";
import { IconType } from "react-icons";
type Props = {
  icon: string;
};
type MenuItem = {
  label: string;
  icon: IconType;
};
function QuickSearchComponent() {
  const icons: Record<string, MenuItem> = {
    music: { label: "Music", icon: FaMusic },
    nightLife: { label: "Nightlife", icon: FaMicrophone },
    Performing: { label: "Visual Arts", icon: FaPeopleLine },
    Holidays: { label: "Food & Drink", icon: FaCalendarDay },
    Hobbies: { label: "Hobbies", icon: FaGamepad },
    Food: { label: "Food & Drink", icon: FaGamepad },
  };
  return (
    <div className=" flex  gap-14 ">
      {Object.keys(icons).map((key) => {
        console.log(key)
        const item = icons[key as keyof typeof icons];
        const Icon = item.icon;
        console.log(item)

        // const real = icon === Icon.

        return (
            <div key={key} className="flex flex-col justify-center items-center gap-2 ">
             <div
            key={key}
            className=" mt-10 flex  justify-center items-center border-2 rounded-[70px] border-gray-200/50 p-10"
          >
            <div>   
              {" "}
              <Icon size={24} />
            </div>
          </div>
          <div>
            <span className=" w-1.5 text-center break-words">{item.label==="performing & Visual Arts"?<span>performing & <br/> Visual Arts</span>:item.label}</span>
          </div>
            </div>
         
        );
      })}
    </div>
  );
}

export default QuickSearchComponent;
