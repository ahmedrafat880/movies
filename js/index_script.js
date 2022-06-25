menuToggleElement = document.getElementById("menuToggle");
menuToggleElement.addEventListener("click", ()=> {
    if ($(".rightNav").css("left") == "250px") {
    $(".leftNav").css("left" ,"-250px");
    $(".rightNav").css("left","0");
    $(".closeBtn").css("display","none");
    $(".showBtn").css("display","block");
    $(".leftNav .menu ul li").animate({"padding-top": "1000px"});
    }
    else if ($(".rightNav").css("left") == "0px") {
    $(".leftNav").css("left" ,"0");
    $(".rightNav").css("left","250px");
    $(".closeBtn").css("display","block");
    $(".showBtn").css("display","none");
    $(".leftNav .menu ul li").animate({"padding-top": "0px"});
    }
})

contentElement = document.querySelector(".movies");
getMovies("now_playing");
nowPlayingOption = document.getElementById("nowPlayingOption");
popularOption = document.getElementById("popularOption");
topRatedOption = document.getElementById("topRatedOption");
trendingOption = document.getElementById("trendingOption");
upcomingOption = document.getElementById("upcomingOption");
nowPlayingOption.addEventListener("click",()=>{

getMovies("now_playing");

});
popularOption.addEventListener("click",()=>{

    getMovies("popular");
    
    });
topRatedOption.addEventListener("click",()=>{

    getMovies("top_rated");
    
    });
trendingOption.addEventListener("click",()=>{

    contentElement.innerHTML="";
    let request = new XMLHttpRequest();
    request.open("GET",`https://api.themoviedb.org/3/trending/movie/week?api_key=2430ce108a14c08f823789eacc1beb6e`);
    request.send();
    request.onload = () => {
       let movies = JSON.parse(request.response)["results"]
       let movieBlock = "";
        for (let i = 0 ;  i < movies.length ; i++) {
            movieBlock += `
            <div class="imageOuter col-md-4 d-inline-block text-center">
                        <img class="img-fluid" src="https://image.tmdb.org/t/p/w500${movies[i]["poster_path"]}">
                        <div class="description">
                            <div class="details">
                            <h1>${movies[i]["original_title"]}</h1>
                            <p>${movies[i]["overview"]}</p>
                            <h6>Rate : <span>${movies[i]["vote_average"]}</span></h6>
                            <h6>${movies[i]["release_date"]}</h6>
                            </div>
                        </div>
                    </div>
            `
        }
        contentElement.innerHTML=movieBlock;
    }
        
        });
        upcomingOption.addEventListener("click",()=>{

            getMovies("upcoming");
            
            });
function getMovies(attribute) {
    contentElement.innerHTML="";
    let request = new XMLHttpRequest();
    request.open("GET",`https://api.themoviedb.org/3/movie/${attribute}?api_key=2430ce108a14c08f823789eacc1beb6e`);
    request.send();
    request.onload = () => {
       let movies = JSON.parse(request.response)["results"]
       let movieBlock = "";
        for (let i = 0 ;  i < movies.length ; i++) {
            movieBlock += `
            <div class="imageOuter col-md-4 d-inline-block text-center">
                        <img class="img-fluid" src="https://image.tmdb.org/t/p/w500${movies[i]["poster_path"]}">
                        <div class="description">
                            <div class="details">
                            <h1>${movies[i]["original_title"]}</h1>
                            <p>${movies[i]["overview"]}</p>
                            <h6>Rate : <span>${movies[i]["vote_average"]}</span></h6>
                            <h6>${movies[i]["release_date"]}</h6>
                            </div>
                        </div>
                    </div>
            `
        }
        contentElement.innerHTML=movieBlock;
    }
}
getMoviesElement = document.getElementById("getMovies");
searchBoxElement = document.getElementById("searchBox");

getMoviesElement.addEventListener("keyup",()=>{
    searchMovies1(getMoviesElement.value);
});
searchBoxElement.addEventListener("keyup",()=>{
    searchMovies2(searchBoxElement.value);
});
function searchMovies1(name) {
    if (name == "") {
        getMovies("now_playing");
    }
    else {
    contentElement.innerHTML="";
    let request = new XMLHttpRequest();
    request.open("GET",`https://api.themoviedb.org/3/search/movie?query=${name}&api_key=2430ce108a14c08f823789eacc1beb6e`);
    request.send();
    request.onload = () => {
       let movies = JSON.parse(request.response)["results"]
       let movieBlock = "";
        for (let i = 0 ;  i < movies.length ; i++) {
            movieBlock += `
            <div class="imageOuter col-md-4 d-inline-block text-center">
                        <img class="img-fluid" src="https://image.tmdb.org/t/p/w500${movies[i]["poster_path"]}">
                        <div class="description">
                            <div class="details">
                            <h1>${movies[i]["original_title"]}</h1>
                            <p>${movies[i]["overview"]}</p>
                            <h6>Rate : <span>${movies[i]["vote_average"]}</span></h6>
                            <h6>${movies[i]["release_date"]}</h6>
                            </div>
                        </div>
                    </div>
            `
        }
        contentElement.innerHTML=movieBlock;
    }
}
}
function searchMovies2(name) {
    if (name == "") {
        getMovies("now_playing");
    }
    else {
        contentElement.innerHTML="";
        let request = new XMLHttpRequest();
        request.open("GET",`https://api.themoviedb.org/3/movie/now_playing?api_key=2430ce108a14c08f823789eacc1beb6e`);
        request.send();
        request.onload = () => {
           let movies = JSON.parse(request.response)["results"]
           let movieBlock = "";
            for (let i = 0 ;  i < movies.length ; i++) {
                movieTitle = (movies[i]["original_title"]);
                movieTitle = movieTitle.toLowerCase();
                if ((movieTitle).includes(name.toLowerCase())) {
                    movieBlock += `
                    <div class="imageOuter col-md-4 d-inline-block text-center">
                                <img class="img-fluid" src="https://image.tmdb.org/t/p/w500${movies[i]["poster_path"]}">
                                <div class="description">
                                    <div class="details">
                                    <h1>${movies[i]["original_title"]}</h1>
                                    <p>${movies[i]["overview"]}</p>
                                    <h6>Rate : <span>${movies[i]["vote_average"]}</span></h6>
                                    <h6>${movies[i]["release_date"]}</h6>
                                    </div>
                                </div>
                            </div>
                    `
                } 
            }
            contentElement.innerHTML=movieBlock;
        }
    }
   
}
nameInput = document.querySelector(".name");
nameAlert = document.querySelector(".nameAlert");
var nameRegex = /^[A-Z]|[a-z]+/;
nameInput.addEventListener("keyup",()=>{

    if (!nameRegex.test(nameInput.value))
    {
        nameAlert.classList.replace("d-none","d-block")
    }
    else {
        nameAlert.classList.replace("d-block","d-none")
    }
    
})




emailInput = document.querySelector(".email");
emailAlert = document.querySelector(".emailAlert");
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailInput.addEventListener("keyup",()=>{

    if (!emailRegex.test(emailInput.value))
    {
        emailAlert.classList.replace("d-none","d-block")
    }
    else {
        emailAlert.classList.replace("d-block","d-none")
    }
    
})



phoneInput = document.querySelector(".phone");
phoneAlert = document.querySelector(".phoneAlert");
var phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
phoneInput.addEventListener("keyup",()=>{

    if (!phoneRegex.test(phoneInput.value))
    {
        phoneAlert.classList.replace("d-none","d-block")
    }
    else {
        phoneAlert.classList.replace("d-block","d-none")
    }
    
})

ageInput = document.querySelector(".age");
ageAlert = document.querySelector(".ageAlert");

var ageRegex = /^(1[89]|[2-9]\d)$/;
ageInput.addEventListener("keyup",()=>{

    if (!ageRegex.test(ageInput.value))
    {
        ageAlert.classList.replace("d-none","d-block")
    }
    else {
        ageAlert.classList.replace("d-block","d-none")
    }
    
})

password1Input = document.querySelector(".password1");
password1Alert = document.querySelector(".password1Alert");
var password1Regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
password1Input.addEventListener("keyup",()=>{

    if (!password1Regex.test(password1Input.value))
    {
        password1Alert.classList.replace("d-none","d-block")
    }
    else {
        password1Alert.classList.replace("d-block","d-none")
    }
    
})

password2Input = document.querySelector(".password2");
password2Alert = document.querySelector(".password2Alert");

password2Input.addEventListener("keyup",()=>{

    if (password2Input.value == password1Input.value)
    {
       
        
        password2Alert.classList.replace("d-block","d-none")
    }
    else {
      
        password2Alert.classList.replace("d-none","d-block")
    }
    
})


