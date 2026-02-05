
        let koleksiTugas = [];

        function tambahTugas() {
            const elemenInput = document.getElementById('inputTugas');
            const elemenTanggal = document.getElementById('inputTanggal');
            const teksValidasi = document.getElementById('validasiTeks');
            const tglValidasi = document.getElementById('validasiTanggal');

            let adaError = false;

            if (elemenInput.value.trim() === "") {
                teksValidasi.style.display = "block";
                adaError = true;
            } else {
                teksValidasi.style.display = "none";
            }

            if (elemenTanggal.value === "") {
                tglValidasi.style.display = "block";
                adaError = true;
            } else {
                tglValidasi.style.display = "none";
            }

            if (adaError) return;

            const tugasBaru = {
                id: Date.now(),
                judul: elemenInput.value,
                tanggal: elemenTanggal.value,
                isSelesai: false
            };

            koleksiTugas.push(tugasBaru);

            elemenInput.value = "";
            elemenTanggal.value = "";
            
            tampilkanDaftar();
        }

        function tampilkanDaftar() {
            const wadah = document.getElementById('wadahData');
            const filter = document.getElementById('filterStatus').value;
            const pesanKosong = document.getElementById('pesanKosong');
            
            wadah.innerHTML = "";

    
            const dataTerfilter = koleksiTugas.filter(item => {
                if (filter === "selesai") return item.isSelesai;
                if (filter === "belum") return !item.isSelesai;
                return true;
            });

            if (dataTerfilter.length === 0) {
                pesanKosong.style.display = "block";
            } else {
                pesanKosong.style.display = "none";
            }

            dataTerfilter.forEach(item => {
                const baris = document.createElement('tr');
                
                baris.innerHTML = `
                    <td class="${item.isSelesai ? 'tugas-selesai' : ''}">${item.judul}</td>
                    <td style="color: #94a3b8">${item.tanggal}</td>
                    <td>
                        <button onclick="ubahStatusTugas(${item.id})" class="badge-status ${item.isSelesai ? 'sudah-selesai' : 'belum-selesai'}">
                            ${item.isSelesai ? 'Selesai' : 'Proses'}
                        </button>
                    </td>
                    <td style="text-align: right;">
                        <button class="btn-aksi" onclick="hapusSatuTugas(${item.id})">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </td>
                `;
                wadah.appendChild(baris);
            });
        }

        function ubahStatusTugas(id) {
            koleksiTugas = koleksiTugas.map(t => {
                if (t.id === id) t.isSelesai = !t.isSelesai;
                return t;
            });
            tampilkanDaftar();
        }

        function hapusSatuTugas(id) {
            koleksiTugas = koleksiTugas.filter(t => t.id !== id);
            tampilkanDaftar();
        }

        function hapusSemuaTugas() {
            if (koleksiTugas.length > 0) {
                const yakin = confirm("Hapus semua tugas?");
                if (yakin) {
                    koleksiTugas = [];
                    tampilkanDaftar();
                }
            }
        }

  
        tampilkanDaftar();
