import {
  it, expect, describe
} from "vitest";

describe("example", () => {
  it("Example of test", async () => {
    const employee = {
      name: "John",
      surname: "Doe"
    };
    expect(employee.surname).toEqual(employee.surname);
  });
});
