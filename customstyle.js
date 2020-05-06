
/*added by TD 20200311 for package TT-UK-BookingProtect*/
$("#agreeToInsuranceTerms").prop('checked', true).hide();
$("div#insurance>h2").css({"background": "-moz-linear-gradient(left, #d1eff4 0%, rgba(209, 239, 244, 0) 100%)", "background": "-webkit-gradient(linear, left top, right top, from(#d1eff4), to(rgba(209, 239, 244, 0)))",
 "background": "-o-linear-gradient(left, #d1eff4, rgba(209, 239, 244, 0))", "background": " -ms-linear-gradient(left, #d1eff4, rgba(209, 239, 244, 0))", "background": " linear-gradient(to right, #d1eff4 0%, rgba(209, 239, 244, 0) 100%)", "filter" : "progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffd1eff4, endColorstr=#00d1eff4, GradientType=1)", "color":"#404041" });

 $(document).ready(function() {
    var basketProp = $('.ph_basketwidget .basketProperty.Details span.small_text_a:contains("Affliates")');
    if (basketProp) {
        basketProp.parent().parent().hide();
    }

    
    var currentScreen = $eSRO.currentScreen;
    console.log(currentScreen);



    if (currentScreen === "showdetails.aspx") {
            //TODO: Create element in eSRO admin and position with js
            $('.ShowEventsitemsList').before($('<div class="pagingWrapper"><div class="pagingDataContainer"></div><div class="pagingControl"></div></div>'));

            require(["./UserContent/js/pagination.min.js"], function () {
                function template(data) {
                    $(data).show();
                }

                var showlist = $('.ShowEventsitemsList .dataItem').clone().toArray();

                $('.pagingControl').pagination({
                    dataSource: showlist,
                    callback: function (data, pagination) {
                        template(data);
                        $('.pagingDataContainer').html(data);

                    }
                });
            });

            var availableDates = new Array();

            for (var property in dateGroups) {
                var obj = {};
                var newDate = property.split("/");
                obj.date = new Date(newDate[2], newDate[1] - 1, newDate[0]);
                obj.position = new Array(dateGroups[property]);
                availableDates.push(obj);
            }

            $.datepicker.setDefaults($.datepicker.regional['']);

            $('#date').datepicker({
                beforeShowDay: available,
                onSelect: function (dateText, inst) {
                    var ID = returnID(dateText);
                    $("#dateSelect").val(ID.toString()).change();
                    $(".pagingWrapper").hide();
                    $('.ShowEventsitemsList').show();
                    $("html, body").animate({ scrollTop: $('#pickadate').offset().top }, 1000);
                },
                defaultDate: get_default_date(),
            });

            function available(date) {
                var found = false;
                availableDates.forEach(function (item) {
                    if (item.date.getTime() === date.getTime()) {
                        found = true;
                    }
                });

                if (found === true) {
                    return [true, "", "Available"];
                } else {
                    return [false, "", "unAvailable"];
                }
            }

            function get_default_date() {
                return availableDates[0].date;
            }

            function returnID(date) {
                var ID = new Array();
                var newDate = date.split("/");
                var formattedDate = new Date(newDate[2], newDate[0] - 1, newDate[1]);


                availableDates.forEach(function (item) {
                    if (item.date.getTime() === formattedDate.getTime()) {
                        ID = item.position;
                    }
                });
                if (ID !== null) {
                    return ID;
                }
            }

            $("#eventslist").before($("#pickadate"));
            $("#pickadate").before($("#PH_Message"));
            //$("#eventslist").hide();

            $(".extras .MediumSeatsOccupancy").each(function () {
                $(this).closest(".dataItem").addClass("medium-seats");
            });

            $(".extras .LowSeatsOccupation").each(function () {
                $(this).closest(".dataItem").addClass("low-seats");
            });

            $(".extras .SoldOut").each(function () {
                $(this).closest(".dataItem").addClass("sold-out");
            });

            $(".extras .HighSeatsOccupancy").each(function () {
                $(this).closest(".dataItem").addClass("high-seats");
            });

            $('.ShowEventsitemsList').hide();

            $('#pickadate').after($('.ph_partner-info'));
    }

    if (currentScreen === "event4.aspx") {
            if ($('.promoBox button[aria-label="Remove coupon Affliates"]').length > 0) {
                $('.promoBox').hide();
            } else {

                if ($('.hallMap').length > 0) {
                    $('#hallMap').after($('.promoBox'));
                } else if ($('.selected').length > 0) {

                    if ($(window).width() <= 780 && $('#eventPage.seated').length > 0) {
                        $('.seatingPlanContainer:first').after('<div class="promo-container"></div>');
                        $('.promo-container').after($('.promoBox'));
                    } else if ($(window).width() <= 780 && $('#eventPage.non-seated').length > 0) {
                        $('.buttonsContainer').before($('.promoBox'));
                    } else {
                        //$('#ticketsPane').prepend($('.promoBox'));
                        $('.eventDetails:first').after($('.promoBox'));
                    }
                }

            }
        
            $('#zoomContainer').on("mousewheel DOMMouseScroll", function (e) {
                e.stopPropagation()
            });
    }

    if (currentScreen === "order.aspx") {
            $('.DeliveryZipCode').append($('#qasContainer'));
        
            var promo = $('.promo-info:contains("Affliates")');
            if (promo) {
                promo.hide();
            }
        
            var basketProp = $('.basketProperty.Details span.small_text_a:contains("Affliates")');
            if (basketProp) {
                basketProp.parent().hide();
            }
        
            var couponApplied = $('.couponApplied span:contains("Affliates")');
            if (couponApplied) {
                couponApplied.parent().hide();
            }
    }

    if ($eSRO.currentScreen == "checkout.aspx") {
            $('#leftToPayContainer').after($('.suppPaymentsSection'));
            $('#lblChoosePayment').after($('.ph_partner-text'));
        
            var basketProp = $('.basketProperty.Details span.small_text_a:contains("Affliates")');
            if (basketProp) {
                basketProp.parent().parent().hide();
            }
        
            $('.dataItem .moreInfo a').each(function(){
                this.href = this.href.replace('info', 'events');
            });
        
        $(document).on('basketUpdated.esro', function() {
            setTimeout(function() {
                $('#leftToPayContainer').after($('.suppPaymentsSection'));
                $('#lblChoosePayment').after($('.ph_partner-text'));
            }, 300);    
        });
    }


    if (currentScreen === "opsconfirmation.aspx" || currentScreen === "confirmation.aspx" || currentScreen === "opssummary.aspx") {
        var venues = [
            {
                name: 'The Lowry Pier Eight',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Great Northern Warehouse',
                city: 'Manchester',
                postcode: 'M3 4EW'
            },
            {
                name: 'Lowry Gallery',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'The Northern - Albert Halls Bolton',
                city: 'Bolton',
                postcode: null
            },
            {
                name: 'Lady Boys Add-On Packages',
                city: 'Add-On Packages',
                postcode: null
            },
            {
                name: 'Lowry Academy Education Activity 100',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Manchester Town Hall',
                city: 'Manchester',
                postcode: 'M60 2LA'
            },
            {
                name: 'Lowry Day Pass',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Bolton Winter Wonderland Grotto',
                city: 'Bolton',
                postcode: 'BL1 1SA'
            },
            {
                name: 'The Sabai Pavilion - Derby 2017',
                city: 'Derby',
                postcode: 'DE1 3AH'
            },
            {
                name: 'The Studio 200',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'East Lancashire Railway (General Admission)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Zippos Circus Phoenix (South East)',
                city: 'National',
                postcode: null
            },
            {
                name: 'East Lancashire Railway (Dining)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Selfridges Ice Rink',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Birmingham NEC',
                city: 'Birmingham',
                postcode: 'B40 1NT'
            },
            {
                name: 'Lowry School Workshops',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'East Lancashire Railway (8 Carriages)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Bolton Octagon (End)',
                city: 'Bolton',
                postcode: 'BL1 1SB'
            },
            {
                name: 'Ice Cube - Millennium Square',
                city: 'Leeds',
                postcode: 'LS2 8HD'
            },
            {
                name: 'O2 Apollo Manchester (Seated)',
                city: 'Manchester',
                postcode: 'M12 6AP'
            },
            {
                name: 'Slung Low\'s HUB',
                city: 'Leeds',
                postcode: 'LS11 9QX'
            },
            {
                name: 'Lowry Lyric',
                city: 'The Lowry',
                postcode: 'M50 3AZ'
            },
            {
                name: 'The Three Minute Theatre, Affleck\'s Palace',
                city: 'Manchester',
                postcode: 'M1 1JG'
            },
            {
                name: 'Gandeys Circus Big Top',
                city: 'National',
                postcode: null
            },
            {
                name: 'Royal Exchange Main',
                city: 'Manchester',
                postcode: 'M2 7DH'
            },
            {
                name: 'Lowry Quays',
                city: 'The Lowry',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Spirit of the Horse',
                city: 'National',
                postcode: null
            },
            {
                name: 'Trapped Up North Quarantine',
                city: 'Manchester',
                postcode: 'M3 4EN'
            },
            {
                name: 'The Lowry Quay Club',
                city: 'The Lowry',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Stockport Plaza',
                city: 'Stockport',
                postcode: 'SK1 1SP'
            },
            {
                name: 'Lyric Theatre 1800',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Dancehouse',
                city: 'Manchester',
                postcode: 'M1 5QA'
            },
            {
                name: 'Lowry Studio',
                city: 'The Lowry',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Zippos Circus (South East)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Lowry Family Activity',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'The Sabai Pavilion - Brighton 2017',
                city: 'Brighton',
                postcode: 'BN1 1UB'
            },
            {
                name: 'East Lancashire Railway (Add Ons)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Gandeys Circus Big Top 2020',
                city: 'National',
                postcode: null
            },
            {
                name: 'Quays Theatre 500',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Lowry General Admission',
                city: 'Salford',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Princess Katherine',
                city: 'Salford',
                postcode: 'M50 3AZ'
            },
            {
                name: 'The Hayloft, Bridport',
                city: 'Bridport',
                postcode: 'DT6 3LF'
            },
            {
                name: 'Brent Cross Shopping Centre',
                city: 'London',
                postcode: 'NW4 3FP'
            },
            {
                name: 'Waterstones Deansgate',
                city: 'Manchester',
                postcode: 'M3 1SB'
            },
            {
                name: 'Ramsbottom Civic Hall (unreserved)',
                city: 'Bury',
                postcode: 'BL0 9AJ'
            },
            {
                name: 'Bolton Town Centre',
                city: 'Bolton',
                postcode: 'BL1 1SA'
            },
            {
                name: 'Manchester Water Taxis',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Trapped Up North Cabin Fever',
                city: 'Manchester',
                postcode: 'M3 4EN'
            },
            {
                name: 'Avon Valley Railway (Santa\'s Layout)',
                city: 'Bristol',
                postcode: 'BS30 6HD'
            },
            {
                name: 'Lyric Theatre 1000',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Lowry Quays (Cabaret)',
                city: 'The Lowry',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Squire\'s Washington Garden Centre',
                city: 'Pulborough',
                postcode: 'RH20 3BP'
            },
            {
                name: 'Lowry Quays (Unreserved)',
                city: 'The Lowry',
                postcode: 'M50 3AZ'
            },
            {
                name: 'The Sabai Pavilion - Newcastle 2020',
                city: 'Newcastle-upon-Tyne',
                postcode: 'NE1 4EP'
            },
            {
                name: 'Haigh Hall',
                city: 'Wigan',
                postcode: 'WN1 2PE'
            },
            {
                name: 'East Lancashire Railway (Dining 3 carriage 2018)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'General Admission 100',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Lock 91 - Lock Keeper\'s Cottage',
                city: 'Manchester',
                postcode: 'M3 4QL'
            },
            {
                name: 'NEW Zippos Circus (Scotland)',
                city: 'Scotland',
                postcode: null
            },
            {
                name: 'ZZZ_Sabai Pavilion',
                city: 'National',
                postcode: null
            },
            {
                name: 'Custom House Square',
                city: 'Belfast',
                postcode: 'BT1 3FG'
            },
            {
                name: 'zzz_The Sabai Pavilion - Newcastle',
                city: 'Newcastle-upon-Tyne',
                postcode: 'NE1 4EP'
            },
            {
                name: 'Lowry Studio (Unreserved)',
                city: 'The Lowry',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Nexus Art Cafe',
                city: 'Manchester',
                postcode: 'M1 1JW'
            },
            {
                name: 'ZZZ_ELR',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Stockport Plaza (Films)',
                city: 'Stockport',
                postcode: 'SK1 1SP'
            },
            {
                name: 'Trapped Up North Jigsaw',
                city: 'Manchester',
                postcode: 'M3 4EN'
            },
            {
                name: 'Event City',
                city: 'Manchester',
                postcode: 'M41 7TB'
            },
            {
                name: 'Elizabeth Gaskell\'s House',
                city: 'Manchester',
                postcode: 'M13 9LW'
            },
            {
                name: 'MediaCityUK, Salford Quays',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Circus of the Orient',
                city: 'National',
                postcode: null
            },
            {
                name: 'Bolton Albert Halls Theatre',
                city: 'Bolton',
                postcode: 'BL1 1RU'
            },
            {
                name: 'Stockport Garrick Theatre',
                city: 'Stockport',
                postcode: 'SK3 0EJ'
            },
            {
                name: 'Gandeys 2020 Priority Access',
                city: 'National',
                postcode: null
            },
            {
                name: 'Spinningfields Ice Rink',
                city: 'Manchester',
                postcode: 'M3 3AH'
            },
            {
                name: 'Cinnamon Club - Lounge',
                city: 'Altrincham',
                postcode: 'WA14 2TQ'
            },
            {
                name: 'Gandeys General Admission Priority Access',
                city: 'National',
                postcode: null
            },
            {
                name: 'Lowry Academy Family Activity 100',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Intu Trafford Centre',
                city: 'Manchester',
                postcode: 'M17 8AA'
            },
            {
                name: 'Sabai Pavilion - Newcastle/Aberdeen',
                city: 'National',
                postcode: null
            },
            {
                name: 'Stockport Plaza (General Admission)',
                city: 'Stockport',
                postcode: 'SK1 1SP'
            },
            {
                name: 'East Lancashire Railway (Dining 2 carriage 2018)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Band on the Wall',
                city: 'Manchester',
                postcode: 'M4 5JZ'
            },
            {
                name: 'Avon Valley Railway, Bristol (General Admission)',
                city: 'Bristol',
                postcode: 'BS30 6HD'
            },
            {
                name: 'Manchester Rugby Club (USE)',
                city: 'Stockport',
                postcode: 'SK8 7NB'
            },
            {
                name: 'Oldham Coliseum',
                city: 'Oldham',
                postcode: 'OL1 3SW'
            },
            {
                name: 'Lowry Youth Activity',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'zzz_Sabai Pavilion - Edinburgh',
                city: 'Edinburgh',
                postcode: null
            },
            {
                name: 'Lyric Theatre 1500',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'East Lancashire Railway (Dining 3 carriage)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Caledonian Railway (6 Carriages)',
                city: 'Scotland',
                postcode: 'DD9 7AF'
            },
            {
                name: 'Matt and Phred\'s',
                city: 'Manchester',
                postcode: 'M4 1LW'
            },
            {
                name: 'Bridport Arts Centre (Unreserved Seating)',
                city: 'Bridport',
                postcode: 'DT6 3NR'
            },
            {
                name: 'Bo’ness & Kinneil Railway, Bo’ness (GA)',
                city: 'Bo’ness',
                postcode: 'EH51 9AQ'
            },
            {
                name: 'The Festival Theatre at Hever Castle',
                city: 'Edenbridge',
                postcode: 'TN8 7NG'
            },
            {
                name: 'Festival Square',
                city: 'Manchester',
                postcode: 'M2 5DB'
            },
            {
                name: 'Lyric Theatre 400',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Lyric Theatre Stage Seating - General Admission',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Lowry Access Activity',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Bolton Octagon (Round)',
                city: 'Bolton',
                postcode: 'BL1 1SB'
            },
            {
                name: 'RNCM Theatre',
                city: 'Manchester',
                postcode: 'M13 9RD'
            },
            {
                name: 'International Anthony Burgess Foundation',
                city: 'Manchester',
                postcode: 'M1 5BY'
            },
            {
                name: 'Zippos Circus Phoenix (West Midlands)',
                city: 'National',
                postcode: null
            },
            {
                name: 'The Studio Big Top - Edinburgh',
                city: 'Edinburgh',
                postcode: 'EH3 9RX'
            },
            {
                name: 'Kirklees Light Railway (6 Carriages)',
                city: 'Huddersfield',
                postcode: 'HD8 9XJ'
            },
            {
                name: 'Mid Hants Railway (General Admission)',
                city: 'Ropley',
                postcode: 'SO24 9JG'
            },
            {
                name: 'The Sabai Pavilion - Brighton',
                city: 'Brighton',
                postcode: 'BN1 1UB'
            },
            {
                name: 'East Lancashire Railway (Dining 1 carriage 2018)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'General Admission 150',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Zippos Circus Horsepower (Scotland)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Circus Big Top - Edinburgh',
                city: 'Edinburgh',
                postcode: 'EH7 6AE'
            },
            {
                name: 'NEW Zippos Circus',
                city: 'National',
                postcode: null
            },
            {
                name: 'Oldham Coliseum Theatre @ Grange Arts Centre',
                city: 'Oldham',
                postcode: 'OL9 6EA'
            },
            {
                name: 'Waterside Arts Centre (Reserved)',
                city: 'Sale',
                postcode: 'M33 7ZF'
            },
            {
                name: 'Bridgewater Hall',
                city: 'Manchester',
                postcode: 'M2 3WS'
            },
            {
                name: 'Lowry Academy Youth Activity 100',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Lowry Story Telling Tent',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Manchester City Library, Becker Room',
                city: 'Manchester',
                postcode: 'M3 3WD'
            },
            {
                name: 'The Sabai Pavilion - Newcastle 2017',
                city: 'Newcastle-upon-Tyne',
                postcode: 'NE1 4EP'
            },
            {
                name: 'Zippos Circus Horsepower (South East)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Re-Tale',
                city: 'Manchester',
                postcode: 'OL1 3TP'
            },
            {
                name: 'The Sabai Pavilion - Bournemouth',
                city: 'Bournemouth',
                postcode: 'BH2 5AA'
            },
            {
                name: 'Northwich Memorial Court (reserved Seating)',
                city: 'Northwich',
                postcode: null
            },
            {
                name: 'Barnfield Theatre',
                city: 'Exeter',
                postcode: 'EX1 1SN'
            },
            {
                name: 'The Lowry Metrolink Travelcard',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'The Lass O\'Gowrie',
                city: 'Manchester',
                postcode: 'M1 7DB'
            },
            {
                name: 'RNCM Theatre with Pit Seats',
                city: 'Manchester',
                postcode: 'M13 9RD'
            },
            {
                name: 'The Sabai Pavilion - Aberdeen 2017',
                city: 'Aberdeen',
                postcode: 'AB24 5EN'
            },
            {
                name: 'Sabai Pavilion',
                city: 'National',
                postcode: null
            },
            {
                name: 'Ice Rink',
                city: 'Leeds',
                postcode: 'LS2 3AD'
            },
            {
                name: 'Museum of Museums',
                city: 'Manchester',
                postcode: 'M41 7TB'
            },
            {
                name: 'Gracie Fields Theatre',
                city: 'Rochdale',
                postcode: 'OL11 5EF'
            },
            {
                name: 'Chorlton Green',
                city: 'Manchester',
                postcode: 'M21 9HS'
            },
            {
                name: 'East Lancashire Railway (Dining 1 carr 48 seats )',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Lowry Academy Adult Theatre Activity 100',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'MIF Manchester Town Hall',
                city: 'Manchester',
                postcode: 'M60 2LA'
            },
            {
                name: 'Manchester Visitor Information Centre',
                city: 'Manchester',
                postcode: 'M1 4BT'
            },
            {
                name: 'Manchester Opera House',
                city: 'Manchester',
                postcode: 'M3 3HP'
            },
            {
                name: 'Theatre Big Top, Fountainbridge Site, (Venue 189)',
                city: 'Edinburgh',
                postcode: 'EH3 9RX'
            },
            {
                name: 'ZZZ - Event City',
                city: 'Manchester',
                postcode: 'M41 7TB'
            },
            {
                name: 'The Wainwright Club',
                city: 'Blackpool',
                postcode: 'FY1 4JA'
            },
            {
                name: 'The Forum Theatre, Romiley (299 Layout)',
                city: 'Stockport',
                postcode: 'SK6 4EA'
            },
            {
                name: 'The Sabai Pavilion - Newcastle',
                city: 'Newcastle-upon-Tyne',
                postcode: 'NE1 4EP'
            },
            {
                name: 'Kent & East Sussex Railway (General Admission)',
                city: 'Kent',
                postcode: 'TN30 6HE'
            },
            {
                name: 'Midland Hotel',
                city: 'Manchester',
                postcode: 'M60 2DS'
            },
            {
                name: 'The Sabai Pavilion - Belfast 2020',
                city: 'Belfast',
                postcode: 'BT1 3FG'
            },
            {
                name: 'MHC - Cosmo Rodewald Concert Hall (GA)',
                city: 'Manchester',
                postcode: 'M13 9PL'
            },
            {
                name: 'The Holbeck',
                city: 'Leeds',
                postcode: 'LS11 9QX'
            },
            {
                name: 'Gandeys Circus Big Top - Greatest Snowman',
                city: 'National',
                postcode: null
            },
            {
                name: 'Lowry Quays (In the Round)',
                city: 'The Lowry',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Wellington Country Park',
                city: 'Reading',
                postcode: 'RG7 1SP'
            },
            {
                name: 'East Anglian Railway Museum (General Admission)',
                city: 'Colchester',
                postcode: 'C06 2DS'
            },
            {
                name: 'Salon Perdu',
                city: 'Manchester',
                postcode: 'M2 4JW'
            },
            {
                name: 'Bolton Winter Wonderland Slide',
                city: 'Bolton',
                postcode: 'BL1 1SA'
            },
            {
                name: 'The Kings Arms, Salford',
                city: 'Salford',
                postcode: 'M3 6AN'
            },
            {
                name: 'ZZZ_Pavilion Theatre Reserved Seating',
                city: 'Manchester',
                postcode: 'M2 5PE'
            },
            {
                name: 'Bridport Arts Centre (Marlow Theatre)',
                city: 'Bridport',
                postcode: 'DT6 3NR'
            },
            {
                name: 'Opera House, Blackpool',
                city: 'Blackpool',
                postcode: 'FY1 1HL'
            },
            {
                name: 'Palace Theatre',
                city: 'Manchester',
                postcode: 'M1 6FT'
            },
            {
                name: 'Lowry Adult Theatre Activity',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Didcot Railway Centre (General Admission)',
                city: 'Didcot',
                postcode: 'OX11 7NJ'
            },
            {
                name: 'Outdoor Events 500',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'The Sabai Pavilion - Brighton 2017 1',
                city: 'Brighton',
                postcode: 'BN1 1UB'
            },
            {
                name: 'Bolton Octagon (Thrust)',
                city: 'Bolton',
                postcode: 'BL1 1SB'
            },
            {
                name: 'The Sabai Pavilion - Edinburgh 2017',
                city: 'Edinburgh',
                postcode: null
            },
            {
                name: 'Lowry Studio (Cabaret)',
                city: 'The Lowry',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Central Library',
                city: 'Manchester',
                postcode: 'M2 5PD'
            },
            {
                name: 'The Electric Palace',
                city: 'Bridport',
                postcode: 'DT6 3NY'
            },
            {
                name: 'Ellesmere Port Civic Hall',
                city: 'Ellesmere Port',
                postcode: 'CH65 0BE'
            },
            {
                name: 'Contact',
                city: 'Manchester',
                postcode: 'M15 6JA'
            },
            {
                name: 'Avon Valley Railway, Dining (4 seats)',
                city: 'Bristol',
                postcode: 'BS30 6HD'
            },
            {
                name: 'Campfield Market Hall - Seated',
                city: 'Manchester',
                postcode: 'M3 4FH'
            },
            {
                name: 'The Grange Theatre',
                city: 'Northwich',
                postcode: 'CW8 1LU'
            },
            {
                name: 'Blackwell\'s Bookshop',
                city: 'Manchester',
                postcode: 'M13 9GP'
            },
            {
                name: 'Ocean Terminal Big Top (WAR)',
                city: 'Edinburgh',
                postcode: 'EH6 6JJ'
            },
            {
                name: 'NEW Zippos Circus (West Midlands)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Zippos Circus (Scotland)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Murrays\' Mills',
                city: 'Manchester',
                postcode: 'M4 6JG'
            },
            {
                name: 'Royal Exchange Foyer',
                city: 'Manchester',
                postcode: 'M2 7DH'
            },
            {
                name: 'Cinnamon Club - Ballroom',
                city: 'Altrincham',
                postcode: 'WA14 2TQ'
            },
            {
                name: 'The Sabai Pavilion - Brighton 2020',
                city: 'Brighton',
                postcode: 'BN1 2GR'
            },
            {
                name: 'Ocean Terminal Big Top (EICF)',
                city: 'Edinburgh',
                postcode: 'EH6 6JJ'
            },
            {
                name: 'Chorlton Irish Club',
                city: 'Manchester',
                postcode: 'M21 9DJ'
            },
            {
                name: 'Bristol Festivals Unreserved',
                city: 'Bristol',
                postcode: null
            },
            {
                name: 'The Ruby Lounge',
                city: 'Manchester',
                postcode: 'M4 1QB'
            },
            {
                name: 'Band on the Wall (Seating)',
                city: 'Manchester',
                postcode: 'M4 5JZ'
            },
            {
                name: 'Learning Space - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'LA22 9SH'
            },
            {
                name: 'Castlefield Hotel',
                city: 'Manchester',
                postcode: 'M3 4JR'
            },
            {
                name: 'Avon Valley Railway, Dining (3 seats)',
                city: 'Bristol',
                postcode: 'BS30 6HD'
            },
            {
                name: 'New Century Hall - Seated',
                city: 'Manchester',
                postcode: 'M60 4ES'
            },
            {
                name: 'Zippos Circus Phoenix (North West)',
                city: 'National',
                postcode: null
            },
            {
                name: 'North Norfolk Railway (General Admission)',
                city: 'Norfolk',
                postcode: 'NR26 8RA'
            },
            {
                name: 'Great Northern Playhouse',
                city: 'Manchester',
                postcode: 'M3 4EN'
            },
            {
                name: 'Cinnamon Club - Club',
                city: 'Altrincham',
                postcode: 'WA14 2TQ'
            },
            {
                name: 'Mitchell Arts Centre',
                city: 'Stoke-on-Trent',
                postcode: 'ST1 4HG'
            },
            {
                name: 'The Sabai Pavilion - Cardiff 2017',
                city: 'Cardiff',
                postcode: 'CF10 5AN'
            },
            {
                name: 'Mustard Tree, Ancoats',
                city: 'Manchester',
                postcode: 'M4 6AG'
            },
            {
                name: 'Stockport Plaza (Café)',
                city: 'Stockport',
                postcode: 'SK1 1SP'
            },
            {
                name: 'Circus Big Top',
                city: 'Belfast',
                postcode: 'BT1 3FG'
            },
            {
                name: 'Gallery Oldham',
                city: 'Oldham',
                postcode: 'OL1 1AL'
            },
            {
                name: 'Pond Square, Highgate',
                city: 'London',
                postcode: 'N6 6BA'
            },
            {
                name: 'MHC - John Thaw Studio Theatre',
                city: 'Manchester',
                postcode: 'M13 9PL'
            },
            {
                name: 'AXM Manchester',
                city: 'Manchester',
                postcode: 'M1 3LY'
            },
            {
                name: 'Egremont Library - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'CA22 2DQ'
            },
            {
                name: 'The Studio Big Top (TSB)',
                city: 'Brighton and Hove',
                postcode: 'BN1 1UG'
            },
            {
                name: 'The Sabai Pavilion - Derby',
                city: 'Derby',
                postcode: 'DE1 3AH'
            },
            {
                name: 'Buckinghamshire Railway Centre',
                city: 'Aylesbury',
                postcode: 'HP22 4BY'
            },
            {
                name: 'ZZZ MJM',
                city: 'Manchester',
                postcode: 'M8 8LW'
            },
            {
                name: 'The Sabai Pavilion - Aberdeen',
                city: 'Aberdeen',
                postcode: 'AB24 5EN'
            },
            {
                name: 'Kirkgate Centre',
                city: 'Cockermouth',
                postcode: 'CA13 9PJ'
            },
            {
                name: 'Friends Meeting House',
                city: 'Manchester',
                postcode: 'M2 5NS'
            },
            {
                name: 'St Andrew Square Garden',
                city: 'Edinburgh',
                postcode: 'EH2 1AF'
            },
            {
                name: 'ZZZ_ELR (Santa 9)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Southport Jazz Festival',
                city: 'Merseyside',
                postcode: 'PR8 1RB'
            },
            {
                name: 'The Sabai Pavilion - Leeds',
                city: 'Leeds',
                postcode: 'LS2 3AD'
            },
            {
                name: 'John Rylands Library',
                city: 'Manchester',
                postcode: 'M3 3EH'
            },
            {
                name: 'St. Ann\'s Church (MJF)',
                city: 'Manchester',
                postcode: 'M2 7LF'
            },
            {
                name: 'Lowry General Admission -  Compass Room',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Charter Theatre - Preston Guild Hall',
                city: 'Preston',
                postcode: null
            },
            {
                name: 'Llangollen Railway (General Admission)',
                city: 'Llangollen',
                postcode: 'LL20 8SN'
            },
            {
                name: 'Axis Arts Centre',
                city: 'MMU Campus, Crewe CW1 5DU',
                postcode: 'CW1 5DU'
            },
            {
                name: 'MHC - Whitworth Hall',
                city: 'Manchester',
                postcode: 'M13 9PP'
            },
            {
                name: 'Manchester Art Gallery',
                city: 'Manchester',
                postcode: 'M2 3JL'
            },
            {
                name: 'Manchester Cathedral',
                city: 'Manchester',
                postcode: 'M3 1SX'
            },
            {
                name: 'Dukinfield Town Hall',
                city: 'Dukinfield',
                postcode: 'SK16 4LA'
            },
            {
                name: 'The Deaf Institute',
                city: 'Manchester',
                postcode: 'M1 7HE'
            },
            {
                name: 'Victoria Station',
                city: 'Manchester',
                postcode: 'M3 1PB'
            },
            {
                name: 'Independent',
                city: 'Sunderland',
                postcode: 'SR1 3HY'
            },
            {
                name: 'The Playhouse Theatre',
                city: 'Preston',
                postcode: 'PR1 2HB'
            },
            {
                name: 'Pavilion Theatre - Unreserved',
                city: 'Manchester',
                postcode: 'M2 5DB'
            },
            {
                name: 'The Forum Theatre, Romiley (Normal)',
                city: 'Stockport',
                postcode: 'SK6 4EA'
            },
            {
                name: 'Stockport Garrick Studio',
                city: 'Stockport',
                postcode: 'SK3 0EJ'
            },
            {
                name: 'MIF TEST 2015 GA',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'East Lancashire Railway (8 Carriages - horizontal)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Chaplins Circus',
                city: 'National',
                postcode: null
            },
            {
                name: 'Victoria Square - Festival Marquee (Tables v2)',
                city: 'Bolton',
                postcode: 'BL1 1RZ'
            },
            {
                name: 'zzz_The Sabai Pavilion - Aberdeen',
                city: 'Aberdeen',
                postcode: 'AB24 5EN'
            },
            {
                name: 'Gorilla',
                city: 'Manchester',
                postcode: 'M1 5WW'
            },
            {
                name: 'Manchester Town Hall, Banqueting Room',
                city: 'Manchester',
                postcode: 'M60 2LA'
            },
            {
                name: 'Centenary Building',
                city: 'Salford',
                postcode: 'M3 6EQ'
            },
            {
                name: 'Lowry Lunchbox',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'zzTheatre Big Top, Fountainbridge, (Venue 189)',
                city: 'Edinburgh',
                postcode: 'EH3 9RX'
            },
            {
                name: 'Bo’ness & Kinneil Railway, Bo’ness (7 carriage)',
                city: 'Bo’ness',
                postcode: 'EH51 9AQ'
            },
            {
                name: 'The Shakespeare Inn',
                city: 'Manchester',
                postcode: 'M2 2AA'
            },
            {
                name: 'Lowry Academy Adult Gallery Activity 200',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'South Devon Railway (General Admission)',
                city: 'Devon',
                postcode: 'TQ11 0DZ'
            },
            {
                name: 'Zippos Circus Horsepower (North West)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Waterside Arts Centre (General Admission)',
                city: 'Sale',
                postcode: 'M33 7ZF'
            },
            {
                name: 'The Sabai Pavilion - Dundee',
                city: 'Dundee',
                postcode: 'DD4 6NL'
            },
            {
                name: 'Bridport Arts Centre (Unreserved Standing)',
                city: 'Bridport',
                postcode: 'DT6 3NR'
            },
            {
                name: 'Mayfield Manchester - Arches',
                city: 'Manchester',
                postcode: 'M12 6HR'
            },
            {
                name: 'Cinema Truck',
                city: 'Salford',
                postcode: 'M50 3AZ'
            },
            {
                name: 'East Lancashire Railway (4 Carriages)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Chetham\'s School of Music',
                city: 'Manchester',
                postcode: 'M3 1SB'
            },
            {
                name: 'Sabai Pavilion (small) - Edinburgh',
                city: 'Edinburgh',
                postcode: null
            },
            {
                name: 'The Rose Club',
                city: 'Wigan',
                postcode: 'WN2 3EU'
            },
            {
                name: 'Sub 101',
                city: 'Manchester',
                postcode: 'M1 6DD'
            },
            {
                name: 'Joshua Brooks',
                city: 'Manchester',
                postcode: 'M1 6NG'
            },
            {
                name: '53two',
                city: 'Manchester',
                postcode: 'M1 5LN'
            },
            {
                name: 'The Edge',
                city: 'Wigan',
                postcode: 'WN3 5AB'
            },
            {
                name: 'MIF City Centre Venue A',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'The Sabai Pavilion - Nottingham 2020',
                city: 'Nottingham',
                postcode: 'NG1 2DT'
            },
            {
                name: 'Lowry Adult Gallery Activity',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Avon Valley Railway (AB Full, C Partial)',
                city: 'Bristol',
                postcode: 'BS30 6HD'
            },
            {
                name: 'Lyric Theatre 200',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Albion Church',
                city: 'Ashton-under-Lyne',
                postcode: 'OL6 6QQ'
            },
            {
                name: 'St. Ann\'s Church',
                city: 'Manchester',
                postcode: 'M2 7LF'
            },
            {
                name: 'Manchester Jewish Museum (General Admission)',
                city: 'Manchester',
                postcode: 'M8 8LW'
            },
            {
                name: 'The Sabai Pavilion - Dundee 2017',
                city: 'Dundee',
                postcode: 'DD4 6NL'
            },
            {
                name: 'George Lawton Hall',
                city: 'Oldham',
                postcode: 'OL5 0HR'
            },
            {
                name: 'Mayfield - Standing',
                city: 'Manchester',
                postcode: 'M1 2PZ'
            },
            {
                name: 'NEW Zippos Circus (North East)',
                city: 'North East',
                postcode: null
            },
            {
                name: 'Zippos Circus Phoenix (Scotland)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Lowry Quays (Thrust)',
                city: 'The Lowry',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Circus Big Top - Glasgow',
                city: 'Glasgow',
                postcode: 'G51 4BN'
            },
            {
                name: 'The Sabai Pavilion - Manchester',
                city: 'Manchester',
                postcode: 'M40 8AD'
            },
            {
                name: 'Albert Hall - Standing',
                city: 'Manchester',
                postcode: 'M2 5RQ'
            },
            {
                name: 'Albert Memorial',
                city: 'Manchester',
                postcode: 'M2 5DB'
            },
            {
                name: 'Campfield Market Hall - Standing',
                city: 'Manchester',
                postcode: 'M3 4FH'
            },
            {
                name: 'Taurus Bar',
                city: 'Manchester',
                postcode: 'M1 3HE'
            },
            {
                name: 'Thwaites Festival Pavilion',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'MHC - Cosmo Rodewald Concert Hall',
                city: 'Manchester',
                postcode: 'M13 9PL'
            },
            {
                name: 'MIF City Centre Venue B',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'General Admission 300',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Zippos Circus Horsepower (Wales)',
                city: 'National',
                postcode: null
            },
            {
                name: 'The Sabai Pavilion - Cardiff',
                city: 'Cardiff',
                postcode: 'CF10 5AN'
            },
            {
                name: 'Zippos Circus (West Midlands)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Irwell House',
                city: 'Salford',
                postcode: 'M3 7LE'
            },
            {
                name: 'Worsley Park Marriott Hotel & Country Club (WOR)',
                city: 'Manchester',
                postcode: 'M28 2QT'
            },
            {
                name: 'Victoria Square - Festival Marquee (Tables)',
                city: 'Bolton',
                postcode: 'BL1 1RZ'
            },
            {
                name: 'The Tunnel',
                city: 'Manchester',
                postcode: 'M3 4LQ'
            },
            {
                name: 'Cruz 101',
                city: 'Manchester',
                postcode: 'M1 6DD'
            },
            {
                name: 'Festival Circus (Midlands)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Bolton Winter Wonderland Wheel',
                city: 'Bolton',
                postcode: 'BL1 1SA'
            },
            {
                name: 'The Sabai Pavilion - Glasgow',
                city: 'Glasgow',
                postcode: 'G3 8RS'
            },
            {
                name: 'Lancaster Suite, Bolton Albert Halls',
                city: 'Bolton',
                postcode: 'BL1 1RU'
            },
            {
                name: 'Oldham Coliseum Theatre @ Alexandra Park',
                city: 'Oldham',
                postcode: 'OL8 2BN'
            },
            {
                name: 'The Gay Village',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Jersey Opera House',
                city: 'Jersey',
                postcode: 'JE2 3QR'
            },
            {
                name: 'East Lancashire Railway (Metrolink Add Ons)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Syon Park',
                city: 'Brentford',
                postcode: 'TW7 6AZ'
            },
            {
                name: 'The Sabai Pavilion - Aberdeen 2020',
                city: 'Aberdeen',
                postcode: 'AB24 5EN'
            },
            {
                name: 'The Meadows, Edinburgh',
                city: 'Edinburgh',
                postcode: null
            },
            {
                name: 'War Memorial, St. Ann\'s Square',
                city: 'Manchester',
                postcode: 'M2 7EF'
            },
            {
                name: 'National Cycling Centre (2012) GA',
                city: 'Manchester',
                postcode: 'M11 4DQ'
            },
            {
                name: 'Portico Library',
                city: 'Manchester',
                postcode: 'M2 3FF'
            },
            {
                name: 'Music Boxes',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Lancaster Castle',
                city: 'Lancaster',
                postcode: 'LA1 1YJ'
            },
            {
                name: 'The Sabai Pavilion - Manchester 2017',
                city: 'Manchester',
                postcode: 'M15 4NP'
            },
            {
                name: 'Curve, Leicester',
                city: 'Leicester',
                postcode: 'LE1 1SB'
            },
            {
                name: 'Milton Country Park, Cambridge',
                city: 'Cambridge',
                postcode: 'CB24 6AZ'
            },
            {
                name: 'Jerwood Centre - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'LA22 9SH'
            },
            {
                name: 'Warwick Castle',
                city: 'Warwick',
                postcode: 'CV34 4QU'
            },
            {
                name: 'Geoffrey Manton Building, MMU',
                city: 'Manchester',
                postcode: 'M15 6LL'
            },
            {
                name: 'The Sabai Pavilion - Derby 2020',
                city: 'Derby',
                postcode: 'DE1 3AH'
            },
            {
                name: 'Prince\'s Park',
                city: 'Manchester',
                postcode: 'M44 6BR'
            },
            {
                name: 'Yard Theatre, Hulme',
                city: 'Manchester',
                postcode: 'M15 5RF'
            },
            {
                name: 'RNCM Concert Hall Unreserved',
                city: 'Manchester',
                postcode: 'M13 9RD'
            },
            {
                name: 'Manchester Central Mosque',
                city: 'Manchester',
                postcode: 'M14 5RU'
            },
            {
                name: 'Barton Arcade, Deansgate',
                city: 'Manchester',
                postcode: 'M3 2BW'
            },
            {
                name: 'The Sabai Pavilion - Newcastle Under Lyme 2020',
                city: 'Ryecroft',
                postcode: 'ST5 2AF'
            },
            {
                name: 'Beaumaris Leisure Centre (Unreserved)',
                city: 'Beaumaris',
                postcode: 'LL58 8AL'
            },
            {
                name: 'AMEX Stadium',
                city: 'Brighton and Hove',
                postcode: 'BN1 9BL'
            },
            {
                name: 'Avon Valley Railway (Paddington Layout)',
                city: 'Bristol',
                postcode: 'BS30 6HD'
            },
            {
                name: 'Anfield',
                city: 'Liverpool',
                postcode: 'L4 0TH'
            },
            {
                name: 'Circus of the Orient - Edinburgh',
                city: 'Edinburgh',
                postcode: null
            },
            {
                name: 'Sabai Pavilion (COTB)',
                city: 'National',
                postcode: null
            },
            {
                name: 'ZZZ_ELR (Santa 6 US)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Manchester Museum',
                city: 'Manchester',
                postcode: 'M13 9PL'
            },
            {
                name: 'Sabai Pavilion - Edinburgh',
                city: 'Edinburgh',
                postcode: null
            },
            {
                name: 'Skipton Town Hall',
                city: 'Skipton',
                postcode: 'BD23 1AH'
            },
            {
                name: 'Adsett Farm',
                city: 'Westbury',
                postcode: 'GL14 1PQ'
            },
            {
                name: 'O2 Ritz',
                city: 'Manchester',
                postcode: 'M1 5NQ'
            },
            {
                name: 'People\'s History Museum',
                city: 'Manchester',
                postcode: 'M3 3ER'
            },
            {
                name: 'The Sabai Pavilion - Glasgow 2019',
                city: 'Glasgow',
                postcode: 'G3 8RS'
            },
            {
                name: 'The Paragon Theatre',
                city: 'Manchester',
                postcode: 'M25 1JZ'
            },
            {
                name: 'Arboria Luminarium',
                city: 'Salford',
                postcode: 'M50 2EQ'
            },
            {
                name: 'ZZZ_The Grange Theatre',
                city: 'North West',
                postcode: 'CW8 1LU'
            },
            {
                name: 'Theatre Big Top',
                city: 'Trafford',
                postcode: 'M17 8AA'
            },
            {
                name: 'New Century Hall - Standing',
                city: 'Manchester',
                postcode: 'M60 4ES'
            },
            {
                name: 'Temple Newsam',
                city: 'Leeds',
                postcode: 'LS15 0AE'
            },
            {
                name: 'MHC - Manchester Grammar School',
                city: 'Manchester',
                postcode: 'M13 0XT'
            },
            {
                name: 'Salford Sports Village',
                city: 'Salford',
                postcode: 'M7 3NQ'
            },
            {
                name: 'Outside St. Ann\'s Church',
                city: 'Manchester',
                postcode: 'M2 7LF'
            },
            {
                name: 'MIF Macbeth',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Stage 1, Old Granada Studios - General Admission',
                city: 'Manchester',
                postcode: 'M3 4FP'
            },
            {
                name: 'Maxwell Hall, The University of Salford',
                city: 'Salford',
                postcode: 'M5 4WT'
            },
            {
                name: 'Museum of Science and Industry',
                city: 'Manchester',
                postcode: 'M3 4FP'
            },
            {
                name: 'The Edge (formally The Pier Centre)',
                city: 'Wigan',
                postcode: 'WN3 5AB'
            },
            {
                name: 'The Sabai Pavilion - Bristol 2018',
                city: 'Bristol',
                postcode: 'BS8 2XU'
            },
            {
                name: 'Circus Big Top - Leeds',
                city: 'Leeds',
                postcode: 'LS17 9LG'
            },
            {
                name: 'The Edge Theatre and Arts Centre',
                city: 'Manchester',
                postcode: 'M21 9JG'
            },
            {
                name: 'Sabai Pavilion - La Bordello Boheme',
                city: 'National',
                postcode: null
            },
            {
                name: 'The Sabai Pavilion - Bristol 2020',
                city: 'Bristol',
                postcode: 'BS1 3XE'
            },
            {
                name: 'Circus Big Top - Birkenhead',
                city: 'Birkenhead',
                postcode: 'CH41 8AU'
            },
            {
                name: 'Radcliffe Civic Suite',
                city: 'Manchester',
                postcode: 'M26 2UH'
            },
            {
                name: 'The Forum Theatre, Romiley - Unreserved Cabaret',
                city: 'Stockport',
                postcode: 'SK6 4EA'
            },
            {
                name: 'Celebration Hall, Robin Park Sports Centre',
                city: 'Wigan',
                postcode: 'WN5 0UL'
            },
            {
                name: 'National Football Museum',
                city: 'Manchester',
                postcode: 'M4 3BG'
            },
            {
                name: 'Rydal Mount - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'LA22 9SH'
            },
            {
                name: 'NQ Jazz at The Whiskey Jar',
                city: 'Manchester',
                postcode: 'M1 2FF'
            },
            {
                name: 'Lowry Training (GA - 50 capacity)',
                city: 'Salford',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Zippos Circus Phoenix (Yorkshire)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Instituto Cervantes',
                city: 'Manchester',
                postcode: 'M3 4FN'
            },
            {
                name: 'Royal Exchange Studio',
                city: 'Manchester',
                postcode: 'M2 7DH'
            },
            {
                name: 'Vaudeville Theatre',
                city: 'London',
                postcode: 'WC2R 0NH'
            },
            {
                name: 'RNCM Concert Hall',
                city: 'Manchester',
                postcode: 'M13 9RD'
            },
            {
                name: 'Gandeys Circus Big Top - Dudley',
                city: 'National',
                postcode: null
            },
            {
                name: 'Culterham Hall - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'CA15 6QT'
            },
            {
                name: 'Lowry Development',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Cafe - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'LA22 9SH'
            },
            {
                name: 'Zippos Circus (Yorkshire)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Mayfield',
                city: 'Manchester',
                postcode: 'M1 2PZ'
            },
            {
                name: 'Lowri Beck Celebration Hall',
                city: 'Wigan',
                postcode: 'WN5 0UL'
            },
            {
                name: 'Droylsden Concord Suite',
                city: 'Droylsden',
                postcode: 'M43 6SF'
            },
            {
                name: 'Bolton Library Theatre 2020',
                city: 'Bolton',
                postcode: null
            },
            {
                name: 'Manchester Jewish Museum (Reserved revised)',
                city: 'Manchester',
                postcode: 'M8 8LW'
            },
            {
                name: 'Imperial War Museum North',
                city: 'Manchester',
                postcode: 'M17 1TZ'
            },
            {
                name: 'Milk and Honey Cafe',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Abbots Ripton Hall',
                city: 'Huntingdon',
                postcode: 'PE28 2PQ'
            },
            {
                name: 'Ambleside Library - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'LA12 0BT'
            },
            {
                name: 'NCP Bridgewater Hall Car Park',
                city: 'Manchester',
                postcode: 'M15 4PS'
            },
            {
                name: 'Satan\'s Hollow',
                city: 'Manchester',
                postcode: 'M1 6DD'
            },
            {
                name: 'Gurdwara Sri Guru Harkrishan Sahib Ji',
                city: 'Manchester',
                postcode: 'M3 1FE'
            },
            {
                name: 'The Sabai Pavilion - Leeds 2017',
                city: 'Leeds',
                postcode: 'LS2 3AD'
            },
            {
                name: 'The Shakespeare',
                city: 'Sheffield',
                postcode: 'S3 8UB'
            },
            {
                name: 'The Hippodrome Casino (THC)',
                city: 'London',
                postcode: 'WC2H 7JH'
            },
            {
                name: 'Lancaster Grand Theatre',
                city: 'Lancaster',
                postcode: 'LA1 1NL'
            },
            {
                name: 'Fab Café',
                city: 'Manchester',
                postcode: 'M1 6DN'
            },
            {
                name: 'Slung Low\'s HUB - 250 Capacity',
                city: 'Leeds',
                postcode: 'LS11 9QX'
            },
            {
                name: 'Stockport Garrick Theatre (Stage Seating)',
                city: 'Stockport',
                postcode: 'SK3 0EJ'
            },
            {
                name: 'Longsight Library and Learning Centre',
                city: 'Manchester',
                postcode: 'M60 2DS'
            },
            {
                name: '1830 Warehouse, Museum of Science & Industry',
                city: 'Manchester',
                postcode: 'M3 4PU'
            },
            {
                name: 'Pavilion Theatre - Seated',
                city: 'Manchester',
                postcode: 'M2 5PE'
            },
            {
                name: 'University Place',
                city: 'Manchester',
                postcode: 'M13 9PL'
            },
            {
                name: 'The Sabai Pavilion - Liverpool 2020',
                city: 'Liverpool',
                postcode: 'L3 1DP'
            },
            {
                name: 'The Bowdon Rooms (General Admission)',
                city: 'Altrincham',
                postcode: 'WA14 2TQ'
            },
            {
                name: 'RNCM Concert Hall - with Balcony',
                city: 'Manchester',
                postcode: 'M13 9RD'
            },
            {
                name: 'National Cycling Centre',
                city: 'Manchester',
                postcode: 'M11 4DQ'
            },
            {
                name: 'NEW Zippos Circus (Yorkshire)',
                city: 'Yorkshire',
                postcode: null
            },
            {
                name: 'Holy Trinity Church',
                city: 'Skipton',
                postcode: 'BD23 1NJ'
            },
            {
                name: 'Albert Hall - Seated',
                city: 'Manchester',
                postcode: 'M2 5RQ'
            },
            {
                name: 'Chorlton Library',
                city: 'Manchester',
                postcode: 'M21 9PN'
            },
            {
                name: 'Dove Cottage - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'LA22 9SH'
            },
            {
                name: 'East Lancashire Railway (10 Carriage)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Clissold Park',
                city: 'London',
                postcode: 'N16 9HJ'
            },
            {
                name: 'Event City - Circus',
                city: 'Manchester',
                postcode: 'M41 7TB'
            },
            {
                name: 'AK Test 2015',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Centenary Building,',
                city: 'Manchester',
                postcode: 'M3 6EQ'
            },
            {
                name: 'The Whitworth',
                city: 'Manchester',
                postcode: 'M15 6ER'
            },
            {
                name: 'Albert Square',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Z-Arts',
                city: 'Manchester',
                postcode: 'M15 5ZA'
            },
            {
                name: 'Blackpool Football Club',
                city: 'Blackpool',
                postcode: 'FY1 6JJ'
            },
            {
                name: 'Waterside Arts Centre (Standing)',
                city: 'Sale',
                postcode: 'M33 7ZF'
            },
            {
                name: 'Albert Hall - Unreserved',
                city: 'Manchester',
                postcode: 'M2 5QR'
            },
            {
                name: 'Ashton-under-Lyne Metrolink',
                city: 'Oldham',
                postcode: 'OL6 6DL'
            },
            {
                name: 'Eastleigh Lakeside Steam Railway (GA)',
                city: 'Eastleigh',
                postcode: 'SO50 5PE'
            },
            {
                name: 'Corn Exchange - Atrium',
                city: 'Manchester',
                postcode: 'M4 3TR'
            },
            {
                name: 'Z - The Sabai Pavilion - Brighton - GA',
                city: 'Brighton and Hove',
                postcode: 'BN1 1UG'
            },
            {
                name: 'Lowry Plaza',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Piccadilly Gardens',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'The Holy Name Church',
                city: 'Manchester',
                postcode: 'M13 9PG'
            },
            {
                name: 'Bo’ness & Kinneil Railway, Bo’ness (8 Carriages)',
                city: 'Bo’ness',
                postcode: 'EH51 9AQ'
            },
            {
                name: 'Bolton Albert Halls Theatre - Balcony/Unres Stand',
                city: 'Bolton',
                postcode: 'BL1 1RU'
            },
            {
                name: 'STUN Studio',
                city: 'Manchester',
                postcode: 'M15 5ZA'
            },
            {
                name: 'Spa Valley Railway (6 Carriages)',
                city: 'Tunbridge Wells',
                postcode: 'TN2 5QY'
            },
            {
                name: 'Gandeys General Admission 7.99 Events',
                city: 'National',
                postcode: null
            },
            {
                name: 'Sabai Pavilion Brighton',
                city: 'Brighton and Hove',
                postcode: 'BN1 1UG'
            },
            {
                name: 'Manchester Academy',
                city: 'Manchester',
                postcode: 'M13 9PR'
            },
            {
                name: 'Shrewsbury School',
                city: 'Shrewsbury',
                postcode: 'SY3 7AP'
            },
            {
                name: 'Victoria Square - Festival Marquee (GA)',
                city: 'Bolton',
                postcode: 'BL1 1RZ'
            },
            {
                name: 'Bolton Central Library Lecture Theatre - GA',
                city: 'Bolton',
                postcode: 'BL1 1SE'
            },
            {
                name: 'Lowry Lottery',
                city: 'The Lowry',
                postcode: null
            },
            {
                name: 'Bolton Castle',
                city: 'Leyburn',
                postcode: 'DL8 4ET'
            },
            {
                name: 'Martin Harris Centre',
                city: 'Manchester',
                postcode: 'M13 9PL'
            },
            {
                name: 'ZZZ_ELR (Santa 6)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Preston Guild Hall - Charter Theatre',
                city: 'Preston',
                postcode: 'PR1 1HT'
            },
            {
                name: 'Houghton Mill',
                city: 'Cambridgeshire',
                postcode: 'PE28 2AZ'
            },
            {
                name: 'Bolton Albert Halls - In The Round',
                city: 'Bolton',
                postcode: 'BL1 1RU'
            },
            {
                name: 'The Sabai Pavilion - Dundee 2020',
                city: 'Dundee',
                postcode: 'DD4 6NL'
            },
            {
                name: 'Marine Hall',
                city: 'Blackpool',
                postcode: 'FY7 6HF'
            },
            {
                name: 'Day Out With Thomas - Ravenglass & Eskdale',
                city: 'Cumbria',
                postcode: null
            },
            {
                name: 'greenroom',
                city: 'Manchester',
                postcode: 'M1 5WW'
            },
            {
                name: 'Kent & East Sussex Railway (4 Carriages)',
                city: 'Kent',
                postcode: 'TN30 6HE'
            },
            {
                name: 'Keats House, Hampstead',
                city: 'London',
                postcode: 'NW3 2RR'
            },
            {
                name: 'Buckinghamshire Railway Centre (General Admission)',
                city: 'Aylesbury',
                postcode: 'HP22 4BY'
            },
            {
                name: 'Three Minute Theatre',
                city: 'Manchester',
                postcode: 'M1 1JG'
            },
            {
                name: 'Abode Hotel',
                city: 'Manchester',
                postcode: 'M1 2DB'
            },
            {
                name: 'ZZZ_Jodrell Bank',
                city: 'Macclesfield',
                postcode: 'SK11 9DW'
            },
            {
                name: 'Manchester Town Hall (Unreserved Seating)',
                city: 'Manchester',
                postcode: 'M60 2LA'
            },
            {
                name: 'The Sabai Pavilion - Belfast',
                city: 'Belfast',
                postcode: 'BT1 3FG'
            },
            {
                name: 'Delamere Forest',
                city: 'Northwich',
                postcode: 'CW8 2JD'
            },
            {
                name: 'Zippos Circus Horsepower (West Midlands)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Hyde Festival Theatre',
                city: 'Hyde',
                postcode: 'SK14 1AB'
            },
            {
                name: 'The Monastery Manchester',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Ashton Town Hall',
                city: 'Ashton-under-Lyne',
                postcode: 'OL6 6DL'
            },
            {
                name: 'Trafford Ticketing Demo',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'TAKE A SEAT - Lyric',
                city: 'Salford',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Midland Hotel (Seated)',
                city: 'Manchester',
                postcode: 'M60 2DS'
            },
            {
                name: 'Malmaison, Piccadilly',
                city: 'Manchester',
                postcode: 'M1 1LZ'
            },
            {
                name: 'New Testament Church of God',
                city: 'Manchester',
                postcode: 'M16 7RN'
            },
            {
                name: 'Bury Town Hall (unreserved)',
                city: 'Bury',
                postcode: 'BL9 0SW'
            },
            {
                name: 'MIF13 Test Venue',
                city: null,
                postcode: 'M1 5DZ'
            },
            {
                name: 'St. Mary\'s Church, Banbury',
                city: 'Banbury',
                postcode: 'OX16 0AA'
            },
            {
                name: 'Lytham Green',
                city: 'Lytham St Annes',
                postcode: 'FY8 5LD'
            },
            {
                name: 'The Flare HUB',
                city: 'Manchester',
                postcode: 'M1 5NH'
            },
            {
                name: 'Dean Forest Railway (General Admission)',
                city: 'Gloucester',
                postcode: 'GL15 4ET'
            },
            {
                name: 'The Frog and Bucket Comedy Club',
                city: 'Manchester',
                postcode: 'M4 1LJ'
            },
            {
                name: 'Harvey Nichols, Manchester',
                city: 'Manchester',
                postcode: 'M1 1AD'
            },
            {
                name: 'Peter Barkworth Theatre',
                city: 'Stockport',
                postcode: 'SK1 3UQ'
            },
            {
                name: 'Teacup',
                city: 'Manchester',
                postcode: 'M4 1NA'
            },
            {
                name: 'East Lancashire Railway (Day Out With Thomas)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Gates Of Hell - The Entrance To The Old Parsonage',
                city: 'Manchester',
                postcode: 'M20 2RN'
            },
            {
                name: 'Beach Ballroom',
                city: 'Scotland',
                postcode: 'AB24 5NR'
            },
            {
                name: 'Zippos Circus (North East)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Starlight Suite, Beachcomber Holiday Resort',
                city: 'Cleethorpes',
                postcode: 'DN36 4ET.'
            },
            {
                name: 'Wyvern Suite, Midland Hotel',
                city: 'Manchester',
                postcode: 'M60 2DS'
            },
            {
                name: 'Low Four, Old Granada Studios',
                city: 'Manchester',
                postcode: 'M3 4PR'
            },
            {
                name: 'Britannia Hotel',
                city: 'Manchester',
                postcode: 'M1 3LA'
            },
            {
                name: 'Orford Jubilee Park',
                city: 'Warrington',
                postcode: 'WA2 8HU'
            },
            {
                name: 'Albert Hall - General Admission',
                city: 'Manchester',
                postcode: 'M2 5QR'
            },
            {
                name: 'Hawkey Hall',
                city: 'Woodford Green',
                postcode: 'IG8 0BG'
            },
            {
                name: 'Test Venue',
                city: 'Manchester',
                postcode: 'TE1 5TZ'
            },
            {
                name: 'Pride - Dancehouse',
                city: 'Manchester',
                postcode: 'M1 5QA'
            },
            {
                name: 'Albert Dock, Liverpool',
                city: 'Liverpool',
                postcode: 'L3 4AD'
            },
            {
                name: '2022nq General Admission',
                city: 'Manchester',
                postcode: 'M1 1EZ'
            },
            {
                name: 'St John\'s Church',
                city: 'Manchester',
                postcode: 'M16 7GX'
            },
            {
                name: 'St. George\'s Church',
                city: 'London',
                postcode: 'W15 1FX'
            },
            {
                name: 'East Lancashire Railway (DOWT 2019)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Library Theatre, Sheffield',
                city: 'Sheffield',
                postcode: 'S1 1XZ'
            },
            {
                name: 'Cornerhouse',
                city: 'Manchester',
                postcode: 'M1 5NH'
            },
            {
                name: 'The Bread Shed',
                city: 'Manchester',
                postcode: 'M1 7HL'
            },
            {
                name: 'Concorde Conference Centre',
                city: 'Altrincham',
                postcode: 'WA15 8XQ'
            },
            {
                name: 'Little Bentley Hall',
                city: 'Colchester',
                postcode: 'CO7 8SE'
            },
            {
                name: 'Kedlestone Park',
                city: 'Derby',
                postcode: 'DE22 5JQ'
            },
            {
                name: 'National Cycling Centre (2011 Plan)',
                city: 'Manchester',
                postcode: 'M11 4DQ'
            },
            {
                name: 'The Great Hall',
                city: 'Manchester',
                postcode: 'M60 2LA'
            },
            {
                name: 'Institute of Advanced Legal Studies',
                city: 'London',
                postcode: 'WC1B 5DR'
            },
            {
                name: 'Bolton Albert Halls - Cabaret',
                city: 'Bolton',
                postcode: 'BL1 1RU'
            },
            {
                name: 'Canal Street, Manchester',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Hotel Football',
                city: 'Manchester',
                postcode: 'M16 0SZ'
            },
            {
                name: 'Kedlestone Park (2012)',
                city: 'Derby',
                postcode: 'DE22 5JQ'
            },
            {
                name: 'Zippos Circus Horsepower (North East)',
                city: 'National',
                postcode: null
            },
            {
                name: 'Bolton Albert Hall - General Admission',
                city: 'Bolton',
                postcode: 'BL1 1RU'
            },
            {
                name: 'Radisson Edwardian Blu Hotel',
                city: 'Manchester',
                postcode: 'M2 5GP'
            },
            {
                name: 'The Lowry - Pier Eight',
                city: 'Salford',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Greater Manchester Police Museum',
                city: 'Manchester',
                postcode: 'M1 1ET'
            },
            {
                name: 'Manchester Airport Concorde Hangar',
                city: 'Manchester',
                postcode: 'WA15 8XQ'
            },
            {
                name: 'The Grafton Centre',
                city: 'Hyde',
                postcode: 'SK14 2AX'
            },
            {
                name: 'The Pankhurst Centre',
                city: 'Manchester',
                postcode: 'M13 9WP'
            },
            {
                name: 'The Brook Theatre',
                city: 'Soham',
                postcode: 'CB7 5AD'
            },
            {
                name: 'Mayfield Depot - TROS',
                city: 'Manchester',
                postcode: 'M1 2QF'
            },
            {
                name: 'Reading Minster',
                city: 'Reading',
                postcode: 'RG1 2LN'
            },
            {
                name: 'MHC - (General Admission)',
                city: 'Manchester',
                postcode: 'M13 9PL'
            },
            {
                name: 'Piccadilly Metrolink Station',
                city: 'Manchester',
                postcode: 'M1 2PB'
            },
            {
                name: 'Castlefield Basin',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Cenotaph, St. Peter\'s Square',
                city: 'Manchester',
                postcode: 'M2 5PD'
            },
            {
                name: 'Cleethorpes Coast Light Railway (GA)',
                city: 'Cleethorpes',
                postcode: 'DN35 0AG'
            },
            {
                name: 'East Lancashire Railway (Flying Scotsman)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Thornton Manor',
                city: 'Wirral',
                postcode: 'CH63 1JB'
            },
            {
                name: 'Manchester Arena',
                city: 'Manchester',
                postcode: 'M3 1AR'
            },
            {
                name: 'O2 Apollo Manchester (GA)',
                city: 'Manchester',
                postcode: 'M12 6AP'
            },
            {
                name: 'Gawsworth Hall unreserved seated',
                city: 'Macclesfield',
                postcode: 'SK11 9RN'
            },
            {
                name: 'New Wimbledon Theatre (NWT)',
                city: 'London',
                postcode: 'SW19 1QG'
            },
            {
                name: 'Lowry Academy Education Activity 300',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Lowry Academy Adult Theatre Activity 150',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Tatton Park',
                city: 'Knutsford',
                postcode: 'WA16 6QN'
            },
            {
                name: 'The Forum Theatre, Romiley - Unreserved',
                city: 'Stockport',
                postcode: 'SK6 4EA'
            },
            {
                name: 'Beaumaris Leisure Centre (Reserved)',
                city: 'Beaumaris',
                postcode: 'LL58 8AL'
            },
            {
                name: 'Lowry Academy Family Activity 150',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'ZZZ_ELR Test',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'Trafford Suite, Midland Hotel',
                city: 'Manchester',
                postcode: 'M60 2DS'
            },
            {
                name: 'Liverpool Sound City',
                city: 'Liverpool',
                postcode: 'L1 4BX'
            },
            {
                name: 'ZZZ_ELR (Santa 9 US)',
                city: 'Bury',
                postcode: 'BL9 0EY'
            },
            {
                name: 'John Smith\'s Stadium',
                city: 'Huddersfield',
                postcode: 'HD1'
            },
            {
                name: 'Millennium Square',
                city: 'Leeds',
                postcode: 'LS2 3AD'
            },
            {
                name: 'Ordsall Hall',
                city: 'Salford',
                postcode: 'M5 3AN'
            },
            {
                name: 'Hoghton Tower',
                city: 'Preston',
                postcode: 'PR5 0SH'
            },
            {
                name: 'Gloucestershire Warwickshire Railway (GA)',
                city: 'Gloucester',
                postcode: 'GL54 5DT'
            },
            {
                name: 'Phones 4u Arena (General Admission)',
                city: 'Manchester',
                postcode: 'M3 1 AR'
            },
            {
                name: 'Emmetts Garden, Sevenoaks',
                city: 'Sevenoaks',
                postcode: 'TN14 6BA'
            },
            {
                name: 'Manchester Town Hall (Reserved)',
                city: 'Manchester',
                postcode: 'M2 5DB'
            },
            {
                name: 'Turbine Hall',
                city: 'Newcastle-upon-Tyne',
                postcode: 'NE1 2JQ'
            },
            {
                name: 'The Sabai Pavilion - Bristol',
                city: 'Bristol',
                postcode: 'BS1 3XE'
            },
            {
                name: 'Glass House Arts Centre',
                city: 'Stourbridge',
                postcode: 'DY8 4HF'
            },
            {
                name: 'Great Hall, Queen Mary Univeristy of London',
                city: 'London',
                postcode: 'E1 4NS'
            },
            {
                name: 'Shree Radha Krishna Mandir',
                city: 'Manchester',
                postcode: 'M20 4QB'
            },
            {
                name: 'Sir Chris Hoy Velodrome, Glasgow',
                city: 'Glasgow',
                postcode: 'G40 3HY'
            },
            {
                name: 'Willington Dovecote and Stables',
                city: 'Bedfordshire',
                postcode: 'MK44 3PX'
            },
            {
                name: 'ZZZ_The Lowry - Pier Eight',
                city: 'Salford',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Capesthorne Hall',
                city: 'Macclesfield',
                postcode: 'SK11 9JY'
            },
            {
                name: 'Theatre 1, HOME',
                city: 'Manchester',
                postcode: 'M15 4FN'
            },
            {
                name: 'The Moston Miners Community Arts & Music Centre',
                city: 'Manchester',
                postcode: 'M40 0DJ'
            },
            {
                name: 'Chetham\'s School of Music, Baronial Hall',
                city: 'Manchester',
                postcode: 'M3 1SB'
            },
            {
                name: 'The Tower Festival Headland',
                city: 'Blackpool',
                postcode: 'FY1 4BJ'
            },
            {
                name: 'Uclan Burnley Campus 2014',
                city: 'Burnley',
                postcode: 'BB12 0AN'
            },
            {
                name: 'Avenham Park Arena (General Admission)',
                city: 'Preston',
                postcode: 'PR1 8JT'
            },
            {
                name: 'The Portland by Thistle (Unreserved Seating)',
                city: 'Manchester',
                postcode: 'M1 6DP'
            },
            {
                name: 'Lowry (GA - 850 capacity)',
                city: 'Salford',
                postcode: null
            },
            {
                name: 'Lowry Academy Youth Activity 300',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Norton Priory Museum and Gardens',
                city: 'Runcorn',
                postcode: 'WA7 1SX'
            },
            {
                name: 'Cinema 2, HOME',
                city: 'Manchester',
                postcode: 'M15 4FN'
            },
            {
                name: 'Sheffield Cathedral',
                city: 'Sheffield',
                postcode: 'S1 1HA'
            },
            {
                name: 'Lowry Outlet Mall',
                city: 'Manchester',
                postcode: 'M50 3AH'
            },
            {
                name: 'The Greystones',
                city: 'Sheffield',
                postcode: 'S11 7BS'
            },
            {
                name: 'MadLab',
                city: 'Manchester',
                postcode: 'M4 1HN'
            },
            {
                name: 'Manchester Reform Synagogue',
                city: 'Manchester',
                postcode: 'M2 5NH'
            },
            {
                name: 'Salford City Stadium Hospitality (Unres Seating)',
                city: 'Manchester',
                postcode: 'M30 7EY'
            },
            {
                name: 'The Britannia Hotel',
                city: 'Manchester',
                postcode: 'M1 3LA'
            },
            {
                name: 'The University of Salford',
                city: 'Salford',
                postcode: 'M3 6EQ'
            },
            {
                name: 'Grimsby Auditorium',
                city: 'Grimsby',
                postcode: 'DN31 2BH'
            },
            {
                name: 'Burnley Mechanics Theatre',
                city: 'Burnley',
                postcode: 'BB11 1BH'
            },
            {
                name: 'zzz_Avon Valley Railway, Bristol',
                city: 'Bristol',
                postcode: 'BS30 6HD'
            },
            {
                name: 'Sabai Pavilion - La Bordello Boheme (Newcastle)',
                city: 'Newcastle-upon-Tyne',
                postcode: null
            },
            {
                name: 'Hyde Town Hall',
                city: 'Hyde',
                postcode: 'SK14 1AL'
            },
            {
                name: 'Oxford Road Station',
                city: 'Manchester',
                postcode: 'M1 5NJ'
            },
            {
                name: 'Riversdale Police Club Grounds',
                city: 'Liverpool',
                postcode: 'L19 3QN'
            },
            {
                name: 'Mantos',
                city: 'Manchester',
                postcode: 'M1 3WD'
            },
            {
                name: 'Norfolk Showground',
                city: 'Norwich',
                postcode: 'NR5 0TT'
            },
            {
                name: 'Bulkeley Hotel',
                city: 'Beaumaris',
                postcode: 'LL58 8AW'
            },
            {
                name: 'Lee Valley VeloPark, London',
                city: 'London',
                postcode: 'E20 3AB'
            },
            {
                name: 'Sheffield Central Quaker Meeting House',
                city: 'Sheffield',
                postcode: 'S1 2EW'
            },
            {
                name: 'Jodrell Bank',
                city: 'Macclesfield',
                postcode: 'SK11 9DW'
            },
            {
                name: 'Sir Chris Hoy Velodrome, Glasgow (GA)',
                city: 'Glasgow',
                postcode: null
            },
            {
                name: 'The Grange, St Pauls London (GSP)',
                city: 'London',
                postcode: 'EC4V 5AJ'
            },
            {
                name: 'Oldham Coliseum Theatre at University Campus',
                city: 'Oldham',
                postcode: 'OL1 1BB'
            },
            {
                name: 'Clitheroe Castle',
                city: 'Lancashire',
                postcode: 'BB7 1BA'
            },
            {
                name: 'Peter Barkworth Theatre (General Admission)',
                city: 'Stockport',
                postcode: 'SK1 3UQ'
            },
            {
                name: 'Islington Mill',
                city: 'Manchester',
                postcode: 'M3 5HW'
            },
            {
                name: 'O\'Sheas Bar',
                city: 'Manchester',
                postcode: 'M1 6NF'
            },
            {
                name: 'Parr Hall',
                city: 'Warrington',
                postcode: 'WA1 1BL'
            },
            {
                name: 'Hilton Hotel Gateshead (HHG)',
                city: 'Newcastle-upon-Tyne',
                postcode: 'NE8 2AR'
            },
            {
                name: 'Browsholme Hall',
                city: 'Clitheroe',
                postcode: 'BB7 3DE'
            },
            {
                name: 'Colne Valley Railway (General Admission)',
                city: 'Essex',
                postcode: 'CO9 3DZ'
            },
            {
                name: 'Kelburn Castle & Country Centre',
                city: 'Ayreshire',
                postcode: 'KA29 0BE'
            },
            {
                name: 'Halle St. Peter\'s',
                city: 'Manchester',
                postcode: 'M4 6BF'
            },
            {
                name: 'Dunster Castle',
                city: 'Minehead',
                postcode: 'TA24 6SL'
            },
            {
                name: 'Ancoats',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'The Green',
                city: 'Manchester',
                postcode: 'M1 2DQ'
            },
            {
                name: 'Night & Day',
                city: 'Manchester',
                postcode: 'M1 1JN'
            },
            {
                name: 'ZZZ_Pavilion Theatre Standing',
                city: 'Manchester',
                postcode: 'M2 5PE'
            },
            {
                name: 'Echo Arena',
                city: 'Liverpool',
                postcode: 'L3 4FP'
            },
            {
                name: 'Villaggio Restaurant',
                city: 'Manchester',
                postcode: 'M1 3WD'
            },
            {
                name: 'Geoffrey Manton Building, MMU (Seated)',
                city: 'Manchester',
                postcode: 'M15 6BH'
            },
            {
                name: 'O2 Apollo Manchester - MIF',
                city: 'Manchester',
                postcode: 'M12 6AP'
            },
            {
                name: 'TAKE A SEAT - Quays',
                city: 'Salford',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Caernarfon Castle',
                city: 'Gwynedd',
                postcode: 'TA24 6SL'
            },
            {
                name: 'Dearnford Lake, Whitchurch',
                city: 'Stoke-on-Trent',
                postcode: 'SY13 3JQ'
            },
            {
                name: 'Penrith Library - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'CA11 7YA'
            },
            {
                name: 'The Glass House',
                city: 'Manchester',
                postcode: 'M2 5DB'
            },
            {
                name: 'Manchester City Library, Elliot House',
                city: 'Manchester',
                postcode: 'M3 3WD'
            },
            {
                name: 'ZZZ_National Cycling Centre - General Admission',
                city: 'Manchester',
                postcode: 'M11 4DQ'
            },
            {
                name: 'Hollycroft Park, Hinckley',
                city: 'Hinckley',
                postcode: 'LE10 0HG'
            },
            {
                name: 'Borde Hill Garden',
                city: 'Haywards Heath',
                postcode: 'RH16 1XP'
            },
            {
                name: 'Oldham Coliseum at Grange Arts Centre - End On',
                city: 'Oldham',
                postcode: 'OL9 6EA'
            },
            {
                name: 'RNCM Theatre Unreserved',
                city: 'Manchester',
                postcode: 'M15 6BH'
            },
            {
                name: 'Upper Campfield Market Hall',
                city: 'Manchester',
                postcode: 'M3 4FH'
            },
            {
                name: 'ZZZ_Bridgewater Hall (MIF)',
                city: 'Manchester',
                postcode: 'M2 3WS'
            },
            {
                name: 'Maryport Library - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'CA15 6ND'
            },
            {
                name: 'West Woodhay House',
                city: 'Newbury',
                postcode: 'RG20 0BS'
            },
            {
                name: 'Southern Cemetery (SOU)',
                city: 'Manchester',
                postcode: 'M21 7GL'
            },
            {
                name: 'zzz_Avon Valley Railway, Verson Two',
                city: 'Bristol',
                postcode: 'BS30 6HD'
            },
            {
                name: 'Heptonstall Parish Church',
                city: 'Hebden Bridge',
                postcode: 'HX7 7NS'
            },
            {
                name: 'The Redgrave Theatre',
                city: 'Bristol',
                postcode: 'BS8 3JH'
            },
            {
                name: 'Arley Hall',
                city: 'Northwich',
                postcode: 'CW6 6NA'
            },
            {
                name: 'City Airport',
                city: 'Manchester',
                postcode: 'M30 7SA'
            },
            {
                name: 'Sachas Hotel, Ballroom',
                city: 'Manchester',
                postcode: 'M4 1SH'
            },
            {
                name: 'Soothill Hall, Ashville College',
                city: 'Harrogate',
                postcode: 'HG2 9JP'
            },
            {
                name: 'Dorney Court',
                city: 'Windsor',
                postcode: 'SL4 6QP'
            },
            {
                name: 'Bearded Theory 2013',
                city: 'Derby',
                postcode: 'DE22 5JQ'
            },
            {
                name: 'MIF Test Venue C (Lyric)',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Stand Parish Church, Whitefield, M45 7NF',
                city: 'Manchester',
                postcode: 'M45 7NF'
            },
            {
                name: 'Co-operative Bank Branch',
                city: 'Manchester',
                postcode: 'M4 4BE'
            },
            {
                name: 'St Mary\'s Church',
                city: 'Henley',
                postcode: 'RG9 2AU'
            },
            {
                name: 'TAKE A SEAT - Studio',
                city: 'Salford',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Piccadilly Gardens (1500 cap)',
                city: 'Manchester',
                postcode: 'M1 1LS'
            },
            {
                name: 'MIF Test Venue A (GA)',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'The Yard Theatre',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'MIF Macbeth (test venue)',
                city: 'Manchester',
                postcode: 'M40 1XX'
            },
            {
                name: 'Bristol Festivals Reserved',
                city: 'Bristol',
                postcode: null
            },
            {
                name: 'RARE Studio\'s',
                city: 'Liverpool',
                postcode: 'L1 4JA'
            },
            {
                name: 'Alice Holt Forest',
                city: 'Farnham',
                postcode: 'GU10 4LS'
            },
            {
                name: 'Kings House',
                city: 'Bedford',
                postcode: 'MK42 9AZ'
            },
            {
                name: 'Princess Theatre Torquay (PRI)',
                city: 'Torquay',
                postcode: 'TQ2 5EZ'
            },
            {
                name: 'Vilaggio',
                city: 'Manchester',
                postcode: 'M1 3WD'
            },
            {
                name: 'Barbirolli Room, Bridgewater Hall',
                city: 'Manchester',
                postcode: 'M2 3WS'
            },
            {
                name: 'The Venue',
                city: 'Derby',
                postcode: 'DE22 3SJ'
            },
            {
                name: 'Palace Hotel (Unreserved)',
                city: 'Manchester',
                postcode: 'M60 7HA'
            },
            {
                name: 'Lancaster Town Hall',
                city: 'Lancaster',
                postcode: 'LA1 1PJ'
            },
            {
                name: 'Cross Street Chapel',
                city: 'Manchester',
                postcode: 'M2 1NL'
            },
            {
                name: 'Hope Mill Theatre',
                city: 'Manchester',
                postcode: 'M4 7JA'
            },
            {
                name: 'Chetham\'s Library',
                city: 'Manchester',
                postcode: 'M3 1SB'
            },
            {
                name: 'Club IXIV (Nine Four)',
                city: 'Manchester',
                postcode: 'M1 7HL'
            },
            {
                name: 'Soup Kitchen',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Chatsworth',
                city: 'Bakewell',
                postcode: 'DE45 1PP'
            },
            {
                name: 'Cockermouth Library - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'CA13 9LU'
            },
            {
                name: 'Glastonbury 2016',
                city: 'Somerset',
                postcode: null
            },
            {
                name: 'YES Basement',
                city: 'Manchester',
                postcode: 'M1 7DB'
            },
            {
                name: 'MIF Test Venue B (Quays)',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Tate Britain',
                city: 'London',
                postcode: 'SW1P 4RG'
            },
            {
                name: 'Stoller Hall, Chetham\'s School of Music',
                city: 'Manchester',
                postcode: 'M3 1UN'
            },
            {
                name: 'Hedsor House (HED)',
                city: 'Taplow',
                postcode: 'SL6 0HX'
            },
            {
                name: 'HOME - General Admission',
                city: 'Manchester',
                postcode: 'M15 4FN'
            },
            {
                name: 'Hallé St Peters',
                city: 'Manchester',
                postcode: 'M4 6BF'
            },
            {
                name: 'Lowry Compass Room',
                city: 'Manchester',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Chiswick Town Hall',
                city: 'London',
                postcode: 'W4 4JN'
            },
            {
                name: 'MCR Metropolitan University Business School',
                city: 'Manchester',
                postcode: 'M15 6BH'
            },
            {
                name: 'Wales Millennium Centre',
                city: 'Cardiff',
                postcode: 'CF10 5AL'
            },
            {
                name: 'Congleton Town Football Ground',
                city: 'Congleton',
                postcode: 'CW12 4DG'
            },
            {
                name: 'Ludus Dance',
                city: 'Lancaster',
                postcode: 'LA1 1RE'
            },
            {
                name: 'Radisson Edwardian',
                city: 'Manchester',
                postcode: 'M2 5GP'
            },
            {
                name: 'St Mary\'s Church, Pakenham',
                city: 'Pakenham',
                postcode: 'IP31 2LN'
            },
            {
                name: 'Sir James Hawkey Hall',
                city: 'Essex',
                postcode: 'IG8 0BG'
            },
            {
                name: 'Manchester Academy 2 (Seated)',
                city: 'Manchester',
                postcode: 'M13 9PR'
            },
            {
                name: 'Marks and Spencer',
                city: 'Manchester',
                postcode: 'M1 1WT'
            },
            {
                name: 'Yes Manchester',
                city: 'Manchester',
                postcode: 'M1 7BD'
            },
            {
                name: 'Platt Fields Park',
                city: 'Manchester',
                postcode: 'M14 6LA'
            },
            {
                name: 'Art Theatre',
                city: 'New Mills',
                postcode: 'SK22 3HJ'
            },
            {
                name: 'Moss Side Powerhouse Library',
                city: 'Manchester',
                postcode: 'M14 4SL'
            },
            {
                name: 'Catholic Church, Beaumaris',
                city: 'Beaumaris',
                postcode: 'LL58 8AF'
            },
            {
                name: 'Coronation Hall',
                city: 'Ulverston',
                postcode: 'LA12 7LZ'
            },
            {
                name: 'Barnabas Church Centre',
                city: 'Shrewsbury',
                postcode: 'GU15 2AD'
            },
            {
                name: 'Hanbury Manor Hotel & Country Club (HAN)',
                city: 'Ware',
                postcode: 'SG12 0SD'
            },
            {
                name: 'Leicester Grammar School',
                city: 'Leicester',
                postcode: 'LE8 9FL'
            },
            {
                name: 'Bearwood Theatre',
                city: 'Berkshire',
                postcode: 'RG41 5BG'
            },
            {
                name: 'The Daffodil Hotel & Spa - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'LA22 9PR'
            },
            {
                name: 'Mint Lounge',
                city: 'Manchester',
                postcode: 'M4 1LE'
            },
            {
                name: 'Duntreath Castle',
                city: 'Glasgow',
                postcode: 'G63 9AJ'
            },
            {
                name: 'Coach Stop, Albert Square',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Jersey War Tunnels',
                city: 'Jersey',
                postcode: 'JE3 1FU'
            },
            {
                name: 'Marriott Hotel Liverpool (MHL)',
                city: 'Liverpool',
                postcode: 'L1 1RH'
            },
            {
                name: 'Barnsley Metrodome (Unreserved)',
                city: 'Barnsley',
                postcode: 'S71 1AN'
            },
            {
                name: 'RARE Studios',
                city: 'Liverpool',
                postcode: 'L1 4AQ'
            },
            {
                name: 'Millom Library - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'LA18 4DD'
            },
            {
                name: 'Wellington Mill',
                city: 'Manchester',
                postcode: 'M40 7FS'
            },
            {
                name: 'Boconnoc',
                city: 'Cornwall',
                postcode: 'PL22 0RQ'
            },
            {
                name: 'The De La Salle Theatre',
                city: 'Bournemouth',
                postcode: 'BH6 4AH'
            },
            {
                name: 'Legends',
                city: 'Manchester',
                postcode: 'M1 3QW'
            },
            {
                name: 'Rutland Water',
                city: 'Oakham',
                postcode: 'LE15 8QL'
            },
            {
                name: 'Manchester Jewish Museum (Reserved Seating)',
                city: 'Manchester',
                postcode: 'M8 8LW'
            },
            {
                name: 'Bridport Arts Centre (Cabaret)',
                city: 'Bridport',
                postcode: 'DT6 3NR'
            },
            {
                name: 'Bowdon Rooms - Reserved Plan',
                city: 'Altrincham',
                postcode: 'WA14 2TQ'
            },
            {
                name: 'London Coliseum',
                city: 'London',
                postcode: 'WC2N 4ES'
            },
            {
                name: 'Deaf Institute',
                city: 'Manchester',
                postcode: 'M1 7HE'
            },
            {
                name: 'Castle Howard',
                city: 'York',
                postcode: 'YO60 7DA'
            },
            {
                name: 'Lytes Cary Manor',
                city: 'Somerton',
                postcode: 'TA11 7HU'
            },
            {
                name: 'Main Hall, Wheatley Park School',
                city: 'Oxford',
                postcode: 'OX33 1QH'
            },
            {
                name: 'Working Class Movement Library, Salford',
                city: 'Salford',
                postcode: 'M5 4WX'
            },
            {
                name: 'INNSIDE Manchester',
                city: 'Manchester',
                postcode: 'M15 4RP'
            },
            {
                name: 'Heywood Civic Centre',
                city: 'Rochdale',
                postcode: 'OL10 1LW'
            },
            {
                name: 'National Cycling Centre (2012 Plan)',
                city: 'Manchester',
                postcode: 'M11 4DQ'
            },
            {
                name: 'Big Top, Avenham Park',
                city: 'Preston',
                postcode: 'PR1 8JT'
            },
            {
                name: 'West Wing Arts Centre',
                city: 'Slough',
                postcode: 'SL2 5AY'
            },
            {
                name: 'Keswick Library - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'CA12 5HD'
            },
            {
                name: 'Mytholmroyd Station, West Yorkshire',
                city: 'Yorkshire',
                postcode: 'HX7 5EA'
            },
            {
                name: 'Ulster Gallery, Irish World Heritage Centre',
                city: 'Manchester',
                postcode: 'M8 0AE'
            },
            {
                name: 'KC Lightstream Stadium',
                city: 'Hull',
                postcode: 'HU9 5HE'
            },
            {
                name: 'NIA Centre',
                city: 'Manchester',
                postcode: 'M15 5EU'
            },
            {
                name: 'St. Mary\'s on the Hill',
                city: 'Chester',
                postcode: 'CH1 2DW'
            },
            {
                name: 'Park Inn, Cheetham Hill Road',
                city: 'Manchester',
                postcode: 'M4 4EW'
            },
            {
                name: 'Towneley Hall',
                city: 'Burnley',
                postcode: 'BB11 3RQ'
            },
            {
                name: 'Ulverston Library - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'LA12 0BT'
            },
            {
                name: 'Greenford Assembly Hall',
                city: 'Middlesex',
                postcode: 'UB6 9QN'
            },
            {
                name: 'Pop Up Cinema @ 1830 Warehouse',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Wigton Library - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'CA7 9NJ'
            },
            {
                name: 'Whitty Theatre Wokingham',
                city: 'Berkshire',
                postcode: 'RG40 3EU'
            },
            {
                name: 'Old Trafford',
                city: 'Manchester',
                postcode: 'M16 0RA'
            },
            {
                name: 'Black Lion Public House',
                city: 'Salford',
                postcode: 'M3 5BZ'
            },
            {
                name: 'Cloud 23 - Hilton Hotel',
                city: 'Manchester',
                postcode: 'M3 4LQ'
            },
            {
                name: 'Lowry Academy Adult Theatre Activity 300',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Oxford Town Hall',
                city: 'Oxford',
                postcode: 'OX1 1BX'
            },
            {
                name: 'Manchester Academy 2',
                city: 'Manchester',
                postcode: 'M13 9PR'
            },
            {
                name: 'Whitehaven Archive Centre',
                city: 'Cumbria',
                postcode: 'CA28 7NL'
            },
            {
                name: 'Velvet Central',
                city: 'Manchester',
                postcode: 'M2 5WQ'
            },
            {
                name: 'Brewery Arts Centre',
                city: 'Cumbria',
                postcode: 'LA9 4HE'
            },
            {
                name: 'Belmont House, Faversham',
                city: 'Faversham',
                postcode: 'ME13 0HH'
            },
            {
                name: 'University Of Manchester, Stopford Building',
                city: 'Manchester',
                postcode: 'M13 9PG'
            },
            {
                name: 'Winsford Lifestyle Centre',
                city: 'Winsford',
                postcode: 'CW7 1AD'
            },
            {
                name: 'Lowry Quays (GA Stage Level and T1)',
                city: 'The Lowry',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Farington Lodge',
                city: 'Leyland',
                postcode: 'PR25 4QR'
            },
            {
                name: 'Chinese Arts Centre',
                city: 'Manchester',
                postcode: 'M4 1EU'
            },
            {
                name: 'Layton Institute',
                city: 'Blackpool',
                postcode: 'FY3 7HG'
            },
            {
                name: 'Pyramid & Parr Hall',
                city: 'Warrington',
                postcode: 'WA1 1BL'
            },
            {
                name: 'Travel Lodge, Great Ancoats Street',
                city: 'Manchester',
                postcode: 'M4 5AZ'
            },
            {
                name: 'YHA Manchester Conference Centre',
                city: 'Manchester',
                postcode: 'M3 4NB'
            },
            {
                name: 'Harewood House',
                city: 'Leeds',
                postcode: 'LS17 9LG'
            },
            {
                name: 'Marrs Bar',
                city: 'Worcester',
                postcode: 'WR1 1TA'
            },
            {
                name: 'Preston Guild Hall - Grand Hall',
                city: 'Preston',
                postcode: 'PR1 1HT'
            },
            {
                name: 'The Willows Variety Centre',
                city: 'Salford',
                postcode: 'M5 5FQ'
            },
            {
                name: 'St Helens Town Hall',
                city: 'St Helens',
                postcode: 'WA10 1HP'
            },
            {
                name: 'Hendon Hall Hotel',
                city: 'London',
                postcode: 'N20 9EZ'
            },
            {
                name: 'Crowne Plaza & Staybridge Suites',
                city: 'Manchester',
                postcode: 'M15 6PQ'
            },
            {
                name: 'The Pavilion (Unreserved)',
                city: 'Manchester',
                postcode: 'M16 0PX'
            },
            {
                name: 'The Imperial Hotel, Blackpool',
                city: 'Blackpool',
                postcode: 'FY1 2HB'
            },
            {
                name: 'The Forum',
                city: 'Manchester',
                postcode: 'M22 5RX'
            },
            {
                name: 'Bowdon Rooms - Table Layout',
                city: 'Altrincham',
                postcode: 'WA14 2TQ'
            },
            {
                name: 'Bright Building (Manchester Science Park)',
                city: 'Manchester',
                postcode: 'M15 5ZA'
            },
            {
                name: 'Festival Theatre Edinburgh',
                city: 'Scotland',
                postcode: 'EH8 9FT'
            },
            {
                name: 'Newbiggin Village Hall',
                city: 'Penrith',
                postcode: 'CA11 0HT'
            },
            {
                name: 'The Alhambra Theatre',
                city: 'Bradford',
                postcode: 'BD7 1AJ'
            },
            {
                name: 'Burwell House',
                city: 'Cambridgeshire',
                postcode: 'CB25 0BB'
            },
            {
                name: 'The Media Factory',
                city: 'Preston',
                postcode: 'PR1 2XY'
            },
            {
                name: 'Bolton Library Theatre 2020 (GA)',
                city: 'Bolton',
                postcode: null
            },
            {
                name: 'Eaton Bank School',
                city: 'Congleton',
                postcode: 'CW12 1NT'
            },
            {
                name: 'St Michael\'s Church',
                city: 'Ascot',
                postcode: 'RG29 2AU'
            },
            {
                name: 'Blackburn Cathedral',
                city: 'Lancashire',
                postcode: 'BB1 5AA'
            },
            {
                name: 'The Forum (Unreserved)',
                city: 'Manchester',
                postcode: 'M22 5RX'
            },
            {
                name: 'The Longfield Suite',
                city: 'Manchester',
                postcode: 'M25 1AY'
            },
            {
                name: 'St Marylebone Church',
                city: 'London',
                postcode: 'NW1 5LT'
            },
            {
                name: 'Hamptonne',
                city: 'Jersey',
                postcode: 'JE3 1HS'
            },
            {
                name: 'Beetham Tower',
                city: 'Manchester',
                postcode: 'M3 4LQ'
            },
            {
                name: 'Manchester Met. University - John Dalton Building',
                city: 'Manchester',
                postcode: 'M1 5GD'
            },
            {
                name: 'Crewe Test Venue',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Britannia Stadium',
                city: 'Stoke-on-Trent',
                postcode: 'ST4 4EG'
            },
            {
                name: 'Quay House, MediaCityUK',
                city: 'Manchester',
                postcode: 'M50 3SQ'
            },
            {
                name: 'Seaton Library - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'CA14 1JD'
            },
            {
                name: 'Ricoh Arena',
                city: 'Coventry',
                postcode: 'CV6 6GE'
            },
            {
                name: 'St. Swithun\'s School Performing Arts Centre',
                city: 'Wincester',
                postcode: 'SO21 1HA'
            },
            {
                name: 'Proud2 O2',
                city: 'London',
                postcode: 'SE10 0DX'
            },
            {
                name: 'MacDonald Townhouse Hotel',
                city: 'Manchester',
                postcode: 'M1 6DF'
            },
            {
                name: 'Gracie Fields Theatre (unreserved)',
                city: 'Rochdale',
                postcode: 'OL11 5EF'
            },
            {
                name: 'Wollaton Park',
                city: 'Nottingham',
                postcode: 'NG8 2AE'
            },
            {
                name: 'Portland Thistle Hotel',
                city: 'Manchester',
                postcode: 'M1 6DP'
            },
            {
                name: 'Marriott Hotel Grosvenor Sq London (MGL)',
                city: 'London',
                postcode: 'W1K 6JP'
            },
            {
                name: 'Shap Library - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'CA10 3NL'
            },
            {
                name: 'Edgehill University',
                city: 'Lancashire',
                postcode: 'L39 4QP'
            },
            {
                name: 'Kosmonaut',
                city: 'Manchester',
                postcode: 'M1 2FF'
            },
            {
                name: 'Workington Library - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'CA14 2ND'
            },
            {
                name: 'St Paul\'s Church',
                city: 'Camberley',
                postcode: 'GU15 2AD'
            },
            {
                name: 'Lowry Christmas Appeal Raffle',
                city: 'The Lowry',
                postcode: null
            },
            {
                name: 'The London Stadium',
                city: 'London',
                postcode: 'E20 2ST'
            },
            {
                name: 'Dot to Dot',
                city: 'National',
                postcode: null
            },
            {
                name: 'Florence Mine',
                city: 'Egremont',
                postcode: 'CA22 2NR'
            },
            {
                name: 'Harrow Arts Centre',
                city: 'Harrow',
                postcode: 'HA5 4EA'
            },
            {
                name: 'Zebra Claims Stadium',
                city: 'Workington',
                postcode: 'CA14 2HG'
            },
            {
                name: 'St. Mary\'s Parish Church, Beaumaris',
                city: 'Beaumaris',
                postcode: 'LL58 8AB'
            },
            {
                name: 'Haworth Steam Railway Station',
                city: 'National',
                postcode: 'BD22 8NJ'
            },
            {
                name: 'Manchester Met. University - Student Zone',
                city: 'MMU Campus, Crewe, CW1 5DU',
                postcode: 'CW1 5DU'
            },
            {
                name: 'Church Hill Theatre',
                city: 'Edinburgh',
                postcode: 'EH10 4DR'
            },
            {
                name: 'Ramsbottom Cricket Club',
                city: 'Bury',
                postcode: 'BL0 0BS'
            },
            {
                name: 'The Stoller Hall',
                city: 'Manchester',
                postcode: 'M3 1DA'
            },
            {
                name: 'Milton Keynes Christian Centre',
                city: 'Milton Keynes',
                postcode: 'MK6 2TG'
            },
            {
                name: 'Allerdale COSC - Wordsworth Trust',
                city: 'Cumbria',
                postcode: 'CA15 7BD'
            },
            {
                name: 'St Georges Hall',
                city: 'Liverpool',
                postcode: 'L1 1JJ'
            },
            {
                name: 'Cosmo Rodewald Concert Hall - MIF',
                city: 'Manchester',
                postcode: 'M13 9PL'
            },
            {
                name: 'Auditorium',
                city: 'Manchester',
                postcode: null
            },
            {
                name: 'Lowry Quays (with Stalls Tier tables)',
                city: 'The Lowry',
                postcode: 'M50 3AZ'
            },
            {
                name: 'Manchester Academy 3',
                city: 'Manchester',
                postcode: 'M13 9PR'
            },
            {
                name: 'St Pancreas Renaissance Hotel (SPR)',
                city: 'London',
                postcode: 'NW1 2AR'
            },
            {
                name: 'Heaton Park',
                city: 'Manchester',
                postcode: 'M25 2SW'
            },
            {
                name: 'Richard Goodall Gallery',
                city: 'Manchester',
                postcode: 'M4 1NA'
            },
            {
                name: 'The Union, MMU',
                city: 'Manchester',
                postcode: 'M15 6LL'
            },
            {
                name: 'Mechanics Institute',
                city: 'Manchester',
                postcode: 'M1 6DD'
            },
            {
                name: 'HMV Ritz Manchester (Standing)',
                city: 'Manchester',
                postcode: 'M1 5NQ'
            },
            {
                name: 'Birmingham Hippodrome (BMH)',
                city: 'Birmingham',
                postcode: 'B5 4TB'
            },
            {
                name: 'East Lancashire Railway, Dining (GA)',
                city: 'Bury',
                postcode: null
            },
            {
                name: 'Lancaster Priory',
                city: 'Lancaster',
                postcode: 'LA1 1YZ'
            }
        ];
        
        var currentVenue = $('div.location').first().text();
        var searchResult = venues.find(o => o.name === currentVenue);
        
        if (searchResult != null) {
            //$('.basket-Commissions').before($(`<iframe src="https://www.stay22.com/embed/gm?address=${searchResult.postcode}" id="stay22-widget" width="100%" height="460" frameborder="0"></iframe>`));
        }
    }


    // Change Row / Seat for Lady Boys Events


    if ($eSRO.currentScreen === "event4.aspx") {
    
        var showName = $(".eventInfoSection .name").text();
    
        if (showName.includes("Lady Boys of Bangkok")) {
    
            $("#eventPage").addClass("event-ladyboys");
        }
    }
    
    
    
    if ($eSRO.currentScreen === "order.aspx") {
        
        var basketEvents = $(".basketEvent");
                            
        basketEvents.each(function() {
        
        var basketEvent = $(this);
        
        var eventName = basketEvent.find('.eventInfoSection .name'); 
        var eventNameText = eventName.text();
        
            if (eventNameText.includes("Lady Boys of Bangkok")) {
    
                var eventDetails = basketEvent.find('.basketProperty.Details');
                
                eventDetails.each(function() {
                
                    var eventDetail = $(this);  
    
                var eventDetailText = eventDetail.text().replace(';', '');
    
                var eventSplit = eventDetailText.split(' ');
                
                var newDetails = "Table "+eventSplit[1]+", Seat "+eventSplit[3];
    
                console.log(newDetails);
    
                            eventDetail.text(newDetails);
            });
            
            }
        
        });
    }
    




    $(window).on('load', function () {
        $('.screen-showdetails_aspx .ShowEventsitemsList').hide();
    })

    window.onload = () => {
        $('.screen-showdetails_aspx .ShowEventsitemsList').hide();
    }
});