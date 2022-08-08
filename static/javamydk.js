var order;



    // Yeni sipariş divlerinin ekleneceği order  div'ini bul
    const add_to_this_div = document.getElementById("order-adds");

    //Ürün ekleme butonlarını bul
    let buttons = document.querySelectorAll('.add_button');
    let all_product_names = document.querySelectorAll('.product_name');
    let all_prices = document.querySelectorAll('.price');
    let bill = document.querySelector('.total_bill');
    let start = 0;
    let repeat = 0;
    let clk = 0;
    let products_on_the_bill = [];


    function starter() {

        var data_base = JSON.parse(localStorage.getItem("first"));
        if (!data_base)
        {   localStorage.setItem("first", JSON.stringify([])); }
        else
        {
            for ( let m=0; m<localStorage.length; m++)
            {
                    var key = localStorage.key(m);
                    var value = localStorage.getItem(key);
                    if (key!="first")
                    {
                            //Yeni div oluştur
                            let new_div_for_order = document.createElement("div");
                            //Yeni div e içerik gönder

                            var o = JSON.parse(value);
                            new_div_for_order.textContent = key + " " + o.price + "₺";
                            console.log(1)

                            start = start + o.hm*parseInt(o.price);
                            console.log(2)
                            bill.textContent = "Total: " + start + "₺";
                            console.log(3)

                            //Yeni div e class ekle
                            new_div_for_order.classList.add("div-for-order");
                            //Yeni div e id ekle
                            let id_for_new_div = document.createAttribute("id");
                            id_for_new_div.value = "new_div_id"+m;
                            new_div_for_order.setAttributeNode(id_for_new_div);
                            //Yeni div i mevcut div e ekle
                            // PARENT.append(CHILD)
                            add_to_this_div.appendChild(new_div_for_order);

                             let increase = document.createElement("button");
                            increase.classList.add("increasebtn");
                            //Yeni butonu yeni div e ekle
                            // PARENT.append(CHILD)
                            new_div_for_order.appendChild(increase);
                            increase.innerHTML = '<i class = "fa fa-plus"></i>';

                            let how_many = document.createElement("input");
                            how_many.classList.add("hmany");
                            let val = document.createAttribute("value");
                            val.value = o.hm;
                            how_many.setAttributeNode(val);

                            //Yeni butonu yeni div e ekle
                            // PARENT.append(CHILD)
                            new_div_for_order.appendChild(how_many);


                            let decrease = document.createElement("button");
                            decrease.classList.add("decreasebtn");
                            //Yeni butonu yeni div e ekle
                            // PARENT.append(CHILD)
                            new_div_for_order.appendChild(decrease);
                            decrease.innerHTML = '<i class = "fa fa-minus"></i>';

                            decrease.addEventListener("click", downward);
                            function downward(a)
                            {
                                        if (how_many.value==1)
                                        {
                                                new_div_for_order.remove();
                                                val.value=0;
                                                //remove tıklanırsa o ürünü fiyattan düşüyor
                                                start = start - parseInt(o.price);
                                                //Güncel fiyatı tekrar yansıtıyor
                                                bill.textContent = "Total: " + start + "₺";
                                                localStorage.removeItem(key);

                                                //var ord = {price:key, hm:val.value, tot:start}
                                                //localStorage.setItem(key, JSON.stringify(ord));
                                                console.log("starterdaki downward");
                                        }

                                        else if (how_many.value==0)
                                        {
                                                //localStorage.removeItem(key);
                                                //new_div_for_order.remove();
                                                bill.textContent = "Total: " + start + "₺";
                                                //remove tıklanırsa o ürünü fiyattan düşüyor
                                                //Güncel fiyatı tekrar yansıtıyor


                                        }

                                        else
                                        {
                                        val.value = val.value-1;
                                        //remove tıklanırsa o ürünü fiyattan düşüyor
                                        start = start - parseInt(o.price);
                                        //Güncel fiyatı tekrar yansıtıyor
                                        bill.textContent = "Total: " + start + "₺";
                                        console.log(val)

                                        var ord = {price:o.price, hm:val.value, tot:start}
                                        localStorage.setItem(key, JSON.stringify(ord));
                                        console.log("tarterdaki downward");

                                        }
                            }


                            increase.addEventListener("click", upward);
                            function upward()
                            {
                                        val.value = parseInt(val.value)+1;
                                        //remove tıklanırsa o ürünü fiyattan düşüyor
                                        start = start +  parseInt(o.price);
                                        //Güncel fiyatı tekrar yansıtıyor
                                        bill.textContent = "Total: " + start + "₺";
                                        console.log(val)

                                        var ord = {price:o.price, hm:val.value, tot:start}
                                        localStorage.setItem(key, JSON.stringify(ord));
                                        console.log("stardaki upward");

                            }

                    }

            }
        }
                                }
    starter();

            for ( let i=0; i<buttons.length; i++)
                {
                    //For döngüsüyle tüm butonlara aynı eventlistenerı uygula
                    buttons[i].addEventListener ('click', add_to_bill );
                    function add_to_bill()

                    {
                            if (products_on_the_bill.includes(all_product_names[i])==false)
                            {

                            //Yeni div oluştur
                            let new_div_for_order = document.createElement("div");
                            //Yeni div e içerik gönder
                            new_div_for_order.textContent = all_product_names[i].textContent + " "
                                                            + all_prices[i].textContent +"₺";


                            //var order_details = [all_product_names[i].textContent, all_prices[i].textContent];
                            //localStorage.setItem(all_product_names[i].textContent, JSON.stringify(all_prices[i].textContent));




                            //Yeni div e class ekle
                            new_div_for_order.classList.add("div-for-order");
                            //Yeni div e id ekle
                            let id_for_new_div = document.createAttribute("id");
                            id_for_new_div.value = "new_div_id"+i;
                            new_div_for_order.setAttributeNode(id_for_new_div);
                            //Yeni div i mevcut div e ekle
                            // PARENT.append(CHILD)
                            add_to_this_div.appendChild(new_div_for_order);


                            let increase = document.createElement("button");
                            increase.classList.add("increasebtn");
                            //Yeni butonu yeni div e ekle
                            // PARENT.append(CHILD)
                            new_div_for_order.appendChild(increase);
                            increase.innerHTML = '<i class = "fa fa-plus"></i>';

                            let how_many = document.createElement("input");
                            how_many.classList.add("hmany");
                            let val = document.createAttribute("value");
                            val.value = 1;
                            how_many.setAttributeNode(val);

                            //Yeni butonu yeni div e ekle
                            // PARENT.append(CHILD)
                            new_div_for_order.appendChild(how_many);


                            let decrease = document.createElement("button");
                            decrease.classList.add("decreasebtn");
                            //Yeni butonu yeni div e ekle
                            // PARENT.append(CHILD)
                            new_div_for_order.appendChild(decrease);
                            decrease.innerHTML = '<i class = "fa fa-minus"></i>';



                            //Start ücreti = 0 buna eklenen ürünün price ını ekliyor
                            start = start + parseInt(all_prices[i].textContent)
                            //Bill i güncelleyip eklenen ürün fiyatını yansıtıyor
                            bill.textContent = "Total: " + start + "₺";
                            var ord = {price:all_prices[i].textContent, hm:how_many.value, tot:start}

                            localStorage.setItem(all_product_names[i].textContent, JSON.stringify(ord));

                                decrease.addEventListener("click", downward);
                                function downward(a)
                                {

                                            if (how_many.value==1)
                                            {
                                            //var data_base = JSON.parse(localStorage.getItem(order_to_remove));
                                            var order_to_remove = all_product_names[i].textContent;

                                            for (var t=0; t<localStorage.length; t++)
                                            {
                                                var key = localStorage.key(t);
                                                var value = localStorage.getItem(key);

                                                if (key==order_to_remove)
                                                {

                                                console.log("alttaki_downward");
                                                localStorage.removeItem(key);
                                               }
                                            }


                                            new_div_for_order.remove();
                                            val.value=0;
                                            //remove tıklanırsa o ürünü fiyattan düşüyor
                                            start = start - parseInt(all_prices[i].textContent);
                                            //Güncel fiyatı tekrar yansıtıyor
                                            bill.textContent = "Total: " + start + "₺";




                                            for( var s = 0; s < products_on_the_bill.length; s++)
                                                {
                                                        if ( products_on_the_bill[s] == all_product_names[i] )
                                                            {

                                                            products_on_the_bill.splice(s, 1);
                                                            }
                                                }
                                            }
                                            else
                                            {
                                            val.value = val.value-1;
                                            //remove tıklanırsa o ürünü fiyattan düşüyor
                                            start = start - parseInt(all_prices[i].textContent);
                                            //Güncel fiyatı tekrar yansıtıyor
                                            bill.textContent = "Total: " + start + "₺";

                                            var ord = {price:all_prices[i].textContent, hm:val.value, tot:start}
                                            localStorage.setItem(all_product_names[i].textContent, JSON.stringify(ord));
                                            console.log("alttaki downward");

                                            }
                                }


                                increase.addEventListener("click", upward);
                                function upward()
                                {
                                            val.value = parseInt(val.value)+1;
                                            //remove tıklanırsa o ürünü fiyattan düşüyor
                                            start = start + parseInt(all_prices[i].textContent);
                                            //Güncel fiyatı tekrar yansıtıyor
                                            bill.textContent = "Total: " + start + "₺";

                                            var ord = {price:all_prices[i].textContent, hm:val.value, tot:start}
                                            localStorage.setItem(all_product_names[i].textContent, JSON.stringify(ord));
                                            console.log("alttaki upward");

                                            //localStorage.removeItem(all_product_names[i].textContent)


                                           // localStorage.setItem(all_product_names[i].textContent, JSON.stringify(ord));


                                }
                            products_on_the_bill.push(all_product_names[i]);



                            }
                            else{alert("Ürünü zaten eklediniz !!") }
                    }

                }




    //function to clear all products shown on the page
    function clear_all_products()
    {
        var parent = document.getElementById("id_products");
        var all = parent.children;
        for ( let p=0; p<all.length; p++)
                        {
                            all[p].style.display = "none";
                        }
    }


    function display_drinks(id)
    {
        if (id=="cat_drinks")
        {
                clear_all_products();
                var pros = document.querySelectorAll(".product_info");
                for ( let inf=0; inf<pros.length; inf++)
                {
                    pros[inf].style.display = "block";
                    pros[inf].style.backgroundColor = "#EF5B0C";
                    console.log(id);
                }
        }
        else if (id=="cat_dishes")
        {
                clear_all_products();
                var pros = document.querySelectorAll(".product_info_dishes");
                for ( let inf=0; inf<pros.length; inf++)
                {
                    pros[inf].style.display = "block";
                    console.log(id);
                }
        }

        else if (id=="cat_desserts")
        {
                clear_all_products();
                var pros = document.querySelectorAll(".product_info_desserts");
                for ( let inf=0; inf<pros.length; inf++)
                {
                    pros[inf].style.display = "block";
                    pros[inf].style.backgroundColor = "#D61C4E";
                    console.log(id);
                }
        }

        else if (id=="cat_breakfast")
        {
                clear_all_products();
                var pros = document.querySelectorAll(".product_info_breakfast");
                for ( let inf=0; inf<pros.length; inf++)
                {
                    pros[inf].style.display = "block";
                    pros[inf].style.backgroundColor = "#0078AA";
                    console.log(id);
                }
        }
        else
        {
                var pros = document.querySelectorAll(".product_info");
                for ( let inf=0; inf<pros.length; inf++)
                {
                    pros[inf].style.display = "block";
                    pros[inf].style.backgroundColor = "#EF5B0C";
                    console.log(id);
                }
        }

    }

    function hov_on (hovered)
    {hovered.style.border = "3px dashed green";}

    function hov_out (hovered)
    {hovered.style.border = "transparent";}

    function clcked (hovered)
    {hovered.style.border = "3px dashed green";}

    //Tüm category divleri için bu for döngüsünü uygula ve döngü içerisinde 3 fonksiyonu aktifleştir
    var cats = document.querySelectorAll(".category_holder");
    for ( let i=0; i<cats.length; i++)
    {

        cats[i].onmouseover = function() {hov_on(cats[i])};
        cats[i].onmouseout = function() {hov_out(cats[i])};
        cats[i].onclick = function() {display_drinks(this.id)};

    }








