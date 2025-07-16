import { z } from 'zod'

const productoSchema = z.object({
  nombre: z.string({required_error: 'El nombre es obligatorio',invalid_type_error: 'El nombre debe ser texto',
  }).min(1, 'El nombre no puede estar vacío').regex(/^[\w\sáéíóúÁÉÍÓÚñÑ0-9-]+$/, 'El nombre solo puede contener letras, números y espacios'),

  precio: z.number({required_error: 'El precio es obligatorio',invalid_type_error: 'El precio debe ser un número'
  }).positive('El precio debe ser mayor que cero'),

  descripcion: z.string({required_error: 'La descripción es obligatoria',invalid_type_error: 'La descripción debe ser texto'
  }).min(1, 'La descripción no puede estar vacía'),

  disponible: z.boolean({required_error: 'El campo disponible es obligatorio',invalid_type_error: 'Disponible debe ser true o false'
  }),

  fecha_ingreso: z.string({required_error: 'La fecha de ingreso es obligatoria'}).refine(val => !isNaN(Date.parse(val)), {message: 'Debe ser una fecha válida en formato ISO (ej. 2025-07-16T15:00:00Z)'
  }),

  categoria_id: z.number({required_error: 'categoria_id es obligatorio',invalid_type_error: 'categoria_id debe ser un número'
  }).int('categoria_id debe ser un número entero').positive('categoria_id debe ser mayor que cero')
}).strict()

export const validateProducto = (producto) => {
  return productoSchema.safeParse(producto)
}
