
const favList = document.getElementById('fav-list');
let favMeals = JSON.parse(localStorage.getItem("fav"));

function removeFromFavourite(id) {
    console.log(id)
    let newfavMeals = favMeals.filter(meal => meal.idMeal != id);
    favMeals = newfavMeals;
    localStorage.setItem("fav", JSON.stringify(newfavMeals))
    location.reload()
}

function getFavMeals() {
    console.log(favMeals)
    let html = "";
    if (Boolean(favMeals)) {
        favMeals.forEach(meal => {
            html += `
       <div class = "fav-meal-item" data-id = "${meal.idMeal}">       
               <img class = "fav-meal-img" src = "${meal.strMealThumb}" alt = "food">           
           <div class = "meal-name">
               <h3>${meal.strMeal}</h3>
               <button id="favButton" onclick = "removeFromFavourite(${meal.idMeal})">Remove from Favourite</button>
           </div>
       </div>
   `;
        });
    } else {
        html = "Sorry, we didn't find any meal!";
    }
    favList.innerHTML = html;
}

getFavMeals();
