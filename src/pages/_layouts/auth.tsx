import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.png"

export function AuthLayout() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#F2F2F2]">
      <div className="w-full absolute h-25 bg-[#D9CBA3] top-0 flex items-center gap-4" >
        <img src={logo} alt="Logo" className="ml-8" />
        <h1 className="font-bold text-[#A38C6D] text-xl">CONCURSO GASTRONÔMICO</h1>
      </div>
      <div className="w-[500px] px-4">
        <Outlet />
      </div>
    </div>
  );
}
