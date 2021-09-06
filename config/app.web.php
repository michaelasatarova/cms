<?php

/**
 * Yii Application Config
 *
 * Edit this file at your own risk!
 *
 * The array returned by this file will get merged with
 * vendor/craftcms/cms/src/config/app.php and app.[web|console].php, when
 * Craft's bootstrap script is defining the configuration for the entire
 * application.
 *
 * You can define custom modules and system components, and even override the
 * built-in system components.
 *
 * If you want to modify the application config for *only* web requests or
 * *only* console requests, create an app.web.php or app.console.php file in
 * your config/ folder, alongside this one.
 */

use Craft;
use craft\helpers\App;

return [
	'*' => [
		'modules' => [],
		'bootstrap' => [],
	],
	'dev' => [
		'components' => [
			'mailer' => function () {
				// Get the stored email settings
				$settings = App::mailSettings();

				// Override the transport adapter class
				$settings->transportType = \craft\mail\transportadapters\Smtp::class;

				// Override the transport adapter settings
				$settings->transportSettings = [
					'host'              => $_ENV['SMTP_MAILER_HOST'],
					'username'          => $_ENV['SMTP_MAILER_USER'],
					'password'          => $_ENV['SMTP_MAILER_PASS'],
					'port'              => $_ENV['SMTP_MAILER_PORT'],
					'encryptionMethod'  => $_ENV['SMTP_MAILER_ENCR'],
					'useAuthentication' => true,
				];

				$config = App::mailerConfig($settings);
				return Craft::createObject($config);
			}
		],
	]
];
