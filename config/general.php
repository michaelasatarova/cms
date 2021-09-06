<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

return [
	// Global settings
	'*' => [
		'defaultWeekStartDay'   => 1,
		'enableCsrfProtection'  => false,
		'omitScriptNameInUrls'  => true,
		'cpTrigger'             => 'admin',
		'limitAutoSlugsToAscii' => true,
		'timezone'              => 'Europe/Zurich',
		'securityKey'           => '$SECURITY_KEY',
		'useProjectConfigFile'  => false,
		'enableTemplateCaching' => true,
		'allowAdminChanges'     => false, // should only be enabled on "dev"
		'devMode'               => true,
		'aliases' => [
			'@assetBaseUrl'  => $_ENV['PRIMARY_SITE_URL'].'/files',
			'@assetBasePath' => CRAFT_BASE_PATH . '/web/files',
		],
		// ---------------------------------------------------------
		// Additional custom settings defaults

		// ---------------------------------------------------------
	],

	// Dev environment settings
	'dev' => [
		'enableTemplateCaching' => false,
		'allowAdminChanges'     => true, // Field changes etc. only on "dev"
		// ---------------------------------------------------------
		// Custom settings overwrites

		// ---------------------------------------------------------
	],

	// Staging environment settings
	'staging' => [
		// ---------------------------------------------------------
		// Custom settings overwrites

		// ---------------------------------------------------------
	],

	// Production environment settings
	'production' => [
		'devMode' => false,
		// ---------------------------------------------------------
		// Custom settings overwrites

		// ---------------------------------------------------------
	],
];
