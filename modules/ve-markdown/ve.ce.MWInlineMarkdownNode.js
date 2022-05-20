/*!
 * VisualEditor ContentEditable MWInlineMarkdownNode class.
 */

/**
 * ContentEditable MediaWiki inline markdown node.
 *
 * @class
 * @abstract
 *
 * @constructor
 */
ve.ce.MWInlineMarkdownNode = function VeCeMWInlineMarkdownNode() {
	// Parent method
	ve.ce.MWInlineExtensionNode.super.apply( this, arguments );

	// Mixin method
	ve.ce.MWMarkdownNode.call( this );
};

OO.inheritClass( ve.ce.MWInlineMarkdownNode, ve.ce.MWInlineExtensionNode );

OO.mixinClass( ve.ce.MWInlineMarkdownNode, ve.ce.MWMarkdownNode );

ve.ce.MWInlineMarkdownNode.static.name = 'mwInlineMarkdown';

ve.ce.MWInlineMarkdownNode.static.primaryCommandName = 'markdownInspector';

ve.ce.MWInlineMarkdownNode.static.getDescription = function ( model ) {
	return 'Inline Markdown';
};

/* Registration */

ve.ce.nodeFactory.register( ve.ce.MWInlineMarkdownNode );
