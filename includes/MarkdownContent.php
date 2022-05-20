<?php

use MediaWiki\MediaWikiServices;

/**
 * Markdown Content Model
 */
class MarkdownContent extends TextContent {

	/**
	 * @param string $text
	 */
	public function __construct( $text ) {
		parent::__construct( $text, CONTENT_MODEL_MARKDOWN );
	}

    /**
	 * Parse the Content object and generate a ParserOutput from the result.
	 *
	 * @param Title $title The page title to use as a context for rendering
	 * @param null|int $revId The revision being rendered (optional)
	 * @param ParserOptions $options Any parser options
	 * @param bool $generateHtml Whether to generate HTML (default: true).
	 * @param ParserOutput &$output ParserOutput representing the HTML form of the text.
	 * @return ParserOutput
	 */
	public function fillParserOutput( Title $title, $revId, ParserOptions $options, $generateHtml, ParserOutput &$output ) {
        $output = new ParserOutput();
        if ( !$generateHtml ) {
			// We don't need the actual HTML
			$output->setText( '' );
			return $output;
		}
        $wikitext = Html::rawElement(
            'markdown',
            [],
            // Line breaks are needed so that wikitext would be
            // appropriately isolated for correct parsing.
            "\n" . $this->getText() . "\n"
        );
        $parser = MediaWikiServices::getInstance()->getParser();
		$output = $parser->parse( $wikitext, $title, $options, true, true, $revId );
        return $output;
	}

}