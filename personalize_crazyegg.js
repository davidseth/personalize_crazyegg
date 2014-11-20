(function ($) {

  // Ensure we only send an event once.
  var processedEvents = {};

  /**
   * Adds client side integration between personalize modules and Crazyegg.
   */
  Drupal.behaviors.personalize_crazyegg = {
    attach: function (context, settings) {
      $(document).bind('personalizeDecision', function(event, $option_set, chosen_option, osid) {
        adminMode = settings.personalize.hasOwnProperty('adminMode');

        // Handle Decisions
        var label = Drupal.settings.personalize.option_sets[osid].label;
        var agent = Drupal.settings.personalize.option_sets[osid].agent;
        var actionName = agent + ': ' + label;
        var actionId = actionName + '--' + chosen_option;
        if (!processedEvents[actionId]) {
          //_gaq.push(['_trackEvent', 'Personalize', actionName, chosen_option, 1, true]);
          CE2.set(2, actionName);
          processedEvents[actionId] = 1;
        }
      });

      // Add an action listener for client-side goals.
      addActionListener(settings);
    }
  };

  // Ensure we only add the listener once.
  var processedListeners = {};

  /**
   * Add an action listener for client-side goal events.
   */
  function addActionListener(settings) {
    adminMode = settings.personalize.hasOwnProperty('adminMode');
    if (Drupal.hasOwnProperty('visitorActions') && !adminMode) {
      var events = {}, new_events = 0;
      for (var eventName in settings.personalize.actionListeners) {
        if (settings.personalize.actionListeners.hasOwnProperty(eventName) && !processedListeners.hasOwnProperty(eventName)) {
          processedListeners[eventName] = 1;
          events[eventName] = settings.personalize.actionListeners[eventName];
          new_events++;
        }
      }
      if (new_events > 0) {
        var callback = function(eventName, jsEvent) {
          if (events.hasOwnProperty(eventName)) {
            // documentation: http://support.crazyegg.com/customize-crazy-egg/
            CE2.click(eventName);
            
            //CE2.set(2, eventName);
            //_gaq.push(['_trackEvent', 'Visitor Actions', eventName, 'test', 1, true]);
          }
        };
        Drupal.visitorActions.publisher.subscribe(callback);
      }
    }
  }

})(jQuery);
