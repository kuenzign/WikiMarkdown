/*!
 * VisualEditor UserInterface MWMarkdownWindow class.
 */

/**
 * MediaWiki markdown window.
 *
 * @class
 * @abstract
 *
 * @constructor
 */
ve.ui.MWMarkdownWindow = function VeUiMWMarkdownWindow() {
};

/* Inheritance */

OO.initClass( ve.ui.MWMarkdownWindow );

/* Static properties */

ve.ui.MWMarkdownWindow.static.title = OO.ui.deferMsg( 'markdown-visualeditor-mwmarkdowninspector-title' );

ve.ui.MWMarkdownWindow.static.dir = 'ltr';

/* Methods */

/**
 * @inheritdoc
 */
ve.ui.MWMarkdownWindow.prototype.initialize = function () {
	this.codeField = new OO.ui.FieldLayout( this.input, {
		align: 'top',
		label: ve.msg( 'markdown-visualeditor-mwmarkdowninspector-code' )
	} );
};

/**
 * @inheritdoc OO.ui.Window
 */
ve.ui.MWMarkdownWindow.prototype.getReadyProcess = function ( data, process ) {
	return process.next( function () {
		this.input.focus();
	}, this );
};

/**
 * @inheritdoc OO.ui.Window
 */
ve.ui.MWMarkdownWindow.prototype.getSetupProcess = function ( data, process ) {
	return process;
};

/**
 * @inheritdoc OO.ui.Window
 */
ve.ui.MWMarkdownWindow.prototype.getTeardownProcess = function ( data, process ) {
	return process;
};

/**
 * @inheritdoc ve.ui.MWExtensionWindow
 */
ve.ui.MWMarkdownWindow.prototype.updateActions = function () {
	this.getActions().setAbilities( { done: this.isModified() } );
};
