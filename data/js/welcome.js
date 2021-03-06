// Which page?
current_page = document.location.href.match(/[^\/]+$/)[0];

// Pass commands to Python
function cmd(instruction) {
  document.title = instruction;
}

// Global across all pages
$(window).load(function() {
    // Smoothly fade into the page.
    $('body').fadeIn('slow');
});

// Smoothly fade out of the page.
function smoothPageFade(target_href) {
    $('html').fadeOut('fast');
    setTimeout(function(){
        window.location.href = target_href;
    }, 200);
}

// When page first opens
$(document).ready(function() {

  // Back to the top
  $(window).scroll(function () {
      if ($(this).scrollTop() > 90) {
          $('#scroll-top').fadeIn();
      } else {
          $('#scroll-top').fadeOut();
      }
  });

  $('#navigation-right').append('<a id="scroll-top" class="navigation-button" style="display:none"><i class="material-icons">&#xE316;</i></a>')

  $('#scroll-top').click(function () {
      $("html, body").animate({
          scrollTop: 0
      }, 600);
      return false;
  });

});

// Smoothly fade between two elements (by ID)
function smoothFade(from, to) {
  $(from).fadeOut();
  setTimeout(function(){ $(to).fadeIn(); }, 400 );
}

// Smoothly fade the navigation sub-title
function changeSubtitle(textToDisplay) {
  // Smoothly fade subtitle
  $('#navigation-sub-title').fadeOut();
  setTimeout(function() {
    $('#navigation-sub-title').html(textToDisplay);
    $('#navigation-sub-title').fadeIn();
  }, 400);
}

// Remove slowly, fadeOut an element and then remove it.
function removeSlowly(element) {
  $(element).fadeOut()
  setTimeout(function() {
    $(element).remove();
  }, 1000);
}

// For pages that depend on an internet connection, but Welcome couldn't connect.
function reconnectTimeout() {
  if ( ! $('#reconnectFailed').is(':visible') ) {
    $('#reconnectFailed').fadeIn();
  } else {
    $('#reconnectFailed').jAnimateOnce('pulse');
  }
}

// Dynamically set the cursor,
function setCursorBusy() {
  $('html').addClass('cursor-wait');
  $('body').addClass('cursor-wait');
  $('a').addClass('cursor-wait');
}

function setCursorNormal() {
  $('html').removeClass('cursor-wait');
  $('body').removeClass('cursor-wait');
  $('a').removeClass('cursor-wait');
}

///////////////////////////////////////////////////////////////

// Main Menu Only = Animation
if ( current_page == 'index.html' ) {

  // Animate elements of the page
  $('#main-menu-logo').jAnimateOnce('rotateIn');
  $('.main-menu-text').fadeIn('slow');
  $('#open-at-start').jAnimateOnce('fadeIn');
  setTimeout(function(){
    $('#mate-blur').jAnimateOnce('zoomIn');
    $('#mate-blur').show();
  }, 50);

  // Have we greeted the user already?
  if ( document.cookie == 'greeted=yes' ) {

    $(document).ready(function () {
      $(".fade").removeClass("fade");
      $(".fade-1s").removeClass("fade-1s");
      $(".fade-2s").removeClass("fade-2s");
      $(".fade-3s").removeClass("fade-3s");
      $(".fade-4s").removeClass("fade-4s");
      $(".fade-5s").removeClass("fade-5s");
    });
  }

  document.cookie = 'greeted=yes';

  // Enable tooltips
 /* $(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
  });*/

  // Sssh... You found the little secrets! ;)
  //// Logo starts to animate after a minute.
    setTimeout(function(){
      $('#main-menu-logo').jAnimateOnce('tada');
    }, 60000);

    setTimeout(function(){
      $('#main-menu-logo').jAnimateOnce('flip');
    }, 60000);

    setTimeout(function(){
      $('#main-menu-logo').jAnimateOnce('rotateOut');
    }, 70000);

    setTimeout(function(){
      $('#main-menu-logo').jAnimateOnce('rotateIn');
    }, 71000);

    setTimeout(function(){
      $('#main-menu-logo').jAnimateOnce('rollOut');
    }, 80000);

    setTimeout(function(){
      $('#main-menu-logo').jAnimateOnce('rollIn');
    }, 81000);

    setTimeout(function(){
      $('#main-menu-logo').jAnimateOnce('zoomOut');
    }, 90000);

    setTimeout(function(){
      $('#main-menu-logo').jAnimateOnce('zoomIn');
    }, 91000);

    // Internally work with days, months and years as a number.
    function dateAsNumber(day, month, year) {
      // Assumes 'month' parameter is in base 0.
      // day, month   = Required.
      // year         = Optional, set to 'null' to use current year.
      var then = new Date();
      if ( year != null ) {
        then.setYear(year);
      }
      then.setMonth(month-1);
      then.setDate(day);
      var finalNumber = Math.floor( then / (1000 * 60 * 60 * 24) );
      //~ var dateInYears = current + todayAsNumber;
      //~ console.log('** finalNumber: '+finalNumber)
      //~ return dateInYears;
      return finalNumber;
    }

    // Activate Confetti
    function activateConfetti() {
      if ( disable_confetti == false ) {
        $('#special').html('<canvas id="confetti" width="100%" height="100%" style="z-index: -1000; position: absolute; top: 0px; left: 0px;"></canvas>');
        startConfetti();
        return
      } else {
        return
      }
    }

    // Use 'dd', 'mm' and 'yyyy' variables to re-use code.
    var today = new Date();
    var dd = 0;  var mm = 0;  var yyyy = 0; var release = '';

    // What is today?
    var today = new Date();
    var todayAsNumber = dateAsNumber(today.getDate(), today.getMonth()+1, null)

    // Check dates for special events.
    function specialEventCheck(dateNo, title_text, show_confetti, fa_icon) {
      // dateNo        = dateAsNumber(dd, mm, yyyy) function.
      // title_text    = Text to display when date matches.
      // show_confetti = True / False = Celebrate when date matches.
      // fa_icon       = FontAwesome icon to display. Usually 'bell' or 'calendar' or 'bug'.
      var do_show_this = false;
      if ( dateNo == todayAsNumber) {
        // Today is the day!
        var do_show_this = true;
      }
      if ( do_show_this == true ) {
        $('.main-menu-text').hide();
        $('.main-menu-text').fadeIn();
        $('.main-menu-text').html("<span class='fa fa-" + fa_icon + "'></span>&nbsp;" + title_text);
        if ( show_confetti == true ) {
          activateConfetti();
        }
      }
    }

    // Dates to be checking for.
    function checkDates() {
      // String variables are passed via Python. See _push_config for "Special Event Strings".

      // Official Flavour Status - 26/Feb/2015
      var age = today.getFullYear() - 2015;
      dd = 26; mm = 02; yyyy = null;
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-7, flavour_anniversary_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-6, flavour_anniversary_future + ' ' + days_in + ' 6 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-5, flavour_anniversary_future + ' ' + days_in + ' 5 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-4, flavour_anniversary_future + ' ' + days_in + ' 4 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-3, flavour_anniversary_future + ' ' + days_in + ' 3 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-2, flavour_anniversary_future + ' ' + days_in + ' 2 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-1, flavour_anniversary_future + ' ' + tomorrow, true, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)  , flavour_anniversary_present + ' ' + age + ' ' + years_ago, true, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+1, flavour_anniversary_past + ' ' + yesterday, true, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+2, flavour_anniversary_past + ' 2 ' + days_ago, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+3, flavour_anniversary_past + ' 3 ' + days_ago, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+4, flavour_anniversary_past + ' 4 ' + days_ago, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+5, flavour_anniversary_past + ' 5 ' + days_ago, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+6, flavour_anniversary_past + ' 6 ' + days_ago, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+7, flavour_anniversary_past + ' 7 ' + days_ago, false, 'calendar');

      // Project Birthday - 21/Jun/2014
      var age = today.getFullYear() - 2014;
      dd = 21; mm = 06; yyyy = null;
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-7, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-6, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + days_in + ' 6 ' + future_days, false, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-5, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + days_in + ' 5 ' + future_days, false, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-4, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + days_in + ' 4 ' + future_days, false, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-3, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + days_in + ' 3 ' + future_days, false, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-2, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + days_in + ' 2 ' + future_days, false, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-1, project_birthday_future + ' ' + age + ' ' + years_old + ' ' + tomorrow + ' ' + project_birthday, false, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)  , project_birthday_present + ' ' + age + ' ' + years_old + ' ' + today_string + ' ' + project_birthday, true, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+1, project_birthday_past + ' ' + age + ' ' + years_old + ' ' + yesterday + ' ' + project_birthday, true, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+2, project_birthday_past + ' ' + age + ' ' + years_old + ', 2 ' + days_ago, false, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+3, project_birthday_past + ' ' + age + ' ' + years_old + ', 3 ' + days_ago, false, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+4, project_birthday_past + ' ' + age + ' ' + years_old + ', 4 ' + days_ago, false, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+5, project_birthday_past + ' ' + age + ' ' + years_old + ', 5 ' + days_ago, false, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+6, project_birthday_past + ' ' + age + ' ' + years_old + ', 6 ' + days_ago, false, 'birthday-cake');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+7, project_birthday_past + ' ' + age + ' ' + years_old + ', 7 ' + days_ago, false, 'calendar');

      // Holiday Celebrations
      specialEventCheck(dateAsNumber(31,12,null), celebrate_new_year, true, 'calendar');
      specialEventCheck(dateAsNumber(01,01,null), celebrate_new_year, true, 'calendar');

      // 16.04 Beta 2
      dd = 24; mm = 03; yyyy = 2016;
      release = 'Ubuntu MATE 16.04 Beta 2';
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-3, release + ' ' + project_release_future + ' ' + days_in + ' 3 ' + future_days, false, 'bug');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-2, release + ' ' + project_release_future + ' ' + days_in + ' 2 ' + future_days, false, 'bug');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-1, release + ' ' + project_release_future + ' ' + tomorrow, false, 'bug');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)  , release + ' ' + project_release_present, true, 'bug');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+1, project_release_thanks + ' ' + release + '.', true, 'bug');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+2, project_release_thanks + ' ' + release + '.', false, 'bug');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+3, project_release_thanks + ' ' + release + '.', false, 'bug');

      // 16.04 Final Release
      dd = 21; mm = 04; yyyy = 2016;
      release = 'Ubuntu MATE 16.04 LTS';
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-7, release + ' ' + project_release_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-6, release + ' ' + project_release_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-5, release + ' ' + project_release_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-4, release + ' ' + project_release_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-3, release + ' ' + project_release_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-2, release + ' ' + project_release_future + ' ' + days_in + ' 7 ' + future_days, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)-1, release + ' ' + project_release_future + ' ' + tomorrow, true, 'bell');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)  , release + ' ' + project_release_present, true, 'bell');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+1, release + ' ' + project_release_past + ' ' + yesterday, true, 'bell');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+2, release + ' ' + project_release_past + ' 2 ' + days_ago, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+3, release + ' ' + project_release_past + ' 3 ' + days_ago, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+4, release + ' ' + project_release_past + ' 4 ' + days_ago, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+5, release + ' ' + project_release_past + ' 5 ' + days_ago, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+6, release + ' ' + project_release_past + ' 6 ' + days_ago, false, 'calendar');
      specialEventCheck(dateAsNumber(dd,mm,yyyy)+7, release + ' ' + project_release_past + ' 7 ' + days_ago, false, 'calendar');

      // To-do as possible improvement: Retrieve events as a list from server.
    }
}


// Introduction/Features = Animation
if ( current_page == 'introduction.html' || current_page == 'features.html' ) {
  new WOW().init();
}


// Getting Started Only - Index Pane for Selecting Topics
if ( current_page == 'gettingstarted.html' ) {

  function indexOpen() {
    // Is the index already open?
    if ($('#index-menu').is(':visible')) {
      indexClose();
    } else {
      // Open the Index
      $('#index-open').addClass('disabled');
      $('#index-open').prop('disabled', true);
      $("#index-overlay").fadeIn();
      $("#index-menu").show();
      $('#index-menu').jAnimateOnce('fadeInLeft');
    }
  }

  function indexClose() {
    $('#index-open').removeClass('disabled');
    $('#index-open').prop('disabled', false);
    if ($('#index-menu').is(':visible')) {
      $("#index-overlay").fadeOut();
      $('#index-menu').jAnimateOnce('fadeOutLeft',function(){
        $("#index-menu").hide();
      });
    }
  }

  function changePage(id,humanText) {
    // 'id' is one used for <div>.
    // 'humanText' is displayed on navigation's sub title.

    indexClose();

    $('.topicContents').fadeOut();
    $('#navigation-sub-title').fadeOut();

    // Smoothly fade between topics
    setTimeout(function() {
    $('#navigation-sub-title').html(humanText);
    $('#navigation-sub-title').fadeIn();
    $('#'+id).fadeIn();
    }, 500);
  }

  // Show initial page and index pane on page load
  changePage('initial','Choose a Topic');
  setTimeout(function() { indexOpen(); }, 500);
  $('#index-open').jAnimateOnce('fadeInDown');

  // Show additional information on the page based on checkbox state.
  $('.dualBootWin').hide();
  $('#showDualBootWin').click(function() {
    if ( $(this).prop('checked') == true ) {
      $('.dualBootWin').fadeIn();
    } else {
      $('.dualBootWin').fadeOut();
    }
  });

  // Graphics Detection
  // Must be executed shortly after page fully loads in order for variables to exist.
  setTimeout(function() {
    $('.graphics-pci').html(graphicsGrep);

    // Auto detection alert initially displays "failed".
    if ( graphicsVendor == 'NVIDIA' ) {
      $('.graphics-nvidia').show()
      $('.graphics-unknown').hide()
      $('#graphics-open-driver-name').html('nouveau');
      $('#graphics-proprietary').show();

    } else if ( graphicsVendor == "AMD" ) {
      $('.graphics-amd').show()
      $('.graphics-unknown').hide()
      $('#graphics-open-driver-name').html('radeon');
      //~ $('#graphics-proprietary').show();

    } else if ( graphicsVendor == "Intel" ) {
      $('.graphics-intel').show()
      $('.graphics-unknown').hide()

    } else if ( graphicsVendor == "VirtualBox" ) {
      $('.graphics-vbox').show()
      $('.graphics-unknown').hide()

    } else {
      // Obscure graphics chip or something we can't tell.
      $('#graphics-proprietary').show();
    }
  }, 1000);

  // Expand / Collapse sub-sections to keep it tidy.
  function toggleSub(divID,arrowID) {
    if ( $('#'+divID).is(":visible") ) {
      $('#'+divID).fadeOut();
      $('#'+arrowID).removeClass('fa-chevron-up');
      $('#'+arrowID).addClass('fa-chevron-down');
    } else {
      $('#'+divID).fadeIn();
      $('#'+arrowID).removeClass('fa-chevron-down');
      $('#'+arrowID).addClass('fa-chevron-up');
    }
  }

  // Fetch system specifications if not cached already.
  // Wait a couple of seconds so it doesn't look like application had frozen.
  function InitSystemInfo() {
    setCursorBusy()
    setTimeout(function() {
      cmd("init-system-info");
    }, 1000);
  }

  // Show popovers on hover.
  $(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
  });
  $('[rel=unitsinfo]').popover({
      html : true,
      content: function() {
        return $('#popover_units').html();
      }
  });

}


// Donate Only = Links for donations and spendings per month.
if ( current_page == 'donate.html' ) {

  // Some translatable short hand strings are passed via Python.
  // The slight delay allows these variables to be loaded to JS before building the supporters table.
  setTimeout(function() {
      var today = new Date();
      var cellID = '2014-0';

      // Add a Year = (New Row)
      function addYear(year) {
        $('#donationTable').append('<tr><th style="text-align:center" id="' + year + '">' + year + '</th>');
      }

      // Add a Month = (New Column)
      function addMonth(m,y) {
        cellID = y + '-' + m;
        $('#donationTable tr:last').append('<td id="' + cellID + '" style="text-align:center;"><a href="cmd://link?https://ubuntu-mate.org/blog/ubuntu-mate-' + numToMonth(m) + '-' + y + '-supporters/">' + numToShortMonth(m) + '</a></td>');
      }

      // Add a Blank Month = (New Column, Empty)
      function addBlankMonth(m,y) {
        cellID = y + '-' + m;
        $('#donationTable tr:last').append('<td id="' + cellID + '" style="text-align:center;"></td>');
      }

      // Close the Row
      function endYear() {
        $('#donationTable tr:last').append("</tr>");
      }

      // Convert month number to long/short string.
      // These are used for determining the URL.
      function numToMonth(m) {
        switch (m) {
          case 0:
            return 'january';
            break;
          case 1:
            return 'february';
            break;
          case 2:
            return 'march';
            break;
          case 3:
            return 'april';
            break;
          case 4:
            return 'may';
            break;
          case 5:
            return 'june';
            break;
          case 6:
            return 'july';
            break;
          case 7:
            return 'august';
            break;
          case 8:
            return 'september';
            break;
          case 9:
            return 'october';
            break;
          case 10:
            return 'november';
            break;
          case 11:
            return 'december';
            break;
        }
      }

      // These shorthand month names are seen to the user in the table.
      function numToShortMonth(m) {
        switch (m) {
          case 0:
            return short_jan;
            break;
          case 1:
            return short_feb;
            break;
          case 2:
            return short_mar;
            break;
          case 3:
            return short_apr;
            break;
          case 4:
            return short_may;
            break;
          case 5:
            return short_jun;
            break;
          case 6:
            return short_jul;
            break;
          case 7:
            return short_aug;
            break;
          case 8:
            return short_sep;
            break;
          case 9:
            return short_oct;
            break;
          case 10:
            return short_nov;
            break;
          case 11:
            return short_dec;
            break;
        }
      }

      // Determine if the date is Jan and set to Dec last year.
      function determineLastMonth() {
        lastMonthID = '#' + today.getFullYear() + '-' + (today.getMonth() - 1);

        // Before January?! Then we mean December last year.
        if ( today.getMonth()-1 == -1 ) {
          lastMonthID = '#' +  (today.getFullYear() - 1) + '-11';
        }
        return lastMonthID;
      }

      // Shade Recent Months
      function shadeCells() {
        // Determine current and last month
        currentMonthID = '#' + today.getFullYear() + '-' + today.getMonth();
        lastMonthID = determineLastMonth();

        // Shade today's month, year and show text (as it's a blank cell).
        $(currentMonthID).css('background-color','#87A556');
        $(currentMonthID).css('color','#fff');
        $(currentMonthID).css('font-weight','bold');
        $(currentMonthID).html(numToShortMonth(today.getMonth()));

        currentYearID = '#'+today.getFullYear();
        $(currentYearID).css('background-color','#87A556');
        $(currentYearID).css('color','#fff');
        $(currentYearID).css('font-weight','bold');

        // Lightly shade last month.
        $(lastMonthID).css('background-color','#CBD6BA');
        $(lastMonthID).css('color','#000');
        $(lastMonthID).css('font-weight','bold');

        // Start of new month? Give 3 days grace before showing the link, just to be sure it's unlikely to be a 404.
        if ( today.getDate() <= 3 ) {
          if ( ! today.getMonth()-1 == -1 ) {
            $(lastMonthID).html('<span class="fa fa-clock-o"></span> '+numToShortMonth(today.getMonth()-1));
          } else {
            $(lastMonthID).html('<span class="fa fa-clock-o"></span> '+numToShortMonth(11));
          }
        }
      }

      ////////////////////////////////

      // Donations started at the end of 2014.
      addYear('2014');
      for ( m = 0; m < 10; m++ ) { var y = 2014; addBlankMonth(m,y); }
      addMonth(10,2014);
      addMonth(11,2014);
      endYear();

      // Determine each year's blog posts since 2015
      for (y = 2015; y < today.getFullYear()+1; y++) {
        addYear(y);
        // Determine each month in that year
        for (m = 0; m < 12; m++) {
          if ( today.getFullYear() == y && today.getMonth() < m ) {
            addBlankMonth(m,y);
          } else {
            addMonth(m,y);
          }
        }
        endYear();
        shadeCells();
      }
  }, 1000);

}


// Entering Software Only Mode
if ( current_page == 'software-only.html' ) {
    setCursorBusy()
}
