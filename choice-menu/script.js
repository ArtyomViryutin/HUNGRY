window.onload = function() {
    change_menu('pizza');
}


dishes = ['soup', 'pizza', 'pasta', 'desert', 'wine', 'drinks']
dishes.forEach(dish => {
    button = document.getElementById(dish)
    button.addEventListener('click', () => change_menu(dish));
});

let tbody = document.getElementById('menu').getElementsByTagName('tbody')[0];

function change_menu(dish_name) {
    tbody.innerHTML = '';
    let dish = dishes[dish_name];
    let row = document.createElement('TR');
    for (i = 0; i < dish.length; ++i) {
        if (i % 3 == 0 && i != 0) {
            tbody.appendChild(row);
            row = document.createElement('TR');  
        }
        let td = document.createElement('TD')
        row.appendChild(td)
        td.innerHTML = cell(dish[i].name, dish[i].description, dish[i].price)
    }
    tbody.appendChild(row);
}

function cell(name, description, price) {
    return `
    <div class="menu__position">
    <div>
        <div class="menu__dish-name">${name} . . . .</div>
        <div class="menu__dish-description">${description}</div>
    </div>
    <div class="menu__dish-price">${price} USD</div>
    </div>`
}


// var scrolled;
// window.onscroll = function() {
//     scrolled = window.pageYOffset || document.documentElement.scrollTop;
//     if(scrolled < 700){
//         $(".header").css({"background": "none"})
//     }
//     if(700 < scrolled){
//         $(".header").css({"background": "red"})         
//     }

// }