
function kaydir1() {
    document.getElementById("ekleSoguk").scrollIntoView({ behavior: "smooth" });
}
function kaydir2() {
    document.getElementById("ekleSicak").scrollIntoView({ behavior: "smooth" });
}
function kaydir3() {
    document.getElementById("ekleTatli").scrollIntoView({ behavior: "smooth" });
}

let resim="";
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("resimSec").addEventListener("change", function (event) {
        const dosya = event.target.files[0];
      
        if (dosya && dosya.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = function (e) {
            // Base64 veriyi al
           resim = e.target.result;
      
            // Önizleme
            const img = document.getElementById("urunResmi");
            img.src = resim;
            img.style.display = "block";
                  };
          reader.readAsDataURL(dosya); // resmi base64'e çevir
        }
      }); 
});

function veriyiKaydet() {

    //const kod = document.getElementById("urunKod").value;
    //const url = document.getElementById("resimSec").value;  // textbox içindeki veriyi al
    const ad = document.getElementById("ad").value;
    const fiyat = document.getElementById("fiyat").value;
    const kategori = document.getElementById("kategoriSec").value;

    let urunler = JSON.parse(localStorage.getItem("urunler")) || [];

    // Yeni ürün kodunu oluşturmak için başlangıç değeri
    let yeniKod = 0;

    // Kod çakışıyor mu kontrolü
    let kodVarMi = true;

    while (kodVarMi) {
        // kod varsa tekrar dene
        kodVarMi = false; // başta yokmuş gibi varsay
        for (let i = 0; i < urunler.length; i++) {
            if (urunler[i].urunKod == yeniKod) {
                yeniKod++;         // aynı kod varsa bir artır
                kodVarMi = true;   // döngü devam etsin
                break;
            }
        }
    }

    const urun = {
        urunKod: yeniKod,
        resimUrl: resim,
        urunAd: ad,
        urunFiyat: fiyat,
        urunKategori: kategori
    };

    
    urunler.push(urun);
    // güncellenmiş diziyi tekrar localStorage'a yaz
    localStorage.setItem("urunler", JSON.stringify(urunler));

}






function urunListele() {

    let urunler = JSON.parse(localStorage.getItem("urunler")) || [];

    // Eğer dizi boşsa çalıştırma
    if (urunler.length === 0) {
        console.log("Ürün listesi boş.");
        return;
    }
    for (let i = 0; i < urunler.length; i++) { //ürün sayısı kadar for
        let category = urunler[i].urunKategori; //kategorileri çek
        let urunDiv;
        let urunRow;


        switch (category) {

            case "soguk": //kategori soğuksa çalışacaklar    
                urunDiv = document.createElement("div");
                urunDiv.className = "col-6";
                urunDiv.innerHTML = `  
                <div class="p-2 soft-mor-kenarsiz" style="cursor:pointer">
                    <div class="row ">
                    <div class="col-4">
                    <div class="col-auto"><img onerror="this.onerror=null;this.src='https://user-images.githubusercontent.com/47315479/81145216-7fbd8700-8f7e-11ea-9d49-bd5fb4a888f1.png';" src="${urunler[i].resimUrl}" style='width:50px; height:50px;'></div>
                    </div>
                    <div class="col-8">
                    <div class="col-4">${urunler[i].urunAd}</div>
                    <div class="col-4">${urunler[i].urunFiyat}</div>
                  
                    </div> 
                    </div> 
                    </div> 
                   ` ;
                   if (i % 2 === 0) {
                    urunRow = document.createElement("div");
                    urunRow.className = "row"; // yeni satır
                    ekleSoguk.appendChild(urunRow);
                }
                if (window.location.href.includes("siteSatici")) {
                    urunDiv.style.cursor = "pointer";
                    urunDiv.addEventListener("click", function () {
                        window.location.href = "duzenle.html?urunkodu=" + urunler[i].urunKod;
                    });
                }
                document.getElementById("ekleSoguk").appendChild(urunDiv);
                ;
                break;

           

            case "tatli":

                urunDiv = document.createElement("div");
                urunDiv.className = "col";
                if (i % 2 === 0) {
                    urunRow = document.createElement("div");
                    urunRow.className = "row";
                    
                    ekleTatli.appendChild(urunRow);
                }
                urunDiv.innerHTML = ` 
                    <div class="row p-2 soft-mor-kenarsiz" >
                    <div class="col-4">
                    <div class="col-auto"><img src="${urunler[i].resimUrl}" style='width:50px; height:50px;'></div>
                    </div>
                    <div class="col-8">
                    
                    <div class="col-auto">${urunler[i].urunAd}</div>
                    <div class="col-auto">${urunler[i].urunFiyat}</div>
                   
                    </div>
                    </div>
                   `;
               
                if (window.location.href.includes("siteSatici")) {
                    urunDiv.addEventListener("click", function () {
                        window.location.href = "duzenle.html?urunkodu=" + urunler[i].urunKod;
                    })
                }
                document.getElementById("ekleTatli").appendChild(urunDiv);
                ;
                break;

           
        }
    }

}


function duzenleme() {
    let params = new URLSearchParams(document.location.search);
    let urunKodu = params.get("urunkodu");
    //console.log(urunKodu);
    let urunler = JSON.parse(localStorage.getItem("urunler")) || [];
    for (let i = 0; i < urunler.length; i++) {
        if (urunKodu == urunler[i].urunKod) {
            document.getElementById("urunResmi").src = urunler[i].resimUrl;
            document.getElementById("url").value = urunler[i].resimUrl;
            document.getElementById("ad").value = urunler[i].urunAd;
            document.getElementById("fiyat").value = urunler[i].urunFiyat;
            document.getElementById("kategoriSec").value = urunler[i].urunKategori;
            // document.getElementById("urunKod").value = urunler[i].urunKod;

        }
    }
}

function degisiklikDuzenle() {
    //let url = document.getElementById("resimSec").value;
    let ad = document.getElementById("ad").value;
    let fiyat = document.getElementById("fiyat").value;
    let kategori = document.getElementById("kategoriSec").value;

    let params = new URLSearchParams(document.location.search);
    let urunkodu = params.get("urunkodu");

    let urunler = JSON.parse(localStorage.getItem("urunler")) || [];

    for (let i = 0; i < urunler.length; i++) {
        if (urunler[i].urunKod == urunkodu) {
            urunler[i].resimUrl = resim;
            urunler[i].urunAd = ad;
            urunler[i].urunFiyat = fiyat;
            urunler[i].urunKategori = kategori;
            break;
        }
    }
    localStorage.setItem("urunler", JSON.stringify(urunler));

}

function urunSil() {
    let params = new URLSearchParams(document.location.search);
    let urunkodu = params.get("urunkodu");

    let urunler = JSON.parse(localStorage.getItem("urunler")) || [];
    for (let i = 0; i < urunler.length; i++) {
        if (urunler[i].urunKod == urunkodu) {
            urunler.splice(i, 1); // 1 --> bir adet sil demk
            break;
        }
    }


    localStorage.setItem("urunler", JSON.stringify(urunler));
    location.reload();
}

