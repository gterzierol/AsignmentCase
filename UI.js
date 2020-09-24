import { Request } from "./requests";

let data;

export class UI {
  constructor(products) {
    this.products = products;
    this.products = document.querySelector(".products");
    this.categoryFilter = document.querySelector(".category");
    this.categoryColor = document.querySelector(".colors");
    this.modal = document.querySelector(".modal-container");
    this.closeModalButton = document.querySelector(".close-Modal");
    this.endpoint = "https://5f67257538ce8700163982da.mockapi.io/products/";
  }

  //ürünlerin liste olarka basılması için gerekli olan fonksiyon
  addProductsToUI(products) {
    let list = "";
    products.forEach((product) => {
      list += `<div class="product" data-id="${product.id}">
                    <div class="productCategory">
                    <div class="category">${product.category}</div>
                    </div>
                    
                    <div class="productName">
                    <div class="product_name"><button class="button" type="button" data-toggle="modal" data-target="#exampleModal">
                    ${product.products}
                    </button></div>
                    </div>
                    </div>`;
    });
    this.products.innerHTML = list;

    //Çekilmiş olan data'nın global bir değişkende saklanması
    this.currentState(products);
  }
  //categorilerin dorpdown içine basılması
  addCategoriesToDropDown(products) {
    let category = "";
    products.forEach((product) => {
      if (category.includes(product.category)) {
        return;
      } else {
        category += `
                    <option value="${product.category}">${product.category}</option>
              `;
      }
    });
    this.categoryFilter.innerHTML = category;
  }

  //renk detayına göre yapılacak olan filtreleme için renk listesinin dropdown menüye basılması
  addColorToDropDown(products) {
    let color = "";

    products.forEach((product) => {
      //renklerin kendini tekrarlamaması için öncelikle mevcutta olup olmadığını kontrol ediyoruz. Eğer varsa returnle döngüyü atlıyoruz, değilse color'a ekliyoruz.
      if (color.includes(product.color)) {
        return;
      } else {
        color += `
                    <option value="${product.color}">${product.color}</option>
              `;
      }
    });
    this.categoryColor.innerHTML = color;
  }
  //Categorilere göre ürünlerin filtrelenmesi
  filterCategories(value) {
    //filtreleme için search parametresiyle bir istek atıyoruz ancak burada endpoint'i tekrarladığım için burada bir geliştirme yapılabilir. kod tekrarına sebep oldu.

    const endpoint = `https://5f67257538ce8700163982da.mockapi.io/products/?search=${value}`;

    const request = new Request(endpoint);

    //arama sonucuna göre elde ettiğimiz datayi tekrardan ekrana yazma fonksiyonumuzu çağırarak sadece filtrelemeye göre elde ettiğimiz datayı ekrana basıyoruz.
    request.get().then((products) => {
      this.addProductsToUI(products);
      this.currentState(products);
    });
  }
  //renklere göre ürünlerin filtrelenmesi
  filterColors(value) {
    var color = value;
    var list;
//tekrarlı şekilde get isteği yapmamak için son işlemde çekmiş ve global değişkene atamış olduğumuz data içerisinde, dropdown'da seçilmiş olan renge göre bir kontrol sağlayarak, seçilmiş olan renge sahip ürünleri ekrana basıyorz.
    data.forEach((product) => {
      if (color === product.color) {
        list += `
        <div class="product" data-id="${product.id}">
                    <div class="productCategory">
                    <div class="category" data-toggle="modal" data-target="#exampleModal" >${product.category}</div>
                    </div>
                    <div class="productName">
                    <div class="product_name"><button class="button" type="button" data-toggle="modal" data-target="#exampleModal">
                    ${product.products}
                    </button></div>
                    </div>
                    </div>
        `;
      } else {
        list = `
        <div class"product">
        <span>Aradığınız Renkte Ürün bulunmamaktadır.</span>
        </div>`;
      }
    });
    this.products.innerHTML = list;
  }
  //seçilen ürüne göre ürün detayının gösterildiği modalın eklenmesi
  openModal(value) {
    //seçilmiş ürüne göre endpoint'e seçilmiş ürünün ID'sini ekleyerek bir get isteği atıyoruz ve gelen veriyle oluşturduğumuz HTML'in display özelliğini değiştirerek görünür olmasını sağlıyoruz.

    // CSS tarafında animasyon ve arka plan bulanıklığı gibi görsel öğeler eklenebilir zaman kısıtı sebebiyle dahil edilememiştir.
    const selectedItemId =
      value.parentElement.parentElement.parentElement.dataset.id;

    const endpoint = `https://5f67257538ce8700163982da.mockapi.io/products/${selectedItemId}`;
    const request = new Request(endpoint);

    //alınan elementin üst elementlerine çıkılarak, ID alınacak, Alınan ID'ye göre get() requesti atılacak ancak "~/products/=search=:id" şeklinde atılarak tıklanmış öğenin verileri alınacak ve kendi oluşturuduğumuz modal'e eklenerek ekranda bir modal çıkması sağlancak.

    request.get().then((product) => {
      let selectedItem = `
        <div class="modal-header">
          <span class="productName">${product.products}</span>
          <button class="close-Modal">X</button>
        </div>
        <div class="modal-body">
          <span class="productColor">Ürünün Rengi: ${product.color}</span>
          <span class="productMaterial">Ürünün Materyali: ${product.productMaterial}</span>
          <span class="productType">Ürün Tipi: ${product.productType}</span>
        </div>
        <div class="modal-footer">
        <button class="basket">Sepete Ekle</button>
        </div>`;

      this.modal.innerHTML = selectedItem;
    });
    this.modal.style.display = "flex";
    console.log(this.modal)
    
    // <div class="modal-container">
    //     <div class="modal-header">
    //       <span class="productName"></span>
    //       <button class="closeModal">X</button>
    //     </div>
    //     <div class="modal-body">
    //       <span class="productColor"></span>
    //       <span class="productMaterial"></span>
    //       <span class="productType"></span>
    //     </div>
    //     <button class="basket"></button>
    //   </div>
    

  }
  //Açılmış olan Modal içerisindeki etkileşimlerin yönetilmesi
  modalEvents(value) {
    console.log(value.className);
    if(value.className ==="close-Modal"){
      this.modal.style.display = "none"
    }else if(value.className ==="basket"){
      alert("Ürününüz başarıyla sepete eklendi")
    }
  }

  //Genel eventlerin yönetilmesi
  eventHandler() {
    this.categoryFilter.addEventListener("change", (e) => {
      this.filterCategories(e.target.value);
    });
    this.categoryColor.addEventListener("change", (e) => {
      this.filterColors(e.target.value);
    });
    this.products.addEventListener("click", (e) => {
      this.openModal(e.target);
    });
    this.modal.addEventListener("click", (e) => {
      this.modalEvents(e.target);
    })
  }

  currentState(value) {
    data = value;
  }
}
