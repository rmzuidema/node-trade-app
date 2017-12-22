var req;
var target;
var isIE;

function initARequest(url) {
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        isIE = true;
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function displayLogin() {
	// check if user is logged in
    mdiv = document.getElementById("login");
	if ( document.login_image.src.indexOf("images/logout.gif") != -1 ) {
	   hideNavigation();
     document.login_image.src="images/login.gif";
 	} else {
 	   mdiv.style.left=pageWidth() - 300;
       mdiv.style.display="inline";
 	}
	
  }
   
function hideLogin() {
    mdiv = document.getElementById("login");
    mdiv.style.display="none";
   }
   
function displayRegister(displayValue) {
	mdiv = document.getElementById("register");
	if (displayValue = "true") {
  	   mdiv.style.left=pageWidth() - 500;
    	mdiv.style.display="inline";
	} else {
   		mdiv.style.display="none";
	}   
}

function hideRegister() {
    mdiv = document.getElementById("register");
    mdiv.style.display="none";
}

function displayHome() {
    mdiv = document.getElementById("center");
    mdiv.innerHTML="<p>Please wait loading ...</p>";
     unSelectNavigation();
//   pausecomp(2000);
	document.home.src="images/home_sel.gif";
	var url = "home.jsp";
    initARequest(url);
    req.onreadystatechange = handleHome;
    req.open("GET", url, true); 
    req.send(null);
	
}

function handleHome() {
    if (req.readyState == 4) {
             var message = req.responseText;
 		    mdiv = document.getElementById("center");
   			 mdiv.innerHTML=message;
    }

}
function displayEmail() {
    mdiv = document.getElementById("center");
    mdiv.innerHTML="<p>Please wait loading ...</p>";
    unSelectNavigation();
	document.email.src="images/email_sel.gif";
	var url = "email.jsp";
    initARequest(url);
    req.onreadystatechange = handleEmail;
    req.open("GET", url, true); 
    req.send(null);
	
}

function handleEmail() {
    if (req.readyState == 4) {
             var message = req.responseText;
 		    mdiv = document.getElementById("center");
   			 mdiv.innerHTML=message;
    }

}

function displaySearch() {
    unSelectNavigation();
	document.search.src="images/search_sel.gif";
    mdiv = document.getElementById("center");
    mdiv.innerHTML="Enter Search criteria: <input name=\"search\" type=\"text\" size=\"12\"><input name=\"Search\" type=\"button\" value=\"Search\" onClick=\"executeSearch()\">";
}

function executeSearch() {
    mdiv = document.getElementById("center");
    mdiv.innerHTML="<p>Please wait loading ...</p>";
    unSelectNavigation();
	document.search.src="images/search_sel.gif";
	var url = "table.jsp";
    initARequest(url);
    req.onreadystatechange = handleSearch;
    req.open("GET", url, true); 
    req.send(null);
}

function handleSearch() {
    if (req.readyState == 4) {
             var message = req.responseText;
 		    mdiv = document.getElementById("center");
   			 mdiv.innerHTML=message;
    }

}
function unSelectNavigation() {
	document.home.src="images/home.gif";
	document.search.src="images/search.gif";
	document.email.src="images/email.gif";
	document.bid.src="images/bid.gif";
	document.saved_search.src="images/saved_searches.gif";
}

function showNavigation() {
    mdiv = document.getElementById("left_navigation");
    mdiv.style.display="inline";
}

function hideNavigation() {
    mdiv = document.getElementById("left_navigation");
    mdiv.style.display="none";
}

function loginCustomer() {
    // do some login function under the covers
    if (document.loginForm.customer_id.value=="123") {
    // Login succesful
    showNavigation();
    document.login_image.src="images/logout.gif";
    hideLogin();
    }
}

function registerCustomer() {
	alert("Here");
}

function pausecomp(millis) {
	date = new Date();
	var curDate = null;

	do { 
		var curDate = new Date(); 
	} 
	while(curDate-date < millis);
} 

function displayInbox() {
  alert("Inbox data");
}

function displaySent() {
  alert("Sent data");
}
function displayDraft() {
  alert("Draft data");
}