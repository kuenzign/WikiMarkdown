# About

This is a [MediaWiki](https://www.mediawiki.org/) extension that allows for markdown syntax to be used on wiki pages.  More information can be found on the [extension page](https://www.mediawiki.org/wiki/Extension:WikiMarkdown).

# Requirements

This version of the extension has been tested with Parsedown 1.7.4, Parsedown Extra 0.8.1, and MediaWiki 1.35.

# Installation

Add this line to your LocalSettings.php:

```php
wfLoadExtension( 'WikiMarkdown' );
```

This extension requires [Parsedown](https://github.com/erusev/parsedown) to be installed and optionally [Parsedown Extra](https://github.com/erusev/parsedown-extra).

# Usage

On wiki pages, you can now use `<markdown>` elements:

```html
<markdown>
## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~
</markdown>
```

# Parameters

* `inline`:   Indicates that inline-style markdown should be used instead of block-style.

# Configuration

* `$wgAllowMarkdownExtra` (optional): Set to `true` in order to specify that Parsedown Extra should be used.

# Other Features
* This extension also functions as a content handler for wiki pages ending in `.md`.  For these pages, the entire page will be interpreted as markdown and markdown syntax highlighting will be used in the editor if you have the [CodeEditor](https://www.mediawiki.org/wiki/Extension:CodeEditor) extension installed.
* When specifying code blocks in markdown, this extension will automatically apply the [SyntaxHighlight](https://www.mediawiki.org/wiki/Extension:SyntaxHighlight) extension if it is installed.  All languages supported by the SyntaxHighlight extension will work.
* When using the [VisualEditor](https://www.mediawiki.org/wiki/Extension:VisualEditor) extension with the CodeEditor extension, markdown blocks will be editable using a markdown editor.

# Credits

* This extension was inspired by the [Markdown Content Handler](https://github.com/brightbyte/MWExtension-Markdown) by Daniel Kinzler and the [Markdown Extension](https://www.mediawiki.org/wiki/Extension:Markdown) by Blake Harley.
* Parts of this code are based on the [SyntaxHighlight](https://www.mediawiki.org/wiki/Extension:SyntaxHighlight) and [Scribunto](https://www.mediawiki.org/wiki/Extension:Scribunto) extensions.
