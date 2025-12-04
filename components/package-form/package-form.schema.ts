import { z } from "zod";

export const defaultValues = {
  weight: "",
  length: "",
  width: "",
  height: "",
};

export const schema = z.object({
  weight: z.string().min(1, "Weight is required"),
  length: z.string().min(1, "Length is required"),
  width: z.string().min(1, "Width is required"),
  height: z.string().min(1, "Height is required"),
});
