<?php

namespace modules;

use Craft;
use craft\helpers\ArrayHelper;
use craft\helpers\Json;
use craft\log\FileTarget;

trait ModuleTrait
{
	// -----------------------------------------------------
	// Static

	/**
	 * Log info message
	 *
	 * @param  string|mixed $message Any other than string will be JSON encoded
	 * @return void
	 */
	public static function info($message, string $category = ''): void
	{
		if (\gettype($message) !== 'string') {
			$message = Json::encode($message); //, \JSON_PRETTY_PRINT);
		}
		if (empty($category)) {
			$category = self::getInstance()->id;
		}
		Craft::info($message, $category);
	}

	/**
	 * Log a warning
	 *
	 * @param  string|mixed $message Any other than string will be JSON encoded
	 * @return void
	 */
	public static function warning($message, string $category = ''): void
	{
		if (\gettype($message) !== 'string') {
			$message = Json::encode($message); //, \JSON_PRETTY_PRINT);
		}
		if (empty($category)) {
			$category = self::getInstance()->id;
		}
		Craft::warning($message, $category);
	}

	/**
	 * Log an error
	 *
	 * @param  string|mixed $message Any other than string will be JSON encoded
	 * @return void
	 */
	public static function error($message, string $category = ''): void
	{
		if (\gettype($message) !== 'string') {
			$message = Json::encode($message, \JSON_PRETTY_PRINT);
		}
		if (empty($category)) {
			$category = self::getInstance()->id;
		}
		Craft::error($message, $category);
	}

	// -----------------------------------------------------
	// Instance related

	/**
	 * logTarget
	 *
	 * @var \yii\log\Target
	 */
	private $logTarget;

	/**
	 * Adds a log file with the listed categories
	 *
	 * @param  string $name Must be a valid filename without the extension
	 * @param  string[] $categories
	 * @return void
	 */
	private function _addLogTarget(string $name, $categories = [], bool $excludeFromOthers = true)
	{
		if (empty($name)) {
			$name = $this->id; // module ID
		}
		$targets = Craft::$app->getLog()->targets;
		$craftLogTarget = \reset($targets) ?? null;

		// exclude category from existing logs
		if ($excludeFromOthers && !\is_null($craftLogTarget)) {
			foreach ($categories as $category) {
				$craftLogTarget->except[] = $category;
			}
		}
		$this->logTarget = new FileTarget(
			[
				'logFile'    => Craft::getAlias("@storage/logs/$name.log"),
				'categories' => $categories,
				'logVars'    => []
			]
		);
		Craft::$app->getLog()->targets[$name] = $this->logTarget;
	}


	/**
	 * Only used in job classes
	 * Craft changes the log target before executing jobs.
	 * This method is called a the beginning of a job to ensure the
	 * log target is our custom file.
	 */
	public function setJobLogTargetPath()
	{
		$this->logTarget->logFile = Craft::getAlias("@storage/logs/$this->id.log");
		$this->logTarget->logVars = [];
	}
}
