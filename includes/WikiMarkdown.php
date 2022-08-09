<?php

class WikiMarkdown {

	/** @var string CSS class for markdown code. */
	const MARKDOWN_CSS_CLASS = 'mw-markdown';

	/** @var int Cache version. Increment whenever the HTML changes. */
	const CACHE_VERSION = 1;

	/**
	 * Define content handler constant upon extension registration
	 */
	public static function onRegistration() {
		define( 'CONTENT_MODEL_MARKDOWN', 'markdown' );
		define( 'CONTENT_FORMAT_MARKDOWN', 'text/markdown' );
	}

	/**
	 * Register parser hook
	 *
	 * @param Parser $parser
	 */
	public static function onParserFirstCallInit( Parser $parser ) {
		$parser->setHook( 'markdown', [ 'WikiMarkdown', 'parserHook' ] );
	}

	/**
	 * Parser hook for <markdown> logic
	 *
	 * @param string $text
	 * @param array $args
	 * @param Parser $parser
	 * @return string
	 * @throws MWException
	 */
	public static function parserHook( $text, $args, $parser ) {
		global $wgAllowMarkdownExtended;
		
		// Replace strip markers (For e.g. {{#tag:markdown|<nowiki>...}})
		$out = $parser->getStripState()->unstripNoWiki( $text );

		// Don't trim leading spaces away, just the linefeeds
		$out = preg_replace( '/^\n+/', '', rtrim( $out ) );

		$result = self::parseMarkdown( $out, $args );
		if ( !$result->isGood() ) {
			$parser->addTrackingCategory( 'markdown-error-category' );
		}
		$out = $result->getValue();

		// Make it so that tables have borders
		$out = str_replace('<table>', '<table class="wikitable">', $out);
		
		// Format links
		$out = preg_replace_callback(
			'/<a\s+href="(.*)">(.*)<\/a>/isU',
			function ($matches) use (&$parser) {
				$url = html_entity_decode($matches[1]);
				$text = html_entity_decode($matches[2]);
				$linkType = $url == $text ? 'free' : 'text';
				$cleanUrl = Sanitizer::cleanUrl($url);
				// Register link in the output object
				$parser->getOutput()->addExternalLink($url);
				// Create an external link
				return Linker::makeExternalLink($cleanUrl, $text, true, $linkType, $parser->getExternalLinkAttribs($url), $parser->getTitle());
			},
			$out
		);
		
		// Make html headings into wiki headlines
		$refers = [];
		$out = preg_replace_callback(
			'/<h([1-6])(\s+id="(.*)")?>(.*)<\/h\1>/isU',
			function ($matches) use (&$refers) {
				// Create an anchor id from the heading text or id (if found)
				$anchor = 'markdown_' . (empty($matches[2]) ? Sanitizer::escapeIdForAttribute($matches[4]) : html_entity_decode($matches[3]));
				// Ensure that anchors are unique
				if ( isset( $refers[$anchor] ) ) {
					for ( $i = 2; isset( $refers["${anchor}_$i"] ); ++$i );
					$anchor .= "_$i";
					$refers["${anchor}_$i"] = true;
				} else {
					$refers[$anchor] = true;
				}
				return Linker::makeHeadline($matches[1], '>', $anchor, $matches[4], '');
			},
			$out
		);
		
		// If SyntaxHighlight is loaded, then use it to perform syntax highlighting
		if ( ExtensionRegistry::getInstance()->isLoaded( 'SyntaxHighlight' ) ) {
			$out = preg_replace_callback(
				'/<pre>\s*<code(\s+class="language-(.*)")?>(.*)<\/code>\s*<\/pre>/isU',
				function ( $matches ) use ( &$parser ) {
					// If there's no language, just remove the nested <code> tag
					if ( empty( $matches[1] ) ) {
						return '<pre>' . $matches[3] . '</pre>';
					}
					// If a language is specified, let SyntaxHighlight handle it
					$args = array('lang' => $matches[2]);
					return SyntaxHighlight::parserHook( html_entity_decode( $matches[3] ), $args, $parser );
				},
				$out
			);
		}

		// If Parsedown Extended is available with tasks turned on, then convert them to OOUI checkboxes
		if ( $wgAllowMarkdownExtended && ( false !== self::getParsedown()->options['lists']['tasks'] ?? true ) ) {
			$parser->enableOOUI();
			$out = preg_replace_callback(
				'/<input\s+type="checkbox"(.*)>/isU',
				function ( $matches ) {
					$check = new \OOUI\CheckboxInputWidget([
						'disabled' => true,
						'selected' => in_array('checked', explode(' ', $matches[1]), true)
					]);
					return $check->toString();
				},
				$out
			);
		}

		// If Parsedown Extended is available with math turned on and the Math extension is loaded, then use it to perform math formatting
		if ( $wgAllowMarkdownExtended && ( false !== self::getParsedown()->options['math'] ?? false ) && ExtensionRegistry::getInstance()->isLoaded( 'Math' ) ) {
			$out = preg_replace_callback(
				'/(?<!\\\\)\\\\\[(.*)(?<!\\\\)\\\\\]/isU',
				function ( $matches ) use ( &$parser ) {
					$args = array('display' => 'block');
					return MediaWiki\Extension\Math\Hooks::mathTagHook( html_entity_decode( $matches[1] ), $args, $parser );
				},
				$out
			);
			$out = preg_replace_callback(
				'/(?<!\\\\)\$\$(.*)(?<!\\\\)\$\$/isU',
				function ( $matches ) use ( &$parser ) {
					$args = array('display' => 'block');
					return MediaWiki\Extension\Math\Hooks::mathTagHook( html_entity_decode( $matches[1] ), $args, $parser );
				},
				$out
			);
			$out = preg_replace_callback(
				'/(?<!\\\\)\\\\\((.*)(?<!\\\\)\\\\\)/isU',
				function ( $matches ) use ( &$parser ) {
					$args = array('display' => 'inline');
					return MediaWiki\Extension\Math\Hooks::mathTagHook( html_entity_decode( $matches[1] ), $args, $parser );
				},
				$out
			);
			if ( self::getParsedown()->options['math']['single_dollar'] ?? false ) {
				$out = preg_replace_callback(
					'/(?<!\\\\)\$(.*)(?<!\\\\)\$/isU',
					function ( $matches ) use ( &$parser ) {
						$args = array('display' => 'inline');
						return MediaWiki\Extension\Math\Hooks::mathTagHook( html_entity_decode( $matches[1] ), $args, $parser );
					},
					$out
				);
			}
		}
		
		// Allow certain HTML attributes
		$htmlAttribs = Sanitizer::validateAttributes(
			$args, array_flip( [ 'style', 'class', 'id', 'dir' ] )
		);
		if ( !isset( $htmlAttribs['class'] ) ) {
			$htmlAttribs['class'] = self::MARKDOWN_CSS_CLASS;
		} else {
			$htmlAttribs['class'] .= ' ' . self::MARKDOWN_CSS_CLASS;
		}
		if ( isset( $args['inline'] ) ) {
			// Enforce inlineness. Stray newlines may result in unexpected list and paragraph processing
			// (also known as doBlockLevels()).
			$out = str_replace( "\n", ' ', $out );
			$out = Html::rawElement( 'span', $htmlAttribs, $out );

		} else {
			// Use 'nowiki' strip marker to prevent list processing (also known as doBlockLevels()).
			// However, leave the wrapping <div/> outside to prevent <p/>-wrapping.
			$marker = $parser::MARKER_PREFIX . '-markdowninner-' .
				sprintf( '%08X', $parser->mMarkerIndex++ ) . $parser::MARKER_SUFFIX;
			$parser->getStripState()->addNoWiki( $marker, $out );
			$out = $marker;

			$out = Html::openElement( 'div', $htmlAttribs ) .
				$out .
				Html::closeElement( 'div' );
		}

		return $out;
	}

	/**
	 * Parse markdown syntax.
	 *
	 * This produces raw HTML (wrapped by Status).
	 *
	 * @param string $markdown Markdown syntax to parse.
	 * @param array $args Associative array of additional arguments.
	 *  If it contains a 'inline' key, the output will not be wrapped in `<div></div>`.
	 * @return Status Status object, with HTML representing the parsed
	 *  markdown as its value.
	 */
	public static function parseMarkdown( $markdown, $args = [] ) {
		$status = new Status;

		// For empty tag, output nothing instead of empty <div>.
		if ( $markdown === '' ) {
			$status->value = '';
			return $status;
		}

		$inline = isset( $args['inline'] );

		$parsedown = static::getParsedown();
		$parsedown->setSafeMode(true);

		if ( $inline ) {
			$markdown = trim( $markdown );
			$output = $parsedown->line( $markdown );
			$output = trim( $output );
		} else {
			$output = $parsedown->text( $markdown );
		}

		if ( $output === null ) {
			$status->warning( 'markdown-error-parse-failure' );
			wfWarn( 'Parsing markdown returned blank output' );
		}

		$status->value = $output;
		return $status;
	}

	/**
	 * Conditionally register resource loader modules that depends on the
	 * VisualEditor MediaWiki extension.
	 *
	 * @param ResourceLoader $resourceLoader
	 */
	public static function onResourceLoaderRegisterModules( $resourceLoader ) {
		if ( !ExtensionRegistry::getInstance()->isLoaded( 'VisualEditor' ) ) {
			return;
		}

		$resourceLoader->register( 'ext.wikimarkdown.visualEditor', [
			'class' => ResourceLoaderWikiMarkdownVisualEditorModule::class,
			'localBasePath' => __DIR__ . '/../modules',
			'remoteExtPath' => 'WikiMarkdown/modules',
			'scripts' => [
				've-markdown/ve.dm.MWMarkdownNode.js',
				've-markdown/ve.dm.MWBlockMarkdownNode.js',
				've-markdown/ve.dm.MWInlineMarkdownNode.js',
				've-markdown/ve.ce.MWMarkdownNode.js',
				've-markdown/ve.ce.MWBlockMarkdownNode.js',
				've-markdown/ve.ce.MWInlineMarkdownNode.js',
				've-markdown/ve.ui.MWMarkdownWindow.js',
				've-markdown/ve.ui.MWMarkdownDialog.js',
				've-markdown/ve.ui.MWMarkdownDialogTool.js',
				've-markdown/ve.ui.MWMarkdownInspector.js',
				've-markdown/ve.ui.MWMarkdownInspectorTool.js',
			],
			'styles' => [
				've-markdown/ve.ce.MWMarkdownNode.css',
				've-markdown/ve.ui.MWMarkdownDialog.css',
				've-markdown/ve.ui.MWMarkdownInspector.css',
			],
			'dependencies' => [
				'ext.visualEditor.mwcore',
				'oojs-ui.styles.icons-editing-advanced'
			],
			'messages' => [
				'markdown-visualeditor-mwmarkdowninspector-code',
				'markdown-visualeditor-mwmarkdowninspector-title',
			],
			'targets' => [ 'desktop', 'mobile' ],
		] );
	}

	/**
	 * Content Handler hook for markdown content pages
	 *
	 * @param Title $title Title in question
	 * @param string &$model Model name. Use with CONTENT_MODEL_XXX constants.
	 * @return bool|void True or no return value to continue or false to abort
	 */
	public static function onContentHandlerDefaultModelFor( Title $title, &$model ) {
		// Match .md pages.
		if ( preg_match( '/\.md$/i', $title->getText() ) && $title->isContentPage() ) {
			$model = CONTENT_MODEL_MARKDOWN;
			return false;
		}

		return true;
	}

	/**
	 * @param Title $title
	 * @param string &$languageCode
	 * @return bool
	 */
	public static function onCodeEditorGetPageLanguage( Title $title, &$languageCode ) {
		if ( !ExtensionRegistry::getInstance()->isLoaded( 'CodeEditor' ) ) {
			return true;
		}
		if ( $title->hasContentModel( CONTENT_MODEL_MARKDOWN ) )
		{
			$languageCode = 'markdown';
			return false;
		}

		return true;
	}

	/**
	 * @return Parsedown
	 */
	protected static function getParsedown()
	{
		static $parsedown;
		global $wgAllowMarkdownExtra;
		global $wgAllowMarkdownExtended;
		global $wgParsedownExtendedParameters;

		if (!$parsedown) {
			$parsedown = $wgAllowMarkdownExtended
				? new \ParsedownExtended($wgParsedownExtendedParameters)
				: ($wgAllowMarkdownExtra
					? new \ParsedownExtra()
					: new \Parsedown());
		}

		return $parsedown;
	}
}
