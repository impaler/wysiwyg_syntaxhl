tinyMCEPopup.requireLangPack();
var SyntaxHLDialog = {

	init: function() {

		var f = document.forms[0],
			textarea_output, options = '';
        var ed = tinyMCEPopup.editor;
		var n = ed.selection.getNode();
		var languages;
		if (ed && ed.plugins.inlinepopups) {
			languages = parent.Drupal.settings.wysiwyg_syntaxhl.languages;
		} else {
			languages = window.opener.Drupal.settings.wysiwyg_syntaxhl.languages;
		}

		for (i = 0; i < languages.length; ++i) {
			var optn = document.createElement("OPTION");
			optn.text = languages[i]['text'];
			optn.value = languages[i]['value'];
			document.syntaxhl.syntaxhl_language.options.add(optn);
		}

		if (n.nodeName == 'PRE') {
			// remove placeholder class name and split remaining portion by ';'
			var style = ed.dom.getAttrib(n, 'class');
			style = style.replace(/wysiwyg-syntaxhl\s*/g, '')
			var a = style.split(';');
			for (var i = 0; i < a.length; i++) {
				// Remove unnecessary whitespace
				a[i] = a[i].replace(/\s+/g, '');
				if (a[i] != '') {
					// split name and value pairs
					var b = a[i].split(':');
					switch (b[0]) {
					case 'brush':
						// loop through select box looking for proper place to put selected index
						for (var j = 0; j < f.syntaxhl_language.options.length; j++) {
							if (f.syntaxhl_language.options[j].value == b[1]) {
								f.syntaxhl_language.selectedIndex = j;
							}
						}
						break;
					case 'first-line':
						f.syntaxhl_firstline.value = b[1];
						break;
					case 'fontsize':
						f.syntaxhl_fontsize.value = b[1];
						break;
					case 'gutter':
						if (b[1] == 'true') {
							f.syntaxhl_nogutter.checked = false;
						} else if (b[1] == 'false') {
							f.syntaxhl_nogutter.checked = true;
						} else {
							f.syntaxhl_nogutter.checked = false;
						}
						break;
					case 'light':
						if (b[1] == 'true') {
							f.syntaxhl_light.checked = true;
						} else if (b[1] == 'false') {
							f.syntaxhl_light.checked = false;
						} else {
							f.syntaxhl_light.checked = false;
						}
						break;
					case 'collapse':
						f.syntaxhl_collapse.checked = b[1] == 'true';
						break;
					case 'auto-link':
						f.syntaxhl_autolink.checked = b[1] == 'true';
						break;						
					case 'highlight':
						f.syntaxhl_highlight.value = b[1];
						break;
					}
				}
			}

			var title_attr = ed.dom.getAttrib(n, 'title');
			if (title_attr) {
				f.syntaxhl_title_attr.value = title_attr;
			}

            // do the preelementfix here. 
			this._replaceBrElementsWithNewlines(ed, n);
			f.syntaxhl_code.value = ed.dom.decode(this._getText(n));

		} // end if (fe.nodeName == 'PRE')
	},

	
	// copied from preelementfix
    _replaceBrElementsWithNewlines: function( ed, node )
    {
        var brElements = ed.dom.select('br', node);
        var newlineChar = tinymce.isIE ? '\r' : '\n';
        var newline;

        for ( var i = 0; i < brElements.length; i++ )
        {
            newline = ed.getDoc().createTextNode(newlineChar);

            ed.dom.insertAfter(newline, brElements[i]);
            ed.dom.remove(brElements[i]);
        }
    },
    
    
	insert: function() {
		var n, f = document.forms[0],
			textarea_output, options = '', title = '';
		var ed = tinyMCEPopup.editor;

		tinyMCEPopup.restoreSelection();
		n = ed.selection.getNode();

		if (f.syntaxhl_nogutter.checked) {
			options += 'gutter:false;';
		}
		if (f.syntaxhl_light.checked) {
			options += 'light:true;';
		}
		if (f.syntaxhl_collapse.checked) {
			options += 'collapse:true;';
		}
		if (f.syntaxhl_autolink.checked) {
			options += 'auto-link:true;';
		}
		if (f.syntaxhl_fontsize.value != '') {
			var fontsize = parseInt(f.syntaxhl_fontsize.value);
			options += 'font-size:' + fontsize + ';';
		}
		if (f.syntaxhl_firstline.value != '') {
			var linenumber = parseInt(f.syntaxhl_firstline.value);
			options += 'first-line:' + linenumber + ';';
		}
		if (f.syntaxhl_highlight.value != '') {
			options += 'highlight:' + f.syntaxhl_highlight.value + ';';
		}
		
		if (f.syntaxhl_title_attr.value != '') {
			title = ' title="' + f.syntaxhl_title_attr.value + '"';
		}
		
		//todo look into removed code for logic when only if there is code being updated etc
		textarea_output = '<pre class="wysiwyg-syntaxhl brush:';
		textarea_output += f.syntaxhl_language.value + ';' + options + ' mceNonEditable"' + title;
		textarea_output += '>';
		textarea_output += tinyMCEPopup.editor.dom.encode(f.syntaxhl_code.value);
		textarea_output += "\n</pre>";
		tinyMCEPopup.editor.execCommand('mceInsertContent', false, textarea_output);

		tinyMCEPopup.close();

	},

	_getText: function(obj) {
		// return the data of obj if its a text node
		if (obj.nodeType == 3) return obj.nodeValue;
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

};

tinyMCEPopup.onInit.add(SyntaxHLDialog.init, SyntaxHLDialog);
