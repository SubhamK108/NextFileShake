"use client";

import { AppState, initialAppState } from "@/services/app-state";
import { Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import ErrorContainer from "./error-container";
import { firaCode } from "@/lib/fonts";
import { delay } from "@/lib/utils";
import { checkForUploadFolder, createUploadFolder, uploadFile } from "@/services/drive-service";
import JSZip from "jszip";

interface DriveUploadContainerProps {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
}

export default function DriveUploadContainer({ appState, setAppState }: DriveUploadContainerProps): ReactElement {
  const ranUseEffect = useRef<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const startProgressTimerCached = useCallback(startProgressTimer, [setAppState]);
  const startFileUploadCached = useCallback(startFileUpload, [appState.userToken, startProgressTimerCached]);
  const processDriveUploadCached = useCallback(processDriveUpload, [appState.userToken, setAppState, startFileUploadCached]);
  const startDriveUploadCached = useCallback(startDriveUpload, [
    appState.finalZipFileName,
    appState.uploadedFiles,
    processDriveUploadCached,
    setAppState
  ]);

  useEffect(() => {
    if (ranUseEffect.current || process.env.NODE_ENV !== "development") {
      startDriveUploadCached();
    }
    ranUseEffect.current = true;
  }, [startDriveUploadCached]);

  async function startDriveUpload(): Promise<void> {
    if (appState.uploadedFiles.length > 1) {
      setAppState((prev) => ({ ...prev, progressInfo: "Zipping your files..." }));
      await delay(1500);

      const zip: JSZip = new JSZip();
      for (const file of appState.uploadedFiles) {
        zip.file(file.fileName, file.fileBuffer, { binary: true });
      }
      const compressedBuffer: ArrayBuffer = await zip.generateAsync({ type: "arraybuffer", mimeType: "application/zip" });
      await processDriveUploadCached(compressedBuffer, `${appState.finalZipFileName}.zip`, "application/zip");
    } else {
      await processDriveUploadCached(
        appState.uploadedFiles[0].fileBuffer,
        appState.uploadedFiles[0].fileName,
        appState.uploadedFiles[0].fileType
      );
    }
  }

  async function processDriveUpload(fileBuffer: ArrayBuffer, fileName: string, fileType: string): Promise<void> {
    setAppState((prev) => ({ ...prev, progressInfo: "Uploading: 0%" }));

    let folderId: string = await checkForUploadFolder(appState.userToken);
    if (folderId === "Error") {
      setIsError(true);
      return;
    } else if (folderId === "") {
      folderId = await createUploadFolder(appState.userToken);
      if (folderId === "Error") {
        setIsError(true);
        return;
      }
    }
    const downloadLink: string = await startFileUploadCached(fileBuffer, fileName, fileType, folderId);
    if (downloadLink === "Error") {
      setIsError(true);
    } else {
      setAppState((prev) => ({ ...prev, progressInfo: "Uploading: 100%" }));
      await delay(1500);

      setAppState((prev) => ({ ...prev, progressInfo: "Almost done..." }));
      await delay(2000);

      setAppState((prev) => ({ ...prev, finalDownloadLink: downloadLink, isDriveUploadComplete: true }));
    }
  }

  async function startFileUpload(
    fileBuffer: ArrayBuffer,
    fileName: string,
    fileType: string,
    folderId: string
  ): Promise<string> {
    const interval: NodeJS.Timeout = startProgressTimerCached(fileBuffer.byteLength);
    const uploadResult: string = await uploadFile(appState.userToken, fileBuffer, fileName, fileType, folderId);
    clearInterval(interval);
    return uploadResult;
  }

  function startProgressTimer(fileSize: number): NodeJS.Timeout {
    const uploadSpeed: number = 512000;
    const estimatedTime: number = (fileSize / uploadSpeed) * 100;
    const intervalTime: number = Math.min(estimatedTime / 100, 1000);
    const startTime: number = Date.now();
    const interval: NodeJS.Timeout = setInterval(() => {
      const elapsedTime: number = Date.now() - startTime;
      const progressPercent: number = Math.min(Math.round((elapsedTime / estimatedTime) * 100), 100);
      setAppState((prev) => ({ ...prev, progressInfo: `Uploading: ${progressPercent}%` }));
      if (progressPercent >= 100) {
        clearInterval(interval);
      }
    }, intervalTime);
    return interval;
  }

  function tryAgainIfFailed(): void {
    setAppState({ ...initialAppState });
  }

  if (!isError) {
    return (
      <div className="h-full w-full p-5 max-sm:p-4 flex flex-col justify-center items-center gap-5">
        <div className="h-[15%] w-full flex flex-col justify-center items-center animate-pulse">
          <p
            className={`text-[2rem] max-2xl:text-[1.8rem] max-sm:text-[1.3rem] text-center font-mono ${firaCode.variable} tracking-wide`}
          >
            {appState.progressInfo}
          </p>
        </div>
        <div className="h-[85%] w-full flex flex-col justify-center items-center">
          <div className="animate-bounce">
            <i className="text-[14rem] max-2xl:text-[11rem] max-sm:text-[8.5rem] mb-8 max-2xl:mb-5 max-sm:mb-5 drop-shadow-xl dark:drop-shadow-2xl fa-solid fa-cloud-arrow-up"></i>
          </div>
          <div className="text-[1.5rem] max-sm:text-[1.1rem] text-center">
            <p>
              Preparing your {appState.uploadedFiles.length > 1 ? "files" : "file"} for sharing, this might take some time
              depending on the total size & the internet speed, so hold tight!
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <ErrorContainer
        errorText="A problem occurred while uploading & sharing your file, please try again."
        errorAction={tryAgainIfFailed}
        errorButtonText="Try Again"
      />
    );
  }
}
