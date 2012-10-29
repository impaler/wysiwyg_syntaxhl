/**
 * Copied from tinymce example plugin and modifed to suite my needs.
 *
 * Clifford Meece
 * http://cliffordmeece.com
 *
 */

(function() {
	// Load the language file.
	tinyMCE.PluginManager.requireLangPack('syntaxhl');

	tinyMCE.create('tinyMCE.plugins.SyntaxHL', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinyMCE.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init: function(ed, url) {
			var t = this;

			t.editor = ed;
			t.url = url;

			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			ed.addCommand('mceSyntaxHL', function() {
				ed.windowManager.open({
					file: url + '/dialog.php?path=' + escape(tinyMCE.baseURL) + '&random=' + Math.random(),
					width: 650 + parseInt(ed.getLang('syntaxhl.delta_width', 0)),
					height: 500 + parseInt(ed.getLang('syntaxhl.delta_height', 0)),
					inline: 1
				}, {
					plugin_url: url
					// Plugin absolute URL
				});
			});

			// Register button
			ed.addButton('syntaxhl', {
				title: 'syntaxhl.desc',
				cmd:   'mceSyntaxHL',
				image:  url + '/img/highlight.gif',
			});

			// Add a node change handler, selects the button in the UI when a <pre> element is selected
			ed.onNodeChange.add(function(ed, cm, n) {
				var class_attr = ed.dom.getAttrib(n, 'class');
				cm.setActive('syntaxhl', n.nodeName == 'PRE' && class_attr.match(/wysiwyg-syntaxhl/));
			});

			// Fixme not all pre tags or even any pre tags
			ed.onInit.add(function(ed) {
//				ed.dom.loadCSS(url + '/css/syntaxhl.css');
				
				if (ed && ed.plugins.contextmenu) {
					ed.plugins.contextmenu.onContextMenu.add(function(th, m, e) {
						var style = ed.dom.getAttrib(e, 'class');
// console.log('e.nodeName = ' + e.nodeName);
						if (e.nodeName == 'PRE' && style.match(/wysiwyg-syntaxhl/)) {
							m.add({
								title: 'syntaxhl.menu_title',
								// icon is a class name, not a url path!
								// see http://www.tinymce.com/forum/viewtopic.php?id=12961
								icon:  'syntaxhl',
								cmd:   'mceSyntaxHL',
							});
						}
					});
				}
				
				// add the 'wysiwyg-syntaxhl' marker class
				var preElements = ed.dom.select('pre');
				for (var i = 0; i < preElements.length; i++) {
					var class_attr = ed.dom.getAttrib(preElements[i], 'class');
					if (class_attr && -1 != class_attr.search(/brush\s*:/)) {
						ed.dom.addClass(preElements[i], 'wysiwyg-syntaxhl');
					}
				}
				

			});



			ed.onPostProcess.add(

			// remove the 'wysiwyg-syntaxhl' marker class
			// why is this called twice???
			function(ed, o) {
				// at this point, tinyMCE has serialized the DOM to text already
				// so we cannot use DOMUtil.removeClass() to change the final output,
				// must deal with plain text instead
				var shElems = ed.dom.select('pre.wysiwyg-syntaxhl');
				var index = 0;
				for (var i = 0 ; i < shElems.length ; i++) {
					var class_attr = ed.dom.getAttrib(shElems[i], 'class');
					if (-1 != (index = o.content.indexOf(class_attr, index))) {
						var replacement = class_attr.replace(/\s*wysiwyg-syntaxhl\s*/, '' );
                        // not using RegExp() with 'g' option because class_attr
                        // may contain regex meta characters
						o.content = o.content.replace(class_attr, replacement);
						index += replacement.length;
					}
				}
			});

		},

		/**
		 * Creates control instances based in the incomming name. This method is normally not
		 * needed since the addButton method of the tinyMCE.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinyMCE.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinyMCE.ui.Control} New control instance or null if no control was created.
		 */
		createControl: function(n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo: function() {
			return {
				longname:  'Syntax Highlighter',
				author:    'Clifford Meece, modified by Matt Young for Drupal 7',
				authorurl: 'http://cliffordmeece.com, http://hddigitalworks.com',
				infourl:   'http://drupal.org/project/wysiwyg_syntaxhl',
				version:   '2.0'
			};
		},

		_getText: function(obj) {
			// return the data of obj if its a text node
			if (obj.nodeType == 3) {
				return obj.nodeValue;
			}
			var txt = new Array(),
				i = 0;
			// loop over the children of obj and recursively pass them back to this function
			while (obj.childNodes[i]) {
				txt[txt.length] = this._getText(obj.childNodes[i]);
				i++;
			}
			// return the array as a string
			return txt.join("");
		}
	});

	// Register plugin
	tinyMCE.PluginManager.add('syntaxhl', tinyMCE.plugins.SyntaxHL);
})();
