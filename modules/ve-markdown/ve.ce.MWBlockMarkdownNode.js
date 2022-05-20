/*!
 * VisualEditor ContentEditable MWBlockMarkdownNode class.
 */

/**
 * ContentEditable MediaWiki block markdown node.
 *
 * @class
 *
 * @constructor
 */
ve.ce.MWBlockMarkdownNode = function VeCeMWBlockMarkdownNode() {
	// Parent method
	ve.ce.MWBlockExtensionNode.super.apply( this, arguments );

	// Mixin method
	ve.ce.MWMarkdownNode.call( this );
};

OO.inheritClass( ve.ce.MWBlockMarkdownNode, ve.ce.MWBlockExtensionNode );

OO.mixinClass( ve.ce.MWBlockMarkdownNode, ve.ce.MWMarkdownNode );

ve.ce.MWBlockMarkdownNode.static.name = 'mwBlockMarkdown';

ve.ce.MWBlockMarkdownNode.static.primaryCommandName = 'markdownDialog';

ve.ce.MWBlockMarkdownNode.static.getDescription = function ( model ) {
	return 'Markdown';
};

/* Registration */

ve.ce.nodeFactory.register( ve.ce.MWBlockMarkdownNode );
