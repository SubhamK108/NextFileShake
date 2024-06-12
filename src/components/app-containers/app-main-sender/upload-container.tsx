"use client";

import { AppState } from "@/services/app-state";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import ErrorContainer from "./error-container";
import { SpinnerLarge } from "@/components/spinner/spinner";
import { delay, formatBytes } from "@/lib/utils";
import { UploadedFile } from "@/models/uploaded-file";

interface UploadContainerProps {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
}

export default function UploadContainer({ appState, setAppState }: UploadContainerProps): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const maxSizeAllowed: number = 1024 * 1024 * 1024;
  const maxFilesAllowed: number = 100;

  async function uploadFiles(files: FileList | null): Promise<void> {
    if (files === null || files.length === 0) {
      return;
    }
    setIsLoading(true);
    await delay(700);

    if (files.length > maxFilesAllowed) {
      setErrorText("You can only upload 100 files at max!");
      setIsError(true);
      setIsLoading(false);
      return;
    }
    let totalSize: number = 0;
    let updatedFiles: UploadedFile[] = [];
    for (let i: number = 0; i < files.length; i++) {
      if (files.item(i) === null) {
        continue;
      }
      totalSize += files.item(i)!.size;
      if (totalSize > maxSizeAllowed) {
        setErrorText("You can only upload a total of 1GB of files at max!");
        setIsError(true);
        setIsLoading(false);
        setAppState((prev) => ({ ...prev, uploadedFiles: [] }));
        return;
      }
      updatedFiles.push({
        id: crypto.randomUUID(),
        fileBuffer: await files.item(i)!.arrayBuffer(),
        fileName: files.item(i)!.name,
        fileSize: formatBytes(files.item(i)!.size),
        fileExtension: files
          .item(i)!
          .name.slice(files.item(i)!.name.lastIndexOf(".") + 1)
          .toUpperCase(),
        fileType: files.item(i)!.type
      });
    }
    setAppState((prev) => ({ ...prev, uploadedFiles: updatedFiles, isUploadComplete: true }));
  }

  function tryAgainIfFailed(): void {
    setIsError(false);
  }

  if (!isLoading && !isError) {
    return (
      <div className="h-full w-full p-5 max-sm:p-4">
        <div className="h-full w-full rounded-3xl border-4 border-dashed border-[#074DA6] flex items-center justify-center text-center bg-transparent hover:bg-blue-300 dark:hover:bg-blue-950 relative shadow-inner">
          <div className="flex flex-col justify-center items-center text-center">
            <i className="text-[13rem] max-2xl:text-[11.5rem] max-sm:text-[8rem] mb-8 max-sm:mb-6 drop-shadow-xl dark:drop-shadow-2xl fa-solid fa-file-arrow-up"></i>
            <div className="text-[1.5rem] max-sm:text-[1.1rem]">
              <p>Drag & Drop</p>
              <p>OR</p>
              <p>Click To Upload</p>
              <p className="text-[1.3rem] max-sm:text-[1rem]">(Upto 1GB & 100 Files)</p>
            </div>
          </div>
          <input
            className="absolute w-full h-full opacity-0 cursor-pointer"
            type="file"
            title=""
            multiple={true}
            onChange={(e) => uploadFiles(e.target.files)}
          />
        </div>
      </div>
    );
  }

  if (!isLoading && isError) {
    return <ErrorContainer errorText={errorText} errorAction={tryAgainIfFailed} errorButtonText="Upload Again" />;
  }

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <SpinnerLarge />
      </div>
    );
  }

  return <></>;
}
