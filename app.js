import {Request} from "./requests"
import {UI} from "./UI";

//Veri için gerekli EndPoint tanımlanması
const endpoint = "https://5f67257538ce8700163982da.mockapi.io/products";

//Veritabanı olarak kullanılan mock Api'dan verinin çekilmesi için yazılmış olan Request  ve arayüz işlemlerinin yapılması için sınıfların örneklemesi alınmakta
const request = new Request(endpoint);
const ui = new UI();

//veri çekilerek, ilk yüklenmedeki gösterilecek sayfa burada oluşturulmaktadır.
request.get()
.then(products => {
    ui.addProductsToUI(products);
    ui.addCategoriesToDropDown(products);
    ui.addColorToDropDown(products);
    ui.eventHandler();
})
.catch(err => console.log(err));