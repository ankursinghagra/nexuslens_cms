<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

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
		//var_dump($stream_clean);exit;
		$post_array = json_decode($stream_clean,1);
		$company_name = $post_array['company_name'];
		$email_address = $post_array['email_address'];
		$password = md5($post_array['password']);

		$sql_comp = $this->db->query("SELECT * FROM admin_users_company WHERE uc_name='".$company_name."' LIMIT 1 ");
		if ($sql_comp->num_rows()>0) {
			$c_row = $sql_comp->row_array();
			$company_id = $c_row['uc_id'];
			
			$sql = $this->db->query("SELECT * FROM data_employees WHERE employees_email = '".$email_address."' AND employees_company_id='".$company_id."' LIMIT 1 ");
			if($sql->num_rows()>0){

				$row = $sql->row();
				if($row->employees_password == $password){

					$token=$this->guardsapi->generate_token();

					json_output(200,array( 
						'status' => true,
						'message' => 'Login Successful',
						'email_address' => $row->employees_email,
						'name' => $row->employees_name,
						'company_id'=>$company_id,
						'token'=> $token,
					));

					$this->db->update(
						'data_employees',
						array(
							'employees_token'=>$token,
						),
						array(
							'employees_email'=>$email_address
						)
					);
				}else{
					json_output(200,array('status' => false, 'message' => 'invalid_password'));
				}
			}else{
				json_output(200,array('status' => false, 'message' => 'invalid_email'));
			}
		}else{
			json_output(200,array('status' => false, 'message' => 'invalid_company_name'));
		}


	}

	public function user_info()
	{
		$method = $_SERVER['REQUEST_METHOD'];

		$stream_clean = $this->security->xss_clean($this->input->raw_input_stream);
		//var_dump($stream_clean);exit;
		$post_array = json_decode($stream_clean,1);
		$header = apache_request_headers();
		$token = $this->security->xss_clean($header['Auth-Token']);

		$sql = $this->db->query("SELECT * FROM data_employees WHERE employees_token='$token' LIMIT 1");
		if ($sql->num_rows()>0) {
			$employees_info = $sql->row_array();
			unset($employees_info['employees_password']);
			$employees_info['employees_photo'] = base_url().'uploads/employees/'.$employees_info['employees_photo'];
			$employees_info['employees_photo_sign'] = base_url().'uploads/employees/'.$employees_info['employees_photo_sign'];
			$employees_info['employees_aadhar'] = base_url().'uploads/employees/'.$employees_info['employees_aadhar'];
			$employees_info['employees_photo_aadhar'] = base_url().'uploads/employees/'.$employees_info['employees_photo_aadhar'];
			json_output(200,array('status' => true, 'invalid_user' => false, 'message' => '','employees_info'=>$employees_info));
		}else{
			json_output(200,array('status' => false, 'invalid_user' => true, 'message' => 'Invalid Login'));
		}
	}
	public function change_password()
	{
		$method = $_SERVER['REQUEST_METHOD'];

		$stream_clean = $this->security->xss_clean($this->input->raw_input_stream);
		//var_dump($stream_clean);exit;
		$post_array = json_decode($stream_clean,1);
		$header = apache_request_headers();
		$token = $this->security->xss_clean($header['Auth-Token']);

		$sql = $this->db->query("SELECT * FROM data_employees WHERE employees_token='$token' LIMIT 1");
		if ($sql->num_rows()>0) {
			$employees_info = $sql->row_array();

			$real_old_password = $employees_info['employees_password'];
			$post_old_password = md5($post_array['old_password']);
			$post_new_password = md5($post_array['new_password']);

			if($real_old_password == $post_old_password){

				if (isset($post_new_password)&&(!empty($post_new_password))) {
					$sql = $this->db->update('data_employees',array('employees_password'=>$post_new_password),array('employees_id'=>$employees_info['employees_id']));
					json_output(200,array('status' => true, 'invalid_user' => false, 'message' => 'Password Successfully Changed',));
				}else{
					json_output(200,array('status' => false, 'invalid_user' => false, 'message' => 'New Password Cannot Be Blank',));
				}
			}else{

				json_output(200,array('status' => false, 'invalid_user' => false, 'message' => 'Wrong Password',));
			}
			
		}else{
			json_output(200,array('status' => false, 'invalid_user' => true, 'message' => 'Invalid Login'));
		}
	}
	public function forgot_password()
	{
		$method = $_SERVER['REQUEST_METHOD'];

		$stream_clean = $this->security->xss_clean($this->input->raw_input_stream);
		//var_dump($stream_clean);exit;
		$post_array = json_decode($stream_clean,1);
		$email_address = $post_array['email_address'];

			
		$sql = $this->db->query("SELECT * FROM data_employees WHERE employees_email = '".$email_address."' LIMIT 1 ");
		if($sql->num_rows()>0){

			$row = $sql->row_array();
			$token=$this->guardsapi->generate_reset_password_code();

			$email_sent=$this->guardsapi->send_email($row,base_url().'api-guard/login/new_password_form/'.$row['employees_id'].'/'.$token);

			json_output(200,array( 
				'status' => true,
				'message' => 'Email Sent . Check Your Email Inbox',
			));

			$this->db->update(
				'data_employees',
				array(
					'employees_forget_password_token'=>$token,
				),
				array(
					'employees_email'=>$email_address
				)
			);

		}else{
			json_output(200,array('status' => false, 'message' => 'Invalid Email'));
		}
	}
	public function new_password_form($employees_id=null,$code=null)
	{
		if(!empty($employees_id)&&!empty($code))
		{
			$sql = $this->db->get_where('data_employees',array(
				'employees_id'=>$employees_id,
				'employees_forget_password_token'=>$code,
			));

			if ($sql->num_rows()>0) {
				
				//$this->data=array();

				if ($this->input->post()) {
					$this->form_validation->set_error_delimiters('<div class="alert alert-danger alert-fill">','</div>');
					$this->form_validation->set_rules('password_one', 'Password', 'trim|required|min_length[5]|max_length[30]');
					$this->form_validation->set_rules('password_two', 'Repeat Password', 'trim|required|min_length[5]|max_length[30]|matches[password_one]');
					if ($this->form_validation->run() == TRUE) {
						$sql = $this->db->update('data_employees',array('employees_password'=>md5($this->input->post('password_one')),'employees_forget_password_token'=>''),array('employees_id'=>$employee_id,));
						redirect('api-guard/login/new_password_form?success=1','refresh');
					}
				}

				$this->load->view('emails/forgot_password_form',$this->data);

			}else{
				echo 'link expired. Try again.';
			}

		}elseif ($this->input->get('success')) {
			$this->data['success']=true;
			$this->load->view('emails/forgot_password_form',$this->data);
		}else{
			echo 'link expired. Try again.';
		}
	}

}

/* End of file Siteoptions.php */
/* Location: ./application/controllers/Siteoptions.php */