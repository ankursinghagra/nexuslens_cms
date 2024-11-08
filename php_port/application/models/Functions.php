<?php
defined('BASEPATH') OR exit('No direct script access allowed');
#[\AllowDynamicProperties]
class Functions extends CI_Model {

	public function __construct()
	{
		parent::__construct();
		$this->data=array();
		$this->load->library('common');		
		$this->data['user_data']=$this->session->userdata('admin_user');
		if(isset($this->data['user_data']['admin_email'])){
			$this->data['user_data']=$this->all_user_data($this->data['user_data']['admin_email']);
		}
	}
	public function all_user_data($email){
		$sql = $this->db->get_where("admin_users",array('admin_email'=>$email));
		return $sql->row_array();
	}
	public function all_view_permissions_of_current_group(){
		$sql=$this->db->get_where('admin_groups',array('admin_group_id'=>$this->data['user_data']['admin_group'], 'admin_company_id'=>$this->data['user_data']['admin_company_id']));
		return json_decode($sql->row('view_permissions'));
	}
	public function all_modify_permissions_of_current_group(){
		$sql=$this->db->get_where('admin_groups',array('admin_group_id'=>$this->data['user_data']['admin_group'], 'admin_company_id'=>$this->data['user_data']['admin_company_id']));
		return json_decode($sql->row('modify_permissions'));
	}
	public function company_data(){
		$sql=$this->db->get_where('admin_users_company', array('uc_id'=>$this->data['user_data']['admin_company_id']));
		return $sql->row_array();
	}
	public function get_current_tier(){
		$sql = $this->db->query("SELECT * FROM plans_payments WHERE p_company_id='".$this->data['user_data']['admin_company_id']."' AND ('".time()."'> p_start) AND ('".time()."'< p_ends) ");
		if($sql->num_rows() > 0){
			return 'premium';
		}else{
			return 'free';
		}
	}
	public function modules(){
		$sql = $this->db->get('cms_modules');
		$array = array();
		foreach ($sql->result_array() as $key => $value) {
			$array[$value['module_slug']] = $value;
		}
		return $array;
	}
	public function login_checker(){
		if($this->session->has_userdata('admin_user')){
        	//session exists so 
        	//let it be
        	return true;
        }else{
        	//check if cookie exists 
			if($this->input->cookie('remember_me')){
				$cookie = $this->input->cookie('remember_me');
				//is cookie valid
				$sql_token=$this->db->query("SELECT * FROM admin_users WHERE admin_remember_me_token='".$cookie."' ");
				if($sql_token->num_rows()>0){
					//make session
					$this->load->model('loginfunctions');
					$this->loginfunctions->create_login_session($sql_token->row_array());
					//let it be
					$this->session->set_flashdata('message', alert('success','logged_in again'));
					redirect('login','refresh');
					return true;
				}else{
					//send to login
					return false;
	    		}
			}else{
				// cookie isnt set
				//send to login
				return false;
			}
        }
	}
	public function admin_hash_for_email_verification(){
		$code = $this->common->generateRandomString(32);
		$sql = $this->db->get_where('admin_users',array('admin_hash_for_email_verification'=>$code));
		if($sql->num_rows()>0){
			return $this->admin_hash_for_email_verification();
		}else{
			return $code;
		}
	}
	public function send_email_first_verification($data){

		$email_data = array();
		$email_data['preheader'] = 'SGEMS x '.$data['admin_company_name'].'';
		$email_data['html_array'] = array(
			array(
				'tag' => 'h2',
				'content' => 'Hi '.$data['admin_name'].'',
			),
			array(
				'tag' => 'p',
				'content' => 'You are added to the SGEMS panel of '.$data['admin_company_name'].', please click the following link to create your password. if this link is not meant for you, please ignore this mail.',
			),
			array(
				'tag' => 'button',
				'url' => base_url().'login/verify_email/'.$data['admin_hash_for_email_verification'],
				'content' => 'Click Here to create password',
			),
			array(
				'tag' => 'p',
				'content' => 'Later on you can use these credentials to login : <br>Company Id (required for login): <i>'.$data['admin_company'].'</i>  <br>Email address: <i>'.$data['admin_email'].'</i> <br>Password: <i>Your chosen password</i>',
			),
			array(
				'tag' => 'p',
				'content' => 'Thank You',
			),
		);

		$HTML = $this->load->view('emails/default',$email_data,TRUE);
		return $this->common->send_email($data['admin_email'],$data['admin_name'],'SGEMS : Congrats! You are added to '.$data['admin_company_name'].' ',$HTML);
	}
	public function send_email_first_verification_for_new_company($data){

		$email_data = array();
		$email_data['preheader'] = 'SGEMS Next Step for your registration';
		$email_data['html_array'] = array(
			array(
				'tag' => 'h2',
				'content' => 'Hi '.$data['name'].'',
			),
			array(
				'tag' => 'p',
				'content' => 'You have sent a request to register your agency with our Employee Management System .if this link is not meant for you, please ignore this mail.',
			),
			array(
				'tag' => 'button',
				'url' => base_url().'register_final/'.$data['hash'],
				'content' => 'Click Here to create password',
			),
			array(
				'tag' => 'p',
				'content' => 'Thank You',
			),
		);

		$HTML = $this->load->view('emails/default',$email_data,TRUE);
		return $this->common->send_email($data['email'],$data['name'],'SGEMS Next Step for your registration',$HTML);
	}
	public function send_welcome_mail($data){

		$email_data = array();
		$email_data['preheader'] = 'SGEMS Your login credentials';
		$email_data['html_array'] = array(
			array(
				'tag' => 'h2',
				'content' => 'Hi '.$data['admin_name'].'',
			),
			array(
				'tag' => 'p',
				'content' => 'Thank you for creating your account. Your login credentials are as follows: ',
			),
			array(
				'tag' => 'p',
				'content' => 'Company Id (required for login): <i>'.$data['admin_company'].'</i>  <br>Email address: <i>'.$data['admin_email'].'</i> <br>Password: <i>Your chosen password</i>',
			),
			array(
				'tag' => 'p',
				'content' => 'Thank You',
			),
		);

		$HTML = $this->load->view('emails/default',$email_data,TRUE);
		return $this->common->send_email($data['admin_email'],$data['admin_name'],'SGEMS Your login credentials ',$HTML);
	}
	public function send_payment_mail_self($data){

		$email_data = array();
		$email_data['preheader'] = 'SGEMS: Payment Notify from '.$data['admin_company'];
		$email_data['html_array'] = array(
			array(
				'tag' => 'h2',
				'content' => 'Hi ',
			),
			array(
				'tag' => 'p',
				'content' => 'Review a Payment of <br><i>'.$data['transaction_amount'].'</i>, <br>done by <i>'.$data['transaction_name'].'</i> (<i>'.$data['transaction_phone'].'</i>), <br>transaction id : <i>'.$data['transaction_id'].'</i> , <br>transaction time : <i>'.$data['transaction_time'].'</i>. ',
			),
			array(
				'tag' => 'p',
				'content' => '<br>Company Id : <i>'.$data['admin_company'].'</i>  <br>Email address: <i>'.$data['admin_email'].'</i> <br>Admin Name: <i>'.$data['admin_name'].'</i> <br>',
			),
			array(
				'tag' => 'p',
				'content' => 'Thank You',
			),
		);

		$HTML = $this->load->view('emails/default',$email_data,TRUE);
		return $this->common->send_email('ankursinghagra@gmail.com','Ankur Singh','SGEMS : Payment Notify from '.$data['admin_company'],$HTML);
	}
	public function send_payment_mail_customer_notify($data){

		$email_data = array();
		$email_data['preheader'] = 'SGEMS: '.$data['admin_company'];
		$email_data['html_array'] = array(
			array(
				'tag' => 'h2',
				'content' => 'Hi ',
			),
			array(
				'tag' => 'p',
				'content' => 'You have notified us about a transaction done on SGEMS for '.$data['admin_company'].'. Payment details are as follows: <br>Amount <i>'.$data['transaction_amount'].'</i>, <br>Your name <i>'.$data['transaction_name'].'</i> (<i>'.$data['transaction_phone'].'</i>), <br>transaction id : <i>'.$data['transaction_id'].'</i> , <br>transaction time : <i>'.$data['transaction_time'].'</i>. ',
			),
			array(
				'tag' => 'p',
				'content' => '<br>Company Id : <i>'.$data['admin_company'].'</i>  <br>Email address: <i>'.$data['admin_email'].'</i> <br>Admin Name: <i>'.$data['admin_name'].'</i> <br>',
			),
			array(
				'tag' => 'p',
				'content' => 'Please Note: Please wait 24 hours before we verify this transaction on our end. In case its still not processed, please contact support.',
			),
			array(
				'tag' => 'p',
				'content' => 'Thank You',
			),
		);

		$HTML = $this->load->view('emails/default',$email_data,TRUE);
		return $this->common->send_email($data['admin_email'], $data['admin_name'],'SGEMS : Payment Notification - '.$data['admin_company'],$HTML);
	}
	public function send_plan_start_mail($data){

		$email_data = array();
		$email_data['preheader'] = 'SGEMS: '.$data['uc_company_name'];
		$email_data['html_array'] = array(
			array(
				'tag' => 'h2',
				'content' => 'Hi ',
			),
			array(
				'tag' => 'p',
				'content' => 'A Premium plan for '.$data['uc_company_name'].' on SGEMS is started . Plan details are as follows: <br>Amount <i>'.$data['transaction_amount'].'</i>, <br>Company <i>'.$data['uc_company_name'].'</i> , <br>Start Date: <i>'.date('d-F-Y h:i:s a', $data['p_start']).'</i> , <br>End date : <i>'.date('d-F-Y h:i:s a', $data['p_ends']).'</i>. ',
			),
			array(
				'tag' => 'p',
				'content' => 'Thank You',
			),
		);

		$HTML = $this->load->view('emails/default',$email_data,TRUE);
		return $this->common->send_email($data['admin_email'], $data['admin_name'],'SGEMS : '.$data['uc_company_name'].' '.$data['days'].' Days plan started',$HTML);
	}
	// input : $year = the year the month is in, eg 2010
	// input : $month = the month , eg 5 for may
	// input : $ignore = index of the day to ignore, eg 6 for sunday, 0 for monday
	public function calWorkingDays($year, $month,$ignore=array("Sun")) {
	    $count = 0;
	    $day_count = cal_days_in_month(CAL_GREGORIAN, $month, $year);
		for ($i = 1; $i <= $day_count; $i++) {

	        $date = $year.'/'.$month.'/'.$i; //format date
	        $get_name = date('l', strtotime($date)); //get week day
	        $day_name = substr($get_name, 0, 3); // Trim day name to 3 chars

	        if(!in_array($day_name, $ignore)) {
	            $count++;
	        }

		}
	    return $count;
	}
	public function new_reg_hash_for_email_verification(){
		$code = $this->common->generateRandomString(32);
		$sql = $this->db->get_where('admin_users',array('admin_hash_for_email_verification'=>$code));
		if($sql->num_rows()>0){
			return $this->new_reg_hash_for_email_verification();
		}else{
			return $code;
		}
	}
	public function create_company_name($name){
		$code = substr(str_replace(' ', '', strtolower($name)), 0, 7).rand(10,99);
		$sql = $this->db->get_where('admin_users_company',array('uc_name'=>$code));
		if($sql->num_rows()>0){
			return $this->create_company_name($name);
		}else{
			return $code;
		}

	}
	public function create_login_session($row){
		$array=array(
			'admin_user' => array(
	        	'admin_email'     	=> $row['admin_email'],
				'admin_name'		=> $row['admin_name'],
				'admin_group'		=> $row['admin_group'],
	        	'logged_in' 		=> TRUE
			)
		);
		return $this->session->set_userdata($array);
    }
    public function generate_remember_me_token(){
    	$token = $this->common->generateRandomString(32);
    	$sql = $this->db->get_where('admin_users',array('admin_remember_me_token'=>$token));
    	if($sql->num_rows()>0){
    		return $this->common->generate_remember_me_token();
    	}else{
    		return $token;
    	}
    }
    public function generate_reset_password_token(){
    	$token = $this->common->generateRandomString(32);
    	$sql = $this->db->get_where('admin_users',array('admin_hash_for_password_reset'=>$token));
    	if($sql->num_rows()>0){
    		return $this->common->generate_reset_password_token();
    	}else{
    		return $token;
    	}
    }
    public function send_email_password_reset($row,$code){
        $email_data = array();
        $email_data['preheader'] = 'Password Reset Link';
        $email_data['html_array'] = array(
            array(
                'tag' => 'h2',
                'content' => 'Hello',
            ),
            array(
                'tag' => 'p',
                'content' => 'Dear '.$row['admin_name'].', You have requested to reset your password . If you didnt requested this, please ignore this mail.',
            ),
            array(
                'tag' => 'button',
                'url' => base_url().'login/reset_password/'.$row['admin_hash_for_password_reset'],
                'content' => 'Click Here to Change Password',
            ),
            array(
                'tag' => 'p',
                'content' => 'Thank You',
            ),
        );

        $HTML = $this->load->view('emails/default',$email_data,TRUE);
        return $this->common->send_email($row['admin_email'],$row['admin_name'],'Password Reset Request',$HTML);
    }
}

/* End of file functions.php */
/* Location: ./application/models/functions.php */