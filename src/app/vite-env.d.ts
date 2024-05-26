/// <reference types="vite/client" />

declare module "sockjs-client/dist/sockjs" {
  export default (await import("sockjs-client")).default
}