# Preentrega de proyecto

Trabajos realizados durante las clases.


## Integración de servicios externos

### Formspree

Formspree es un servicio que permite recibir datos de formularios HTML directamente en nuestro correo electrónico sin tener que programar un backend.

Para Configurarlo:

1. Crear una cuenta en [formspree.io] (https://formspree.io/f/abcdxyz)
2. Creamos un nuevo **Proyect**.
3. Dentro de ese **Proyect**, creamos un **Form**.
4. formspree nos da un "form endpoint", que deberemos copiar y pegar en el atributo **action** de nuestra etiqueta **form**, por ejemplo:

```
<!-- modify this form HTML and place wherever you want your form -->
<form
  action="https://formspree.io/f/xrbyyeqw"
  method="POST"
>
  <label>
    Your email:
    <input type="email" name="email">
  </label>
  <label>
    Your message:
    <textarea name="message"></textarea>
  </label>
  <!-- your other form fields go here -->
  <button type="submit">Send</button>
</form>
```