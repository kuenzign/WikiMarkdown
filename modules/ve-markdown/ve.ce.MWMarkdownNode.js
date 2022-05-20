/*!
 * VisualEditor ContentEditable MWMarkdownNode class.
 */

/**
 * ContentEditable MediaWiki markdown node.
 *
 * @class
 * @abstract
 *
 * @constructor
 */
ve.ce.MWMarkdownNode = function VeCeMWMarkdownNode() {
};

/* Inheritance */

OO.initClass( ve.ce.MWMarkdownNode );

/* Static Properties */

ve.ce.MWMarkdownNode.static.name = 'mwMarkdown';

/* Methods */

// Inherits from ve.ce.GeneratedContentNode
ve.ce.MWMarkdownNode.prototype.generateContents = function () {
	var node = this,
		args = arguments;
	// Parent method
	return ve.ce.MWExtensionNode.prototype.generateContents.apply( node, args );
};

// Inherits from ve.ce.BranchNode
ve.ce.MWMarkdownNode.prototype.onSetup = function () {
	// Parent method
	ve.ce.MWExtensionNode.prototype.onSetup.call( this );

	// DOM changes
	this.$element.addClass( 've-ce-mwMarkdownNode' );
};

// Inherits from ve.ce.FocusableNode
ve.ce.MWMarkdownNode.prototype.getBoundingRect = function () {
	return this.rects[ 0 ];
};
