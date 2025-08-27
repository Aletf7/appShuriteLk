export interface Video {
  id: number;
  title: string;
  description: string;
  belt: 'blanco' | 'amarillo' | 'naranja' | 'verde' | 'azul' | 'marrón' | 'negro';
  url: string;
  type?: 'kata' | 'defensa' | 'técnica' | 'teoría'; // opcional, por si quieres categorizar
  duration?: number; // en minutos
  thumbnailUrl?: string; // imagen de portada
}
