<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Duties extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		//Do your magic here
		$this->load->helper('bootstrap');
		$this->load->helper('json');
		$this->load->model('guardsapi');
		$this->data['site_name']=$this->config->item('site_name');
		$this->data['main_url']=$this->config->item('main_url');

		$this->data['cms_options']=$this->common->cms_options();

		$sql = $this->db->query("SELECT * FROM data_guard_types");
		$this->data['employee_types'] = $sql->result_array();
		$this->data['employee_types_alt'] = array();
		foreach ($this->data['employee_types'] as $key => $row) {
			$this->data['employee_types_alt'][$row['guard_type_id']] =  $row['guard_type_title'];
		}

		if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
			header("Access-Control-Allow-Origin: *");
			header("Access-Control-Allow-Headers: *");
			header("Access-Control-Allow-Credentials: true");
			header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
			header("Access-Control-Allow-Max-Age: 1000");
		}

	}

	public function index(){

	}


	public function schedule()
	{

		$method = $_SERVER['REQUEST_METHOD'];

		$stream_clean = $this->security->xss_clean($this->input->raw_input_stream);
		$post_array = json_decode($stream_clean,1);
		//var_dump($post_array);exit;
		$header = apache_request_headers();
		//var_dump($header);exit();
		$token = str_replace("Bearer ", '', $this->security->xss_clean($header['Authorization']));

		$sql = $this->db->query("SELECT * FROM data_employees WHERE employees_token='$token' LIMIT 1");
		if ($sql->num_rows()>0) 
		{
			$employees_info = $sql->row_array();

			$today = array(
				'day'=>date('d'),
				'month'=>date('m'),
				'year'=>date('Y'),
			);

			if ( 
				isset($post_array['day']) && !empty($post_array['day']) &&
				isset($post_array['month']) && !empty($post_array['month']) &&
				isset($post_array['year']) && !empty($post_array['year']) 
			 ) {

				$day = $post_array['day'];
				$month = $post_array['month'];
				$year = $post_array['year'];
				
			}else{

				$day = $today['day'];
				$month = $today['month'];
				$year = $today['year'];
			}
			//

			$duties_array = array();
			$sql = $this->db->query("
				SELECT * FROM data_duties 
				AS D JOIN data_locations AS L 
				ON L.location_id = D.duties_location_id 
				WHERE D.duties_day = '".$day."' AND D.duties_month = '".$month."' AND D.duties_year = '".$year."' AND D.duties_guard_id = '".$employees_info['employees_id']."' ");
			if ($sql->num_rows()>0) 
			{
				$duties_array = $sql->result_array();
			}


			json_output(200, array(
				'status' => true, 
				'invalid_user' => false,
				'message' => '', 
				'query_date'=> array(
					'day' => $day,
					'month' => $month,
					'year' => $year,
				), 
				'query_date_prev_day'=> array(
					'day' => date('d', strtotime($year.'-'.$month.'-'.$day.' -1 day')),
					'month' => date('m', strtotime($year.'-'.$month.'-'.$day.' -1 day')),
					'year' => date('Y', strtotime($year.'-'.$month.'-'.$day.' -1 day')),
				),
				'query_date_next_day'=> array(
					'day' => date('d', strtotime($year.'-'.$month.'-'.$day.' +1 day')),
					'month' => date('m', strtotime($year.'-'.$month.'-'.$day.' +1 day')),
					'year' => date('Y', strtotime($year.'-'.$month.'-'.$day.' +1 day')),
				),
				'today'=>$today,
				'duties'=>$duties_array,
			));	

		}else{
			json_output(200 ,array('status' => false, 'invalid_user' => true, 'message' => 'Invalid Login'));
		}
	}
}

/* End of file Duties.php */
/* Location: ./application/controllers/api-guard/Duties.php */