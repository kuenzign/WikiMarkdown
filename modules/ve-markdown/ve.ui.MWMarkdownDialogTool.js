/*!
 * VisualEditor UserInterface MWMarkdownDialogTool class.
 */

/**
 * MediaWiki UserInterface markdown tool.
 *
 * @class
 * @extends ve.ui.FragmentWindowTool
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 */
ve.ui.MWMarkdownDialogTool = function VeUiMWMarkdownDialogTool() {
	ve.ui.MWMarkdownDialogTool.super.apply( this, arguments );
};
OO.inheritClass( ve.ui.MWMarkdownDialogTool, ve.ui.FragmentWindowTool );
ve.ui.MWMarkdownDialogTool.static.name = 'markdownDialog';
ve.ui.MWMarkdownDialogTool.static.group = 'object';
ve.ui.MWMarkdownDialogTool.static.icon = 'code';
ve.ui.MWMarkdownDialogTool.static.title = OO.ui.deferMsg(
	'markdown-visualeditor-mwmarkdowninspector-title' );
ve.ui.MWMarkdownDialogTool.static.modelClasses = [ ve.dm.MWBlockMarkdownNode ];
ve.ui.MWMarkdownDialogTool.static.commandName = 'markdownDialog';
ve.ui.toolFactory.register( ve.ui.MWMarkdownDialogTool );

ve.ui.commandRegistry.register(
	new ve.ui.Command(
		'markdownDialog', 'window', 'open',
		{ args: [ 'markdownDialog' ], supportedSelections: [ 'linear' ] }
	)
);

ve.ui.sequenceRegistry.register(
	// Don't wait for the user to type out the full <markdown> tag
	new ve.ui.Sequence( 'wikitextMark', 'markdownDialog', '<mark', 5 )
);

ve.ui.commandHelpRegistry.register( 'insert', 'markdown', {
	sequences: [ 'wikitextMark' ],
	label: OO.ui.deferMsg( 'markdown-visualeditor-mwmarkdowninspector-title' )
} );
