import { z } from 'zod';

export const productoSchema = z.object({
  nombre: z
  .string()
  .min(1, 'El nombre es obligatorio')
  .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/, 'El nombre debe contener solo letras, números y espacios'),

  precio: z
    .number({ invalid_type_error: 'El precio debe ser un número' })
    .positive('El precio debe ser mayor que cero'),

  descripcion: z
    .string()
    .min(1, 'La descripción es obligatoria'),

  disponible: z
    .boolean({ invalid_type_error: 'Disponible debe ser un valor booleano: true o false' }),

  fecha_ingreso: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Debe ser una fecha válida en formato ISO (timestamp)',
    }),

  categoria_id: z
    .number({ invalid_type_error: 'categoria_id debe ser un número' })
    .int()
    .positive('categoria_id debe ser mayor que cero'),
});
