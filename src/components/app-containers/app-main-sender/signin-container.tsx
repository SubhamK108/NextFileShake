"use client";

import SignInButton from "@/components/signin-button/signin-button";
import { SpinnerLarge, SpinnerSmall } from "@/components/spinner/spinner";
import { delay } from "@/lib/utils";
import { AppState } from "@/services/app-state";
import { Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

interface SignInContainerProps {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
}

export default function SignInContainer({ appState, setAppState }: SignInContainerProps): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const isUserSignedIN = useRef<boolean>(false);

  const startSignInCached = useCallback(startSignIn, [setAppState]);

  useEffect(() => {
    startSignInCached();
  }, [startSignInCached]);

  async function startSignIn(): Promise<void> {
    sessionStorage.setItem("CLIENT_ID", process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID!);
    let userToken: string | null = sessionStorage.getItem("USER_GOOGLE_AUTH_TOKEN");
    while (userToken === null || userToken === "") {
      if (isUserSignedIN.current) {
        sessionStorage.removeItem("CLIENT_ID");
        return;
      }
      await delay(1000);
      userToken = sessionStorage.getItem("USER_GOOGLE_AUTH_TOKEN");
    }
    setLoading(true);
    isUserSignedIN.current = true;
    sessionStorage.removeItem("CLIENT_ID");
    sessionStorage.removeItem("USER_GOOGLE_AUTH_TOKEN");
    await delay(1000);

    setAppState((prev) => ({ ...prev, userToken: userToken, isSignedIn: true }));
  }

  if (!loading) {
    return (
      <div className="h-full w-full p-16 max-sm:p-8 flex flex-col justify-center items-center gap-5">
        <div className="flex flex-col justify-center items-center text-center gap-20 max-2xl:gap-12 max-sm:gap-10">
          <p className="text-[1.8rem] max-2xl:text-[1.6rem] max-sm:text-[1.25rem]">
            FileShake uses your personal Google Drive storage to share files. All shared files will be stored in the{" "}
            <i>{'"FileShake"'}</i> folder, and <b>only these files</b> will be accessible to FileShake, nothing else.
          </p>
          <div className="flex flex-col justify-center items-center text-center gap-5 max-2xl:gap-5 max-sm:gap-3">
            <p className="text-[1.3rem] max-2xl:text-[1.1rem] max-sm:text-[0.95rem]">
              Sign in to proceed, and make sure to allow the pop-ups:
            </p>
            <div className="h-12 flex justify-center items-center">
              <div id="google-signin-button-loader">
                <SpinnerSmall />
              </div>
              <SignInButton />
            </div>
            <div className="max-sm:text-[0.9rem] font-sans flex flex-row justify-center items-center gap-3">
              <a href="/privacy-policy" target="_blank" className="underline hover:text-[#26272A] dark:hover:text-white">
                Privacy Policy
              </a>
              •
              <a href="/tos" target="_blank" className="underline hover:text-[#26272A] dark:hover:text-white">
                Other Details
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <SpinnerLarge />
      </div>
    );
  }
}
