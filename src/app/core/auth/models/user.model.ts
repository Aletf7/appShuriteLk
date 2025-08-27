export interface User {
  username: string;
  name: string;
  email?: string;
  role: 'admin' | 'student';
  belt: 'blanco' | 'amarillo' | 'naranja' | 'verde' | 'azul' | 'marrón' | 'negro';
  centro?: string; // Ej: "Colegio San Miguel"
  avatarUrl?: string; // URL de imagen de perfil
}
