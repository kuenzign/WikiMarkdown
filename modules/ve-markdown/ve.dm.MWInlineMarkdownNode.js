/*!
 * VisualEditor DataModel MWInlineMarkdownNode class.
 */

/**
 * DataModel MediaWiki inline markdown node.
 *
 * @class
 *
 * @constructor
 */
ve.dm.MWInlineMarkdownNode = function VeDmMWInlineMarkdownNode() {
	// Parent method
	ve.dm.MWInlineExtensionNode.super.apply( this, arguments );

	// Mixin method
	ve.dm.MWMarkdownNode.call( this );
};

OO.inheritClass( ve.dm.MWInlineMarkdownNode, ve.dm.MWInlineExtensionNode );

OO.mixinClass( ve.dm.MWInlineMarkdownNode, ve.dm.MWMarkdownNode );

ve.dm.MWInlineMarkdownNode.static.name = 'mwInlineMarkdown';

ve.dm.MWInlineMarkdownNode.static.tagName = 'span';

ve.dm.MWInlineMarkdownNode.static.isContent = true;

/* Registration */

ve.dm.modelRegistry.register( ve.dm.MWInlineMarkdownNode );
