import { r as createServerFn } from "./ssr.mjs";
import { R as createSsrRpc } from "./router-DxJdDo-e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-99bp7eAb.js
var receptionReply = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("75d0da3184afc3e456801da619063f600a57b1b357854d73b4b27cfdff3e5ab8"));
var assistantReply = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("44f76c9cfca3e66209dc584fc91d7217e5f9031d1625f2d2be67d590009e2cb4"));
var draftScope = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("2efb493bb3ccade9ed6999a0f82547abba8685d2e440817f3433d8413e04793d"));
//#endregion
export { draftScope as n, receptionReply as r, assistantReply as t };
