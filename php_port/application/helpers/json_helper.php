<?php
defined('BASEPATH') OR exit('No direct script access allowed');

	function json_output($statusHeader,$response)
	{
		$ci =& get_instance();
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: *");
		header("Access-Control-Allow-Credentials: true");
		header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
		header("Access-Control-Allow-Max-Age: 1000");
		$ci->output->set_content_type('application/json');
		$ci->output->set_status_header($statusHeader);
		$ci->output->set_output(json_encode($response));
	}