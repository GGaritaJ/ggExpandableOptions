///////////////////////////////////////////////
// ggExpandableOptions Cell JS/CSS PlugIn V4 //
//  Developed by: Ing.Gerardo Garita J.      //
//                FullStack Developer        //
//  email:  info@ggaritaj.com                //
//          gerardo.garita@ecomtrading.com   //
//  date:       friday, 2018-07-27           //
//  last date:  friday, 2018-07-27           //
///////////////////////////////////////////////

var ggcontainer = "";
var isTable = true;
var iterations = 0;
var timeOutNoReady;
var myEvent;
function menuConvert(containerId) {
    ggcontainer = containerId;
    iterations = 0;
    isTable = true;
    this.clearTimeOut();
    this.clearContainer(isTable);
    this.testExist(isTable);
    this.addBasicEvents();
};
function clearTimeOut() {
    clearTimeout(timeOutNoReady);
};
function clearContainer(istable) {
    if (istable) {
        $("div.menuConverted, div.tableMenu img.menu").remove();
    } else {
        $("div.menuConverted, div.divMenu img.menu").remove();
    }
};
function testExist(istable) {
    var containerExist = Boolean($("#" + ggcontainer).length > 0);
    var isReady = false;
    if (istable) {
        var datatableIsEmpty = Boolean($("#" + ggcontainer + " td.dataTables_empty").length == 1);
        var countMyTypes = $("#" + ggcontainer + " .menuConvert:visible").length;
        var countOtherTypes = $("#" + ggcontainer + " tbody tr").length;
        isReady = ((datatableIsEmpty || !containerExist || (countOtherTypes > 0 && countMyTypes == 0)) ? false : true);
    } else {
        isReady = (containerExist);
    }
    if (isReady) {
        iterations = 10;
        this.prepareContainer(istable);
        this.init();
    } else {
        if (iterations < 10) {
            timeOutNoReady = setTimeout(function () {
                iterations++;
                testExist(istable);
            }, 1500);
        } else {
            timeOutNoReady = setTimeout(function () {
                clearTimeOut();
                iterations = 0;
            }, 1500);
        }
    }
};
function prepareContainer(istable) {
    if (istable) {
        var rows = $("#" + ggcontainer + " .tableMenu").length;
        var columnIndex = $("#" + ggcontainer + " .tableMenu")[0].parentElement.cellIndex;
        var fixedSize = "<style>table#" + (ggcontainer) + " thead tr th:nth-child(" + (columnIndex + 1) + "),table#" + (ggcontainer) + " tbody tr td:nth-child(" + (columnIndex + 1) + "){width: 150px !important;min-width: 150px !important;}</style>";
        $(fixedSize).insertAfter("#" + ggcontainer);
        $(".tableMenu").each(function (position) {
            var height = "60px";
            if (position == (rows - 1)) { height = "80px"; }
            $(this.parentElement).addClass("noMargin noPadding").css("height", height);
        });
    }
};
function init() {
    if (isTable) { clearTimeOut(); }
    $(".menuConvert").each(function () {
        var childs = this.children;
        var parent = this.parentElement;
        $(parent).addClass((getNumberClass($(childs).length)));
        var options = "<img class='menu' src='./Images/tablesMenu/settings64.png' alt='menu' height='50' width='50' ><div class='menuConverted'>";
        $(childs).each(function () {
            var instedEvent = "";
            var title = "";
            if (browser == "Chrome") {//be careful with the attributes array's position
                title = this.attributes[1].nodeValue;
                instedEvent = this.attributes[2].nodeValue;
            } else if (browser == "IE") {
                title = this.attributes[0].nodeValue;
                instedEvent = this.attributes[1].nodeValue;
            } else if (browser == "Mozilla") {//last review v.51.0.1
                title = this.attributes[1].nodeValue;
                instedEvent = this.attributes[2].nodeValue;
            } else {
                title = this.attributes[1].nodeValue;
                instedEvent = this.attributes[2].nodeValue;
            }
            options = options + "<img class='option' src='./Images/tablesMenu/" + (this.text) + ".png' onclick=" + instedEvent + " title='" + title + "' />";
        });
        options = options + "</div>";
        $(options).appendTo($(parent));
        $(this).css("display", "none");
    });
};
function getNumberClass(num) {
    var cssClass = "";
    switch (num) {
        case 1:
            cssClass = "one";
            break;
        case 2:
            cssClass = "two";
            break;
        case 3:
            cssClass = "three";
            break;
        case 4:
            cssClass = "four";
            break;
        case 5:
            cssClass = "five";
            break;
        case 6:
            cssClass = "six";
            break;
        case 7:
            cssClass = "seven";
            break;
        case 8:
            cssClass = "eight";
            break;
        case 9:
            cssClass = "nine";
            break;
        case 10:
            cssClass = "ten";
            break;
        default:
            cssClass = "ten";
            break;
    }
    return cssClass;
};
function addBasicEvents() {
    $('html').unbind("click").on('click', function (event) {
        var obj = $(event.target);
        var isActive = false;
        var isMenu = false;
        if (($(obj).hasClass("menu"))) {
            isMenu = true;
            if (($(obj).hasClass("active"))) {
                isActive = true;
            }
        }
        $("img.menu.active").each(function () {
            $(this).removeClass("active");
        });
        if ((isMenu) && (!isActive)) {
            $(obj).toggleClass("active");
        }
        if ($("#" + ggcontainer).is(":hidden")) {
            clearTimeOut();
        }
    });
};

// HTML Structure Example: 
//
// (**):  Is very important keep the attributes order in 'a' tags
// (***): The text inside 'a' tags is the image's name
//
//  <div class='tableMenu'>
//      <div class='menuConvert'>
//          <a href='#' title='**' onclick='edit()'>edit***</a>
//          <a href='#' title='' onclick='delet()'>delete</a>
//          <a href='#' title='' onclick='comments()'>comments</a>
//          <a href='#' title='' onclick='list1()'>list</a>
//          <a href='#' title='' onclick='list2()'>list</a>
//          <a href='#' title='' onclick='print()'>print</a>
//          <a href='#' title='' onclick='details()'>details</a>
//          <a href='#' title='' onclick='route()'>route</a>
//          <a href='#' title='' onclick='graphics()'>graphics</a>
//          <a href='#' title='' onclick='more()'>more</a>
//      </div>
//  </div>
//
//  <div class="divMenu">
//      <div class='menuConvert'>
//          <a href='#' title='' onclick='alert()'>edit</a>
//          <a href='#' title='' onclick='alert()'>delete</a>
//          <a href='#' title='' onclick='alert()'>comments</a>
//      </div>
//  </div>