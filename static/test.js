var pro;
function display_div() {
                            var box = document.querySelector(".here");
                            new_div = document.createElement("div");
                            pro = document.querySelector(".product_name").textContent;
                            box.appendChild(new_div);
                            new_div.textContent = pro;
                            }

function starter() {
        var data_base = JSON.parse(localStorage.getItem("ordered_item"));
        if (!data_base)
        {   localStorage.setItem("ordered_item", JSON.stringify([])); }
        else
        {   data_base.forEach(function (pro) {display_div(pro)})   }
}

starter();

function Add_to_LocalStorage() {
                    var data_base = JSON.parse(localStorage.getItem("ordered_item"));
                    data_base.push(pro);
                    localStorage.setItem("ordered_item", JSON.stringify(data_base));
                    console.log(pro);
                    display_div(pro);
                    }






function Remove_from_LocalStorage(a) {
                            console.log(a);
                    }
