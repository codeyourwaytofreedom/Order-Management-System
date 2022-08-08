
var eml = document.getElementById("email");
var psw = document.getElementById("password");

const warning_login = document.getElementById("warning_login");
const warning_psw = document.getElementById("warning_password");
const warning_email = document.getElementById("warning_email");

const the_form = document.getElementById("the_form");

let eml_warning_available = false;
let psw_warning_available = false;

let eml_ok = false;
let psw_ok = false;

eml.addEventListener("keyup", check)
psw.addEventListener("keyup", check)


eml.addEventListener ("focus", focus)
psw.addEventListener ("focus", focus)



function check()
        {
                var v = document.getElementById(this.id).value;
                var mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                var chk = 0;

                if (this.id == "email" )
                {
                        if (v.length==0)
                                {warning_email.style.display = "none";
                                document.getElementById(this.id).style.borderColor = "#fff";
                                eml_warning_available=false;
                                eml_ok=false;}

                       else if(!v.match(mail_format))
                       {      warning_email.style.display = "block";
                              document.getElementById(this.id).style.borderColor = "red";
                              eml_warning_available=true;
                              eml_ok=false;

                       }
                       else {warning_email.style.display = "none";
                            document.getElementById(this.id).style.borderColor = "#fff";
                            eml_warning_available=false;
                            eml_ok=true;
                            }

                }


                else if (this.id == "password")
                {
                        if (v.length!=0 && v.length<6 || v.length>10)
                        {       warning_password.style.display="block";
                                document.getElementById(this.id).style.borderColor = "red";
                                psw_warning_available=true;
                                psw_ok=false;
                        }
                        else
                        {
                                document.getElementById(this.id).style.borderColor = "#fff";
                                warning_password.style.display="none";
                                psw_warning_available=false;
                                psw_ok=true;
                        }
                }
        }



function focus()
          {
                        if (this.id == "email")
                        {
                                warning_login.style.display = "none"
                                warning_psw.style.display = "none"
                                if (eml_warning_available==true)
                                    {warning_email.style.display = "block"}
                        }
                        if (this.id == "password")
                        {
                                warning_email.style.display = "none"
                                warning_login.style.display = "none"
                                if (psw_warning_available==true)
                                    {warning_psw.style.display = "block"}
                        }
                }


the_form.addEventListener ("submit", check_all)
function check_all(e)

        {
        if (psw_ok != true ||  eml_ok != true)
        {e.preventDefault()}
        }


