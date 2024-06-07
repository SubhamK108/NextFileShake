import { firaCode } from "@/lib/fonts";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  return <h1 className={`font-mono ${firaCode.variable} text-5xl`}>Hello World</h1>;
}
