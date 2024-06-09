import { ReactElement } from "react";

export function SpinnerLarge(): ReactElement {
  return (
    <div className="m-4 flex flex-row space-x-4 justify-center items-center">
      <div className="w-[5.5rem] h-[5.5rem] max-sm:w-[4.5rem] max-sm:h-[4.5rem] rounded-full animate-spin border-[6.5px] max-sm:border-[5px] border-solid border-current border-t-transparent"></div>
    </div>
  );
}

export function SpinnerSmall(): ReactElement {
  return (
    <div className="m-4 flex flex-row space-x-4 justify-center items-center">
      <div className="w-[2.5rem] h-[2.5rem] max-sm:w-[2.5rem] max-sm:h-[2.5rem] rounded-full animate-spin border-[0.3rem] max-sm:border-[0.25rem] border-solid border-current border-t-transparent"></div>
    </div>
  );
}
