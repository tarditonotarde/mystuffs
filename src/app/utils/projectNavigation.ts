// Orden de todos los proyectos del portfolio
export const projectOrder = [
  'MonoBank',
  'Beatbits',
  'Chrono-go',
  'Herta Security',
  'Countify',
  'Uno Tarot',
  'Office Apocalypse',
  'Read Me Right!',
  'Lynch Universe Stream',
  'Break the Frame',
  'Hertaverse',
  'Infamia Museum',
  'Haters gonna hate',
  'Beethoven 2020',
  'SynapHelmet',
  'Trashtour BER',
  'Trashtour LDN',
  'Trashtour BCN',
  'La Olla Común',
  'Go-home Mag',
  'Mean Bot',
  'Mi gato Bolaño',
  'Infinito',
  'Arc Festival',
  'Guz St.',
  'Sedas Rina María',
  'FILSA',
  'Letrarte Ediciones',
  'Cuarta Estación Circus',
  'Cirkubrick',
];

// Mapeo de nombres de proyecto a sus rutas de case study
export const projectRoutes: Record<string, string> = {
  'MonoBank': '/case/monobank',
  'Beatbits': '/case/beatbits',
  'Chrono-go': '/case/chronogo',
  'Herta Security': '/case/herta-security',
  'Countify': '/case/countify',
  'Uno Tarot': '/case/uno-tarot',
  'Office Apocalypse': '/case/office-apocalypse',
  'Read Me Right!': '/case/read-me-right',
  'Lynch Universe Stream': '/case/lynch-universe',
  'Break the Frame': '/case/break-the-frame',
  'Hertaverse': '/case/hertaverse',
  'Infamia Museum': '/case/infamia-museum',
  'Haters gonna hate': '/case/haters-gonna-hate',
  'Beethoven 2020': '/case/beethoven2020',
  'SynapHelmet': '/case/synaphelmet',
  'Trashtour BER': '/case/trashtour-ber',
  'Trashtour LDN': '/case/trashtour-ldn',
  'Trashtour BCN': '/case/trashtour-bcn',
  'La Olla Común': '/case/la-olla-comun',
  'Go-home Mag': '/case/go-home-mag',
  'Mean Bot': '/case/mean-bot',
  'Mi gato Bolaño': '/case/mi-gato-bolano',
  'Infinito': '/case/infinito',
  'Arc Festival': '/case/arc-festival',
  'Guz St.': '/case/guz-studio',
  'Sedas Rina María': '/case/sedas-rina-maria',
  'FILSA': '/case/filsa',
  'Letrarte Ediciones': '/case/letrarte',
  'Cuarta Estación Circus': '/case/cuarta-estacion',
  'Cirkubrick': '/case/cirkubrick',
};

/**
 * Obtiene la ruta del siguiente proyecto en la lista
 * @param currentProjectName - Nombre del proyecto actual
 * @returns Ruta del siguiente proyecto, o /works si no hay case study disponible
 */
export function getNextProjectRoute(currentProjectName: string): string {
  const currentIndex = projectOrder.indexOf(currentProjectName);
  
  if (currentIndex === -1) {
    // Si no se encuentra el proyecto, volver a works
    return '/works';
  }
  
  // Navegar circularmente: después del último, volver al primero
  const nextIndex = (currentIndex + 1) % projectOrder.length;
  const nextProjectName = projectOrder[nextIndex];
  
  // Devolver la ruta del siguiente proyecto
  return projectRoutes[nextProjectName] || '/works';
}

/**
 * Obtiene la ruta del proyecto anterior en la lista
 * @param currentProjectName - Nombre del proyecto actual
 * @returns Ruta del proyecto anterior, o /works si no hay case study disponible
 */
export function getPreviousProjectRoute(currentProjectName: string): string {
  const currentIndex = projectOrder.indexOf(currentProjectName);
  
  if (currentIndex === -1) {
    // Si no se encuentra el proyecto, volver a works
    return '/works';
  }
  
  // Navegar circularmente: antes del primero, ir al último
  const prevIndex = currentIndex === 0 ? projectOrder.length - 1 : currentIndex - 1;
  const prevProjectName = projectOrder[prevIndex];
  
  // Devolver la ruta del proyecto anterior
  return projectRoutes[prevProjectName] || '/works';
}