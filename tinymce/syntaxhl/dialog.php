<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>{#syntaxhl_dlg.title}</title>

	<style type="text/css" media="screen">
		input {
			vertical-align: middle;
		}
		label {
			vertical-align: middle;
		}
		.label-right {
		  margin-left: 15px;
		}
		.label-textfield {
		  margin-right: 2px;
		}
		.label-textfield:after {
		  content: ":";
		}
		fieldset {
			margin-bottom: 10px;
			padding-top: 0;
			line-height: 210%;
		}
		#syntaxhl_options legend a {
		  padding-right: 20px;
		  background: url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7UlEQVR42qWTPQqDQBCFcwSPkCNITpAj5AjeIm1uYpkyR7Cy2Mot7OwsBAsRwUKwmOwLGRle3EIy8PyBfZ/z3J2TiPylz8VWWZZpUB40BonRKyizaxkA88MYYiqCEgv4MTvnZJom0VqWRbz3FlJZgLYtqmEY1Lg9r+sKsIXcLSC3AC019H0vqLquLeC5AfiHYSGkcdAJimKIBQiJ4+CO92OAtm0FNc8zOjkMwE5Q63FAtbeg6zpAYvG8BWR7i5qmQYwY4MIHqYhE2DOPQWcGJBQF2XU72ZzyUeZ5GCNt5/hybJgYdAXsq5sOEE/jG6dC5IOqCXTmAAAAAElFTkSuQmCC)
		              no-repeat scroll right center transparent;
      color: #2B6FB6;
      font-weight: bold;
      text-decoration: none;
    }
	</style>
  <?php
    $path = $_GET["path"];
    print "<script type=\"text/javascript\" src=\"$path/tiny_mce_popup.js\"></script>";
  ?>
	<script type="text/javascript" src="js/dialog.js?<?php echo time(); ?>"></script>

	<script type="text/javascript" src="/sites/all/libraries/codemirror/lib/codemirror.js"></script>
    <script type="text/javascript" src="/sites/all/libraries/codemirror/mode/haxe/haxe.js"></script>
    <link type="text/css" rel="stylesheet" href="/sites/all/libraries/codemirror/lib/codemirror.css" media="all" />
    <link type="text/css" rel="stylesheet" href="/sites/all/libraries/codemirror/theme/monokai.css" "media="all" />
    
</head>
<body>

<form name="syntaxhl" onsubmit="SyntaxHLDialog.insert(); return false;" action="#">
	<fieldset id="syntaxhl_options">
		<legend><a target="_blank" title="{#syntaxhl_dlg.help}" href="http://alexgorbatchev.com/SyntaxHighlighter/manual/configuration/">{#syntaxhl_dlg.highlight_options}</a></legend>
	  <label for="syntaxhl_language" class="label-textfield">{#syntaxhl_dlg.choose_lang}</label>
		<select name="syntaxhl_language" id="syntaxhl_language">
		</select>
		<label for="syntaxhl_firstline" class="label-right label-textfield">{#syntaxhl_dlg.first_line}</label>
		  <input type="textfield" name="syntaxhl_firstline" id="syntaxhl_firstline" value="1" style="width:3em;" />
		<label for="syntaxhl_highlight" class="label-right label-textfield">{#syntaxhl_dlg.highlight}</label>
		  <input type="text" name="syntaxhl_highlight" id="syntaxhl_highlight" style="width:8em;" />
		<label for="syntaxhl_fontsize" class="label-right label-textfield">{#syntaxhl_dlg.fontsize}</label>
		  <input type="text" name="syntaxhl_fontsize" id="syntaxhl_fontsize" style="width:3em;" />
		<br />

		<input type="checkbox" name="syntaxhl_nogutter" id="syntaxhl_nogutter" value="0" />
		  <label for="syntaxhl_nogutter" >{#syntaxhl_dlg.nogutter}</label>
		<input type="checkbox" name="syntaxhl_light" id="syntaxhl_light" value="0" />
		  <label for="syntaxhl_light">{#syntaxhl_dlg.light}</label>
		<input type="checkbox" name="syntaxhl_collapse" id="syntaxhl_collapse" value="0" />
		  <label for="syntaxhl_collapse">{#syntaxhl_dlg.collapse}</label>
    <input type="checkbox" name="syntaxhl_autolink" id="syntaxhl_autolink" value="0" />
		  <label for="syntaxhl_collapse">{#syntaxhl_dlg.autolink}</label>
		<br />

		<label for="syntaxhl_title_attr" class="label-textfield">{#syntaxhl_dlg.title_attr}</label>
		  <input type="text" name="syntaxhl_title_attr" id="syntaxhl_title_attr" style="width:35em;" />
	</fieldset>
	<fieldset>
		<legend>{#syntaxhl_dlg.paste}</legend>
	<textarea name="syntaxhl_code" id="syntaxhl_code" rows="15" cols="100" style="width: 100%; height: 100%; font-family: 'Courier New',Courier,mono; font-size: 12px;" class="mceFocus"></textarea>
	</fieldset>
	
	<div class="mceActionPanel">
		<div style="float: left">
			<input type="submit" id="insert" name="insert" value="{#insert}" />
		</div>
		<div style="float: right">
			<input type="button" id="cancel" name="cancel" value="{#cancel}" onclick="tinyMCEPopup.close();" />
		</div>
	</div>
</form>


<script>

tinyMCEPopup.onInit.add(function() {
    
var codey = CodeMirror.fromTextArea(document.getElementById('syntaxhl_code'), {
    reindentOnLoad: true, 
    continuousScanning: 500,
    theme: 'monokai',
    lineNumbers: true,
    onChange: function () {
    updateTextArea();
    },
    extraKeys: {
        "Tab": "indentMore", 
        "Shift-Tab": "indentLess"
        }
});

function updateTextArea () {
    var value = codey.getValue();
    document.syntaxhl['syntaxhl_code'].value = value;
}

});

</script>

</body>
</html>
