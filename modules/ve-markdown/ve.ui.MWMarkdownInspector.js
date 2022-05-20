/*!
 * VisualEditor UserInterface MWMarkdownInspector class.
 */

/**
 * MediaWiki markdown inspector.
 *
 * @class
 * @extends ve.ui.MWLiveExtensionInspector
 * @mixins ve.ui.MWMarkdownWindow
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
ve.ui.MWMarkdownInspector = function VeUiMWMarkdownInspector() {
	// Parent constructor
	ve.ui.MWMarkdownInspector.super.apply( this, arguments );

	// Mixin constructor
	ve.ui.MWMarkdownWindow.call( this );
};

/* Inheritance */

OO.inheritClass( ve.ui.MWMarkdownInspector, ve.ui.MWLiveExtensionInspector );

OO.mixinClass( ve.ui.MWMarkdownInspector, ve.ui.MWMarkdownWindow );

/* Static properties */

ve.ui.MWMarkdownInspector.static.name = 'markdownInspector';

ve.ui.MWMarkdownInspector.static.modelClasses = [ ve.dm.MWInlineMarkdownNode ];

/* Methods */

/**
 * @inheritdoc
 */
ve.ui.MWMarkdownInspector.prototype.initialize = function () {
	// Parent method
	ve.ui.MWMarkdownInspector.super.prototype.initialize.call( this );

	// Mixin method
	ve.ui.MWMarkdownWindow.prototype.initialize.call( this );

	// Initialization
	this.$content.addClass( 've-ui-mwMarkdownInspector-content' );
	this.form.$element.prepend(
		this.codeField.$element
	);
};

/**
 * @inheritdoc
 */
ve.ui.MWMarkdownInspector.prototype.getReadyProcess = function ( data ) {
	// Parent process
	var process = ve.ui.MWMarkdownInspector.super.prototype.getReadyProcess.call( this, data );
	// Mixin process
	return ve.ui.MWMarkdownWindow.prototype.getReadyProcess.call( this, data, process );
};

/**
 * @inheritdoc
 */
ve.ui.MWMarkdownInspector.prototype.getSetupProcess = function ( data ) {
	// Parent process
	var process = ve.ui.MWMarkdownInspector.super.prototype.getSetupProcess.call( this, data );
	// Mixin process
	return ve.ui.MWMarkdownWindow.prototype.getSetupProcess.call( this, data, process );
};

/**
 * @inheritdoc
 */
ve.ui.MWMarkdownInspector.prototype.getTeardownProcess = function ( data ) {
	// Parent process
	var process = ve.ui.MWMarkdownInspector.super.prototype.getTeardownProcess.call( this, data );
	// Mixin process
	return ve.ui.MWMarkdownWindow.prototype.getTeardownProcess.call( this, data, process );
};

/* Registration */

ve.ui.windowFactory.register( ve.ui.MWMarkdownInspector );
