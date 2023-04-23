import { type PropsWithChildren } from "react";

const DemoContainer = ({ children }: PropsWithChildren<unknown>) => (
  <main className="container mx-auto mt-12 px-4">{children}</main>
);

export default DemoContainer;
