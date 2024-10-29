const loadCategories = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await res.json();
    displayCategories(data.categories);
};

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categories.forEach(category => {
       const categoryBtn = document.createElement("button");
       categoryBtn.innerHTML = `<button id="categoryBtn-${category.category}" onclick="loadPetsByCategory('${category.category}')" class="category-btn btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mx-4"><img src="${category.category_icon}"> ${category.category}</button>`;
       categoriesContainer.appendChild(categoryBtn);
    });
};

const loadPets = () => {
    document.getElementById("loading-spinner").classList.remove("hidden");

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(res => res.json())
    .then(data => {
        setTimeout(()=>{
            document.getElementById("loading-spinner").classList.add("hidden");
            displayPets(data.pets)
        }, 2000)
    });
}

// { petId: 1, breed: "Golden Retriever", category: "Dog", … }
// ​​
// breed: "Golden Retriever"
// ​​
// category: "Dog"
// ​​
// date_of_birth: "2023-01-15"
// ​​
// gender: "Male"
// ​​
// image: "https://i.ibb.co.com/p0w744T/pet-1.jpg"
// ​​
// petId: 1
// ​​
// pet_details: "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog."
// ​​
// pet_name: "Sunny"
// ​​
// price: 1200
// ​​
// vaccinated_status: "Fully"

const displayPets = (pets) => {
    const petsContainer = document.getElementById("pets-container");
    petsContainer.innerHTML = '';
    if(pets.length == 0){
        petsContainer.classList.remove("md:grid-cols-3");
        const noInfo = document.createElement("div");
        noInfo.innerHTML = `
            <img class="mx-auto" src="./images/error.webp" alt="Picture of a cat and a dog" class="py-6">
            <h1 class="text-5xl font-bold text-center">No Information Available</h1>
            <p class="py-6 text-center">
                We could not find any information that matches your search.
            </p>
        `
        petsContainer.appendChild(noInfo);
        return;
    }
    else{
        petsContainer.classList.add("md:grid-cols-3");
    }

    pets.forEach(pet => {
       const petCard = document.createElement("div");
       petCard.classList.add("card", "border", "rounded");
       petCard.innerHTML = `
        <figure class="h-1/2">
            <img
            src="${pet.image}"
            alt="picture of ${pet.breed}" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${pet.pet_name}</h2>
            <div class="flex gap-2">
                <img class="w-5" src="https://img.icons8.com/ios/50/four-squares.png" alt="four squares icon"/>
                ${
                    'breed' in pet && pet.breed!=null ? `<p>Breed: ${pet.breed} </p>` : "<p>Breed: Not specified</p>"
                }
            </div>
            
            <div class="flex gap-2">
                <img class="w-5" src="https://img.icons8.com/ios/50/calendar--v1.png" alt="calendar icon"/>
                ${
                    'date_of_birth' in pet && pet.date_of_birth!=null ? `<p>Birth: ${pet.date_of_birth} </p>` : "<p>Birth: Not specified</p>"
                }
            </div>
            
            <div class="flex gap-2">
                <img class="w-5" src="https://img.icons8.com/ios/50/gender.png" alt="gender icon"/>
                ${
                    'gender' in pet && pet.gender!=null ? `<p>Gender: ${pet.gender} </p>` : "<p>Gender: Not specified</p>"
                }
            </div>
            
            <div class="flex gap-2">
                <img class="w-5" src="https://img.icons8.com/ios/50/us-dollar-circled--v1.png" alt="dollar icon"/>
                ${
                    'price' in pet && pet.price!=null ? `<p>Price: ${pet.price} </p>` : "<p>Price: Not specified</p>"
                }
            </div>
            <div class="card-actions justify-between">
                <button onclick="addLiked('${pet.image}')" class="btn p-0"><img class="w-8" src="https://img.icons8.com/ios/50/thumb-up--v1.png" alt="thumbs up icon"/></button>
                <button onclick="showAdoptModal()" class="btn text-teal-700">Adopt</button>
                <button onclick="loadDetails(${pet.petId})" class="btn text-teal-700">Details</button>
            </div>
        </div>
       `;
       petsContainer.appendChild(petCard);
    });
}


// category: "Rabbit"
// ​​
// date_of_birth: "2022-04-20"
// ​​
// gender: "Male"
// ​​
// image: "https://i.ibb.co.com/s3PXSwD/pet-3.jpg"
// ​​
// petId: 3
// ​​
// pet_details: "This male African Grey rabbit is a small, friendly companion born on April 20, 2022. He prefers a calm environment and enjoys gentle handling. Partially vaccinated, he's a great choice for rabbit lovers who want a peaceful, easygoing pet. Priced at $1500, he's perfect for a quiet home environment."
// ​​
// pet_name: "Coco"
// ​​
// price: 1500
// ​​
// vaccinated_status: "Partially"

const loadDetails = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then(res => res.json())
    .then(pet => displayDetails(pet.petData));
}

const displayDetails = (pet) => {
    const petDetails = pet.pet_details;
    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
        <figure class="h-5/6">
            <img
            src="${pet.image}"
            alt="picture of ${pet.breed}" />
        </figure>
        <h2 class="card-title">${pet.pet_name}</h2>
        <div class="grid grid-cols-2">
            <div class="flex gap-2">
                <img class="w-5" src="https://img.icons8.com/ios/50/four-squares.png" alt="four squares icon"/>
                ${
                    'breed' in pet && pet.breed!=null ? `<p>Breed: ${pet.breed} </p>` : "<p>Breed: Not specified</p>"
                }
            </div>

            <div class="flex gap-2">
                <img class="w-5" src="https://img.icons8.com/ios/50/calendar--v1.png" alt="calendar icon"/>
                ${
                    'date_of_birth' in pet && pet.date_of_birth!=null ? `<p>Birth: ${pet.date_of_birth} </p>` : "<p>Birth: Not specified</p>"
                }
            </div>
            
            <div class="flex gap-2">
                <img class="w-5" src="https://img.icons8.com/ios/50/gender.png" alt="gender icon"/>
                ${
                    'gender' in pet && pet.gender!=null ? `<p>Gender: ${pet.gender} </p>` : "<p>Gender: Not specified</p>"
                }
            </div>

            <div class="flex gap-2">
                <img class="w-5" src="https://img.icons8.com/ios/50/us-dollar-circled--v1.png" alt="dollar icon"/>
                ${
                    'price' in pet && pet.price!=null ? `<p>Price: ${pet.price} </p>` : "<p>Price: Not specified</p>"
                }
            </div>

            <div class="flex gap-2">
                <img class="w-5" src="https://img.icons8.com/ios/50/syringe--v1.png" alt="syringe--v1"/>
                ${
                    'vaccinated_status' in pet && pet.vaccinated_status!=null ? `<p>Vaccinated Status: ${pet.vaccinated_status} </p>` : "<p>Vaccinated Status: Not specified</p>"
                }
            </div>
        </div>
        <br>
        <h3 class="text-xl font-bold">Details</h3>
        <p>${pet.pet_details}</p>
    `
    document.getElementById("detailsModalShow").click();
}

const showAdoptModal = () => {
    let counter = 3;
    const modalContent = document.getElementById("adopt-modal-content");
    document.getElementById("adoptModalShow").click();

    const intervalId = setInterval(() => {
        modalContent.innerHTML = `
            <h1 class="text-5xl font-bold">${counter}</h1>
        `
        counter -= 1;
        if(counter<1){
            document.getElementById("adopt-close-btn").click();
            clearInterval(intervalId);
        }
    }, 1000);
}

const addLiked = (image) => {
    const img = document.createElement("div");
    img.innerHTML = `
        <img src="${image}" alt="picture of pet"/>
    `
    document.getElementById("liked-pets").appendChild(img);
}

const loadPetsByCategory = (category) => {
    document.getElementById("loading-spinner").classList.remove("hidden");
    const petsContainer = document.getElementById("pets-container");
    petsContainer.innerHTML = '';

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then(res => res.json())
    .then(data => {
        setTimeout(()=>{
            document.getElementById("loading-spinner").classList.add("hidden");
            displayPets(data.data)
        }, 2000)
    });
    const categoryBtns = document.getElementsByClassName("category-btn");
    for (const btn of categoryBtns) {
        console.log(btn)
        btn.classList.remove('bg-teal-200/20', 'border-teal-700', 'rounded-full');
    }
    document.getElementById(`categoryBtn-${category}`).classList.add('bg-teal-200/20', 'border-teal-700', 'rounded-full');
}

const sortByPrice = () => {
    document.getElementById("loading-spinner").classList.remove("hidden");
    const petsContainer = document.getElementById("pets-container");
    petsContainer.innerHTML = '';

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(res => res.json())
    .then(data => {
        setTimeout(()=>{
            data.pets.sort((a, b) => b.price - a.price);
            document.getElementById("loading-spinner").classList.add("hidden");
            displayPets(data.pets)
        }, 2000)
    });
}

document.getElementById("sort-by-price-btn").addEventListener('click', sortByPrice);


loadCategories();
loadPets();