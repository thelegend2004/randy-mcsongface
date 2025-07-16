/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LASTFM_API_KEY: string;
  readonly VITE_LASTFM_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
