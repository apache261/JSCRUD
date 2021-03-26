
// GLobal Array of Records
var records = [
];
// ID Input Field Object
var uid = getObject("uid");
// Name Input Field Object
var uName = getObject("uname");
// Address Text Are Field Object
var uAddr = getObject("uaddr");
// Table Body Object
var tableRow = getObject("contentArea");
// Message Area Object
var msg = getObject("msg");
// Get the HTML Element using ID
function getObject(id){
	return document.getElementById(id)
}
// Set the value of ID Input Field
function setId(value){
	uid.value = value;
}
// Set the value of Name Input Field
function setName(value){
	uName.value = value;
}
// set the value of Address Text Area
function setAddr(value){
	uAddr.value = value;
	
}
// Return true if there is any empty field
function hasEmptyField(){
	return (uid.value.length == 0 ||
		uName.value.length == 0 ||
		uAddr.value.length == 0);
}
// get the content of fields and push to records array
// check the ID if already exists
function addRecord(){
	if(findIndex(records,uid.value) != -1){
		pshMsg ("Duplicate ID");
		return;
	}
	if(!hasEmptyField()){
		records.push([uid.value, uName.value,uAddr.value]);
		console.log(records);
		updateTable();
		clearInputFields();
		pshMsg("Added");
		return;
	}
	pshMsg ("Fill Fields");
	return;

}
// check the ID value if exist in records and perform delete
function deleteRecord(){
	var keyword = uid.value;
	var targetIndex = findIndex(records,keyword);
	if(targetIndex != -1){
		records.splice(targetIndex,1);
		clearInputFields();
		updateTable();
		pshMsg("Deleted");
		return;
	}
	pshMsg("ID Not Found");
	return;
}
// check if the value of the ID exists on the records then retrieve the record
function displayRecord(){
	var keyword = uid.value;
	var targetIndex = findIndex(records,keyword);
	if(targetIndex != -1){
		setId(keyword);
		setName(records[targetIndex][1]);
		setAddr(records[targetIndex][2]);

		pshMsg("Retrieved");
		return;
	}
	pshMsg("ID Not Found");
	return;
}

// check the ID if exist on the record
//check for empty fields
// perform update record
function updateRecord(){
	var newRecord = [];
	var keyword = uid.value;
	var targetIndex= findIndex(records, keyword);
	if(hasEmptyField()){
		pshMsg ("Fill Fields");
		return;
	}
	if(targetIndex != -1){
		newRecord = [uid.value,uName.value,uAddr.value];
		records.splice(targetIndex, 1,newRecord );
		clearInputFields();
		updateTable();
		pshMsg("Updated");
		return;
	}
	pshMsg("ID Not Found");
	return;
}

// clear text fields 
function clearInputFields(){
	uid.value = "";
	uName.value = "";
	uAddr.value = "";
}
// set message 
function pshMsg(message){
	msg.innerText = message;
	fadeOutEffect();
}
// iterate to the array
// find the location of the keyword
// search only for the record[index][0]
function findIndex(array, target){
	for (var index=0; index < array.length; index++) {
		var targetIndex  = array[index].indexOf(target);
		if( targetIndex != -1 && targetIndex == 0){
			return index;
		}
	}
	return -1
}
//update the content of the table
function updateTable(){
	tableRow.innerHTML = '';
	var content ='';
	for (var index = 0; index < records.length; index++) {
		content += '<tr>';
		for(var inner = 0; inner < records[index].length; inner++ ){
			content += '<td>'+ records[index][inner] + '</td>';
		}
		content += '</tr>';
	}

	tableRow.innerHTML = content;
}

// add Fade out animation for message
function fadeOutEffect() {
	var fadeTarget = msg;
	fadeTarget.style.opacity = 1;
	var fadeEffect = setInterval(function () {
		if (!fadeTarget.style.opacity) {
			fadeTarget.style.opacity = 1;
		}
		if (fadeTarget.style.opacity > 0) {
			fadeTarget.style.opacity -= 0.1;
		} else {
			clearInterval(fadeEffect);
		}
	}, 200);
}
