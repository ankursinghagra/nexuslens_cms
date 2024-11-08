<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$config['site_name'] = ENV['SITE_NAME'];

$config['default_permissions'] = array(
		'siteoptions' => 'Site Options',
		'users' => 'Users',
		'groups' => 'User Groups',
		'permissions' => 'User Permissions',
		'employees_module' => 'Employees Module',
		'clients_module' => 'Clients Module',
		'locations_module' => 'Locations Module',
		'salary_module' => 'Salary Module',
		'billing_module' => 'Billing Module',
		//'pages' => 'Pages',
	);

$config['default_groups'] = array(
		'Administrators'=> array('id'=>'1', 'color'=>'primary', 'permissions' => '{"siteoptions":true,"users":true,"groups":true,"permissions":true,"employees_module":true,"clients_module":true,"locations_module":true,"salary_module":true,"billing_module":true}'),
		'Managers'=> array('id'=>'2', 'color'=>'success', 'permissions'=>'{"siteoptions":true,"clients_module":true,"employees_module":true}'),
		'Clerks'=> array('id'=>'3', 'color'=>'info', 'permissions'=>'{"salary_module":true,"billing_module":true}')
);

