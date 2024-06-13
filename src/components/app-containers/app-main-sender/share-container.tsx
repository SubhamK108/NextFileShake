"use client";

import { SpinnerLarge } from "@/components/spinner/spinner";
import { firaCode } from "@/lib/fonts";
import { AppState, initialAppState } from "@/services/app-state";
import Image from "next/image";
import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";

interface ShareContainerProps {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
}

export default function ShareContainer({ appState, setAppState }: ShareContainerProps): ReactElement {
  const [isCopyToClipboardDone, setIsCopyToClipboardDone] = useState<boolean>(false);
  const [isQRCodeLoaded, setIsQRCodeLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setIsQRCodeLoaded(true), 1500);
  }, []);

  function copyToClipboard(): void {
    navigator.clipboard.writeText(appState.finalDownloadLink);
    setIsCopyToClipboardDone(true);
    setTimeout(() => setIsCopyToClipboardDone(false), 2500);
  }

  function activateShareUI(): void {
    const shareData: ShareData = {
      title: "FileShake",
      text: "Share files with ease.",
      url: appState.finalDownloadLink
    };
    navigator.share(shareData);
  }

  function refreshApp(): void {
    setAppState({ ...initialAppState });
  }

  return (
    <div className="h-full w-full p-5 max-sm:p-4 flex flex-col justify-center items-center gap-8 max-2xl:gap-7 max-sm:gap-2">
      <div className="h-[30%] w-full flex flex-col justify-center items-center gap-5 max-2xl:gap-4 max-sm:gap-3">
        <input
          type="text"
          readOnly
          className={`p-4 max-2xl:p-3 max-sm:p-2 text-[1.3rem] max-2xl:text-[1.1rem] max-sm:text-[0.95rem] bg-[#F2F3F5] dark:bg-[#181818] text-[#404756] dark:text-[#ffffffa6] border border-[#AEAEAE] rounded-full font-mono ${firaCode.variable} w-full text-center focus:outline-none shadow-md dark:shadow-lg tracking-wider cursor-pointer`}
          value={appState.finalDownloadLink}
          onClick={(e) => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)}
        />
        <div className="flex flex-row justify-center items-center gap-6 max-2xl:gap-5 max-sm:gap-4">
          <button
            className="h-[4.7rem] w-[4.7rem] max-2xl:h-[3.8rem] max-2xl:w-[3.8rem] max-sm:h-[3rem] max-sm:w-[3rem] rounded-full shadow-md dark:shadow-lg bg-green-700 dark:bg-green-900 hover:bg-green-900 dark:hover:bg-green-950 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 hover:ring hover:ring-green-500 dark:hover:ring-green-700 disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600"
            title={isCopyToClipboardDone ? "Copied link to clipboard" : "Copy link to clipboard"}
            onClick={copyToClipboard}
          >
            {isCopyToClipboardDone ? (
              <i className="max-2xl:pt-1 max-sm:pt-1 text-[2.6rem] max-2xl:text-[2.2rem] max-sm:text-[1.7rem] fa-solid fa-check"></i>
            ) : (
              <i className="max-2xl:pt-1 max-sm:pt-1 text-[2.1rem] max-2xl:text-[1.7rem] max-sm:text-[1.3rem] fa-solid fa-copy"></i>
            )}
          </button>
          <button
            className="h-[4.7rem] w-[4.7rem] max-2xl:h-[3.8rem] max-2xl:w-[3.8rem] max-sm:h-[3rem] max-sm:w-[3rem] rounded-full shadow-md dark:shadow-lg bg-green-700 dark:bg-green-900 hover:bg-green-900 dark:hover:bg-green-950 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 hover:ring hover:ring-green-500 dark:hover:ring-green-700 disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600"
            title="Share link"
            onClick={activateShareUI}
          >
            <i className="max-2xl:pt-1 max-sm:pt-1 text-[2.3rem] max-2xl:text-[1.9rem] max-sm:text-[1.5rem] fa-solid fa-share-nodes"></i>
          </button>
          <button
            className="h-[4.7rem] w-[4.7rem] max-2xl:h-[3.8rem] max-2xl:w-[3.8rem] max-sm:h-[3rem] max-sm:w-[3rem] rounded-full shadow-md dark:shadow-lg bg-[#074DA6] dark:bg-[#05336E] hover:bg-[#05346e] dark:hover:bg-[#04234D] disabled:bg-zinc-400 dark:disabled:bg-zinc-800 hover:ring hover:ring-[#0091ff] dark:hover:ring-[#074DA6] disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600"
            title="Start from scratch"
            onClick={refreshApp}
          >
            <i className="max-2xl:pt-1 max-sm:pt-1 text-[2.3rem] max-2xl:text-[1.9rem] max-sm:text-[1.5rem] fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
      </div>
      <div className="h-[60%] w-full flex flex-col justify-center items-center gap-5 max-sm:gap-4">
        <p className="text-[1.3rem] max-2xl:text-[1.1rem] max-sm:text-[0.95rem]">You can also share this QR Code:</p>
        <div className="bg-white text-[#404756] rounded-3xl p-6 max-2xl:p-5 max-sm:p-4 border border-[#AEAEAE] shadow-md dark:shadow-lg pointer-events-none">
          <Image
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${appState.finalDownloadLink}`}
            width={224}
            height={224}
            alt="Share QR Code"
            loading="eager"
            priority={true}
            quality={100}
            className={`${
              isQRCodeLoaded ? "" : "hidden"
            } h-[14rem] w-[14rem] max-2xl:h-[12rem] max-2xl:w-[12rem] max-sm:h-[9rem] max-sm:w-[9rem]`}
          />
          <div
            className={`${
              isQRCodeLoaded ? "hidden" : ""
            } h-[14rem] w-[14rem] max-2xl:h-[12rem] max-2xl:w-[12rem] max-sm:h-[9rem] max-sm:w-[9rem] flex justify-center items-center`}
          >
            <SpinnerLarge />
          </div>
        </div>
      </div>
    </div>
  );
}
