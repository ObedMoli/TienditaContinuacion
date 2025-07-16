import { z } from 'zod';

export const categoriaSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre de la categoría es obligatorio')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/, 'El nombre debe contener solo letras, números y espacios')
});
