
const canvas_tables = document.querySelector(".canvas_tables");
const canvas = document.querySelector(".canvas");

const tables = document.querySelectorAll(".table");

let table_name;
let bill_name;
// Yeni sipariş divlerinin ekleneceği order  div'ini bul
const add_to_this_div = document.getElementById("order-adds");
//Ürün ekleme butonlarını bul
let buttons = document.querySelectorAll('.add_button');
let all_product_names = document.querySelectorAll('.product_name');
let all_prices = document.querySelectorAll('.price');
let bill = document.querySelector('.total_bill');
let start = 0;
let repeat = 0;
let products_on_the_bill = [];
let bill_position=0;
let all_ords = [];
let start_two = 0;


for (i=0; i<tables.length; i++)
{ tables[i].addEventListener("click",hide_tables)
tables[i].addEventListener("click", starter)
}

function starter()
  /*starter*/  {

                table_name = this.id
                bill_name = this.id + "_Bill"
                console.log(table_name,bill_name)
                var data_base = JSON.parse(localStorage.getItem(table_name));
                if (!data_base)
                { localStorage.setItem(table_name, JSON.stringify([])); }

                else
                {
                // array olduğu için objelere erişmden önce for loop
                var products = JSON.parse(localStorage.getItem(table_name));
                var tot = JSON.parse(localStorage.getItem(bill_name));
                for (let a=0; a<products.length; a++)
                {
                    console.log(products[a].line_no);
                    console.log(products[a].name);
                    console.log(products_on_the_bill);
                    console.log(products[a].price);
                    console.log(products[a].quantity);

                    let new_div_for_order = document.createElement("div");
                    new_div_for_order.textContent = products[a].name + " "
                                                    + products[a].price +"₺";

                    new_div_for_order.classList.add("div-for-order");
                    add_to_this_div.appendChild(new_div_for_order);


                    let increase = document.createElement("button");
                    increase.classList.add("increasebtn");
                    new_div_for_order.appendChild(increase);
                    increase.innerHTML = '<i class = "fa fa-plus"></i>';

                    let how_many = document.createElement("input");
                    how_many.classList.add("hmany");
                    let val = document.createAttribute("value");
                    val.value = parseFloat(products[a].quantity);
                    how_many.setAttributeNode(val);
                    new_div_for_order.appendChild(how_many);

                    let decrease = document.createElement("button");
                    decrease.classList.add("decreasebtn");
                    new_div_for_order.appendChild(decrease);
                    decrease.innerHTML = '<i class = "fa fa-minus"></i>';

                    bill.textContent = "Total: " + tot + "₺";
                    bill_position= products[a].line_no;

                    products_on_the_bill.push(products[a].name);


                    decrease.addEventListener("click", downward);
                    function downward()
                    {
                        if (products[a].quantity==1)
                            {
                                console.log("Starter upwardan güncellenen quantity: ", products[a].quantity);
                                console.log("Starterdaki '--' ye basıldı");
                                console.log("Eşleşme sağlandı");
                                console.log("Ürün sayısı 1 olduğu için ürün çıkarıldı");

                                //ürün kaldırılıyor
                                new_div_for_order.remove();

                                //tot fiyatı güncelleniyor. her seferinde localstoragedan all
                                tot = JSON.parse(localStorage.getItem(bill_name)) - products[a].price;
                                bill.textContent = "Total: " + tot + "₺";

                                console.log("Kaldırılan ürün:", products[a].name);
                                console.log("Kaldırılan ürün fiyatı:", products[a].price);
                                console.log("Yeni total: ",tot);

                                //arrow filter ile silinen ürün product_on_the_bill den çıkarılıyor
                                products_on_the_bill = products_on_the_bill.filter(data => data != products[a].name);
                                console.log("hesapta kalan ürünler", products_on_the_bill);


                                //arrow filter ile localstroage a gönderilen all_ords arrayi güncelleniyor
                                all_ords = all_ords.filter(data => data.name != products[a].name);

                                console.log("Güncel all_ords", all_ords);
                                //güncel haliyle all_ords ve tot (bill) güncelleniyor.
                                localStorage.setItem(table_name,JSON.stringify(all_ords));
                                localStorage.setItem(bill_name,JSON.stringify(tot));

                                console.log("Ana ekrandan ürün eklenirse diye");
                                console.log("Start değeri sürekli tot a eşitleniyor");
                                //ana ekrandan ürün gelirse start değeri güncel olsun diye start ı bill e eşitle
                                start=JSON.parse(localStorage.getItem(bill_name));
                                console.log(start,tot);

                            }

                        else
                                {
                                    val.value = parseInt(val.value)-1;
                                    //starter ekranında değer azaltılırsa üstteki remove özelliği için güncel quantity oluştur
                                    //starterda artı eksi geçişlerinde güncel quantity oluşturmak çok önemli
                                    products[a].quantity = products[a].quantity-1;

                                    console.log("Product quantity starterdaki upward-downward arasında güncellendi");
                                    console.log("Starter upward için güncel quantity")
                                    console.log(products[a].quantity);

                                    //tot u yine localdan çekip güncel olarak belirle
                                    //localdan çekersen tot ve start uyumsuzluğu olmayacak
                                    tot = JSON.parse(localStorage.getItem(bill_name)) - products[a].price;
                                    bill.textContent = "Total: " + tot + "₺";

                                    console.log("Güncellenen ürün: ",products[a].name);
                                    console.log("Güncellenen ürün fiyatı: ",products[a].price);

                                    //map ile all_ord güncelle. azalan değeri all_ord array de yenile
                                    all_ords = all_ords.map(function(item)
                                    {
                                            if(item.name==products[a].name)
                                            {item.quantity=parseInt(val.value);}
                                            return item;
                                    })
                                    console.log("All_ords güncellendi",all_ords);

                                    //yapılan güncellemeleri local storage a aktar
                                    localStorage.setItem(table_name,JSON.stringify(all_ords));
                                    localStorage.setItem(bill_name,JSON.stringify(tot));

                                    console.log("LocalStorage güncellendi");

                                    console.log("Ana ekrandan ürün eklenirse diye");
                                    console.log("Start değeri sürekli tot a eşitleniyor");

                                    // start değerini güncelle. ana ekrandan ürün eklenirse son değeri alabilsin
                                    start=JSON.parse(localStorage.getItem(bill_name));
                                    console.log(start,tot);

                                }

                    }


                    increase.addEventListener("click", upward);
                    function upward()
                    {
                                //tot = JSON.parse(localStorage.getItem('bill'));
                                console.log("Total tekrar alındı");
                                console.log(tot);
                                val.value = products[a].quantity+1;

                                //startarda upward sonrası hemen downward yapılırsa diye quantity güncelle
                                products[a].quantity = products[a].quantity+1;

                                console.log("Product quantity starterdaki upward-downward arasında güncellendi");
                                console.log("Starter downward için güncel quantity")
                                console.log(products[a].quantity);

                                //local storagedan toplam çek ve tot u sürekli güncelle
                                //tot u güncellerken tot=tot+x kullanma.
                                tot = JSON.parse(localStorage.getItem(bill_name)) + products[a].price;
                                bill.textContent = "Total: " + tot + "₺";

                                console.log("GÜncellenen ürün:",products[a].name );
                                console.log("GÜncellenen ürün fiyatı:",products[a].price );

                                console.log("Starterdan gelen ekranda");
                                console.log("ürün sayısı arıtırılınca");
                                console.log("Yeni total:", tot);

                                //artan quantity den dolayı all_ords u güncelle
                                all_ords = all_ords.map(function(item)
                                {
                                        if(item.name==products[a].name)
                                        {item.quantity=parseInt(val.value);}
                                        return item;
                                })

                                console.log("Güncellemeden sonra all_ords");
                                console.log(all_ords);

                                //tüm güncellemeleri local storage a aktar
                                localStorage.setItem(table_name,JSON.stringify(all_ords));
                                localStorage.setItem(bill_name,JSON.stringify(tot));
                                console.log("LocalStorage yeni all_ordsla güncellendi");

                                console.log("Ana ekrandan ürün eklenirse diye");
                                console.log("Start değeri sürekli tot a eşitleniyor");

                                //start ı tot a eşitle. ana ekrandan ürün eklenirse diye
                                start=JSON.parse(localStorage.getItem(bill_name));;
                                console.log(start,tot);
                    }


                    //all_ords arrayi tekrar başlayınca boş kalmasın diye
                    //localden alınıp bill e eklenen ürünleri all_ords a geri ekle
                    //LOCALSTORAGE GÜNCELLE
                    var ord = {line_no:bill_position, name:products[a].name,
                              price:products[a].price , quantity:parseInt(val.value)}
                    all_ords.push(ord);
                    localStorage.setItem(table_name,JSON.stringify(all_ords));
                    localStorage.setItem(bill_name,JSON.stringify(tot));
                    console.log("localstr den all_ords dolduruldu", all_ords);


                }
                }

                //starterdaki her işlem bitiminde start değerini güncelleki
                //ana ekrandan ürün eklendiğinde 0 dan başlamasın
                if(tot)
                {start=JSON.parse(localStorage.getItem(bill_name));}
  /*starter*/  }

function hide_tables()
			{

                canvas_tables.style.display ="None";
                canvas.style.display ="block";

            }














//for döngüsüyle tüm ürünler için ekleme butonundaki
//add_to_bill fonsksiyonunu oluşturup eventlistener ekle
for ( let i=0; i<buttons.length; i++)
{
            buttons[i].addEventListener ('click', add_to_bill );
            function add_to_bill()

            {
                    //eklenecek ürün daha önce eklendimi diye bak
                    if (products_on_the_bill.includes(all_product_names[i].textContent)==false)
                    {

                    let new_div_for_order = document.createElement("div");
                    new_div_for_order.textContent = all_product_names[i].textContent + " "
                                                    + all_prices[i].textContent +"₺";
                    console.log("Eklenen ürün:", all_product_names[i].textContent);
                    console.log("Eklenen ürün fiyatı:", all_prices[i].textContent);

                    new_div_for_order.classList.add("div-for-order");
                    add_to_this_div.appendChild(new_div_for_order);


                    let increase = document.createElement("button");
                    increase.classList.add("increasebtn");
                    new_div_for_order.appendChild(increase);
                    increase.innerHTML = '<i class = "fa fa-plus"></i>';

                    let how_many = document.createElement("input");
                    how_many.classList.add("hmany");
                    let val = document.createAttribute("value");
                    val.value = 1;
                    how_many.setAttributeNode(val);
                    new_div_for_order.appendChild(how_many);

                    let decrease = document.createElement("button");
                    decrease.classList.add("decreasebtn");
                    new_div_for_order.appendChild(decrease);
                    decrease.innerHTML = '<i class = "fa fa-minus"></i>';

                    start = start + parseFloat(all_prices[i].textContent)
                    bill.textContent = "Total: " + start + "₺";
                    bill_position= bill_position+1;

                    //hesaba ilk kez eklenen ürünü bu array e at ki tekrar eklenemesin
                    products_on_the_bill.push(all_product_names[i].textContent);


                    //her yeni ürün siparişini localstorage a at
                    //LOCALSTORAGE GÜNCELLE
                    var ord = {line_no:bill_position, name:all_product_names[i].textContent,
                              price:parseFloat(all_prices[i].textContent) , quantity:parseInt(val.value)}
                    all_ords.push(ord);
                    console.log("All_ords a eklendi", all_ords);
                    localStorage.setItem(table_name,JSON.stringify(all_ords));
                    localStorage.setItem(bill_name,JSON.stringify(start));

                        //yeni ürünlerin artır azalt özelliklerini oluştur.
                        decrease.addEventListener("click", downward);
                        function downward()
                        {
                            if (val.value==1)
                                {
                                    //eklenen ürünün adedi 1 ise azaltılınca sil
                                    new_div_for_order.remove();
                                    console.log("Kaldırılan ürün:", all_product_names[i].textContent);
                                    console.log("Kaldırılan ürün fiyatı:", all_prices[i].textContent);

                                    //toplam fiyatı güncelle
                                    start = start - parseFloat(all_prices[i].textContent);
                                    bill.textContent = "Total: " + start + "₺";

                                    //arrow filter ile ürünün hesaptaki ürünler array inden çıkar
                                    products_on_the_bill = products_on_the_bill.filter(data => data != all_product_names[i].textContent);
                                    console.log("hesapta kalan ürünler", products_on_the_bill);

                                    //arrow filter ile tüm siparişler arrayini güncelle
                                    all_ords = all_ords.filter(data => data.name != all_product_names[i].textContent);
                                    console.log(all_ords);

                                    //güncel haliyle tüm siparişleri ve toplam fiyatı local storage a gönder.
                                    localStorage.setItem(table_name,JSON.stringify(all_ords));
                                    localStorage.setItem(bill_name,JSON.stringify(start));

                                }

                            else
                                {
                                    //ürün sayısı 1 den fazlaysa 1 azalt
                                    val.value = val.value-1;
                                    start = start - parseInt(all_prices[i].textContent);
                                    bill.textContent = "Total: " + start + "₺";

                                    //map ile azalan sayını all_ord'da güncelle
                                    all_ords = all_ords.map(function(item)
                                    {
                                            if(item.name==all_product_names[i].textContent)
                                            {item.quantity=parseInt(val.value);}
                                            return item;
                                    })
                                    console.log("All_ords güncellendi",all_ords);

                                    //güncel all_ord'u localstorage a at
                                    localStorage.setItem(table_name,JSON.stringify(all_ords));
                                    localStorage.setItem(bill_name,JSON.stringify(start));
                                }
                        }

                        //yeni ürünün artır özelliği
                        increase.addEventListener("click", upward);
                        function upward()
                        {
                                    //ürün sayısını artır ve fiyatı güncelle
                                    val.value = parseInt(val.value)+1;
                                    start = start + parseInt(all_prices[i].textContent);
                                    bill.textContent = "Total: " + start + "₺";

                                    //güncel adet sayısını all_ords da güncelle
                                    all_ords = all_ords.map(function(item)
                                    {
                                            if(item.name==all_product_names[i].textContent)
                                            {item.quantity=parseInt(val.value);}
                                            return item;
                                    })
                                    console.log("All_ords güncellendi",all_ords);

                                    //güncel all_ords ve güncel total i locale at
                                    localStorage.setItem(table_name,JSON.stringify(all_ords));
                                    localStorage.setItem(bill_name,JSON.stringify(start));
                        }

                    console.log("Hesaptaki ürünler: ",products_on_the_bill);

                    }

                    else
                    {
                                alert("Ürünü zaten eklediniz !!");
                                console.log(products_on_the_bill);
                    }
            }
}










//Permanent Functions
//button_back.addEventListener("click", back)
//function back()

function paid()
                         {
            var to_remove = document.querySelectorAll('.div-for-order');
            if(confirm("Do you really want to clear the bill?"))
            {
                for (let i=0; i<to_remove.length; i++)
                {
                to_remove[i].remove();
                }

                localStorage.removeItem(table_name);
                localStorage.removeItem(bill_name);
                bill.textContent = " ";

                console.log("divler temizlendi");
                console.log("Hesap tutarı temizlendi");
                console.log("localstorage temizlendi");

                products_on_the_bill = [];
                all_ords = [];
                start = 0;

            }
    }


//menü ekranındaki kategoriler ve geçişleri.
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
            }
    }
    else if (id=="cat_dishes")
    {
            clear_all_products();
            var pros = document.querySelectorAll(".product_info_dishes");
            for ( let inf=0; inf<pros.length; inf++)
            {
                pros[inf].style.display = "block";
            }
    }

    else if (id=="cat_desserts")
    {
            clear_all_products();
            var pros = document.querySelectorAll(".product_info_desserts");
            for ( let inf=0; inf<pros.length; inf++)
            {
                pros[inf].style.display = "block";
            }
    }

    else if (id=="cat_breakfast")
    {
            clear_all_products();
            var pros = document.querySelectorAll(".product_info_breakfast");
            for ( let inf=0; inf<pros.length; inf++)
            {
                pros[inf].style.display = "block";
            }
    }
    else
    {
            var pros = document.querySelectorAll(".product_info");
            for ( let inf=0; inf<pros.length; inf++)
            {
                pros[inf].style.display = "block";
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
    //cats[i].onmouseover = function() {hov_on(cats[i])};
    //cats[i].onmouseout = function() {hov_out(cats[i])};
    cats[i].onclick = function() {display_drinks(this.id)};
}