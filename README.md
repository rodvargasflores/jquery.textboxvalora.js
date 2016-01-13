# Plugin textboxValora
<p>Plugin que sirve para precargar la librería <a href="https://textbox.io/" target="_blank" rel="nofollow">textboxio</a> de ephox de acuerdo a estándar de ecosistema VALORA.</p>
<p>El plugin registra una variable global de JavaScript para acceder a sus métodos. Esta variable global, denominada <strong>textboxValora</strong>, se encuentra disponible una vez que se haya cargado el plugin.</p>
<p><strong>No es necesario tener cargada la librería de textboxio al momento de cargar el documento</strong>. El plugin identificará si existe la instancia. En caso no existir, intentará cargarla de manera dinámica. Para esto, la librería debe estar en la ruta predeterminada de plugins de ecosistema VALORA: <code><strong>/assets/vendor/plugins/textboxio/textboxio.js</strong></code></p>
<p>Requiere de JQuery1.10+ y librería <a href="https://textbox.io/" target="_blank" rel="nofollow">textboxio</a>.</p>

## Readme en construcción

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
      <td>Instancia única del editor.</td>
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

## Configuración
####Ejemplos<br>
<strong>Valores por defecto</strong>
```javascript
	var options = {
		debug_mode : false,
		toolbar : 'normal',
		img_upload_url : '/default/subir-complemento/',
		resize_uploaded_img : {
			enabled: false,
			maxWidth: 600,
			maxHeight: 600
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
  </tbody>
</table>

## Problemas conocidos (Known Issues)
- Al estar el editor en modo de pantalla completa y ejecutar el método <strong>textboxValora.triggerSave(selector)</strong>, el plugin arroja error de nodeName.
