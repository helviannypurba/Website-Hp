const produk = {
  android: {
    poco: [
      {
        merek: 'Poco',
        nama: 'Poco X6 5G',
        harga: 3749000,
        gambar: 'gambar/android/poco/Poco X6 5G.jpg',
        spek: {
          ram: '12 GB',
          storage: '256 GB',
          chipset: 'Snapdragon 7s Gen 2',
          kamera: '64 MP'
        }
      },
    ],
    xiaomi: [
      {
        merek: 'Xiaomi',
        nama: 'Xiaomi 12 Lite',
        harga: 5238100,
        gambar: 'gambar/android/xiaomi/Xiaomi 12 Lite.jpg',
        spek: {
          ram: '8 GB',
          storage: '256 GB',
          chipset: 'Snapdragon 778G 5G',
          kamera: '108 MP'
        }
      },
      {
        merek: 'Xiaomi',
        nama: 'Xiaomi Redmi 14C',
        harga: 1499000,
        gambar: 'gambar/android/xiaomi/Xiaomi Redmi 14C.jpg',
        spek: {
          ram: '8 GB',
          storage: '256 GB',
          chipset: 'Mediatek Helio G81',
          kamera: '50 MP'
        }
      }
    ],
    vivo: [
      {
        merek: 'Vivo',
        nama: 'Vivo Y15',
        harga: 1990000,
        gambar: 'gambar/android/vivo/Vivo Y15.jpg',
        spek: {
          ram: '4 GB',
          storage: '64 GB',
          chipset: 'Mediatek Helio P22',
          kamera: '16 MP'
        }
      },
      {
        merek: 'Vivo',
        nama: 'Vivo Y91c',
        harga: 1375000,
        gambar: 'gambar/android/vivo/Vivo Y91c.jpg',
        spek: {
          ram: '2 GB',
          storage: '32 GB',
          chipset: 'MTK6762R',
          kamera: '13 MP'
        }
      }
    ],
    samsung: [
      {
        merek: 'Samsung',
        nama: 'Samsung Galaxy A15',
        harga: 2900000,
        gambar: 'gambar/android/samsung/Samsung Galaxy A15.jpg',
        spek: {
          ram: '8 GB',
          storage: '128 GB',
          chipset: 'Helio G99',
          kamera: '50 MP'
        }
      },
      {
        merek: 'Samsung',
        nama: 'Samsung Galaxy A55 5G',
        harga: 6690000,
        gambar: `gambar/android/samsung/Samsung Galaxy A55 5G.jpg`,
        spek: {
          ram: '12 GB',
          storage: '256 GB',
          chipset: 'Exynos 1480',
          kamera: '50 MP'
        }
      },
    ],
    oppo: [
      {
        merek: 'Oppo',
        nama: 'Oppo A18',
        harga: 1499000,
        gambar: `gambar/android/oppo/Oppo A18.jpg`,
        spek: {
          ram: '4 GB',
          storage: '128 GB',
          chipset: 'Helio G85',
          kamera: '8 MP'
        }
      },
    ]
  },
  ios: [
    {
      merek: 'Apple',
      nama: 'Iphone 12 Black',
      harga: 8249000,
      gambar: 'gambar/ios/Iphone 15 Pro Max.jpg',
      spek: {
        ram: '4 GB',
        storage: '128 GB',
        chipset: 'Apple A14 Bionic',
        kamera: '12 MP'
      }
    },
    {
      merek: 'Apple',
      nama: 'Iphone 15 Pro Max',
      harga: 27990000,
      gambar: 'gambar/ios/Iphone 15 Pro Max.jpg',
      spek: {
        ram: '12 GB',
        storage: '256 GB',
        chipset: 'Apple A17 Pro',
        kamera: '48 MP'
      }
    },
    {
      merek: 'Apple',
      nama: 'Iphone 14 Pro',
      harga: 17900000,
      gambar: 'gambar/ios/Iphone 16 Pro.jpg',
      spek: {
        ram: '6 GB',
        storage: '256 GB',
        chipset: 'Apple A16 Bionic',
        kamera: '48 MP'
      }
    },
  ]
};

if (!localStorage.getItem('favorit')) {
  localStorage.setItem('favorit', JSON.stringify([]));
}

if (!localStorage.getItem('keranjang')) {
  localStorage.setItem('keranjang', JSON.stringify([]));
}

const struk = JSON.parse(localStorage.getItem('struk')) || [];

const listProduk = document.getElementById('listProduk');
const listRekomendasiProduk = document.getElementById('listRekomendasiProduk');

const { poco, samsung, vivo, xiaomi, oppo } = produk.android;
const ios = produk.ios;

const semuaProduk = [...poco, ...samsung, ...vivo, ...xiaomi, ...oppo, ...ios];
const rekomendasiProduk = [poco[0], samsung[0], vivo[0], xiaomi[0], oppo[0], ios[0]];

// Menampilkan List Produk
semuaProduk.forEach(produk => {
  listProduk.innerHTML += boxProduk(produk);
});

// Menampilkan Rekomendasi Produk
rekomendasiProduk.forEach(produk => {
  listRekomendasiProduk.innerHTML += boxProduk(produk);
});

const semuaTombolCariMerek = document.querySelectorAll('#tombolCariMerek');
const semuaTombolLihatDetail = document.querySelectorAll('#tombolLihatDetail');
const tombolCariSemua = document.getElementById('tombolCariSemua');
const tombolCariProduk = document.getElementById('tombolCariProduk');

const elementDetailProduk = document.getElementById('detailProduk');
const elementPembelianProduk = document.getElementById('pembelianProduk');
const elementStrukPembelian = document.getElementById('strukPembelian');

function boxDetailProduk(produk) {
  return `
<img src="${produk.gambar}" alt="" class="h-80">
<div>
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-semibold">${produk.nama}</h1>
    <div class="flex items-center gap-5">
      <button id="tombolFavorit" onclick="masukFavorit('${produk.nama}')" class="bi bi-heart-fill"></button>
      <button id="tombolKeranjang" onclick="masukKeranjang('${produk.nama}')" class="bi bi-cart-fill"></button>
    </div>
  </div>
  <span class="font-bold">Rp. ${produk.harga.toLocaleString('ID')}</span>
  <div class="mb-4">
    <div>
      <span class="bi bi-cpu"></span>
      <span>Chipset: ${produk.spek.chipset}</span>
    </div>
    <div>
      <span class="bi bi-camera"></span>
      <span>Camera: ${produk.spek.kamera}</span>
    </div>
    <div>
      <span class="bi bi-memory"></span>
      <span>Ram: ${produk.spek.ram}</span>
    </div>
    <div>
      <span class="bi bi-nvme"></span>
      <span>Storage: ${produk.spek.storage}</span>
    </div>
  </div>
  <button data-produk="${produk.nama}" class="py-1 px-3 bg-red-600 text-white" id="tombolBeli">Beli Sekarang</button>
</div>
<button onclick="tutupDetailProduk()" class="bi bi-x-circle-fill text-xl"></button>`;
}

function boxProduk(produk) {
  return `<div class="produk">
          <img src="${produk.gambar}" alt="" class="mb-6">
          <div>
            <h1>${produk.nama}</h1>
            <span class="font-bold">Rp. ${Number(produk.harga).toLocaleString('ID')}</span>
            <button class="py-1 px-3 bg-red-600 text-white" onclick="lihatDetail('${produk.nama}')">Lihat Detail</button>
          </div>
        </div>`;
}

function boxPembelianProduk(produk) {
  return `<div class="flex gap-5 mb-6">
      <img src="${produk.gambar}" alt="" class="w-16">
      <div>
        <h1 class="text-xl">Pembelian ${produk.nama}</h1>
        <h2 class="font-semibold">Rp. ${produk.harga.toLocaleString('ID')}</h2>
      </div>
    </div>
    <h1>Masukkan Uang</h1>
    <input type="text" class="border-2 border-black mb-5" id="uangPembeli">
    <div>
      <h1 class="text-lg mb-4">Metode Pembayaran</h1>
      <img src="https://cdnpro.eraspace.com/media/wysiwyg/footer/payment-footer-des24.png" alt="" class="w-64">
    </div>
    <button onclick="bayarProduk('${produk.nama}')" class="py-1 px-4 text-white bg-blue-900">Bayar</button>`;
}

function boxStruk(uangPembeli, produk) {
  return `<div class="flex gap-5 mb-6">
      <img src="${produk.gambar}" alt="" class="w-16">
      <div>
        <h1 class="text-xl">Pembelian ${produk.nama}</h1>
        <h2 class="font-semibold">Rp. ${produk.harga.toLocaleString('ID')}</h2>
      </div>
    </div>

    <div>
      <p>Uang Pembeli: Rp. ${Number(uangPembeli).toLocaleString('ID')}</p>
      <p>Kembalian: Rp. ${(uangPembeli - produk.harga).toLocaleString('ID')}</p>
    </div>
    
    <button onclick="tutupboxStruk()" class="py-1 px-4 text-white bg-blue-900 mt-8">Tutup</button>`;
}

// Menampilkan produk berdasarkan merek melalui tombol
function cariProdukMelaluiMerek(merek) {
  listProduk.innerHTML = ``;
  const produkYgDicari = semuaProduk.filter(produk => produk.merek === merek);

  produkYgDicari.forEach(produk => {
    listProduk.innerHTML += boxProduk(produk);
  });
}

function cariSemuaProduk() {
  listProduk.innerHTML = ``;

  semuaProduk.forEach(produk => {
    listProduk.innerHTML += boxProduk(produk);
  });
}

// Membuat detail produk muncul ketika tombol ditekan
function lihatDetail(namaProduk) {
  const produkYangDilihat = semuaProduk.find(produk => produk.nama === namaProduk);

  elementPembelianProduk.style.display = '';
  elementPembelianProduk.innerHTML = '';

  elementDetailProduk.style.display = 'flex';
  elementDetailProduk.innerHTML = boxDetailProduk(produkYangDilihat);

  // Membuat pembelian produk muncul ketika tombol ditekan
  document.querySelectorAll('#tombolBeli').forEach(tombol => {
    tombol.addEventListener('click', e => {
      const namaProduk = e.target.dataset.produk;
      const produkYangDibeli = semuaProduk.find(produk => produk.nama === namaProduk);

      elementDetailProduk.innerHTML = '';
      elementDetailProduk.style.display = 'none';

      elementPembelianProduk.innerHTML = boxPembelianProduk(produkYangDibeli);
      elementPembelianProduk.style.display = 'block';
    });
  });
}

function bayarProduk(namaProduk) {
  const produk = semuaProduk.find((produk) => namaProduk === produk.nama);
  const uangPembeli = document.getElementById('uangPembeli').value;

  if (uangPembeli < produk.harga) {
    alert('Uang tidak cukup');
    return;
  }

  elementPembelianProduk.style.display = 'none';
  elementPembelianProduk.innerHTML = '';

  elementStrukPembelian.style.display = 'block';
  elementStrukPembelian.innerHTML = boxStruk(uangPembeli, produk);

  struk.push({
    gambarProduk: produk.gambar,
    namaProduk: produk.nama,
    hargaProduk: produk.harga,
    uangPembeli: uangPembeli,
    uangKembalian: uangPembeli - produk.harga,
    tanggalPembelian: String(new Date().getDate())
  });
  localStorage.setItem("struk", JSON.stringify(struk));
}

function tutupDetailProduk() {
  elementDetailProduk.style.display = 'none';
  elementDetailProduk.innerHTML = '';
}

function tutupboxStruk() {
  elementStrukPembelian.style.display = 'none';
  elementStrukPembelian.innerHTML = '';
}

function masukFavorit(namaProduk) {
  const produk = semuaProduk.find((produk) => produk.nama === namaProduk);

  const favorit = JSON.parse(localStorage.getItem("favorit")) || [];

  if (favorit.some((item) => item.nama === namaProduk)) {
    alert(`${produk.nama} sudah ada di daftar favorit!`);
    return;
  }

  favorit.push(produk);
  localStorage.setItem("favorit", JSON.stringify(favorit));

  alert(`${produk.nama} telah ditambahkan ke favorit`);
}

function masukKeranjang(namaProduk) {
  const produk = semuaProduk.find((produk) => produk.nama === namaProduk);

  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  keranjang.push(produk);
  localStorage.setItem("keranjang", JSON.stringify(keranjang));

  alert(`${produk.nama} telah ditambahkan ke keranjang`);
}


function cariProduk() {
  const inputUser = document.getElementById('cariProduk').value.toLowerCase();

  listProduk.innerHTML = '';

  const produkYangDicari = semuaProduk.filter(produk => produk.nama.toLowerCase().includes(inputUser));

  listProduk.innerHTML = '';
  if (produkYangDicari.length == 0) {
    listProduk.innerHTML = 'Tidak ada';
  } else {
    produkYangDicari.forEach(produk => {
      listProduk.innerHTML += boxProduk(produk);
    })
  }
}

function cariProdukDiNavigasi() {
  const inputUser = document.getElementById('cariProdukDiNavigasi').value.toLowerCase();

  listProduk.innerHTML = '';

  const produkYangDicari = semuaProduk.filter(produk => produk.nama.toLowerCase().includes(inputUser));

  listProduk.innerHTML = '';
  if (produkYangDicari.length == 0) {
    listProduk.innerHTML = 'Tidak ada';
  } else {
    produkYangDicari.forEach(produk => {
      listProduk.innerHTML += boxProduk(produk);
    })
  }

  const topPosition = listProduk.offsetTop;
  window.scrollTo({ top: topPosition, behavior: 'smooth' });
}