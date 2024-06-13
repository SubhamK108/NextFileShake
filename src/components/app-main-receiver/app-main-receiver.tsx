"use client";

import { decryptCaesarCipher, delay } from "@/lib/utils";
import { verifySharedFile } from "@/services/drive-service";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import DownloadContainer from "../app-containers/app-main-receiver/download-container";
import DownloadErrorContainer from "../app-containers/app-main-receiver/download-error-container";
import DownloadLoaderContainer from "../app-containers/app-main-receiver/download-loader-container";

interface AppMainReceiverProps {
  shareKey: string[];
}

export default function AppMainReceiver({ shareKey }: AppMainReceiverProps): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const fileId = useRef<string>("");
  const fileName = useRef<string>("");
  const fileSize = useRef<string>("");
  const fileExtension = useRef<string>("");
  const downloadLink = useRef<string>("");

  const verifyFileCached = useCallback(verifyFile, [shareKey]);

  useEffect(() => {
    verifyFileCached();
  }, [verifyFileCached]);

  async function verifyFile(): Promise<void> {
    try {
      if (shareKey.length !== 2) {
        throw new Error("Invalid download link!");
      }
      const downloadKey: string = shareKey[0];
      const key: number = parseInt(shareKey[1]);
      const downloadKeys: string[] = decryptCaesarCipher(downloadKey, key).split("%26");
      if (downloadKeys.length !== 4) {
        throw new Error("Invalid download link!");
      }
      const isValidFile: boolean = await verifySharedFile(downloadKeys[0]);
      if (isValidFile) {
        fileId.current = downloadKeys[0];
        fileName.current = decodeURI(downloadKeys[1]);
        fileSize.current = decodeURI(downloadKeys[2]);
        fileExtension.current = downloadKeys[3];
        downloadLink.current = `https://drive.google.com/uc?id=${fileId.current}&export=download`;
      } else {
        throw new Error("Invalid download link!");
      }
    } catch {
      setIsError(true);
    }
    await delay(1500);
    setIsLoading(false);
  }

  if (!isLoading && !isError) {
    return (
      <DownloadContainer
        fileName={fileName.current}
        fileSize={fileSize.current}
        fileExtension={fileExtension.current}
        downloadLink={downloadLink.current}
      />
    );
  }

  if (!isLoading && isError) {
    return <DownloadErrorContainer />;
  }

  if (isLoading) {
    return <DownloadLoaderContainer />;
  }

  return <></>;
}
