/*
TextBox v0.2.3
Plugin que sirve para precargar la librería textboxio de ephox de acuerdo a estándar de ecosistema VALORA
Autor: Real Ace One
*/
if (!window.jQuery === 'undefined') { throw new Error('Cargue primero la librería JQuery') };

! (function(){
	"use strict";

	/** Variables de texto **/
	var txt_library_name 				= 'Textboxio';
	var txt_fail_ajax_load_js 			= 'No se puede cargar la librería '+txt_library_name+' %s';
	var txt_fail_img_upload 			= 'Ha ocurrido un problema con la subida del archivo. Por favor intente nuevamente. %s'
	var txt_fail_load_editors_instance 	= 'No se puede cargar la instancia del editor.';
	var txt_miss_param 					= 'Falta el parámetro "%s"';
	var txt_must_be_string 				= '"%s" debe ser un string.';
	var txt_must_be_object 				= '"%s" debe ser un objeto.';
	var txt_must_be_boolean 			= '"%s" debe ser boolean.';
	var txt_must_be_function 			= '"%s" debe ser una función.';
	var txt_must_be_numeric 			= '"%s" debe ser númerico.';
	var txt_no_element_found 			= 'No se encontró ningún elemento para reemplazar.';
	var txt_create_editor_instance 		= 'Se crea instancia de editor en "%s"';
	var txt_save_content_in 	 		= 'Se guarda contenido en elemento "%s"';
	var txt_library_not_found 			= 'No se encuentra la librería '+txt_library_name+'. Se intentará cargar dinámicamente.';
	var txt_success_library_load		= 'Se cargó exitosamente la librería '+txt_library_name+'.';
	var txt_toolbar_setup 				= 'Se cargó la barra de herramientas en modo "%s"';
	var txt_load_editor_gui 	 		= 'Se carga GUI del editor.';
	var txt_success_file_upload			= 'Se cargó el archivo en el servidor con ruta de acceso "%s"';
	var txt_element_save_not_allowed 	= 'El elemento en que se intenta guardar el contenido del editor no está permitido.';
	var txt_element_not_allowed 		= 'Sólo se permiten elementos de tipo DIV o TEXTAREA.';

	/** Rutas de librerías **/
	var textboxio_url 					= '/assets/vendor/plugins/textboxio/textboxio.js';
	var textboxio_basePath 				= '/assets/vendor/plugins/textboxio/';

	/** Variables globales **/
	// Permite guardar la instancia del editor al crearlo
	// var editors 						= [];
 	// Permite saber si se lanzó el ajax para cargar el JS de TextBoxIO
	var loadingScript 					= false;
	// Se vuelve objeto en caso de que el ajax que carga el JS de TextBoxIO retorna algo
	var scriptLoaded;
	var defaults,settings,
	w = window,g,o,s,v;

	/** FUNCIONES PRIVADAS **/
	var debug = function (d) {
		console.log(d);
	}

	var getDefaults = function() {
		var d = {
			debug_mode : false,
			toolbar : 'normal',
			img_upload_url : '/default/subir-complemento/',
			img_upload_response : {
				success: function(json, textStatus, jqXHR){},
				fail: function(jqXHR, textStatus, errorThrown){}
			},
			resize_uploaded_img : {
				enabled : false,
				maxWidth : 600,
				maxHeight : 600
			},
			config : {
	            codeview: {
	                enabled : false,
	                showButton: false
	            },
	            autosubmit : true,
	            basePath : textboxio_basePath,
	            images: {
	                allowLocal: true,
	                upload : {
	                    handler : function (data, success, failure) {
	                        uploadEditorHandler(data.blob(), data.filename(), function(jqxhr){
	                            // jqxhr.then ??
	                            jqxhr.done(function(json, textStatus, jqXHR){
	                                settings.img_upload_response.success(json, textStatus, jqXHR);

	                                if (json.result)
	                                {
										if (settings.debug_mode) debug(txt_success_file_upload.replace('%s',json.ruta));
	                                    success(json.ruta);
	                                }
	                                else
	                                {
							        	if (settings.debug_mode) debug(jqXHR);
										throw new Error(txt_fail_img_upload.replace('%s',''));
									}
						        }).fail(function(jqXHR, textStatus, errorThrown) {
	                                settings.img_upload_response.fail(jqXHR, textStatus, errorThrown);

						        	if (settings.debug_mode) debug(jqXHR);
									throw new Error(txt_fail_img_upload.replace('%s','('+errorThrown+')'));
								});
	                        });                         
	                    }
	                }
	            }
			}
		}

		// Corregimos el problema del basePath al cargar primero la librería textboxIO
		if (w.textboxio) delete d.config['basePath'];

		return d;
	}

	var setEditorUiToolbar = function() {
		switch(settings.toolbar)
		{
			case 'tiny':
				settings.config['ui'] = {
	                toolbar : {
	                    items : [
	                        {
	                            label: 'Undo and Redo group',
	                            items: [ 'undo', 'redo' ]
	                        },
	                        {
	                            label: 'Emphasis group',
	                            items: [ 'bold', 'italic', 'underline' ]
	                        },
	                        {
	                            label: 'Format group',
	                            items: [ 'font-menu', 'removeformat' ]
	                        }
	                    ]
	                }
	            }
			break;

			case 'normal':
	            settings.config['ui'] = {
	                toolbar : {
	                    items : [
	                        {
	                            label: 'Undo and Redo group',
	                            items: [ 'undo', 'redo' ]
	                        },
	                        {
	                            label: 'Insert group',
	                            items: [
	                                { 
	                                    id    : 'insert',
	                                    label  : 'Insertar',
	                                    items : [ 'fileupload', 'table', 'specialchar', 'hr' ]
	                                }
	                            ]
	                        },
	                        {
	                            label: 'Styles group',
	                            items: [ 'styles' ]
	                        },
	                        {
	                            label: 'Emphasis group',
	                            items: [ 'bold', 'italic', 'underline' ]
	                        },
	                        {
	                            label: 'Align group',
	                            items: [ 'alignment' ]
	                        },
	                        {
	                            label: 'Listindent group',
	                            items: [ 'ul', 'ol', 'indent', 'outdent', 'blockquote' ]
	                        },
	                        {
	                            label: 'Format group',
	                            items: [ 'font-menu', 'removeformat' ]
	                        },
	                        {
	                            label: 'Tools group',
	                            items: [ 'find', 'fullscreen', 'usersettings' ]
	                        }
	                    ]
	                }
	            }
			break;
		}
	}

	var buildEditor = function(e) {
		$.each(e, function(i,v) {
			if (/TEXTAREA|DIV/i.test(v.nodeName))
			{
				try
				{
					var editor = textboxio.replace(v,settings.config);
				}
				catch(e)
				{
					if (w.textboxio && !settings.config['basePath'])
						settings.config['basePath'] = textboxio_basePath;
					var editor = textboxio.replace(v,settings.config);
				}

				if (settings.debug_mode)
				{
					debug(txt_create_editor_instance.replace('%s',v.nodeName));
					debug(v);
				}

				// Agregamos el target (textarea) original en un data con el elemento del editor asignado
				editor.events.loaded.addListener(function(){
					if (/TEXTAREA/i.test(v.nodeName))
						$.data(editor.element(),'element',v);

					if (settings.debug_mode)
						debug(txt_load_editor_gui);
				});

				// Agregamos el target (textarea) original en un data con el elemento del editor asignado
				editor.events.focus.addListener(function(){
					if (/TEXTAREA/i.test(v.nodeName))
						$.data(editor.element(),'element',v);
				});
			}
			else
				throw new Error(txt_element_not_allowed);
		});
	}

	var uploadEditorHandler = function (dataBlob, dataFilename, callback) {
		var resizedImage, jqxhr, dataURL;
		var formData  = new FormData();

		// Cargamos la imagen
		var reader = new FileReader();
		reader.onload = function (readerEvent) {
			var image = new Image();
			image.onload = function (imageEvent) {
				var canvas 	= document.createElement('canvas');

				resizeCanvasImage(image, canvas, settings.resize_uploaded_img['maxWidth'], settings.resize_uploaded_img['maxHeight']);
				// var dataUrl         = canvas.toDataURL('image/jpg');
				// var dataUrl         = canvas.toDataURL('image/png');

				dataURL 		= canvas.toDataURL();
				resizedImage 	= dataURLToBlob(dataURL);

				formData.append('file', resizedImage);
				formData.append('name', dataFilename);

				jqxhr = $.ajax({
					url: settings.img_upload_url,
					type: 'POST',
					dataType: 'json',
					async: true,
					cache: false,
					data: formData,                            
					contentType: false,
					processData: false
				});
				
				callback(jqxhr);
			}
			image.src = readerEvent.target.result;
		}
		reader.readAsDataURL(dataBlob);
	}

    var resizeCanvasImage = function(img, canvas, maxWidth, maxHeight) {
        var imgWidth 	= img.width, 
            imgHeight 	= img.height;

        var resizeImg 	= (settings.resize_uploaded_img['enabled'] && imgWidth > maxWidth) ? true : false;

        var ratio 		= 1, ratio1 = 1, ratio2 = 1;
        var ratio1 		= maxWidth / imgWidth;
        var ratio2 		= maxHeight / imgHeight;

        // Usamos el ratio más pequeño posible para que la imagen
        // encaje de mejor manera dentro del maxWidth x maxHeight.
        if (ratio1 < ratio2) {
            ratio = ratio1;
        }
        else {
            ratio = ratio2;
        }

        var canvasContext 	= canvas.getContext("2d");
        var canvasCopy 		= document.createElement("canvas");
        var copyContext 	= canvasCopy.getContext("2d");
        var canvasCopy2 	= document.createElement("canvas");
        var copyContext2 	= canvasCopy2.getContext("2d");

        canvasCopy.width 	= imgWidth;
        canvasCopy.height 	= imgHeight;
        copyContext.drawImage(img, 0, 0);

        // init
        canvasCopy2.width 	= imgWidth;
        canvasCopy2.height 	= imgHeight;        
        copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);


        // Si aumentamos los rounds, obtenemos una imagen con más efecto antialiasing
        var rounds 			= 2;
        var roundRatio 		= ratio * rounds;
        for (var i = 1; i <= rounds; i++) {
            // debug("Paso: "+i);

            // temporal
            if (resizeImg)
            {
                canvasCopy.width 	= imgWidth * roundRatio / i;
                canvasCopy.height 	= imgHeight * roundRatio / i;
            }
            else
            {
                canvasCopy.width 	= imgWidth;
                canvasCopy.height 	= imgHeight;
            }

            copyContext.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, canvasCopy.width, canvasCopy.height);

            // copiamos de vuelta
            if (resizeImg)
            {
                canvasCopy2.width 	= imgWidth * roundRatio / i;
                canvasCopy2.height 	= imgHeight * roundRatio / i;
            }
            else
            {
                canvasCopy2.width 	= imgWidth;
                canvasCopy2.height 	= imgHeight;
            }
            copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);

        }


        // copiamos de vuelta al canvas
        if (resizeImg)
        {
            canvas.width 	= imgWidth * roundRatio / rounds;
            canvas.height 	= imgHeight * roundRatio / rounds;
        }
        else
        {
            canvas.width 	= imgWidth;
            canvas.height 	= imgHeight;
        }
        canvasContext.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, canvas.width, canvas.height);

        return;
    }

    var dataURLToBlob = function(dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = parts[1];

            return new Blob([raw], {type: contentType});
        }

        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: contentType});
    }

	var ephox_plugin_loader = function() {
		// Si no hemos iniciado aún la carga el JS
		if (!loadingScript)
		{
			scriptLoaded = $.ajax({
	            dataType: "script",
	            cache: false,
	            async: true,
	            url: textboxio_url,
	            beforeSend: function(){
	            	loadingScript = true;
	            }
	    	})
	        .fail(function(jqXHR, textStatus, errorThrown) {
	        	if (settings.debug_mode) debug(jqXHR);
				throw new Error(txt_fail_ajax_load_js.replace('%s','('+errorThrown+')'));
			});
		}
	}

	var validate_options = function() {
		if (typeof settings.debug_mode !== 'boolean')
			throw new Error(txt_must_be_boolean.replace('%s','debug_mode'));

		if (typeof settings.toolbar !== 'string')
			throw new Error(txt_must_be_string.replace('%s','toolbar'));

		if (typeof settings.img_upload_url !== 'string')
			throw new Error(txt_must_be_string.replace('%s','img_upload_url'));

		if (typeof settings.img_upload_response['success'] !== 'function')
			throw new Error(txt_must_be_function.replace('%s','img_upload_response.success'));

		if (typeof settings.img_upload_response['fail'] !== 'function')
			throw new Error(txt_must_be_function.replace('%s','img_upload_response.fail'));

		if (typeof settings.resize_uploaded_img['enabled'] !== 'boolean')
			throw new Error(txt_must_be_boolean.replace('%s','resize_uploaded_img.enabled'));

		if (typeof settings.resize_uploaded_img['maxWidth'] !== 'number')
			throw new Error(txt_must_be_numeric.replace('%s','resize_uploaded_img.maxWidth'));

		if (typeof settings.resize_uploaded_img['maxHeight'] !== 'number')
			throw new Error(txt_must_be_numeric.replace('%s','resize_uploaded_img.maxHeight'));
	}

	// Corrección de errores
	var fixIssues = function() {
	}
	/** FIN DE FUNCIONES PRIVADAS **/

	/** COMENZAMOS FUNCIONES DEL PLUGIN **/
	var v = {
		get: function(selector) {
			if (arguments.length == 0)
				throw new Error(txt_miss_param.replace('%s','selector'));

			if (typeof selector !== 'string')
				throw new Error(txt_must_be_string.replace('%s','Selector'));

			return textboxio.get(selector);
		},
		triggerSave: function(selector) {
			if (arguments.length == 0)
				throw new Error(txt_miss_param.replace('%s','selector'));

			if (typeof selector !== 'string')
				throw new Error(txt_must_be_string.replace('%s','Selector'));

			var editors = v.get(selector);
			if (editors.length > 0)
			{
				$.each(editors,function(i,e){
					if (e.content.isDirty())
					{
						var container = $.data(e.element(),'element');
						if (typeof container === 'object')
						{
							var content = e.content.get();
							if (/TEXTAREA/i.test(container.nodeName))
							{
								container.innerHTML = content;
							
								if (settings.debug_mode)
								{
									debug(txt_save_content_in.replace('%s',container.nodeName));
									debug(container);
								}
							}
							else
							{
								if (settings.debug_mode)
								{
									debug(txt_element_save_not_allowed);
									debug(container);
								}
							}
						}
						else
						{
							if (settings.debug_mode)
							{
								debug(txt_element_save_not_allowed);
								debug(container);
							}
						}

						// Limpiamos la variable de la instancia del editor
						e.content.setDirty(false);
					}
				});
			}
			else
				throw new Error(txt_fail_load_editors_instance);
		},
		replace: function(e,o) {
			if (arguments.length == 0)
				throw new Error(txt_miss_param.replace('%s','selector'));

			if (typeof e !== 'string')
				throw new Error(txt_must_be_string.replace('%s','Selector'));

			if (typeof o !== 'undefined' && typeof o !== 'object')
			 	throw new Error(txt_must_be_object.replace('%s','Argument 2'));

			e = $(e);

			// Configuración predeterminada
			defaults = getDefaults();
			// Hacemos merge de las configuraciones defaults y las dadas por el cliente
			settings = $.extend(true, {}, defaults, o);
			// Obtenemos el toolbar del editor
			setEditorUiToolbar();
			// Última revisión de las configuraciones
			validate_options();
			// Corrige problemas de compatibilidad del plugin
			// fixIssues();

			if(e.length > 0)
			{
				// Preguntamos si no existe la librería de textboxIO, para así intentar cargarla
				if (!w.textboxio)
				{
					if (settings.debug_mode) debug(txt_library_not_found);

					ephox_plugin_loader();
					
					// Aplicamos un timer para saber que se carga una sola vez el ajax. Esto es porque el param async
					// del ajax va true. False está deprecado y genera warning en la consola.
					var timerScript = w.setInterval(function() {
						if(scriptLoaded.readyState == 4 && scriptLoaded.status == 200)
						{
							if (settings.debug_mode)
							{
								debug(txt_success_library_load);
								debug(txt_toolbar_setup.replace('%s',settings.toolbar));
							}

							clearInterval(timerScript);
							buildEditor(e);
						}
					}, 1000);
				}
				else
					buildEditor(e);
			}
			else
			{
				if (settings.debug_mode) debug(txt_no_element_found);
			}
		}
	}
	/** FIN DE LAS FUNCIONES DEL PLUGIN **/

	/** PROTECCIONES **/
	// PROTEGEMOS LA VARIABLE GLOBAL
	Object.preventExtensions(v);

	// PROTEGEMOS LOS ELEMENTOS INTERNOS
	Object.defineProperty(v, 'get', {
		writable: false,
		configurable: false,
		enumerable: true
	});
	Object.defineProperty(v, 'triggerSave', {
		writable: false,
		configurable: false,
		enumerable: true
	});
	Object.defineProperty(v, 'replace', {
		writable: false,
		configurable: false,
		enumerable: true
	});
	/** FIN DE LAS PROTECCIONES **/

	// Publicamos la variable global de acceso al plugin
	w.textboxValora = v;
}(this));