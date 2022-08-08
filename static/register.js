
const forbidden = ["!", "@", "#", "&", "(", ")", "-", "[", "{", "}", "]", ":", ";",
                "'", "?", "/", "*", "`", "~", "$", "^", "+", "=", "<", ">", '"', ".", ',']
const numbers = ["0","1","2","3","4","5","6","7","8","9"]


var inp = document.getElementById("cname");
var eml = document.getElementById("email");
var psw = document.getElementById("password");
var cnf = document.getElementById("confirm");

var warning_cname = document.getElementById("warning_cname");
var warning_email = document.getElementById("warning_email");
var warning_psw = document.getElementById("warning_password");
var warning_psw_cnfrm = document.getElementById("warning_psw_cnfrm");
var warning_mismatch = document.getElementById("warning_mismatch");


let inp_ok = false;
let eml_ok = false;
let psw_ok = false;
let cnf_ok = false;


let inp_warning_available = false;
let eml_warning_available = false;
let psw_warning_available = false;
let cnf_warning_available = false;


var the_form = document.getElementById("the_form");

the_form.addEventListener ("submit", check_all)

inp.addEventListener ("keyup", reverse_color)
eml.addEventListener ("keyup", reverse_color)
psw.addEventListener ("keyup", reverse_color)
cnf.addEventListener ("keyup", reverse_color)

inp.addEventListener ("focus", focus)
eml.addEventListener ("focus", focus)
psw.addEventListener ("focus", focus)
cnf.addEventListener ("focus", focus)


function focus()
          {
                        if (this.id == "cname")
                        {
                                warning_email.style.display = "none"
                                warning_psw.style.display = "none"
                                warning_psw_cnfrm.style.display = "none"
                                    if (inp_warning_available==true)
                                    {warning_cname.style.display = "block"}


                        }
                        if (this.id == "email")
                        {
                                warning_cname.style.display = "none"
                                warning_psw.style.display = "none"
                                warning_psw_cnfrm.style.display = "none"
                                if (eml_warning_available==true)
                                    {warning_email.style.display = "block"}
                        }
                        if (this.id == "password")
                        {
                                warning_email.style.display = "none"
                                warning_cname.style.display = "none"
                                warning_psw_cnfrm.style.display = "none"
                                if (psw_warning_available==true)
                                    {warning_psw.style.display = "block"}
                        }
                        if (this.id == "confirm")
                        {
                                warning_email.style.display = "none"
                                warning_psw.style.display = "none"
                                warning_cname.style.display = "none"
                                if (cnf_warning_available==true)
                                    {warning_psw_cnfrm.style.display = "block"}
                        }
                }

function reverse_color()
    {
            var v = document.getElementById(this.id).value;
            var mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var chk = 0;


            if (this.id=="cname")
            {
                for (let i=0; i<v.length; i++)
                {
                     if (forbidden.includes(v[i]) == false && numbers.includes(v[i])==false)
                          {               chk++                                      }
                }

                if(chk==v.length && 3<v.length && v.length<20)
                {      document.getElementById(this.id).style.borderColor = "#fff";
                       warning_cname.style.display = "none";
                       inp_ok= true;
                       inp_warning_available=false;
                }
                else
                {
                        document.getElementById(this.id).style.borderColor = "red";
                         warning_cname.style.display = "block";
                         inp_warning_available=true;
                         inp_ok= false;

                }

                }

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


            else if (this.id == "confirm")
            {
                    if (v.length!=0 && v.length<6 || v.length>10)
                    {       warning_psw_cnfrm.style.display="block";
                            document.getElementById(this.id).style.borderColor = "red";
                            cnf_warning_available=true;
                    }
                    else
                    {
                            document.getElementById(this.id).style.borderColor = "#fff";
                            warning_psw_cnfrm.style.display="none";
                            cnf_warning_available=false;
                            cnf_ok = true;
                    }
            }

    }

function check_all(e)
         {
            if (psw.value!=cnf.value || inp_ok==false || eml_ok==false || psw_ok==false || cnf_ok==false)
            {
                e.preventDefault();
                alert("Please Check all fields and Make Sure that Password and Confirm Password match!")
                //true false bilgisine göre daha spesifik alertler verilebilir

            }


         }



