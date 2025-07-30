/**
 * Mock useCartContext so we can control its return values in tests.
 * Without this, the test would fail since the test files don't
 * have access to the real hook implementation.
 **/
export const useCartContext = vi.fn(() => ({
  cartItems: [],
  addItem: vi.fn(),
  removeItem: vi.fn(),
  updateQuantity: vi.fn(),
}));
