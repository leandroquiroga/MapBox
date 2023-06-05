
export const calculatorDistanceAndMinutes = (distance: number, duration: number) => {
  let kilometers: number;

  //Conversion de los kilometros
  kilometers = distance / 1000;
  kilometers = Math.round(kilometers * 1000);
  kilometers = kilometers / 1000;
  kilometers = Number(kilometers.toPrecision(2))
  
  // Total del tiempo
  const minutes: number = Math.floor(duration / 60);
   
  return { kilometers, minutes };
}