# Prueba técnica para Koibanx

**Importante!**
Antes de iniciar el proyecto se deberá crear un archivo .env con la variable:
REACT_APP_URL = "www.TU URL DEL SERVIDOR API .com"

De todas formas puede ser cualquier string ya que la misma no será consultada.
Esto tiene la finalidad de poder ver las querys formadas en consola.

**Consideraciones**

El punto "d" de los requerimientos nos dice "lo importante es cómo se forman los
query params, la búsqueda la realiza la api, no el front", se entiende que el backend busca los datos según los parámetros de filtro indicado en la query, pero aun así se implementó el filtro en el front para ver el resultado final (de lo contrario quedaría un input sin funcionar).
