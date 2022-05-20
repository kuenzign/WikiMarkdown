/*!
 * VisualEditor UserInterface MWMarkdownDialog class.
 */

/**
 * MediaWiki markdown dialog.
 *
 * @class
 * @extends ve.ui.MWExtensionDialog
 * @mixins ve.ui.MWMarkdownWindow
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
ve.ui.MWMarkdownDialog = function VeUiMWMarkdownDialog() {
	// Parent constructor
	ve.ui.MWMarkdownDialog.super.apply( this, arguments );

	// Mixin constructor
	ve.ui.MWMarkdownWindow.call( this );
};

/* Inheritance */

OO.inheritClass( ve.ui.MWMarkdownDialog, ve.ui.MWExtensionDialog );

OO.mixinClass( ve.ui.MWMarkdownDialog, ve.ui.MWMarkdownWindow );

/* Static properties */

ve.ui.MWMarkdownDialog.static.name = 'markdownDialog';

ve.ui.MWMarkdownDialog.static.size = 'larger';

ve.ui.MWMarkdownDialog.static.modelClasses = [ ve.dm.MWBlockMarkdownNode ];

/* Methods */

/**
 * @inheritdoc
 */
ve.ui.MWMarkdownDialog.prototype.initialize = function () {
	// Parent method
	ve.ui.MWMarkdownDialog.super.prototype.initialize.call( this );

	this.input = new ve.ui.MWAceEditorWidget( {
		limit: 1,
		rows: 10,
		maxRows: 25,
		autosize: true,
		autocomplete: 'live',
		classes: [ 've-ui-mwExtensionWindow-input' ]
	} );

	this.input.connect( this, { resize: 'updateSize' } );

	// Mixin method
	ve.ui.MWMarkdownWindow.prototype.initialize.call( this );

	this.contentLayout = new OO.ui.PanelLayout( {
		scrollable: true,
		padded: true,
		expanded: false,
		content: [
			this.codeField
		]
	} );

	// Initialization
	this.$content.addClass( 've-ui-mwMarkdownDialog-content' );
	this.$body.append( this.contentLayout.$element );
};

/**
 * @inheritdoc
 */
ve.ui.MWMarkdownDialog.prototype.getReadyProcess = function ( data ) {
	// Parent process
	var process = ve.ui.MWMarkdownDialog.super.prototype.getReadyProcess.call( this, data );
	// Mixin process
	return ve.ui.MWMarkdownWindow.prototype.getReadyProcess.call( this, data, process );
};

/**
 * @inheritdoc
 */
ve.ui.MWMarkdownDialog.prototype.getSetupProcess = function ( data ) {
	// Parent process
	var process = ve.ui.MWMarkdownDialog.super.prototype.getSetupProcess.call( this, data );
	// Mixin process
	return ve.ui.MWMarkdownWindow.prototype.getSetupProcess.call( this, data, process )
		.first( function () {
			this.input.setup();
			this.input.setLanguage('markdown');
		}, this )
		.next( function () {
			this.input.clearUndoStack();
		}, this );
};

/**
 * @inheritdoc
 */
ve.ui.MWMarkdownDialog.prototype.getTeardownProcess = function ( data ) {
	// Parent process
	var process = ve.ui.MWMarkdownDialog.super.prototype.getTeardownProcess.call( this, data );
	// Mixin process
	return ve.ui.MWMarkdownWindow.prototype.getTeardownProcess.call( this, data, process ).first( function () {
		this.input.teardown();
	}, this );
};

/* Registration */

ve.ui.windowFactory.register( ve.ui.MWMarkdownDialog );
