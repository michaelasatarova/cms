<?php
/**
 * Database Configuration
 *
 * All of your system's database connection settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/DbConfig.php.
 *
 * @see craft\config\DbConfig
 */

return [
	'dsn'         => $_ENV['DB_DSN'],
	'user'        => $_ENV['DB_USER'],
	'password'    => $_ENV['DB_PASSWORD'],
	'schema'      => $_ENV['DB_SCHEMA'],
	'tablePrefix' => $_ENV['DB_TABLE_PREFIX']
];
