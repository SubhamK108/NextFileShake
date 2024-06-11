import { ReactElement } from "react";

interface ErrorContainerProps {
  errorText: string;
  errorAction: () => void;
  errorButtonText: string;
}

export default function ErrorContainer({ errorText, errorAction, errorButtonText }: ErrorContainerProps): ReactElement {
  return (
    <div className="h-full w-full p-16 max-sm:p-8 flex flex-col justify-center items-center gap-8 max-2xl:gap-7 max-sm:gap-6">
      <p className="text-[1.8rem] max-2xl:text-[1.6rem] max-sm:text-[1.25rem] text-center">{errorText}</p>
      <button
        className="text-[1.3rem] max-2xl:text-[1.3rem] max-sm:text-[1.1rem] rounded-2xl shadow-md dark:shadow-lg bg-[#074DA6] dark:bg-[#05336E] hover:bg-[#05346e] dark:hover:bg-[#04234D] disabled:bg-zinc-400 dark:disabled:bg-zinc-800 hover:ring hover:ring-[#0091ff] dark:hover:ring-[#074DA6] disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600 px-6 max-sm:px-5 py-4 max-2xl:py-3 max-sm:py-3"
        onClick={errorAction}
      >
        {errorButtonText}
      </button>
    </div>
  );
}
