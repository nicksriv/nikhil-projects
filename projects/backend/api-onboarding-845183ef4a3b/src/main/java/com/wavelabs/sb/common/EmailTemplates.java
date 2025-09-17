package com.wavelabs.sb.common;

public class EmailTemplates {

    public static final String CHANGE_CLIENT_PASSWORD_TEMPLATE = "<!doctype html>\r\n" + "<html lang=\"en\">\r\n"
	    + "<head>\r\n" + "    <meta charset=\"UTF-8\">\r\n"
	    + "    <meta name=\"viewport\" content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\r\n"
	    + "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n"
	    + "    <title>Password Changed</title>\r\n" + "</head>\r\n" + "<body>\r\n"
	    + "  <h1>Hello, Password changed successfully! </h1>\r\n"
	    + "  <div> This email includes your account details with new password, Please keep it safe!</div>\r\n"
	    + "   <div style=\"margin-top: 10px\"> Appliaction URL : <a href=\"url\">brandpulse.com</a></b></div>\r\n"
	    + "  <div > ClientId : <b>${credentials.clientId}</b></div>\r\n"
	    + "  <div>  Username : <b>${credentials.clientName}</b></div>\r\n"
	    + "  <div > New Password : <b>${credentials.password}</b></div>\r\n" + "<br>\r\n"
	    + " <div> Questions? Check out our <b>User guide and Videos</b> or Drop us a line </div>\r\n"
	    + "<div> we are here to help. </div>\r\n" + "</br>\r\n" + "<br/>\r\n" + "<div> Sincerely, </div>\r\n"
	    + "<div> Your brand pulse Team!</div>\r\n" + "</body>\r\n" + "</html>";
    public static final String CHANGE_USER_PASSWORD_TEMPLATE = "";
    public static final String SUBJECT_CLIENT_ONBOARDING_CREDENTIALS = "Client Onboarding Credential";

    public static final String SUBJECT_USER_ONBOARDING_CREDENTIALS = "User Onboarding Credential";
    public static final String SHARE_CLIENT_CREDENTIALS_TEMPLATE = "<!doctype html>\r\n" + "<html lang='en'>\r\n"
	    + "<head>\r\n" + "    <meta charset='UTF-8'>\r\n"
	    + "    <meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>\r\n"
	    + "    <meta http-equiv='X-UA-Compatible' content='ie=edge'>\r\n"
	    + "    <title>Spring Boot Email using FreeMarker</title>\r\n" + "</head>\r\n" + "<body>\r\n"
	    + "  <h1>Welcome to BrandPulse</h1>\r\n"
	    + "  <div> This email includes your account details , Please keep it safe!</div>\r\n"
	    + "   <div style='margin-top: 10px'> Appliaction URL : <a href='url'>brandpulse.com</a></b></div>\r\n"
	    + "  <div > ClientId : <b>${credentials.clientId}</b></div>\r\n"
	    + "  <div>  Username : <b>${credentials.clientName}</b></div>\r\n"
	    + "  <div > Password : <b>${credentials.password}</b></div>\r\n"
	    + "  <div >Account CreationDate : <b>${credentials.createdAt}</b></div> \r\n" + "<br>\r\n"
	    + " <div> Questions? Check out our <b>User guide and Videos</b> or Drop us a line </div>\r\n"
	    + "<div> we are here to help. </div>\r\n" + "</br>\r\n" + "<br/>\r\n" + "<div> All the best</div>\r\n"
	    + "<div> Your brand pulse Team!</div>\r\n" + "</body>\r\n" + "</html>";
    public static final String SHARE_USER_CREDENTIALS_TEMPLATE = "<!doctype html>\r\n" + "<html lang='en'>\r\n"
	    + "<head>\r\n" + "    <meta charset='UTF-8'>\r\n"
	    + "    <meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>\r\n"
	    + "    <meta http-equiv='X-UA-Compatible' content='ie=edge'>\r\n"
	    + "    <title>User Credentials</title>\r\n" + "</head>\r\n" + "<body>\r\n"
	    + "  <h1>Welcome to BrandPulse</h1>\r\n"
	    + "  <div> This email includes your account details , Please keep it safe!</div>\r\n"
	    + "   <div style='margin-top: 10px'> Appliaction URL : <a href='url'>brandpulse.com</a></b></div>\r\n"
	    + "  <div > User ID : <a><b>${credentials.userId}</b></a></div>\r\n"
	    + "  <div>  Username : <a><b>${credentials.name}</b></a></div>\r\n"
	    + "  <div > Password : <a><b>${credentials.password}</b></a></div>\r\n"
	    + "  <div >Account CreationDate : <a><b>${credentials.createdAt}</b></a></div>\r\n" + "<br>\r\n"
	    + " <div> Questions? Check out our <b>User guide and Videos</b> or Drop us a line </div>\r\n"
	    + "<div> we are here to help. </div>\r\n" + "</br>\r\n" + "<br/>\r\n" + "<div> All the best</div>\r\n"
	    + "<div> Your brand pulse Team!</div>\r\n" + "</body>\r\n" + "</html>";


		public static final String SUBJECT_VENDOR_ONBOARDING_CREDENTIALS = "Vendor Onboarding Credential";
		public static final String SHARE_VENDOR_CREDENTIALS_TEMPLATE = "<!doctype html>\r\n" + "<html lang='en'>\r\n"
	    + "<head>\r\n" + "    <meta charset='UTF-8'>\r\n"
	    + "    <meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>\r\n"
	    + "    <meta http-equiv='X-UA-Compatible' content='ie=edge'>\r\n"
	    + "    <title>Spring Boot Email using FreeMarker</title>\r\n" + "</head>\r\n" + "<body>\r\n"
	    + "  <h1>Welcome to BrandPulse</h1>\r\n"
	    + "  <div> This email includes your account details , Please keep it safe!</div>\r\n"
	    + "   <div style='margin-top: 10px'> Appliaction URL : <a href='url'>brandpulse.com</a></b></div>\r\n"
	    + "  <div > VendorId : <b>${credentials.vendorId}</b></div>\r\n"
	    + "  <div>  Username : <b>${credentials.vendorName}</b></div>\r\n"
	    + "  <div > Password : <b>${credentials.password}</b></div>\r\n"
	    + "  <div >Account CreationDate : <b>${credentials.createdAt}</b></div> \r\n" + "<br>\r\n"
	    + " <div> Questions? Check out our <b>User guide and Videos</b> or Drop us a line </div>\r\n"
	    + "<div> we are here to help. </div>\r\n" + "</br>\r\n" + "<br/>\r\n" + "<div> All the best</div>\r\n"
	    + "<div> Your brand pulse Team!</div>\r\n" + "</body>\r\n" + "</html>";

		
	public static final String CHANGE_QUALITY_ASSURANCE_PASSWORD_TEMPLATE = "<!doctype html>\r\n"
			+ "<html lang=\"en\">\r\n"
			+ "<head>\r\n" + "    <meta charset=\"UTF-8\">\r\n"
			+ "    <meta name=\"viewport\" content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\r\n"
			+ "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n"
			+ "    <title>Password Changed</title>\r\n" + "</head>\r\n" + "<body>\r\n"
			+ "  <h1>Hello, Password changed successfully! </h1>\r\n"
			+ "  <div> This email includes your account details with new password, Please keep it safe!</div>\r\n"
			+ "   <div style=\"margin-top: 10px\"> Appliaction URL : <a href=\"url\">brandpulse.com</a></b></div>\r\n"
			+ "  <div > QualityAssuranceId : <b>${credentials.qualityAssuranceId}</b></div>\r\n"
			+ "  <div>  Username : <b>${credentials.qualityAssuranceName}</b></div>\r\n"
			+ "  <div > New Password : <b>${credentials.password}</b></div>\r\n" + "<br>\r\n"
			+ " <div> Questions? Check out our <b>User guide and Videos</b> or Drop us a line </div>\r\n"
			+ "<div> we are here to help. </div>\r\n" + "</br>\r\n" + "<br/>\r\n" + "<div> Sincerely, </div>\r\n"
			+ "<div> Your brand pulse Team!</div>\r\n" + "</body>\r\n" + "</html>";
	public static final String CHANGE_QUALITYASSURANCE_PASSWORD_TEMPLATE = "";
	public static final String SUBJECT_QUALITY_ASSURANCE_CREDENTIALS = "Quality Assurance Credential";

	public static final String SHARE_QUALITY_ASSURANCE_CREDENTIALS_TEMPLATE = "<!doctype html>\r\n" + "<html lang='en'>\r\n"
			+ "<head>\r\n" + "    <meta charset='UTF-8'>\r\n"
			+ "    <meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>\r\n"
			+ "    <meta http-equiv='X-UA-Compatible' content='ie=edge'>\r\n"
			+ "    <title>Spring Boot Email using FreeMarker</title>\r\n" + "</head>\r\n" + "<body>\r\n"
			+ "  <h1>Welcome to BrandPulse</h1>\r\n"
			+ "  <div> This email includes your account details , Please keep it safe!</div>\r\n"
			+ "   <div style='margin-top: 10px'> Appliaction URL : <a href='url'>brandpulse.com</a></b></div>\r\n"
			+ "  <div > QualityAssuranceId : <b>${credentials.qualityAssuranceId}</b></div>\r\n"
			+ "  <div>  Username : <b>${credentials.qualityAssuranceName}</b></div>\r\n"
			+ "  <div > Password : <b>${credentials.password}</b></div>\r\n"
			+ "  <div >Account CreationDate : <b>${credentials.createdAt}</b></div> \r\n" + "<br>\r\n"
			+ " <div> Questions? Check out our <b>User guide and Videos</b> or Drop us a line </div>\r\n"
			+ "<div> we are here to help. </div>\r\n" + "</br>\r\n" + "<br/>\r\n" + "<div> All the best</div>\r\n"
			+ "<div> Your brand pulse Team!</div>\r\n" + "</body>\r\n" + "</html>";
}


