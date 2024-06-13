import AppMain from "@/components/app-main/app-main";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <AppMain>
      <div className="h-full w-full p-8 max-2xl:p-7 max-sm:p-5 flex flex-col justify-center items-center gap-5 max-2xl:gap-5 max-sm:gap-5 overflow-y-auto">
        <p className="h-[15%] text-[1.6rem] max-2xl:text-[1.45rem] max-sm:text-[1.1rem] font-sans">
          Q. Is the app free? Are there any restrictions?
        </p>
        <p className="h-[85%] text-[1.3rem] max-2xl:text-[1.25rem] max-sm:text-[1.05rem] font-sans">
          A. FileShake is completely free & open-source, you can use it however you want. And as far as restrictions go, at
          once at a single time, you can only share upto 100 files totalling upto 1GB, but you can share unlimited number of
          times if you want to share even more files.
        </p>
      </div>
    </AppMain>
  );
}
