<?php
/**
 * Craft web bootstrap file
 */

// Set path constants
define('CRAFT_BASE_PATH', dirname(__DIR__));
define('CRAFT_VENDOR_PATH', CRAFT_BASE_PATH.'/vendor');

// Load Composer's autoloader
require_once CRAFT_VENDOR_PATH.'/autoload.php';

// Load dotenv
$dotenv = Dotenv\Dotenv::createImmutable(CRAFT_BASE_PATH);
$dotenv->load();
$dotenv->required([
	'PRIMARY_SITE_URL',
	'DB_DSN', 'DB_USER', 'DB_PASSWORD', 'DB_TABLE_PREFIX', 'DB_SCHEMA',
]);

// Load and run Craft
define('CRAFT_ENVIRONMENT', $_ENV['ENVIRONMENT'] ?: 'production');
$app = require CRAFT_VENDOR_PATH.'/craftcms/cms/bootstrap/web.php';
$app->run();
