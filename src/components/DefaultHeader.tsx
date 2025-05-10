import { Link } from "react-router-dom";
import { DefaultButton } from "./DefaultButton";
import { DropDownMenu } from "./DropDownMenu";

export function DefaultHeader() {
  return (
    <div className="flex w-full justify-between">
      <div></div>
      <div className="flex gap-4">
        <Link to="/dishes">
          <DefaultButton className="rounded-2xl text-xs">PRATOS</DefaultButton>
        </Link>
        <DefaultButton className="rounded-2xl text-xs">
          RESTAURANTES
        </DefaultButton>
        <Link to="/about">
          <DefaultButton className="rounded-2xl text-xs">SOBRE</DefaultButton>
        </Link>
      </div>
      <DropDownMenu />
    </div>
  );
}
