/**
* to deal with FHIR question extensions
*@author Awais
*
*/

var DZHK = DZHK || {};

DZHK.Extension=function(extensionObject){
	this.extension=extensionObject;
};
DZHK.Extension=function(){

};

DZHK.Extension.prototype.extension={};
DZHK.Extension.prototype.parseExtensions=function(extension){
	
};
DZHK.Extension.prototype.history=[]; //hashmap of extension to refer?

