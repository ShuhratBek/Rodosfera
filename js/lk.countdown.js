(function ($) {
    var instances = [];
    var handlers = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'daysLeft'];
    var delegate = function (scope, method) {
        return function () {
            return method.call(scope)
        }
    };

    // The Final Countdown
    var Countdown = function (el, finalDate, callback) {
        this.$this = $(el);
        this.values = {};
        this.lasting = {};
        this.interval = this.$this.data('countdownInterval');
        this.currentDate = new Date();
        this.secondsLeft = Math.floor((finalDate.valueOf() - this.currentDate.valueOf()) / 1000);
        this.callback = callback;

        this.instanceNumber = instances.length;
        instances.push(this);
        // Save the reference
        this.$this.data('countdown-instance', this.instanceNumber);

        this.triggerEvents();


        if (this.interval) this.stop();
        this.start();
    };

    $.extend(Countdown.prototype, {
        dispatchEvent: function (eventName) {
            var event = $.Event(eventName);
            event.date = new Date(new Date().valueOf() + this.secondsLeft);
            event.value = this.values[eventName] || "0";
            event.lasting = this.lasting;
            switch (eventName) {
                case "seconds":
                case "minutes":
                case "hours":
                    event.value = event.value < 10 ? '0' + event.value.toString() : event.value.toString();
                    break;
                default:
                    if (event.value) {
                        event.value = event.value.toString();
                    }
                    break;
            }
            this.callback.call(this.$this, event);
        },
        triggerEvents: function () {
            this.secondsLeft--;
            if (this.secondsLeft < 0) {
                this.secondsLeft = 0;
            }
            this.lasting = {
                seconds: this.secondsLeft % 60,
                minutes: Math.floor(this.secondsLeft / 60) % 60,
                hours: Math.floor(this.secondsLeft / 60 / 60) % 24,
                days: Math.floor(this.secondsLeft / 60 / 60 / 24),
                weeks: Math.floor(this.secondsLeft / 60 / 60 / 24 / 7),
                daysLeft: Math.floor(this.secondsLeft / 60 / 60 / 24) % 7
            }
            for (var i = 0; i < handlers.length; i++) {
                var eventName = handlers[i];
                if (this.values[eventName] != this.lasting[eventName]) {
                    this.values[eventName] = this.lasting[eventName];
                    this.dispatchEvent(eventName);
                }
            }
            if (this.secondsLeft == 0) {
                this.stop();
                this.dispatchEvent('finished');
            }
        },
        stop: function () {
            clearInterval(this.interval);
        },
        start: function () {
            this.$this.data('countdownInterval', setInterval(delegate(this, this.triggerEvents), 1000));
            this.interval = this.$this.data('countdownInterval');
        },
        change: function (toDate) {
            var currentDate = new Date();
            this.secondsLeft = Math.floor((toDate.valueOf() - currentDate.valueOf()) / 1000);
        }

    });


    // Register the jQuery selector actions
    $.fn.countdown = function () {
        var argumentsArray = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            // If no data was set, jQuery.data returns undefined
            var instanceNumber = $(this).data('countdown-instance');

            if (instanceNumber !== undefined) {
                var instance = instances[instanceNumber],
                    method = argumentsArray[0];
                // If method exists in the prototype execute
                if (Countdown.prototype.hasOwnProperty(method)) {
                    instance[method].apply(instance, argumentsArray.slice(1));
                } else {
                    $.error('Method %s does not exist on jQuery.countdown'
                        .replace(/\%s/gi, method));
                }
            } else {
                // ... if not we create an instance
                new Countdown(this, argumentsArray[0], argumentsArray[1]);
            }
        });
    };

})(jQuery);




$(function() {
    var $countdown = $('#countdown')
    ,date = $countdown.data('lk-counter')
    ,curDate;
  	
  	if(date){
      	curDate = new Date(date * 1000);  	
    }else{
      	var curDate = new Date();
     	curDate.setDate(curDate.getDate() + 14);
    }

    $countdown.countdown(curDate, function(event) {
        if (event.type == 'finished') {
            $countdown.fadeOut();
        } else {
            $('.countdown-' + event.type, $countdown).text(event.value);
        }
    });
});