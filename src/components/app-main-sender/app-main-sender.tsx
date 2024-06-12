"use client";

import { AppState, initialAppState } from "@/services/app-state";
import { ReactElement, useState } from "react";
import SignInContainer from "../app-containers/app-main-sender/signin-container";
import UploadContainer from "../app-containers/app-main-sender/upload-container";
import FileListContainer from "../app-containers/app-main-sender/file-list-container";
import DriveUploadContainer from "../app-containers/app-main-sender/drive-upload-container";

export default function AppMainSender(): ReactElement {
  const [appState, setAppState] = useState<AppState>({ ...initialAppState });

  if (!appState.isSignedIn) {
    return <SignInContainer appState={appState} setAppState={setAppState} />;
  } else {
    if (!appState.isUploadComplete) {
      return <UploadContainer appState={appState} setAppState={setAppState} />;
    } else {
      if (!appState.isDriveUploadInitiated) {
        return <FileListContainer appState={appState} setAppState={setAppState} />;
      } else {
        if (!appState.isDriveUploadComplete) {
          return <DriveUploadContainer appState={appState} setAppState={setAppState} />;
        } else {
          return <>Share Container</>;
        }
      }
    }
  }
}
