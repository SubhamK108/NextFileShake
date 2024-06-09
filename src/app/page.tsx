import AppMainSender from "@/components/app-main-sender/app-main-sender";
import AppMain from "@/components/app-main/app-main";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <AppMain>
      <AppMainSender />
    </AppMain>
  );
}
