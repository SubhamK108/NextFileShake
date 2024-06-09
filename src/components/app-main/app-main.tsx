import { ReactElement, ReactNode } from "react";

interface AppMainProps {
  children: ReactNode;
}

export default function AppMain({ children }: AppMainProps): ReactElement {
  return (
    <div className="h-full mt-[5%] max-2xl:mt-[5%] max-sm:mt-[12%] flex flex-col justify-center items-center gap-6 max-sm:gap-5">
      <div className="p-4 max-sm:p-3 bg-zinc-300 dark:bg-zinc-800 rounded-3xl max-sm:rounded-2xl shadow-xl dark:shadow-2xl">
        <p className="font-sans text-7xl max-sm:text-4xl tracking-widest">FileShake</p>
      </div>
      <div className="h-[40rem] w-[30%] max-2xl:h-[33rem] max-2xl:w-[65%] max-sm:h-[28rem] max-sm:w-[85%] bg-zinc-300 dark:bg-zinc-800 rounded-3xl shadow-xl dark:shadow-2xl">
        {children}
      </div>
      <div className="text-center mb-1">
        <p className="px-20 max-sm:text-[0.9rem] font-sans">
          {"Made with ❤️ by "}
          <a
            href="https://www.subhamk.com/"
            target="_blank"
            className="underline hover:text-[#26272A] dark:hover:text-white"
          >
            Subham K.
          </a>
        </p>
      </div>
    </div>
  );
}
