(function ($) {
    "use strict";

    // data-background    
    $(document).on('ready', function () {
        $("[data-background]").each(function () {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
        });
    });


    // wow init
    new WOW().init();


    // hero slider
    var swiper = new Swiper(".swiper", {
        effect: "cube",
        grabCursor: true,
        cubeEffect: {
            shadow: false,
            slideShadows: false,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        loop: true,
        autoplay: true,
    });


    // preloader
    $(window).on('load', function () {
        $(".preloader").fadeOut("slow");
    });


    // lazyload img
    var lazyLoadInstance = new LazyLoad();


    // scroll to top
    $(window).scroll(function () {

        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            $("#scroll-top").fadeIn('slow');
        } else {
            $("#scroll-top").fadeOut('slow');
        }
    });

    $("#scroll-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1500);
        return false;
    });


    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass("fixed-top");
        } else {
            $('.navbar').removeClass("fixed-top");
        }
    });


    class FormHeandler {
        constructor(options) {
            this.formElem = document.querySelector(options.formSelector);
            this.baseURL = options.baseURL;
            this.submitRef = options.submitRef;
            this.qustionID = options.qustionID;
            this.getParams = options.getParams;
            this.getParamString = null;
            this.init();
        }
        getParamsHeandle() {
            if (!this.getParams) return;
            this.getParamString = (new URL(document.location)).searchParams;
            for (const key in this.getParams) {
                if (Object.hasOwnProperty.call(this.getParams, key) && this.getParamString) {
                    this.getParamString = `&${encodeURIComponent(this.getParams[key])}=${encodeURIComponent(this.getParamString)}`;
                    this.formElem.querySelector('input[name="' + key + '"]').value = this.getParamString;
                }
            }
        }
        submitForm(form, url) {
            const formInputs = form.querySelectorAll('input, select, button');
            this.disableFormInputs(formInputs);
            fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                body: new FormData(form)
            }).then(response => {
                if (response.status === 0) {
                    form.reset();
                    this.enableFormInputs(formInputs);
                    this.formElem.classList.add('sent');
                    const successEl = this.formElem.querySelector('.form-success');
                    successEl.classList.add('animate__fadeInUp')
                    // document.location.href = './success.html';
                }

            })
        }
        enableFormInputs(formInputs) {
            formInputs.forEach(element => {
                element.removeAttribute('disabled');
            });
        }
        disableFormInputs(formInputs) {
            formInputs.forEach(element => {
                element.setAttribute('disabled', true);
            });
        }
        init() {
            //   this.getParamsHeandle();
            this.formElem.addEventListener('submit', e => {
                e.preventDefault();
                let resultUrl = "";
                resultUrl += this.baseURL;
                this.qustionID.forEach(element => {
                    for (let key in element) {
                        if (Object.hasOwnProperty.call(element, key)) {
                            const input = e.currentTarget.querySelector('*[name="' + key + '"]');
                            resultUrl += `${encodeURIComponent(element[key])}=${encodeURIComponent(input.value)}&`;
                        }
                    }
                });
                resultUrl = resultUrl.substring(0, resultUrl.length - 1);
                if (this.getParamString) resultUrl += this.getParamString;
                resultUrl += this.submitRef;
                this.formElem.setAttribute('action', resultUrl);
                this.submitForm(e.currentTarget, resultUrl);
            })
        }
    }


    const formHeandler = new FormHeandler({
        formSelector: "#contact-form",
        baseURL: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdQ31FRIWoe66eqOMIe_c-ugvtpIxeXmVKBzuny3MDFbMALZg/formResponse?',
        qustionID: [{
            'name': 'entry.1796285996'
        },
        {
            'phone': 'entry.508015794'
        },
        {
            'type_of_messenger': 'entry.754832629'
        },
        {
            'messenger': 'entry.1434307005'
        },
        ],
        // getParams: {
        //     'utm': 'entry.463003121'
        // },
        submitRef: '&submit=-3939878020348803599'
    });


})(jQuery);