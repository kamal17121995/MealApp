
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const random = document.getElementById("random");
const favList = document.getElementById('fav-list');



// event listeners
random.addEventListener('click', randomMeal);
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


//fetch Meal 
function randomMeal() {
    //Clear Meals and Heading
    mealList.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const Meals = data.meals[0];
            getMealList(Meals)
        })

}

function addToFavourite(id) {

    console.log(id);
    const allMeals = JSON.parse(localStorage.getItem("allMeals"))
    console.log(allMeals);
    const selectedMeal = allMeals.find(meal => meal.idMeal == id)
    console.log(selectedMeal);
    const favMeals = JSON.parse(localStorage.getItem("fav"))
    console.log(favMeals);

    let tempMeal = favMeals == null ? [] : favMeals;
    const favMealDuplicate = tempMeal.find(meal => meal.idMeal == id)
    if (!!favMealDuplicate) {
        return
    }
    tempMeal.push(selectedMeal);
    localStorage.setItem("fav", JSON.stringify(tempMeal))

    // if (favMeals == null) {
    //     localStorage.setItem("fav", [selectedMeal])
    // } else {
    //     localStorage.setItem("fav", [...favMeals, selectedMeal])
    // }


    if (favList) {
        let html = `
    <div class = "meal-item" data-id = "${meal.idMeal}">
        <div class = "meal-img">
            <img src = "${meal.strMealThumb}" alt = "food">
        </div>
        <div class = "meal-name">
            <h3>${meal.strMeal}</h3>
            <a href = "#" class = "recipe-btn">Get Recipe</a>
            <button onclick = "addToFavourite(${meal.idMeal})">Add to Favourite</button>
        </div>
    </div>`
    }

    console.log(favList);
}

// get meal list that matches with the ingredients
function getMealList() {

    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("allMeals", JSON.stringify(data.meals));
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                            <button onclick = "addToFavourite(${meal.idMeal})">Add to Favourite</button>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}


// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// recipe details
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}