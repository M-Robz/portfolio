/* 
  PORTFOLIO NOTE: This file contains the subset of code from dcg_script.js that I created or significantly modified.  -MGR
*/


$(document).ready(function() {
  var openStr = location.search.substring(1);
  var pageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);


   /* TEAM BIOS */
   $('.bio-list a').bind("click",function(event){
    event.preventDefault();
    $('.bio-list a').removeClass('active');
    $(this).addClass('active');
    var targetDiv = $(this).attr('href');
    $('.fullBio').slideUp('normal');
    $(targetDiv).slideDown('normal');
   });

   $('.fullBio').hide();
   $('.bio-start').show();


   /* INNOVATION PROFILES */
   $('.profile-list a').bind("click",function(event){
    event.preventDefault();
    $('.profile-list a').removeClass('active');
    $(this).addClass('active');
    var targetDiv = $(this).attr('href');
    $('.fullProfile').slideUp('normal');
    $(targetDiv).slideDown('normal');
    $('.scrollContainer').slimScroll({ scrollTo: '0px' })
   });

   $('.fullProfile').hide();
   $('.profile-start').show();
   
   // Scrollbar for innovation profiles
     if (pageName == 'innovation-profiles.html') {
     $('.scrollContainer').slimScroll({
      height: '428px',
      allowPageScroll: true,
      wheelStep: '5'
     });
     }
     
     
     /* FELLOWS BLOG */
   $('#authorFilter').on('change', function(event) {
       event.preventDefault();
    var val_authorFilter = $('#authorFilter').val();
    if (val_authorFilter === 'allAuthors') {
      $('.postLink').slideDown('slow');
    } else {
      $('.postLink').not('.' + val_authorFilter).slideUp('fast');
      $('.' + val_authorFilter).slideDown('slow');
    }
   });
   
   
   // support hyperlinking to faq categories and team bios
   if ( openStr.indexOf( 'open=' ) != -1 ) {
      jQuery('html,body').scrollTop(600);
      openDiv = '#' + openStr.substring( openStr.indexOf('=')+1 );
      if ( pageName == 'faq.html' ) {
        $('.faq-section').hide();
        $('.faq-list a').removeClass('active');
      }
      else if ( pageName == 'team-bios.html' ) {
        $('.fullBio').hide();
        $('.bio-list a').removeClass('active');
      }
      $(openDiv).show();
    $('[href="' + openDiv + '"]').addClass('active');
   }

});
