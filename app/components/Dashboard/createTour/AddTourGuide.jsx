"use client";
import {
  MenuHandler,
  Menu,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";

export default function AddTourGuide() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  return (
    <>
      <Menu
        placement="bottom-start"
        open={isMenuOpen}
        handler={(value) => (value === true ? setIsMenuOpen(value) : null)}
      >
        <MenuHandler>
          <Button className=" hover:shadow-none shadow-none text-start w-full bg-senseWhite rounded-none text-shadeBlack normal-case px-3 font-normal text-sm">
            Select tour guides
          </Button>
        </MenuHandler>

        <MenuList className="w-[350px]">
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
          <div className=" bg-pink-100 w-full">
            <Button onClick={() => setIsMenuOpen(false)}>Add</Button>
          </div>
        </MenuList>
      </Menu>
    </>
  );
}
