import test from "node:test";
import assert from "node:assert/strict";
import { readCart } from "../src/catalog.ts";

function storage(value) {
  globalThis.localStorage = { getItem: () => value };
}

test("a returning visitor keeps product, size, and quantity", () => {
  storage('[{"id":"air-01","size":42,"quantity":2}]');
  assert.deepEqual(readCart(), [{ id: "air-01", size: 42, quantity: 2 }]);
});
test("corrupt or obsolete storage never breaks the storefront", () => {
  for (const value of ["{broken", "null", "42", "{}", '"old schema"']) {
    storage(value);
    assert.deepEqual(readCart(), []);
  }
});
test("invalid products, unavailable sizes, and invalid quantities are discarded", () => {
  storage(
    JSON.stringify([
      null,
      false,
      { id: "missing", size: 42, quantity: 1 },
      { id: "air-01", size: 99, quantity: 1 },
      { id: "air-01", size: 42, quantity: -1 },
      { id: "air-01", size: 42, quantity: 1.5 },
      { id: "air-01", size: 42, quantity: 11 },
      { id: "air-01", size: "42", quantity: 1 },
    ]),
  );
  assert.deepEqual(readCart(), []);
});
test("duplicate persisted pairs merge safely without exceeding the quantity limit", () => {
  storage(
    '[{"id":"air-01","size":42,"quantity":7},{"id":"air-01","size":42,"quantity":6},{"id":"air-01","size":43,"quantity":1}]',
  );
  assert.deepEqual(readCart(), [
    { id: "air-01", size: 42, quantity: 10 },
    { id: "air-01", size: 43, quantity: 1 },
  ]);
});
test("blocked browser storage still allows an empty usable bag", () => {
  globalThis.localStorage = {
    getItem: () => {
      throw new Error("Storage blocked");
    },
  };
  assert.deepEqual(readCart(), []);
});
