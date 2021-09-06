<?php
$finder = PhpCsFixer\Finder::create()
  ->in(__DIR__)
  ->files('*.php');


// Rules: https://mlocati.github.io/php-cs-fixer-configurator/?version=2.10

return PhpCsFixer\Config::create()
	->setRules(
		[
			'@PSR2'                                       => true,
			'no_multiline_whitespace_around_double_arrow' => true,
			'binary_operator_spaces'                      => [
				'operators' => [
						'=>' => 'align_single_space_minimal'
				]
			],
		]
	)
	->setFinder($finder)
	->setIndent("\t")
;
