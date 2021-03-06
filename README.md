# Plugin textboxValora v0.5.0.1
<p>Plugin que sirve para precargar la librería <a href="https://textbox.io/" target="_blank" rel="nofollow">textboxio</a> de ephox de acuerdo a estándar de ecosistema VALORA.</p>
<p>El plugin registra una variable global de JavaScript para acceder a sus métodos. Esta variable global, denominada <strong>textboxValora</strong>, se encuentra disponible una vez que se haya cargado el plugin.</p>
<p><strong>No es necesario tener cargada la librería de textboxio al momento de cargar el documento</strong>. El plugin identificará si existe la instancia. En caso no existir, intentará cargarla de manera dinámica. Para esto, la librería debe estar en la ruta predeterminada de plugins de ecosistema VALORA: <code><strong>/assets/vendor/plugins/textboxio/textboxio.js</strong></code></p>
<p>Requiere de JQuery1.10+ y librería <a href="https://textbox.io/" target="_blank" rel="nofollow">textboxio</a>.</p>

## Métodos
<table>
  <tbody>
    <tr>
      <td colspan="1">
        <code><span><a href="#replace">replace</a><br></span></code>
      </td>
      <td colspan="1">
        Reemplaza un elemento del DOM con una instancia del Editor.
      </td>
    </tr>
    <tr>
      <td colspan="1">
        <code><span><a href="#triggersave">triggerSave</a><br></span></code>
      </td>
      <td colspan="1">
        Recorre los elementos reemplazados por el editor y guarda su contenido en el elemento original.
      </td>
    </tr>
    <tr>
      <td colspan="1">
        <code><span><a href="#get">get</a><br></span></code>
      </td>
      <td colspan="1">
        Obtiene instancia (objeto) del editor.
      </td>
    </tr>
  </tbody>
</table>

## Replace
Crea instancias del editor reemplazando elementos como <code>&lt;textarea&gt;</code> o <code>&lt;div&gt;</code>.
Cuando se reemplaza un elemento <code>&lt;textarea&gt;</code> al interior de un <code>&lt;form&gt;</code>, este actualizará el textarea original cuando el form sea enviado.

####Ejemplos<br>
<strong>textboxValora.replace(selector, [configuración])</strong>
```javascript
  <div id="replaceMe">Contenido</div>
  ...
  // Crea un editor buscando el elemento con id 'replaceMe'
  var simpleEditor = textboxValora.replace( '#replaceMe' );
```

<strong>textboxValora.replace(elemento, [configuración])</strong>
```javascript
  <div id="replaceMe">Contenido</div>
  ...
  // Crea un editor reemplazando un elemento específico
  var div = document.getElementById('replaceMe');
  var simpleEditor = textboxValora.replace( div );
 ```
#### Parámetros
<table>
  <tbody>
    <tr>
      <td>
        <p>
          <span style="color: rgb(0,0,0);"><code>selector</code></span>
        </p>
        <p>
          <span style="color: rgb(0,0,0);">o</span>
        </p>
        <p>
          <code><span style="color: rgb(0,0,0);">elemento</span></code>
        </p>
      </td>
      <td colspan="1">
        <p>String</p>
        <p>o</p>
        <p>Elemento</p>
      </td>
      <td>
        <p>
          <a href="http://www.w3.org/TR/css3-selectors/" target="_blank" rel="nofollow">Selector CSS3</a> <span>para reemplazar el elemento <code>&lt;div&gt;</code> o <code>&lt;textarea&gt;</code>.
          </span>
        </p>
        <p>
          <span>o</span>
        </p>
        <p>
          <span>Elemento</span> <code>&lt;div&gt;</code> <span> o </span> <code>&lt;textarea&gt;</code>
          <span> que desea reemplazar.</span>
        </p>
      </td>
    </tr>
    <tr>
      <td colspan="1">
          <code><span><a href="#configuración">configuración</a><br></span></code>
      </td>
      <td colspan="1">
        Objeto (opcional)
      </td>
      <td>
          Grupo opcional que especifica opciones/configuraciones al inicializar las instancias que está invocando.
      </td>
    </tr>
  </tbody>
</table>
#### Return
<table>
  <tbody>
    <tr>
      <td>
        <span style="color: rgb(0,0,0);">
          <code><a href="http://docs.ephox.com/display/tbio/editor" target="_blank" rel="nofollow">textboxio.editor</a></code>
        </span>
      </td>
      <td colspan="1">Objeto</td>
      <td>Instancia única del editor</td>
    </tr>
  </tbody>
</table>

## TriggerSave
Actualiza todos los elementos originales, con el contenido actual del editor, que coincidan con el selector proporcionado. <strong>Sólo se guardará el contenido en elementos de tipo <code>&lt;textarea&gt;</code></strong>.

####Ejemplos<br>
<strong>textboxValora.triggerSave(selector)</strong>
```javascript
  // Actualiza todos los elementos originales que coincidan con la clase css 'editores'
  textboxValora.triggerSave( '.editores' );
```
#### Parámetros
<table>
  <tbody>
    <tr>
      <td>
        <span style="color: rgb(0,0,0);"><code>selector</code></span>
      </td>
      <td colspan="1">
        String
      </td>
      <td>
  Especifica un <a href="http://www.w3.org/TR/css3-selectors/" target="_blank" rel="nofollow">selector CSS3</a> <span>que representa el elemento o elementos que contienen instancias del editor.
  </span>
      </td>
    </tr>
  </tbody>
</table>

## Get
Retorna instancias del editor usando la función get(). Los elementos retornados por el selector son comparados con los editores activos y se retornará una instancia de aquel elemento que haya sido reemplazado por un editor.

####Ejemplos<br>
<strong>textboxValora.triggerSave(selector)</strong>
```javascript
  // Retorna todos los editores en cual el elemento original tenía la clase 'alpha'
  var editors = textboxValora.get( '.alpha' );
   
  //  Identifica el primer editor del array retornado
  var editor = editors[0];
```
#### Parámetros
<table>
  <tbody>
    <tr>
      <td>
        <span style="color: rgb(0,0,0);"><code>selector</code></span>
      </td>
      <td colspan="1">
        String
      </td>
      <td>
  Especifica un <a href="http://www.w3.org/TR/css3-selectors/" target="_blank" rel="nofollow">selector CSS3</a> <span>que representa el elemento o elementos que contienen instancias del editor.
  </span>
      </td>
    </tr>
  </tbody>
</table>
#### Return
<table>
  <tbody>
    <tr>
      <td>
        <span style="color: rgb(0,0,0);">
          <code><a href="http://docs.ephox.com/display/tbio/editor" target="_blank" rel="nofollow">textboxio.editor</a></code>
        </span>
      </td>
      <td colspan="1">Array</td>
      <td>Array con las instancias reemplazadas</td>
    </tr>
  </tbody>
</table>

## Configuración
####Ejemplos<br>
<strong>Valores por defecto</strong>
```javascript
  var options = {
    debug_mode          : false,
    toolbar             : 'normal',
    autoresize          : false,
    init_height         : 200,
    img_upload_url      : '/default/subir-complemento/',
    img_upload_response : {
      success           : function(json, textStatus, jqXHR){},
      fail              : function(jqXHR, textStatus, errorThrown){}
    },
    resize_uploaded_img : {
      enabled           : false,
      maxWidth          : 600,
      maxHeight         : 600
    },
    show_loading_text   : {
      enabled           : true,
      text              : txt_loading_editor_plugin,
      icon              : 'fa-spinner',
      cclass            : 'form-control-static',
      style             : 'margin:0px!important;'
    }
  }
```
#### Propiedades del objeto
Todas las propiedades son opcionales. Definir alguna sobreescribirá la opción predeterminada del plugin.
<table>
  <tbody>
    <tr>
      <td>
        <span style="color: rgb(0,0,0);">
          <code>debug_mode</code>
        </span>
      </td>
      <td colspan="1">Boolean</td>
      <td>
        Permite revisar en consola el paso a paso de ingreso a funciones y entrega información más detallada en caso de lanzar un error.
      </td>
    </tr>
    <tr>
      <td>
        <span style="color: rgb(0,0,0);">
          <code>toolbar</code>
        </span>
      </td>
      <td colspan="1">String</td>
      <td>
        <p>
          <strong>"tiny":</strong> (String) Crea el editor con una barra de herramientas básica.
        </p>
        <p>
          <strong>"normal":</strong> (String) Crea el editor con una barra de herramientas normal (incluye upload de imágenes).
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <span style="color: rgb(0,0,0);">
          <code>autoresize</code>
        </span>
      </td>
      <td colspan="1">Boolean</td>
      <td>
        Permite habilitar o deshabilitar la opción de ajustar el alto de la caja del editor al ir escribiendo.
      </td>
    </tr>
    <tr>
      <td>
        <span style="color: rgb(0,0,0);">
          <code>init_height</code>
        </span>
      </td>
      <td colspan="1">Number</td>
      <td>
        Indica el alto inicial que tendrá la caja del editor al cargarse por primera vez. El predeterminado es 200.
      </td>
    </tr>
    <tr>
      <td>
        <span style="color: rgb(0,0,0);">
          <code>img_upload_url</code>
        </span>
      </td>
      <td colspan="1">String</td>
      <td>
        <p>
          URL donde se enviará el archivo para guardarlo en el servidor. Es un ajax de tipo JSON y envía dos parámetros, uno de tipo <code><strong>File</strong></code> y el segundo es un <code><strong>String</strong></code> con el nombre del archivo enviado. El nombre de los parámetros son <code><strong>file</strong></code> y <code><strong>name</strong></code> respectivamente.
        </p>
        <p>
          <strong>El retorno debe ser un JSON con los siguientes parámetros:</strong>
        </p>
        <p>
          <strong>"result":</strong> (Boolean) Permite identificar si la carga del archivo fue exitosa
        </p>
        <p>
          <strong>"debug":</strong> (String) Mensaje personaliza del error en la subida.
        </p>
        <p>
          <strong>"ruta":</strong> (String) URL de acceso al archivo.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <span style="color: rgb(0,0,0);">
          <code>img_upload_response</code>
        </span>
      </td>
      <td colspan="1">Objeto</td>
      <td>
        <p>
          Callbacks de respuesta para la cargar de archivos en el editor.
        </p>
        <p>
          <strong>"img_upload_response.success(json, textStatus, jqXHR)":</strong> Callback que permite realizar alguna acción una vez que la imagen se subió al servidor y fue cargada exitosamente en el editor.
        </p>
        <p>
          <strong>"img_upload_response.fail(jqXHR, textStatus, errorThrown)":</strong> Callback que permite realizar alguna acción en caso de que la subida del archivo haya fallado.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <span style="color: rgb(0,0,0);">
          <code>resize_uploaded_img</code>
        </span>
      </td>
      <td colspan="1">Objeto</td>
      <td>
        <p>
          Permite habilitar la redimensión por canvas de la imagen cargada en el servidor.
        </p>
        <p>
          <strong>"enabled":</strong> (Boolean) Habilita o deshabilita la opción de redimensionar.
        </p>
        <p>
          <strong>"maxWidth":</strong> (Numeric) Ancho máximo que se permite antes de reescalar por canvas la redimensión.
        </p>
        <p>
          <strong>"maxHeight":</strong> (Numeric) Alto máximo que se permite antes de reescalar por canvas la redimensión.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <span style="color: rgb(0,0,0);">
          <code>show_loading_text</code>
        </span>
      </td>
      <td colspan="1">Objeto</td>
      <td>
        <p>
          Permite mostrar texto de cargando en caso de que la librería original de textboxio no exista en el DOM. De manera predeterminada, la opción viene habilitada.
        </p>
        <p>
          <strong>"enabled":</strong> (Boolean) Habilita o deshabilita la opción de redimensionar. Predeterminado es true.
        </p>
        <p>
          <strong>"text":</strong> (String) Modifica el mensaje de cargando predeterminado.
        </p>
        <p>
          <strong>"icon":</strong> (String) Permite especificar el icono que llevará el mensaje. Predeterminado es fa-spinner.
        </p>
        <p>
          <strong>"cclass":</strong> (String) Especifica la clase del contenedor del mensaje. Predeterimando es un label con clase form-contro-static.
        </p>
        <p>
          <strong>"style":</strong> (String) Permite asignar estilos personalizados al tag label del mensaje. Predeterminado es margin: 0px.
        </p>
      </td>
    </tr>
  </tbody>
</table>

## Problemas conocidos (Known Issues)
- Al cargar una imagen en el editor, lleva a una URL predeterminada en caso de no especificar. Esto hace que el request a través del ajax, muestre error en consola por la ruta inexistente.
- De vez en cuando, cuando se habilita la opción de <code>autoresize</code>, el alto del editor repetidamente aumenta y disminuye.
- Clase required en elemento original, no es tomada en cuenta al ocupar la validación de jquery validation.

## Logs
#### v0.5.0

##### Mejoras
- Se habilita opción, a través de variable <code>show_loading_text</code>, para mostrar mensaje de cargando editor.

#### v0.4.0

##### Mejoras
- Se agrega, al método triggerSave, habilidad de limpiar saltos de línea al estar editor vacío y que luego se traspasaban al elemento original.

#### v0.3.6

##### Corrección de errores
- Se soluciona error en el método get, el cual no preguntaba si existía la instancia del editor cargarda previamente en el DOM.
- Se soluciona error en el método triggerSave, el cual retornaba error al no encontrar elemento para guardar.

#### v0.3.5

##### Mejoras
- Es posible ahora especificar la variable <code>autoresize</code> la cual permite dar la habilidad al editor de aumentar el tamaño de la caja al ir escribiendo.
- Se agrega variable <code>init_height</code> que permite especificar un alto de la caja del editor personalizado al iniciar la carga por primera vez.

##### Corrección de errores
- Se soluciona error en el alto de la caja del editor, que ocasionaba que en algunas instancias, quedara con un height muy pequeño.
- Se corrige problema que sólo permitía al método <code>replace</code> trabajar con un <code>string</code> y no así un objeto.