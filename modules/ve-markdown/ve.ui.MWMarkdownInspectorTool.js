/*!
 * VisualEditor UserInterface MWMarkdownInspectorTool class.
 */

/**
 * MediaWiki UserInterface markdown tool.
 *
 * @class
 * @extends ve.ui.FragmentInspectorTool
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 */
ve.ui.MWMarkdownInspectorTool = function VeUiMWMarkdownInspectorTool() {
	ve.ui.MWMarkdownInspectorTool.super.apply( this, arguments );
};
OO.inheritClass( ve.ui.MWMarkdownInspectorTool, ve.ui.FragmentInspectorTool );
ve.ui.MWMarkdownInspectorTool.static.name = 'markdownInspector';
ve.ui.MWMarkdownInspectorTool.static.group = 'object';
ve.ui.MWMarkdownInspectorTool.static.icon = 'code';
ve.ui.MWMarkdownInspectorTool.static.title = OO.ui.deferMsg(
	'markdown-visualeditor-mwmarkdowninspector-title' );
ve.ui.MWMarkdownInspectorTool.static.modelClasses = [ ve.dm.MWInlineMarkdownNode ];
ve.ui.MWMarkdownInspectorTool.static.commandName = 'markdownInspector';
ve.ui.MWMarkdownInspectorTool.static.autoAddToCatchall = false;
ve.ui.toolFactory.register( ve.ui.MWMarkdownInspectorTool );

ve.ui.commandRegistry.register(
	new ve.ui.Command(
		'markdownInspector', 'window', 'open',
		{ args: [ 'markdownInspector' ], supportedSelections: [ 'linear' ] }
	)
);
