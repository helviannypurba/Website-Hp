const keranjang = JSON.parse(localStorage.getItem('keranjang'));
const elementPembelianProduk = document.getElementById('pembelianProduk');
const elementStrukPembelian = document.getElementById('strukPembelian');

const struk = JSON.parse(localStorage.getItem('struk')) || [];

console.log(keranjang);

keranjang.forEach(produk => {
  document.getElementById('listProdukKeranjang').innerHTML += `<div class="produk">
          <img src="${produk.gambar}" alt="" class="mb-6">
          <div>
            <h1>1 ${produk.nama}</h1>
            <span class="font-bold">Rp. ${produk.harga.toLocaleString('ID')}</span>
          </div>
          <button onclick="checkout('${produk.nama}', '${produk.harga}', '${produk.gambar}')" class="py-1 px-4 font-semibold bg-yellow-500 text-white">Checkout</button>
        </div>`;
})

function hapusDariKeranjang() {
  localStorage.removeItem('keranjang');
}

function checkout(namaProduk, hargaProduk, gambarProduk) {
  elementPembelianProduk.style.display = 'block';
  elementPembelianProduk.innerHTML = `<div class="flex gap-5 mb-6">
      <img src="${gambarProduk}" alt="" class="w-16">
      <div>
        <h1 class="text-xl">Pembelian ${namaProduk}</h1>
        <h2 class="font-semibold">Rp. ${Number(hargaProduk).toLocaleString('ID')}</h2>
      </div>
    </div>
    <h1>Masukkan Uang</h1>
    <input type="text" class="border-2 border-black mb-5" id="uangPembeli">
    <div>
      <h1 class="text-lg mb-4">Metode Pembayaran</h1>
      <img src="https://cdnpro.eraspace.com/media/wysiwyg/footer/payment-footer-des24.png" alt="" class="w-64">
    </div>
    <button onclick="bayarProduk('${namaProduk}', '${hargaProduk}', '${gambarProduk}')" class="py-1 px-4 text-white bg-blue-900">Bayar</button>`;
}

function bayarProduk(namaProduk, hargaProduk, gambarProduk) {
  const uangPembeli = document.getElementById('uangPembeli').value;

  if (Number(uangPembeli) < Number(hargaProduk)) {
    alert('Uang tidak cukup');
    return;
  }

  elementPembelianProduk.style.display = 'none';
  elementPembelianProduk.innerHTML = '';

  elementStrukPembelian.style.display = 'block';
  elementStrukPembelian.innerHTML = `<div class="flex gap-5 mb-6">
      <img src="${gambarProduk}" alt="" class="w-16">
      <div>
        <h1 class="text-xl">Pembelian ${namaProduk}</h1>
        <h2 class="font-semibold">Rp. ${Number(hargaProduk).toLocaleString('ID')}</h2>
      </div>
    </div>

    <div>
      <p>Uang Pembeli: Rp. ${Number(uangPembeli).toLocaleString('ID')}</p>
      <p>Kembalian: Rp. ${(uangPembeli - hargaProduk).toLocaleString('ID')}</p>
    </div>
    
    <button onclick="tutupStruk()" class="py-1 px-4 text-white bg-blue-900 mt-8">Tutup</button>`;

  const index = keranjang.findIndex(produk => produk.nama === namaProduk);
  if (index !== -1) {
    keranjang.splice(index, 1);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    struk.push({
      gambarProduk,
      namaProduk,
      hargaProduk,
      uangPembeli,
      uangKembalian: uangPembeli - hargaProduk,
      tanggalPembelian: new Date().getDate()
    });
    localStorage.setItem("struk", JSON.stringify(struk));
  }
}

function tutupStruk() {
  elementStrukPembelian.style.display = 'none';
  elementStrukPembelian.innerHTML = '';
}
