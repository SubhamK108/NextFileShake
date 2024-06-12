"use client";

import { delay } from "@/lib/utils";
import { ReactElement, useEffect } from "react";

export default function SignInButton(): ReactElement {
  async function addNewGoogleSignInScript(): Promise<void> {
    const prevScript: HTMLElement | null = document.getElementById("google-signin-script");
    if (prevScript !== null) {
      document.body.removeChild(prevScript);
    }
    const newScript: HTMLScriptElement = document.createElement("script");
    newScript.id = "google-signin-script";
    newScript.src = "https://accounts.google.com/gsi/client";
    newScript.async = true;

    await delay(700);
    document.getElementById("google-signin-button-loader")!.hidden = true;
    document.body.appendChild(newScript);
  }

  useEffect(() => {
    addNewGoogleSignInScript();
  }, []);

  return (
    <div style={{ colorScheme: "light" }}>
      <div style={{ colorScheme: "light" }}>
        <div
          id="g_id_onload"
          data-client_id={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
          data-callback="handleCredentialResponse"
          data-auto_prompt="true"
          data-itp_support="true"
          data-use_fedcm_for_prompt="true"
        ></div>
      </div>
      <div className="g_id_signin" data-shape="pill" data-theme="outline" data-size="large" data-width={180}></div>
    </div>
  );
}
