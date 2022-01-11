//
opensdg.dataRounding = function(value) {
  if (value == null) {
    return value
  }
  else {
    //5 555 --> 5 560; 34,56 --> 34,6; 3,4 --> 3,40; 1 --> 1,00
    //return value.toPrecision(3)

    ////5 555 --> 5 555,00; 34,56 --> 34,65; 3,4 --> 3,40; 1 --> 1,00
    //return value.toFixed(2)

    return value
  }
};


opensdg.dataRoundingDp = function(value, dcmplc) {
  if (value == null) {
    return value
  }
  else {
    return value.toFixed(dcmplc)
  }
};



var app = angular.module("app", []);

app.controller("listController", ["$scope",
  function($scope) {

$scope.exportUsingJSPDF = function() {


       // var pdf = new jsPDF('landscape');
       var pdf = new jsPDF('p','pt','a4');
      var pdfName = 'test.pdf';

        //stop showing the content in the generated PDF
         var elementHandler = {
            '#hideThis': function(element, renderer) {
                return true;
            }
        }
         var options = {
            'elementHandlers': elementHandler,
            pagesplit: true, width:550
        };

        var $divs = $('.myDivClass')                //jQuery object of all the myDivClass divs
        var numRecursionsNeeded = $divs.length -1;     //the number of times we need to call addHtml (once per div)
        var currentRecursion=0;

        //Found a trick for using addHtml more than once per pdf. Call addHtml in the callback function of addHtml recursively.
        function recursiveAddHtmlAndSave(currentRecursion, totalRecursions){
            //Once we have done all the divs save the pdf
            if(currentRecursion==totalRecursions){
                pdf.save(pdfName);
            }else{
                currentRecursion++;
                pdf.addPage();
                //$('.myDivClass')[currentRecursion] selects one of the divs out of the jquery collection as a html element
                //addHtml requires an html element. Not a string like fromHtml.
                pdf.fromHTML($('.myDivClass')[currentRecursion], 15, 20, options, function(){
                    console.log(currentRecursion);
                    recursiveAddHtmlAndSave(currentRecursion, totalRecursions)
                });
            }
        }

        pdf.fromHTML($('.myDivClass')[currentRecursion], 15, 20, options, function(){
            recursiveAddHtmlAndSave(currentRecursion, numRecursionsNeeded);
        });
    }

  }
]);
