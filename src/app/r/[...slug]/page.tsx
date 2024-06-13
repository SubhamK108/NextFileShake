import AppMainReceiver from "@/components/app-main-receiver/app-main-receiver";
import AppMain from "@/components/app-main/app-main";
import { ReactElement } from "react";

export default function ReceiverHome({ params }: { params: { slug: string[] } }): ReactElement {
  return (
    <AppMain>
      <AppMainReceiver shareKey={params.slug} />
    </AppMain>
  );
}
