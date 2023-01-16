export default function calculateAge(fecha) {
  try {
    var hoy = new Date();
    var cumpleanos = fecha
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
  } catch (error) {
    console.log(error)
    return 'n/a'
  }
}
