window.addEventListener("DOMContentLoaded", function () {
    let btnFeedback = document.getElementById("feedback-btn");
    let elFeedback = document.getElementById("feedback");

    let elForm = elFeedback.querySelector(".feedback-form");
    let btnCloseFeedback = document.getElementById("btn-close-feedback");
    let elName = elFeedback.querySelector(".feedback-name");
    let elEmail = elFeedback.querySelector(".feedback-email");
    let elMessage = elFeedback.querySelector(".feedback-message");

    let elOverlay = document.getElementById("overlay");

    let isStorageSupport = true;
    let storage = {};

    try {
        storage["name"] = localStorage.getItem("name");
        storage["email"] = localStorage.getItem("email");
    } catch (err) {
        isStorageSupport = false;
    }

    btnFeedback.addEventListener("click", function (evt) {
        evt.preventDefault();
        elFeedback.classList.add("modal--show");
        elOverlay.classList.add("overlay--show");
        emptyFields();

        if (storage) {
            elName.value = storage["name"];
            elEmail.value = storage["email"];
            elMessage.focus();
        } else {
            elName.focus();
        }
    });

    btnCloseFeedback.addEventListener("click", function (evt) {
        evt.preventDefault();
        elFeedback.classList.remove("modal--show");
        elOverlay.classList.remove("overlay--show");
    });

    document.addEventListener("keydown", function (evt) {
        if (evt.key === "Escape") {
            if (elFeedback.classList.contains("modal--show")) {
                elFeedback.classList.remove("modal--show");
                elFeedback.classList.remove("modal--error");
                elOverlay.classList.remove("overlay--show");
            }
        }
    });

    elForm.addEventListener("submit", function (evt) {
        if (!elName.value || !elEmail.value || !elMessage.value) {
            evt.preventDefault();
            elFeedback.classList.remove("modal--error");
            elFeedback.offsetWidth = elFeedback.offsetWidth;
            elFeedback.classList.add("modal--error");
            if (!elName)
                elName.focus();
            if (!elEmail)
                elEmail.focus();
            if (!elMessage)
                elMessage.focus();
        } else {
            if (isStorageSupport) {
                localStorage.setItem("name", elName.value);
                localStorage.setItem("email", elEmail.value);
            }
        }
    });

    let emptyFields = function() {
        elName.value = "";
        elEmail.value = "";
        elMessage.value = "";
    };

    // slide-show
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".slider-dot-item");
    let backgrounds = {
        0: "#849D8F",
        1: "#8996A6",
        2: "#9D8B84"
    };

    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function () {
            removeActiveStatusFromDots();
            dots[i].classList.add("slider-dot-item--current");
            removeActiveStatusFromSlides();
            slides[i].classList.add("slide--active");
            document.body.style.backgroundColor = backgrounds[i];
        });
    }

    function removeActiveStatusFromDots() {
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("slider-dot-item--current");
        }
    }

    function removeActiveStatusFromSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("slide--active");
        }
    }

    //map
    ymaps.ready(init);
    function init() {
        let elMap = document.querySelector(".map-image--wrap");
        elMap.classList.toggle("map-image--hide");
        let elInteractiveMap = document.querySelector(".interactive-map");
        elInteractiveMap.classList.toggle("interactive-map--show");

        let myMap = new ymaps.Map("map", {
                center: [59.939300, 30.329350],
                zoom: 16,
                controls: []
            }, {
                searchControlProvider: "yandex#search"
            }),

            MyIconContentLayout = new ymaps.templateLayoutFactory.createClass(
                "<div style='color: #FFFFFF; font-weight: bold;'>$[properties.iconContent]</div>"
            ),

            myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
                hintContent: "",
                balloonContent: ""
            }, {
                iconLayout: "default#image",
                iconImageHref: "img/icons/interactive-map-pin.svg",
                iconImageSize: [218, 142],
                iconImageOffset: [-40, -140]
            });

        myMap.geoObjects.add(myPlacemark);
    }
});
