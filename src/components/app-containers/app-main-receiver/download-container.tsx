import { getFileIconStyle } from "@/lib/file-icon-parser";
import { firaCode } from "@/lib/fonts";
import Link from "next/link";
import { ReactElement } from "react";

interface DownloadContainerProps {
  fileName: string;
  fileSize: string;
  fileExtension: string;
  downloadLink: string;
}

export default function DownloadContainer({
  fileName,
  fileSize,
  fileExtension,
  downloadLink
}: DownloadContainerProps): ReactElement {
  return (
    <div className="h-full w-full p-5 max-sm:p-4 flex flex-col justify-center items-center gap-5 max-sm:gap-4">
      <div className="h-[70%] w-full flex flex-col justify-center items-center gap-5 max-2xl:gap-5 max-sm:gap-4">
        <i
          className={`text-[14rem] max-2xl:text-[11rem] max-sm:text-[8.5rem] drop-shadow-lg dark:drop-shadow-2xl ${getFileIconStyle(
            fileExtension
          )}`}
        ></i>
        <div
          className={`max-w-full font-mono ${firaCode.variable} flex flex-col justify-center items-center text-center py-3 max-2xl:py-3 max-sm:py-2 px-[4%] max-2xl:px-[3%] max-sm:px-[6%] rounded-3xl max-sm:rounded-2xl shadow-lg dark:shadow-2xl bg-zinc-400 dark:bg-zinc-700 gap-2 max-sm:gap-1`}
        >
          <div className="max-w-full overflow-x-auto">
            <p className="text-[1.4rem] max-2xl:text-[1.15rem] max-sm:text-[1rem]">{fileName}</p>
          </div>
          <p className="text-[1.2rem] max-2xl:text-[1.05rem] max-sm:text-[0.9rem]">
            {fileSize} • {fileExtension}
          </p>
        </div>
      </div>
      <div className="h-[30%] w-full flex flex-col justify-center items-center gap-5 max-2xl:gap-5 max-sm:gap-4">
        <a download={fileName} href={downloadLink} target="_blank">
          <button className="text-[1.3rem] max-2xl:text-[1.3rem] max-sm:text-[1.1rem] rounded-2xl shadow-lg dark:shadow-2xl bg-green-700 dark:bg-green-900 hover:bg-green-900 dark:hover:bg-green-950 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 hover:ring hover:ring-green-500 dark:hover:ring-green-700 disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600 px-6 max-sm:px-5 py-4 max-2xl:py-3 max-sm:py-3">
            <i className="mr-2 fa-solid fa-download"></i>Download File
          </button>
        </a>
        <Link href="/" replace={false}>
          <button className="text-[1.3rem] max-2xl:text-[1.3rem] max-sm:text-[1.1rem] rounded-2xl shadow-lg dark:shadow-2xl bg-[#074DA6] dark:bg-[#05336E] hover:bg-[#05346e] dark:hover:bg-[#04234D] disabled:bg-zinc-400 dark:disabled:bg-zinc-800 hover:ring hover:ring-[#0091ff] dark:hover:ring-[#074DA6] disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600 px-6 max-sm:px-5 py-4 max-2xl:py-3 max-sm:py-3">
            Share Your Own Files
          </button>
        </Link>
      </div>
    </div>
  );
}
