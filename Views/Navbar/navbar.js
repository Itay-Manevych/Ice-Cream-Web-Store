import { ProductController } from "../../Controllers/product.js"

const navbar = $(".navbar")[0];

const logo_btn = $("#logo-btn")[0];
const about_btn = $("#about-btn")[0];
const shop_btn = $("#shop-btn")[0];
const sale_btn = $("#sale-btn")[0];
const open_search = $("#search-icon")[0];
const user_btn = $("#user-icon")[0];
const cart_btn = $("#cart-icon")[0];
const search_box = $("#search-box")[0];
const close_search = $("#close-search")[0];
const search_input = $("#search-input")[0];
const search_btn = $("#search-icon-search-box")[0];

function mainPage() {
    //window.location.href = "https://localhost:3000/";
}

function aboutPage() {
    //window.location.href = "https://localhost:3000/about_us/";
}

function shop() {
}

function sale() {
}

function closeSearch() {
    navbar.style.display = "flex";
    search_box.style.display = "none";
    search_input.value = ""; 
}

function openSearch() {
    navbar.style.display = "none";
    search_box.style.display = "flex";
    search_box.style.justifyContent = "center";
    search_box.style.alignItems = "center";
    
    setTimeout(() => {
        search_box.style.height = "7rem";
    }, 10)

    close_search.onclick = closeSearch;

    function search() {
        let products = ProductController.getAllProducts();
        let products_found = 0;

        products.forEach(product => { //don't forget to add the products to the file
            let length = 0, index = 0;

            while(index < search_input.value.length && index < product.name.length) {
                if(search_input.value[index] == product.name[index])
                    length++;
                else
                    break;
            }

            if(length == search_input.value.length){
                products_found++; 
                //add the actual product to html
            }
        })

        if(products_found == 0){
            //add some error to html
        }
    }

    search_btn.onclick = search;
}

function user() {
}

function cart() {
}

logo_btn.onclick = mainPage;
about_btn.onclick = aboutPage;
open_search.onclick = openSearch;
user_btn.onclick = user;
cart_btn.onclick = cart;