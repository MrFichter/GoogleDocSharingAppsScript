/* Google-Doc-Sharing Apps Script

by Jonathan Fichter, with special thanks to my brother and to the starter
code that Google provides

When connected to a Google spreadsheet under an account associated with
Google Apps for Education, Business, or Government, this program will use 
email addresses and documents you enter into the spreadsheet to create and 
share blank documents automatically.

To use this program, populate Column B of the spreadsheet with the titles of 
documents you wish to create, and populate Column A of the spreadsheet with 
the email address of the desired editor for each document.

To connect this script with the spreadsheet, click "Tools" from the spreadsheet
menu. Then select "Script Editor" and "Blank Project." (Please make sure it's
really blank. You may need to delete some starter code that Google creates 
for you.) Then, paste in all of the text from this file. 

I'm not sure if this is necessary, but I usually select "Run" --> "onOpen" once 
before closing evertyhing. Then, the next time you open your spreadsheet, a new 
menu item will appear called "MrFichter's Doc-Sharing Script."

This menu item will enable you to run the script!

If you find this script useful, or if you modify it in an interesting way, 
please let me know! I'm @MrFichter on Twitter.

*/

/**
 * The code in the section below is the default code for a spreadsheet apps script.
 * Retrieves all the rows in the active spreadsheet that contain data and logs the
 * values for each row.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */


function readRows() {
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  for (var i = 0; i <= numRows - 1; i++) {
    var row = values[i];
    //Logger.log(row);

  
    return [values, numRows]
    
  }
};



function shareFile (){
  //by Jonathan Fichter
  
  var shareWithTeacherEditors = false //Make this true if you would like to share with additional editors. Then see below for a place to specify their emails.
  
  var inputFromReadRows = readRows ()
  var values = inputFromReadRows[0]
  var numRows = inputFromReadRows[1]
      
  for (var i = 0; i <= numRows -1; i++){
    var newEditor = values[i][0] ; var newDocName = values[i][1] //Column B of the spreadsheet will tell us how to name each doc. Column A will tell us with whom to share that doc.
        
      doc = DocumentApp.create(newDocName); // Create a doc, using the appropriate cell of the spreadsheet to generate the doc's name.
      var files = DocsList.find(newDocName) //Find the doc we just created. This line returns a list of search results.
      var file = files[0] //This selects the first hit in the list of results, which is almost certainly the doc we want to manipulate.
      file.addEditor(newEditor) //Add an editor, using the appropriate cell of the spreadsheet to access the editor's email address.      
  
      
      if (shareWithTeacherEditors) {
        var teacherEditor1 = ('insert teacher1 email here') //This is where you specify the email addresses of additional teacher editors.
        var teacherEditor2 = ('insert teacher2 email here') //This is where you specify the email addresses of additional teacher editors.
    
        file.addEditor(teacherEditor1)      
        file.addEditor(teacherEditor2)      
      }
  }
      
        
    



}




/**
 * The code below is the default code for a spreadsheet apps script.
 * Adds a custom menu to the active spreadsheet, containing a single menu item
 * for invoking the readRows() function specified above.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : 'Run this script.',
    functionName : "shareFile"
  }];
  sheet.addMenu('MrFichter\'s Doc-Sharing Script', entries);
};

