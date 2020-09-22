import { Request } from "./requests";

let data;

export class UI {
  constructor(products) {
    this.products = products;
    this.products = document.querySelector(".products");
    this.categoryFilter = document.querySelector(".category");
    this.categoryColor = document.querySelector(".colors");
    this.product = document.querySelector(".product");
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
      // this.products.append(list);
    });
    this.products.innerHTML = list;
    this.currentState(products);
  }

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

  addColorToDropDown(products) {
    let color = "";
    products.forEach((product) => {
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

  filterCategories(value) {
    const endpoint = `https://5f67257538ce8700163982da.mockapi.io/products/?search=${value}`;

    const request = new Request(endpoint);

    request.get().then((products) => {
      this.addProductsToUI(products);
      this.currentState(products);
    });
  }

  filterColors(value) {
    var color = value;
    var list;

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
      }
      else{
        list=`
        <div class"product">
        <span>Aradığınız Renkte Ürün bulunmamaktadır.</span>
        </div>`
      }
    });
    this.products.innerHTML = list;
  }

  openModal(value){
    console.log(value);
    //alınan elementin üst elementlerine çıkılarak, ID alınacak, Alınan ID'ye göre get() requesti atılacak ancak "~/products/=search=:id" şeklinde atılarak tıklanmış öğenin verileri alınacak ve kendi oluşturuduğumuz modal'e eklenerek ekranda bir modal çıkması sağlancak.
    //HTML'i kendimiz yazacağız bootstrap kullanmayacağız.
    //Bu modal içerisinde bir adet sepete eklendi bilgisi olacak ve sepete eklenen ID bir değişkende tutulacak, eğer tekrardan eklenme durumu olursa, alert() çalıştırılacak.
    //Teşekkürler.
  }

  eventHandler() {
    this.categoryFilter.addEventListener("change", (e) => {
      this.filterCategories(e.target.value);
    });
    this.categoryColor.addEventListener("change", (e) => {
      this.filterColors(e.target.value);
    });
    this.products.addEventListener("click", (e) => {
      this.openModal(e.target)
    });
  }

  currentState(value) {
    data = value;
  }
}
