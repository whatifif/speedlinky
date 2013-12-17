
jQuery(function($) {
    var template;
    //extensions-------------------------------
    /**
     * To place element at center position
     * @returns {$.fn}
     */
    $.fn.center = function() {
        this.css({
            'position': 'fixed',
            'left': '40%',
            'top': '30%'
        });
        this.css({
            'margin-left': -this.outerWidth() / 2 + 'px',
            'margin-top': -this.outerHeight() / 2 + 'px'
        });

        return this;
    };

//application---------------------------------
    var speedlinky = {
//        contentTarget:null,
        //main method
        run: function() {
            //check if localStorage is supported
            storage.init();
            config.storageBase = config.storageBase || 'speedlinky';
//            config.fileName = location.href.match(/\/[a-zA-Z0-9_-]*\.html?/)[0].replace('/', '').replace('.html', '').replace('.htm', '') || 'default';
//            config.fileName = location.href.replace(/^.*[?=#\\\/]/, '').replace('.html', '').replace('.htm', '') || 'default';
            config.fileName = config.fileName || location.href.replace(/^.*[?=#\\\/]/, '').replace('.html', '').replace('.htm', '') || 'default';
//            console.log(config.fileName);
            //if some changes are stored in localStorage, reflect it.
            var conf;
            if (storage.localSupported && localStorage.getItem(config.storageBase + '.config.' + config.fileName)) {
                conf = localStorage.getItem(config.storageBase + '.config.' + config.fileName);

            } else {
                if ($("#speedlinky_conf").length > 0) {
                    conf = $("#speedlinky_conf").attr('data-conf').trim();
                }
            }
            if (conf) {
                conf = JSON.parse(conf);
                for (var key in conf) {
                    config[key] = conf[key];
//                        console.log(conf[key]);

                }
            } else {
//                alert( 49 );
            }
//            config.pageTitle = config.pageTitle || config.fileName;
            config.pageTitle = (config.pageTitle !== '') ? config.pageTitle : config.fileName;
//            console.log(config.pageTitle);
            template = defaultConfig.defaultTemplate;

            //if localStorage is supported, fetch from localStorage
            if (storage.localSupported && localStorage.getItem(config.storageBase + config.fileName)) {
                speedlinky.setContent("<div id='folders'>" + localStorage.getItem(config.storageBase + config.fileName) + "</div>", '#main');
//                console.log(localStorage.getItem(config.storageBase + config.fileName));
//                console.log('fromStorage');
            }
            else {

                //Already processed. Use the document as it is
                if ($("#folders").length > 0) {
                    page.initAllExceptTheme();
//                    console.log('fromDocument');
                }
                //Process the bookmark file.
                else {
//                    page.process();
//                  processFile(sourceSelector, folderSelector, linkSelector, targetSelector)
//                    processor.processFile('#main', 'bf', 'a', '#main');
//                    processor.processFile('#main', '.bf', 'a', '#main');
                    processor.processFile(config.contentTarget, '.bf', 'a', config.contentTarget);

//                    console.log('fromProcess');

                }
            }
        },
//        setContent: function(wholecontent) {
//            //find the target for content
//            var target = $(config.contentTarget);
//            target = (target.length > 0) ? target : $('#main');
//            //set the content and basic menu
//            target.html("<div class='center'>" + pagemenu.menu + defaultConfig.clear + wholecontent + editors + "</div>");
//            //finally show the body
//            page.initAll();
//        }
//        setContent: function(wholecontent, target) {
//            if (target === '#main') {
//                $(target).html("<div class='center'>" + pagemenu.menu + defaultConfig.clear + wholecontent + editors + "</div>");
//                console.log($("#folders").length);
//                if ($("#folders").length > 0) {
//                    page.initAllExceptTheme();
//                } else {
//                    page.initAll();
//                }
//            }
//            else if (target === '#importersource') {
//                $(target).html(wholecontent);
//            }
//            //finally show the body
//        }
        setContent: function(wholecontent, target) {
            if (target === '#main') {
//                $(target).html("<div class='center'>" + pagemenu.menu + defaultConfig.clear + wholecontent + editors + "</div>");
                $(target).html("<div class='center'>" + defaultConfig.pagemenu + defaultConfig.clear + wholecontent + editors + "</div>");
                page.initAll();
            }
            else if (target === '#importersource') {
                $(target).html(wholecontent);
//                console.log(wholecontent);
//                $('body').css({'display': 'block'});
            }
        }


    };
    //OOP-----------------------------------------------
    //themer------------------------------------------
    var themer = {
        init: function() {
//            $('head title:first').text(config.pageTitle);//IE8 shows error
            $('#homepagetitle').text(config.pageTitle);
            $('body').css({'display': 'block', 'background-image': 'url(' + config.pluginUrl + config.bgImage + ')', 'background-color': config.bgColor});
        },
        applyTheme: function() {
            var themeLink = $('#speedlinky_theme');
            if (themeLink.length > 0) {
                themeLink.remove();
            }
            $('head link:last').after("<link id='speedlinky_theme' rel='stylesheet' href='" + config.pluginUrl + "app/theme/" + config.theme + "/style.css'>");
            $('.ui-state-default').css({'background-image':'none'});
        }
    };
    //themer==========================================
    //processor---------------------------------------
    var processor = {
        //total area in the layout
        countArea: function(layout) {
            var count = 0;
            for (var i = 0; i < layout.length; i++) {
                if (layout[i][0] !== 'clear') {
                    count++;
                }
            }
            return count;
        },
//        processFile: function() {
//            //target string to process 
//            var source;
//            //target folder to find
//            var folderSelector;
//            var linkSelector;
//            //already processed
//            if ($('#folders').length > 0) {
//                source = $('#folders').html();
//                folderSelector = '.folder';
//                linkSelector = 'li';
//            }
//            //original bookmark file
//            else {
//                source = $(config.contentTarget).html();
//                source = processor.preprocess(source);
//                folderSelector = 'bf';
//                linkSelector = 'a';
//            }
//            console.log(folderSelector);
//            var layout = $.parseJSON(defaultConfig.layout); //array
//            var totalArea = processor.countArea(layout);
//            var layoutIndex = 0;
//            var totalFolder = $(folderSelector).length;
//            var maxPerArea = Math.ceil(totalFolder / totalArea);
//            var countPerArea = 0;
//            $(folderSelector, source).each(function() {
//                //start newfolder
//                var newfolder = template.header; //good
//                var folderhead = $(this).children().eq(0);
//                var title = folderhead.text();
//                var newtitle = template.title.replace('f__title', title); //good
//                var newcontent = '';
//                var content = '';
//                if (folderSelector === '.folder') {
//                    var ficon = folderhead.children().eq(0);
//                    //copy the folder icon (ficon)
//                    if (ficon.attr('src')) {
//                        newtitle = newtitle.replace('f__icon', ficon.attr('src'));
//                    }
//                    else {
//                        newtitle = newtitle.replace('f__icon', config.pluginUrl + config.defaultFicon);
//                    }
//                    if (ficon.attr('class')) {
//                        newtitle = newtitle.replace('ficon', ficon.attr('class'));
//                    }
//                    //copy memo
//                    newcontent = template.header2.replace('f__memo', folderhead.next().text());
//                    content = $(this).children().eq(2).children().eq(0);//<ul>
//                    $(content).children(linkSelector).each(function() {//<li>
//                        var alink = $(this).children().eq(0);
//                        var licon = alink.children().eq(0).children().eq(0);
////                        console.log(licon);
//                        var newa = template.content.replace('a__title', alink.text()).replace('a__href', alink.attr('href'));
//                        if (licon.attr('src')) {
//                            newa = newa.replace('a__icon', licon.attr('src'));
//                        } else {
//                            newa = newa.replace('a__icon', config.pluginUrl + config.defaultIcon);
//                        }
//                        if (licon.attr('class')) {
//                            newa = newa.replace('licon', licon.attr('class'));
//                        }
//                        newa = newa.replace('a__memo', '');
//                        newa = newa.replace('f__memo', '');
//                        //add each a to new content
//                        newcontent += newa;
//                    });
//                } else {
//                    //set the default folder icon (ficon)
//                    newtitle = newtitle.replace('f__icon', config.pluginUrl + config.defaultFicon);
//                    //start new content
//                    newcontent = template.header2.replace('f__memo', '');
//                    content = $(this).children().eq(2);//<dl>
//
//                    $(content).children(linkSelector).each(function() {//<li>
//                        var alink = $(this);//<a>
//                        var newa = template.content.replace('a__title', alink.text()).replace('a__href', alink.attr('href'));
//                        if (alink.attr('icon')) {
//                            newa = newa.replace('a__icon', alink.attr('icon'));
//                        } else if (alink.attr('icon_uri')) {
//                            newa = newa.replace('a__icon', alink.attr('icon_uri'));
//                        } else {
//                            newa = newa.replace('a__icon', config.pluginUrl + config.defaultIcon);
//                        }
//                        newa = newa.replace('a__memo', '');
//                        newa = newa.replace('f__memo', '');
//                        //add each a to new content
//                        newcontent += newa;
//                    });
//                }
//                //end new content
//                newcontent += template.footer2;
//                //end new folder
//                newfolder += newtitle + newcontent + template.footer;
//                //add to content
//                if (layout[layoutIndex][0] !== 'clear') {//if area, accumulate till maxPerArea
//                    layout[layoutIndex][1] += newfolder;
//                }
//                else {//if clear, save to the next area
//                    layoutIndex++;
//                    if (layoutIndex >= layout.length) {
//                        layoutIndex = 0;
//                    }
//                    layout[layoutIndex][1] += newfolder;
//                }
//                countPerArea++;
//                //reset countPerArea if greater than maxPerArea
//                if (countPerArea >= maxPerArea) {
//                    countPerArea = 0;
//                    layoutIndex++;
//                    if (layoutIndex >= layout.length) {
//                        layoutIndex = 0;
//                    }
//                }
//            }); //each bf
//
//            //construct wholecontent from layout array
//            var wholecontent = "<div id='folders'>";
//            for (var i = 0; i < layout.length; i++) {
//                if (layout[i][0] !== 'clear') {
//                    wholecontent += "<div class='" + layout[i][0] + " area'><div class='areamenu'><span class='icon-plus addfolder' title='Add New Folder in this area'></span></div>" + layout[i][1] + "</div>";
//                }
//                else {
//                    wholecontent += "<div class='clear'></div>";
//                }
//            }
//            wholecontent += "</div>";
//            //finally set content to targt
//            speedlinky.setContent(wholecontent);
//            //save to localStorage
////            storage.saveLocal(wholecontent);
//            //=======================================
//        },
        processFile: function(sourceSelector, folderSelector, linkSelector, targetSelector) {
            //source string to process 
            var source = $(sourceSelector).html();
//            console.log(source);
            //folder to find in source
            var folderSelector = folderSelector;
            var linkSelector = linkSelector;
            var targetSelector = targetSelector;

            if (folderSelector === '.bf') {
                source = processor.preprocess(source);
            }
            var layout = $.parseJSON(defaultConfig.layout); //array
            var totalArea = processor.countArea(layout);
            var layoutIndex = 0;
            var totalFolder = $(folderSelector, source).length;
            var maxPerArea = Math.ceil(totalFolder / totalArea);
//            console.log(source);
//            console.log(totalFolder);
            var countPerArea = 0;
//            console.log(folderSelector);
//            console.log(source);
//            console.log($(folderSelector, source).length);
//            $(folderSelector, sourceSelector).each(function() {
            $(folderSelector, source).each(function() {
                //start newfolder
                var newfolder = template.header; //good
                var folderhead = $(this).children().eq(0);
                var title = folderhead.text();
//                alert($(this).text());
//                var folderhead = $(this).children(':first');
//                var title = $(this).html();
//                console.log(title);
                var newtitle = template.title.replace('f__title', title); //good
                var newcontent = '';
                var content = '';
                if (folderSelector === '.folder') {
                    var ficon = folderhead.children().eq(0);
                    //copy the folder icon (ficon)
                    if (ficon.attr('src')) {
                        newtitle = newtitle.replace('f__icon', ficon.attr('src'));
                    }
                    else {
                        newtitle = newtitle.replace('f__icon', config.pluginUrl + config.defaultFicon);
                    }
                    if (ficon.attr('class')) {
                        newtitle = newtitle.replace('ficon', ficon.attr('class'));
                    }
                    //copy memo
                    newcontent = template.header2.replace('f__memo', folderhead.next().text());
                    content = $(this).children().eq(2).children().eq(0);//<ul>
                    $(content).children(linkSelector).each(function() {//<li>
                        var alink = $(this).children().eq(0);
                        var licon = alink.children().eq(0).children().eq(0);
//                        console.log(licon);
                        var newa = template.content.replace('a__title', alink.text()).replace('a__href', alink.attr('href'));
                        if (licon.attr('src')) {
                            newa = newa.replace('a__icon', licon.attr('src'));
                        } else {
                            newa = newa.replace('a__icon', config.pluginUrl + config.defaultIcon);
                        }
                        if (licon.attr('class')) {
                            newa = newa.replace('licon', licon.attr('class'));
                        }
                        newa = newa.replace('a__memo', '');
                        newa = newa.replace('f__memo', '');
                        //add each a to new content
                        newcontent += newa;
                    });
                } else {
                    //set the default folder icon (ficon)
                    newtitle = newtitle.replace('f__icon', config.pluginUrl + config.defaultFicon);
                    //start new content
                    newcontent = template.header2.replace('f__memo', '');
                    content = $(this).children().eq(2);//<dl>

                    $(content).children(linkSelector).each(function() {//<li>
                        var alink = $(this);//<a>
                        var newa = template.content.replace('a__title', alink.text()).replace('a__href', alink.attr('href'));
                        if (alink.attr('icon')) {
                            newa = newa.replace('a__icon', alink.attr('icon'));
                        } else if (alink.attr('icon_uri')) {
                            newa = newa.replace('a__icon', alink.attr('icon_uri'));
                        } else {
                            newa = newa.replace('a__icon', config.pluginUrl + config.defaultIcon);
                        }
                        newa = newa.replace('a__memo', '');
                        newa = newa.replace('f__memo', '');
                        //add each a to new content
                        newcontent += newa;
                    });
                }
                //end new content
                newcontent += template.footer2;
                //end new folder
                newfolder += newtitle + newcontent + template.footer;
                //add to content
                if (layout[layoutIndex][0] !== 'clear') {//if area, accumulate till maxPerArea
                    layout[layoutIndex][1] += newfolder;
                }
                else {//if clear, save to the next area
                    layoutIndex++;
                    if (layoutIndex >= layout.length) {
                        layoutIndex = 0;
                    }
                    layout[layoutIndex][1] += newfolder;
                }
                countPerArea++;
                //reset countPerArea if greater than maxPerArea
                if (countPerArea >= maxPerArea) {
                    countPerArea = 0;
                    layoutIndex++;
                    if (layoutIndex >= layout.length) {
                        layoutIndex = 0;
                    }
                }
            }); //each bf

            //construct wholecontent from layout array
            var wholecontent = "<div id='folders'>";
            for (var i = 0; i < layout.length; i++) {
                if (layout[i][0] !== 'clear') {
                    wholecontent += "<div class='" + layout[i][0] + " area'><div class='areamenu'><span class='icon-plus addfolder' title='Add New Folder in this area'></span></div>" + layout[i][1] + "</div>";
                }
                else {
                    wholecontent += "<div class='clear'></div>";
                }
            }
            wholecontent += "</div>";
            //finally set content to targt
            speedlinky.setContent(wholecontent, targetSelector);
            //save to localStorage
//            storage.saveLocal(wholecontent);
            //=======================================
        },
        preprocess: function(source) {
//            var source = $('#main').html();
            source = source.replace(/<\s*dd\s*>[^<]*?</gi, '<');//remove <dd>
            source = source.replace(/<\/dd>/gi, '');//remove </dd>
            source = source.replace(/<h1/gi, '<dt><h3');//change <h1> to <h3>
            source = source.replace(/<\/h1>/gi, '</h3>');//change </h1> to </h3>
//            source = source.replace(/<dt><h3/gi, '<bf><h3');//change <h3> to <bf></h3> to start folder
//            source = source.replace(/<dt[^<]*?<h3/gi, '<bf><h3');//change <h3> to <bf></h3> to start folder
            source = source.replace(/<dt[^<]*?<h3/gi, '<div class="bf"><h3');//change <h3> to <bf></h3> to start folder
            source = source.replace(/<\/h3>/gi, '</h3><div></div>');//change </h3> to </h3> and dummy <div> for memo
//            source = source.replace(/<dl><p>/gi, '<dl><ul>');//change <dl><p> to <dl><ul> to start foldercontent
//            source = source.replace(/<dt><a/gi, '<li><a');//change <dt><a to <li><a to catch link
//            source = source.replace(/<\/dl><p>/gi, '</ul></dl></bf>');//change </dl><p> to </dl></bf> to end folder
//            source = source.replace(/<\/dl>/gi, '</dl></bf>');//change </dl><p> to </dl></bf> to end folder
            source = source.replace(/<\/dl>/gi, '</dl></div>');//change </dl><p> to </dl></bf> to end folder
            source = source.replace(/<dt>/gi, '');//remove <dt>
            source = source.replace(/<\/dt>/gi, '');//remove </dt>
            source = source.replace(/<p>/gi, '');//remove <p>
            source = source.replace(/<\/p>/gi, '');//remove </p>
            source = source.replace(/<br>/gi, '');//remove </p>
            return source;
        }

    };
    //processor======================================

    //page menu----------------------------
    var pagemenu = {
        isSorted: false,
        viewClicked: false,
        init: function() {
            //reconstruct all page ( speedlinky storage is erased )
            $('#reconstructall').click(function() {
                if (confirm('Caution! This will erase and reconstruct all pages.')) {
                    page.reconstructAllPage();
                }
            });
            //reconstruct this page only. ( speedlinky of this page is erased)
            $('#reconstructthis').click(function() {
                if (confirm('Caution! This will erase and reconstruct only this page.')) {
                    page.reconstructThisPage();
                }
            });
            //just reload this page (no storage is erased)
            $('#refreshpage').click(function() {
                location.reload();
            });
            $('#shrinkpage').click(function() {
                page.shrinkPage($('body'));
            });
            $('#expandpage').click(function() {
                page.expandPage($('body'));
            });
            $('#sortfolders').click(function() {
                if (!pagemenu.isSorted) {
                    helper.sortFolders(true);
                    pagemenu.isSorted = true;
                } else {
                    helper.sortFolders(false);
                    pagemenu.isSorted = false;
                }
            });
            $('#savepage').click(function() {
                storage.saveClean();
            });

            $('#viewbackground').click(
                    function() {
                        if (!pagemenu.viewClicked) {
                            page.viewBackground();
                            pagemenu.viewClicked = true;
                        } else {
                            page.restoreBackground();
                            pagemenu.viewClicked = false;
                        }
                    }
            );
            $('#pageconfig').click(function() {
                pageeditor.init();
                pageeditor.showPageEditor();
            });
//            $('#changefolderview').click(function() {
//                folder.changeView(folder.typeInt++);
//                if (folder.typeInt > 4)
//                    folder.typeInt = 1;
//
//            });
            $('#changelinkview').click(function() {
                ++link.typeInt;
                if (link.typeInt > 3)
                    link.typeInt = 0;
                link.changeView(link.typeInt, 'body');

            });
            $('#showtools').click(function() {
                $('#pagetools').center().draggable({handle: '.handle'}).show();
            });
            /**
             * Edit this page
             * @returns {window|Boolean|String}
             */
            $('#sortwithin, #sortbetween').click(function() {

                if (!page.editMode) {
                    $(this).html("<span class='icon-edit'></span>End Edit").removeClass('btn-warning').addClass('btn-danger');
                    helper.showMessage('Edit mode started');
                    foldereditor.init();
                    linkeditor.init();

                    folder.initEdit();
                    if ($(this).attr('id') === 'sortbetween') {
                        link.initSortBetween();
                    }
                    else {
                        link.initEdit();
                    }
                    ;
                    page.editMode = true;
                    page.cleaned = false;
                }
                else {
                    $('#linkeditor').hide();
                    $('#foldereditor').hide();
                    storage.cleanBeforeSave();
                    helper.showMessage('Edit mode ended');
                    page.editMode = false;
                }
            });//sortwithin==========
        },
//        menu: "<div id='menu'>"
//                + "<div class='span4'>"
//                + "<a href='http://speedlinky.com' target='_blank'><img src='" + config.pluginUrl + "app/logo32.png'></a>"
//                + "<span class='btn btn-small' id='resetsearchbutton' title='Refresh search'><span class='icon-remove'></span></span>"
//                + "<input type='text' id='searchinput' placeholder='search in this page'>"
//                + "<span class='btn btn-small btn-info' id='searchbutton' title='Search in this page'><span class='icon-search'></span></span>"
//                + "</div><div class='span4'>"
//                + "<span class='btn btn-small' id='viewbackground' title='See the view of background'><span class='icon-eye-open'></span></span>"
////                + "<span class='btn' id='changefolderview' title='Change View of folders'><span class='icon-th-large'></span></span>"
//                + "<span class='btn btn-small' id='showtools' title='Show tools'><span class='icon-wrench'></span></span>"
//                + "<span class='btn btn-small' id='pageconfig' title='Config this page'><span class='icon-cog'></span></span>"
//                + "<span class='btn btn-small' id='changelinkview' title='Change View of links'><span class='icon-th'></span></span>"
//                + "<span class='btn btn-small' id='shrinkpage' title='Shrink this page'><span class='icon-chevron-up'></span></span>"
//                + "<span class='btn btn-small' id='expandpage' title='Expand this page'><span class='icon-chevron-down'></span></span>"
//                + "<span class='icon-resize-vertical' id='sortfolders' title='Sort folder in each area'></span>"
//                + "</div><div class='span4'>"
//                + "<span class='btn  btn-small btn-info' id='refreshpage' title='Refresh this page'><span class='icon-refresh'></span></span>"
//                + "<span class='btn  btn-small' id='sortwithin' title='Sort within folder'><span class='icon-edit'></span></span>"
//                + "<span class='btn  btn-small btn-warning' id='sortbetween' title='Sort between folders'><span class='icon-edit'></span></span>"
////                + "<span class='btn  btn-small btn-danger' id='savepage' title='Save this page in localStorage'><span class='icon-hdd'></span>Save</span>"
//                + "<span class='btn  btn-small btn-danger' id='savepage' title='Save this page in localStorage'><span class='icon-hdd'></span></span>"
//                + "<span class='icon-repeat' id='reconstructthis' title='Empty localStorage of this page'></span>"
//                + "<span class='icon-refresh' id='reconstructall' title='Empty localStorage of all pages'></span>"
//                + "<label class='label' id='homepagetitle'></label>"
//                + "</div></div>"

    };
    //page menu============================
    //page---------------------------------
    var page = {
        templateLoaded: false,
        //page is edit mode or not
        editMode: false,
        //Clean state of page before save
        cleaned: true,
        initAll: function() {
            themer.applyTheme();
            themer.init();
            pagemenu.init();
            folder.init();
            link.init();
            searcher.init();
            helper.init();
            pagetools.init();
        },
        initAllExceptTheme: function() {
            themer.init();
            pagemenu.init();
            folder.init();
            link.init();
            searcher.init();
            helper.init();
            pagetools.init();
        },
        //Process this page based on the template.js
//        process: function() {
//            if (!page.templateLoaded) {
////                helper.loadScript("app/theme/" + config.theme + "/template.js", processor.processFile);
//                helper.loadScript("app/theme/" + config.theme + "/template.js", processor.processFile);
//            }
//        },
        process: function() {
            if ($('#folders').length > 0) {
                processor.processFile('#folders', '.folder', 'li', '#main');
            }
            else {
//                processor.processFile('#main', 'bf', 'a', '#main');
                processor.processFile('#main', '.bf', 'a', '#main');
            }
            ;
//            console.log('fromProcess');
        },
        //page controller-------------------
        reconstructAllPage: function() {
            storage.removeLocal();
//            location.reload();
            page.process();
        },
        reconstructThisPage: function() {
            storage.removeThisPage();
//            location.reload();
            page.process();
        },
        shrinkPage: function(target) {
            $('.folderhead .icon-chevron-up', target).removeClass('icon-chevron-up').addClass('icon-chevron-down');
            $('.closefolder', target).removeClass('closefolder').addClass('openfolder');
            $('.foldercontent', target).hide();
            //To prevent accumulation of event, clean the events before attaching hoverIntent( off, off)
//            $('.openfolder', target).off('mouseenter.hoverIntent').off('mouseleave.hoverIntent').hoverIntent(
            $('.ficon', target).off('mouseenter.hoverIntent').off('mouseleave.hoverIntent').hoverIntent(
                    function() {
                        //'mouseenter.hoverIntent' event
                        $(this).parent().next().next('.foldercontent').show();
                        $(this).parent().parent('.folder').mouseleave(function() {
                            $('.foldercontent', this).hide();
                        });
                    },
                    function() {
                        //'mouseleave.hoverIntent' event:  do nothing.
                    }
            //selector: strangely not work 
            );
        },
        expandPage: function(target) {
            //To prevent needless event after expanding, clean the event
//            $('.openfolder', target).off('mouseenter.hoverIntent').off('mouseleave.hoverIntent');
            $('.ficon', target).off('mouseenter.hoverIntent').off('mouseleave.hoverIntent');
            $('.folder', target).off('mouseleave');//in case of target = body
            $(target).off('mouseleave');//in case of target = folder 
            $('.folderhead .icon-chevron-down', target).removeClass('icon-chevron-down').addClass('icon-chevron-up');
            $('.openfolder', target).removeClass('openfolder').addClass('closefolder');
            $('.foldercontent', target).show();
        },
        viewBackground: function() {
            $('#folders').hide();
        },
        restoreBackground: function() {
            $('#folders').show();
        }

    };
    //page=======================================
    //pageeditor---------------------------------
    var pageeditor = {
        inited: false,
        init: function() {
            if (!pageeditor.inited) {
//                console.log($('#pageeditor').length);
//                console.log($('#menu').length);
                $('#pageeditor').center().draggable();
                $('#pageclose, #pagecancel').click(function() {
                    $('#pageeditor').hide();
                });
                $('#pagedel').click(function() {
                    if (confirm('Delete this page CONFIG? ( this is NOT page DELETION)')) {
                        storage.removeThisConfig();
                        $('#pageeditor').hide();
                    }
                });
                $('#pageapply').click(function() {
                    pageeditor.applyPageEditor();
                });
                $('#pagesave').click(function() {
//                        if (confirm('Save editting?')) {
                    pageeditor.applyPageEditor();
                    storage.saveConfig();
                    $('#pageeditor').hide();
//                        }
                });
                $('#pagemore').click(function() {
                    $('#pagemoremenu').show();
                });
                $('#pageless').click(function() {
                    $('#pagemoremenu').hide();
                });
                pageeditor.inited = true;
            }
        },
        showPageEditor: function() {
//            console.log(config.pageTitle);
            $('#pagetheme').val(config.theme);
            $('#pagetitle').val(config.pageTitle);
            $('#pagebgimage').val(config.bgImage);
            $('#pagebgimagea').val(config.bgImagea);
            $('#pagebgposition').val(config.bgPosition);
            $('#pagebgrepeat').val(config.bgRepeat);
            $('#pagebgcolor').val(config.bgColor);
            $('#pagebgcolora').val(config.bgColora);
            $('#pageeditor').show();
        },
        applyPageEditor: function() {
            config.pageTitle = $('#pagetitle').val().replace(/(<([^>]+)>)/ig, "");
            $('head title').text(config.pageTitle);
            config.bgImage = $('#pagebgimage').val().replace(/(<([^>]+)>)/ig, "");
            config.bgImagea = $('#pagebgimagea').val().replace(/(<([^>]+)>)/ig, "");
            config.bgPosition = $('#pagebgposition').val();
            config.bgRepeat = $('#pagebgrepeat').val();
            config.bgColor = $('#pagebgcolor').val().replace(/(<([^>]+)>)/ig, "");
            config.bgColora = $('#pagebgcolora').val().replace(/(<([^>]+)>)/ig, "");
            config.theme = $('#pagetheme').val();
            themer.applyTheme();
        }
    };

    //pageeditor=================================
    //pagetools---------------------------------
    var pagetools = {
        inited: false,
        init: function() {
            if (!pagetools.inited) {

                $('#closetools').click(function() {
                    $('#pagetools').hide();
                });
//                $('#removedeadfavicon').click(function() {
//                    pagetools.removeDeadFavicon();
//                });

                $('#addhomefolder').click(function() {
                    pagetools.addHomeFolder();
                });
                $('#removefavicons').click(function() {
                    pagetools.removeFavicons();
                });
                $('#showremovefavicons, #showimporter, #showexporter').click(function() {
                    $('#pagetools').hide();
                    $('#importer').draggable({handle: '#importermenu'}).show();
                });
                $('#processimporter').click(function() {
                    pagetools.processImporter();
                });
                $('#importfolders').click(function() {
                    pagetools.importFolders();
                });
                $('#exportfolders').click(function() {
                    pagetools.exportFolders();
                });
                $('#closeimporter').click(function() {
                    $('#importersource').html('');
                    $('#importer').hide();
                });
                pagetools.inited = true;
            }
        },
//        removeDeadFavicon: function() {
//            $('.link img').each(function() {
//                var imgurl = $(this).attr('src');
//                if (imgurl && imgurl.indexOf('http') === 0) {
////                    console.log(pagetools.urlExists(imgurl));
//                    if (!urlExists(imgurl)) {
//                        $(this).attr('src', config.pluginUrl + config.defaultIcon);
//                    }
//                }
//            });
//        },
//        urlExists: function(url) {
//            var http = new XMLHttpRequest();
//            http.open('HEAD', url, false);
//            http.send();
//            return http.status !== 404;
//        },
        removeFavicons: function() {
            var matches = $('#importersource').text().match(/http[\S]*favicon.ico/gi);

            if (matches.length > 0) {
                $('img').each(function() {
                    if ($.inArray($(this).attr('src'), matches) >= 0) {
                        $(this).attr('src', config.defaultIcon);
                    }
                });
                $('#importer').hide();
                storage.saveClean();
            }
        },
        addHomeFolder: function() {
            var obj = {'ficonclass': 'wicon49', 'ftitle': 'home', 'links': [['http://speedlinky.com', config.pluginUrl + config.defaultIcon, 'new link']]};
            pagetools.addFolder(obj);
        },
//        callAfterTemplateLoaded:function(){
//            page.templateLoaded = true;
//            pagetools.addFolder(pagetools.temp);
//        },
        addFolder: function(obj) {
//            if(!page.templateLoaded){ 
//                pagetools.temp = obj;
////                helper.loadScript("app/theme/" + config.theme + "/template.js", pagetools.callAfterTemplateLoaded);
//                helper.loadScript("app/theme/" + config.theme + "/template.js", pagetools.callAfterTemplateLoaded);
//                return;
//            }
            var newfolder = template.header;
            newfolder += template.title.replace('f__icon', config.pluginUrl + config.defaultFicon).replace('ficon', obj.ficonclass).replace('f__title', obj.ftitle);
            newfolder += template.header2.replace('f__memo', '');
            for (var i = 0; i < obj.links.length; i++) {
                newfolder += template.content.replace('a__href', obj.links[i][0]).replace('a__icon', obj.links[i][1]).replace('a__title', obj.links[i][2]).replace('a__memo', '');
            }
            newfolder += template.footer2.replace();
            newfolder += template.footer.replace();
            $('.areamenu').eq(0).after($(newfolder));
        },
        processImporter: function() {
            if ($('.folder', '#importersource').length <= 0) {
                processor.processFile('#importersource', '.bf', 'a', '#importersource');
                pagetools.importFolders();
            } else {
                pagetools.importFolders();
            }
        },
        importFolders: function() {
            var totalArea = $('.area', '#folders').length;
            var totalFolder = $('.folder', '#importersource').length;
            var maxPerArea = Math.ceil(totalFolder / totalArea);
            var areaIndex = 0;
            var countFolder = 0;
//            console.log(count);
            if ($('.folder', '#importersource').length > 0) {
                $('.folder', '#importersource').each(function() {
                    $(this).css('width', '');
                    $('.folderhead', this).css('width', '');
                    $('.area').eq(areaIndex).append($(this));
                    countFolder++;
                    if (countFolder >= maxPerArea) {
                        countFolder = 0;
                        areaIndex++;
                    }
                });
            }
            $('#importer').hide();
        },
        exportFolders: function() {
            var totalFolders = $('.folder', '#folders').length;
            if (totalFolders > 0) {
//                var bookmarkStr = '<!DOCTYPE NETSCAPE-Bookmark-file-1><!-- This is an automatically generated file.It will be read and overwritten.DO NOT EDIT! --><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">';
                var bookmarkStr = '<!DOCTYPE NETSCAPE-Bookmark-file-1><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">';
                $('.folder', '#folders').each(function() {
                    var folderStr = '<DT><H3>' + $('.ftitle', this).text() + '</H3>';
                    folderStr += '<DL>';
                    $('a', this).each(function() {
//                        folderStr += '<DT><A HREF="' + $(this).attr('href') + '" ICON="' + $('img', this).attr('src') + '">' + $('.ltitle', this).text() + '</A>';
                        folderStr += '<DT><A HREF="' + $(this).attr('href') + '" ICON="' + $('img', this).attr('src') + '">' + $('.ltitle', this).text() + '</A></DT>';
                    });
                    folderStr += '</DL></DT>';
                    bookmarkStr += folderStr;
                });
                bookmarkStr += '';
            }

            $('#importersource').html(bookmarkStr);
        }
    };
    //pagetools=================================

    //area----------------------------------------
    var area = {
    };
    //area========================================

    //folder-------------------------------
    var folder = {
        isSorted: false,
        //type integer 1, 2, 3, 4
        typeInt: 1,
        //eventSource( event button ) is kept for later access in showNewLink
        eventSource: null,
        init: function() {
            //If .openfolder, init shrinkPage.
            $('.folderhead .openfolder').each(function() {
                var target = $(this).parent().parent();
                page.shrinkPage(target);
            });

            $('.folderhead').on('click', '.sortlinks', function(e) {
                var target = $(this).parent().parent('.folder');//.folder
                if (!folder.isSorted) {
                    helper.sortLinks(true, target);
                    folder.isSorted = true;
                } else {
                    helper.sortLinks(false, target);
                    folder.isSorted = false;
                }
            });
            $('.folderhead').on('click', '.closefolder', function(e) {
                var target = $(this).parent().parent('.folder');//.folder
                page.shrinkPage(target);
            });
            $('.folderhead').on('click', '.openfolder', function(e) {
                var target = $(this).parent().parent('.folder');//.folder
                page.expandPage(target);
            });
            //add folder--------------------------
            $('.area').on('click', '.addfolder', function(e) {
                folder.eventSource = $(e.currentTarget);
                foldereditor.init();
//                helper.loadScript("app/theme/" + config.theme + "/template.js", folder.showNewFolder);
//                helper.loadScript("app/theme/" + config.theme + "/template.js", folder.showNewFolder);
                folder.showNewFolder();
            });
            $('.area').on('click', '.editfolder', function(e) {
                foldereditor.currentHead = $(e.currentTarget).parent();
                foldereditor.init();
                foldereditor.showFolderEditor();
            });

        },
        showNewFolder: function() {
            var newhead = template.title.replace('f__title', 'New folder').replace('f__icon', config.pluginUrl + config.defaultFicon);
//            foldereditor.currentHead = folder.eventSource.parent('.areamenu').after($(template.header + newtitle + template.header2 + template.footer2 + template.footer)).next().find('.folderhead');
            foldereditor.currentHead = $(newhead);
            foldereditor.isNew = true;
            foldereditor.showFolderEditor();
        },
        initEdit: function() {
            //folder sortable-------------------
            $('.area').sortable({
                connectWith: '.area',
                handle: '.folderhead',
                placeholder: 'folderholder',
                items: '.folder'
            });
//            //folder editable------------------
//            $('.folderhead').click(function(e) {
//                e.preventDefault();
//                foldereditor.currentHead = $(e.currentTarget);
//                foldereditor.showFolderEditor();
//            });
        },
        changeView: function(type) {
            if ($('#folderview').length > 0)
                $('#folderview').remove();
            $('head link:last').after("<link id='folderview' rel='stylesheet' href='" + config.pluginUrl + "app/css/folderview/" + type + ".css'>");
        }

    };
    //folder===============================
    //foldereditor-------------------------------
    var foldereditor = {
        //To distinquish between create and edit
        isNew: false,
        inited: false,
        currentHead: null,
        init: function() {
            if (!foldereditor.inited) {
                //folder editor--------------------
                $('#foldereditor').center().draggable();
                $('#folderclose, #foldercancel').click(function() {
                    $('#foldereditor').hide();
                    $('#widgeticontable').hide();
                });
                $('#folderdel').click(function() {
                    if (confirm('Delete this folder?')) {
                        foldereditor.currentHead.parent().remove();
                        $('#foldereditor').hide();
                        $('#widgeticontable').hide();
                    }
                });
                $('#folderapply').click(function() {
                    foldereditor.applyFolderEditor();
                });
                $('#foldersave').click(function() {
//                        if (confirm('Save editting?')) {
                    foldereditor.applyFolderEditor();
                    storage.saveClean();
                    $('#foldereditor').hide();
                    $('#widgeticontable').hide();
//                        }
                });
                $('#foldermore').click(function() {
                    $('#foldermoremenu').show();
                });
                $('#folderless').click(function() {
                    $('#foldermoremenu').hide();
                });
                $('#foldericonremove').click(function() {
                    $('#foldericon').val(config.pluginUrl + config.defaultFicon);
                    $('#foldericonpreview').attr('class', '');
                });
                $('#foldericonshow').click(function() {
                    $('#widgeticontable').show();
                });
                $('#foldericonhide').click(function() {
                    $('#widgeticontable').hide();
                });
                $('#widgeticontable').center().draggable();
                $('#widgeticontable [class^=wicon]').click(function(e) {
                    var cla = $(e.currentTarget).attr('class');
                    $('#foldereditor #foldericonpreview').attr('class', '').addClass(cla);
                });
                foldereditor.inited = true;
            }
        },
        showFolderEditor: function() {
            var fhead = foldereditor.currentHead;
            var fcontent = $('.foldercontent', fhead.parent());
            $('#foldereditor').show();
            $('#folderhead').val($('.ftitle', fhead).text());
            $('#foldericon').val($('img', fhead).attr('src'));
            $('#foldericonpreview').attr('class', $('img', fhead).attr('class'));
            $('#foldermemo').val($('.fmemo', fhead.parent()).text());
            $('#bgcolor').val(fcontent.css('background-color'));
//            if (fcontent.css('background-image')) {
//                $('#bgimage').val(fcontent.css('background-image').replace('url(', '').replace(')', '').trim());
//            }
            if (fcontent.css('background-image')) {
                $('#bgimage').val(fcontent.css('background-image').replace('url(', '').replace(')', ''));
            }
            $('#bgposition').val(fcontent.css('background-position'));
            $('#bgrepeat').val(fcontent.css('background-repeat'));
            var clss = fhead.parent().attr('class');
            if (clss) {
                var start = clss.indexOf('viewtype-');
                $('#linkviewtype').val(clss.substr(start + 9, 1));
            }
        },
        applyFolderEditor: function() {
            var fhead = foldereditor.currentHead;
            var fcontent = $('.foldercontent', fhead.parent());
            link.changeThisView($('#linkviewtype').val());
            $('.ftitle', fhead).text($('#folderhead').val().replace(/(<([^>]+)>)/ig, ""));
            $('img', fhead).attr('src', $('#foldericon').val().replace(/(<([^>]+)>)/ig, ""));
            $('img', fhead).attr('class', $('#foldericonpreview').attr('class'));
            $('.fmemo', fhead.parent()).text($('#foldermemo').val().replace(/(<([^>]+)>)/ig, ""));
            fcontent.css('background-color', $('#bgcolor').val().replace(/(<([^>]+)>)/ig, ""));
            fcontent.css('background-image', "url(" + $('#bgimage').val() + ")".replace(/(<([^>]+)>)/ig, ""));
            fcontent.css('background-position', $('#bgposition').val());
            fcontent.css('background-repeat', $('#bgrepeat').val());
            if (foldereditor.isNew) {
                folder.eventSource.parent('.areamenu').after($(template.header + template.header2.replace('f__memo', '') + template.footer2 + template.footer)).next().prepend(foldereditor.currentHead);
                foldereditor.isNew = false;
            }
        }
    };
    //foldereditor============================
    //link-------------------------------
    var link = {
        //type integer. 0, 1, 2, 3
        typeInt: 2,
        viewType: ['viewtype-1', 'viewtype-0', 'viewtype-2', 'viewtype-3'],
//        isSortBetween: false,
//        isInitEdit: false,
        //eventSource( event button ) is kept for later access in showNewLink
        eventSource: null,
        init: function() {
            //add theme template
            $('.link a').attr('target', config.target);
            //for jQuery-ui theme
            $('li').hover(function() {
                $(this).toggleClass('ui-state-hover');
            });
            //add link---------------------------
            $('.area').on('click', '.addlink', function(e) {
                link.eventSource = $(e.currentTarget);
//                console.log(link.eventSource);
                linkeditor.init();
//                helper.loadScript("app/theme/" + config.theme + "/template.js", link.showNewLink);
//                helper.loadScript("app/theme/" + config.theme + "/template.js", link.showNewLink);
                link.showNewLink();
            });

            $('.area').on('click', '.editlink', function(e) {
                linkeditor.currentLink = $(e.currentTarget).parent();
                linkeditor.init();
                linkeditor.showLinkEditor();
            });
            $('[class^=star]').click(function(e) {
                link.rate(e);
            });
        },
//        showNewLink: function() {
//            var newlink = template.content.replace('a__icon', config.defaultIcon).replace('a__href', '').replace('a__title', 'New link');
//            linkeditor.currentLink = link.eventSource.parent('.folderhead').next().find('.links').prepend($(newlink)).children(':first-child');
//            linkeditor.showLinkEditor();
//        },
        showNewLink: function() {
            var newlink = template.content.replace('a__icon', config.pluginUrl + config.defaultIcon).replace('a__href', '').replace('a__title', 'New link').replace('a__memo', '');
//            linkeditor.currentLink = link.eventSource.parent('.folderhead').next().find('.links').prepend($(newlink)).children(':first-child');
            linkeditor.currentLink = $(newlink);
            linkeditor.isNew = true;
            linkeditor.showLinkEditor();
        },
        initEdit: function() {
//            if (!link.isInitEdit) {
            //link sortable---------------------
//            $('.links').resizable({handles: "se"});
            $('.links').resizable({handles: "se"}).sortable({
//                connectWith: '.links',
                placeholder: 'linkholder',
                items: '> .link'
            });
//            //link editable--------------------
//            $('.link').click(function(e) {
//                e.preventDefault();
//                e.stopPropagation();
//                linkeditor.currentLink = $(e.currentTarget);
//                linkeditor.showLinkEditor();
//            });
//                link.isInitEdit = true;
//            }
        },
        initSortBetween: function() {
//            if (!link.isSortBetween) {
            $('.links').resizable({handles: "se"}).sortable({
                connectWith: '.links',
                placeholder: 'linkholder',
                items: '> .link'
            });
//                link.isSortBetween = true;
//            }
        },
//        changeView: function(type) {
//            if ($('#linkview').length > 0) {
//                $('#linkview').remove();
//            }
//            $('head link:last').after("<link id='linkview' rel='stylesheet' href='app/css/linkview/" + type + ".css'>");
//        }
        changeView: function(type, target) {
            $('.folder', target).each(function() {
                $(this).attr('class', '').addClass('ui-state-default ui-corner-all folder ' + link.viewType[type]);
            });
        },
        changeThisView: function(type) {
            $(foldereditor.currentHead.parent()).attr('class', '').addClass('ui-state-default ui-corner-all folder ' + link.viewType[type]);
        },
        /**
         * Rate link with star.
         * @param {type} elem
         * @param {type} link
         */
        rate: function(e) {
            var ln = $(e.currentTarget);
            var stars = parseInt(ln.attr('class').replace('star', ''));
//            console.log(stars);
            stars++;
//            console.log(stars);
            if (stars > 5)
                stars = 0;
            ln.attr('class', 'star' + stars);
        }
    };

    var linkeditor = {
        //to distinguish between create and edit
        isNew: false,
        currentLink: null,
        init: function() {
            if (!linkeditor.initializedLinkEditor) {
                //link editor-----------------------
                $('#linkeditor').center().draggable();
                $('#linkclose, #linkcancel').click(function() {
                    $('#linkeditor').hide();
                });
                $('#linkdel').click(function() {
                    if (confirm('Delete this link?')) {
                        linkeditor.currentLink.remove();
                        storage.saveClean();
                        $('#linkeditor').hide();
                    }
                });
                $('#linkapply').click(function() {
                    linkeditor.applyLinkEditor();
                });
                $('#linksave').click(function() {
//                    if (confirm('Save editting?')) {
                    linkeditor.applyLinkEditor();
                    storage.saveClean();
                    $('#linkeditor').hide();
//                    }
                });
                $('#linkpaste').click(function() {
                    $(this).focus();
                });
                $('#linkpasteclear').click(function() {
                    linkeditor.clearPaste();
                });
                $('#linkpastesave').click(function() {
                    linkeditor.savePaste();
                });
                linkeditor.initializedLinkEditor = true;
            }
        },
        showLinkEditor: function() {
            var link = linkeditor.currentLink;
            $('#linkeditor').show();
            $('#linktitle').val($('a', link).text());
            $('#linkhref').val($('a', link).attr('href'));
            $('#linkicon').val($('img', link).attr('src'));
            $('#linkmemo').val($('.memo', link).text());
            $('#linkpaste').focus();
        },
//        applyLinkEditor: function() {
//            var ln = linkeditor.currentLink;
//            $('a', ln).text($('#linktitle').val().replace(/(<([^>]+)>)/ig, ""));
//            $('a', ln).attr('href', $('#linkhref').val().replace(/(<([^>]+)>)/ig, ""));
//            $('img', ln).attr('src', $('#linkicon').val().replace(/(<([^>]+)>)/ig, ""));
//            $('.memo', ln).text($('#linkmemo').val().replace(/(<([^>]+)>)/ig, ""));
//            if (linkeditor.isNew) {
//                console.log(link.eventSource);
//                link.eventSource.parent('.folderhead').next().find('.links').prepend(linkeditor.currentLink);
//                linkeditor.isNew = false;
//            }
//        }
        applyLinkEditor: function() {
            var ln = linkeditor.currentLink;
//            $('a', ln).text($('#linktitle').val().replace(/(<([^>]+)>)/ig, ""));
//            $('a', ln).attr('href', $('#linkhref').val().replace(/(<([^>]+)>)/ig, ""));
            $('.ltitle', ln).text($('#linktitle').val().replace(/(<([^>]+)>)/ig, ""));
            $('a', ln).attr('href', $('#linkhref').val().replace(/(<([^>]+)>)/ig, ""));
            $('img', ln).attr('src', $('#linkicon').val().replace(/(<([^>]+)>)/ig, ""));
            $('.memo', ln).text($('#linkmemo').val().replace(/(<([^>]+)>)/ig, ""));
            if (linkeditor.isNew) {
                link.eventSource.parent('.folderhead').next().next().find('.links').prepend(linkeditor.currentLink);
                linkeditor.isNew = false;
            }
        },
        clearPaste: function() {
            $('#linkpaste').html('');
        },
        savePaste: function() {
            if ($('a', $('#linkpaste')).length > 0) {
                var atarget = link.eventSource.parent('.folderhead').next().next().find('.links');
                $('a', $('#linkpaste')).each(function() {
                    var that = $(this);
                    var ahref = that.attr('href');
                    var atitle = that.text();
                    var aicon = $('img', that).attr('src') || config.pluginUrl + config.defaultIcon;
                    var newlink = $(template.content.replace('a__icon', aicon).replace('a__href', ahref).replace('a__title', atitle).replace('a__memo', ''));
                    atarget.prepend(newlink);
                });
                storage.saveClean();
                $('#linkeditor').hide();
            }
//            else {
//                var ajson = JSON.parse($('#linkpaste').text());
//                if (typeof ajson === 'object') {
//                    var ahref = decodeURIComponent(ajson.h);
//                    var atitle = decodeURIComponent(ajson.t);
//                    var amemo = decodeURIComponent(ajson.s);
//                    var pathArray = ahref.split('/');
//                    var protocol = pathArray[0];
//                    var host = pathArray[2];
//                    var aicon = protocol + '//' + host + '/favicon.ico';
//                    var newlink = $(template.content.replace('a__icon', aicon).replace('a__href', ahref).replace('a__title', atitle).replace('a__memo', amemo));
//                    var atarget = link.eventSource.parent().parent('.folder').find('.links');
//                    atarget.prepend(newlink);
//                    storage.saveClean();
//                    $('#linkeditor').hide();
//                }
//            }
            else {
                var ajson = $('#linkpaste').text().trim();
                if (ajson.indexOf('&') > 0) {
                    var arr = ajson.split('&');
                    if (ajson.length > 1) {//at least , title and url should exist.
                        var ahref = decodeURIComponent(arr[0]);
                        var atitle = decodeURIComponent(arr[1]);
                        var amemo = decodeURIComponent(arr[2]);
                        var pathArray = ahref.split('/');
                        var protocol = pathArray[0];
                        var host = pathArray[2];
                        var aicon = protocol + '//' + host + '/favicon.ico';
                        var newlink = $(template.content.replace('a__icon', aicon).replace('a__href', ahref).replace('a__title', atitle).replace('a__memo', amemo));
                        var atarget = link.eventSource.parent().parent('.folder').find('.links');
                        atarget.prepend(newlink);
                        storage.saveClean();
                        $('#linkeditor').hide();
                    }

                }
            }
        }
    };
    //linkeditor===============================


    //localStorage------------------------
    var storage = {
        localSupported: false,
        init: function() {
            storage.localSupported = storage.supportsLocal();
        },
        supportsLocal: function() {
            try {
                return localStorage !== undefined && 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        },
        fetchLocal: function() {
            if (storage.localSupported && localStorage.getItem(config.storageBase + config.fileName)) {
                return localStorage.getItem(config.storageBase + config.fileName);
            } else {
                return false;
            }
        },
        cleanBeforeSave: function() {
            //reset the research result
            searcher.resetSearch();
            if (!page.cleaned) {
                //reset resizable(), sortable()
                $('.area').sortable('destroy');
                $('.links').resizable('destroy').sortable('destroy');
                //restore folderhead and link
                $('.folderhead, .link').unbind('click');
                //reset the edit mode
//                $('#sortwithin').html("<span class='icon-edit'></span>Start Edit").removeClass('btn-danger').addClass('btn-warning');
                $('#sortwithin').html("<span class='icon-edit'></span>").removeClass('btn-danger').addClass('btn');
                $('#sortbetween').html("<span class='icon-edit'></span>").removeClass('btn-danger').addClass('btn-warning');
                page.editMode = false;
                page.cleaned = true;
            }
        },
        saveClean: function() {
            storage.cleanBeforeSave();
            var content = $('#folders').html();
            if (storage.saveLocal(content)) {
                helper.showMessage('Saved');
            } else {
                helper.showErrorMessage('Upgrade your browser to support localStorage or Save as a file to your desktop');
            }
        },
        saveLocal: function(content) {
            if (storage.localSupported) {
                localStorage.setItem(config.storageBase + config.fileName, content);
                storage.saveConfig();
                return true;
            } else {
                return false;
            }
        },
        saveConfig: function() {
            if (storage.localSupported) {
                localStorage.setItem(config.storageBase + '.config.' + config.fileName, JSON.stringify(config));
            }
            //To prepare for 'save as file', always save the conf as a confLink in document.
            var conf = JSON.stringify(config);
            //remove the old conf
            var confLink = $('#speedlinky_conf');
            if (confLink.length > 0) {
                confLink.remove();
            }
            //save a new conf
            $('body').append("<div id='speedlinky_conf' data-conf='" + conf + "'></div>");
        },
//        getConfig: function() {
//            if (storage.localSupported) {
//                var conf = JSON.parse(localStorage.getItem(config.storageBase + '.config.' + config.fileName));
//                return conf;
//            } else {
//                return false;
//            }
//        },
        removeLocal: function() {
//            console.log(826);
            if (storage.localSupported) {
                var k = 0;
                while (key = localStorage.key(k)) {
//                    console.log(key);
                    if (key.indexOf(config.storageBase) === 0) {
                        localStorage.removeItem(key);
                    }
                    k++;
                }
                return true;
            } else {
                return false;
            }
        },
        removeThisPage: function() {
            if (storage.localSupported) {
                localStorage.removeItem(config.storageBase + config.fileName);
            }
        },
        removeThisConfig: function() {
            if (storage.localSupported) {
                localStorage.removeItem(config.storageBase + '.config.' + config.fileName);
            }
        }
    };//storage===================================

    //helper functions-----------------------------
    var helper = {
        init: function() {

            $('#message').center();
            $('#errormessage').center().draggable();
        },
        /**
         * To show any message from server
         * @param {type} response
         * @returns {undefined}
         */
        showMessage: function(response) {
            $('#message').html(response).fadeIn('1000').delay('2000').fadeOut('4000');
        },
        showErrorMessage: function(response) {
            $('#errormessage').html(response).fadeIn('1000').delay('2000').fadeOut('4000');
        },
        //template-----------------------------------
        loadScript: function(url, callback)
        {
            if ($('#templatejs').length <= 0) {
                // Adding the script tag to the head as suggested before
                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                script.id = 'templatejs';
                // Then bind the event to the callback function.
                // There are several events for cross browser compatibility.
                script.onreadystatechange = callback;
                script.onload = callback;
                // Fire the loading
                head.appendChild(script);
//            head.insertBefore( script,head.firstChild);
            }
            else {
                callback();
            }
        },
        /**
         * Helper function for widget title sort
         * @param {type} direction
         * @returns {undefined}
         */
        sortFolders: function(direction) {
            $('.area').each(function() {
                var widgets = $(this).find('.folder');

                widgets.sort(function(a, b) {
                    var at = $(a).find('.ftitle').text().toUpperCase();
                    var bt = $(b).find('.ftitle').text().toUpperCase();
                    return direction ? (at > bt) : (at < bt);

                });
                for (var i = 0; i < widgets.length; i++) {
                    $(this).append(widgets[i]);
                }
            });
        },
        /**
         * Helper function for link sorting
         * @param boolean direction
         * @param folder that
         * @returns {undefined}
         */
        sortLinks: function(direction, that) {
            var linksParent = that.find('.links').eq(0);
            var links = linksParent.find('.link');
            links.sort(function(a, b) {
//                var at = $(a).children('a').children('.ltitle').text().trim().toUpperCase();
//                var bt = $(b).children('a').children('.ltitle').text().trim().toUpperCase();
                var at = $(a).children('a').children('.ltitle').text().toUpperCase();
                var bt = $(b).children('a').children('.ltitle').text().toUpperCase();
                return direction ? (at > bt) : (at < bt);
            });
            for (var i = 0; i < links.length; i++) {
                linksParent.append(links[i]);
            }
        }
    };

    //searcher------------------------------------
    var searcher = {
        /**
         * To search the word present in the page and href of a tag
         */
        init: function() {
            $('#searchbutton').click(function() {
                if ($("#searchinput").val().length) {
                    searcher.doSearch($("#searchinput").val());
                }
                else {
                    searcher.resetSearch();
                }
            });
            /**
             * To reset the input and page
             */
            $('#resetsearchbutton').click(function() {
                searcher.resetSearch();
            });
            /**
             * To be able to start search by pressing enter key
             */
            $('#searchinput').keypress(function(event) {
                if (event.which === 13 && $("#searchinput").val().length) {
                    event.preventDefault();
                    searcher.doSearch($("#searchinput").val());
                }
                else if (event.which === 13) {
                    searcher.resetSearch();
                }
            });
        },
        /**
         * Helper function for searching
         * @param {type} input
         * @returns {undefined}
         */
        doSearch: function(input) {
            var input = input.toUpperCase();
            $("body").highlight(input);
            $(".link a").each(function() {
                var pos = $(this).attr('href').toUpperCase().indexOf(input);
                if (pos > 0) {
                    //When found, append spannode so that it can be seen (href itself cannot be seen) 
                    var spannode = document.createElement('span');
                    spannode.className = 'highlight';
                    spannode.textContent = ' ';
                    $(this).after(spannode);
                }
            });
            $('.highlight').parents('.folder').each(function() {
                $(this).css({'border': '1px yellow solid'});
            });
        },
        /**
         * Helper function for reseting
         * @returns {undefined}
         */
        resetSearch: function() {
            $("#searchinput").val('');
            $('.folder').css({'border': 'none'});
            $("body").removeHighlight();
        }

    };//searcher================================
    //OOP===============================================

    speedlinky.run();
});

