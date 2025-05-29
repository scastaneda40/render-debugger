declare module "react-dom/server.edge" {
  import { ReactElement } from "react";

  export function renderToStaticMarkup(element: ReactElement): string;
}
