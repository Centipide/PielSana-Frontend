# Entrega de proyecto

El proyecto consiste en el desarrollo de una página web orientada a la venta de productos de cuidado facial, con un diseño responsivo, una estructura clara y una experiencia de usuario sencilla e intuitiva.
La página permite visualizar productos, conocer sus precios, acceder a información adicional y realizar consultas a través de un formulario de contacto.


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

### Bootstrap

Bootstrap es un framework de CSS que facilita el armado del diseño y la estructura de la página web, permitiendo que el sitio sea responsivo y se adapte a distintos tamaños de pantalla.

En este proyecto se utilizó Bootstrap para:

- Organizar el contenido usando su sistema de grid (container, row, col-*).

- Crear tarjetas (cards) para mostrar los productos de forma ordenada.

- Estilizar botones y formularios sin tener que escribir todo el CSS desde cero.

- Asegurar que la página se vea correctamente tanto en computadoras como en dispositivos móviles.

Bootstrap fue integrado mediante su CDN oficial y se utilizó junto con CSS propio para personalizar algunos estilos del sitio.