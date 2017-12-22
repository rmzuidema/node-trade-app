// JavaScript Document

var req;
var target;
var isIE;
var option;

  function initRequest(url) {
     if (window.XMLHttpRequest) {
         req = new XMLHttpRequest();
     } else if (window.ActiveXObject) {
         isIE = true;
         req = new ActiveXObject("Microsoft.XMLHTTP");
     }
  }
  
  function hideAll() {
//      alert('in hide');
       var sel = document.getElementById('addMenu');
       sel.style.display = 'none';
       var sel2 = document.getElementById('mailMenu');
       sel2.style.display = 'none';
       var sel3 = document.getElementById('accountMenu');
       sel3.style.display = 'none';
       var xyz = document.getElementById('itemPopUp');
//       alert('here ' + xyz);
       xyz.style.display = 'none';
       var waitObj = document.getElementById('pleaseWait');
  	   waitObj.style.display = 'none';
       var contentObj = document.getElementById('content');
       contentObj.innerHTML='';
  }


  function showMenu(id) {
	    var sel = document.getElementById(id);
        sel.style.display = 'inline';
  }

  function hideMenu(id) {
	    var sel = document.getElementById(id);
        sel.style.display = 'none';
  }
  
  function showWait() {
     var waitObj = document.getElementById('pleaseWait');
  	 waitObj.style.display = 'inline';
  }

  function hideWait() {
     var waitObj = document.getElementById('pleaseWait');
  	 waitObj.style.display = 'none';
  }

  function handleAdd() {
     hideAll();
     showWait();
	 showMenu('addMenu');
	 hideWait();
  }

  function handleEmail() {
     hideAll();
     showWait();
	 showMenu('mailMenu');
	 hideWait();
  }

  function handleAccount() {
     hideAll();
     showWait();
	 showMenu('accountMenu');
	 hideWait();
  }

  function handleSearch() {
     hideAll();
     showWait();
	 showMenu('accountMenu');
	 hideWait();
  }

  function displayBrowse() {
  	 hideAll();
     showWait();
     url = "prepareBrowseCategory"; 
     initRequest(url);
     req.onreadystatechange = processContent;
     req.open("GET", url, true); 
     req.send(null);
  }

  function handleBrowse() {
     showWait();
     var firstCategoryDiv = document.getElementById("firstCategoryId");
     var url;
     if ( firstCategoryDiv == null ) { 
        url = "prepareBrowseCategory"; 
     } else {
        url = "prepareBrowseCategory?first_Key=" + escape(firstCategoryDiv.value); 
     }  
     initRequest(url);
     req.onreadystatechange = processContent;
     req.open("GET", url, true); 
     req.send(null);
  }

   function processContent() {
      if (req.readyState == 4) {
        if (req.status == 200) {
           var message = req.responseText;
//           alert(message);
            browseObj = document.getElementById('content');
           browseObj.innerHTML=message;
           browseObj.style.display = 'inline';
           hideWait();
        }
      }
   }

  function handlePlaceAdd() {
    showWait();
    var url = "prepareAdd";
    initRequest(url);
    req.onreadystatechange = processContent;
    req.open("GET", url, true); 
    req.send(null);
  }

  
  function getSecondCategories() {
    showWait();
    var firstCategoryDiv = document.getElementById("firstCategoryId");
    var url = "getSecondCategory?firstCategoryId=" + escape(firstCategoryDiv.value); 
    initRequest(url);
    req.onreadystatechange = processSecondCategories;
    req.open("GET", url, true); 
    req.send(null);
  }

  function processSecondCategories() {
    if (req.readyState == 4) {
        if (req.status == 200) {
            var xmlDoc = req.responseXML.documentElement;
            var pageSecondSelect = document.forms[0].elements['secondaryCategoryId'];
            pageSecondSelect.options.length = 0;
            
            var xRows = xmlDoc.getElementsByTagName('entry');
            for (i=0;i<xRows.length;i++) {
                var secValue = xRows[i].childNodes[0].firstChild.nodeValue;
                var secDescription = xRows[i].childNodes[1].firstChild.nodeValue;
                var option = new Option(secDescription, secValue);
                try {
                  pageSecondSelect.add(option, null);
                } catch (e) {
                  pageSecondSelect.add(option, -1);
                }
            }
        hideWait();
        }
    }
  }


   function validateUsername() {
     var customerDiv = document.getElementById("username");
     var url = "validateUsername"
     var data ="username=" + escape(customerDiv.value); 
     initRequest(url);
     req.onreadystatechange = processValidate;
     req.open("POST", url, true);
     req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     req.send(data);
     
// Made this change to use a Post instead of a Get       
//     initRequest(url);
//     req.onreadystatechange = processValidate;
//     req.open("GET", url, true); 
//     req.send(null);
   }

  function processValidate() {
    if (req.readyState == 4) {
        if (req.status == 200) {
          
          var responseJson =  JSON.parse(req.responseText);

          // var message = req.responseXML.getElementsByTagName("valid")[0].childNodes[0].nodeValue;
           var message = responseJson.valid;
           console.log('responseJson ', responseJson);
           console.log('Message ', message);
           setMessageUsingInline(message);
            var submitBtn = document.getElementById("submit_btn");
            if (message === false) {
              submitBtn.disabled = true;
            } else {
              submitBtn.disabled = false;
            }
        }
    }
  }

   function setMessageUsingInline(message) {
      mdiv = document.getElementById("customerIdMessage");
      if (message === false) {
         mdiv.innerHTML = "Id taken";
         disableSubmitBtn();
      } else {
         mdiv.innerHTML = "Id available";
         enableSubmitBtn();
      }  
   }
 
   function disableSubmitBtn() {
      var submitBtn = document.getElementById("submit_btn");
      submitBtn.disabled = true;
   }
 
   function enableSubmitBtn() {
      var submitBtn = document.getElementById("submit_btn");
      submitBtn.disabled = false;
  }

  function hidePayment() {
    if (!option) option = document.getElementById("paymentOptionId");
    if (option.value == 'C') {
       hideExchange();
       showCash();
    } else if (option.value == 'E' ) {
    	hideCash();
    	showExchange();
    } 
 }

  function hideExchange() {
   mdiv = document.getElementById("exchange_id");
    mdiv.style.display="none";
 }

  function hideCash() {
    mdiv = document.getElementById("cash_id");
    mdiv.style.display="none";
  }
  
  function showExchange() {
    mdiv = document.getElementById("exchange_id");
    mdiv.style.display="inline";
	mdivStart = document.getElementById("startPriceId");
	mdivMin = document.getElementById("minimumPriceId");
	mdivStart.value=0.00;
	mdivMin.value=0.00;
		document.getElementById("submit").disabled = false;;
	    messagediv = document.getElementById("priceMessage_id");
        messagediv.innerHTML = "";
  }

  function showCash() {
    mdiv = document.getElementById("cash_id");
    mdiv.style.display="inline";
  }

  function validatePrice() {
	mdivStart = document.getElementById("startPriceId");
	mdivMin = document.getElementById("minimumPriceId");
	if (( mdivStart.value == 0 ) | (mdivMin.value == 0 )) {
		document.getElementById("submit").disabled = true;;
	    messagediv = document.getElementById("priceMessage_id");
        messagediv.innerHTML = "<div style=\"color:red\">Prices cannot start at 0 (zero)</div>";
	}else if ( mdivStart.value > mdivMin.value ) {
		document.getElementById("submit").disabled = true;;
	    messagediv = document.getElementById("priceMessage_id");
        messagediv.innerHTML = "<div style=\"color:red\">Minimum price must be greater than start price</div>";
	} else {
		document.getElementById("submit").disabled = false;;
	    messagediv = document.getElementById("priceMessage_id");
        messagediv.innerHTML = "";
    }	
 }
 
  function getImagePage() {
     showWait();
     var url = "placeAdd";   
     var titleDiv = document.getElementById("titleId");
     var descriptionDiv = document.getElementById("descriptionId");
     var firstCategoryDiv = document.getElementById("firstCategoryId");
     var secondaryCategoryDiv = document.getElementById("secondaryCategoryId");
     var paymentOptionDiv = document.getElementById("paymentOptionId");
     var shipmentDiv = document.getElementById("shipmentId");
     var exchangeDiv = document.getElementById("exchangeId");
     var startPriceDiv = document.getElementById("startPriceId");
     var minimumPriceDiv = document.getElementById("minimumPriceId");
     
     var data ='title=' + escape(titleDiv.value)+ '&description=' + escape(descriptionDiv.value); 
     data = data + '&firstCategory=' + escape(firstCategoryDiv.value) + '&secondaryCategory=' + escape(secondaryCategoryDiv.value);
     data = data + '&paymentOption=' + escape(paymentOptionDiv.value) + '&exchange=' + escape(exchangeDiv.value);
     data = data + '&shipment=' + escape(shipmentDiv.value) + '&startPrice=' + escape(startPriceDiv.value);
     data = data + '&minimumPrice=' + escape(minimumPriceDiv.value);
     initRequest(url);
     req.onreadystatechange = processContent;
     req.open("POST", url, true);
     req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     req.send(data);
  }
  
  
   function UploadImage() {
     var imageBrowseDiv = document.getElementById("imageBrowseId");
     var url = "upload"
     alert("Image Post " + imageBrowseDiv.value);
     var data ="?" + escape(imageBrowseDiv.value); 
     initRequest(url);
     req.onreadystatechange = processContent;
     req.open("POST", url, true);
     req.setRequestHeader("Content-Type", "multipart/form-data");
     req.send(data);
  }
  
  
  function showAddMenu() {
     showWait();
	    var sel = document.getElementById('addMenu');
        sel.style.display = 'inline';
	 hideWait();
  }
  
    function handleCompose() {
    showWait();
    var url = "prepareWriteEmail";
    initRequest(url);
    req.onreadystatechange = processContent;
    req.open("GET", url, true); 
    req.send(null);
  }
  
  
  function handleListEmails() {
    showWait();
    var url = "displayAllBidMail";
    initRequest(url);
    req.onreadystatechange = processContent;
    req.open("GET", url, true); 
    req.send(null);
  }
  
  
 function handleSendEmail() {
    showWait();
    var url = "sendMail";
     var toCustomerDiv = document.getElementById("toCustomerId");
     var subjectDiv = document.getElementById("subjectId");
     var EmailMessageDiv = document.getElementById("EmailMessageId");
     var copyMeIdDiv = document.getElementById("copyMeId");
     var copyYouDiv = document.getElementById("copyYouId");
//    alert('toCustomerDiv' + toCustomerDiv.value);
//    alert('subjectDiv' + subjectDiv.value);
//    alert('EmailMessageDiv' + EmailMessageDiv.value);
//    alert('copyMeIdDiv' + copyMeIdDiv.checked);
//    alert('copyYouDiv' + copyYouDiv.checked);
    var data ='toCustomerId_KEY=' + escape(toCustomerDiv.value)+ '&EmailSubject_KEY=' + escape(subjectDiv.value); 
    data = data + '&EmailMessage_KEY=' + escape(EmailMessageDiv.value)+ '&EmailSubject_KEY=' + escape(subjectDiv.value); 
    data = data + '&SendMePrivateEmail_KEY=' + escape(copyMeIdDiv.checked)+ '&SendYouPrivateEmail_KEY=' + escape(copyYouDiv.checked); 
//    alert(data);
    initRequest(url);
    req.onreadystatechange = processSendMail;
     req.open("POST", url, true);
     req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     req.send(data);
  }
  
 function processSendMail() {
       if (req.readyState == 4) {
        if (req.status == 200) {
            var message = req.responseXML.getElementsByTagName("messageEmail")[0].childNodes[0].nodeValue;
            browseObj = document.getElementById('content');
           browseObj.innerHTML="<p class=\"p\">" + message + "</p>";
           browseObj.style.display = 'inline';
           hideWait();
        }
      }
  }

    function handleItems(criteria) {
    showWait();
    var url = "displayMyItems";
     var data ="SearchType_KEY=" + escape(criteria); 
     initRequest(url);
     req.onreadystatechange = processContent;
     req.open("POST", url, true);
     req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     req.send(data);
  }
  
  
  function handleBidMail(formObj) {
     showWait();
     var url ="handleMail";
     var theForm = formObj;
//     alert(theForm.operation_Key.value);
//     alert(theForm.fromCustomer_Key.value);
//     alert(theForm.timestamp_Key.value);
     var data ='fromCustomer_Key=' + escape(theForm.fromCustomer_Key.value)+ '&timestamp_Key=' + escape(theForm.timestamp_Key.value); 
     data = data + '&operation_Key=' + escape(theForm.operation_Key.value);
     initRequest(url);
     req.onreadystatechange = processContent;
     req.open("POST", url, true);
     req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     req.send(data);
  }

  function handleEditItem(formObj) {
     showWait();
     var url ="prepareEditItem";
     var theForm = formObj;
//     alert(theForm.operation_Key.value);
//     alert(theForm.item_Key.value);
     var data ='item_Key=' + escape(theForm.item_Key.value);
     initRequest(url);
     req.onreadystatechange = processItemContent;
     req.open("POST", url, true);
     req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     req.send(data);
  }

   function processItemContent() {
      if (req.readyState == 4) {
        if (req.status == 200) {
           var message = req.responseText;
            browseObj = document.getElementById('content');
           browseObj.innerHTML=message;
           browseObj.style.display = 'inline';
           hideWait();
           getSecondCategories();
           hidePayment();
       }
      }
   }
  
   function handleEditImage(formObj) {
     showWait();
     var url ="prepareItemImage";
     var theForm = formObj;
//     alert(theForm.operation_Key.value);
//     alert(theForm.item_Key.value);
     var data ='item_Key=' + escape(theForm.item_Key.value);
     initRequest(url);
     req.onreadystatechange = processContent;
     req.open("POST", url, true);
     req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     req.send(data);
  }
  
  function handleEditPay(formObj) {
     showWait();
     var url ="preparePayItem";
     var theForm = formObj;
//     alert(theForm.operation_Key.value);
//     alert(theForm.item_Key.value);
     var data ='item_Key=' + escape(theForm.item_Key.value);
     initRequest(url);
     req.onreadystatechange = processContent;
     req.open("POST", url, true);
     req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     req.send(data);
  }
  
  function displayItemPopUp(itemkey) {
//     showWait();
     var itemPopUp = document.getElementById('itemPopUp');
     itemPopUp.innerHTML="please wait ... loading";
     var url ="displayItemPopUp";
     var data ='item_Key=' + escape(itemkey);
     initRequest(url);
     req.onreadystatechange = processPopUpContent;
     req.open("POST", url, true);
     req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     req.send(data);
  
  }

  function processPopUpContent() {
      if (req.readyState == 4) {
        if (req.status == 200) {
//           hideWait();
           var message = req.responseText;
           var itemPopUp = document.getElementById('itemPopUp');
           itemPopUp.innerHTML=message;
           itemPopUp.style.display = 'inline';
       }
      }
  }
  
  
  function hideItemPopUp() {
       var itemPopUp = document.getElementById('itemPopUp');
       itemPopUp.style.display = 'none';
   } 
   
   function handleDeleteItem(formObj) {
     showWait();
     var url ="deleteItem";
     var theForm = formObj;
//     alert(theForm.operation_Key.value);
//     alert(theForm.item_Key.value);
     var data ='item_Key=' + escape(theForm.item_Key.value);
     initRequest(url);
     req.onreadystatechange = processContent;
     req.open("POST", url, true);
     req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     req.send(data);
  }


   function handleViewBids(formObj) {
     showWait();
     var url ="viewBids";
     var theForm = formObj;
//     alert(theForm.operation_Key.value);
//     alert(theForm.item_Key.value);
     var data ='item_Key=' + escape(theForm.item_Key.value);
     initRequest(url);
     req.onreadystatechange = processContent;
     req.open("POST", url, true);
     req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     req.send(data);
  }
    