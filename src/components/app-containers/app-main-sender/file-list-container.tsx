import { UploadedFile } from "@/models/uploaded-file";
import { AppState } from "@/services/app-state";
import { Dispatch, ReactElement, SetStateAction } from "react";
import ErrorContainer from "./error-container";
import { getFileIconStyle } from "@/lib/file-icon-parser";
import { firaCode } from "@/lib/fonts";

interface FileListContainerProps {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
}

export default function FileListContainer({ appState, setAppState }: FileListContainerProps): ReactElement {
  function deleteFile(file: UploadedFile): void {
    const updatedFiles: UploadedFile[] = appState.uploadedFiles.filter((f) => f !== file);
    setAppState((prev) => ({ ...prev, uploadedFiles: updatedFiles }));
  }

  function updateFileName(fileName: string): void {
    setAppState((prev) => ({ ...prev, finalZipFileName: fileName }));
  }

  function reUploadFiles(): void {
    setAppState((prev) => ({ ...prev, uploadedFiles: [], finalZipFileName: "", isUploadComplete: false }));
  }

  function initializeDriveUpload(): void {
    setAppState((prev) => ({ ...prev, isDriveUploadInitiated: true }));
  }

  if (appState.uploadedFiles.length > 0) {
    return (
      <div className="h-full w-full p-3 max-2xl:p-2 max-sm:p-2 flex flex-col justify-center items-center gap-5 max-sm:gap-4">
        <div className="h-[55%] pb-5 max-sm:pb-4 w-full flex flex-col gap-3 max-2xl:gap-2 max-sm:gap-2 overflow-y-auto">
          {appState.uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="table-row py-3 max-2xl:py-3 max-sm:py-2 px-[4%] max-2xl:px-[3%] max-sm:px-[6%] rounded-2xl shadow-md dark:shadow-lg bg-zinc-400 dark:bg-zinc-700"
            >
              <div className="flex items-center">
                <div className="table-cell w-[7%] max-sm:w-[10%] text-left">
                  <i
                    className={`text-[1.4rem] max-2xl:text-[1.2rem] max-sm:text-[1rem] drop-shadow-md dark:drop-shadow-lg ${getFileIconStyle(
                      file.fileExtension
                    )}`}
                  ></i>
                </div>
                <div className={`table-cell w-[77%] max-sm:w-[72%] text-left font-mono ${firaCode.variable}`}>
                  <div className="overflow-x-auto">
                    <p className="text-[1.2rem] max-2xl:text-[1.08rem] max-sm:text-[0.9rem]">{file.fileName}</p>
                  </div>
                  <p className="text-[0.95rem] max-2xl:text-[0.9rem] max-sm:text-[0.75rem]">
                    {file.fileSize} • {file.fileExtension}
                  </p>
                </div>
                <div className="table-cell w-[16%] max-sm:w-[18%] text-right">
                  <i
                    className="text-[1.4rem] max-2xl:text-[1.2rem] max-sm:text-[1rem] cursor-pointer hover:text-[#26272A] dark:hover:text-white drop-shadow-md dark:drop-shadow-lg fa-solid fa-trash-can"
                    title="Delete File"
                    onClick={() => deleteFile(file)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-[45%] w-full flex flex-col justify-end items-center gap-5 max-sm:gap-4">
          {appState.uploadedFiles.length > 1 && (
            <div className="h-full w-full flex flex-col justify-center items-center gap-2 max-sm:gap-1">
              <p className="text-[1.3rem] max-2xl:text-[1.1rem] max-sm:text-[0.95rem]">Filename of combined ZIP file:</p>
              <input
                className={`p-1 text-[1.3rem] max-2xl:text-[1.1rem] max-sm:text-[0.95rem] bg-[#F2F3F5] dark:bg-[#181818] text-[#404756] dark:text-[#ffffffa6] border border-[#AEAEAE] rounded-full font-mono ${firaCode.variable} w-[80%] max-sm:w-[90%] text-center focus:outline-none shadow-md dark:shadow-lg tracking-wider`}
                type="text"
                placeholder="Enter Filename..."
                value={appState.finalZipFileName}
                onInput={(e) => updateFileName(e.currentTarget.value)}
              />
            </div>
          )}
          <div className="h-full w-full flex flex-col justify-end items-center gap-2 max-sm:gap-1">
            <button
              className="text-[1.3rem] max-2xl:text-[1.3rem] max-sm:text-[1.1rem] rounded-2xl shadow-md dark:shadow-lg bg-green-700 dark:bg-green-900 hover:bg-green-900 dark:hover:bg-green-950 disabled:bg-zinc-400 dark:disabled:bg-zinc-900 hover:ring hover:ring-green-500 dark:hover:ring-green-700 disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600 px-6 max-sm:px-5 py-4 max-2xl:py-3 max-sm:py-3"
              disabled={appState.uploadedFiles.length > 1 && appState.finalZipFileName === ""}
              onClick={initializeDriveUpload}
            >
              <i className="mr-2 fa-solid fa-share-from-square"></i>Upload & Share
            </button>
            <div
              className="text-[2.4rem] max-2xl:text-[2.2rem] max-sm:text-[1.8rem] cursor-pointer hover:text-[#26272A] dark:hover:text-white drop-shadow-md dark:drop-shadow-lg"
              title="Start from scratch"
            >
              <i className="fa-solid fa-arrows-rotate" onClick={reUploadFiles}></i>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <ErrorContainer
        errorText="All files have been deleted, you have to upload again"
        errorAction={reUploadFiles}
        errorButtonText="Upload Again"
      />
    );
  }
}
