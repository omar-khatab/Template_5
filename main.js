
// function for control the active class
// function activeClass (target, element) {
//     target.forEach((e) => {
//         e.classList.remove("active")
//     })  
//     element.classList.add("active")
// }

//another method 

function handleActive (ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active")
    });

    ev.target.classList.add("active");
}

// toggle the setting-box 

let gearIcon = document.querySelector(".setting-box .toggle i");
let settingBox= document.querySelector(".setting-box")

gearIcon.onclick = function () {
    settingBox.classList.toggle("appear");
    this.classList.toggle("spinner");
};

// change the mian color in the page

let colorList = document.querySelectorAll(".option-box .list-color li");

colorList.forEach(function (el) {
    el.onclick = function(e) {
        // activeClass(colorList , el);
        handleActive(e);
        document.documentElement.style.cssText = `--main-color:${this.dataset.color}`

        //store the property in local storage
        localStorage.setItem("color" , this.dataset.color);
    };
});


// recover the property from local storage

if (localStorage.getItem("color")) {

    document.documentElement.style.cssText = `--main-color:${localStorage.getItem("color")}`

    colorList.forEach((e) => { 

        e.classList.remove("active")
        // add active class on the target element that exist in the local storage
        if (e.dataset.color === localStorage.getItem("color")) {
            e.classList.add("active") 
        }
    });

    // another method
    // document.querySelector(`[data-color = "${localStorage.getItem("color")}"]`).classList.add("active");
    
}

// random background
let arrBackground= ["1.jpg", "2.jpg" , "3.jpg" , "4.png" , "5.jpg"]


let image = document.querySelector(".landing-page")
let randomControl = document.querySelectorAll(".option-box button");   
let backgroundOption = true;
let randomBackground;

let selectImg = document.querySelectorAll(".option-img img");
let parentImage = document.querySelector(".option-img");


function backgroundRandom () {
    
    if(backgroundOption === true) {

        randomBackground = setInterval(function () {

            let imgRandom = arrBackground[Math.floor(Math.random() * arrBackground.length)]
            
            image.style.cssText = `background-image: url(images/${imgRandom});`
    
        } ,10000);
    } 
    
}

// control on the random background

randomControl.forEach(function (el) {
    el.onclick = function (e) {

        // activeClass(colorList , el);
        handleActive(e);
        //store the property in local storage
        localStorage.setItem("random" , this.textContent);

        if (this.textContent == "Yes") {
            backgroundOption = true;
            backgroundRandom();       
            parentImage.classList.add("event-none");

        } else {

            backgroundOption = false;
            clearInterval(randomBackground);

            parentImage.classList.remove("event-none");
            image.style.cssText = `background-image: url(images/${document.querySelector(".option-img img.active").dataset.img});`
        }
    }
});



if (localStorage.getItem("random")) {


    randomControl.forEach((e) => { 

        e.classList.remove("active")


        // add active class on the target element that exist in the local storage
        if (e.textContent === localStorage.getItem("random")) {
            e.classList.add("active")
        };

        // another method
        // document.querySelector(`[data-color = "${localStorage.getItem("color")}"]`).classList.add("active");
        

    });

    if (localStorage.getItem("random") === "Yes") {
        backgroundOption = true;
        

        parentImage.classList.add("event-none");
        selectImg.forEach((e) => e.classList.remove("active"));
        selectImg[0].classList.add("active");
        
    } else {
        backgroundOption = false;
        parentImage.classList.remove("event-none");
    }

    
}

backgroundRandom();

// select the image

selectImg.forEach((ele) => {
    ele.onclick = (e) => {
        handleActive(e);
        image.style.cssText = `background-image: url(images/${e.target.dataset.img});`
    };
})



// show the progress 

let ourSkills = document.querySelector(".skills");
let skillBox = document.querySelectorAll(".skill-box .skill-progress span");

onscroll = () => {
    let skillOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;

    if (scrollY > skillOffsetTop + skillsOuterHeight - windowHeight ) {
        skillBox.forEach((e) => e.style.width = e.dataset.progress)
    }
} 


// pop box 
let gallery = document.querySelector(".gallery")
let imagesBox = document.querySelectorAll(".gallery .image-box img");

imagesBox.forEach((e) => 
    e.onclick = function () {
        
        let overlay = document.createElement("div");
        overlay.className = "pop-overlay";
        document.body.append(overlay);
        
        let popBox = document.createElement("div");
        popBox.className = "pop-box";
        
        let popImage = document.createElement("img");
        popImage.className = "pop-image";
        popImage.src = e.src;

        
        document.body.append(popBox)
        popBox.append(popImage);


        if(e.alt) {
            
            let imgHeading= document.createElement("h3");

            imgHeading.textContent = e.alt;
            
            
            popBox.prepend(imgHeading)
        }

        let spanClose = document.createElement("span");
        spanClose.className = "close-button";
        spanClose.append("X");

        popBox.append(spanClose);

        // close the pop
        spanClose.onclick = function () {
            this.parentElement.remove();
            overlay.remove();
        }

});


// scroll to the section
let mainNav = document.querySelector(".nav-bullets")
let bullets = document.querySelectorAll(".nav-bullets .bullets");
let mainLinks = document.querySelectorAll(".landing-page a")

function scrollLinks (links) {

    links.forEach((ele) => {
        ele.onclick = function (e) {
            e.preventDefault();
            document.querySelector(`.${ele.dataset.section}`).scrollIntoView ({
                behavior:"smooth"
            })
        }
    })
}

scrollLinks(bullets);
scrollLinks(mainLinks);

// Control on bullets 

let spanOption = document.querySelectorAll(".option-box span");


spanOption.forEach((ele) => {
    ele.addEventListener("click" , function (e) {
        handleActive(e);

        if(ele.dataset.show == "no") {
            mainNav.classList.add("hide");
        } else  mainNav.classList.remove("hide")


        localStorage.setItem("show" , e.target.dataset.show);
    })
})


if(localStorage.getItem("show")) {
    spanOption.forEach((e) => {

        e.classList.remove("active");

    }) 
        if(localStorage.getItem("show") == "no") {
            mainNav.classList.add("hide");
            document.querySelector(".option-box span.no").classList.add("active")
        } else { 
            mainNav.classList.remove("hide")
            document.querySelector(".option-box span.show").classList.add("active")
        }
}


document.querySelector(".reset-button").onclick = function () {
    
    // localStorage.clear();
    localStorage.removeItem("color")
    localStorage.removeItem("random")
    localStorage.removeItem("show")
    location.reload()
}


//toggle header menu 

let listMenu = document.querySelector(".header-area ul");
let toggleMenu = document.querySelector(".header-area .toggle-menu");

toggleMenu.onclick = function (e) {
    // stop propagation to prevent the event to spread to children element
    e.stopPropagation();
    // open and close the menu
    listMenu.classList.toggle("open");
}

listMenu.onclick =  function (e) {
    e.stopPropagation()
}

document.addEventListener("click" , function (e) {
    if(e.target !== toggleMenu && e.target !== listMenu) {
        // check if the open calss existed on the list
        if (listMenu.classList.contains("open")) {
            // remove open class (remove the list)
            listMenu.classList.toggle("open"); 
        }
    }
})