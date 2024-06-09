"use client";

import { AppState, initialAppState } from "@/services/app-state";
import { ReactElement, useState } from "react";
import SignInContainer from "../app-containers/app-main-sender/signin-container";

export default function AppMainSender(): ReactElement {
  const [appState, setAppState] = useState<AppState>({ ...initialAppState });

  if (!appState.isSignedIn) {
    return <SignInContainer appState={appState} setAppState={setAppState} />;
  } else {
    if (!appState.isUploadComplete) {
      return (
        <div>
          Signed in! Show the Upload Container
          <br></br>
          <button onClick={() => setAppState((prev) => ({ ...prev, userToken: "", isSignedIn: false }))}>Log Out</button>
        </div>
      );
    } else {
      if (!appState.isDriveUploadInitiated) {
        return <></>;
      } else {
        if (!appState.isDriveUploadComplete) {
          return <></>;
        } else {
          return <></>;
        }
      }
    }
  }
}
