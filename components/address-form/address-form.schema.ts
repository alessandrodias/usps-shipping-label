import { z } from "zod";

export const defaultValues = {
  street: "",
  city: "",
  state: "",
  zip: "",
};

// export const mockFromAddress = {
//   street: "1632-1500 Rainbow St",
//   city: "Southlake",
//   state: "TX",
//   zip: "76092",
// };

// export const mockToAddress = {
//   street: "700-998 Harwood St",
//   city: "Orlando",
//   state: "FL",
//   zip: "32803",
// };

export const schema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z
    .string()
    .min(1, "State is required")
    .max(2, "State must be 2 characters"),
  zip: z.string().min(5, "Zip is required").max(5, "Zip must be 5 characters"),
});
