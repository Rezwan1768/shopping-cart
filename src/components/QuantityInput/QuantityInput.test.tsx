import { describe, test, expect, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCartContext } from "../../hooks/useCartContext";
import { QuantityInput } from "./QuantityInput";

vi.mock("../../hooks/useCartContext");

describe("QuantityInput", () => {
  test("renders with the correct initial value", () => {
    render(<QuantityInput id={1} initialValue={3} />);
    expect(screen.getByLabelText(/amount/i)).toHaveValue(3);
  });

  test("clamps input to 10 if value exceeds max", async () => {
    const user = userEvent.setup();
    render(<QuantityInput id={1} initialValue={3} />);
    const input = screen.getByLabelText(/amount/i);

    await user.clear(input);
    await user.type(input, "15");

    expect(input).toHaveValue(10);
  });

  describe("when input is zero or negative", () => {
    test("defaults to 1 on empty input and (removeWhenZero = false)", async () => {
      const user = userEvent.setup();
      render(<QuantityInput id={1} initialValue={5} removeWhenZero={false} />);
      const input = screen.getByLabelText(/amount/i);

      await user.clear(input);
      await user.tab();

      expect(input).toHaveValue(1);
    });

    test("calls updateQuantity with 0 if input is cleared and removeWhenZero = true", async () => {
      const updateQuantity = vi.fn();

      /**
       * Inject a shared mock so the test and component use the same updateQuantity instance.
       * The default mock in __mocks__ returns a new object each time, so its updateQuantity
       * is different. This would cause the assertion to fail since the test and component
       * would be using different functions.
       **/
      (useCartContext as Mock).mockReturnValue({
        updateQuantity,
      });

      render(<QuantityInput id={1} initialValue={5} removeWhenZero={true} />);

      const input = screen.getByLabelText(/amount/i);
      const user = userEvent.setup();

      await user.clear(input);
      await user.tab(); // triggers blur

      expect(updateQuantity).toHaveBeenCalledWith(1, 0, true);
    });
  });
});
