/*!
 * VisualEditor DataModel MWBlockMarkdownNode class.
 */

/**
 * DataModel MediaWiki block markdown node.
 *
 * @class
 *
 * @constructor
 */
ve.dm.MWBlockMarkdownNode = function VeDmMWBlockMarkdownNode() {
	// Parent method
	ve.dm.MWBlockExtensionNode.super.apply( this, arguments );

	// Mixin method
	ve.dm.MWMarkdownNode.call( this );
};

OO.inheritClass( ve.dm.MWBlockMarkdownNode, ve.dm.MWBlockExtensionNode );

OO.mixinClass( ve.dm.MWBlockMarkdownNode, ve.dm.MWMarkdownNode );

ve.dm.MWBlockMarkdownNode.static.name = 'mwBlockMarkdown';

ve.dm.MWBlockMarkdownNode.static.tagName = 'div';

/* Registration */

ve.dm.modelRegistry.register( ve.dm.MWBlockMarkdownNode );
