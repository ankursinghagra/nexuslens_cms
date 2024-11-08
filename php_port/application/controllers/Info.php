<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Info extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('bootstrap');
		$this->load->helper('json');

		if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
			header("Access-Control-Allow-Origin: *");
			header("Access-Control-Allow-Headers: *");
			header("Access-Control-Allow-Credentials: true");
			header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
			header("Access-Control-Allow-Max-Age: 1000");
		}
	}

	public function index()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		$stream_clean = $this->security->xss_clean($this->input->raw_input_stream);
		$post_array = json_decode($stream_clean,1);
		$header = apache_request_headers();
		//$token = str_replace("Bearer ", '', $this->security->xss_clean($header['Authorization']));
	}
}

/* End of file Siteoptions.php */
/* Location: ./application/controllers/Siteoptions.php */