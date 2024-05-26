import { getPathnameInfoString } from "@/shared/utils";
import { useLocation } from "react-router-dom";

export const PageInfo = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-page h-10 flex justify-center items-center text-secondary">
      {pathname === '/' ? 'Главная страница' : getPathnameInfoString(pathname)}
    </div>
  )
}

