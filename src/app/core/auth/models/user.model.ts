export interface User {
  username: string;
  name: string;
  email?: string;
  role: 'admin' | 'student';
  belt:
    | 'blanco'
    | 'blanco-amarillo'
    | 'amarillo'
    | 'amarillo-naranja'
    | 'naranja'
    | 'naranja-verde'
    | 'verde'
    | 'verde-azul'
    | 'azul'
    | 'azul-marron'
    | 'marrón'
    | 'negro';
  centro?: string; // Ej: "Colegio San Miguel"
  avatarUrl?: string; // URL de imagen de perfil
}
