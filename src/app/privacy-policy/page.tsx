import AppMain from "@/components/app-main/app-main";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <AppMain>
      <div className="h-full w-full p-8 max-2xl:p-7 max-sm:p-5 flex flex-col justify-center items-center gap-5 max-2xl:gap-5 max-sm:gap-5 overflow-y-auto">
        <p className="h-[15%] text-[1.6rem] max-2xl:text-[1.45rem] max-sm:text-[1.1rem] font-sans">
          Q. Where are my files being stored? What about privacy?
        </p>
        <p className="h-[85%] text-[1.3rem] max-2xl:text-[1.25rem] max-sm:text-[1.05rem] font-sans">
          A. FileShake uses <b>your personal Google Drive storage</b> to store & share your files, all your shared files are
          stored in a folder named <i>FileShake</i> in your personal Google Drive, and{" "}
          <b>only these specific shared files</b> are accessible to FileShake, nothing else, all your other personal files in
          your Google Drive <b>are not accessible</b> to FileShake, it can only access the files that are{" "}
          <b>shared by you via this app</b>. You can also manually visit the <i>FileShake</i> folder in your personal Google
          Drive to view/modify/delete all the sahred files. And since this is a fully client-side app with no servers
          attached, everything stays in your <b>device & browser</b>, including your Google Account SignIn information,
          nothing is stored/collected by FileShake.
        </p>
      </div>
    </AppMain>
  );
}
