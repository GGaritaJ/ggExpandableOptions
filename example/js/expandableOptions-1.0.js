///////////////////////////////////////////////
// ggExpandableOptions JS/CSS PlugIn V1.0    //
//  Developed by: Ing.Gerardo Garita J.      //
//                FullStack Developer        //
//  email:  info@ggaritaj.com                //
//  date:       friday, 2018-07-27           //
//  last date:  friday, 2018-07-27           //
///////////////////////////////////////////////

; (function ($) {
    var classExpandable;
    jQuery.fn.ggExpandable = function (options) {
        try {
            var path = "./";
            var expandImg = "noname.png";
            if ((options != undefined) && (options !== null) && (options !== "")) {
                if (options.hasOwnProperty("imagesPath")) {
                    path = options.imagesPath;
                }
                if (options.hasOwnProperty("expandImage")) {
                    expandImg = options.expandImage;
                }
            }
            $(this).each(function () {
                var opts = "<img class='menu' src='" + path + expandImg + "' alt='menu' height='50' width='50' /><div class='menuConverted'>";
                var parent = this.parentElement;
                _ggClearContainer(parent);
                var childs = this.children;
                $(parent).addClass((_ggGetOptionsClass($(childs).length)));
                $(childs).each(function (id, item) {
                    var instedEvent = $(item).attr("onclick");
                    var title = $(item).attr("title");
                    var optImg = $(item).attr("option-image");
                    opts = opts + "<img class='option' src='" + path + optImg + "' onclick=" + '"' + instedEvent + '"' + " title='" + title + "' />";
                });
                opts = opts + "</div>";
                $(opts).appendTo($(parent));
                $(this).hide();
            });
            _ggAddBasicEvents();
            console.log("gg:expandable ready!");
        }
        catch (err) {
            console.log("Error: " + err + ".");
        }
        finally {
            setTimeout(function () {
                window.dispatchEvent(new Event('resize'));
            }, 1000);
        }
    };
    function _ggClearContainer(parent) {
        $(parent).find("div.menuConverted, div.expandableContainer img.menu").remove();
    };
    function _ggGetOptionsClass(num) {
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
    function _ggAddBasicEvents() {
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
        });
    };
})(jQuery);
