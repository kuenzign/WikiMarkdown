/*!
 * VisualEditor DataModel MWMarkdownNode class.
 */

/**
 * DataModel MediaWiki markdown node.
 *
 * @class
 * @abstract
 *
 * @constructor
 */
ve.dm.MWMarkdownNode = function VeDmMWMarkdownNode() {
};

/* Inheritance */

OO.initClass( ve.dm.MWMarkdownNode );

/* Static members */

ve.dm.MWMarkdownNode.static.name = 'mwMarkdown';

ve.dm.MWMarkdownNode.static.extensionName = 'markdown';

ve.dm.MWMarkdownNode.static.getMatchRdfaTypes = function () {
	return [ 'mw:Extension/markdown' ];
};

/* Static methods */

/**
 * @inheritdoc
 */
ve.dm.MWMarkdownNode.static.toDataElement = function ( domElements, converter ) {
	// Parent method
	var isInline = this.isHybridInline( domElements, converter ),
		type = isInline ? 'mwInlineMarkdown' : 'mwBlockMarkdown',
		dataElement = ve.dm.MWExtensionNode.static.toDataElement.call( this, domElements, converter, type );

	return dataElement;
};
