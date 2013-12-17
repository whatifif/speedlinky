
var config = {
//localStorage will store data at this base. you can change this to whatever you want.
    storageBase: 'speedlinky',
//    //localStorage will store data at this file name. The default is a file name of your bookmark html.
//    fileName: '',
    //You can set whatever page title you want. The default is file name.
    pageTitle: '',
    //You can mark the selector where the content is placed in the page. This should be selector. Default is body
    contentTarget: '#main',
//    contentTarget: '#main-wrapper',
    //default content layout. Theme can provide its own layout.//This should be string
//        layout: '[["span4", ""], ["span4", ""], ["span4", ""], ["clear"], ["span3", ""], ["span3", ""], ["span3", ""], ["span3", ""]]',
//        clear: "<div class='clear'></div>",
    //default template
//    defaultTemplate: {
//        header: '<div class="ui-state-default ui-corner-all folder">',
//        title: '<div class="ui-widget-header ui-corner-top folderhead"><img src="f__icon" class="ficon"><span class="ftitle">f__title</span><span class="icon-chevron-up closefolder"></span><span class="icon-plus addlink"></span></div>',
//        header2: '<div  class="ui-corner-bottom foldercontent"><ul class="links">',
//        content: '<li class="link" ><img src="a__icon" class="licon"><a href="a__href">a__title</a><div class="memo">a__memo</div></li>',
//        footer2: '</ul></div>',
//        footer: '</div>'
//    },
//        defaultTemplate: {
//        header: '<div class="ui-state-default ui-corner-all folder viewtype-2">',
//                title: '<div class="ui-widget-header ui-corner-top folderhead"><img src="f__icon" class="ficon"><span class="ftitle">f__title</span><span class="icon-chevron-up closefolder"></span><span class="icon-pencil editfolder"></span><span class="icon-plus addlink"></span><span class="icon-resize-vertical sortlinks"></span></div>',
//                header2: '<div class="fmemo">f__memo</div><div  class="ui-corner-bottom foldercontent"><ul class="links">',
//                content: '<li class="link" ><a href="a__href"><div class="licon-bg"><img src="a__icon" class="licon"></div><div class="ltitle"> a__title</div></a><span class="icon-pencil editlink"></span><span class="star0"></span><div class="memo">a__memo</div></li>',
//                footer2: '</ul></div>',
//                footer: '</div>'
//        },
    //Url upto plugin directory. Should include '/' at the end
    pluginUrl: '',
    //path to the default icon
    defaultIcon: 'app/favicon.png',
    defaultFicon: 'app/img/clearx32.gif',
    //target attribute of links. default is _blank
    target: '_blank',
    //themes
//    theme:'13styles',
//    theme: 'elusion',
//    theme: 'java',
//    theme:'menu_source',
//    theme: 'menu_source_1',
//    theme: 'menu_source_2',
//    theme:'explodingboy',
//    theme:'exdesignz',
//    theme:'taming',
//    theme: 'flick',
//    theme: 'sunny',
//    theme: 'overcast',
//    theme: 'ui-darkness',
    theme: 'vader',
    bgImage: 'app/img/winter.jpg',
    bgImagea: 'app/imga/1.jpg',
    bgPosition: 'center center',
    bgRepeat: 'repeat',
    bgColor: '#fff',
    bgColora: '#fff'
//    pageOpen: true

};
var defaultConfig = {
    layout: '[["span4", ""], ["span4", ""], ["span4", ""], ["clear"], ["span3", ""], ["span3", ""], ["span3", ""], ["span3", ""]]',
    clear: "<div class='clear'></div>",
    defaultTemplate: {
        header: '<div class="ui-state-default ui-corner-all folder viewtype-2">',
        title: '<div class="ui-widget-header ui-corner-top folderhead"><img src="f__icon" class="ficon"><span class="ftitle">f__title</span><span class="icon-chevron-up closefolder"></span><span class="icon-pencil editfolder"></span><span class="icon-plus addlink"></span><span class="icon-resize-vertical sortlinks"></span></div>',
        header2: '<div class="fmemo">f__memo</div><div  class="ui-corner-bottom foldercontent"><ul class="links">',
        content: '<li class="link" ><a href="a__href"><div class="licon-bg"><img src="a__icon" class="licon"></div><div class="ltitle"> a__title</div></a><span class="icon-pencil editlink"></span><span class="star0"></span><div class="memo">a__memo</div></li>',
        footer2: '</ul></div>',
        footer: '</div>'
    },
    pagemenu: "<div id='menu'>"
            + "<div class='span4'>"
            + "<a href='http://speedlinky.com' target='_blank'><img src='" + config.pluginUrl + "app/logo32.png'></a>"
            + "<span class='btn btn-small' id='resetsearchbutton' title='Refresh search'><span class='icon-remove'></span></span>"
            + "<input type='text' id='searchinput' placeholder='search in this page'>"
            + "<span class='btn btn-small btn-info' id='searchbutton' title='Search in this page'><span class='icon-search'></span></span>"
            + "</div><div class='span4'>"
            + "<span class='btn btn-small' id='viewbackground' title='See the view of background'><span class='icon-eye-open'></span></span>"
//                + "<span class='btn' id='changefolderview' title='Change View of folders'><span class='icon-th-large'></span></span>"
            + "<span class='btn btn-small' id='showtools' title='Show tools'><span class='icon-wrench'></span></span>"
            + "<span class='btn btn-small' id='pageconfig' title='Config this page'><span class='icon-cog'></span></span>"
            + "<span class='btn btn-small' id='changelinkview' title='Change View of links'><span class='icon-th'></span></span>"
            + "<span class='btn btn-small' id='shrinkpage' title='Shrink this page'><span class='icon-chevron-up'></span></span>"
            + "<span class='btn btn-small' id='expandpage' title='Expand this page'><span class='icon-chevron-down'></span></span>"
            + "<span class='icon-resize-vertical' id='sortfolders' title='Sort folder in each area'></span>"
            + "</div><div class='span4'>"
            + "<span class='btn  btn-small btn-info' id='refreshpage' title='Refresh this page'><span class='icon-refresh'></span></span>"
            + "<span class='btn  btn-small' id='sortwithin' title='Sort within folder'><span class='icon-edit'></span></span>"
            + "<span class='btn  btn-small btn-warning' id='sortbetween' title='Sort between folders'><span class='icon-edit'></span></span>"
//                + "<span class='btn  btn-small btn-danger' id='savepage' title='Save this page in localStorage'><span class='icon-hdd'></span>Save</span>"
            + "<span class='btn  btn-small btn-danger' id='savepage' title='Save this page in localStorage'><span class='icon-hdd'></span></span>"
            + "<span class='icon-repeat' id='reconstructthis' title='Empty localStorage of this page'></span>"
            + "<span class='icon-refresh' id='reconstructall' title='Empty localStorage of all pages'></span>"
            + "<label class='label' id='homepagetitle'></label>"
            + "</div></div>"
};


