import { describe, expect, it } from "vitest";
import { APP_NAME, BUY_ME_A_COFFEE_URL } from "./shared/config";

describe("OpenFront Sandbox shell config", () => {
  it("uses the approved app name", () => {
    expect(APP_NAME).toBe("OpenFront Sandbox");
  });

  it("keeps the support URL as an explicit placeholder", () => {
    expect(BUY_ME_A_COFFEE_URL).toContain("buymeacoffee.com");
  });
});
