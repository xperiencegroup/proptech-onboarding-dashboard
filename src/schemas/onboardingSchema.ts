// schemas/onboardingSchema.ts
import { z } from "zod";

export const step1Schema = z.object({
  name: z
    .string()
    .min(2, "Nombre muy corto")
    .max(100, "Nombre muy largo")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras y espacios"),

  phone: z
    .string()
    .min(6, "Teléfono muy corto")
    .max(20, "Teléfono muy largo")
    .regex(/^[\d\s+\-()]+$/, "Formato inválido"),

  email: z.email("Correo inválido").max(100, "Correo muy largo"),
});

export type Step1Data = z.infer<typeof step1Schema>;
