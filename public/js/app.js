var config = window.config = {}, $ref = $("#ref");

function animate(e) {
    var o = "animated " + e.name;
    $(e.selector).addClass(o).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
        $(this).removeClass(o)
    })
}

config.ResponsiveBootstrapToolkitVisibilityDivs = {
    xs: $('<div class="device-xs \t\t\t\t  hidden-sm-up"></div>'),
    sm: $('<div class="device-sm hidden-xs-down hidden-md-up"></div>'),
    md: $('<div class="device-md hidden-sm-down hidden-lg-up"></div>'),
    lg: $('<div class="device-lg hidden-md-down hidden-xl-up"></div>'),
    xl: $('<div class="device-xl hidden-lg-down\t\t\t  "></div>')
}, ResponsiveBootstrapToolkit.use("Custom", config.ResponsiveBootstrapToolkitVisibilityDivs), config.validations = {
    debug: 0,
    errorClass: "has-error",
    validClass: "success",
    errorElement: "span",
    highlight: function (e, o, t) {
        $(e).parents("div.form-group").addClass(o).removeClass(t)
    },
    unhighlight: function (e, o, t) {
        $(e).parents(".has-error").removeClass(o).addClass(t)
    },
    submitHandler: function (e) {
        e.submit()
    }
}, config.delayTime = 50, config.chart = {}, config.chart.colorPrimary = tinycolor($ref.find(".chart .color-primary").css("color")), config.chart.colorSecondary = tinycolor($ref.find(".chart .color-secondary").css("color")), $(function () {
    var t = $(".item-actions-dropdown");
    $(document).on("click", function (e) {
        $(e.target).closest(".item-actions-dropdown").length || t.removeClass("active")
    }), $(".item-actions-toggle-btn").on("click", function (e) {
        e.preventDefault();
        var o = $(this).closest(".item-actions-dropdown");
        t.not(o).removeClass("active"), o.toggleClass("active")
    })
});
var npSettings = {easing: "ease", speed: 500};

function setSameHeights(e) {
    e = e || $(".sameheight-container");
    var t = ResponsiveBootstrapToolkit.current();
    e.each(function () {
        var e = $(this).find(".sameheight-item"), o = 0;
        e.each(function () {
            $(this).css({height: "auto"}), o = Math.max(o, $(this).innerHeight())
        }), e.each(function () {
            -1 === ($(this).data("exclude") || "").split(",").indexOf(t) && $(this).innerHeight(o)
        })
    })
}

NProgress.configure(npSettings), $(function () {
    var e;
    setSameHeights(), $(window).resize(function () {
        clearTimeout(e), e = setTimeout(setSameHeights, 150)
    })
}), $(function () {
    animate({name: "flipInY", selector: ".error-card > .error-title-block"}), setTimeout(function () {
        var e = $(".error-card > .error-container");
        animate({name: "fadeInUp", selector: e}), e.addClass("visible")
    }, 1e3)
}), $(function () {
    if (!$("#login-form").length) return !1;
    var e = {
        rules: {username: {required: !0, email: !0}, password: "required"},
        messages: {
            username: {required: "Please enter username", email: "Please enter a valid email address"},
            password: "Please enter password"
        },
        invalidHandler: function () {
            animate({name: "shake", selector: ".auth-container > .card"})
        }
    };
    $.extend(e, config.validations), $("#login-form").validate(e)
}), $(function () {
    if (!$("#reset-form").length) return !1;
    var e = {
        rules: {email1: {required: !0, email: !0}},
        messages: {email1: {required: "Please enter email address", email: "Please enter a valid email address"}},
        invalidHandler: function () {
            animate({name: "shake", selector: ".auth-container > .card"})
        }
    };
    $.extend(e, config.validations), $("#reset-form").validate(e)
}), $(function () {
    if (!$("#signup-form").length) return !1;
    var e = {
        rules: {
            firstname: {required: !0},
            lastname: {required: !0},
            email: {required: !0, email: !0},
            password: {required: !0, minlength: 8},
            retype_password: {required: !0, minlength: 8, equalTo: "#password"},
            agree: {required: !0}
        },
        groups: {name: "firstname lastname", pass: "password retype_password"},
        errorPlacement: function (e, o) {
            "firstname" == o.attr("name") || "lastname" == o.attr("name") ? (e.insertAfter($("#lastname").closest(".row")), o.parents("div.form-group").addClass("has-error")) : "password" == o.attr("name") || "retype_password" == o.attr("name") ? (e.insertAfter($("#retype_password").closest(".row")), o.parents("div.form-group").addClass("has-error")) : "agree" == o.attr("name") ? e.insertAfter("#agree-text") : e.insertAfter(o)
        },
        messages: {
            firstname: "Please enter firstname and lastname",
            lastname: "Please enter firstname and lastname",
            email: {required: "Please enter email", email: "Please enter a valid email address"},
            password: {
                required: "Please enter password fields.",
                minlength: "Passwords should be at least 8 characters."
            },
            retype_password: {
                required: "Please enter password fields.",
                minlength: "Passwords should be at least 8 characters."
            },
            agree: "Please accept our policy"
        },
        invalidHandler: function () {
            animate({name: "shake", selector: ".auth-container > .card"})
        }
    };
    $.extend(e, config.validations), $("#signup-form").validate(e)
}), $(function () {
    $(".wyswyg").each(function () {
        var e = $(this).find(".editor"), o = $(this).find(".toolbar");
        new Quill(e.get(0), {theme: "snow", modules: {toolbar: o.get(0)}})
    })
}), $(function () {
    if ($("#sidebar-menu, #customize-menu").metisMenu({activeClass: "open"}), $("#sidebar-collapse-btn").on("click", function (e) {
        e.preventDefault(), $("#app").toggleClass("sidebar-open")
    }), $("#sidebar-overlay").on("click", function () {
        $("#app").removeClass("sidebar-open")
    }), $.browser.mobile) {
        var e = $("#app ");
        $("#sidebar-mobile-menu-handle ").swipe({
            swipeLeft: function () {
                e.hasClass("sidebar-open") && e.removeClass("sidebar-open")
            }, swipeRight: function () {
                e.hasClass("sidebar-open") || e.addClass("sidebar-open")
            }, triggerOnTouchEnd: !1
        })
    }
}), $(function () {
    if (!$("#flot-bar-chart").length) return !1;

    function e() {
        var e = {
            series: {
                bars: {
                    show: !0,
                    barWidth: .6,
                    fill: !0,
                    fillColor: {colors: [{opacity: .8}, {opacity: .8}]}
                }
            },
            xaxis: {tickDecimals: 0},
            colors: [config.chart.colorPrimary],
            grid: {color: "#999999", hoverable: !0, clickable: !0, tickColor: "#D4D4D4", borderWidth: 0},
            legend: {show: !1},
            tooltip: !0,
            tooltipOpts: {content: "x: %x, y: %y"}
        }, o = {label: "bar", data: [[1, 34], [2, 25], [3, 19], [4, 34], [5, 32], [6, 44]]};
        $.plot($("#flot-bar-chart"), [o], e);
        var t = {
            series: {lines: {show: !0, lineWidth: 2, fill: !0, fillColor: {colors: [{opacity: 0}, {opacity: 0}]}}},
            xaxis: {tickDecimals: 0},
            colors: [config.chart.colorPrimary],
            grid: {color: "#999999", hoverable: !0, clickable: !0, tickColor: "#D4D4D4", borderWidth: 0},
            legend: {show: !1},
            tooltip: !0,
            tooltipOpts: {content: "x: %x, y: %y"}
        };
        o = {label: "bar", data: [[1, 34], [2, 25], [3, 19], [4, 34], [5, 32], [6, 44]]};
        $.plot($("#flot-line-chart"), [o], t);
        var r = [{
            label: "Sales 1",
            data: 21,
            color: tinycolor(config.chart.colorPrimary.toString()).lighten(20)
        }, {
            label: "Sales 2",
            data: 15,
            color: tinycolor(config.chart.colorPrimary.toString()).lighten(10)
        }, {label: "Sales 3", data: 7, color: tinycolor(config.chart.colorPrimary.toString())}, {
            label: "Sales 4",
            data: 52,
            color: tinycolor(config.chart.colorPrimary.toString()).darken(10)
        }], a = ($.plot($("#flot-pie-chart"), r, {
            series: {pie: {show: !0}},
            grid: {hoverable: !0},
            tooltip: !0,
            tooltipOpts: {content: "%p.0%, %s", shifts: {x: 20, y: 0}, defaultTheme: !1}
        }), $("#flot-line-chart-moving"));
        a.empty();
        var i = a.outerWidth() / 10 || 100;
        r = [];

        function n() {
            for (r.length && (r = r.slice(1)); r.length < i;) {
                var e = (r.length ? r[r.length - 1] : 50) + 10 * Math.random() - 5;
                r.push(e < 0 ? 0 : 100 < e ? 100 : e)
            }
            for (var o = [], t = 0; t < r.length; ++t) o.push([t, r[t]]);
            return o
        }

        series = [{data: n(), lines: {fill: !0}}];
        var s = $.plot(a, series, {
            grid: {
                color: "#999999",
                tickColor: "#D4D4D4",
                borderWidth: 0,
                minBorderMargin: 20,
                labelMargin: 10,
                backgroundColor: {colors: ["#ffffff", "#ffffff"]},
                margin: {top: 8, bottom: 20, left: 20},
                markings: function (e) {
                    for (var o = [], t = e.xaxis, r = Math.floor(t.min); r < t.max; r += 2 * t.tickSize) o.push({
                        xaxis: {
                            from: r,
                            to: r + t.tickSize
                        }, color: "#fff"
                    });
                    return o
                }
            }, colors: [config.chart.colorPrimary.toString()], xaxis: {
                tickFormatter: function () {
                    return ""
                }
            }, yaxis: {min: 0, max: 110}, legend: {show: !0}
        });
        setInterval(function () {
            series[0].data = n(), s.setData(series), s.draw()
        }, 40);

        function l(e, o) {
            return e.toFixed(o.tickDecimals) + "€"
        }

        function c(e) {
            $.plot($("#flot-line-chart-multi"), [{data: oilprices, label: "Oil price ($)"}, {
                data: exchangerates,
                label: "USD/EUR exchange rate",
                yaxis: 2
            }], {
                xaxes: [{mode: "time"}],
                yaxes: [{min: 0}, {alignTicksWithAxis: "right" == e ? 1 : null, position: e, tickFormatter: l}],
                legend: {position: "sw"},
                colors: [config.chart.colorPrimary.toString()],
                grid: {
                    color: "#999999",
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "#D4D4D4",
                    borderWidth: 0,
                    hoverable: !0
                },
                tooltip: {
                    show: !0, content: "%s for %x was %y", xDateFormat: "%y-%m-%d", onHover: function (e, o) {
                    }
                }
            })
        }

        oilprices = [], exchangerates = [], [[11676924e5, 61.05], [11677788e5, 58.32], [11678652e5, 57.35], [11679516e5, 56.31], [11682108e5, 55.55], [11682972e5, 55.64], [11683836e5, 54.02], [116847e7, 51.88], [11685564e5, 52.99], [11688156e5, 52.99], [1168902e6, 51.21], [11689884e5, 52.24], [11690748e5, 50.48], [11691612e5, 51.99], [11694204e5, 51.13], [11695068e5, 55.04], [11695932e5, 55.37], [11696796e5, 54.23], [1169766e6, 55.42], [11700252e5, 54.01], [11701116e5, 56.97], [1170198e6, 58.14], [11702844e5, 58.14], [11703708e5, 59.02], [117063e7, 58.74], [11707164e5, 58.88], [11708028e5, 57.71], [11708892e5, 59.71], [11709756e5, 59.89], [11712348e5, 57.81], [11713212e5, 59.06], [11714076e5, 58], [1171494e6, 57.99], [11715804e5, 59.39], [11718396e5, 59.39], [1171926e6, 58.07], [11720124e5, 60.07], [11720988e5, 61.14], [11724444e5, 61.39], [11725308e5, 61.46], [11726172e5, 61.79], [11727036e5, 62], [117279e7, 60.07], [11731356e5, 60.69], [1173222e6, 61.82], [11733084e5, 60.05], [1173654e6, 58.91], [11737404e5, 57.93], [11738268e5, 58.16], [11739132e5, 57.55], [11739996e5, 57.11], [11742588e5, 56.59], [11743452e5, 59.61], [1174518e6, 61.69], [11746044e5, 62.28], [117486e7, 62.91], [11749464e5, 62.93], [11750328e5, 64.03], [11751192e5, 66.03], [11752056e5, 65.87], [11754648e5, 64.64], [11756376e5, 64.38], [1175724e6, 64.28], [11758104e5, 64.28], [11760696e5, 61.51], [1176156e6, 61.89], [11762424e5, 62.01], [11763288e5, 63.85], [11764152e5, 63.63], [11766744e5, 63.61], [11767608e5, 63.1], [11768472e5, 63.13], [11769336e5, 61.83], [117702e7, 63.38], [11772792e5, 64.58], [1177452e6, 65.84], [11775384e5, 65.06], [11776248e5, 66.46], [1177884e6, 64.4], [11780568e5, 63.68], [11781432e5, 63.19], [11782296e5, 61.93], [11784888e5, 61.47], [11785752e5, 61.55], [1178748e6, 61.81], [11788344e5, 62.37], [11790936e5, 62.46], [117918e7, 63.17], [11792664e5, 62.55], [11793528e5, 64.94], [11796984e5, 66.27], [11797848e5, 65.5], [11798712e5, 65.77], [11799576e5, 64.18], [1180044e6, 65.2], [11803896e5, 63.15], [1180476e6, 63.49], [11805624e5, 65.08], [1180908e6, 66.3], [11809944e5, 65.96], [11811672e5, 66.93], [11812536e5, 65.98], [11815992e5, 65.35], [11816856e5, 66.26], [11818584e5, 68], [11821176e5, 69.09], [1182204e6, 69.1], [11822904e5, 68.19], [11823768e5, 68.19], [11824632e5, 69.14], [11827224e5, 68.19], [11828088e5, 67.77], [11828952e5, 68.97], [11829816e5, 69.57], [1183068e6, 70.68], [11833272e5, 71.09], [11834136e5, 70.92], [11835864e5, 71.81], [11836728e5, 72.81], [1183932e6, 72.19], [11840184e5, 72.56], [11841912e5, 72.5], [11842776e5, 74.15], [11846232e5, 75.05], [1184796e6, 75.92], [11848824e5, 75.57], [11851416e5, 74.89], [1185228e6, 73.56], [11853144e5, 75.57], [11854008e5, 74.95], [11854872e5, 76.83], [11858328e5, 78.21], [11859192e5, 76.53], [11860056e5, 76.86], [1186092e6, 76], [11864376e5, 71.59], [11866968e5, 71.47], [1186956e6, 71.62], [11870424e5, 71], [11873016e5, 71.98], [11875608e5, 71.12], [11876472e5, 69.47], [11877336e5, 69.26], [118782e7, 69.83], [11879064e5, 71.09], [11881656e5, 71.73], [11883384e5, 73.36], [11885112e5, 74.04], [11888568e5, 76.3], [1189116e6, 77.49], [11894616e5, 78.23], [1189548e6, 79.91], [11896344e5, 80.09], [11897208e5, 79.1], [118998e7, 80.57], [11900664e5, 81.93], [11902392e5, 83.32], [11903256e5, 81.62], [11905848e5, 80.95], [11906712e5, 79.53], [11907576e5, 80.3], [1190844e6, 82.88], [11909304e5, 81.66], [11911896e5, 80.24], [1191276e6, 80.05], [11913624e5, 79.94], [11914488e5, 81.44], [11915352e5, 81.22], [11917944e5, 79.02], [11918808e5, 80.26], [11919672e5, 80.3], [11920536e5, 83.08], [119214e7, 83.69], [11923992e5, 86.13], [11924856e5, 87.61], [1192572e6, 87.4], [11926584e5, 89.47], [11927448e5, 88.6], [1193004e6, 87.56], [11930904e5, 87.56], [11931768e5, 87.1], [11932632e5, 91.86], [11936124e5, 93.53], [11936988e5, 94.53], [11938716e5, 95.93], [11942172e5, 93.98], [11943036e5, 96.37], [11944764e5, 95.46], [11945628e5, 96.32], [11950812e5, 93.43], [11951676e5, 95.1], [11954268e5, 94.64], [11955132e5, 95.1], [11960316e5, 97.7], [1196118e6, 94.42], [11962044e5, 90.62], [11962908e5, 91.01], [11963772e5, 88.71], [11966364e5, 88.32], [11968092e5, 90.23], [1196982e6, 88.28], [11972412e5, 87.86], [11973276e5, 90.02], [1197414e6, 92.25], [11975868e5, 90.63], [1197846e6, 90.63], [11979324e5, 90.49], [11980188e5, 91.24], [11981052e5, 91.06], [11981916e5, 90.49], [119871e7, 96.62], [11987964e5, 96], [1199142e6, 99.62], [11993148e5, 99.18], [11994012e5, 95.09], [11996604e5, 96.33], [11998332e5, 95.67], [12003516e5, 91.9], [1200438e6, 90.84], [12005244e5, 90.13], [12006108e5, 90.57], [12009564e5, 89.21], [12010428e5, 86.99], [12011292e5, 89.85], [12014748e5, 90.99], [12015612e5, 91.64], [12016476e5, 92.33], [1201734e6, 91.75], [12020796e5, 90.02], [1202166e6, 88.41], [12022524e5, 87.14], [12023388e5, 88.11], [12024252e5, 91.77], [12027708e5, 92.78], [12028572e5, 93.27], [12029436e5, 95.46], [120303e7, 95.46], [12032892e5, 101.74], [1203462e6, 98.81], [1203894e6, 100.88], [12040668e5, 99.64], [12041532e5, 102.59], [12042396e5, 101.84], [12044988e5, 99.52], [12045852e5, 99.52], [12046716e5, 104.52], [1204758e6, 105.47], [12048444e5, 105.15], [12051036e5, 108.75], [12052764e5, 109.92], [12053628e5, 110.33], [12054492e5, 110.21], [12057084e5, 105.68], [12059676e5, 101.84], [12063132e5, 100.86], [12063996e5, 101.22], [1206486e6, 105.9], [12065724e5, 107.58], [12066588e5, 105.62], [12069144e5, 101.58], [12070008e5, 100.98], [12071736e5, 103.83], [120726e7, 106.23], [12076056e5, 108.5], [12077784e5, 110.11], [12078648e5, 110.14], [12082104e5, 113.79], [12082968e5, 114.93], [12083832e5, 114.86], [12087288e5, 117.48], [12088152e5, 118.3], [1208988e6, 116.06], [12090744e5, 118.52], [12093336e5, 118.75], [120942e7, 113.46], [12095928e5, 112.52], [12100248e5, 121.84], [12101112e5, 123.53], [12101976e5, 123.69], [12105432e5, 124.23], [12106296e5, 125.8], [1210716e6, 126.29], [1211148e6, 127.05], [12113208e5, 129.07], [12114936e5, 132.19], [12118392e5, 128.85], [12123576e5, 127.76], [12127032e5, 138.54], [12129624e5, 136.8], [12131352e5, 136.38], [1213308e6, 134.86], [12136536e5, 134.01], [121374e7, 136.68], [12139128e5, 135.65], [1214172e6, 134.62], [12142584e5, 134.62], [12143448e5, 134.62], [12144312e5, 139.64], [12145176e5, 140.21], [12147768e5, 140], [12148632e5, 140.97], [12149496e5, 143.57], [1215036e6, 145.29], [12153816e5, 141.37], [1215468e6, 136.04], [12157272e5, 146.4], [12159864e5, 145.18], [12160728e5, 138.74], [12161592e5, 134.6], [12162456e5, 129.29], [1216332e6, 130.65], [12166776e5, 127.95], [12168504e5, 127.95], [12172824e5, 122.19], [12174552e5, 124.08], [12175416e5, 125.1], [12178008e5, 121.41], [12178872e5, 119.17], [12179736e5, 118.58], [121806e7, 120.02], [12184056e5, 114.45], [1218492e6, 113.01], [12185784e5, 116], [12187512e5, 113.77], [12190104e5, 112.87], [12190968e5, 114.53], [12192696e5, 114.98], [1219356e6, 114.98], [12197016e5, 116.27], [1219788e6, 118.15], [12198744e5, 115.59], [12199608e5, 115.46], [12203064e5, 109.71], [12203928e5, 109.35], [12205656e5, 106.23], [12208248e5, 106.34]].map(function (e, o) {
            o % 8 == 0 && oilprices.push(e)
        }), [[1167606e6, .758], [11676924e5, .758], [11677788e5, .7547], [11678652e5, .7549], [11679516e5, .7613], [1168038e6, .7655], [11681244e5, .7693], [11682108e5, .7694], [11682972e5, .7688], [11683836e5, .7678], [116847e7, .7708], [11685564e5, .7727], [11686428e5, .7749], [11687292e5, .7741], [11688156e5, .7741], [1168902e6, .7732], [11689884e5, .7727], [11690748e5, .7737], [11691612e5, .7724], [11692476e5, .7712], [1169334e6, .772], [11694204e5, .7721], [11695068e5, .7717], [11695932e5, .7704], [11696796e5, .769], [1169766e6, .7711], [11698524e5, .774], [11699388e5, .7745], [11700252e5, .7745], [11701116e5, .774], [1170198e6, .7716], [11702844e5, .7713], [11703708e5, .7678], [11704572e5, .7688], [11705436e5, .7718], [117063e7, .7718], [11707164e5, .7728], [11708028e5, .7729], [11708892e5, .7698], [11709756e5, .7685], [1171062e6, .7681], [11711484e5, .769], [11712348e5, .769], [11713212e5, .7698], [11714076e5, .7699], [1171494e6, .7651], [11715804e5, .7613], [11716668e5, .7616], [11717532e5, .7614], [11718396e5, .7614], [1171926e6, .7607], [11720124e5, .7602], [11720988e5, .7611], [11721852e5, .7622], [11722716e5, .7615], [1172358e6, .7598], [11724444e5, .7598], [11725308e5, .7592], [11726172e5, .7573], [11727036e5, .7566], [117279e7, .7567], [11728764e5, .7591], [11729628e5, .7582], [11730492e5, .7585], [11731356e5, .7613], [1173222e6, .7631], [11733084e5, .7615], [11733948e5, .76], [11734812e5, .7613], [11735676e5, .7627], [1173654e6, .7627], [11737404e5, .7608], [11738268e5, .7583], [11739132e5, .7575], [11739996e5, .7562], [1174086e6, .752], [11741724e5, .7512], [11742588e5, .7512], [11743452e5, .7517], [11744316e5, .752], [1174518e6, .7511], [11746044e5, .748], [11746908e5, .7509], [11747772e5, .7531], [117486e7, .7531], [11749464e5, .7527], [11750328e5, .7498], [11751192e5, .7493], [11752056e5, .7504], [1175292e6, .75], [11753784e5, .7491], [11754648e5, .7491], [11755512e5, .7485], [11756376e5, .7484], [1175724e6, .7492], [11758104e5, .7471], [11758968e5, .7459], [11759832e5, .7477], [11760696e5, .7477], [1176156e6, .7483], [11762424e5, .7458], [11763288e5, .7448], [11764152e5, .743], [11765016e5, .7399], [1176588e6, .7395], [11766744e5, .7395], [11767608e5, .7378], [11768472e5, .7382], [11769336e5, .7362], [117702e7, .7355], [11771064e5, .7348], [11771928e5, .7361], [11772792e5, .7361], [11773656e5, .7365], [1177452e6, .7362], [11775384e5, .7331], [11776248e5, .7339], [11777112e5, .7344], [11777976e5, .7327], [1177884e6, .7327], [11779704e5, .7336], [11780568e5, .7333], [11781432e5, .7359], [11782296e5, .7359], [1178316e6, .7372], [11784024e5, .736], [11784888e5, .736], [11785752e5, .735], [11786616e5, .7365], [1178748e6, .7384], [11788344e5, .7395], [11789208e5, .7413], [11790072e5, .7397], [11790936e5, .7396], [117918e7, .7385], [11792664e5, .7378], [11793528e5, .7366], [11794392e5, .74], [11795256e5, .7411], [1179612e6, .7406], [11796984e5, .7405], [11797848e5, .7414], [11798712e5, .7431], [11799576e5, .7431], [1180044e6, .7438], [11801304e5, .7443], [11802168e5, .7443], [11803032e5, .7443], [11803896e5, .7434], [1180476e6, .7429], [11805624e5, .7442], [11806488e5, .744], [11807352e5, .7439], [11808216e5, .7437], [1180908e6, .7437], [11809944e5, .7429], [11810808e5, .7403], [11811672e5, .7399], [11812536e5, .7418], [118134e7, .7468], [11814264e5, .748], [11815128e5, .748], [11815992e5, .749], [11816856e5, .7494], [1181772e6, .7522], [11818584e5, .7515], [11819448e5, .7502], [11820312e5, .7472], [11821176e5, .7472], [1182204e6, .7462], [11822904e5, .7455], [11823768e5, .7449], [11824632e5, .7467], [11825496e5, .7458], [1182636e6, .7427], [11827224e5, .7427], [11828088e5, .743], [11828952e5, .7429], [11829816e5, .744], [1183068e6, .743], [11831544e5, .7422], [11832408e5, .7388], [11833272e5, .7388], [11834136e5, .7369], [11835e8, .7345], [11835864e5, .7345], [11836728e5, .7345], [11837592e5, .7352], [11838456e5, .7341], [1183932e6, .7341], [11840184e5, .734], [11841048e5, .7324], [11841912e5, .7272], [11842776e5, .7264], [1184364e6, .7255], [11844504e5, .7258], [11845368e5, .7258], [11846232e5, .7256], [11847096e5, .7257], [1184796e6, .7247], [11848824e5, .7243], [11849688e5, .7244], [11850552e5, .7235], [11851416e5, .7235], [1185228e6, .7235], [11853144e5, .7235], [11854008e5, .7262], [11854872e5, .7288], [11855736e5, .7301], [118566e7, .7337], [11857464e5, .7337], [11858328e5, .7324], [11859192e5, .7297], [11860056e5, .7317], [1186092e6, .7315], [11861784e5, .7288], [11862648e5, .7263], [11863512e5, .7263], [11864376e5, .7242], [1186524e6, .7253], [11866104e5, .7264], [11866968e5, .727], [11867832e5, .7312], [11868696e5, .7305], [1186956e6, .7305], [11870424e5, .7318], [11871288e5, .7358], [11872152e5, .7409], [11873016e5, .7454], [1187388e6, .7437], [11874744e5, .7424], [11875608e5, .7424], [11876472e5, .7415], [11877336e5, .7419], [118782e7, .7414], [11879064e5, .7377], [11879928e5, .7355], [11880792e5, .7315], [11881656e5, .7315], [1188252e6, .732], [11883384e5, .7332], [11884248e5, .7346], [11885112e5, .7328], [11885976e5, .7323], [1188684e6, .734], [11887704e5, .734], [11888568e5, .7336], [11889432e5, .7351], [11890296e5, .7346], [1189116e6, .7321], [11892024e5, .7294], [11892888e5, .7266], [11893752e5, .7266], [11894616e5, .7254], [1189548e6, .7242], [11896344e5, .7213], [11897208e5, .7197], [11898072e5, .7209], [11898936e5, .721], [118998e7, .721], [11900664e5, .721], [11901528e5, .7209], [11902392e5, .7159], [11903256e5, .7133], [1190412e6, .7105], [11904984e5, .7099], [11905848e5, .7099], [11906712e5, .7093], [11907576e5, .7093], [1190844e6, .7076], [11909304e5, .707], [11910168e5, .7049], [11911032e5, .7012], [11911896e5, .7011], [1191276e6, .7019], [11913624e5, .7046], [11914488e5, .7063], [11915352e5, .7089], [11916216e5, .7077], [1191708e6, .7077], [11917944e5, .7077], [11918808e5, .7091], [11919672e5, .7118], [11920536e5, .7079], [119214e7, .7053], [11922264e5, .705], [11923128e5, .7055], [11923992e5, .7055], [11924856e5, .7045], [1192572e6, .7051], [11926584e5, .7051], [11927448e5, .7017], [11928312e5, .7], [11929176e5, .6995], [1193004e6, .6994], [11930904e5, .7014], [11931768e5, .7036], [11932632e5, .7021], [11933496e5, .7002], [1193436e6, .6967], [11935224e5, .695], [11936124e5, .695], [11936988e5, .6939], [11937852e5, .694], [11938716e5, .6922], [1193958e6, .6919], [11940444e5, .6914], [11941308e5, .6894], [11942172e5, .6891], [11943036e5, .6904], [119439e7, .689], [11944764e5, .6834], [11945628e5, .6823], [11946492e5, .6807], [11947356e5, .6815], [1194822e6, .6815], [11949084e5, .6847], [11949948e5, .6859], [11950812e5, .6822], [11951676e5, .6827], [1195254e6, .6837], [11953404e5, .6823], [11954268e5, .6822], [11955132e5, .6822], [11955996e5, .6792], [1195686e6, .6746], [11957724e5, .6735], [11958588e5, .6731], [11959452e5, .6742], [11960316e5, .6744], [1196118e6, .6739], [11962044e5, .6731], [11962908e5, .6761], [11963772e5, .6761], [11964636e5, .6785], [119655e7, .6818], [11966364e5, .6836], [11967228e5, .6823], [11968092e5, .6805], [11968956e5, .6793], [1196982e6, .6849], [11970684e5, .6833], [11971548e5, .6825], [11972412e5, .6825], [11973276e5, .6816], [1197414e6, .6799], [11975004e5, .6813], [11975868e5, .6809], [11976732e5, .6868], [11977596e5, .6933], [1197846e6, .6933], [11979324e5, .6945], [11980188e5, .6944], [11981052e5, .6946], [11981916e5, .6964], [1198278e6, .6965], [11983644e5, .6956], [11984508e5, .6956], [11985372e5, .695], [11986236e5, .6948], [119871e7, .6928], [11987964e5, .6887], [11988828e5, .6824], [11989692e5, .6794], [11990556e5, .6794], [1199142e6, .6803], [11992284e5, .6855], [11993148e5, .6824], [11994012e5, .6791], [11994876e5, .6783], [1199574e6, .6785], [11996604e5, .6785], [11997468e5, .6797], [11998332e5, .68], [11999196e5, .6803], [1200006e6, .6805], [12000924e5, .676], [12001788e5, .677], [12002652e5, .677], [12003516e5, .6736], [1200438e6, .6726], [12005244e5, .6764], [12006108e5, .6821], [12006972e5, .6831], [12007836e5, .6842], [120087e7, .6842], [12009564e5, .6887], [12010428e5, .6903], [12011292e5, .6848], [12012156e5, .6824], [1201302e6, .6788], [12013884e5, .6814], [12014748e5, .6814], [12015612e5, .6797], [12016476e5, .6769], [1201734e6, .6765], [12018204e5, .6733], [12019068e5, .6729], [12019932e5, .6758], [12020796e5, .6758], [1202166e6, .675], [12022524e5, .678], [12023388e5, .6833], [12024252e5, .6856], [12025116e5, .6903], [1202598e6, .6896], [12026844e5, .6896], [12027708e5, .6882], [12028572e5, .6879], [12029436e5, .6862], [120303e7, .6852], [12031164e5, .6823], [12032028e5, .6813], [12032892e5, .6813], [12033756e5, .6822], [1203462e6, .6802], [12035484e5, .6802], [12036348e5, .6784], [12037212e5, .6748], [12038076e5, .6747], [1203894e6, .6747], [12039804e5, .6748], [12040668e5, .6733], [12041532e5, .665], [12042396e5, .6611], [1204326e6, .6583], [12044124e5, .659], [12044988e5, .659], [12045852e5, .6581], [12046716e5, .6578], [1204758e6, .6574], [12048444e5, .6532], [12049308e5, .6502], [12050172e5, .6514], [12051036e5, .6514], [120519e7, .6507], [12052764e5, .651], [12053628e5, .6489], [12054492e5, .6424], [12055356e5, .6406], [1205622e6, .6382], [12057084e5, .6382], [12057948e5, .6341], [12058812e5, .6344], [12059676e5, .6378], [1206054e6, .6439], [12061404e5, .6478], [12062268e5, .6481], [12063132e5, .6481], [12063996e5, .6494], [1206486e6, .6438], [12065724e5, .6377], [12066588e5, .6329], [12067452e5, .6336], [12068316e5, .6333], [12069144e5, .6333], [12070008e5, .633], [12070872e5, .6371], [12071736e5, .6403], [120726e7, .6396], [12073464e5, .6364], [12074328e5, .6356], [12075192e5, .6356], [12076056e5, .6368], [1207692e6, .6357], [12077784e5, .6354], [12078648e5, .632], [12079512e5, .6332], [12080376e5, .6328], [1208124e6, .6331], [12082104e5, .6342], [12082968e5, .6321], [12083832e5, .6302], [12084696e5, .6278], [1208556e6, .6308], [12086424e5, .6324], [12087288e5, .6324], [12088152e5, .6307], [12089016e5, .6277], [1208988e6, .6269], [12090744e5, .6335], [12091608e5, .6392], [12092472e5, .64], [12093336e5, .6401], [120942e7, .6396], [12095064e5, .6407], [12095928e5, .6423], [12096792e5, .6429], [12097656e5, .6472], [1209852e6, .6485], [12099384e5, .6486], [12100248e5, .6467], [12101112e5, .6444], [12101976e5, .6467], [1210284e6, .6509], [12103704e5, .6478], [12104568e5, .6461], [12105432e5, .6461], [12106296e5, .6468], [1210716e6, .6449], [12108024e5, .647], [12108888e5, .6461], [12109752e5, .6452], [12110616e5, .6422], [1211148e6, .6422], [12112344e5, .6425], [12113208e5, .6414], [12114072e5, .6366], [12114936e5, .6346], [121158e7, .635], [12116664e5, .6346], [12117528e5, .6346], [12118392e5, .6343], [12119256e5, .6346], [1212012e6, .6379], [12120984e5, .6416], [12121848e5, .6442], [12122712e5, .6431], [12123576e5, .6431], [1212444e6, .6435], [12125304e5, .644], [12126168e5, .6473], [12127032e5, .6469], [12127896e5, .6386], [1212876e6, .6356], [12129624e5, .634], [12130488e5, .6346], [12131352e5, .643], [12132216e5, .6452], [1213308e6, .6467], [12133944e5, .6506], [12134808e5, .6504], [12135672e5, .6503], [12136536e5, .6481], [121374e7, .6451], [12138264e5, .645], [12139128e5, .6441], [12139992e5, .6414], [12140856e5, .6409], [1214172e6, .6409], [12142584e5, .6428], [12143448e5, .6431], [12144312e5, .6418], [12145176e5, .6371], [1214604e6, .6349], [12146904e5, .6333], [12147768e5, .6334], [12148632e5, .6338], [12149496e5, .6342], [1215036e6, .632], [12151224e5, .6318], [12152088e5, .637], [12152952e5, .6368], [12153816e5, .6368], [1215468e6, .6383], [12155544e5, .6371], [12156408e5, .6371], [12157272e5, .6355], [12158136e5, .632], [12159e8, .6277], [12159864e5, .6276], [12160728e5, .6291], [12161592e5, .6274], [12162456e5, .6293], [1216332e6, .6311], [12164184e5, .631], [12165048e5, .6312], [12165912e5, .6312], [12166776e5, .6304], [1216764e6, .6294], [12168504e5, .6348], [12169368e5, .6378], [12170232e5, .6368], [12171096e5, .6368], [1217196e6, .6368], [12172824e5, .636], [12173688e5, .637], [12174552e5, .6418], [12175416e5, .6411], [1217628e6, .6435], [12177144e5, .6427], [12178008e5, .6427], [12178872e5, .6419], [12179736e5, .6446], [121806e7, .6468], [12181464e5, .6487], [12182328e5, .6594], [12183192e5, .6666], [12184056e5, .6666], [1218492e6, .6678], [12185784e5, .6712], [12186648e5, .6705], [12187512e5, .6718], [12188376e5, .6784], [1218924e6, .6811], [12190104e5, .6811], [12190968e5, .6794], [12191832e5, .6804], [12192696e5, .6781], [1219356e6, .6756], [12194424e5, .6735], [12195288e5, .6763], [12196152e5, .6762], [12197016e5, .6777], [1219788e6, .6815], [12198744e5, .6802], [12199608e5, .678], [12200472e5, .6796], [12201336e5, .6817], [122022e7, .6817], [12203064e5, .6832], [12203928e5, .6877], [12204792e5, .6912], [12205656e5, .6914], [1220652e6, .7009], [12207384e5, .7012], [12208248e5, .701], [12209112e5, .7005]].map(function (e, o) {
            o % 8 == 0 && exchangerates.push(e)
        }), c("right"), $("button").click(function () {
            c($(this).text())
        })
    }

    e(), $(document).on("themechange", function () {
        e()
    })
}), $(function () {
    if (!$("#morris-one-line-chart").length) return !1;

    function e() {
        $("#morris-one-line-chart").empty(), Morris.Line({
            element: "morris-one-line-chart",
            data: [{year: "2008", value: 5}, {year: "2009", value: 10}, {year: "2010", value: 8}, {
                year: "2011",
                value: 22
            }, {year: "2012", value: 8}, {year: "2014", value: 10}, {year: "2015", value: 5}],
            xkey: "year",
            ykeys: ["value"],
            resize: !0,
            lineWidth: 4,
            labels: ["Value"],
            lineColors: [config.chart.colorPrimary.toString()],
            pointSize: 5
        }), $("#morris-area-chart").empty(), Morris.Area({
            element: "morris-area-chart",
            data: [{period: "2010 Q1", iphone: 2666, ipad: null, itouch: 2647}, {
                period: "2010 Q2",
                iphone: 2778,
                ipad: 2294,
                itouch: 2441
            }, {period: "2010 Q3", iphone: 4912, ipad: 1969, itouch: 2501}, {
                period: "2010 Q4",
                iphone: 3767,
                ipad: 3597,
                itouch: 5689
            }, {period: "2011 Q1", iphone: 6810, ipad: 1914, itouch: 2293}, {
                period: "2011 Q2",
                iphone: 5670,
                ipad: 4293,
                itouch: 1881
            }, {period: "2011 Q3", iphone: 4820, ipad: 3795, itouch: 1588}, {
                period: "2011 Q4",
                iphone: 15073,
                ipad: 5967,
                itouch: 5175
            }, {period: "2012 Q1", iphone: 10687, ipad: 4460, itouch: 2028}, {
                period: "2012 Q2",
                iphone: 8432,
                ipad: 5713,
                itouch: 1791
            }],
            xkey: "period",
            ykeys: ["iphone", "ipad", "itouch"],
            labels: ["iPhone", "iPad", "iPod Touch"],
            pointSize: 2,
            hideHover: "auto",
            resize: !0,
            lineColors: [tinycolor(config.chart.colorPrimary.toString()).lighten(10).toString(), tinycolor(config.chart.colorPrimary.toString()).darken(10).toString(), config.chart.colorPrimary.toString()],
            lineWidth: 2,
            pointSize: 1
        }), $("#morris-donut-chart").empty(), Morris.Donut({
            element: "morris-donut-chart",
            data: [{label: "Download Sales", value: 12}, {
                label: "In-Store Sales",
                value: 30
            }, {label: "Mail-Order Sales", value: 20}],
            resize: !0,
            colors: [tinycolor(config.chart.colorPrimary.toString()).lighten(10).toString(), tinycolor(config.chart.colorPrimary.toString()).darken(10).toString(), config.chart.colorPrimary.toString()]
        }), $("#morris-bar-chart").empty(), Morris.Bar({
            element: "morris-bar-chart",
            data: [{y: "2006", a: 60, b: 50}, {y: "2007", a: 75, b: 65}, {y: "2008", a: 50, b: 40}, {
                y: "2009",
                a: 75,
                b: 65
            }, {y: "2010", a: 50, b: 40}, {y: "2011", a: 75, b: 65}, {y: "2012", a: 100, b: 90}],
            xkey: "y",
            ykeys: ["a", "b"],
            labels: ["Series A", "Series B"],
            hideHover: "auto",
            resize: !0,
            barColors: [config.chart.colorPrimary.toString(), tinycolor(config.chart.colorPrimary.toString()).darken(10).toString()]
        }), $("#morris-line-chart").empty(), Morris.Line({
            element: "morris-line-chart",
            data: [{y: "2006", a: 100, b: 90}, {y: "2007", a: 75, b: 65}, {y: "2008", a: 50, b: 40}, {
                y: "2009",
                a: 75,
                b: 65
            }, {y: "2010", a: 50, b: 40}, {y: "2011", a: 75, b: 65}, {y: "2012", a: 100, b: 90}],
            xkey: "y",
            ykeys: ["a", "b"],
            labels: ["Series A", "Series B"],
            hideHover: "auto",
            resize: !0,
            lineColors: [config.chart.colorPrimary.toString(), tinycolor(config.chart.colorPrimary.toString()).darken(10).toString()]
        })
    }

    e(), $(document).on("themechange", function () {
        e()
    })
}), $(function () {
    if (!$("#dashboard-visits-chart").length) return !1;
    a();
    var o = null, t = "visits";

    function r(e) {
        var o = "#dashboard-" + e + "-chart";
        switch ($(o).has("svg").length && $(o).empty(), e) {
            case"visits":
                a();
                break;
            case"downloads":
                Morris.Bar({
                    element: "dashboard-downloads-chart",
                    data: [{year: "2006", downloads: 1300}, {year: "2007", downloads: 1526}, {
                        year: "2008",
                        downloads: 2e3
                    }, {year: "2009", downloads: 1800}, {year: "2010", downloads: 1650}, {
                        year: "2011",
                        downloads: 620
                    }, {year: "2012", downloads: 1e3}, {year: "2013", downloads: 1896}, {
                        year: "2014",
                        downloads: 850
                    }, {year: "2015", downloads: 1500}],
                    xkey: "year",
                    ykeys: ["downloads"],
                    labels: ["Downloads"],
                    hideHover: "auto",
                    resize: !0,
                    barColors: [config.chart.colorPrimary.toString(), tinycolor(config.chart.colorPrimary.toString()).darken(10).toString()]
                })
        }
    }

    function a() {
        Morris.Line({
            element: "dashboard-visits-chart",
            data: [{x: "2015-09-01", y: 70}, {x: "2015-09-02", y: 75}, {x: "2015-09-03", y: 50}, {
                x: "2015-09-04",
                y: 75
            }, {x: "2015-09-05", y: 50}, {x: "2015-09-06", y: 75}, {x: "2015-09-07", y: 86}],
            xkey: "x",
            ykeys: ["y"],
            ymin: "auto 40",
            labels: ["Visits"],
            xLabels: "day",
            hideHover: "auto",
            yLabelFormat: function (e) {
                return e === parseInt(e, 10) ? e : ""
            },
            resize: !0,
            lineColors: [config.chart.colorSecondary.toString()],
            pointFillColors: [config.chart.colorPrimary.toString()]
        })
    }

    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
        o = e.target, r(t = $(o).attr("href").replace("#", ""))
    }), $(document).on("themechange", function () {
        r(t)
    })
}), $(function () {
    function e() {
        $(".dashboard-page .items .sparkline").each(function () {
            var e = $(this).data("type");
            if ($(this).data("data")) var o = $(this).data("data").split(",").map(function (e) {
                return 0 < e.indexOf(":") ? e.split(":") : e
            }); else {
                o = [];
                for (var t = 0; t < 17; t++) o.push(Math.round(100 * Math.random()))
            }
            $(this).sparkline(o, {barColor: config.chart.colorPrimary.toString(), height: $(this).height(), type: e})
        })
    }

    e(), $(document).on("themechange", function () {
        e()
    })
}), $(function () {
    var e = $("#dashboard-sales-breakdown-chart");
    if (!e.length) return !1;

    function o() {
        e.empty(), Morris.Donut({
            element: "dashboard-sales-breakdown-chart",
            data: [{label: "Download Sales", value: 12}, {
                label: "In-Store Sales",
                value: 30
            }, {label: "Mail-Order Sales", value: 20}],
            resize: !0,
            colors: [tinycolor(config.chart.colorPrimary.toString()).lighten(10).toString(), tinycolor(config.chart.colorPrimary.toString()).darken(8).toString(), config.chart.colorPrimary.toString()]
        }), setSameHeights(e.closest(".sameheight-container"))
    }

    o(), $(document).on("themechange", function () {
        o()
    })
}), $(function () {
    var r = $("#dashboard-sales-map");
    if (!r.length) return !1;

    function e() {
        r.empty();
        var e = config.chart.colorPrimary.toHexString(),
            o = tinycolor(config.chart.colorPrimary.toString()).darken(40).toHexString(),
            t = tinycolor(config.chart.colorPrimary.toString()).darken(10).toHexString();
        r.vectorMap({
            map: "world_en",
            backgroundColor: "transparent",
            color: "#E5E3E5",
            hoverOpacity: .7,
            selectedColor: t,
            enableZoom: !0,
            showTooltip: !0,
            values: {us: 2e3, ru: 2e3, gb: 1e4, fr: 1e4, de: 1e4, cn: 1e4, in: 1e4, sa: 1e4, ca: 1e4, br: 5e3, au: 5e3},
            scaleColors: [e, o],
            normalizeFunction: "linear"
        })
    }

    e(), $(document).on("themechange", function () {
        e()
    })
}), $(function () {
    $(".actions-list > li").on("click", ".check", function (e) {
        e.preventDefault(), $(this).parents(".tasks-item").find(".checkbox").prop("checked", !0), removeActionList()
    })
}), $(function () {
    if (!$("#select-all-items").length) return !1;

    function e() {
        $(".items-list-page .sparkline").each(function () {
            for (var e = $(this).data("type"), o = [], t = 0; t < 17; t++) o.push(Math.round(100 * Math.random()));
            $(this).sparkline(o, {barColor: config.chart.colorPrimary.toString(), height: $(this).height(), type: e})
        })
    }

    $("#select-all-items").on("change", function () {
        var e = $(this).children(":checkbox").get(0);
        $(this).parents("li").siblings().find(":checkbox").prop("checked", e.checked).val(e.checked).change()
    }), e(), $(document).on("themechange", function () {
        e()
    })
}), $(function () {
    new Sortable($(".images-container").get(0), {
        animation: 150,
        handle: ".control-btn.move",
        draggable: ".image-container",
        onMove: function (e) {
            if ($(e.related).hasClass("add-image")) return !1
        }
    });
    $controlsButtons = $(".controls"), $controlsButtonsStar = $controlsButtons.find(".star"), $controlsButtonsRemove = $controlsButtons.find(".remove"), $controlsButtonsStar.on("click", function (e) {
        e.preventDefault(), $controlsButtonsStar.removeClass("active"), $controlsButtonsStar.parents(".image-container").removeClass("main"), $(this).addClass("active"), $(this).parents(".image-container").addClass("main")
    })
}), $(function () {
    if (!$(".form-control").length) return !1;
    $(".form-control").focus(function () {
        $(this).siblings(".input-group-addon").addClass("focus")
    }), $(".form-control").blur(function () {
        $(this).siblings(".input-group-addon").removeClass("focus")
    })
});
var modalMedia = {
    $el: $("#modal-media"), result: {}, options: {}, open: function (e) {
        e = e || {}, this.options = e, this.$el.modal("show")
    }, close: function () {
        $.isFunction(this.options.beforeClose) && this.options.beforeClose(this.result), this.$el.modal("hide"), $.isFunction(this.options.afterClose) && this.options.beforeClose(this.result)
    }
};
$(function () {
    var e,
        t = ((e = localStorage.getItem("themeSettings") ? JSON.parse(localStorage.getItem("themeSettings")) : {}).headerPosition = e.headerPosition || "", e.sidebarPosition = e.sidebarPosition || "", e.footerPosition = e.footerPosition || "", e),
        o = $("#app"), r = $("#theme-style"), a = $("#customize-menu"), i = a.find(".color-item"), n = a.find(".radio");

    function s() {
        (function () {
            t.themeName ? r.attr("href", "css/app-" + t.themeName + ".css") : r.attr("href", "/css/app.css");
            return o.removeClass("header-fixed footer-fixed sidebar-fixed"), o.addClass(t.headerPosition), o.addClass(t.footerPosition), o.addClass(t.sidebarPosition), o
        })().delay(config.delayTime).queue(function (e) {
            config.chart.colorPrimary = tinycolor($ref.find(".chart .color-primary").css("color")), config.chart.colorSecondary = tinycolor($ref.find(".chart .color-secondary").css("color")), i.each(function () {
                $(this).data("theme") === t.themeName ? $(this).addClass("active") : $(this).removeClass("active")
            }), n.each(function () {
                var e = $(this).prop("name"), o = $(this).val();
                t[e] === o ? $(this).prop("checked", !0) : $(this).prop("checked", !1)
            }), localStorage.setItem("themeSettings", JSON.stringify(t)), $(document).trigger("themechange"), e()
        })
    }

    s(), i.on("click", function () {
        t.themeName = $(this).data("theme"), s()
    }), n.on("click", function () {
        var e = $(this).prop("name"), o = $(this).val();
        t[e] = o, s()
    })
}), $(function () {
    $("body").addClass("loaded")
}), NProgress.start(), NProgress.done();